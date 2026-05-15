const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

// 🔒 SECURITY: Warn if secrets are missing (don't exit — Vercel sets these at runtime)
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn('⚠️  WARNING: EMAIL_USER and EMAIL_PASS not set — email features will be disabled');
}

// 🔒 SECURITY: Add security headers
app.use(helmet());

// 🔒 SECURITY: Set request size limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));
app.use(express.static(path.join(__dirname, '../public')));

// 🔒 SECURITY: Rate limiting for registration (5 per hour per IP)
const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Too many registrations from this IP. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'test'
});

// 🔒 SECURITY: Rate limiting for contact form (10 per hour per IP)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Too many contact requests. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'test'
});

// 🔒 SECURITY: HTML escaping function
const escapeHtml = (text) => {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
};

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 🔒 SECURITY: Comprehensive input validation
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));

const validateName = (name) => {
  if (!name || name.length < 2 || name.length > 100) return false;
  return /^[a-zA-Z\s\u0900-\u097F]+$/.test(name); // Allow Hindi + English
};

const validateState = (state) => {
  const allowed = ['Bihar', 'UP', 'Jharkhand', 'WB', 'Delhi', 'Maharashtra', 'Nepal', 'Kashmir', 'Other'];
  return allowed.includes(state);
};

const validateQualification = (qual) => {
  const allowed = ['10th', '12th', 'Graduation', 'Post-Graduation'];
  return allowed.includes(qual);
};

const validateCourse = (course) => {
  const allowed = ['B.Tech', 'B.Sc', 'BCA', 'BBA', 'B.Com', 'B.Pharma', 'Diploma', 'ITI', 'MBA', 'M.Tech', 'Nursing'];
  return allowed.includes(course);
};

// 🔒 SECURITY: Student Registration with rate limiting & validation
app.post('/api/v1/student-register', registrationLimiter, async (req, res) => {
  try {
    const { 
      firstName, lastName, email, phone, gender, qualification, category, 
      nationality, dob, fatherName, motherName, fatherNumber, motherNumber, 
      parentsOccupation, annualIncome, program, course, referenceNo, 
      associateName, address, locations, otherState, agreed 
    } = req.body;

    // 🔒 SECURITY: Essential validation
    if (!firstName || !lastName || !email || !phone || !course || !address) {
      return res.status(400).json({ error: 'सभी आवश्यक फील्ड भरें (नाम, ईमेल, फोन, कोर्स, पता)' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'ईमेल सही नहीं है' });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ error: 'फोन नंबर 10 अंकों का होना चाहिए' });
    }

    // 🔒 SECURITY: Escape essential user input
    const safeName = escapeHtml(`${firstName} ${lastName}`);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeCourse = escapeHtml(course);
    const safeAddress = escapeHtml(address);
    const safeProgram = escapeHtml(program || '');
    const safeLocations = Array.isArray(locations) ? locations.map(l => escapeHtml(l)).join(', ') : escapeHtml(locations || '');

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Aimhop - रजिस्ट्रेशन की पुष्टि',
      html: `
        <h2>नमस्ते ${safeName},</h2>
        <p>आपका रजिस्ट्रेशन सफलतापूर्वक हो गया है।</p>
        <p>हमारी टीम जल्द ही आपसे संपर्क करेगी।</p>
        <p><strong>आपकी जानकारी:</strong></p>
        <ul>
          <li>नाम: ${safeName}</li>
          <li>ईमेल: ${safeEmail}</li>
          <li>फोन: ${safePhone}</li>
          <li>प्रोग्राम: ${safeProgram}</li>
          <li>पसंदीदा कोर्स: ${safeCourse}</li>
        </ul>
        <p>धन्यवाद,<br>Aimhop Educational Trust</p>
      `
    });

    // Send admin notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'aimhopgroup@gmail.com',
      subject: 'नया छात्र रजिस्ट्रेशन',
      html: `
        <h3>नया छात्र रजिस्ट्रेशन</h3>
        <p><strong>नाम:</strong> ${safeName}</p>
        <p><strong>ईमेल:</strong> ${safeEmail}</p>
        <p><strong>फोन:</strong> ${safePhone}</p>
        <p><strong>प्रोग्राम:</strong> ${safeProgram}</p>
        <p><strong>पसंदीदा कोर्स:</strong> ${safeCourse}</p>
        <p><strong>पसंदीदा स्थान:</strong> ${safeLocations}</p>
        <p><strong>पता:</strong> ${safeAddress}</p>
      `
    });

    res.json({ success: true, message: 'रजिस्ट्रेशन सफल! आपको एक ईमेल भेजा गया है।' });
  } catch (error) {
    console.error('Student registration error:', error);
    res.status(500).json({ error: 'सर्वर में त्रुटि हुई' });
  }
});

// 🔒 SECURITY: Contact Form with rate limiting & validation
app.post('/api/v1/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'सभी आवश्यक फील्ड भरें' });
    }

    if (!validateName(name)) {
      return res.status(400).json({ error: 'नाम 2-100 अक्षरों का होना चाहिए' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'ईमेल सही नहीं है' });
    }

    if (message.length > 5000) {
      return res.status(400).json({ error: 'संदेश 5000 अक्षरों से कम होना चाहिए' });
    }

    // 🔒 SECURITY: Escape all user input
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'aimhopgroup@gmail.com',
      subject: `संपर्क फॉर्म: ${safeSubject || 'कोई विषय नहीं'}`,
      html: `
        <h3>नया संपर्क संदेश</h3>
        <p><strong>नाम:</strong> ${safeName}</p>
        <p><strong>ईमेल:</strong> ${safeEmail}</p>
        <p><strong>विषय:</strong> ${safeSubject || 'कोई नहीं'}</p>
        <p><strong>संदेश:</strong></p>
        <p>${safeMessage}</p>
      `
    });

    res.json({ success: true, message: 'आपका संदेश भेज दिया गया है। धन्यवाद!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'सर्वर में त्रुटि हुई' });
  }
});

// 🔒 SECURITY: College Registration with rate limiting & validation
app.post('/api/v1/college-register', registrationLimiter, async (req, res) => {
  try {
    const { 
      collegeName, principleName, email, phone, country, state, city, zipCode, address 
    } = req.body;

    if (!collegeName || !principleName || !email || !phone) {
      return res.status(400).json({ error: 'सभी आवश्यक फील्ड भरें (कॉलेज नाम, प्राचार्य, ईमेल, फोन)' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'ईमेल सही नहीं है' });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ error: 'फोन नंबर 10 अंकों का होना चाहिए' });
    }

    // 🔒 SECURITY: Escape all user input
    const safeCollege = escapeHtml(collegeName);
    const safePrincipal = escapeHtml(principleName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeCountry = escapeHtml(country || '');
    const safeState = escapeHtml(state || '');
    const safeCity = escapeHtml(city || '');
    const safeZip = escapeHtml(zipCode || '');
    const safeAddress = escapeHtml(address || '');

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'aimhopgroup@gmail.com',
      subject: 'नया कॉलेज रजिस्ट्रेशन',
      html: `
        <h3>नया कॉलेज रजिस्ट्रेशन</h3>
        <p><strong>कॉलेज का नाम:</strong> ${safeCollege}</p>
        <p><strong>प्राचार्य:</strong> ${safePrincipal}</p>
        <p><strong>ईमेल:</strong> ${safeEmail}</p>
        <p><strong>फोन:</strong> ${safePhone}</p>
        <p><strong>स्थान:</strong> ${safeCity}, ${safeState}, ${safeCountry} - ${safeZip}</p>
        <p><strong>पता:</strong> ${safeAddress}</p>
      `
    });

    res.json({ success: true, message: 'कॉलेज रजिस्ट्रेशन सफल!' });
  } catch (error) {
    console.error('College registration error:', error);
    res.status(500).json({ error: 'सर्वर में त्रुटि हुई' });
  }
});

// 🔒 SECURITY: Associate Registration with rate limiting & validation
app.post('/api/v1/associate-register', registrationLimiter, async (req, res) => {
  try {
    const { 
      firstName, lastName, email, phone, address, country, state, city, zipCode 
    } = req.body;

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ error: 'सभी आवश्यक फील्ड भरें (नाम, ईमेल, फोन)' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'ईमेल सही नहीं है' });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ error: 'फोन नंबर 10 अंकों का होना चाहिए' });
    }

    // 🔒 SECURITY: Escape all user input
    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeAddress = escapeHtml(address || '');
    const safeCountry = escapeHtml(country || '');
    const safeState = escapeHtml(state || '');
    const safeCity = escapeHtml(city || '');
    const safeZip = escapeHtml(zipCode || '');

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'aimhopgroup@gmail.com',
      subject: 'नया एसोसिएट रजिस्ट्रेशन',
      html: `
        <h3>नया एसोसिएट रजिस्ट्रेशन</h3>
        <p><strong>नाम:</strong> ${safeFirstName} ${safeLastName}</p>
        <p><strong>ईमेल:</strong> ${safeEmail}</p>
        <p><strong>फोन:</strong> ${safePhone}</p>
        <p><strong>स्थान:</strong> ${safeCity}, ${safeState}, ${safeCountry} - ${safeZip}</p>
        <p><strong>पता:</strong> ${safeAddress}</p>
      `
    });

    res.json({ success: true, message: 'एसोसिएट रजिस्ट्रेशन सफल!' });
  } catch (error) {
    console.error('Associate registration error:', error);
    res.status(500).json({ error: 'सर्वर में त्रुटि हुई' });
  }
});

// 🔒 SECURITY: Coordinator Registration with rate limiting & validation
app.post('/api/v1/coordinator-register', registrationLimiter, async (req, res) => {
  try {
    const { 
      firstName, lastName, email, phone, address, country, state, city, zipCode 
    } = req.body;

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ error: 'सभी आवश्यक फील्ड भरें (नाम, ईमेल, फोन)' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'ईमेल सही नहीं है' });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ error: 'फोन नंबर 10 अंकों का होना चाहिए' });
    }

    // 🔒 SECURITY: Escape all user input
    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeAddress = escapeHtml(address || '');
    const safeCountry = escapeHtml(country || '');
    const safeState = escapeHtml(state || '');
    const safeCity = escapeHtml(city || '');
    const safeZip = escapeHtml(zipCode || '');

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'aimhopgroup@gmail.com',
      subject: 'नया कोऑर्डिनेटर रजिस्ट्रेशन',
      html: `
        <h3>नया कोऑर्डिनेटर रजिस्ट्रेशन</h3>
        <p><strong>नाम:</strong> ${safeFirstName} ${safeLastName}</p>
        <p><strong>ईमेल:</strong> ${safeEmail}</p>
        <p><strong>फोन:</strong> ${safePhone}</p>
        <p><strong>स्थान:</strong> ${safeCity}, ${safeState}, ${safeCountry} - ${safeZip}</p>
        <p><strong>पता:</strong> ${safeAddress}</p>
      `
    });

    res.json({ success: true, message: 'कोऑर्डिनेटर रजिस्ट्रेशन सफल!' });
  } catch (error) {
    console.error('Coordinator registration error:', error);
    res.status(500).json({ error: 'सर्वर में त्रुटि हुई' });
  }
});

// Catch-all: serve index.html for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Access at: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Handle port already in use - try next available port
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const nextPort = PORT + 1;
    console.warn(`⚠️  Port ${PORT} is already in use, trying port ${nextPort}...`);
    
    const retryServer = app.listen(nextPort, () => {
      console.log(`✅ Server running on port ${nextPort}`);
      console.log(`📍 Access at: http://localhost:${nextPort}`);
    });
    
    retryServer.on('error', (retryErr) => {
      if (retryErr.code === 'EADDRINUSE') {
        console.error(`❌ Ports ${PORT} and ${nextPort} are both in use`);
        console.log(`💡 Try: PORT=3003 npm start`);
        process.exit(1);
      }
      throw retryErr;
    });
  } else {
    throw err;
  }
});
