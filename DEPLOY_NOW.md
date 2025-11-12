# 🚀 DEPLOY TO HOSTINGER NOW

**Everything is ready!** Just follow these simple steps.

---

## Step 1: Log into Hostinger (1 minute)

1. Go to: https://hpanel.hostinger.com/
2. Log in (hope you can find that password! 🤞)
3. Find your website: **threeeyedemu.com.au**

---

## Step 2: Open File Manager (30 seconds)

1. Click on **Files** (or **File Manager**)
2. Navigate to: **public_html/** (or wherever your domain points)

---

## Step 3: Upload the New Site (5-10 minutes)

### Option A: Delete Old, Upload New (RECOMMENDED)
1. **Select ALL files** in public_html/
2. **Delete them** (make a backup first if you're nervous)
3. **Upload ALL files** from: `/home/mogie/.codeium/three-eyed-emu/dist/`
4. Done!

### Option B: Replace Files One by One (If nervous)
1. Upload files from `dist/` and **overwrite** existing ones
2. Make sure to upload:
   - `index.html`
   - The entire `assets/` folder
   - All PNG images
   - `favicon` files
   - `og-image.jpg`

---

## Step 4: Verify It Works (30 seconds)

1. Visit: https://threeeyedemu.com.au
2. Check:
   - ✅ Site loads
   - ✅ New apps appear (TidyMind, PurrTrack 9, MindHause, VoiceFocus)
   - ✅ Updated text on those 3 apps
   - ✅ MindHause has correct image

---

## Step 5: Clear Facebook Cache (30 seconds)

**THIS IS THE IMPORTANT PART FOR YOUR FRIEND!**

1. Go to: https://developers.facebook.com/tools/debug/
2. Paste: `https://threeeyedemu.com.au`
3. Click: **"Debug"**
4. Click: **"Scrape Again"**
5. Verify you see:
   - ✅ Correct URL: `https://threeeyedemu.com.au`
   - ✅ Preview image appears
   - ✅ Title shows correctly

---

## Step 6: Test with Your Friend! 🎉

1. Share the link: https://threeeyedemu.com.au
2. They should now be able to:
   - See the correct preview in Facebook/Messenger
   - Click through and view your site
   - See all your awesome apps!

---

## If Something Goes Wrong:

### Site looks weird or broken?
- Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check that ALL files uploaded correctly
- Make sure the `assets/` folder uploaded with all JS/CSS files

### Facebook still showing old preview?
- Wait 5 minutes and scrape again (Facebook can be slow)
- Try sharing in a different conversation
- Check the debugger shows the correct info

### Can't find Hostinger password?
- Use "Forgot Password" on Hostinger login
- Check your email for password reset

---

## What Changed in This Deployment:

✅ **4 New Apps:**
- TidyMind (ADHD decluttering)
- PurrTrack 9 (Smart cat collar - hardware!)
- MindHause (First-person memory palace)
- VoiceFocus for YouTube (Voice replacement)

✅ **Updated Copy:**
- PurrTrack 9: Better wording about bells and sensors
- VoiceFocus: "More tolerable voice of your choosing"
- MindHause: Complete rewrite with spatial memory focus

✅ **Fixed Image:**
- MindHause now has correct memory palace visualization

✅ **Facebook Meta Tags:**
- Fixed canonical URL (threeeyedemu.com.au)
- Fixed og:image with absolute URL
- Should work in Facebook/Messenger/LinkedIn now

---

## Quick Access to Dist Folder:

In Windows Explorer:
```
\\wsl$\Ubuntu\home\mogie\.codeium\three-eyed-emu\dist
```

Or from WSL:
```
/home/mogie/.codeium/three-eyed-emu/dist/
```

---

**Ready? Let's do this! 🚀**

Come back here when you're deploying and I'll help if anything goes wrong.
