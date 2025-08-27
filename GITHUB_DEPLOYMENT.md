# 📚 GitHub Deployment & Management Guide

## 🔒 Security First - Repository Setup

### 1. Protect Sensitive Information
```bash
# Verify .env is not tracked
git status
# Should NOT show .env in tracked files

# If .env is tracked, remove it:
git rm --cached .env
git commit -m "Remove sensitive .env file"
```

### 2. Set Up Repository Secrets
For GitHub Actions deployment:

1. Go to: **Settings** → **Secrets and variables** → **Actions**
2. Add **Repository Secrets**:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_production_anon_key
   ```

## 🚀 GitHub Pages Deployment (Free Option)

### Option 1: Manual GitHub Pages
1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Push dist to gh-pages branch**:
   ```bash
   # Create and switch to gh-pages branch
   git checkout --orphan gh-pages
   
   # Add only dist contents
   git --work-tree dist add --all
   git --work-tree dist commit -m "Deploy to GitHub Pages"
   git push origin HEAD:gh-pages
   
   # Switch back to main
   git checkout main
   ```

3. **Enable GitHub Pages**:
   - Repository → **Settings** → **Pages**
   - Source: **Deploy from branch**
   - Branch: **gh-pages**
   - Folder: **/ (root)**

### Option 2: Automated GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Create .env file
      run: |
        echo "VITE_SUPABASE_URL=${{ secrets.VITE_SUPABASE_URL }}" > .env
        echo "VITE_SUPABASE_ANON_KEY=${{ secrets.VITE_SUPABASE_ANON_KEY }}" >> .env
        
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 🏢 GitHub + Hostinger Integration

### Automated Deployment via FTP

Create `.github/workflows/hostinger-deploy.yml`:

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install and build
      run: |
        npm ci
        echo "VITE_SUPABASE_URL=${{ secrets.VITE_SUPABASE_URL }}" > .env
        echo "VITE_SUPABASE_ANON_KEY=${{ secrets.VITE_SUPABASE_ANON_KEY }}" >> .env
        npm run build
        
    - name: Deploy to Hostinger via FTP
      uses: SamKirkland/FTP-Deploy-Action@4.3.3
      with:
        server: your-ftp-server.com
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: dist/
        server-dir: public_html/
```

Required secrets for Hostinger deployment:
- `FTP_USERNAME`
- `FTP_PASSWORD`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📁 Repository Structure Best Practices

```
three-eyed-futurescape/
├── .github/workflows/          # GitHub Actions
├── .gitignore                  # Git ignore patterns
├── .env                        # Local env (NEVER commit)
├── .env.example               # Template for others
├── src/                       # Source code
├── public/                    # Static assets
├── dist/                      # Build output (auto-generated)
├── HOSTINGER_DEPLOYMENT.md    # Deployment guide
├── GITHUB_DEPLOYMENT.md       # This file
└── README.md                  # Project documentation
```

## 🔄 Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes, test locally
npm run dev

# Commit changes
git add .
git commit -m "Add new feature"

# Push and create PR
git push origin feature/new-feature
```

### 2. Production Deployment
```bash
# Merge to main triggers deployment
git checkout main
git merge feature/new-feature
git push origin main
# GitHub Actions automatically deploys
```

## 🐛 Troubleshooting

**Build fails in GitHub Actions:**
- Check Node.js version compatibility
- Verify all secrets are set correctly
- Check build logs in Actions tab

**Environment variables not working:**
- Ensure secrets are prefixed with `VITE_`
- Verify secret names match exactly
- Check .env file creation in workflow

**FTP deployment fails:**
- Verify FTP credentials in Hostinger panel
- Check server-dir path (`public_html/`)
- Ensure FTP user has write permissions

## 🔒 Security Checklist

- ✅ `.env` in `.gitignore`
- ✅ Secrets stored in GitHub, not code
- ✅ Production credentials separate from dev
- ✅ FTP credentials secured
- ✅ Repository is private (if needed)

## 📊 Monitoring & Analytics

Add to your workflow:
1. **Performance monitoring**: Lighthouse CI
2. **Security scanning**: CodeQL analysis
3. **Dependency updates**: Dependabot
4. **Issue tracking**: GitHub Issues

---

**Repository URL**: https://github.com/your-username/three-eyed-futurescape
**Live Site**: https://threeeyedemu.com.au
**GitHub Pages**: https://your-username.github.io/three-eyed-futurescape