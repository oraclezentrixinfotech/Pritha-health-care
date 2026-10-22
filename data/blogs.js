// Centralized blog posts dataset for Pritha Health Care

export const blogCategories = [
  "All",
  "Health Camp",
  "Tobacco Awareness",
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
    excerpt: "GIANTS Group of Bisauli Stars द्वारा Oracle Eye Hospital के सहयोग से 16 अक्टूबर 2026 को निःशुल्क नेत्र जाँच शिविर का आयोजन किया गया। इस शिविर में मोतियाबिंद की सर्जरी और सर्जरी के बाद आवश्यक दवाइयाँ भी निःशुल्क उपलब्ध कराई गईं। यह शिविर लोगों को बेहतर नेत्र स्वास्थ्य सेवाएँ प्रदान करने की दिशा में एक महत्वपूर्ण पहल रही।",
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
    content: `GIANTS Group of Bisauli Stars द्वारा Oracle Eye Hospital के सहयोग से 16 अक्टूबर 2026 को निःशुल्क नेत्र जाँच शिविर का आयोजन किया गया। इस शिविर में मोतियाबिंद की सर्जरी और सर्जरी के बाद आवश्यक दवाइयाँ भी निःशुल्क उपलब्ध कराई गईं। यह शिविर लोगों को बेहतर नेत्र स्वास्थ्य सेवाएँ प्रदान करने की दिशा में एक महत्वपूर्ण पहल रही।

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
  },
  {
    id: 2,
    slug: "community-awareness-drive-on-tobacco-hazards",
    title: "Community Awareness Drive on Tobacco Hazards",
    excerpt: "On 30 September 2026, a community awareness program was organized at Shanker Vihar Colony, Civil Lines, Moradabad, with the aim of spreading awareness about the harmful effects of tobacco consumption and promoting a healthier lifestyle.",
    category: "Tobacco Awareness",
    date: "September 30, 2026",
    postedAt: "2026-09-30T10:00:00.000Z",
    readTime: "4 min read",
    author: {
      name: "Pritha Health Care & Oracle Eye Hospital",
      role: "Community Health Initiative",
      avatar: "https://res.cloudinary.com/irxsvxce/image/upload/v1792648025/Community_Eye_Health_Awareness_Camp.png"
    },
    image: "https://res.cloudinary.com/irxsvxce/image/upload/v1792648025/Community_Eye_Health_Awareness_Camp.png",
    tags: ["Tobacco Awareness", "Health Camp", "Public Health", "Preventive Care", "Moradabad", "Oracle Eye Hospital"],
    content: `Promoting a Tobacco-Free and Healthier Community

On 30 September 2026, a community awareness program was organized at Shanker Vihar Colony, Civil Lines, Moradabad, with the aim of spreading awareness about the harmful effects of tobacco consumption.

The program brought together local residents and health professionals for discussions about tobacco-related health risks and the importance of adopting a healthier lifestyle. With the participation of Oracle Eye Hospital, the initiative highlighted the importance of preventive healthcare, public awareness, and community well-being.

During the program, visitors were encouraged to understand the risks associated with tobacco use, including its links to cancer, heart disease, and respiratory illnesses. The awareness activities also emphasized the importance of seeking professional medical advice and making informed health decisions.

Through this initiative, the organizers aimed to encourage people to avoid tobacco, protect their health, and share awareness with their families and communities.

Building a Healthier Tomorrow

Community awareness initiatives play an important role in promoting healthier habits. By bringing people together and sharing reliable health information, programs like this can help build a more informed and health-conscious society.

Organized with a commitment to community health and a tobacco-free future.`
  }
];

export function getBlogBySlug(slug) {
  return blogs.find((b) => b.slug === slug || String(b.id) === String(slug)) || null;
}

export function getRecentBlogs(excludeId, limit = 3) {
  return blogs.filter((b) => b.id !== excludeId).slice(0, limit);
}
