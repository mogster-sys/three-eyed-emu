# 🚀 Hostinger Deployment Guide for Three Eyed Emu

## Prerequisites
- Hostinger hosting account
- Domain: threeeyedemu.com.au 
- Fresh Supabase credentials
- FTP client (FileZilla recommended)

## Step 1: Prepare Environment Variables

1. **Update .env file** with production Supabase credentials:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

2. **Never commit .env** - it's in .gitignore for security

## Step 2: Build for Production

```bash
# Install dependencies
npm install

# Build optimized production files
npm run build

# Files will be in /dist folder
```

## Step 3: Upload to Hostinger

### Option A: File Manager (Easiest)
1. Login to hPanel → **Files** → **File Manager**
2. Navigate to `public_html` folder
3. **Delete** any existing files in public_html
4. **Upload all contents** from `dist` folder (not the folder itself)
5. Ensure these files are in public_html root:
   - `index.html`
   - `assets/` folder
   - `emu-foot.svg`
   - `_headers` file

### Option B: FTP Upload
1. Get FTP details: hPanel → **Files** → **FTP Accounts**
2. Use FileZilla:
   - Host: your-domain.com
   - Username: your-ftp-username  
   - Password: your-ftp-password
   - Port: 21
3. Upload `dist` contents to `/public_html/`

## Step 4: Configure .htaccess for SPA

Create `.htaccess` in public_html root:

```apache
# Three Eyed Emu SPA Configuration
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Handle React Router (SPA)
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  
  # Security Headers
  Header always set X-Content-Type-Options nosniff
  Header always set X-Frame-Options DENY
  Header always set X-XSS-Protection "1; mode=block"
  
  # Cache Control
  <FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
  </FilesMatch>
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

## Step 5: Domain Configuration

1. **Point domain to hosting**:
   - Update nameservers to Hostinger's
   - Or update A records to point to your hosting IP

2. **SSL Certificate**:
   - hPanel → **Security** → **SSL**
   - Install **Let's Encrypt** certificate (free)
   - Force HTTPS redirect

## Step 6: Test Deployment

1. Visit: `https://threeeyedemu.com.au`
2. Check:
   - ✅ Site loads correctly
   - ✅ All pages work (/privacy, /terms, /refunds)
   - ✅ HTTPS is active
   - ✅ Emu foot animation works
   - ✅ Apps display correctly

## Step 7: Post-Deployment

1. **Google Analytics**: Add tracking ID to analytics.ts
2. **Performance**: Monitor loading speeds
3. **SEO**: Submit sitemap to Google Search Console
4. **Backup**: Schedule regular backups in hPanel

## Troubleshooting

**404 Errors on page refresh:**
- Check `.htaccess` is in public_html root
- Verify mod_rewrite is enabled

**Images not loading:**
- Ensure assets/ folder uploaded correctly
- Check file permissions (755 for folders, 644 for files)

**App shows "Preview mode":**
- Verify Supabase credentials in .env
- Rebuild with correct environment variables

## Performance Optimization

Current bundle size: 766KB (239KB gzipped)
- Consider lazy loading for 3D components if needed
- Images are already optimized
- Lazy loading implemented

---

**Support:** threeeyedemu@zohomail.com.au
**Domain:** threeeyedemu.com.au
**ABN:** 60 976 457 601