# ShieldHer - Render.com Deployment Guide

This guide will help you deploy the complete ShieldHer platform (Frontend + Backend + Database) to Render.com for FREE.

## 🎯 What You'll Deploy

- **PostgreSQL Database** (Free tier - 90 days)
- **Django Backend API** (Free tier)
- **React Frontend** (Free tier - Static site)

## 📋 Prerequisites

1. GitHub account with ShieldHer repository pushed
2. Render.com account (sign up at <https://render.com> - it's free!)

## 🚀 Deployment Steps

### Step 1: Sign Up for Render.com

1. Go to <https://render.com>
2. Click "Get Started for Free"
3. Sign up with your GitHub account (recommended)
4. Authorize Render to access your repositories

### Step 2: Deploy PostgreSQL Database

1. From Render Dashboard, click **"New +"** → **"PostgreSQL"**
2. Configure the database:
   - **Name:** `shieldher-db`
   - **Database:** `shieldher`
   - **User:** `shieldher_user`
   - **Region:** Choose closest to your location (e.g., Oregon, Frankfurt)
   - **PostgreSQL Version:** 15
   - **Plan:** **Free**
3. Click **"Create Database"**
4. Wait for database to be created (takes 1-2 minutes)
5. **IMPORTANT:** Copy the **Internal Database URL**
   - It looks like: `postgresql://shieldher_user:password@dpg-xxxxx/shieldher`
   - Save this - you'll need it in Step 3!

### Step 3: Deploy Django Backend

1. From Render Dashboard, click **"New +"** → **"Web Service"**
2. Click **"Connect a repository"** → Select **"ShieldHer"**
3. Configure the service:
   - **Name:** `shieldher-backend`
   - **Region:** **Same as your database** (important!)
   - **Branch:** `refactor`
   - **Root Directory:** `backend`
   - **Environment:** `Docker`
   - **Dockerfile Path:** `backend/Dockerfile`
   - **Plan:** **Free**

4. Click **"Advanced"** and add these **Environment Variables**:

   ```sh
   DJANGO_SETTINGS_MODULE = config.settings.production
   DJANGO_SECRET_KEY = <click "Generate" button>
   DATABASE_URL = <paste the Internal Database URL from Step 2>
   DJANGO_ALLOWED_HOSTS = .onrender.com
   DEBUG = False
   CORS_ALLOWED_ORIGINS = https://shieldher-frontend.onrender.com
   ENCRYPTION_KEY = <click "Generate" button>
   DJANGO_SUPERUSER_USERNAME = admin
   DJANGO_SUPERUSER_EMAIL = admin@shieldher.com
   DJANGO_SUPERUSER_PASSWORD = <your-secure-password>
   ```

   **Note:** For `CORS_ALLOWED_ORIGINS`, use your actual frontend URL (you'll update this in Step 5). The superuser account will be created automatically on first deployment.

5. Click **"Create Web Service"**
6. Wait for deployment (first deploy takes 5-10 minutes)

### Step 4: Verify Deployment

After backend deployment completes successfully, the admin user will be created automatically. You can now:

1. Visit the health endpoint: `https://<your-backend>.onrender.com/api/health/`
2. Login to admin panel: `https://<your-backend>.onrender.com/admin` with the credentials you set in environment variables

### Step 5: Deploy React Frontend

1. From Render Dashboard, click **"New +"** → **"Static Site"**
2. Select your **"ShieldHer"** repository
3. Configure the service:
   - **Name:** `shieldher-frontend`
   - **Branch:** `refactor`
   - **Root Directory:** Leave blank (do NOT set to `frontend`)
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/dist` ⚠️ **CRITICAL:** Must be exactly `frontend/dist` from repo root

4. Add **Environment Variable**:

```sh
   VITE_API_URL = https://shieldher-backend.onrender.com/api
```

**Note:** Replace `shieldher-backend` with your actual backend service name

5. Click **"Create Static Site"**
6. Wait for deployment (takes 3-5 minutes)

**Troubleshooting:** If routes like `/emergency` show "404 Not Found":

- Verify **Publish Directory** is exactly `frontend/dist` (not just `dist`)
- Check build logs confirm `_redirects` file was copied to dist
- The `_redirects` file in `frontend/public/` enables SPA routing (already configured)

### Step 6: Update CORS Settings

Now that you have your frontend URL:

1. Go back to **Backend Service** → **"Environment"** tab
2. Update `CORS_ALLOWED_ORIGINS` with your actual frontend URL:

   ```sh
   CORS_ALLOWED_ORIGINS = https://shieldher-frontend.onrender.com
   ```

3. Click **"Save Changes"**
4. Backend will automatically redeploy

### Step 7: Test Your Deployment

1. Visit your frontend URL: `https://shieldher-frontend.onrender.com`
2. Test these features:
   - ✅ Homepage loads
   - ✅ View lessons
   - ✅ View resources
   - ✅ Submit anonymous report
   - ✅ AI chatbot responds

3. Test admin panel:
   - Visit: `https://shieldher-backend.onrender.com/admin`
   - Login with superuser credentials
   - ✅ Can view reports
   - ✅ Can manage lessons

## 🎉 You're Live

Your URLs:

- **Frontend:** `https://shieldher-frontend.onrender.com`
- **Backend API:** `https://shieldher-backend.onrender.com/api`
- **Admin Panel:** `https://shieldher-backend.onrender.com/admin`
- **API Docs:** `https://shieldher-backend.onrender.com/api/schema/`

## 📝 Update README.md

Don't forget to update your README.md with the live deployment link:

```markdown
## 🌐 Live Demo

**Deployed Application:** https://shieldher-frontend.onrender.com

**Backend API:** https://shieldher-backend.onrender.com/api
```

## ⚠️ Important Notes

### Free Tier Limitations

- **Database:** Free for 90 days, then $7/month
- **Services spin down after 15 minutes of inactivity**
- **First load after inactivity takes 30-60 seconds** (cold start)
- **750 hours/month free** (enough for 1 service running 24/7)

### Keeping Services Active

To prevent cold starts, you can:

1. Use a service like UptimeRobot (free) to ping your site every 5 minutes
2. Upgrade to paid plan ($7/month per service) for always-on

### Database Backup

Free tier databases are deleted after 90 days. To keep your data:

1. Upgrade to paid plan before 90 days
2. Or export data regularly using:

   ```bash
   pg_dump $DATABASE_URL > backup.sql
   ```

## 🔧 Troubleshooting

### Backend won't start

- Check logs in Render dashboard
- Verify DATABASE_URL is correct
- Ensure migrations ran successfully

### Frontend can't connect to backend

- Check CORS_ALLOWED_ORIGINS includes your frontend URL
- Verify VITE_API_URL is correct
- Check backend is running (visit /api/health/)

### Database connection errors

- Ensure backend and database are in same region
- Verify DATABASE_URL is the Internal URL, not External
- Check database is running

### 502 Bad Gateway

- Service is starting up (wait 30-60 seconds)
- Check service logs for errors
- Verify Dockerfile builds successfully locally

## 🆘 Need Help?

- Render Docs: <https://render.com/docs>
- Render Community: <https://community.render.com>
- Django Deployment: <https://docs.djangoproject.com/en/4.2/howto/deployment/>

## 🎊 Congratulations

You've successfully deployed a full-stack application with:

- ✅ React frontend
- ✅ Django REST API backend
- ✅ PostgreSQL database
- ✅ SSL certificates (automatic)
- ✅ Continuous deployment from GitHub

Every time you push to GitHub, Render will automatically redeploy your changes!
