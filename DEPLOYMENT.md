# Nirvify Deployment Guide

This document provides instructions for deploying the Nirvify application to Render (backend) and Vercel (frontend).

## Deployment Status

- Backend: Deployed at [https://nirvify.onrender.com](https://nirvify.onrender.com)
- Frontend: Pending deployment on Vercel

## Prerequisites

1. GitHub account
2. Render account
3. Vercel account
4. MongoDB Atlas account (already configured)
5. Cloudinary account

## MongoDB Atlas Configuration

Your application is already configured to use MongoDB Atlas with the following connection string pattern:

```
mongodb+srv://<username>:<password>@nirvify-cluster.e0m2b.mongodb.net/Nirvify-DB
```

Important notes for MongoDB Atlas:

1. Ensure your IP whitelist in Atlas includes Render's IPs (or set to allow access from anywhere for simplicity)
2. The database user has appropriate permissions
3. The connection includes the database name "Nirvify-DB" at the end

## Security Checklist Before Deployment

- [x] Environment variables are properly configured
- [x] No hardcoded credentials in the source code
- [x] `.env` files are included in `.gitignore`
- [x] CORS is properly configured for production
- [x] API endpoints are configured via environment variables
- [x] MongoDB Atlas connection string is configured

## Step 1: Prepare GitHub Repositories

1. Create two GitHub repositories: one for the frontend and one for the backend.
2. Push your code to the respective repositories.

## Step 2: Deploy Backend to Render

1. Log in to Render.
2. Create a new Web Service.
3. Connect your GitHub repository for the backend.
4. Configure the following settings:
   - Name: `nirvify-backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm run server`
   - Instance Type: Choose as per your needs
5. Add the following environment variables:
   - `PORT`: The port on which your server will run (e.g., 3000)
   - `DB`: Your MongoDB Atlas connection string (already configured)
   - `KEY`: A secure JWT secret key
   - `CLOUDINARY_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_SECRET_KEY`: Your Cloudinary API secret
   - `ALLOWED_ORIGINS`: Comma-separated list of allowed origins, including your Vercel frontend URL
6. Click "Create Web Service"

## Step 3: Deploy Frontend to Vercel

1. Log in to Vercel.
2. Create a new project.
3. Connect your GitHub repository for the frontend.
4. Configure the following settings:
   - Framework Preset: `Vite`
5. Add the following environment variables:
   - `VITE_API_URL`: https://nirvify.onrender.com
6. Click "Deploy"

## Step 4: Update CORS Configuration

After deployment, make sure the backend's `ALLOWED_ORIGINS` environment variable includes your Vercel frontend URL.

## Step 5: Test the Deployment

1. Open your Vercel-deployed frontend URL in a browser.
2. Test logging in with the admin credentials (email: admin@nirvify.com, password: admin123).
3. Upload podcasts and episodes using the admin interface.
4. Test the user interface for browsing and playing podcasts.

## Troubleshooting

### CORS Issues

If you encounter CORS issues, check:

1. The `ALLOWED_ORIGINS` environment variable on Render includes your Vercel frontend URL.
2. Your frontend is using the correct API URL from environment variables.

### Authentication Issues

If authentication doesn't work:

1. Ensure your JWT secret key is properly set in the backend environment variables.
2. Check that cookies are being properly set and sent with requests.
3. Verify that HTTPS is used for all communication.

### Database Connection Issues

If the database connection fails:

1. Check your MongoDB Atlas connection string in the backend environment variables.
2. Ensure your IP address or network is whitelisted in MongoDB Atlas.
3. Verify the database user credentials are correct.
4. Check that the database name is included in the connection string.

### Media Upload Issues

If media uploads fail:

1. Verify your Cloudinary credentials in the backend environment variables.
2. Check the Cloudinary folder permissions and limits.

## Regular Maintenance

- Monitor your application's performance and error logs.
- Keep your dependencies updated.
- Regularly back up your database.
- Rotate your JWT and API keys periodically for enhanced security.
