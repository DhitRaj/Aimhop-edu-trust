# 🎓 Aimhop Educational Trust – Website

**Complete multi-page website clone for Aimhop Educational & Charitable Trust**

---

## 📁 Folder Structure

```
aimhop-website/
├── index.html                    ← मुख्य होमपेज
├── 404.html                      ← Error Page
├── README.md                     ← This file
├── package.json                  ← Project metadata
├── .gitignore                    ← Files to ignore in git
│
├── pages/                        ← All inner pages
│   ├── about.html                ← Aimhop के बारे में
│   ├── chairman-message.html     ← चेयरमैन का संदेश
│   ├── success-story.html        ← सफलता की कहानी
│   ├── achievements.html         ← उपलब्धियाँ
│   ├── our-team.html                 ← हमारी टीम
│   ├── our-mentors.html              ← हमारे मेंटर्स
│   ├── appeal-parents.html           ← अभिभावकों से अपील
│   ├── awards.html                   ← पुरस्कार
│   ├── infrastructure.html           ← बुनियादी ढाँचा
│   ├── our-associate.html            ← हमारे एसोसिएट
│   ├── our-coordinator.html          ← हमारे कोऑर्डिनेटर
│   ├── course.html                   ← कोर्स
│   ├── university.html               ← विश्वविद्यालय सूची
│   ├── for-student.html              ← छात्रों के लिए
│   ├── student-registration.html     ← छात्र रजिस्ट्रेशन
│   ├── college-registration.html     ← कॉलेज रजिस्ट्रेशन
│   ├── associate-registration.html   ← एसोसिएट रजिस्ट्रेशन
│   ├── coordinator-registration.html ← कोऑर्डिनेटर रजिस्ट्रेशन
│   ├── news.html                 ← समाचार
│   ├── photo-gallery.html            ← फोटो गैलरी
│   ├── video-gallery.html            ← वीडियो गैलरी
│   ├── latest-activity.html          ← नवीनतम गतिविधि
│   ├── blog.html                 ← ब्लॉग स्पॉट
│   ├── contact.html                  ← संपर्क करें
│   ├── nepal-wing.html               ← Nepal Wing
│   ├── kashmir-wing.html             ← Kashmir Wing
│   ├── maharashtra-wing.html         ← Maharashtra Wing
│   ├── career.html                   ← करियर
│   ├── download.html                 ← डाउनलोड
│   ├── terms.html                ← नियम और शर्तें
│   ├── privacy.html              ← गोपनीयता नीति
│   ├── refund.html               ← रिफंड नीति
│   └── payment-policy.html       ← भुगतान नीति
│
├── assets/                       ← Project assets
│   ├── css/
│   │   ├── style.css             ← Main stylesheet (global)
│   │   └── pages.css             ← Inner pages stylesheet
│   └── js/
│       ├── components.js         ← Shared header/footer (inject via JS)
│       └── main.js               ← Main JavaScript (animations, sliders etc.)
└── node_modules/                 ← Dependencies
```

---

## 🚀 Features

- ✅ **34 HTML Pages** – सभी pages पूरी तरह बनाए गए
- ✅ **Hindi (Devanagari) Font** – Noto Sans Devanagari + Poppins
- ✅ **Shared Header/Footer** – components.js से inject होता है
- ✅ **Responsive Design** – Mobile, Tablet, Desktop सभी पर काम करता है
- ✅ **Sticky Navigation** – dropdown menus के साथ
- ✅ **Animated Hero Section** – counters, floating cards
- ✅ **Testimonials Slider** – Auto-slide + dots navigation
- ✅ **Video Modal** – YouTube embed popup
- ✅ **Photo Gallery Filter** – Category filter के साथ
- ✅ **Course Tab Filter** – 10वीं/12वीं/ग्रेजुएशन filter
- ✅ **University Marquee** – Infinite scroll animation
- ✅ **Scroll Animations** – IntersectionObserver से
- ✅ **Counter Animation** – Stats section में numbers animate
- ✅ **Scroll to Top** – Float button
- ✅ **404 Error Page**
- ✅ **All Forms** – Registration forms with validation

---

## 🎨 Design System

| Variable | Value |
|----------|-------|
| Primary | #1a3a6e |
| Accent | #f59e0b |
| Font | Noto Sans Devanagari + Poppins |

---

## 📋 Setup Instructions

1. Download और unzip करें
2. किसी भी web server (Apache, Nginx, Live Server) पर serve करें
3. `index.html` खोलें – बस इतना काफी है!

---

## ✏️ Customization

- **Logo बदलने के लिए:** `js/components.js` में `AIMHOP` text को edit करें
- **Contact Info:** `js/components.js` में phone/email बदलें
- **Colors:** `css/style.css` में `:root` variables बदलें
- **Content:** Each `.html` file को directly edit करें

---

**Developed for Aimhop Educational & Charitable Trust** ❤️



start with this command

**npx serve . in terminal**
