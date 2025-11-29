# Manual Deployment Steps (Most Reliable)

Since Blueprint is having issues, let's deploy manually. This is actually easier and gives you more control.

---

## 🎯 Step-by-Step Manual Deployment

### Step 1: Deploy Backend

1. **Go to Render Dashboard**: https://dashboard.render.com/
2. **Click "New +" → "Web Service"**
3. **Connect GitHub**: Select `VeeCC-T/ShieldHer`
4. **Configure Service**:
   - **Name**: `shieldher-backend`
   - **Region**: Choose closest to you (e.g., Oregon USA)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Docker`
   - **Instance Type**: `Free`

5. **Environment Variables** - Click "Advanced" and add:
   ```
   DJANGO_SETTINGS_MODULE=config.settings.production
   SECRET_KEY=django-insecure-CHANGE-THIS-TO-RANDOM-STRING-12345
   DATABASE_URL=<your-existing-database-internal-url>
   ALLOWED_HOSTS=.onrender.com
   DEBUG=False
   CORS_ALLOWED_ORIGINS=https://shieldher-frontend.onrender.com
   PORT=8000
   ```

6. **Click "Create Web Service"**

7. **Wait for deployment** (5-10 minutes)

8. **Once deployed, go to Shell tab** and run:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

---

### Step 2: Deploy Frontend

1. **Go to Render Dashboard**: https://dashboard.render.com/
2. **Click "New +" → "Static Site"**
3. **Connect GitHub**: Select `VeeCC-T/ShieldHer`
4. **Configure Site**:
   - **Name**: `shieldher-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

5. **Environment Variables** - Add:
   ```
   VITE_API_URL=https://shieldher-backend.onrender.com/api
   ```
   (Replace with your actual backend URL from Step 1)

6. **Click "Create Static Site"**

7. **Wait for deployment** (2-5 minutes)

---

### Step 3: Update CORS Settings

1. **Go back to backend service**
2. **Environment tab**
3. **Update `CORS_ALLOWED_ORIGINS`** with your actual frontend URL:
   ```
   CORS_ALLOWED_ORIGINS=https://shieldher-frontend.onrender.com
   ```
4. **Save** (service will auto-redeploy)

---

### Step 4: Get Your Database URL

If you don't have your database URL:

1. **Go to your existing database** in Render dashboard
2. **Scroll to "Connections" section**
3. **Copy "Internal Database URL"**
4. **Add it to backend environment variables** as `DATABASE_URL`

---

## 🎉 Your Live URLs

After deployment:
- **Frontend**: `https://shieldher-frontend.onrender.com`
- **Backend API**: `https://shieldher-backend.onrender.com/api`
- **Admin Panel**: `https://shieldher-backend.onrender.com/admin`

---

## ✅ Testing Checklist

Test these to make sure everything works:

- [ ] Visit frontend URL - should load
- [ ] Visit backend/api/health/ - should return OK
- [ ] Visit backend/admin - should show login page
- [ ] Login to admin with superuser credentials
- [ ] Test creating a lesson in admin
- [ ] Test viewing lessons on frontend

---

## 🐛 Common Issues & Fixes

### Backend shows "Application Error"
- Check logs in Render dashboard
- Verify DATABASE_URL is set correctly
- Make sure migrations ran successfully

### Frontend shows blank page
- Check browser console for errors
- Verify VITE_API_URL is correct
- Make sure backend is running

### CORS errors in browser console
- Update CORS_ALLOWED_ORIGINS in backend
- Include your frontend URL
- Redeploy backend

### Database connection errors
- Verify DATABASE_URL format: `postgresql://user:pass@host:port/dbname`
- Check database is running
- Ensure backend and database are in same region

---

## 📝 Important Notes

⚠️ **Free Tier Limitations**:
- Services sleep after 15 min of inactivity
- First request takes 30-60 seconds to wake up
- 750 hours/month free (enough for 1 service 24/7)

💡 **Tips**:
- Keep your SECRET_KEY secret (don't share it)
- Database URL should be the "Internal" URL, not external
- Frontend and backend can be in different regions
- Static sites (frontend) never sleep

---

## 🔄 Future Updates

Every time you push to GitHub:
1. Render auto-detects changes
2. Rebuilds affected services
3. Deploys automatically
4. Takes 2-5 minutes

You can also manually trigger deploys from Render dashboard.

---

**This manual approach is more reliable than Blueprint and gives you better control over each service!**
