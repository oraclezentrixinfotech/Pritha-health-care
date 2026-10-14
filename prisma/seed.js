const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.stat.deleteMany();
  await prisma.stat.createMany({
    data: [
      { label: "Cataract Operations", value: 172755, position: 1 },
      { label: "Assistive Devices and Mobility Aids", value: 89906, position: 2 },
    ],
  });

  await prisma.slide.deleteMany();
  await prisma.slide.createMany({
    data: [
      {
        title: "Pritha Health Care is committed to help and rehabilitate the Specially Abled Children.",
        image: "/admin/slider/Kalyanam_Karoti_Special_School.webp",
        link: "/sambal-special-school",
        position: 1,
      },
      {
        title: "Pritha Health Care is committed to help and rehabilitate the differently-abled",
        image: "/admin/slider/Disability Care.webp",
        link: "/disability-care",
        position: 3,
      },
      {
        title: "Pritha Health Care Committed to Eradicate the Avoidable Blindness",
        image: "/admin/slider/Eye Care.webp",
        link: "/eyecare",
        position: 4,
      },
    ],
  });

  await prisma.post.deleteMany();
  await prisma.post.createMany({
    data: [
      {
        title: "22nd Free Eye Camp Successfully Concludes by Pritha Health Care, Moradabad, Courtesy of Shri Krishnalal Sharma Charitable Trust, Moradabad",
        excerpt: "Pritha Health Care Moradabad organised the ending ceremony of the 22nd Free Eye Camp on Punytithi of the late Shri Mayank Sharma.",
        content:
          "Pritha Health Care Moradabad organised the ending ceremony of the 22nd Free Eye Camp on Punytithi of the late Shri Mayank Sharma.\n\nHundreds of patients were examined and operated upon free of cost.",
        image: "/admin/blog/31-10-2023/Kachaura Camp.jpg",
        postedAt: new Date("2023-10-31"),
      },
      {
        title: "Embassy of Japan in India provided Eye Medical Equipment",
        excerpt: "Modern eye machines and equipment have been provided by the Embassy of Japan under the Project for the Provision of Eye Medical Equipment",
        content:
          "Modern eye machines and equipment have been provided by the Embassy of Japan under the Project for the Provision of Eye Medical Equipment to Pritha Health Care Moradabad.",
        image: "/admin/blog/23-08-2022/Kalyanam_Karoti_The_handover_ceremony.webp",
        postedAt: new Date("2022-08-23"),
      },
    ],
  });

  if ((await prisma.notification.count()) === 0) {
    await prisma.notification.create({ data: { title: "Welcome: add public notices from the admin panel", link: "" } });
  }

  const galleryData = [
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960449/pritha-health-care/gallery/asset-44206883adae9d709b152f47.jpg", caption: "Pratha Health Care Medical Outreach & Eye Examination Camp" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960450/pritha-health-care/gallery/asset-29a39df2ff78a2115c7a05f4.jpg", caption: "Patient Registration and Vision Screening Session" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960450/pritha-health-care/gallery/asset-01791448977bdaefb67fff2e.jpg", caption: "Specialist Eye Diagnosis & Slit-lamp Examination" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960449/pritha-health-care/gallery/asset-ce519f51cdbac5c1e8436365.jpg", caption: "Rural Community Health Check-up Camp" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960450/pritha-health-care/gallery/asset-12daae4f07e93c1df6b42a5d.jpg", caption: "Senior Citizen Vision Assessment & Care" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960450/pritha-health-care/gallery/asset-c19159bd03f4b79b1484bea9.jpg", caption: "Medical Camp Team & Field Staff in Action" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960451/pritha-health-care/gallery/asset-42f8c6c67a6ea2b2e4cee5ef.jpg", caption: "Comprehensive Eye Health Screening & Consultation" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960452/pritha-health-care/gallery/asset-23a9a0f13a0bca201b4211bb.jpg", caption: "Diagnostic Screening & Community Health Awareness" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960452/pritha-health-care/gallery/asset-87a324985c5959e9d532feb9.jpg", caption: "Patient Welfare & Pre-operative Consultation" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960452/pritha-health-care/gallery/asset-43498dacf476a5c3ff9baccd.jpg", caption: "Free Cataract Surgery Selection & Medical Check" },
    // { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960467/pritha-health-care/gallery/asset-14d34509e756d70f6b127206.jpg", caption: "Healthcare Screening Volunteers Assisting Patients" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960453/pritha-health-care/gallery/asset-6bea9f5bf5c0f010652567b8.jpg", caption: "Community Beneficiary Assessment and Checkup" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960453/pritha-health-care/gallery/asset-c309318a27b42018f61201c1.jpg", caption: "Specialist Doctor Consultations at Village Camp" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960453/pritha-health-care/gallery/asset-ee6a1f591c5c686e50617a08.jpg", caption: "Free Distribution of Eyeglasses & Protective Frames" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960454/pritha-health-care/gallery/asset-42171265fd99044365540121.jpg", caption: "Field Ophthalmology Team Examining Villagers" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960454/pritha-health-care/gallery/asset-0e2fdf6c0bb6f7d08e59bab6.jpg", caption: "Oral & General Health Screening Initiative" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960454/pritha-health-care/gallery/asset-459002bc04e132b528d6adff.jpg", caption: "Preventive Healthcare & Awareness Drive" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960454/pritha-health-care/gallery/asset-6defa936b7fdda37f467c7a4.jpg", caption: "Clinical Diagnosis and Patient Guidance" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960455/pritha-health-care/gallery/asset-4757a7cd70fc12c585de1ea4.jpg", caption: "Rural Outreach Medical Support Team" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960455/pritha-health-care/gallery/asset-77eb6be8b5d82835bbb93486.jpg", caption: "Doctor Advising Underprivileged Patients" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960455/pritha-health-care/gallery/asset-6a56323c97e7feafe8f26823.jpg", caption: "Vision Acuity Testing in Rural UP" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960456/pritha-health-care/gallery/asset-6375cdd24cbddfe90f17ff84.jpg", caption: "Patient Counseling and Post-Operative Guidance" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960456/pritha-health-care/gallery/asset-d7fc17526fd91bbcea498fd8.jpg", caption: "Mobile Medical Unit & Village Diagnostic Camp" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960456/pritha-health-care/gallery/asset-b892f2396dff8ca4c2300966.jpg", caption: "Cataract Screening and Refractive Correction" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960457/pritha-health-care/gallery/asset-65f1d1bd2386624de8e105aa.jpg", caption: "Community Gathering for Health Awareness Program" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960457/pritha-health-care/gallery/asset-868fa8f1d0f994715f40d085.jpg", caption: "Elderly Patient Vision Restoration Care" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960458/pritha-health-care/gallery/asset-4d505f3d956d027f32d8f488.jpg", caption: "Medical Mission Field Operations" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960458/pritha-health-care/gallery/asset-ed81970ecf2cfcd9cc0b8c20.jpg", caption: "Doctor Examination & Patient Consultation" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960458/pritha-health-care/gallery/asset-0870329c896559d119761ecf.jpg", caption: "Healthcare Volunteers & Screening Station" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960458/pritha-health-care/gallery/asset-795045f56fc6b0d5450fe558.jpg", caption: "Dedicated Medical Staff Providing Compassionate Care" },
    { type: "IMAGE", url: "https://res.cloudinary.com/irxsvxce/image/upload/v1791960459/pritha-health-care/gallery/asset-84206d59d5e0931f8a19c8f8.jpg", caption: "Restoring the Gift of Vision to Underserved Communities" },
  ];

  for (const item of galleryData) {
    const exists = await prisma.galleryItem.findFirst({ where: { url: item.url } });
    if (!exists) {
      await prisma.galleryItem.create({ data: item });
    }
  }

  console.log("Seed complete");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
