const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { loadEnvConfig } = require("@next/env");
const { PrismaClient } = require("@prisma/client");
const cloudinary = require("cloudinary").v2;

loadEnvConfig(process.cwd());

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
if (!cloudName || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary credentials are required in the environment.");
}

cloudinary.config({
    cloud_name: cloudName,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const galleryPath = path.join(process.cwd(), "data/galleryImages.js");
const seedPath = path.join(process.cwd(), "prisma/seed.js");
const imageUrlPattern = /url:\s*(["'])(https?:\/\/[^"']+)\1/g;

function readImageUrls(filePath) {
    const content = fs.readFileSync(filePath, "utf8");
    return [...content.matchAll(imageUrlPattern)].map((match) => match[2]);
}

function getAssetKey(url) {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split("/").filter(Boolean);
    const uploadIndex = pathParts.findIndex((part, index) => part === "image" && pathParts[index + 1] === "upload");
    if (uploadIndex < 1) return url;

    const account = pathParts[uploadIndex - 1];
    const assetParts = pathParts.slice(uploadIndex + 2);
    while (assetParts.length && (assetParts[0].includes(",") || /^v\d+$/.test(assetParts[0]))) {
        assetParts.shift();
    }
    return `${parsed.hostname}/${account}/${assetParts.join("/")}`;
}

function getUploadSource(url) {
    if (/^https?:\/\//i.test(url)) return url;
    if (!url.startsWith("/") || url.startsWith("//")) return null;

    const publicRoot = path.resolve(process.cwd(), "public");
    const localPath = path.resolve(publicRoot, `.${decodeURIComponent(url.split(/[?#]/)[0])}`);
    if (!localPath.startsWith(`${publicRoot}${path.sep}`) || !fs.existsSync(localPath)) return null;
    return localPath;
}

function uploadImage(source, publicId) {
    return cloudinary.uploader.upload(source, {
        folder: "pritha-health-care/gallery",
        public_id: publicId,
        overwrite: true,
        resource_type: "image",
    });
}

async function main() {
    const galleryContent = fs.readFileSync(galleryPath, "utf8");
    const seedContent = fs.readFileSync(seedPath, "utf8");
    const prisma = process.env.DATABASE_URL ? new PrismaClient() : null;
    const databaseItems = prisma ?
        await prisma.galleryItem.findMany({ where: { type: "IMAGE" }, select: { id: true, url: true } }) :
        [];
    const sourceUrls = new Set([
        ...readImageUrls(galleryPath),
        ...readImageUrls(seedPath),
        ...databaseItems.map((item) => item.url),
    ]);
    const mappings = new Map();
    const pendingAssets = new Map();

    for (const sourceUrl of sourceUrls) {
        const uploadSource = getUploadSource(sourceUrl);
        if (!uploadSource) throw new Error(`Gallery image source is not a reachable URL or public file: ${sourceUrl}`);

        if (/^https?:\/\//i.test(sourceUrl)) {
            const parsed = new URL(sourceUrl);
            const pathParts = parsed.pathname.split("/").filter(Boolean);
            const uploadIndex = pathParts.findIndex((part, index) => part === "image" && pathParts[index + 1] === "upload");
            if (parsed.hostname === "res.cloudinary.com" && uploadIndex > 0 && pathParts[uploadIndex - 1] === cloudName) {
                mappings.set(sourceUrl, sourceUrl);
                continue;
            }
        }

        const assetKey = sourceUrl.startsWith("/") ? sourceUrl : getAssetKey(sourceUrl);
        const publicId = `asset-${crypto.createHash("sha256").update(assetKey).digest("hex").slice(0, 24)}`;
        pendingAssets.set(assetKey, { sourceUrl, uploadSource, publicId });
    }

    const assets = [...pendingAssets.values()];
    const uploadedByKey = new Map();
    let nextAsset = 0;

    async function uploadWorker() {
        while (nextAsset < assets.length) {
            const asset = assets[nextAsset++];
            const result = await uploadImage(asset.uploadSource, asset.publicId);
            const response = await fetch(result.secure_url, { method: "HEAD" });
            if (!response.ok) throw new Error(`Cloudinary URL check failed (${response.status}).`);
            const assetKey = asset.sourceUrl.startsWith("/") ? asset.sourceUrl : getAssetKey(asset.sourceUrl);
            uploadedByKey.set(assetKey, result.secure_url);
            console.log(`Uploaded ${uploadedByKey.size}/${assets.length} gallery assets.`);
        }
    }

    try {
        await cloudinary.api.ping();
        await Promise.all(Array.from({ length: Math.min(4, assets.length) }, uploadWorker));

        for (const sourceUrl of sourceUrls) {
            const assetKey = sourceUrl.startsWith("/") ? sourceUrl : getAssetKey(sourceUrl);
            const migratedUrl = uploadedByKey.get(assetKey);
            if (migratedUrl) mappings.set(sourceUrl, migratedUrl);
        }

        let updatedGallery = galleryContent;
        let updatedSeed = seedContent;
        for (const [sourceUrl, migratedUrl] of mappings) {
            updatedGallery = updatedGallery.replaceAll(sourceUrl, migratedUrl);
            updatedSeed = updatedSeed.replaceAll(sourceUrl, migratedUrl);
        }

        if (updatedGallery !== galleryContent) fs.writeFileSync(galleryPath, updatedGallery);
        if (updatedSeed !== seedContent) fs.writeFileSync(seedPath, updatedSeed);

        if (prisma) {
            for (const item of databaseItems) {
                const migratedUrl = mappings.get(item.url);
                if (migratedUrl && migratedUrl !== item.url) {
                    await prisma.galleryItem.update({ where: { id: item.id }, data: { url: migratedUrl } });
                }
            }
        }

        console.log(`Migration complete: ${assets.length} unique assets copied to Cloudinary.`);
        console.log(`Updated ${mappings.size} source URL references across static, seed, and database gallery data.`);
        if (!prisma) console.log("DATABASE_URL is not set; database gallery rows were not changed.");
    } finally {
        if (prisma) await prisma.$disconnect();
    }
}

main().catch((error) => {
    console.error(`Gallery migration failed: ${error.message}`);
    process.exitCode = 1;
});