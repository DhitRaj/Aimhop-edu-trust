# 🎓 Aimhop Educational Trust – Website

**Complete multi-page website for Aimhop Educational & Charitable Trust**

---

## 📁 Folder Structure

```
aimhop-website/
├── index.html                    ← मुख्य होमपेज
├── 404.html                      ← Error Page
├── server.js                     ← Backend API (Node.js)
├── .env.example                  ← Environment variables template
├── README.md                     ← This file
├── package.json                  ← Project metadata
├── sitemap.xml                   ← SEO Sitemap
├── robots.txt                    ← SEO Robots file
├── .gitignore                    ← Files to ignore in git
│
├── pages/                        ← All inner pages (38 pages)
│   ├── about.html
│   ├── student-registration.html
│   ├── contact.html
│   ├── course.html
│   ├── university.html
│   ├── educational-wing.html     ← NEW
│   ├── placement-wing.html       ← NEW
│   ├── media-wing.html           ← NEW
│   ├── it-wing.html              ← NEW
│   ├── gallery.html              ← NEW
│   └── ... (33 more pages)
│
├── assets/
│   ├── css/
│   │   ├── style.css             ← Main stylesheet
│   │   ├── pages.css             ← Inner pages stylesheet
│   │   └── accessibility.css     ← NEW - Accessibility improvements
│   └── js/
│       ├── components.js         ← Header/Footer injection
│       ├── main.js               ← Main JavaScript
│       └── forms.js              ← NEW - Form handling & validation
│
└── node_modules/                 ← Dependencies
```

---

## 🚀 Features

- ✅ **38 HTML Pages** – सभी pages पूरी तरह बनाए गए
- ✅ **Backend API** – Node.js + Express server
- ✅ **Form Submission** – Email notifications के साथ
- ✅ **SEO Optimized** – Sitemap, robots.txt, meta tags
- ✅ **Accessibility** – WCAG guidelines के अनुसार
- ✅ **Mobile Responsive** – सभी devices पर काम करता है
- ✅ **Hindi Support** – Noto Sans Devanagari font
- ✅ **Sticky Navigation** – Dropdown menus के साथ
- ✅ **Animated Hero Section** – Counters, floating cards
- ✅ **Testimonials Slider** – Auto-slide + dots navigation
- ✅ **Video Modal** – YouTube embed popup
- ✅ **Photo Gallery Filter** – Category filter के साथ
- ✅ **Form Validation** – Client-side validation
- ✅ **404 Error Page**

---

## 🎨 Design System

| Variable | Value |
|----------|-------|
| Primary | #1a3a6e |
| Accent | #f59e0b |
| Font | Noto Sans Devanagari + Poppins |

---

## 📋 Setup Instructions

### **1. Install Dependencies**
```bash
npm install
```

### **2. Setup Environment Variables**
```bash
cp .env.example .env
```

Edit `.env` file:
```
EMAIL_USER=aimhopgroup@gmail.com
EMAIL_PASS=your-app-password
PORT=3000
```

### **3. Start Backend Server**
```bash
npm start
```

Server will run on `http://localhost:3000`

### **4. Serve Frontend**
```bash
npx serve .
```

Or use any web server (Apache, Nginx, Live Server)

---

## 🔧 API Endpoints

### **Student Registration**
```
POST /api/student-register
Content-Type: application/json

{
  "name": "राज कुमार",
  "email": "raj@example.com",
  "phone": "9151385320",
  "father": "पिता का नाम",
  "dob": "2005-01-15",
  "gender": "पुरुष",
  "state": "बिहार",
  "district": "पटना",
  "qualification": "12वीं पास",
  "course": "B.Tech",
  "address": "पूरा पता",
  "query": "कोई प्रश्न"
}
```

### **Contact Form**
```
POST /api/contact
Content-Type: application/json

{
  "name": "नाम",
  "email": "email@example.com",
  "subject": "विषय",
  "message": "संदेश"
}
```

### **College Registration**
```
POST /api/college-register
Content-Type: application/json

{
  "name": "संपर्क व्यक्ति",
  "email": "college@example.com",
  "phone": "9151385320",
  "college": "कॉलेज का नाम",
  "university": "विश्वविद्यालय",
  "principal": "प्राचार्य का नाम"
}
```

---

## ✏️ Customization

- **Logo बदलने के लिए:** `js/components.js` में `AIMHOP` text को edit करें
- **Contact Info:** `js/components.js` में phone/email बदलें
- **Colors:** `css/style.css` में `:root` variables बदलें
- **Content:** Each `.html` file को directly edit करें
- **Email Service:** `server.js` में email configuration बदलें

---

## 🔐 Security Features

- ✅ Input validation (client & server)
- ✅ Email verification
- ✅ CORS enabled
- ✅ Environment variables for sensitive data
- ✅ Rate limiting ready (can be added)

---

## 📊 SEO Features

- ✅ Meta tags on all pages
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Sitemap.xml
- ✅ robots.txt
- ✅ Canonical URLs
- ✅ Structured data ready

---

## ♿ Accessibility Features

- ✅ ARIA labels
- ✅ Focus states
- ✅ Color contrast compliance
- ✅ Keyboard navigation
- ✅ Skip to main content link
- ✅ Reduced motion support

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

---

## 🚀 Deployment

### **Vercel (Frontend)**
```bash
vercel deploy
```

### **Heroku (Backend)**
```bash
heroku create aimhop-api
git push heroku main
```

### **Docker**
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📞 Support

- **Phone:** +91 9151385320
- **Email:** aimhopgroup@gmail.com
- **Website:** https://aimhop.com

---

**Developed for Aimhop Educational & Charitable Trust** ❤️
