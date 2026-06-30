# Gate Register — Setup Guide (Updated)

## ✨ What's New (Latest Update)

✅ **Login system** - Name + Password account creation  
✅ **Outward Number** - Auto-generates unique numbers per OUT scan  
✅ **Date parsing fixed** - "6/29/2026" format now works  
✅ **Cleaner UI** - OUT/INWARD buttons (no Discard/Log Anyway)  
✅ **Auto-sync** - Every 30 seconds to Sheet (no manual popup)  
✅ **Employee passwords** - Secure gate access per person  

---

## Important Limitations (Read First!)

### 1. **PWA, Not Android .apk**
This is a web app you install from browser (like app), NOT a native Android app.
- ✅ Works offline
- ✅ Camera scanning works
- ✅ Works like app on home screen
- ❌ NOT available on Google Play Store
- ❌ Can't generate native .apk here (needs Android Studio + developer)

If you need actual .apk, you'll need to hire Android developer or use Capacitor tool.

### 2. **MAC Address Not Available**
Modern Android (10+) and iOS block apps from reading MAC address (privacy reason).  
**Instead:** We log **Device ID** + **Employee Name** + **Timestamp** — this is what gatekeepers need anyway!

---

## Setup Instructions

### Step 1: Create Google Sheet + Backend

1. Open Google Drive → Create new **Spreadsheet**
2. Click **Extensions** → **Apps Script**
3. Delete everything, paste code from `google-apps-script.gs` file
4. Click **Deploy** → **New deployment**
   - Type: `Web app`
   - Execute as: `Me`
   - Grant access: `Anyone`
5. Copy the generated URL (looks like: `https://script.google.com/macros/s/ABC123...`)

### Step 2: Add Sheet URL to App

1. Open `index.html` in a text editor
2. Find line 17: `const SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. Replace that placeholder with your actual URL from Step 1
4. **Save the file**

### Step 3: Host the App on Internet

Upload these 4 files to free hosting:
- `index.html`
- `manifest.json`
- `sw.js`
- `icon.svg`

**Recommended:**
- **GitHub Pages** (easiest) - Create repo, upload files, enable Pages in Settings
- **Netlify** - Drag & drop files
- **Vercel** - Same as Netlify
- **Any HTTPS hosting** (must be HTTPS, not HTTP — camera won't work on HTTP)

### Step 4: Use on Mobile

1. Open your hosted URL in Chrome on Android
2. Tap menu (⋮) → **"Install app"** or **"Add to Home Screen"**
3. Icon appears on home screen — tap to open

---

## How to Use

### First Time Setup
- App opens → **"Create new account"**
- Enter: **Name** + **Password**
- Account saved locally on phone

### Daily Gate Work

**Gate OUT:**
1. Select **"GATE OUT"** button
2. Tap **"Scan DC QR Code"**
3. Point camera at DC document QR
4. Tap **"OUTWARD"** when slip appears
5. ✅ Logged! Outward # auto-generated
6. Syncs to Google Sheet in 30 seconds

**Gate IN:**
- Same process, tap **"GATE IN"** button and **"INWARD"** on slip

### Check History
- Bottom tab → **"History"**
- See all scans on this device
- Shows sync status

---

## QR Code Format Expected

Your DC QR code needs to contain:
```
I402600052   6/29/2026
(DC NUMBER) + (DATE in M/D/YYYY format)
```

✅ Supported formats:
- M/D/YYYY (6/29/2026)
- MM/DD/YYYY (06/29/2026)
- D/M/YYYY (29/6/2026)

**Date must be:**
- Today or past (not future)
- Within last 90 days

---

## Troubleshooting

**"Date format not understood"?**
- Check QR contains date in one of these: M/D/YYYY, MM/DD/YYYY, D/M/YYYY
- Make sure it's not future date
- Make sure it's not older than 90 days

**Camera won't open?**
- Must use HTTPS hosting (not HTTP)
- Check browser has camera permission in settings

**Sheet sync not working?**
- Did you replace `SHEET_URL` in index.html?
- Is your Apps Script deployed + set to "Anyone" access?
- Check internet connection

**Multiple users on same phone?**
- Each person creates own account (Name + Password)
- All logs show which employee scanned

---

## What Gets Logged to Sheet

Each entry records:
- ✅ DC Number (from QR)
- ✅ DC Date (from QR)
- ✅ Gate Direction (IN or OUT)
- ✅ Outward Number (if OUT)
- ✅ Employee Name
- ✅ Device ID (unique to this phone)
- ✅ Timestamp
- ✅ Valid? (was DC readable?)

This is enough for gate team to track what's coming in/out + who logged it.

---

## Security Notes

- Passwords stored locally only (phone storage)
- No data sent to any server except Google Sheet
- You control Google Sheet access

---

## File Guide

| File | Purpose |
|------|---------|
| `index.html` | Main app (edit SHEET_URL here!) |
| `google-apps-script.gs` | Paste into Google Apps Script |
| `manifest.json` | App install settings |
| `sw.js` | Offline support |
| `icon.svg` | Home screen icon |

---

Sapai irukkathu na, direct ah gatela education panni gatekeepers vaanga soren! 🚪✅
