'use client';

import { AutoReportNotification } from '@/components/reports/AutoReportNotification';
import { ReportResultsTable } from '@/components/tables/ReportResultsTable';
import { TopDefaultersTable } from '@/components/tables/TopDefaultersTable';
import { PendingReadingTable } from '@/components/tables/PendingReadingTable';
import { ClosedConnectionTable } from '@/components/tables/ClosedConnectionTable';
import { DownloadLogModal } from '@/components/modals/DownloadLogModal';
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { SearchBar } from '@/components/common/SearchBar';
import { EngineTabNavigation } from '@/components/layout/EngineTabNavigation';
import { TabNavigation } from '@/components/layout/TabNavigation';
import { ReportEngine } from '@/components/reports/ReportEngine';
import { CollectionReport } from '@/components/reports/CollectionReport';
import { CRMReport } from '@/components/reports/CRMReport';
import { QuickReports } from '@/components/reports/QuickReports';
import { DataEngine } from '@/components/ai/DataEngine';
import { SMSManager } from '@/components/sms/SMSManager';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { CollectionReportFilter } from '@/components/filters/CollectionReportFilter';
import { ReadingSummaryFilter } from '@/components/filters/ReadingSummaryFilter';
import { ConnectionSealFilter } from '@/components/filters/ConnectionSealFilter';
import { PaymentModeFilter } from '@/components/filters/PaymentModeFilter';
import { RevenueSummaryFilter } from '@/components/filters/RevenueSummaryFilter';
import { AccountantFilter } from '@/components/filters/AccountantFilter';
import { MutationReportFilter } from '@/components/filters/MutationReportFilter';
import { AlterationReportFilter } from '@/components/filters/AlterationReportFilter';
import { CollectionDetailsFilter } from '@/components/filters/CollectionDetailsFilter';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { ExportToExcelDialog } from '@/components/modals/ExportToExcelDialog';
import { SearchResultsGrid } from '@/components/ai/SearchResultsGrid';
import { LastWorkSummaryPopup } from '@/components/modals/LastWorkSummaryPopup';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { 
  saveReportToHistory, 
  detectDailyPattern, 
  wasGeneratedToday 
} from '@/utils/reportTracking';
import Image from 'next/image';

export default function HomePage() {
  const [activeMainTab, setActiveMainTab] = useState<'reports' | 'sms'>('reports');
  const [activeEngineTab, setActiveEngineTab] = useState<'reports' | 'data'>('reports');
  const [activeSubTab, setActiveSubTab] = useState<'engine' | 'collection' | 'crm' | 'quick'>('engine');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [reportResultsOpen, setReportResultsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [autoReportNotification, setAutoReportNotification] = useState<{
    isOpen: boolean;
    reportName: string;
    reportType: string;
  }>({
    isOpen: false,
    reportName: '',
    reportType: '',
  });
  const [language, setLanguage] = useState<'en' | 'mr'>('en');
  const [downloadLogOpen, setDownloadLogOpen] = useState(false);
  const [lastWorkSummaryOpen, setLastWorkSummaryOpen] = useState(false);

  // Show Last Work Summary on initial load (simulating login)
  useEffect(() => {
    // Check if this is a "new login" - in production, this would be based on actual auth
    const hasSeenSummary = sessionStorage.getItem('hasSeenWorkSummary');
    
    if (!hasSeenSummary) {
      // Show the popup after a short delay
      setTimeout(() => {
        setLastWorkSummaryOpen(true);
        sessionStorage.setItem('hasSeenWorkSummary', 'true');
      }, 1000);
    }
  }, []);

  const handleReportClick = (reportName: string) => {
    setSelectedReport(reportName);
    setFilterPanelOpen(true);
  };

  const handleSearch = () => {
    // Track report generation
    if (selectedReport) {
      saveReportToHistory(
        activeSubTab, // reportType: 'engine', 'collection', or 'crm'
        selectedReport,
        { searchQuery, timestamp: Date.now() }
      );
    }

    // Close filter panel and show loading dialog
    setFilterPanelOpen(false);
    setDialogOpen(true);
    
    setTimeout(() => {
      setDialogOpen(false);
      // Show results table after loading
      setTimeout(() => {
        setReportResultsOpen(true);
      }, 300);
    }, 2000);
  };

  const handleExport = () => {
    // Track report export
    if (selectedReport) {
      saveReportToHistory(
        activeSubTab,
        selectedReport,
        { exportedAt: Date.now(), searchQuery }
      );
    }

    setExportDialogOpen(true);
  };

  // Auto-generate daily reports on app close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const pattern = detectDailyPattern();
      
      if (pattern && !wasGeneratedToday(pattern.reportType, pattern.reportName)) {
        // Show notification about auto-generated report
        setAutoReportNotification({
          isOpen: true,
          reportName: pattern.reportName,
          reportType: pattern.reportType,
        });

        // Track the auto-generated report
        saveReportToHistory(
          pattern.reportType,
          pattern.reportName,
          { ...pattern.filters, autoGenerated: true }
        );

        // Delay closing slightly to show notification
        e.preventDefault();
        e.returnValue = '';
        
        setTimeout(() => {
          setAutoReportNotification({
            isOpen: true,
            reportName: pattern.reportName,
            reportType: pattern.reportType,
          });
        }, 100);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Check for daily pattern on mount and show notification
  useEffect(() => {
    const checkDailyPattern = () => {
      const pattern = detectDailyPattern();
      
      if (pattern && !wasGeneratedToday(pattern.reportType, pattern.reportName)) {
        // Wait a bit before showing the notification
        setTimeout(() => {
          setAutoReportNotification({
            isOpen: true,
            reportName: pattern.reportName,
            reportType: pattern.reportType,
          });

          // Track the auto-generated report
          saveReportToHistory(
            pattern.reportType,
            pattern.reportName,
            { ...pattern.filters, autoGenerated: true }
          );

          // Show toast notification
          toast.success(
            language === 'en' 
              ? `Daily report "${pattern.reportName}" auto-generated successfully!`
              : `दैनिक अहवाल "${pattern.reportName}" स्वयं-निर्मित झाला!`,
            {
              duration: 5000,
              position: 'top-right',
            }
          );
        }, 2000);
      }
    };

    checkDailyPattern();
  }, [language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#F0F9FF] relative overflow-hidden">
      {/* Water Droplet Background Image */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03]">
          <Image
            src="/assets/images/water-droplet-bg.png"
            alt="Water droplet background"
            width={800}
            height={800}
            className="object-contain blur-[0.5px]"
            priority={false}
          />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-gradient-to-br from-[#005AA7] to-[#00C6FF] text-white rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop always visible, Mobile conditional */}
      <div className="hidden md:block">
        <Sidebar 
          activeTab={activeMainTab}
          onTabChange={(tab) => {
            setActiveMainTab(tab as 'reports' | 'sms');
          }}
        />
      </div>

      {/* Sidebar - Mobile with animation */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="md:hidden fixed left-0 top-0 bottom-0 z-50"
          >
            <Sidebar 
              activeTab={activeMainTab}
              onTabChange={(tab) => {
                setActiveMainTab(tab as 'reports' | 'sms');
                setMobileSidebarOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="md:ml-[72px] transition-all duration-200 relative z-10">
        <Header 
          language={language}
          onLanguageChange={setLanguage}
        />
        {activeMainTab === 'reports' && (
          <>
            {/* Engine Tab Navigation - Report Engine vs Data Engine */}
            <EngineTabNavigation
              activeEngineTab={activeEngineTab}
              onEngineTabChange={setActiveEngineTab}
              onFilterClick={() => setDownloadLogOpen(true)}
            />
            
            {/* Show SearchBar and SubTabs only for Report Engine */}
            {activeEngineTab === 'reports' && (
              <>
                <SearchBar 
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={() => setSearchResultsOpen(true)}
                />
                <TabNavigation 
                  activeSubTab={activeSubTab}
                  onSubTabChange={setActiveSubTab}
                />
              </>
            )}
          </>
        )}
        
        <main className="px-4 md:px-6 py-4 pb-20 md:pb-4">
          {activeMainTab === 'reports' && (
            <>
              {activeEngineTab === 'reports' && (
                <>
                  {activeSubTab === 'engine' && (
                    <ReportEngine onReportClick={handleReportClick} />
                  )}
                  {activeSubTab === 'collection' && (
                    <CollectionReport onReportClick={handleReportClick} />
                  )}
                  {activeSubTab === 'crm' && (
                    <CRMReport onReportClick={handleReportClick} />
                  )}
                  {activeSubTab === 'quick' && (
                    <QuickReports language={language} />
                  )}
                </>
              )}
              {activeEngineTab === 'data' && (
                <DataEngine />
              )}
            </>
          )}
          {activeMainTab === 'sms' && (
            <SMSManager />
          )}
        </main>
      </div>

      {/* Conditional Filter Panel - Show specialized filters for different report types */}
      {selectedReport === 'Mutation Report' ? (
        <MutationReportFilter 
          isOpen={filterPanelOpen}
          onClose={() => setFilterPanelOpen(false)}
          onSearch={handleSearch}
          onExport={handleExport}
        />
      ) : selectedReport === 'Alteration Report' ? (
        <AlterationReportFilter 
          isOpen={filterPanelOpen}
          onClose={() => setFilterPanelOpen(false)}
          onSearch={handleSearch}
          onExport={handleExport}
        />
      ) : selectedReport === 'Collection Details' ? (
        <CollectionDetailsFilter 
          isOpen={filterPanelOpen}
          onClose={() => setFilterPanelOpen(false)}
          onSearch={handleSearch}
          onExport={handleExport}
        />
      ) : selectedReport === 'Day Wise Collection' || selectedReport === 'Monthly Collection' ? (
        <CollectionReportFilter 
          isOpen={filterPanelOpen}
          onClose={() => setFilterPanelOpen(false)}
          onSearch={handleSearch}
          onExport={handleExport}
          selectedReport={selectedReport}
        />
      ) : selectedReport === 'Accountant Report' ? (
        <AccountantFilter 
          isOpen={filterPanelOpen}
          onClose={() => setFilterPanelOpen(false)}
          onSearch={handleSearch}
          onExport={handleExport}
        />
      ) : (
        <FilterPanel 
          isOpen={filterPanelOpen}
          onClose={() => setFilterPanelOpen(false)}
          reportName={selectedReport}
          onSearch={handleSearch}
        />
      )}

      <ConfirmDialog 
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />

      <ExportToExcelDialog 
        isOpen={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
      />

      <SearchResultsGrid
        isOpen={searchResultsOpen}
        onClose={() => setSearchResultsOpen(false)}
        searchQuery={searchQuery}
      />

      <AutoReportNotification
        isOpen={autoReportNotification.isOpen}
        onClose={() => setAutoReportNotification({ ...autoReportNotification, isOpen: false })}
        reportName={autoReportNotification.reportName}
        reportType={autoReportNotification.reportType}
        language={language}
      />

      <AnimatePresence>
        {reportResultsOpen && selectedReport && (
          selectedReport === 'Top Defaulter' ? (
            <TopDefaultersTable
              isOpen={reportResultsOpen}
              onClose={() => setReportResultsOpen(false)}
            />
          ) : selectedReport === 'Pending Reading List' ? (
            <PendingReadingTable
              isOpen={reportResultsOpen}
              onClose={() => setReportResultsOpen(false)}
            />
          ) : selectedReport === 'Closed Connection List' ? (
            <ClosedConnectionTable
              isOpen={reportResultsOpen}
              onClose={() => setReportResultsOpen(false)}
            />
          ) : (
            <ReportResultsTable
              reportName={selectedReport}
              onClose={() => setReportResultsOpen(false)}
              language={language}
            />
          )
        )}
      </AnimatePresence>

      <DownloadLogModal
        isOpen={downloadLogOpen}
        onClose={() => setDownloadLogOpen(false)}
      />

      <LastWorkSummaryPopup
        isOpen={lastWorkSummaryOpen}
        onClose={() => setLastWorkSummaryOpen(false)}
        language={language}
      />
    </div>
  );
}
