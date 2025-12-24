# 🚀 START PROJECT - Quick Commands
## Maharashtra Water Billing System

---

## ⚡ FASTEST WAY TO START (Copy & Paste)

### For Windows (PowerShell/CMD):

```bash
npm install && cp .env.example .env.local && npm run dev
```

### For Mac/Linux:

```bash
npm install && cp .env.example .env.local && npm run dev
```

**That's it!** Open **http://localhost:3000** in your browser.

---

## 📋 Step-by-Step (If Above Doesn't Work)

### Step 1: Install Dependencies
```bash
npm install
```

Wait for installation to complete (2-5 minutes).

### Step 2: Setup Environment
```bash
cp .env.example .env.local
```

### Step 3: Run Project
```bash
npm run dev
```

### Step 4: Open Browser
```
http://localhost:3000
```

---

## 🐛 If You See Errors

### Error: "npm: command not found"

**Install Node.js:**
- Download from: https://nodejs.org/
- Install version 18 or higher
- Restart terminal/VS Code
- Try again

### Error: "Port 3000 already in use"

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID [number] /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Or use different port:**
```bash
npm run dev -- -p 3001
```

### Error: "Cannot find module..."

```bash
npm install
```

### Error: "EACCES: permission denied"

**Mac/Linux:**
```bash
sudo npm install
```

**Or fix permissions:**
```bash
sudo chown -R $(whoami) ~/.npm
```

---

## 🎯 VS Code Users

### Method 1: Use Terminal
1. Open VS Code
2. Press `` Ctrl + ` `` (backtick) to open terminal
3. Run: `npm install && npm run dev`

### Method 2: Use Run Button
1. Press `F5` or click Run > Start Debugging
2. Select "Next.js: debug server-side"

### Method 3: NPM Scripts
1. Open package.json
2. Click "▶ dev" button above the scripts section

---

## ✅ Success Indicators

You'll know it's working when you see:

```
✓ Ready in 3.2s
○ Local:    http://localhost:3000
```

**Then:**
1. Browser opens automatically, OR
2. Open http://localhost:3000 manually
3. You see the Maharashtra Water Billing System dashboard

---

## 🔧 Fresh Start (If Nothing Works)

```bash
# 1. Delete everything
rm -rf node_modules package-lock.json .next

# 2. Reinstall
npm install

# 3. Start
npm run dev
```

---

## 📦 Required Software

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Browser**: Chrome, Firefox, or Edge (latest version)

**Check versions:**
```bash
node --version  # Should be v18+
npm --version   # Should be v9+
```

---

## 🎨 Recommended VS Code Extensions

```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

---

## 📞 Quick Help

### Project won't start?
1. Check Node version: `node --version`
2. Delete node_modules: `rm -rf node_modules`
3. Reinstall: `npm install`
4. Try again: `npm run dev`

### Still not working?
1. Check FIX_FIGMA_ERRORS.md
2. Check VSCODE_SETUP_GUIDE.md
3. Restart VS Code
4. Restart computer (seriously, sometimes helps!)

---

## 🎯 After Project Starts Successfully

1. ✅ Project running at http://localhost:3000
2. ✅ No errors in terminal
3. ✅ Dashboard loads in browser
4. ✅ No console errors (F12 to check)

**Next Steps:**
- Read: `/docs/QUICK_START_GUIDE.md`
- Configure: `.env.local` with your API URL
- Start: Backend API integration

---

## 🚀 Production Build

When ready for production:

```bash
# Build
npm run build

# Test production build
npm start

# Deploy (depends on your platform)
```

---

**Need more help?** Check these files:
- `FIX_FIGMA_ERRORS.md` - Fix common errors
- `VSCODE_SETUP_GUIDE.md` - Complete VS Code setup
- `/docs/QUICK_START_GUIDE.md` - Backend integration

**Happy coding! 🎉**
