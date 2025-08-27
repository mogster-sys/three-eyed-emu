# Hostinger Deployment Guide for Three Eyed Emu

## Security Audit Results ✅

### ✅ Security Checks Completed:
1. **No exposed secrets in code** - All sensitive data uses environment variables
2. **.env properly gitignored** - Environment files excluded from version control
3. **API keys use VITE_ prefix** - Proper client-side environment variable handling
4. **No hardcoded credentials** - All authentication through environment variables
5. **Secure Supabase integration** - Using public anon key appropriately

### ⚠️ Security Issues Found:
1. **run-migration.sh contains hardcoded Supabase key** - This file should be removed or secured
2. **.env file exists with partial credentials** - Ensure production uses different credentials

---

## Pre-Deployment Checklist

### Required Information to Gather:

#### 1. Hostinger Account Details:
- [ ] Hostinger control panel login
- [ ] FTP/SFTP credentials (username, password, host, port)
- [ ] Domain name configured in Hostinger
- [ ] SSL certificate status

#### 2. Supabase Production Credentials:
- [ ] Production Supabase URL
- [ ] Production Supabase Anon Key
- [ ] Supabase project dashboard access

#### 3. Optional Services:
- [ ] Stripe API keys (if implementing payments)
- [ ] Google Analytics ID (if tracking)
- [ ] Any other third-party service credentials

---

## Step-by-Step Deployment Instructions

### Step 1: Prepare Production Environment Variables

Create a `.env.production` file locally (DO NOT COMMIT):
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

### Step 2: Build the Production Application

```bash
# Install dependencies (if not already done)
npm install

# Build for production with environment variables
npm run build
```

This creates a `dist` folder with optimized static files.

### Step 3: Test Production Build Locally

```bash
# Preview the production build
npm run preview
```

Visit http://localhost:4173 to verify everything works.

### Step 4: Prepare Files for Upload

The `dist` folder contains:
- `index.html` - Main HTML file
- `assets/` - JavaScript, CSS, and other assets
- `emu-foot.svg`, `favicon.ico` - Static assets

### Step 5: Connect to Hostinger

#### Option A: Using FileZilla (Recommended)
1. Download and install FileZilla
2. Open Site Manager (File → Site Manager)
3. Add new site with:
   - Protocol: SFTP
   - Host: Your Hostinger server (e.g., ftp.yourdomain.com)
   - Port: 22 (SFTP) or 21 (FTP)
   - Logon Type: Normal
   - User: Your FTP username
   - Password: Your FTP password

#### Option B: Using Command Line
```bash
# Using SFTP
sftp username@your-hostinger-server.com

# Using rsync (if available)
rsync -avz --delete dist/ username@server:/home/username/public_html/
```

### Step 6: Upload Files to Hostinger

1. Navigate to your domain's root directory (usually `public_html` or `domains/yourdomain.com/public_html`)
2. Delete any existing files (backup first if needed)
3. Upload all contents from the `dist` folder
4. Ensure the structure looks like:
   ```
   public_html/
   ├── index.html
   ├── favicon.ico
   ├── emu-foot.svg
   └── assets/
       ├── index-[hash].css
       └── index-[hash].js
   ```

### Step 7: Configure Hostinger Settings

#### A. Set up .htaccess for SPA Routing
Create/edit `.htaccess` in public_html:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Enable Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

# Cache Control
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access 1 year"
  ExpiresByType image/jpeg "access 1 year"
  ExpiresByType image/gif "access 1 year"
  ExpiresByType image/png "access 1 year"
  ExpiresByType image/svg+xml "access 1 year"
  ExpiresByType text/css "access 1 month"
  ExpiresByType application/javascript "access 1 month"
</IfModule>
```

#### B. Enable SSL/HTTPS
1. Go to Hostinger control panel
2. Navigate to SSL section
3. Install Let's Encrypt SSL certificate
4. Force HTTPS redirect

#### C. Configure Domain Settings
1. Ensure domain points to correct directory
2. Set up any subdomains if needed
3. Configure DNS settings if not already done

### Step 8: Verify Deployment

1. Visit your domain: https://yourdomain.com
2. Check browser console for errors (F12)
3. Test all functionality:
   - [ ] Home page loads
   - [ ] Navigation works
   - [ ] Apps display correctly
   - [ ] Contact form (if applicable)
   - [ ] Mobile responsive design

### Step 9: Set Up Monitoring

1. **Uptime Monitoring**: Use Hostinger's built-in monitoring or services like UptimeRobot
2. **Error Tracking**: Consider adding Sentry or similar service
3. **Analytics**: Add Google Analytics or similar

### Step 10: Post-Deployment Security

1. **Remove sensitive files**:
   ```bash
   # On server, ensure these don't exist
   rm -f .env .env.local .env.production
   rm -f run-migration.sh
   ```

2. **Set correct file permissions**:
   ```bash
   find public_html -type d -exec chmod 755 {} \;
   find public_html -type f -exec chmod 644 {} \;
   ```

3. **Regular backups**: Enable Hostinger's automatic backups

---

## Automated Deployment (Optional)

### Using GitHub Actions

1. Set up GitHub Secrets:
   - `FTP_SERVER`: Your Hostinger FTP server
   - `FTP_USERNAME`: Your FTP username
   - `FTP_PASSWORD`: Your FTP password
   - `VITE_SUPABASE_URL`: Production Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Production Supabase key

2. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        
    - name: Deploy to Hostinger
      uses: SamKirkland/FTP-Deploy-Action@v4.3.4
      with:
        server: ${{ secrets.FTP_SERVER }}
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: ./dist/
        server-dir: ./public_html/
```

---

## Troubleshooting

### Common Issues and Solutions:

1. **Blank page after deployment**
   - Check browser console for errors
   - Verify all files uploaded correctly
   - Check .htaccess configuration
   - Ensure environment variables are set

2. **404 errors on routes**
   - Add/verify .htaccess file
   - Ensure mod_rewrite is enabled

3. **Supabase connection errors**
   - Verify environment variables
   - Check Supabase project settings
   - Ensure CORS is configured in Supabase

4. **Slow loading**
   - Enable Gzip compression
   - Implement caching headers
   - Consider using CDN for assets

5. **SSL/HTTPS issues**
   - Install SSL certificate
   - Force HTTPS redirect
   - Update Supabase URL to use HTTPS

---

## Maintenance Tasks

### Weekly:
- [ ] Check site uptime
- [ ] Review error logs
- [ ] Monitor performance

### Monthly:
- [ ] Update dependencies
- [ ] Review security patches
- [ ] Backup database
- [ ] Check SSL certificate expiry

### Quarterly:
- [ ] Full security audit
- [ ] Performance optimization
- [ ] Update documentation

---

## Support Resources

- **Hostinger Support**: https://www.hostinger.com/tutorials/
- **Supabase Docs**: https://supabase.com/docs
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html
- **Project Repository**: [Your GitHub repo]

---

## Final Notes

- Always test in a staging environment first
- Keep production credentials secure and separate
- Regular backups are essential
- Monitor your application after deployment
- Document any custom configurations

For any issues, check the browser console first, then server logs in Hostinger control panel.