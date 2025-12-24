# Maharashtra Water Billing & Management System - Reports Dashboard

## 🏛️ Overview

This is a production-ready Next.js 14 application with App Router for the Maharashtra Water Billing and Management System. The dashboard features:

- ✅ **Bilingual Support**: Full English and Marathi language support
- ✅ **Premium UI/UX**: Deep blue gradients, glassmorphism effects, and premium animations
- ✅ **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- ✅ **Report Engine**: Four comprehensive report tabs (Engine, Collection, CRM, Quick Reports)
- ✅ **Data Engine**: AI-powered natural language search
- ✅ **SMS Manager**: Complete SMS management system
- ✅ **Real-time Analytics**: KPI cards, charts, and collection insights
- ✅ **Export Functionality**: Excel, PDF, and CSV export capabilities
- ✅ **Download Logs**: Complete download history tracking
- ✅ **.NET Backend Ready**: All API integrations configured for microservices

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                     # API routes
│   │   └── (add your API routes here)
│   ├── dashboard/               # Dashboard page (optional)
│   ├── globals.css             # Global styles & animations
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page (main dashboard)
│
├── components/                  # React components
│   ├── common/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Table.tsx
│   │   └── Toaster.tsx
│   │
│   ├── layout/                 # Layout components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MainLayout.tsx
│   │   ├── EngineTabNavigation.tsx
│   │   └── TabNavigation.tsx
│   │
│   ├── modules/                # Feature-specific modules
│   │   └── water-tax/          # Water tax billing module
│   │       ├── reports/        # Report components
│   │       │   ├── ReportEngine.tsx
│   │       │   ├── ReportCard.tsx
│   │       │   ├── CollectionReport.tsx
│   │       │   ├── CRMReport.tsx
│   │       │   ├── QuickReports.tsx
│   │       │   ├── ZoneWiseCollectionReport.tsx
│   │       │   ├── AutoReportNotification.tsx
│   │       │   └── ReportsHeader.tsx
│   │       │
│   │       ├── tables/         # Table components
│   │       │   ├── TopDefaultersTable.tsx
│   │       │   ├── PendingReadingTable.tsx
│   │       │   ├── ClosedConnectionTable.tsx
│   │       │   ├── ReportResultsTable.tsx
│   │       │   └── SMSManagerTable.tsx
│   │       │
│   │       ├── filters/        # Filter components
│   │       │   ├── FilterPanel.tsx
│   │       │   ├── SlideInFilterPanel.tsx
│   │       │   ├── CollectionReportFilter.tsx
│   │       │   ├── ReadingSummaryFilter.tsx
│   │       │   ├── ConnectionSealFilter.tsx
│   │       │   ├── PaymentModeFilter.tsx
│   │       │   ├── RevenueSummaryFilter.tsx
│   │       │   ├── AccountantFilter.tsx
│   │       │   ├── MutationReportFilter.tsx
│   │       │   ├── AlterationReportFilter.tsx
│   │       │   ├── CollectionDetailsFilter.tsx
│   │       │   └── GoshwaraFilterModal.tsx
│   │       │
│   │       ├── ai/             # AI & Search components
│   │       │   ├── DataEngine.tsx
│   │       │   ├── AISearchBar.tsx
│   │       │   ├── AIInsightModal.tsx
│   │       │   ├── SearchBar.tsx
│   │       │   └── SearchResultsGrid.tsx
│   │       │
│   │       ├── sms/            # SMS Management
│   │       │   ├── SMSManager.tsx
│   │       │   └── SMSConfirmDialog.tsx
│   │       │
│   │       ├── modals/         # Modal dialogs
│   │       │   ├── DownloadLogModal.tsx
│   │       │   ├── ExportToExcelDialog.tsx
│   │       │   ├── ReportDialog.tsx
│   │       │   ├── ConfirmDialog.tsx
│   │       │   └── LastWorkSummaryPopup.tsx
│   │       │
│   │       ├── kpi/            # KPI & Analytics
│   │       │   ├── KPICards.tsx
│   │       │   ├── KPISection.tsx
│   │       │   ├── CollectionInsightsCard.tsx
│   │       │   ├── ChartSection.tsx
│   │       │   └── ChartsSection.tsx
│   │       │
│   │       ├── notifications/  # Notification components
│   │       │   ├── DailyReportReminder.tsx
│   │       │   └── AutoReportNotification.tsx
│   │       │
│   │       └── ui-elements/    # Custom UI elements
│   │           ├── MultiSelectDropdown.tsx
│   │           ├── MultiSelectCheckboxDropdown.tsx
│   │           └── CheckboxGrid.tsx
│   │
│   └── ui/                     # shadcn/ui components
│       └── (all shadcn components)
│
├── config/                     # Application configuration
│   └── app.config.ts          # API endpoints & environment config
│
├── hooks/                      # Custom React hooks
│   ├── useAsync.ts
│   ├── useLoading.ts
│   ├── useAuth.ts
│   ├── useMasterData.ts
│   └── useReports.ts
│
├── lib/                        # Utility functions
│   ├── api/                   # API client utilities
│   │   └── client.ts
│   ├── constants/             # Constants & routes
│   │   └── routes.ts
│   └── utils/                 # Helper functions
│       ├── cn.ts              # Tailwind class merger
│       ├── format.ts          # Formatting utilities
│       ├── reportTracking.ts  # Report tracking logic
│       └── topDefaultersPDF.ts # PDF generation
│
├── services/                   # API services
│   ├── api.service.ts         # Base API service
│   ├── auth.service.ts        # Authentication service
│   ├── master.service.ts      # Master data service
│   ├── reports.service.ts     # Reports service
│   └── sms.service.ts         # SMS service
│
├── styles/                     # Additional styles
│   └── (if needed)
│
└── types/                      # TypeScript type definitions
    ├── common.types.ts        # Common types
    └── api.types.ts           # API response types
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **.NET Backend**: Your microservices should be running

### Installation

1. **Clone/Download the project**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   NEXT_PUBLIC_ENV=development

   # Optional: Add other environment variables
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Type Checking

```bash
npm run type-check
```

## 🔌 API Integration

All API endpoints are configured in `/src/config/app.config.ts`. The application is ready to connect to your .NET microservices backend.

### Available Services

- **Authentication**: Login, logout, session management
- **Reports**: All report generation and export functionality
- **Master Data**: Zones, wards, areas, bill types, etc.
- **SMS**: Template management, sending SMS, history
- **AI Search**: Natural language queries and insights
- **Download Log**: Track and manage downloaded reports
- **Dashboard**: KPIs, analytics, and collection summaries

### Update API Base URL

Edit `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com
```

Or update `/src/config/app.config.ts` for environment-specific configurations.

## 🎨 Features

### 1. Report Engine (4 Sub-tabs)
- **Engine Reports**: Top Defaulters, Pending Readings, Closed Connections
- **Collection Reports**: Day-wise, Monthly, Collection Details, Accountant Reports
- **CRM Reports**: Mutation, Alteration, Zone-wise Collection
- **Quick Reports**: Reading Summary, Connection Seal, Payment Mode, Revenue Summary

### 2. Data Engine
- **AI-Powered Search**: Natural language query processing
- **Smart Insights**: AI-generated insights and recommendations
- **Search History**: Track all search queries

### 3. SMS Manager
- **Template Management**: Create and manage SMS templates
- **Bulk SMS**: Send SMS to multiple recipients
- **Delivery Tracking**: Monitor SMS delivery status
- **Statistics**: View SMS analytics and statistics

### 4. Premium UI Features
- **Glassmorphism Cards**: Modern frosted glass effect
- **Deep Blue Gradients**: Government portal standard design
- **Water Ripple Effects**: Animated background effects
- **Shimmer Animations**: Premium loading states
- **Floating Glow Orbs**: Ambient background animations
- **Responsive Design**: Mobile, tablet, and desktop optimized

### 5. Bilingual Support
- **English/Marathi**: Complete UI translation
- **Dynamic Language Switching**: Toggle between languages instantly
- **Localized Formatting**: Date, time, and currency formatting

## 🛠️ Component Organization

The components are organized logically within `/src/components/modules/water-tax/`:

- **reports/**: All report-related components
- **tables/**: Data table components with unique themes
- **filters/**: Filter panels for different report types
- **ai/**: AI search and insights
- **sms/**: SMS management
- **modals/**: Dialog and modal components
- **kpi/**: KPI cards and analytics
- **notifications/**: Alert and notification components
- **ui-elements/**: Custom UI components

## 📝 Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm run type-check`: TypeScript type checking

## 🔧 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Motion (Framer Motion)
- **Charts**: Recharts
- **HTTP Client**: Axios
- **State Management**: Zustand (optional)
- **Form Handling**: React Hook Form
- **Notifications**: Sonner
- **PDF Generation**: jsPDF
- **Excel Export**: xlsx

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Mobile Support

Fully responsive design with dedicated mobile UI:
- Mobile sidebar navigation
- Touch-optimized interactions
- Responsive tables with horizontal scroll
- Mobile-friendly modals and dialogs

## 🔐 Security

- **Environment Variables**: Sensitive data in `.env.local`
- **API Authentication**: Token-based auth ready
- **HTTPS**: Production deployment with SSL
- **Input Validation**: Form validation on client and server

## 🎯 Performance

- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Dynamic imports for heavy components
- **Caching**: API response caching strategies

## 📄 License

Government of Maharashtra - Water Department

## 👥 Support

For technical support or questions, contact the Maharashtra Water Department IT Team.

## 🆕 What's Next?

1. Connect to your .NET backend APIs
2. Customize branding and logos
3. Add authentication flow
4. Deploy to production server
5. Monitor and analyze usage

---

**Built with ❤️ for Maharashtra Government Digital Portal**
