// Centralized blog posts dataset for Pritha Health Care

export const blogCategories = [
  "All",
  "Eye Care",
  "Disability Care",
  "Child Education",
  "Community Outreach",
  "Rehabilitation"
];

export const blogs = [
  {
    id: 1,
    slug: "free-eye-checkup-camp-giants-group-bisauli-stars",
    title: "नि:शुल्क नेत्र जाँच शिविर – GIANTS Group of Bisauli Stars द्वारा",
    excerpt: "GIANTS Group of Bisauli Stars द्वारा Oracle Eye Hospital के सहयोग से 16 अक्टूबर 2026 को निःशुल्क नेत्र जाँच शिविर का आयोजन किया जा रहा है। इस शिविर में मोतियाबिंद सर्जरी और सर्जरी के बाद दवाइयाँ भी मुफ्त उपलब्ध कराई जाएँगी। सभी के लिए यह एक स्वास्थ्य सेवा का महत्वपूर्ण अवसर है।",
    category: "Health Camp",
    date: "October 16, 2026",
    postedAt: "2026-10-16T10:00:00.000Z",
    readTime: "5 min read",
    author: {
      name: "GIANTS Group of Bisauli Stars",
      role: "Social Welfare Organization",
      avatar: "https://res.cloudinary.com/irxsvxce/image/upload/v1792564931/Community_Eye_Camp_Examination.png"
    },
    image: "https://res.cloudinary.com/irxsvxce/image/upload/v1792564931/Community_Eye_Camp_Examination.png",
    tags: ["Health Camp", "Eye Camp", "Free Surgery", "Oracle Eye Hospital", "Bisauli"],
    content: `GIANTS Group of Bisauli Stars द्वारा Oracle Eye Hospital के सहयोग से 16 अक्टूबर 2026 को निःशुल्क नेत्र जाँच शिविर का आयोजन किया जा रहा है।

शिविर विवरण:
• तारीख: 16 अक्टूबर 2026
• समय: सुबह 10:00 बजे से दोपहर 02:00 बजे तक
• स्थान: रामकृष्ण दास आयुष्मान धर्मशाला, बिसौली, जिला- बदायूँ/बिसौली
• रजिस्ट्रेशन शुल्क: मात्र ₹10/-

प्रमुख सेवाएँ व सुविधाएँ:
1. निःशुल्क नेत्र जाँच एवं परामर्श
2. मोतियाबिंद (Cataract) सर्जरी पूर्णतः मुफ्त
3. सर्जरी के बाद दवाइयाँ भी मुफ्त उपलब्ध कराई जाएँगी
4. निःशुल्क दवाइयाँ केवल पहले रजिस्ट्रेशन कराने वाले मरीजों को ही मिलेंगी

प्रथा हेल्थ केयर और ओरेकल आई हॉस्पिटल का संकल्प है कि समाज के हर जरूरतमंद तक उत्कृष्ट नेत्र चिकित्सा पहुँचे और रोकथाम योग्य अंधेपन का निवारण हो सके। आप सभी से अनुरोध है कि समय पर पहुँचकर अपना रजिस्ट्रेशन कराएं और इस निःशुल्क नेत्र जाँच व दवा शिविर का अधिक से अधिक लाभ उठाएं।`
  }
];

export function getBlogBySlug(slug) {
  return blogs.find((b) => b.slug === slug || String(b.id) === String(slug)) || null;
}

export function getRecentBlogs(excludeId, limit = 3) {
  return blogs.filter((b) => b.id !== excludeId).slice(0, limit);
}
