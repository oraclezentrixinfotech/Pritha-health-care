import "server-only";
import { v2 as cloudinary } from "cloudinary";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/avif", "image/gif", "image/jpeg", "image/png", "image/webp"]);

export async function getImageUrlFromForm(formData, fileField, urlField) {
    const file = formData.get(fileField);
    if (file && typeof file === "object" && typeof file.arrayBuffer === "function" && file.size > 0) {
        if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
            throw new Error("Choose a JPEG, PNG, WebP, GIF, or AVIF image.");
        }
        if (file.size > MAX_IMAGE_SIZE) {
            throw new Error("Image files must be 8 MB or smaller.");
        }

        const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
        if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
            throw new Error("Cloudinary is not configured. Set its credentials in the server environment.");
        }

        cloudinary.config({
            cloud_name: CLOUDINARY_CLOUD_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_API_SECRET,
        });

        const buffer = Buffer.from(await file.arrayBuffer());
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream({ folder: "pritha-health-care" },
                (error, result) => {
                    if (error || !result ? .secure_url) {
                        reject(new Error("Cloudinary could not upload this image."));
                        return;
                    }
                    resolve(result.secure_url);
                }
            );
            upload.end(buffer);
        });
    }

    return String(formData.get(urlField) ? ? "").trim().slice(0, 1000);
}