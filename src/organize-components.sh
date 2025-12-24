#!/bin/bash

# Component Organization Script for Next.js Migration
# Maharashtra Water Billing System

echo "🚀 Starting Component Organization..."
echo ""

# Create component folders
echo "📁 Creating component folders..."
mkdir -p components/layout
mkdir -p components/reports
mkdir -p components/filters
mkdir -p components/tables
mkdir -p components/modals
mkdir -p components/ai
mkdir -p components/sms
mkdir -p components/kpi
mkdir -p components/common

echo "✅ Folders created!"
echo ""

# Move Layout Components
echo "📦 Moving layout components..."
[ -f components/Header.tsx ] && mv components/Header.tsx components/layout/
[ -f components/Sidebar.tsx ] && mv components/Sidebar.tsx components/layout/
[ -f components/TabNavigation.tsx ] && mv components/TabNavigation.tsx components/layout/
[ -f components/EngineTabNavigation.tsx ] && mv components/EngineTabNavigation.tsx components/layout/
echo "✅ Layout components moved!"

# Move Report Components
echo "📦 Moving report components..."
[ -f components/ReportEngine.tsx ] && mv components/ReportEngine.tsx components/reports/
[ -f components/CollectionReport.tsx ] && mv components/CollectionReport.tsx components/reports/
[ -f components/CRMReport.tsx ] && mv components/CRMReport.tsx components/reports/
[ -f components/QuickReports.tsx ] && mv components/QuickReports.tsx components/reports/
[ -f components/ZoneWiseCollectionReport.tsx ] && mv components/ZoneWiseCollectionReport.tsx components/reports/
[ -f components/ReportCard.tsx ] && mv components/ReportCard.tsx components/reports/
[ -f components/DailyReportReminder.tsx ] && mv components/DailyReportReminder.tsx components/reports/
[ -f components/AutoReportNotification.tsx ] && mv components/AutoReportNotification.tsx components/reports/
echo "✅ Report components moved!"

# Move Filter Components
echo "📦 Moving filter components..."
[ -f components/FilterPanel.tsx ] && mv components/FilterPanel.tsx components/filters/
[ -f components/SlideInFilterPanel.tsx ] && mv components/SlideInFilterPanel.tsx components/filters/
[ -f components/AccountantFilter.tsx ] && mv components/AccountantFilter.tsx components/filters/
[ -f components/AlterationReportFilter.tsx ] && mv components/AlterationReportFilter.tsx components/filters/
[ -f components/CollectionDetailsFilter.tsx ] && mv components/CollectionDetailsFilter.tsx components/filters/
[ -f components/CollectionReportFilter.tsx ] && mv components/CollectionReportFilter.tsx components/filters/
[ -f components/ConnectionSealFilter.tsx ] && mv components/ConnectionSealFilter.tsx components/filters/
[ -f components/GoshwaraFilterModal.tsx ] && mv components/GoshwaraFilterModal.tsx components/filters/
[ -f components/MutationReportFilter.tsx ] && mv components/MutationReportFilter.tsx components/filters/
[ -f components/PaymentModeFilter.tsx ] && mv components/PaymentModeFilter.tsx components/filters/
[ -f components/ReadingSummaryFilter.tsx ] && mv components/ReadingSummaryFilter.tsx components/filters/
[ -f components/RevenueSummaryFilter.tsx ] && mv components/RevenueSummaryFilter.tsx components/filters/
echo "✅ Filter components moved!"

# Move Table Components
echo "📦 Moving table components..."
[ -f components/TopDefaultersTable.tsx ] && mv components/TopDefaultersTable.tsx components/tables/
[ -f components/PendingReadingTable.tsx ] && mv components/PendingReadingTable.tsx components/tables/
[ -f components/ClosedConnectionTable.tsx ] && mv components/ClosedConnectionTable.tsx components/tables/
[ -f components/ReportResultsTable.tsx ] && mv components/ReportResultsTable.tsx components/tables/
[ -f components/SMSManagerTable.tsx ] && mv components/SMSManagerTable.tsx components/tables/
echo "✅ Table components moved!"

# Move Modal/Dialog Components
echo "📦 Moving modal/dialog components..."
[ -f components/ConfirmDialog.tsx ] && mv components/ConfirmDialog.tsx components/modals/
[ -f components/ReportDialog.tsx ] && mv components/ReportDialog.tsx components/modals/
[ -f components/SMSConfirmDialog.tsx ] && mv components/SMSConfirmDialog.tsx components/modals/
[ -f components/ExportToExcelDialog.tsx ] && mv components/ExportToExcelDialog.tsx components/modals/
[ -f components/DownloadLogModal.tsx ] && mv components/DownloadLogModal.tsx components/modals/
[ -f components/AIInsightModal.tsx ] && mv components/AIInsightModal.tsx components/modals/
[ -f components/LastWorkSummaryPopup.tsx ] && mv components/LastWorkSummaryPopup.tsx components/modals/
echo "✅ Modal/dialog components moved!"

# Move AI Components
echo "📦 Moving AI components..."
[ -f components/DataEngine.tsx ] && mv components/DataEngine.tsx components/ai/
[ -f components/DataEngine-clean.tsx ] && mv components/DataEngine-clean.tsx components/ai/
[ -f components/DataEngine-enhanced.tsx ] && mv components/DataEngine-enhanced.tsx components/ai/
[ -f components/AISearchBar.tsx ] && mv components/AISearchBar.tsx components/ai/
[ -f components/SearchResultsGrid.tsx ] && mv components/SearchResultsGrid.tsx components/ai/
echo "✅ AI components moved!"

# Move SMS Components
echo "📦 Moving SMS components..."
[ -f components/SMSManager.tsx ] && mv components/SMSManager.tsx components/sms/
echo "✅ SMS components moved!"

# Move KPI & Chart Components
echo "📦 Moving KPI & chart components..."
[ -f components/KPICards.tsx ] && mv components/KPICards.tsx components/kpi/
[ -f components/KPISection.tsx ] && mv components/KPISection.tsx components/kpi/
[ -f components/ChartSection.tsx ] && mv components/ChartSection.tsx components/kpi/
[ -f components/ChartsSection.tsx ] && mv components/ChartsSection.tsx components/kpi/
[ -f components/CollectionInsightsCard.tsx ] && mv components/CollectionInsightsCard.tsx components/kpi/
echo "✅ KPI & chart components moved!"

# Move Common/Shared Components
echo "📦 Moving common/shared components..."
[ -f components/SearchBar.tsx ] && mv components/SearchBar.tsx components/common/
[ -f components/ReportsHeader.tsx ] && mv components/ReportsHeader.tsx components/common/
[ -f components/CheckboxGrid.tsx ] && mv components/CheckboxGrid.tsx components/common/
[ -f components/MultiSelectDropdown.tsx ] && mv components/MultiSelectDropdown.tsx components/common/
[ -f components/MultiSelectCheckboxDropdown.tsx ] && mv components/MultiSelectCheckboxDropdown.tsx components/common/
echo "✅ Common/shared components moved!"

echo ""
echo "🎉 Component organization complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Update imports in moved components (change './ui/...' to '@/components/ui/...')"
echo "2. Imports in app/page.tsx are already updated!"
echo "3. Run: npm run dev"
echo "4. Fix any remaining import errors"
echo ""
echo "✅ All done! Your components are now organized!"
