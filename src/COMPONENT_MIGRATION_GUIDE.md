# Component Migration Guide

## Overview

This guide will help you migrate all 50+ components from the current structure to the new `/src` directory structure for Next.js 14.

## Automated Migration

### Option 1: Using the Node.js Migration Script

Run the provided migration script:

```bash
node migrate-components.js
```

### Option 2: Manual Migration

Follow the component mapping below to manually move each file.

## Component Migration Mapping

### Layout Components
Move these components to: `/src/components/layout/`

```
/components/Header.tsx              → /src/components/layout/Header.tsx
/components/Sidebar.tsx             → /src/components/layout/Sidebar.tsx
/components/EngineTabNavigation.tsx → /src/components/layout/EngineTabNavigation.tsx
/components/TabNavigation.tsx       → /src/components/layout/TabNavigation.tsx
/components/ReportsHeader.tsx       → /src/components/layout/ReportsHeader.tsx
```

### Common/UI Components
Move these to: `/src/components/common/`

```
/components/ui/button.tsx    → /src/components/common/Button.tsx
/components/ui/card.tsx      → /src/components/common/Card.tsx
/components/ui/input.tsx     → /src/components/common/Input.tsx
/components/ui/table.tsx     → /src/components/common/Table.tsx
/components/ui/sonner.tsx    → /src/components/common/Toaster.tsx
```

All other `/components/ui/*` files should be moved to `/src/components/ui/` as-is.

### Water Tax Module - Reports
Move to: `/src/components/modules/water-tax/reports/`

```
/components/ReportEngine.tsx             → /src/components/modules/water-tax/reports/ReportEngine.tsx
/components/ReportCard.tsx               → /src/components/modules/water-tax/reports/ReportCard.tsx
/components/CollectionReport.tsx         → /src/components/modules/water-tax/reports/CollectionReport.tsx
/components/CRMReport.tsx                → /src/components/modules/water-tax/reports/CRMReport.tsx
/components/QuickReports.tsx             → /src/components/modules/water-tax/reports/QuickReports.tsx
/components/ZoneWiseCollectionReport.tsx → /src/components/modules/water-tax/reports/ZoneWiseCollectionReport.tsx
/components/AutoReportNotification.tsx   → /src/components/modules/water-tax/reports/AutoReportNotification.tsx
```

### Water Tax Module - Tables
Move to: `/src/components/modules/water-tax/tables/`

```
/components/TopDefaultersTable.tsx   → /src/components/modules/water-tax/tables/TopDefaultersTable.tsx
/components/PendingReadingTable.tsx  → /src/components/modules/water-tax/tables/PendingReadingTable.tsx
/components/ClosedConnectionTable.tsx → /src/components/modules/water-tax/tables/ClosedConnectionTable.tsx
/components/ReportResultsTable.tsx   → /src/components/modules/water-tax/tables/ReportResultsTable.tsx
/components/SMSManagerTable.tsx      → /src/components/modules/water-tax/tables/SMSManagerTable.tsx
```

### Water Tax Module - Filters
Move to: `/src/components/modules/water-tax/filters/`

```
/components/FilterPanel.tsx              → /src/components/modules/water-tax/filters/FilterPanel.tsx
/components/SlideInFilterPanel.tsx       → /src/components/modules/water-tax/filters/SlideInFilterPanel.tsx
/components/CollectionReportFilter.tsx   → /src/components/modules/water-tax/filters/CollectionReportFilter.tsx
/components/ReadingSummaryFilter.tsx     → /src/components/modules/water-tax/filters/ReadingSummaryFilter.tsx
/components/ConnectionSealFilter.tsx     → /src/components/modules/water-tax/filters/ConnectionSealFilter.tsx
/components/PaymentModeFilter.tsx        → /src/components/modules/water-tax/filters/PaymentModeFilter.tsx
/components/RevenueSummaryFilter.tsx     → /src/components/modules/water-tax/filters/RevenueSummaryFilter.tsx
/components/AccountantFilter.tsx         → /src/components/modules/water-tax/filters/AccountantFilter.tsx
/components/MutationReportFilter.tsx     → /src/components/modules/water-tax/filters/MutationReportFilter.tsx
/components/AlterationReportFilter.tsx   → /src/components/modules/water-tax/filters/AlterationReportFilter.tsx
/components/CollectionDetailsFilter.tsx  → /src/components/modules/water-tax/filters/CollectionDetailsFilter.tsx
/components/GoshwaraFilterModal.tsx      → /src/components/modules/water-tax/filters/GoshwaraFilterModal.tsx
```

### Water Tax Module - AI & Search
Move to: `/src/components/modules/water-tax/ai/`

```
/components/DataEngine.tsx        → /src/components/modules/water-tax/ai/DataEngine.tsx
/components/AISearchBar.tsx       → /src/components/modules/water-tax/ai/AISearchBar.tsx
/components/AIInsightModal.tsx    → /src/components/modules/water-tax/ai/AIInsightModal.tsx
/components/SearchBar.tsx         → /src/components/modules/water-tax/ai/SearchBar.tsx
/components/SearchResultsGrid.tsx → /src/components/modules/water-tax/ai/SearchResultsGrid.tsx
```

### Water Tax Module - SMS
Move to: `/src/components/modules/water-tax/sms/`

```
/components/SMSManager.tsx       → /src/components/modules/water-tax/sms/SMSManager.tsx
/components/SMSConfirmDialog.tsx → /src/components/modules/water-tax/sms/SMSConfirmDialog.tsx
```

### Water Tax Module - Modals
Move to: `/src/components/modules/water-tax/modals/`

```
/components/DownloadLogModal.tsx     → /src/components/modules/water-tax/modals/DownloadLogModal.tsx
/components/ExportToExcelDialog.tsx  → /src/components/modules/water-tax/modals/ExportToExcelDialog.tsx
/components/ReportDialog.tsx         → /src/components/modules/water-tax/modals/ReportDialog.tsx
/components/ConfirmDialog.tsx        → /src/components/modules/water-tax/modals/ConfirmDialog.tsx
/components/LastWorkSummaryPopup.tsx → /src/components/modules/water-tax/modals/LastWorkSummaryPopup.tsx
```

### Water Tax Module - KPI & Analytics
Move to: `/src/components/modules/water-tax/kpi/`

```
/components/KPICards.tsx              → /src/components/modules/water-tax/kpi/KPICards.tsx
/components/KPISection.tsx            → /src/components/modules/water-tax/kpi/KPISection.tsx
/components/CollectionInsightsCard.tsx → /src/components/modules/water-tax/kpi/CollectionInsightsCard.tsx
/components/ChartSection.tsx          → /src/components/modules/water-tax/kpi/ChartSection.tsx
/components/ChartsSection.tsx         → /src/components/modules/water-tax/kpi/ChartsSection.tsx
```

### Water Tax Module - Notifications
Move to: `/src/components/modules/water-tax/notifications/`

```
/components/DailyReportReminder.tsx → /src/components/modules/water-tax/notifications/DailyReportReminder.tsx
/components/AutoReportNotification.tsx → /src/components/modules/water-tax/notifications/AutoReportNotification.tsx
```

### Water Tax Module - UI Elements
Move to: `/src/components/modules/water-tax/ui-elements/`

```
/components/MultiSelectDropdown.tsx         → /src/components/modules/water-tax/ui-elements/MultiSelectDropdown.tsx
/components/MultiSelectCheckboxDropdown.tsx → /src/components/modules/water-tax/ui-elements/MultiSelectCheckboxDropdown.tsx
/components/CheckboxGrid.tsx                → /src/components/modules/water-tax/ui-elements/CheckboxGrid.tsx
```

### Hooks
Move to: `/src/hooks/`

```
/hooks/useAuth.ts        → /src/hooks/useAuth.ts
/hooks/useMasterData.ts  → /src/hooks/useMasterData.ts
/hooks/useReports.ts     → /src/hooks/useReports.ts
```

### Services
Move to: `/src/services/`

```
/services/api.service.ts     → /src/services/api.service.ts
/services/auth.service.ts    → /src/services/auth.service.ts
/services/master.service.ts  → /src/services/master.service.ts
/services/reports.service.ts → /src/services/reports.service.ts
/services/sms.service.ts     → /src/services/sms.service.ts
```

### Utilities
Move to: `/src/lib/utils/`

```
/utils/reportTracking.ts     → /src/lib/utils/reportTracking.ts
/utils/topDefaultersPDF.ts   → /src/lib/utils/topDefaultersPDF.ts
/utils/imagePlaceholders.ts  → /src/lib/utils/imagePlaceholders.ts
/components/ui/utils.ts      → /src/lib/utils/cn.ts
```

### Types
Move to: `/src/types/`

```
/types/api.types.ts         → /src/types/api.types.ts
/types/figma-assets.d.ts    → /src/types/figma-assets.d.ts
```

## Import Path Updates

After moving files, update all import statements to use the new `@/` alias:

### Old Import Pattern:
```typescript
import { Header } from '../components/Header';
import { Button } from './ui/button';
import { cn } from './ui/utils';
```

### New Import Pattern:
```typescript
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils/cn';
```

## Verification Checklist

After migration, verify:

- [ ] All files moved to correct directories
- [ ] All imports updated to use `@/` alias
- [ ] No duplicate files remaining in old locations
- [ ] TypeScript compilation successful (`npm run type-check`)
- [ ] Application runs without errors (`npm run dev`)
- [ ] All routes accessible
- [ ] All components render correctly

## Cleanup

After successful migration, delete old directories:

```bash
rm -rf /app
rm -rf /components
rm -rf /hooks (old location)
rm -rf /services (old location)
rm -rf /utils
rm -rf /types (old location)
rm -rf /config (old location)
rm -rf /styles (old location, keep only src/styles if needed)
```

## Troubleshooting

### Import Errors

If you see import errors like `Module not found`:
1. Check the import path matches the new file location
2. Ensure `@/` alias is properly configured in `tsconfig.json`
3. Restart your development server

### TypeScript Errors

If TypeScript shows errors:
1. Run `npm run type-check` to see all issues
2. Update type imports to use `@/types/`
3. Check that all `.tsx` files have proper type annotations

### Component Not Rendering

If a component doesn't render:
1. Check browser console for errors
2. Verify all nested imports are updated
3. Ensure the component is properly exported

## Need Help?

If you encounter issues during migration:
1. Check the README.md for project structure
2. Review the tsconfig.json for path aliases
3. Ensure all dependencies are installed (`npm install`)
4. Clear Next.js cache: `rm -rf .next` and restart

## Post-Migration

Once migration is complete:
1. Test all features thoroughly
2. Run production build: `npm run build`
3. Deploy to your environment
4. Update your team documentation

---

**Migration Status**: Ready to execute
**Estimated Time**: 30-60 minutes
**Risk Level**: Low (backup recommended)
