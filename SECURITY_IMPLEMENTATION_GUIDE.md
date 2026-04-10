# 🔒 Security Implementation Guide

## Step-by-Step Implementation

### Step 1: Install Security Packages

```bash
npm install express-rate-limit helmet
```

**What these do:**
- `express-rate-limit`: Prevents brute force attacks and DoS
- `helmet`: Adds security headers automatically

### Step 2: Update .env File

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

**Fill in your actual values:**
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password-from-gmail
ADMIN_EMAIL=admin@aimhop.com
PORT=3000
NODE_ENV=production
ALLOWED_ORIGINS=https://aimhop.com,https://www.aimhop.com
```

**⚠️ IMPORTANT:**
- Never commit `.env` to Git
- Use app-specific passwords for Gmail (not your main password)
- Keep `NODE_ENV=production` for production

### Step 3: Verify server.js Changes

The updated `server.js` now includes:

✅ **HTML Escaping** - All user input is escaped before being used in emails
✅ **Rate Limiting** - Max 5 registrations per hour per IP, 10 contact forms per hour
✅ **Input Validation** - Comprehensive validation for all fields
✅ **Security Headers** - Helmet adds security headers automatically
✅ **Request Size Limits** - Max 10KB per request to prevent DoS
✅ **API Versioning** - All endpoints now use `/api/v1/` prefix
✅ **Fail-Fast Secrets** - App crashes if .env secrets are missing

### Step 4: Update Frontend API Calls

Update all form submissions to use new `/api/v1/` endpoints:

**Before:**
```javascript
fetch('/api/student-register', { method: 'POST', ... })
```

**After:**
```javascript
fetch('/api/v1/student-register', { method: 'POST', ... })
```

**Files to update:**
- `assets/js/forms.js` - Update all fetch URLs
- `pages/student-registration.html` - Update form action
- `pages/contact.html` - Update form action
- `pages/college-registration.html` - Update form action

### Step 5: Test the Implementation

#### Test 1: Rate Limiting
```bash
# Try to register 6 times in quick succession
# 6th request should be blocked with 429 status
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/v1/student-register \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","phone":"1234567890","father":"Dad","state":"Bihar","district":"Patna","qualification":"12th","course":"B.Tech"}'
done
```

#### Test 2: Input Validation
```bash
# Try with invalid email
curl -X POST http://localhost:3000/api/v1/student-register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"invalid-email","phone":"1234567890","father":"Dad","state":"Bihar","district":"Patna","qualification":"12th","course":"B.Tech"}'
# Should return: "ईमेल सही नहीं है"
```

#### Test 3: XSS Prevention
```bash
# Try to inject script
curl -X POST http://localhost:3000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"<script>alert(1)</script>","email":"test@test.com","message":"Test"}'
# Script should be escaped in email
```

#### Test 4: Request Size Limit
```bash
# Try to send >10KB payload
curl -X POST http://localhost:3000/api/v1/student-register \
  -H "Content-Type: application/json" \
  -d '{"name":"'$(printf 'A%.0s' {1..20000})'","email":"test@test.com",...}'
# Should return: 413 Payload Too Large
```

### Step 6: Update Frontend Forms

**Example: Student Registration Form**

```html
<form id="studentRegForm">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <input type="tel" name="phone" required>
  <!-- ... other fields ... -->
  <button type="submit">Register</button>
</form>

<script>
document.getElementById('studentRegForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  try {
    const response = await fetch('/api/v1/student-register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      alert(result.message);
      e.target.reset();
    } else {
      alert('Error: ' + result.error);
    }
  } catch (error) {
    alert('Network error: ' + error.message);
  }
});
</script>
```

### Step 7: Deploy to Production

**Before deploying:**

1. ✅ Test all endpoints locally
2. ✅ Verify .env file is NOT in Git
3. ✅ Check that NODE_ENV=production
4. ✅ Update ALLOWED_ORIGINS to your domain
5. ✅ Test rate limiting works
6. ✅ Verify security headers are present

**Check security headers:**
```bash
curl -I https://aimhop.com
# Should see headers like:
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# Strict-Transport-Security: max-age=31536000
```

### Step 8: Monitor & Maintain

**Check logs for attacks:**
```bash
# Look for rate limit hits
grep "Too many" server.log

# Look for validation errors
grep "Invalid" server.log
```

**Update dependencies regularly:**
```bash
npm outdated  # Check for updates
npm update    # Update packages
npm audit     # Check for vulnerabilities
npm audit fix # Fix vulnerabilities
```

---

## Security Checklist

- [ ] Installed `express-rate-limit` and `helmet`
- [ ] Created `.env` file with real credentials
- [ ] Verified `.env` is in `.gitignore`
- [ ] Updated all frontend API calls to `/api/v1/`
- [ ] Tested rate limiting (6 requests blocked)
- [ ] Tested input validation (invalid email rejected)
- [ ] Tested XSS prevention (script escaped)
- [ ] Tested request size limit (>10KB rejected)
- [ ] Verified security headers present
- [ ] Updated ALLOWED_ORIGINS for production
- [ ] Set NODE_ENV=production
- [ ] Tested all forms work correctly
- [ ] Deployed to production
- [ ] Monitored logs for attacks

---

## Common Issues & Fixes

### Issue: "EMAIL_USER and EMAIL_PASS must be set"
**Fix:** Create `.env` file with real Gmail credentials

### Issue: Rate limiting not working
**Fix:** Make sure `express-rate-limit` is installed: `npm install express-rate-limit`

### Issue: CORS errors in browser
**Fix:** Update ALLOWED_ORIGINS in `.env` to include your domain

### Issue: Emails not sending
**Fix:** 
1. Use Gmail app-specific password (not main password)
2. Enable "Less secure app access" in Gmail settings
3. Check EMAIL_USER and EMAIL_PASS in .env

### Issue: Forms submitting to old `/api/` endpoints
**Fix:** Update all fetch URLs to `/api/v1/`

---

## Next Steps (Optional Enhancements)

### Add CSRF Protection
```bash
npm install csurf cookie-parser
```

### Add Logging
```bash
npm install winston
```

### Add Database
```bash
npm install mongoose  # For MongoDB
# or
npm install pg        # For PostgreSQL
```

### Add Authentication
Consider using:
- Supabase Auth
- Firebase Auth
- Clerk
- Auth0

---

## Support

For security questions or issues:
1. Check SECURITY_AUDIT_REPORT.md
2. Review server.js comments (marked with 🔒)
3. Test endpoints with curl commands above
4. Check npm audit for dependency issues

