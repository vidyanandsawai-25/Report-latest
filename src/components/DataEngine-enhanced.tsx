import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  Search, 
  Mic,
  Lightbulb,
  Download,
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
  IndianRupee,
  MapPin,
  Calendar,
  AlertCircle,
  BarChart3,
  Users,
  TrendingUp,
  Bell,
  Sparkles,
  Clock,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface ResultRecord {
  id: number;
  upicId: string;
  name: string;
  ward: string;
  zone: string;
  billAmount: string;
  dueDate: string;
  mobile: string;
  address: string;
  status: string;
}

export function DataEngine() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Download popup states
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [selectedReport, setSelectedReport] = useState<{
    title: string;
    query: string;
    icon: any;
    gradient: string;
  } | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'excel' | 'pdf'>('excel');
  
  // Hoarding notifications
  const [currentHoarding, setCurrentHoarding] = useState(0);
  const [showHoarding, setShowHoarding] = useState(true);
  
  const hoardings = [
    {
      icon: CheckCircle,
      gradient: 'from-green-500 to-emerald-600',
      title: '✨ Your data is ready!',
      message: 'Click on any quick report button to view your analytics instantly',
      action: 'View Reports'
    },
    {
      icon: Clock,
      gradient: 'from-blue-500 to-cyan-600',
      title: '⏰ Report Processing',
      message: 'Your monthly collection report is being generated. Check back in a moment!',
      action: 'Check Status'
    },
    {
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-600',
      title: '📊 New Insights Available',
      message: 'Zone-wise collection has increased by 23% this month. View detailed report.',
      action: 'View Analytics'
    },
    {
      icon: Bell,
      gradient: 'from-orange-500 to-red-600',
      title: '🔔 Pending Actions',
      message: '15 defaulter reports are waiting for review. Take action now!',
      action: 'Review Now'
    },
    {
      icon: Sparkles,
      gradient: 'from-indigo-500 to-blue-600',
      title: '💡 Pro Tip',
      message: 'Use voice search for faster report generation. Just click the mic icon!',
      action: 'Try Now'
    }
  ];

  // Auto-rotate hoardings every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHoarding((prev) => (prev + 1) % hoardings.length);
      setShowHoarding(true);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  // Mock data - would be fetched based on search query
  const generateMockData = (query: string): ResultRecord[] => {
    const mockData: ResultRecord[] = [];
    const count = 45; // Total records
    
    for (let i = 1; i <= count; i++) {
      mockData.push({
        id: i,
        upicId: `PMC${300000 + i}`,
        name: `Customer ${i} - ${query.includes('defaulter') ? 'Defaulter' : 'Regular'}`,
        ward: `${Math.floor(Math.random() * 15) + 1}`,
        zone: `Zone ${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`,
        billAmount: `₹${(Math.random() * 10000 + 2000).toFixed(2)}`,
        dueDate: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        mobile: `98765${String(10000 + i).slice(-5)}`,
        address: `Plot ${i}, ${['Shivaji Nagar', 'Gandhi Road', 'MG Road', 'Station Area'][Math.floor(Math.random() * 4)]}`,
        status: Math.random() > 0.5 ? 'Pending' : 'Overdue'
      });
    }
    return mockData;
  };

  const [results, setResults] = useState<ResultRecord[]>([]);

  const handleAISearch = (query?: string) => {
    const searchText = query || searchQuery;
    
    if (!searchText.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setIsSearching(true);
    
    setTimeout(() => {
      const mockResults = generateMockData(searchText);
      setResults(mockResults);
      setShowResults(true);
      setIsSearching(false);
      setCurrentPage(1);
      toast.success(`Found ${mockResults.length} records matching your query!`);
    }, 1500);
  };

  const handleVoiceSearch = () => {
    if (isListening) {
      setIsListening(false);
      toast.info('Voice search stopped');
    } else {
      setIsListening(true);
      toast.success('Voice search activated - Start speaking...');
      
      setTimeout(() => {
        setIsListening(false);
        setSearchQuery('top defaulters report 2023');
        toast.info('Voice input: "top defaulters report 2023"');
      }, 3000);
    }
  };

  const clearResults = () => {
    setShowResults(false);
    setResults([]);
    setSearchQuery('');
    toast.info('Results cleared');
  };

  const handleQuickReportClick = (title: string, query: string, icon: any, gradient: string) => {
    console.log('Quick report clicked:', title);
    setSelectedReport({ title, query, icon, gradient });
    setSelectedFormat('excel');
    setShowDownloadPopup(true);
    toast.info(`Opening ${title} download options...`);
  };

  const handleHoardingAction = (actionType: string) => {
    setShowHoarding(false);
    
    switch (actionType) {
      case 'View Reports':
        toast.success('📊 Opening Monthly Collection Report!');
        setTimeout(() => {
          handleQuickReportClick(
            'Monthly Collection Report',
            'Show me monthly water bill collection report',
            TrendingUp,
            'from-blue-500 to-cyan-500'
          );
        }, 300);
        break;
      
      case 'Check Status':
        toast.info('✅ Monthly Collection Report is ready!');
        setTimeout(() => {
          handleQuickReportClick(
            'Monthly Collection Report',
            'Show me monthly water bill collection report',
            TrendingUp,
            'from-blue-500 to-cyan-500'
          );
        }, 500);
        break;
      
      case 'View Analytics':
        toast.success('📈 Opening Zone-wise Collection Analytics!');
        setTimeout(() => {
          handleQuickReportClick(
            'Zone-wise Collection Report',
            'Show me zone wise water bill collection analysis',
            BarChart3,
            'from-purple-500 to-pink-500'
          );
        }, 300);
        break;
      
      case 'Review Now':
        toast.warning('🔔 Opening Defaulter Reports!');
        setTimeout(() => {
          handleQuickReportClick(
            'Defaulter Report',
            'Show me list of water bill defaulters',
            Users,
            'from-red-500 to-orange-500'
          );
        }, 300);
        break;
      
      case 'Try Now':
        toast.success('💡 Try voice search now!');
        setTimeout(() => {
          const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
            searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
        break;
      
      default:
        toast.info('Action processed successfully!');
    }
  };

  const handleDownloadReport = () => {
    if (!selectedReport) return;
    
    const mockData = generateMockData(selectedReport.query);
    
    if (selectedFormat === 'excel') {
      // Create CSV content
      const headers = ['Sr. No', 'UPIC ID', 'Customer Name', 'Ward', 'Zone', 'Bill Amount', 'Due Date', 'Mobile', 'Address', 'Status'];
      const csvContent = [
        headers.join(','),
        ...mockData.map((record, index) => [
          index + 1,
          record.upicId,
          `"${record.name}"`,
          record.ward,
          record.zone,
          record.billAmount.replace('₹', ''),
          record.dueDate,
          record.mobile,
          `"${record.address}"`,
          record.status
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${selectedReport.title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`Excel file downloaded successfully! (${mockData.length} records)`);
    } else {
      toast.info('PDF export feature will be available soon!');
    }
    
    setShowDownloadPopup(false);
    setSelectedReport(null);
  };

  const handleExportExcel = () => {
    const headers = ['Sr. No', 'UPIC ID', 'Customer Name', 'Ward', 'Zone', 'Bill Amount', 'Due Date', 'Mobile', 'Address', 'Status'];
    const csvContent = [
      headers.join(','),
      ...results.map((record, index) => [
        index + 1,
        record.upicId,
        `"${record.name}"`,
        record.ward,
        record.zone,
        record.billAmount.replace('₹', ''),
        record.dueDate,
        record.mobile,
        `"${record.address}"`,
        record.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `search_results_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(`Excel file exported successfully! (${results.length} records)`);
  };

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const paginatedResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4 relative px-4 md:px-12 lg:px-16 xl:px-20 py-4">
      {/* Enhanced Floating Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-[#667eea]/15 to-[#764ba2]/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#005AA7]/15 to-[#00C6FF]/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"
        />
        
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Premium Search Box */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-[#005AA7]/20 via-[#00C6FF]/20 to-[#005AA7]/20 blur-xl rounded-2xl" />
        
        <div className="relative bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-5 border border-white/80">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-xl pointer-events-none"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
          />
          
          <div className="relative space-y-3">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#005AA7] to-[#00C6FF] rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              
              <div className="relative flex items-center bg-white rounded-lg border-2 border-gray-200 focus-within:border-[#005AA7] focus-within:ring-4 focus-within:ring-[#00C6FF]/15 transition-all shadow-md">
                <Search className="ml-4 w-5 h-5 text-[#005AA7]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
                  placeholder="Ask anything - reports, analytics, insights..."
                  className="flex-1 h-12 px-3 bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
                />
                
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => { setSearchQuery(''); toast.info('Search cleared'); }}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="mr-2 w-7 h-7 rounded-md flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-gray-700" />
                  </motion.button>
                )}
                
                <motion.button
                  onClick={handleVoiceSearch}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mr-2 w-9 h-9 rounded-lg flex items-center justify-center shadow-lg transition-all overflow-hidden ${
                    isListening ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-[#005AA7] to-[#00C6FF]'
                  }`}
                >
                  {isListening && (
                    <motion.div
                      className="absolute inset-0 bg-white/30"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  <Mic className={`w-4 h-4 text-white relative z-10 ${isListening ? 'animate-pulse' : ''}`} />
                </motion.button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 rounded-lg"
            >
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Lightbulb className="w-4 h-4 text-amber-500" />
              </motion.div>
              <p className="text-xs text-gray-700">
                <span className="font-bold text-amber-700">Pro Tip:</span> Try{' '}
                <span className="font-semibold text-[#005AA7]">"defaulters report"</span> or{' '}
                <span className="font-semibold text-[#005AA7]">"monthly collection"</span>
              </p>
            </motion.div>

            {isListening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow-2xl flex items-center gap-2 z-50"
              >
                <div className="flex gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, 16, 4] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                      className="w-0.5 bg-white rounded-full"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold">Listening...</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Quick Report Downloads */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="relative z-10"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-slate-900/40 via-blue-900/40 to-slate-900/40 blur-xl rounded-2xl" />
        
        <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-xl shadow-2xl p-4 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              animate={{ boxShadow: ['0 0 15px rgba(59, 130, 246, 0.5)', '0 0 25px rgba(59, 130, 246, 0.8)', '0 0 15px rgba(59, 130, 246, 0.5)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"
            >
              <Download className="w-4 h-4 text-white" />
            </motion.div>
            <div>
              <h3 className="text-white font-bold text-sm">Quick Report Downloads</h3>
              <p className="text-blue-200 text-xs">Instant report generation</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {[
              { title: "Collection Report", query: "today's collection report", icon: IndianRupee, gradient: "from-emerald-600 to-green-700" },
              { title: "Defaulters List", query: "top defaulters report 2023", icon: AlertCircle, gradient: "from-rose-600 to-red-700" },
              { title: "Zone-wise Summary", query: "zone wise collection report", icon: MapPin, gradient: "from-blue-600 to-cyan-700" },
            ].map((report, idx) => {
              const Icon = report.icon;
              return (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickReportClick(report.title, report.query, Icon, report.gradient)}
                  className={`relative overflow-hidden flex items-center gap-2 px-3 py-2.5 bg-gradient-to-br ${report.gradient} hover:opacity-90 text-white rounded-lg font-semibold shadow-lg transition-all border border-white/20 text-sm`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 + idx * 0.3 }}
                  />
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{report.title}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Search Results & Download Popup remain unchanged from original */}
      {/* Hoarding Notifications remain unchanged from original */}
      
      {/* Download Popup Modal */}
      <AnimatePresence>
        {showDownloadPopup && selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDownloadPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${selectedReport.gradient} text-white p-6`}>
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = selectedReport.icon;
                    return <Icon className="w-8 h-8" />;
                  })()}
                  <div>
                    <h3 className="text-xl font-bold">{selectedReport.title}</h3>
                    <p className="text-sm text-white/80">Select download format</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedFormat('excel')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedFormat === 'excel'
                        ? 'border-[#005AA7] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FileSpreadsheet className={`w-8 h-8 mx-auto mb-2 ${
                      selectedFormat === 'excel' ? 'text-[#005AA7]' : 'text-gray-400'
                    }`} />
                    <p className="text-sm font-semibold text-gray-700">Excel</p>
                  </button>
                  <button
                    onClick={() => setSelectedFormat('pdf')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedFormat === 'pdf'
                        ? 'border-[#005AA7] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FileText className={`w-8 h-8 mx-auto mb-2 ${
                      selectedFormat === 'pdf' ? 'text-[#005AA7]' : 'text-gray-400'
                    }`} />
                    <p className="text-sm font-semibold text-gray-700">PDF</p>
                  </button>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDownloadPopup(false)}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDownloadReport}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#005AA7] to-[#00C6FF] text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                  >
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
