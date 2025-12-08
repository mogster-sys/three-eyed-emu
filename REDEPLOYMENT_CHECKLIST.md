# Three Eyed Emu - Redeployment Checklist

Current Version: 1.0.0-2025.12.04
Domain: threeeyedemu.com.au
Hosting: Hostinger

---

## Quick Redeployment Steps

### 1. Update Version Number

Before each deployment, update the version in package.json:

    "version": "1.0.0-YYYY.MM.DD"


### 2. Build Production Bundle

    # Install any new dependencies
    npm install

    # Build optimized production files
    npm run build

    # Optional: Preview locally before deploying
    npm run preview

The build output goes to the /dist folder.


### 3. Upload to Hostinger

**Option A: File Manager (Recommended for small updates)**

1. Login to hPanel > Files > File Manager
2. Navigate to public_html
3. Backup existing files (optional but recommended):
   - Create a folder like backup-YYYY-MM-DD
   - Move current files there
4. Upload all contents from local /dist folder:
   - index.html
   - assets/ folder (contains JS/CSS bundles)
   - favicon.ico
   - emu-foot.svg
   - robots.txt
   - _headers
   - Any image files in root

**Option B: FTP (FileZilla)**

1. Connect to Hostinger FTP:
   - Host: ftp.threeeyedemu.com.au (or check hPanel)
   - Port: 21
   - Username/Password: From hPanel > Files > FTP Accounts
2. Navigate to /public_html/
3. Upload contents of /dist folder, overwriting existing files


### 4. Verify .htaccess Exists

Ensure .htaccess is in public_html root. If missing, create it with:

    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>


### 5. Clear Cache (if needed)

- Hostinger: hPanel > Advanced > Cache Manager > Clear
- Cloudflare (if used): Purge cache
- Browser: Hard refresh (Ctrl+Shift+R)


### 6. Verify Deployment

Visit https://threeeyedemu.com.au and check:

- Homepage loads correctly
- Emu mascot displays and animates
- App cards show with images
- Navigation works (Privacy, Terms, Refunds pages)
- Mobile responsive layout works
- No console errors (F12 > Console)

---

## Deployment History

Version              | Date       | Changes
---------------------|------------|------------------
1.0.0-2025.12.04     | 2025-12-04 | Current release

---

## Rollback Procedure

If something goes wrong:

1. Go to hPanel > File Manager
2. Delete contents of public_html
3. Restore from backup folder or previous git commit
4. Rebuild and redeploy

---

## Important Files Checklist

Files that MUST be in public_html after deployment:

    public_html/
    |-- index.html          <- Main app entry
    |-- .htaccess           <- SPA routing config
    |-- favicon.ico         <- Browser tab icon
    |-- emu-foot.svg        <- Emu foot graphic
    |-- robots.txt          <- Search engine config
    |-- _headers            <- Security headers
    |-- assets/
    |   |-- index-[hash].js   <- App bundle
    |   |-- index-[hash].css  <- Styles
    |-- lovable-uploads/    <- Additional images

---

## Quick Commands Reference

    # Check current version
    npm pkg get version

    # Update version (manual edit package.json or):
    npm version 1.0.0-2025.12.05 --no-git-tag-version

    # Full rebuild
    rm -rf dist && npm run build

    # Preview build locally
    npm run preview

---

Support: threeeyedemu@zohomail.com.au
