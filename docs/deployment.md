# Deployment Guide - Aimhop Educational Trust

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create `src/server/.env`:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@aimhop.com
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### 3. Start Server
```bash
npm start        # production
npm run dev      # development (nodemon)
```

---

## Heroku Deployment

```bash
heroku login
heroku create aimhop-trust
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password
heroku config:set ADMIN_EMAIL=admin@aimhop.com
heroku config:set NODE_ENV=production
heroku config:set ALLOWED_ORIGINS=https://aimhop.com,https://www.aimhop.com
git push heroku main
```

---

## Docker Deployment

```bash
docker build -t aimhop-trust .
docker run -p 3000:3000 \
  -e EMAIL_USER=your-email \
  -e EMAIL_PASS=your-password \
  -e ADMIN_EMAIL=admin@aimhop.com \
  aimhop-trust
```

---

## GitHub Actions Secrets Required

| Secret | Description |
|--------|-------------|
| HEROKU_API_KEY | Heroku API key |
| HEROKU_APP_NAME | Heroku app name |
| HEROKU_EMAIL | Heroku account email |
| EMAIL_USER | Gmail address |
| EMAIL_PASS | Gmail app password |
| ADMIN_EMAIL | Admin notification email |
| ALLOWED_ORIGINS | Comma-separated allowed origins |

---

## API Endpoints

All endpoints prefixed with `/api/v1/`

- `POST /api/v1/student-register`
- `POST /api/v1/contact`
- `POST /api/v1/college-register`
- `POST /api/v1/associate-register`
- `POST /api/v1/coordinator-register`

---

## Troubleshooting

- **Port in use** → Server auto-fallbacks to next available port
- **Email not sending** → Check EMAIL_USER/EMAIL_PASS, use Gmail App Password
- **Module not found** → Run `npm install`
