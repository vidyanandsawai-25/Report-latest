# Setup Guide - Maharashtra Water Billing System

This guide will help you set up and run the project from scratch after downloading.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher
- **Git**: (optional, for version control)

To check your versions:
```bash
node --version
npm --version
```

## 🚀 Quick Start (5 Minutes)

### Step 1: Extract the Project

Extract the downloaded ZIP file to your desired location:
```bash
unzip maharashtra-water-billing.zip
cd maharashtra-water-billing
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (~2-3 minutes).

### Step 3: Configure Environment

Copy the example environment file:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your API endpoint:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_ENV=development
```

### Step 4: Migrate Components (First Time Only)

Run the automated migration script to organize all components:

```bash
node migrate-components.js
```

This will move all 50+ components to their proper locations in the `src/` directory.

### Step 5: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✅ Verification

After starting the server, verify everything works:

1. **Dashboard loads** - You should see the Maharashtra Water Billing Dashboard
2. **Language toggle** - Click the language switcher (English/Marathi)
3. **Navigation** - Click through different tabs (Reports, SMS Manager)
4. **Reports** - Try generating a sample report
5. **Responsive** - Resize browser window to test mobile view

## 🔧 Detailed Setup

### Project Structure

After migration, your project structure will look like this:

```
maharashtra-water-billing/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # React components
│   │   ├── layout/            # Header, Sidebar, Navigation
│   │   ├── common/            # Reusable UI components
│   │   ├── modules/           # Feature modules
│   │   │   └── water-tax/     # Water billing components
│   │   └── ui/                # shadcn/ui components
│   ├── config/                # Configuration files
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities and helpers
│   ├── services/              # API services
│   ├── types/                 # TypeScript definitions
│   └── styles/                # Global styles
├── public/                     # Static assets
├── .env.local                 # Environment variables (create this)
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── next.config.js             # Next.js config
└── README.md                  # Project documentation
```

### Environment Configuration

The `.env.local` file contains important configuration:

```env
# Development
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_ENV=development

# Staging
# NEXT_PUBLIC_API_BASE_URL=https://staging-api.mahawaterbilling.gov.in
# NEXT_PUBLIC_ENV=staging

# Production
# NEXT_PUBLIC_API_BASE_URL=https://api.mahawaterbilling.gov.in
# NEXT_PUBLIC_ENV=production
```

### API Integration

The application is configured to connect to your .NET microservices backend.

**Update API endpoints in:**
- `/src/config/app.config.ts` - Contains all API endpoint configurations

**Test API connection:**
1. Ensure your .NET backend is running
2. Update `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
3. Test a report generation or login

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

The production build will be in the `.next/` directory.

## 🐛 Troubleshooting

### Common Issues

#### 1. **Module not found errors**

**Problem**: Import errors after migration

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Restart dev server
npm run dev
```

#### 2. **TypeScript errors**

**Problem**: Type checking failures

**Solution**:
```bash
# Run type check
npm run type-check

# Fix any path alias issues in tsconfig.json
```

#### 3. **Components not rendering**

**Problem**: Blank screen or component errors

**Solution**:
1. Check browser console for errors
2. Verify all component files were migrated correctly
3. Check import paths use `@/` alias

#### 4. **API connection fails**

**Problem**: Reports don't load, API errors

**Solution**:
1. Verify `.env.local` has correct API URL
2. Check your .NET backend is running
3. Check browser Network tab for API calls
4. Verify CORS is enabled on backend

#### 5. **Port already in use**

**Problem**: Port 3000 is occupied

**Solution**:
```bash
# Use a different port
PORT=3001 npm run dev

# Or kill the process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or kill the process (Mac/Linux)
lsof -ti:3000 | xargs kill
```

### Dependency Issues

If you encounter dependency conflicts:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Performance Issues

If the application is slow:

1. **Check Node version**: Upgrade to latest LTS (18.x or 20.x)
2. **Clear browser cache**: Hard refresh (Ctrl+Shift+R)
3. **Disable browser extensions**: Test in incognito mode
4. **Check API response times**: Slow backend can affect frontend

## 📱 Mobile Testing

To test on mobile devices:

1. Find your computer's IP address:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Start dev server with host binding:
   ```bash
   npm run dev -- -H 0.0.0.0
   ```

3. Access from mobile browser:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```

## 🔒 Security Notes

### Before Deploying to Production:

1. ✅ Change all default credentials
2. ✅ Enable HTTPS
3. ✅ Configure CORS properly on backend
4. ✅ Add rate limiting
5. ✅ Enable authentication
6. ✅ Review and remove any debug code
7. ✅ Set secure environment variables
8. ✅ Enable error tracking (Sentry, etc.)

### Environment Variables Security:

- ❌ Never commit `.env.local` to version control
- ✅ Use environment-specific values
- ✅ Use secrets management in production
- ✅ Rotate API keys regularly

## 📚 Additional Resources

### Project Documentation

- `README.md` - Project overview and features
- `COMPONENT_MIGRATION_GUIDE.md` - Detailed migration instructions
- `/docs/API_CONTRACT.md` - API integration guide
- `/docs/BACKEND_INTEGRATION_GUIDE.md` - Backend setup guide

### Learning Resources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)

## 🆘 Getting Help

### Before Asking for Help:

1. Check this SETUP_GUIDE.md
2. Review the README.md
3. Check browser console for errors
4. Check terminal for build errors
5. Search existing documentation

### Support Channels:

- **Technical Issues**: Contact Maharashtra Water Department IT Team
- **Feature Requests**: Submit through official channels
- **Bug Reports**: Include error logs and steps to reproduce

## 🎯 Next Steps

Once your setup is complete:

1. **Familiarize yourself** with the codebase
2. **Connect to your backend** API
3. **Customize branding** (colors, logos)
4. **Configure authentication** flow
5. **Test all features** thoroughly
6. **Deploy to staging** environment
7. **Gather user feedback**
8. **Deploy to production**

## ✨ Tips for Success

1. **Start Small**: Test one feature at a time
2. **Use DevTools**: Browser DevTools and React DevTools are your friends
3. **Read the Code**: The components are well-organized and commented
4. **Test Mobile**: Always test responsive design
5. **Monitor Performance**: Use Lighthouse for performance audits
6. **Keep Dependencies Updated**: Regularly update packages
7. **Document Changes**: Keep track of customizations

## 🚢 Deployment Checklist

Before deploying to production:

- [ ] All features tested
- [ ] Mobile responsiveness verified
- [ ] API integration complete
- [ ] Authentication working
- [ ] Error handling in place
- [ ] Performance optimized
- [ ] Security review done
- [ ] Environment variables configured
- [ ] Backup strategy in place
- [ ] Monitoring setup
- [ ] SSL certificate installed
- [ ] DNS configured
- [ ] Logs configured
- [ ] User documentation ready

---

**Need immediate help?** Check the Troubleshooting section above or contact the IT team.

**Happy Coding! 🎉**
