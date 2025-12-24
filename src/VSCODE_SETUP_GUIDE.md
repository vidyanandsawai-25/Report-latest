# VS Code Setup Guide - Production Ready
## Maharashtra Water Billing System

---

## 🚨 IMPORTANT: Fixing Figma Asset Errors

Your project uses `figma:asset` imports which are specific to Figma's environment. For VS Code/local development, we need to replace these with regular image imports.

---

## 🔧 Quick Fix for Figma Errors

### Step 1: Create Assets Folder

```bash
# Create public assets folder
mkdir -p public/assets/images
```

### Step 2: Download or Create Images

You need these images:

1. **Logo Image** (`2ace7e0bf1082044c0cdc8f0827b8cabf2f06a0c.png`)
   - Used in: Header.tsx, Sidebar.tsx
   - Size: ~200x60px
   - Type: Logo of Maharashtra Water Department

2. **Water Droplet Background** (`32de86388d824fe7968a4cc79a8ad3203d01778a.png`)
   - Used in: App.tsx
   - Size: 800x800px
   - Type: Watermark background

3. **Water Bill Background** (`32a53904cdb2f84aba99f830aa52e4f10dd2974d.png`)
   - Used in: CRMReport.tsx, CollectionReport.tsx, etc.
   - Size: Variable
   - Type: Background pattern

**Option A: Use Temporary Placeholders (Quick Start)**
```bash
# I'll provide code to use placeholders
```

**Option B: Use Your Own Images**
- Place your logo as: `public/assets/images/logo.png`
- Place water droplet as: `public/assets/images/water-droplet-bg.png`
- Place bill background as: `public/assets/images/water-bill-bg.png`

---

## 📦 Complete Setup Instructions

### Prerequisites

1. **Node.js** (v18 or higher)
   ```bash
   node --version  # Should be v18+
   ```

2. **VS Code** with these extensions:
   - ESLint
   - Prettier
   - TypeScript and JavaScript Language Features
   - Tailwind CSS IntelliSense

### Step-by-Step Setup

#### 1. Install Dependencies

```bash
# Install all dependencies
npm install

# Install Axios (for API integration)
npm install axios

# Install additional recommended packages
npm install date-fns
```

#### 2. Configure Environment

```bash
# Copy environment file
cp .env.example .env.local

# Edit .env.local with your API URL
code .env.local
```

Add to `.env.local`:
```env
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_LOG_API_REQUESTS=true
```

#### 3. Fix TypeScript Configuration

Create `tsconfig.json` if not exists:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "**/*.d.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

#### 4. Create Next.js Configuration

Create `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // Enable SWC minification for better performance
  swcMinify: true,
  // Optimize for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
```

#### 5. Create Image Type Declaration

Create `types/images.d.ts`:
```typescript
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'figma:asset/*' {
  const content: string;
  export default content;
}
```

#### 6. Run the Project

```bash
# Development mode
npm run dev

# Open browser
# http://localhost:3000
```

---

## 🐛 Common Errors & Solutions

### Error 1: "Cannot find module 'figma:asset/...'"

**Cause**: Figma asset imports don't work in VS Code

**Solution**: I'll provide updated files that use regular image imports

### Error 2: "Module not found: Can't resolve 'axios'"

**Solution**:
```bash
npm install axios
```

### Error 3: TypeScript errors about types

**Solution**:
```bash
npm install --save-dev @types/node @types/react @types/react-dom
```

### Error 4: "Cannot find module './components/...'

**Solution**: Check import paths are correct and files exist

### Error 5: Port 3000 already in use

**Solution**:
```bash
# Kill process on port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

---

## 📋 VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

---

## 🎨 VS Code Extensions to Install

### Required
1. **ESLint** (dbaeumer.vscode-eslint)
2. **Prettier** (esbenp.prettier-vscode)
3. **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)

### Recommended
4. **TypeScript Error Translator** (mattpocock.ts-error-translator)
5. **Auto Rename Tag** (formulahendry.auto-rename-tag)
6. **Path Intellisense** (christian-kohler.path-intellisense)
7. **GitLens** (eamodio.gitlens)
8. **Thunder Client** (rangav.vscode-thunder-client) - For API testing

Install all at once:
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension mattpocock.ts-error-translator
```

---

## 🔍 Debugging in VS Code

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

---

## 📝 Git Configuration

Create `.gitignore` if not exists:

```gitignore
# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Next.js
.next/
out/
build
dist/

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env*.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.idea
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

---

## ✅ Verification Checklist

After setup, verify everything works:

```bash
# 1. Check Node version
node --version  # Should be v18+

# 2. Check npm version
npm --version

# 3. Install dependencies
npm install

# 4. Check for TypeScript errors
npx tsc --noEmit

# 5. Start dev server
npm run dev

# 6. Open browser to http://localhost:3000

# 7. Check browser console for errors

# 8. Test hot reload - make a small change and save
```

---

## 🚀 Running the Project

### Development Mode
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Type Check
```bash
npm run type-check
```

### Lint Code
```bash
npm run lint
```

---

## 📊 Performance Tips

1. **Use Fast Refresh**: Enabled by default in Next.js
2. **Use SWC**: Already configured in next.config.js
3. **Disable unused extensions**: Can slow down VS Code
4. **Increase Node memory** if needed:
   ```bash
   NODE_OPTIONS=--max_old_space_size=4096 npm run dev
   ```

---

## 🔒 Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] No API keys committed to git
- [ ] HTTPS enabled for production
- [ ] Dependencies up to date: `npm audit`

---

## 📞 Need Help?

### Quick Diagnostics

```bash
# Check if port 3000 is available
netstat -an | grep 3000

# Clear Next.js cache
rm -rf .next

# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for updates
npm outdated

# Update all dependencies
npm update
```

### Common Commands

```bash
# Fresh start
rm -rf .next node_modules
npm install
npm run dev

# Check TypeScript errors
npx tsc --noEmit

# Fix ESLint issues
npm run lint -- --fix
```

---

## 🎯 Next Steps

1. ✅ Follow this setup guide
2. ✅ Run `npm install`
3. ✅ Configure `.env.local`
4. ✅ Run `npm run dev`
5. ✅ Fix any Figma asset errors (see below)
6. ✅ Test in browser
7. ✅ Start backend integration

---

**Ready to start? Let's fix those Figma errors first! See the file updates below.**
