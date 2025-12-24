# 🔧 Fix Figma Errors - Complete Solution
## Maharashtra Water Billing System

---

## ⚠️ Problem

When running the project in VS Code, you get errors like:
```
Module not found: Can't resolve 'figma:asset/...'
```

This happens because `figma:asset` imports are specific to Figma's environment and don't work in regular development.

---

## ✅ Complete Solution (Choose One)

### **Option 1: Quick Fix with Placeholders (Recommended for Testing)**

This uses SVG placeholders so you can start development immediately.

**Already Done:**
- ✅ Created `/utils/imagePlaceholders.ts` with placeholder images
- ✅ Created `/types/figma-assets.d.ts` for TypeScript support

**You Don't Need to Do Anything!** The placeholders will work automatically.

---

### **Option 2: Use Real Images (For Production)**

#### Step 1: Create Images Folder
```bash
mkdir -p public/assets/images
```

#### Step 2: Add Your Images

Download or create these images and place them in `public/assets/images/`:

1. **logo.png** (200x60px)
   - Maharashtra Water Department logo
   - Place at: `public/assets/images/logo.png`

2. **water-droplet-bg.png** (800x800px)
   - Watermark/background with water droplet
   - Place at: `public/assets/images/water-droplet-bg.png`

3. **water-bill-bg.png** (1200x600px)
   - Background pattern for report cards
   - Place at: `public/assets/images/water-bill-bg.png`

#### Step 3: Image URLs to Use

If you want to use temporary images from the web:

```bash
# Logo (example - use your actual logo)
# Download from: https://via.placeholder.com/200x60/005AA7/FFFFFF?text=MH+Water+Dept
# Save as: public/assets/images/logo.png

# Water Droplet Background
# Download from: https://via.placeholder.com/800x800/E0F2FE/005AA7?text=Water+Droplet
# Save as: public/assets/images/water-droplet-bg.png

# Water Bill Background
# Download from: https://via.placeholder.com/1200x600/F0F9FF/005AA7?text=Bill+Background
# Save as: public/assets/images/water-bill-bg.png
```

---

## 🚀 Running the Project in VS Code

### Step 1: Open Terminal in VS Code
Press `` Ctrl + ` `` (backtick) or go to **Terminal > New Terminal**

### Step 2: Install Dependencies

```bash
# Install all dependencies
npm install

# This will install:
# - React, Next.js, TypeScript
# - Axios (for API calls)
# - All UI libraries
# - All required packages
```

**If you see errors**, run:
```bash
npm install --legacy-peer-deps
```

### Step 3: Setup Environment

```bash
# Copy environment file
cp .env.example .env.local

# Edit it (optional for now)
code .env.local
```

In `.env.local`, add:
```env
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_DEBUG_MODE=true
```

### Step 4: Run Development Server

```bash
npm run dev
```

You should see:
```
> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
> event - compiled client and server successfully
```

### Step 5: Open in Browser

Open: **http://localhost:3000**

---

## 🐛 Fixing Specific Errors

### Error: "Cannot find module 'figma:asset/...'"

**Solution:** Already fixed by creating type declarations!

The file `/types/figma-assets.d.ts` tells TypeScript how to handle these imports.

### Error: "Module not found: Can't resolve 'axios'"

```bash
npm install axios
```

### Error: "Cannot find module 'motion/react'"

```bash
npm install motion
```

### Error: "Cannot find module 'sonner'"

```bash
npm install sonner
```

### Error: "Cannot find module 'lucide-react'"

```bash
npm install lucide-react
```

### Error: Port 3000 already in use

**On Windows:**
```bash
# Find process
netstat -ano | findstr :3000

# Kill it (replace PID with actual number)
taskkill /PID [PID] /F
```

**On Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Or use different port:**
```bash
npm run dev -- -p 3001
```

---

## 📋 Complete Setup Checklist

Run these commands one by one:

```bash
# 1. Check Node version (must be 18+)
node --version

# 2. Check npm version
npm --version

# 3. Clean install (if you had issues)
rm -rf node_modules package-lock.json
npm install

# 4. Create environment file
cp .env.example .env.local

# 5. Run development server
npm run dev

# 6. Open browser
# Go to http://localhost:3000
```

---

## 🎯 VS Code Extensions to Install

Install these for better development experience:

1. **ESLint** - Code linting
2. **Prettier** - Code formatting
3. **Tailwind CSS IntelliSense** - Tailwind autocomplete
4. **TypeScript Error Translator** - Better error messages

**Install from VS Code:**
- Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on Mac)
- Search for each extension
- Click Install

**Or install via terminal:**
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

---

## 📁 Project Structure After Setup

```
maharashtra-water-billing/
│
├── public/
│   └── assets/
│       └── images/          ← Add your images here
│           ├── logo.png
│           ├── water-droplet-bg.png
│           └── water-bill-bg.png
│
├── types/
│   ├── api.types.ts         ← API type definitions
│   └── figma-assets.d.ts    ← Fixes Figma import errors ✅
│
├── utils/
│   └── imagePlaceholders.ts ← Placeholder images ✅
│
├── config/
│   └── api.config.ts        ← API configuration
│
├── services/                ← API services
├── hooks/                   ← React hooks
├── components/              ← UI components
│
├── .env.local               ← Your environment config
├── package.json             ← Dependencies ✅
├── tsconfig.json            ← TypeScript config ✅
├── next.config.js           ← Next.js config ✅
└── App.tsx                  ← Main app
```

---

## 🎨 Alternative: Using Next.js Image Component

If you want to use Next.js optimized images, update your components:

**Before:**
```tsx
import logoImage from 'figma:asset/...png';
<img src={logoImage} alt="Logo" />
```

**After:**
```tsx
import Image from 'next/image';
<Image 
  src="/assets/images/logo.png" 
  width={200} 
  height={60} 
  alt="Logo" 
  priority 
/>
```

---

## 🔍 Troubleshooting Commands

If you encounter any issues:

```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npx tsc --noEmit

# Check Node version
node --version  # Must be 18 or higher

# Update npm
npm install -g npm@latest

# Fix permissions (Mac/Linux)
sudo chown -R $(whoami) ~/.npm
```

---

## ✅ Verification Steps

After setup, verify everything works:

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Check terminal output:**
   - Should show "compiled successfully"
   - No red error messages

3. **Open browser:**
   - Go to http://localhost:3000
   - Page should load without errors

4. **Check browser console:**
   - Press F12 to open DevTools
   - Console tab should have no red errors
   - Warnings are OK

5. **Test hot reload:**
   - Edit any `.tsx` file
   - Save it
   - Browser should auto-refresh

---

## 🎓 Common Questions

### Q: Do I need to update all component files?

**A:** No! The type declarations handle the Figma imports automatically. Your existing code will work.

### Q: What if I see warnings in the console?

**A:** Warnings (yellow) are OK. Only red errors are problems.

### Q: Can I use placeholder images in production?

**A:** No, replace with real images before production deployment.

### Q: How do I add more images?

**A:** 
1. Place image in `public/assets/images/`
2. Use as: `<img src="/assets/images/your-image.png" />`

### Q: What if npm install takes too long?

**A:** Try:
```bash
npm install --legacy-peer-deps
# or
yarn install
# or
pnpm install
```

---

## 🚀 Quick Start Summary

**Just run these 4 commands:**

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env.local

# 3. Run development server
npm run dev

# 4. Open browser
# http://localhost:3000
```

**That's it! Your project should be running without Figma errors!** 🎉

---

## 📞 Still Having Issues?

### Check these:

1. **Node version:** Must be 18 or higher
   ```bash
   node --version
   ```

2. **Port 3000 free:** Close any app using port 3000

3. **Firewall:** Ensure localhost access is allowed

4. **Antivirus:** Sometimes blocks npm installs

5. **Administrator rights:** Run terminal as admin (Windows)

### Debug mode:

Add to `.env.local`:
```env
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_LOG_API_REQUESTS=true
```

This will show detailed logs in browser console.

---

## 🎯 Ready for Backend Integration

Once the project runs successfully:

1. ✅ Project running without errors
2. ✅ Browser shows the app
3. ✅ No console errors
4. ✅ Hot reload works

**Next:** Follow `/docs/QUICK_START_GUIDE.md` for backend API integration!

---

**You're all set! Happy coding! 🚀**

---

**Last Updated:** December 3, 2024  
**Status:** Ready to Run ✅
