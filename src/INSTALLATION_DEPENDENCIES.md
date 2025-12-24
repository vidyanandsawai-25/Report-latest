# Installation & Dependencies
## Maharashtra Water Billing System

---

## 📦 Required Dependencies

### Install Axios (Required for API Integration)

```bash
npm install axios
# or
yarn add axios
# or
pnpm add axios
```

### Optional but Recommended

```bash
# For better date handling
npm install date-fns

# For form validation
npm install react-hook-form@7.55.0 zod

# For data tables (if not already installed)
npm install @tanstack/react-table
```

---

## 📄 Package.json Addition

Add these to your `package.json`:

```json
{
  "dependencies": {
    "axios": "^1.6.0",
    "date-fns": "^2.30.0",
    "react-hook-form": "7.55.0",
    "zod": "^3.22.4",
    "@tanstack/react-table": "^8.10.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0"
  }
}
```

---

## 🔧 Environment Setup

### 1. Create `.env.local` file

```bash
cp .env.example .env.local
```

### 2. Configure Environment Variables

**For Development:**
```env
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_LOG_API_REQUESTS=true
```

**For Staging:**
```env
NEXT_PUBLIC_ENV=staging
NEXT_PUBLIC_API_BASE_URL=https://staging-api.mahawaterbilling.gov.in
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_LOG_API_REQUESTS=true
```

**For Production:**
```env
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://api.mahawaterbilling.gov.in
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_LOG_API_REQUESTS=false
```

---

## 🚀 Installation Steps

### Step 1: Install Dependencies
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### Step 2: Install Additional Required Package
```bash
npm install axios
```

### Step 3: Set Up Environment
```bash
cp .env.example .env.local
# Then edit .env.local with your API URL
```

### Step 4: Verify Installation
```bash
npm run build
# Should build successfully without errors
```

---

## 🧪 Test API Connection

Create a test file: `test-api-connection.ts`

```typescript
import { get } from './services/api.service';

async function testConnection() {
  try {
    console.log('Testing API connection...');
    const response = await get('/api/health/check');
    console.log('✅ Success:', response);
  } catch (error) {
    console.error('❌ Failed:', error);
  }
}

testConnection();
```

Run:
```bash
npx ts-node test-api-connection.ts
```

---

## 📋 Verification Checklist

- [ ] `axios` installed successfully
- [ ] `.env.local` created and configured
- [ ] `npm run build` completes without errors
- [ ] TypeScript shows no errors
- [ ] API connection test passes
- [ ] All environment variables set

---

## 🔍 Troubleshooting

### Issue: Module not found 'axios'
```bash
# Solution: Install axios
npm install axios --save
```

### Issue: Environment variables not loading
```bash
# Solution: Restart dev server after changing .env.local
npm run dev
```

### Issue: TypeScript errors
```bash
# Solution: Ensure all type definitions are installed
npm install --save-dev @types/node
```

### Issue: CORS errors
```bash
# Solution: Configure CORS on backend to allow your frontend origin
# Backend needs to add your domain to allowed origins
```

---

## 🎯 Quick Start Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check

# Lint code
npm run lint
```

---

## 📦 Full Dependencies List

Your application already has these installed (via Figma Make):

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "latest",
    "typescript": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "motion": "latest",
    "lucide-react": "latest",
    "sonner": "2.0.3",
    "recharts": "latest"
  }
}
```

**You only need to add: `axios`**

---

## 🔐 Security Notes

### DO NOT commit these files:
- `.env.local`
- `.env.production`
- `node_modules/`

### Add to `.gitignore`:
```
.env.local
.env.production
.env*.local
```

---

## 📚 Additional Configuration

### For Better IDE Support

**VS Code**: Install these extensions:
- ESLint
- Prettier
- TypeScript Import Sorter
- REST Client (for testing APIs)

**VS Code Settings** (`.vscode/settings.json`):
```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## 🎓 Next Steps After Installation

1. ✅ Review `/PRODUCTION_READY_SUMMARY.md`
2. ✅ Read `/docs/QUICK_START_GUIDE.md`
3. ✅ Study `/docs/API_CONTRACT.md`
4. ✅ Test API connection
5. ✅ Start integrating endpoints

---

## 💡 Pro Tips

1. **Use yarn or pnpm** for faster installs
2. **Enable Turbopack** for faster dev server:
   ```bash
   npm run dev --turbo
   ```
3. **Use TypeScript strict mode** for better type safety
4. **Install React DevTools** browser extension

---

## ✅ Installation Complete!

You're now ready to:
- Connect to backend APIs
- Fetch real data
- Deploy to production

**Happy Coding! 🚀**

---

**Last Updated**: December 3, 2024
