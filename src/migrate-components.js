#!/usr/bin/env node

/**
 * Component Migration Script for Maharashtra Water Billing System
 * This script automates the migration of components from the old structure to the new src/ structure
 */

const fs = require('fs');
const path = require('path');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Migration mappings
const migrations = {
  // Layout Components
  layout: [
    { from: 'components/Header.tsx', to: 'src/components/layout/Header.tsx' },
    { from: 'components/Sidebar.tsx', to: 'src/components/layout/Sidebar.tsx' },
    { from: 'components/EngineTabNavigation.tsx', to: 'src/components/layout/EngineTabNavigation.tsx' },
    { from: 'components/TabNavigation.tsx', to: 'src/components/layout/TabNavigation.tsx' },
    { from: 'components/ReportsHeader.tsx', to: 'src/components/layout/ReportsHeader.tsx' },
  ],

  // Water Tax - Reports
  reports: [
    { from: 'components/ReportEngine.tsx', to: 'src/components/modules/water-tax/reports/ReportEngine.tsx' },
    { from: 'components/ReportCard.tsx', to: 'src/components/modules/water-tax/reports/ReportCard.tsx' },
    { from: 'components/CollectionReport.tsx', to: 'src/components/modules/water-tax/reports/CollectionReport.tsx' },
    { from: 'components/CRMReport.tsx', to: 'src/components/modules/water-tax/reports/CRMReport.tsx' },
    { from: 'components/QuickReports.tsx', to: 'src/components/modules/water-tax/reports/QuickReports.tsx' },
    { from: 'components/ZoneWiseCollectionReport.tsx', to: 'src/components/modules/water-tax/reports/ZoneWiseCollectionReport.tsx' },
    { from: 'components/AutoReportNotification.tsx', to: 'src/components/modules/water-tax/reports/AutoReportNotification.tsx' },
  ],

  // Water Tax - Tables
  tables: [
    { from: 'components/TopDefaultersTable.tsx', to: 'src/components/modules/water-tax/tables/TopDefaultersTable.tsx' },
    { from: 'components/PendingReadingTable.tsx', to: 'src/components/modules/water-tax/tables/PendingReadingTable.tsx' },
    { from: 'components/ClosedConnectionTable.tsx', to: 'src/components/modules/water-tax/tables/ClosedConnectionTable.tsx' },
    { from: 'components/ReportResultsTable.tsx', to: 'src/components/modules/water-tax/tables/ReportResultsTable.tsx' },
    { from: 'components/SMSManagerTable.tsx', to: 'src/components/modules/water-tax/tables/SMSManagerTable.tsx' },
  ],

  // Water Tax - Filters
  filters: [
    { from: 'components/FilterPanel.tsx', to: 'src/components/modules/water-tax/filters/FilterPanel.tsx' },
    { from: 'components/SlideInFilterPanel.tsx', to: 'src/components/modules/water-tax/filters/SlideInFilterPanel.tsx' },
    { from: 'components/CollectionReportFilter.tsx', to: 'src/components/modules/water-tax/filters/CollectionReportFilter.tsx' },
    { from: 'components/ReadingSummaryFilter.tsx', to: 'src/components/modules/water-tax/filters/ReadingSummaryFilter.tsx' },
    { from: 'components/ConnectionSealFilter.tsx', to: 'src/components/modules/water-tax/filters/ConnectionSealFilter.tsx' },
    { from: 'components/PaymentModeFilter.tsx', to: 'src/components/modules/water-tax/filters/PaymentModeFilter.tsx' },
    { from: 'components/RevenueSummaryFilter.tsx', to: 'src/components/modules/water-tax/filters/RevenueSummaryFilter.tsx' },
    { from: 'components/AccountantFilter.tsx', to: 'src/components/modules/water-tax/filters/AccountantFilter.tsx' },
    { from: 'components/MutationReportFilter.tsx', to: 'src/components/modules/water-tax/filters/MutationReportFilter.tsx' },
    { from: 'components/AlterationReportFilter.tsx', to: 'src/components/modules/water-tax/filters/AlterationReportFilter.tsx' },
    { from: 'components/CollectionDetailsFilter.tsx', to: 'src/components/modules/water-tax/filters/CollectionDetailsFilter.tsx' },
    { from: 'components/GoshwaraFilterModal.tsx', to: 'src/components/modules/water-tax/filters/GoshwaraFilterModal.tsx' },
  ],

  // Water Tax - AI
  ai: [
    { from: 'components/DataEngine.tsx', to: 'src/components/modules/water-tax/ai/DataEngine.tsx' },
    { from: 'components/DataEngine-clean.tsx', to: 'src/components/modules/water-tax/ai/DataEngine-clean.tsx' },
    { from: 'components/DataEngine-enhanced.tsx', to: 'src/components/modules/water-tax/ai/DataEngine-enhanced.tsx' },
    { from: 'components/AISearchBar.tsx', to: 'src/components/modules/water-tax/ai/AISearchBar.tsx' },
    { from: 'components/AIInsightModal.tsx', to: 'src/components/modules/water-tax/ai/AIInsightModal.tsx' },
    { from: 'components/SearchBar.tsx', to: 'src/components/modules/water-tax/ai/SearchBar.tsx' },
    { from: 'components/SearchResultsGrid.tsx', to: 'src/components/modules/water-tax/ai/SearchResultsGrid.tsx' },
  ],

  // Water Tax - SMS
  sms: [
    { from: 'components/SMSManager.tsx', to: 'src/components/modules/water-tax/sms/SMSManager.tsx' },
    { from: 'components/SMSConfirmDialog.tsx', to: 'src/components/modules/water-tax/sms/SMSConfirmDialog.tsx' },
  ],

  // Water Tax - Modals
  modals: [
    { from: 'components/DownloadLogModal.tsx', to: 'src/components/modules/water-tax/modals/DownloadLogModal.tsx' },
    { from: 'components/ExportToExcelDialog.tsx', to: 'src/components/modules/water-tax/modals/ExportToExcelDialog.tsx' },
    { from: 'components/ReportDialog.tsx', to: 'src/components/modules/water-tax/modals/ReportDialog.tsx' },
    { from: 'components/ConfirmDialog.tsx', to: 'src/components/modules/water-tax/modals/ConfirmDialog.tsx' },
    { from: 'components/LastWorkSummaryPopup.tsx', to: 'src/components/modules/water-tax/modals/LastWorkSummaryPopup.tsx' },
  ],

  // Water Tax - KPI
  kpi: [
    { from: 'components/KPICards.tsx', to: 'src/components/modules/water-tax/kpi/KPICards.tsx' },
    { from: 'components/KPISection.tsx', to: 'src/components/modules/water-tax/kpi/KPISection.tsx' },
    { from: 'components/CollectionInsightsCard.tsx', to: 'src/components/modules/water-tax/kpi/CollectionInsightsCard.tsx' },
    { from: 'components/ChartSection.tsx', to: 'src/components/modules/water-tax/kpi/ChartSection.tsx' },
    { from: 'components/ChartsSection.tsx', to: 'src/components/modules/water-tax/kpi/ChartsSection.tsx' },
  ],

  // Water Tax - Notifications
  notifications: [
    { from: 'components/DailyReportReminder.tsx', to: 'src/components/modules/water-tax/notifications/DailyReportReminder.tsx' },
  ],

  // Water Tax - UI Elements
  uiElements: [
    { from: 'components/MultiSelectDropdown.tsx', to: 'src/components/modules/water-tax/ui-elements/MultiSelectDropdown.tsx' },
    { from: 'components/MultiSelectCheckboxDropdown.tsx', to: 'src/components/modules/water-tax/ui-elements/MultiSelectCheckboxDropdown.tsx' },
    { from: 'components/CheckboxGrid.tsx', to: 'src/components/modules/water-tax/ui-elements/CheckboxGrid.tsx' },
  ],

  // Hooks
  hooks: [
    { from: 'hooks/useAuth.ts', to: 'src/hooks/useAuth.ts' },
    { from: 'hooks/useMasterData.ts', to: 'src/hooks/useMasterData.ts' },
    { from: 'hooks/useReports.ts', to: 'src/hooks/useReports.ts' },
  ],

  // Services
  services: [
    { from: 'services/api.service.ts', to: 'src/services/api.service.ts' },
    { from: 'services/auth.service.ts', to: 'src/services/auth.service.ts' },
    { from: 'services/master.service.ts', to: 'src/services/master.service.ts' },
    { from: 'services/reports.service.ts', to: 'src/services/reports.service.ts' },
    { from: 'services/sms.service.ts', to: 'src/services/sms.service.ts' },
  ],

  // Utilities
  utils: [
    { from: 'utils/reportTracking.ts', to: 'src/lib/utils/reportTracking.ts' },
    { from: 'utils/topDefaultersPDF.ts', to: 'src/lib/utils/topDefaultersPDF.ts' },
    { from: 'utils/imagePlaceholders.ts', to: 'src/lib/utils/imagePlaceholders.ts' },
  ],

  // Types
  types: [
    { from: 'types/api.types.ts', to: 'src/types/api.types.ts' },
    { from: 'types/figma-assets.d.ts', to: 'src/types/figma-assets.d.ts' },
  ],

  // UI Components - Copy entire directory
  ui: [
    { from: 'components/ui', to: 'src/components/ui', isDirectory: true },
    { from: 'components/figma', to: 'src/components/figma', isDirectory: true },
  ],
};

// Function to create directory if it doesn't exist
function ensureDirectoryExists(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

// Function to copy file
function copyFile(from, to) {
  try {
    if (!fs.existsSync(from)) {
      log(`  ⚠ File not found: ${from}`, 'yellow');
      return false;
    }

    ensureDirectoryExists(to);
    fs.copyFileSync(from, to);
    log(`  ✓ Copied: ${from} → ${to}`, 'green');
    return true;
  } catch (error) {
    log(`  ✗ Error copying ${from}: ${error.message}`, 'red');
    return false;
  }
}

// Function to copy directory
function copyDirectory(from, to) {
  try {
    if (!fs.existsSync(from)) {
      log(`  ⚠ Directory not found: ${from}`, 'yellow');
      return false;
    }

    ensureDirectoryExists(to);
    
    // Copy directory recursively
    const files = fs.readdirSync(from);
    files.forEach(file => {
      const fromPath = path.join(from, file);
      const toPath = path.join(to, file);
      
      if (fs.statSync(fromPath).isDirectory()) {
        copyDirectory(fromPath, toPath);
      } else {
        fs.copyFileSync(fromPath, toPath);
      }
    });
    
    log(`  ✓ Copied directory: ${from} → ${to}`, 'green');
    return true;
  } catch (error) {
    log(`  ✗ Error copying directory ${from}: ${error.message}`, 'red');
    return false;
  }
}

// Main migration function
function migrate() {
  log('\n📦 Starting Component Migration...', 'bright');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue');

  let totalFiles = 0;
  let successCount = 0;

  Object.entries(migrations).forEach(([category, files]) => {
    log(`\n${category.toUpperCase()}:`, 'bright');
    
    files.forEach(({ from, to, isDirectory }) => {
      totalFiles++;
      const success = isDirectory ? copyDirectory(from, to) : copyFile(from, to);
      if (success) successCount++;
    });
  });

  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue');
  log(`\n✨ Migration Complete!`, 'bright');
  log(`  Total files processed: ${totalFiles}`, 'blue');
  log(`  Successfully migrated: ${successCount}`, 'green');
  log(`  Skipped/Failed: ${totalFiles - successCount}`, totalFiles - successCount > 0 ? 'yellow' : 'green');

  log('\n📋 Next Steps:', 'bright');
  log('  1. Run: npm install', 'blue');
  log('  2. Run: npm run type-check', 'blue');
  log('  3. Run: npm run dev', 'blue');
  log('  4. Test all features', 'blue');
  log('\n');
}

// Run migration
migrate();
