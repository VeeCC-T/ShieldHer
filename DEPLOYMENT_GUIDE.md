# ShieldHer Deployment Guide

## 🚀 Deploy Entire Project to Render.com (FREE)

This guide will help you deploy the complete ShieldHer application (Frontend + Backend + Database) to Render.com for free.

---

## Prerequisites

- GitHub account with ShieldHer repository
- Render.com account (sign up at https://render.com - it's free!)

---

## Option 1: One-Click Deploy (RECOMMENDED - Easiest)

### Step 1: Prepare Your Repository
✅ Already done! Your code is pushed to GitHub.

### Step 2: Deploy Using render.yaml

1. **Go to Render Dashboard**: https://dashboard.render.com/
2. **Click "New +" → "Blueprint"**
3. **Connect your GitHub repository**: `VeeCC-T/ShieldHer`
4. **Render will detect the `render.yaml` file automatically**
5. **Click "Apply"**

That's it! Render will automatically create:
- PostgreSQL database
- Django backend service
- React frontend static site

### Step 3: Configure Environment Variables

After deployment starts, you need to set one environment variable:

1. Go to your **backend service** (shieldher-backend)
2. Go to **Environment** tab
3. Add/Update:
   ```
   CORS_ALLOWED_ORIGINS=https://shieldher-frontend.onrender.com
   ```
   (Replace with your actual frontend URL from Render)

4. Go to your **frontend service** (shieldher-frontend)
5. Go to **Environment** tab
6. Add:
   ```
   VITE_API_URL=https://shieldher-backend.onrender.com/api
   ```
   (Replace with your actual backend URL from Render)

### Step 4: Run Database Migrations

1. Go to your **backend service** (shieldher-backend)
2. Click on **Shell** tab
3. Run these commands:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```
4. Follow prompts to create admin user

### Step 5: Get Your Live URLs

Your app will be live at:
- **Frontend**: `https://shieldher-frontend.onrender.com`
- **Backend API**: `https://shieldher-backend.onrender.com/api`
- **Admin Panel**: `https://shieldher-backend.onrender.com/admin`

---

## Option 2: Manual Deploy (If Blueprint Doesn't Work)

### Step 1: Deploy Database

1. Go to Render Dashboard → **New +** → **PostgreSQL**
2. Configure:
   - **Name**: `shieldher-db`
   - **Database**: `shieldher`
   - **User**: `shieldher_user`
   - **Region**: Choose closest to you
   - **Plan**: **Free**
3. Click **"Create Database"**
4. **Copy the Internal Database URL** (you'll need this)

### Step 2: Deploy Backend

1. Go to Render Dashboard → **New +** → **Web Service**
2. **Connect your GitHub repository**: `VeeCC-T/ShieldHer`
3. Configure:
   - **Name**: `shieldher-backend`
   - **Environment**: **Docker**
   - **Region**: Same as database
   - **Branch**: `main`
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Docker Context**: `./backend`
   - **Plan**: **Free**

4. **Add Environment Variables**:
   ```
   DJANGO_SETTINGS_MODULE=config.settings.production
   SECRET_KEY=your-super-secret-key-here-change-this-to-random-string
   DATABASE_URL=<paste-internal-database-url-from-step-1>
   ALLOWED_HOSTS=.onrender.com
   DEBUG=False
   CORS_ALLOWED_ORIGINS=https://your-frontend-url.onrender.com
   ```

5. Click **"Create Web Service"**

6. **After deployment completes**, go to **Shell** tab and run:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

### Step 3: Deploy Frontend

1. Go to Render Dashboard → **New +** → **Static Site**
2. **Connect your GitHub repository**: `VeeCC-T/ShieldHer`
3. Configure:
   - **Name**: `shieldher-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: **Free**

4. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
   (Replace with your actual backend URL)

5. Click **"Create Static Site"**

### Step 4: Update CORS

1. Go back to **backend service**
2. Update `CORS_ALLOWED_ORIGINS` with your actual frontend URL
3. Click **"Save Changes"** (service will redeploy)

---

## 🎉 Your App is Live!

### Access Your Application

- **Frontend**: `https://shieldher-frontend.onrender.com`
- **Backend API**: `https://shieldher-backend.onrender.com/api`
- **Admin Panel**: `https://shieldher-backend.onrender.com/admin`
- **API Docs**: `https://shieldher-backend.onrender.com/api/schema/`

### Important Notes

⚠️ **Free Tier Limitations**:
- Services spin down after 15 minutes of inactivity
- First request after inactivity takes 30-60 seconds to wake up
- Database has 90-day expiration (you'll need to backup/migrate)

✅ **What's Included**:
- Automatic SSL certificates (HTTPS)
- Automatic deployments on git push
- Environment variable management
- Shell access for migrations

---

## 📋 Post-Deployment Checklist

- [ ] Frontend loads successfully
- [ ] Backend API responds at `/api/health/`
- [ ] Admin panel accessible at `/admin`
- [ ] Database migrations completed
- [ ] Superuser created
- [ ] CORS configured correctly
- [ ] Test anonymous report submission
- [ ] Test lesson viewing
- [ ] Test resource access
- [ ] API documentation accessible

---

## 🐛 Troubleshooting

### Frontend shows "Network Error"
- Check `VITE_API_URL` in frontend environment variables
- Verify backend URL is correct
- Check backend service is running

### Backend shows CORS errors
- Update `CORS_ALLOWED_ORIGINS` in backend environment variables
- Include your frontend URL
- Redeploy backend after changes

### Database connection errors
- Verify `DATABASE_URL` is set correctly
- Check database service is running
- Ensure backend and database are in same region

### 500 Server Errors
- Check backend logs in Render dashboard
- Verify all environment variables are set
- Run migrations: `python manage.py migrate`

---

## 🔄 Updating Your Deployment

Every time you push to GitHub main branch:
1. Render automatically detects changes
2. Rebuilds and redeploys affected services
3. Your app updates automatically (takes 2-5 minutes)

---

## 💰 Alternative Free Hosting Options

If Render doesn't work for you:

### Railway.app
- $5 free credit monthly
- Better for full-stack apps
- https://railway.app

### Vercel (Frontend) + Railway (Backend)
- Vercel: Unlimited bandwidth for frontend
- Railway: Backend + Database
- Split deployment

### Fly.io
- 3 free VMs
- Good Docker support
- https://fly.io

---

## 📞 Need Help?

- Check Render documentation: https://render.com/docs
- Review backend logs in Render dashboard
- Check frontend build logs
- Verify environment variables are correct

---

**Remember**: This is a free tier deployment. For production use with real users, consider upgrading to paid plans for better performance and reliability.
