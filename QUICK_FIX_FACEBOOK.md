# QUICK FIX - Facebook Link Issue (5 Minutes Total)

**Problem:** Someone can't access your site via Facebook link because of wrong meta tags

**Solution:** Upload ONE file only (not the whole site!)

---

## Step 1: Upload Fixed index.html (2 minutes)

### ⚠️ IMPORTANT: Use the special "FACEBOOK-ONLY" file!
**Upload this file:** `/home/mogie/.codeium/three-eyed-emu/index-FIXED-FACEBOOK-ONLY.html`
**NOT the one in dist/** (that would break the site)

### Option A: Hostinger File Manager (EASIEST)
1. **Log into Hostinger** control panel
2. **Go to:** Files → File Manager
3. **Navigate to:** `public_html/` (or wherever threeeyedemu.com.au points)
4. **Find:** `index.html`
5. **Delete** the old index.html
6. **Upload** the new one from: `/home/mogie/.codeium/three-eyed-emu/index-FIXED-FACEBOOK-ONLY.html`
7. **Rename it** to `index.html` (remove the -FIXED-FACEBOOK-ONLY part)
8. **Done!** (Takes 30 seconds to upload one small file)

### Option B: FileZilla/FTP (if you prefer)
1. Open FileZilla
2. Connect to your Hostinger server
3. Navigate to `public_html/`
4. Drag `index-FIXED-FACEBOOK-ONLY.html` from `/home/mogie/.codeium/three-eyed-emu/`
5. Rename it to `index.html` (overwrite the existing file)
6. Done!

---

## Step 2: Clear Facebook Cache (30 seconds)

1. **Go to:** https://developers.facebook.com/tools/debug/
2. **Paste this URL:** `https://threeeyedemu.com.au`
3. **Click:** "Debug" button
4. **Click:** "Scrape Again" button
5. **Verify:** You should see:
   - ✅ URL shows: `https://threeeyedemu.com.au` (not threeeyed.emu)
   - ✅ Image preview appears
   - ✅ Title: "Three Eyed Emu - Premium Apps & Digital Experiences"

---

## Step 3: Test

1. **Share your link** on Facebook or send via Messenger
2. **The preview should now work correctly**
3. **Your friend should be able to click through**

---

## Why This is FAST (not all night like last time):

❌ **Last time:** You uploaded the ENTIRE site (all images, all JavaScript = SLOW)
✅ **This time:** Just ONE small HTML file (2KB = 2 seconds)

---

## What Changed in the Fixed File:

**OLD (broken):**
```html
<meta property="og:url" content="https://threeeyed.emu" />  ❌ Wrong URL
<meta property="og:image" content="/og-image.jpg" />        ❌ Relative path
```

**NEW (fixed):**
```html
<meta property="og:url" content="https://threeeyedemu.com.au" />           ✅ Correct
<meta property="og:image" content="https://threeeyedemu.com.au/og-image.jpg" /> ✅ Absolute path
```

---

## If Something Goes Wrong:

- Site looks weird? → Clear browser cache (Ctrl+F5)
- Still broken? → The JavaScript/CSS files might have changed names - you'll need the full deployment
- Can't find File Manager? → Look for "Files" or "FTP" in Hostinger control panel

---

**That's it!** Should take 5 minutes max. Let me know when done and I'll help verify it worked.
