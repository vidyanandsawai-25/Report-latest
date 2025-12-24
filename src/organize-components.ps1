# Component Organization Script for Next.js Migration - PowerShell
# Maharashtra Water Billing System

Write-Host "🚀 Starting Component Organization..." -ForegroundColor Green
Write-Host ""

# Create component folders
Write-Host "📁 Creating component folders..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "components/layout" | Out-Null
New-Item -ItemType Directory -Force -Path "components/reports" | Out-Null
New-Item -ItemType Directory -Force -Path "components/filters" | Out-Null
New-Item -ItemType Directory -Force -Path "components/tables" | Out-Null
New-Item -ItemType Directory -Force -Path "components/modals" | Out-Null
New-Item -ItemType Directory -Force -Path "components/ai" | Out-Null
New-Item -ItemType Directory -Force -Path "components/sms" | Out-Null
New-Item -ItemType Directory -Force -Path "components/kpi" | Out-Null
New-Item -ItemType Directory -Force -Path "components/common" | Out-Null
Write-Host "✅ Folders created!" -ForegroundColor Green
Write-Host ""

# Move Layout Components
Write-Host "📦 Moving layout components..." -ForegroundColor Yellow
if (Test-Path "components/Header.tsx") { Move-Item "components/Header.tsx" "components/layout/" -Force }
if (Test-Path "components/Sidebar.tsx") { Move-Item "components/Sidebar.tsx" "components/layout/" -Force }
if (Test-Path "components/TabNavigation.tsx") { Move-Item "components/TabNavigation.tsx" "components/layout/" -Force }
if (Test-Path "components/EngineTabNavigation.tsx") { Move-Item "components/EngineTabNavigation.tsx" "components/layout/" -Force }
Write-Host "✅ Layout components moved!" -ForegroundColor Green

# Move Report Components
Write-Host "📦 Moving report components..." -ForegroundColor Yellow
if (Test-Path "components/ReportEngine.tsx") { Move-Item "components/ReportEngine.tsx" "components/reports/" -Force }
if (Test-Path "components/CollectionReport.tsx") { Move-Item "components/CollectionReport.tsx" "components/reports/" -Force }
if (Test-Path "components/CRMReport.tsx") { Move-Item "components/CRMReport.tsx" "components/reports/" -Force }
if (Test-Path "components/QuickReports.tsx") { Move-Item "components/QuickReports.tsx" "components/reports/" -Force }
if (Test-Path "components/ZoneWiseCollectionReport.tsx") { Move-Item "components/ZoneWiseCollectionReport.tsx" "components/reports/" -Force }
if (Test-Path "components/ReportCard.tsx") { Move-Item "components/ReportCard.tsx" "components/reports/" -Force }
if (Test-Path "components/DailyReportReminder.tsx") { Move-Item "components/DailyReportReminder.tsx" "components/reports/" -Force }
if (Test-Path "components/AutoReportNotification.tsx") { Move-Item "components/AutoReportNotification.tsx" "components/reports/" -Force }
Write-Host "✅ Report components moved!" -ForegroundColor Green

# Move Filter Components
Write-Host "📦 Moving filter components..." -ForegroundColor Yellow
if (Test-Path "components/FilterPanel.tsx") { Move-Item "components/FilterPanel.tsx" "components/filters/" -Force }
if (Test-Path "components/SlideInFilterPanel.tsx") { Move-Item "components/SlideInFilterPanel.tsx" "components/filters/" -Force }
if (Test-Path "components/AccountantFilter.tsx") { Move-Item "components/AccountantFilter.tsx" "components/filters/" -Force }
if (Test-Path "components/AlterationReportFilter.tsx") { Move-Item "components/AlterationReportFilter.tsx" "components/filters/" -Force }
if (Test-Path "components/CollectionDetailsFilter.tsx") { Move-Item "components/CollectionDetailsFilter.tsx" "components/filters/" -Force }
if (Test-Path "components/CollectionReportFilter.tsx") { Move-Item "components/CollectionReportFilter.tsx" "components/filters/" -Force }
if (Test-Path "components/ConnectionSealFilter.tsx") { Move-Item "components/ConnectionSealFilter.tsx" "components/filters/" -Force }
if (Test-Path "components/GoshwaraFilterModal.tsx") { Move-Item "components/GoshwaraFilterModal.tsx" "components/filters/" -Force }
if (Test-Path "components/MutationReportFilter.tsx") { Move-Item "components/MutationReportFilter.tsx" "components/filters/" -Force }
if (Test-Path "components/PaymentModeFilter.tsx") { Move-Item "components/PaymentModeFilter.tsx" "components/filters/" -Force }
if (Test-Path "components/ReadingSummaryFilter.tsx") { Move-Item "components/ReadingSummaryFilter.tsx" "components/filters/" -Force }
if (Test-Path "components/RevenueSummaryFilter.tsx") { Move-Item "components/RevenueSummaryFilter.tsx" "components/filters/" -Force }
Write-Host "✅ Filter components moved!" -ForegroundColor Green

# Move Table Components
Write-Host "📦 Moving table components..." -ForegroundColor Yellow
if (Test-Path "components/TopDefaultersTable.tsx") { Move-Item "components/TopDefaultersTable.tsx" "components/tables/" -Force }
if (Test-Path "components/PendingReadingTable.tsx") { Move-Item "components/PendingReadingTable.tsx" "components/tables/" -Force }
if (Test-Path "components/ClosedConnectionTable.tsx") { Move-Item "components/ClosedConnectionTable.tsx" "components/tables/" -Force }
if (Test-Path "components/ReportResultsTable.tsx") { Move-Item "components/ReportResultsTable.tsx" "components/tables/" -Force }
if (Test-Path "components/SMSManagerTable.tsx") { Move-Item "components/SMSManagerTable.tsx" "components/tables/" -Force }
Write-Host "✅ Table components moved!" -ForegroundColor Green

# Move Modal/Dialog Components
Write-Host "📦 Moving modal/dialog components..." -ForegroundColor Yellow
if (Test-Path "components/ConfirmDialog.tsx") { Move-Item "components/ConfirmDialog.tsx" "components/modals/" -Force }
if (Test-Path "components/ReportDialog.tsx") { Move-Item "components/ReportDialog.tsx" "components/modals/" -Force }
if (Test-Path "components/SMSConfirmDialog.tsx") { Move-Item "components/SMSConfirmDialog.tsx" "components/modals/" -Force }
if (Test-Path "components/ExportToExcelDialog.tsx") { Move-Item "components/ExportToExcelDialog.tsx" "components/modals/" -Force }
if (Test-Path "components/DownloadLogModal.tsx") { Move-Item "components/DownloadLogModal.tsx" "components/modals/" -Force }
if (Test-Path "components/AIInsightModal.tsx") { Move-Item "components/AIInsightModal.tsx" "components/modals/" -Force }
if (Test-Path "components/LastWorkSummaryPopup.tsx") { Move-Item "components/LastWorkSummaryPopup.tsx" "components/modals/" -Force }
Write-Host "✅ Modal/dialog components moved!" -ForegroundColor Green

# Move AI Components
Write-Host "📦 Moving AI components..." -ForegroundColor Yellow
if (Test-Path "components/DataEngine.tsx") { Move-Item "components/DataEngine.tsx" "components/ai/" -Force }
if (Test-Path "components/DataEngine-clean.tsx") { Move-Item "components/DataEngine-clean.tsx" "components/ai/" -Force }
if (Test-Path "components/DataEngine-enhanced.tsx") { Move-Item "components/DataEngine-enhanced.tsx" "components/ai/" -Force }
if (Test-Path "components/AISearchBar.tsx") { Move-Item "components/AISearchBar.tsx" "components/ai/" -Force }
if (Test-Path "components/SearchResultsGrid.tsx") { Move-Item "components/SearchResultsGrid.tsx" "components/ai/" -Force }
Write-Host "✅ AI components moved!" -ForegroundColor Green

# Move SMS Components
Write-Host "📦 Moving SMS components..." -ForegroundColor Yellow
if (Test-Path "components/SMSManager.tsx") { Move-Item "components/SMSManager.tsx" "components/sms/" -Force }
Write-Host "✅ SMS components moved!" -ForegroundColor Green

# Move KPI & Chart Components
Write-Host "📦 Moving KPI & chart components..." -ForegroundColor Yellow
if (Test-Path "components/KPICards.tsx") { Move-Item "components/KPICards.tsx" "components/kpi/" -Force }
if (Test-Path "components/KPISection.tsx") { Move-Item "components/KPISection.tsx" "components/kpi/" -Force }
if (Test-Path "components/ChartSection.tsx") { Move-Item "components/ChartSection.tsx" "components/kpi/" -Force }
if (Test-Path "components/ChartsSection.tsx") { Move-Item "components/ChartsSection.tsx" "components/kpi/" -Force }
if (Test-Path "components/CollectionInsightsCard.tsx") { Move-Item "components/CollectionInsightsCard.tsx" "components/kpi/" -Force }
Write-Host "✅ KPI & chart components moved!" -ForegroundColor Green

# Move Common/Shared Components
Write-Host "📦 Moving common/shared components..." -ForegroundColor Yellow
if (Test-Path "components/SearchBar.tsx") { Move-Item "components/SearchBar.tsx" "components/common/" -Force }
if (Test-Path "components/ReportsHeader.tsx") { Move-Item "components/ReportsHeader.tsx" "components/common/" -Force }
if (Test-Path "components/CheckboxGrid.tsx") { Move-Item "components/CheckboxGrid.tsx" "components/common/" -Force }
if (Test-Path "components/MultiSelectDropdown.tsx") { Move-Item "components/MultiSelectDropdown.tsx" "components/common/" -Force }
if (Test-Path "components/MultiSelectCheckboxDropdown.tsx") { Move-Item "components/MultiSelectCheckboxDropdown.tsx" "components/common/" -Force }
Write-Host "✅ Common/shared components moved!" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Component organization complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Update imports in moved components (change './ui/...' to '@/components/ui/...')"
Write-Host "2. Imports in app/page.tsx are already updated!"
Write-Host "3. Run: npm run dev"
Write-Host "4. Fix any remaining import errors"
Write-Host ""
Write-Host "✅ All done! Your components are now organized!" -ForegroundColor Green
