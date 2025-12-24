import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  IndianRupee, 
  AlertCircle, 
  MapPin, 
  Calendar, 
  BarChart3, 
  Users,
  ChevronDown,
  FileSpreadsheet,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { GoshwaraFilterModal } from './GoshwaraFilterModal';

interface QuickReportsProps {
  language: 'en' | 'mr';
}

export function QuickReports({ language }: QuickReportsProps) {
  const [isQuickReportsExpanded, setIsQuickReportsExpanded] = useState(true);
  const [goshwaraModalOpen, setGoshwaraModalOpen] = useState(false);

  const handleQuickReportClick = (
    reportName: string,
    searchQuery: string,
    Icon: any,
    gradient: string
  ) => {
    // Special handling for Goshwara report
    if (reportName === 'Goshwara') {
      setGoshwaraModalOpen(true);
      return;
    }

    toast.loading(`Generating ${reportName}...`, { id: 'quick-report' });
    
    setTimeout(() => {
      toast.success(`✅ ${reportName} generated successfully!`, { id: 'quick-report' });
      setTimeout(() => {
        toast.info(`📥 Downloading ${reportName}...`, { duration: 2000 });
      }, 500);
    }, 2000);
  };

  const handleGoshwaraDownload = (financialYear: string, subType: string) => {
    toast.loading(`Generating Goshwara Report...`, { id: 'goshwara-report' });
    
    setTimeout(() => {
      toast.success(`✅ Goshwara Report (${financialYear} - ${subType}) generated successfully!`, { id: 'goshwara-report' });
      setTimeout(() => {
        toast.info(`📥 Downloading Goshwara Report...`, { duration: 2000 });
      }, 500);
    }, 2000);
  };

  const quickReports = [
    {
      name: 'Collection Report',
      query: "today's collection report",
      icon: IndianRupee,
      gradient: 'from-blue-500 to-blue-600',
      hoverGradient: 'from-blue-600 to-blue-700',
      border: 'border-blue-400/50'
    },
    {
      name: 'Defaulters List',
      query: 'top defaulters report 2023',
      icon: AlertCircle,
      gradient: 'from-indigo-500 to-indigo-600',
      hoverGradient: 'from-indigo-600 to-indigo-700',
      border: 'border-indigo-400/50'
    },
    {
      name: 'Zone-wise Summary',
      query: 'zone wise collection report',
      icon: MapPin,
      gradient: 'from-cyan-500 to-cyan-600',
      hoverGradient: 'from-cyan-600 to-cyan-700',
      border: 'border-cyan-400/50'
    },
    {
      name: 'Monthly Collection',
      query: 'monthly collection report',
      icon: Calendar,
      gradient: 'from-purple-500 to-purple-600',
      hoverGradient: 'from-purple-600 to-purple-700',
      border: 'border-purple-400/50'
    },
    {
      name: 'Ward-wise Analysis',
      query: 'ward wise report',
      icon: BarChart3,
      gradient: 'from-teal-500 to-teal-600',
      hoverGradient: 'from-teal-600 to-teal-700',
      border: 'border-teal-400/50'
    },
    {
      name: 'Goshwara',
      query: 'customer list report',
      icon: Users,
      gradient: 'from-sky-500 to-sky-600',
      hoverGradient: 'from-sky-600 to-sky-700',
      border: 'border-sky-400/50'
    }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-[#005AA7] via-[#0077B6] to-[#00C6FF] opacity-20 blur-2xl rounded-3xl" />
        
        
      </motion.div>

      {/* Statistics Cards */}
      

      {/* Quick Reports Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-slate-900/20 via-blue-900/20 to-slate-900/20 blur-xl rounded-3xl" />
        
        <div className="relative bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden">
          {/* Header - Collapsible */}
          <button
            onClick={() => setIsQuickReportsExpanded(!isQuickReportsExpanded)}
            className="w-full flex items-center justify-between p-6 hover:bg-blue-50/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <FileSpreadsheet className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-900 font-bold text-lg">Available Reports</h3>
                <p className="text-gray-500 text-sm">
                  {isQuickReportsExpanded ? `${quickReports.length} reports ready to download` : 'Click to expand and see all reports'}
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isQuickReportsExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-6 h-6 text-gray-600" />
            </motion.div>
          </button>

          {/* Reports Grid - Collapsible */}
          <AnimatePresence>
            {isQuickReportsExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quickReports.map((report, index) => {
                      const Icon = report.icon;
                      return (
                        <motion.button
                          key={report.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleQuickReportClick(report.name, report.query, Icon, report.gradient)}
                          className={`relative group overflow-hidden flex items-center gap-3 px-5 py-4 bg-gradient-to-br ${report.gradient} hover:${report.hoverGradient} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer border ${report.border}`}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 + index * 0.2 }}
                          />
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <Icon className="w-5 h-5 relative z-10" />
                          <span className="relative z-10 text-left">{report.name}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-amber-50 to-yellow-50 p-5 rounded-xl border-2 border-amber-200"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-400 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold mb-1">About Quick Reports</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              Quick Reports provide instant access to the most frequently used reports in the Maharashtra Water Billing System. 
              Click any report button to generate and download the latest data in Excel format. All reports are generated with 
              real-time data and include comprehensive analytics.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Goshwara Filter Modal */}
      <GoshwaraFilterModal
        isOpen={goshwaraModalOpen}
        onClose={() => setGoshwaraModalOpen(false)}
        onDownload={handleGoshwaraDownload}
      />
    </div>
  );
}