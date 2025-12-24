import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Download, Eye, Calendar, MapPin, User, TrendingUp, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface SearchResultsGridProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
}

export function SearchResultsGrid({ isOpen, onClose, searchQuery }: SearchResultsGridProps) {
  const [selectedReportForView, setSelectedReportForView] = useState<any>(null);
  const [exportingReportId, setExportingReportId] = useState<number | null>(null);
  const [exportingAll, setExportingAll] = useState(false);

  // Dummy data for demonstration
  const dummyData = [
    {
      id: 1,
      reportName: 'Daily Collection Report',
      date: '11 Nov 2024',
      zone: 'Zone A - Central',
      ward: 'Ward 1',
      totalAmount: '₹2,45,850',
      consumers: 142,
      status: 'Completed',
      statusColor: 'bg-green-500'
    },
    {
      id: 2,
      reportName: 'Revenue Summary',
      date: '11 Nov 2024',
      zone: 'Zone B - East',
      ward: 'Ward 3',
      totalAmount: '₹3,12,450',
      consumers: 198,
      status: 'Completed',
      statusColor: 'bg-green-500'
    },
    {
      id: 3,
      reportName: 'Payment Mode Analysis',
      date: '10 Nov 2024',
      zone: 'Zone A - Central',
      ward: 'Ward 2',
      totalAmount: '₹1,89,250',
      consumers: 87,
      status: 'Completed',
      statusColor: 'bg-green-500'
    },
    {
      id: 4,
      reportName: 'Reading Summary Report',
      date: '10 Nov 2024',
      zone: 'Zone C - West',
      ward: 'Ward 5',
      totalAmount: '₹2,67,890',
      consumers: 156,
      status: 'Completed',
      statusColor: 'bg-green-500'
    },
    {
      id: 5,
      reportName: 'Connection Seal Report',
      date: '09 Nov 2024',
      zone: 'Zone D - North',
      ward: 'Ward 4',
      totalAmount: '₹1,45,670',
      consumers: 73,
      status: 'Pending',
      statusColor: 'bg-yellow-500'
    },
    {
      id: 6,
      reportName: 'Mutation Report',
      date: '09 Nov 2024',
      zone: 'Zone E - South',
      ward: 'Ward 7',
      totalAmount: '₹98,450',
      consumers: 42,
      status: 'Completed',
      statusColor: 'bg-green-500'
    },
    {
      id: 7,
      reportName: 'Alteration Report',
      date: '08 Nov 2024',
      zone: 'Zone B - East',
      ward: 'Ward 6',
      totalAmount: '₹1,23,890',
      consumers: 61,
      status: 'Completed',
      statusColor: 'bg-green-500'
    },
    {
      id: 8,
      reportName: 'Accountant Report',
      date: '08 Nov 2024',
      zone: 'Zone A - Central',
      ward: 'Ward 1',
      totalAmount: '₹4,56,780',
      consumers: 234,
      status: 'Completed',
      statusColor: 'bg-green-500'
    }
  ];

  const handleView = (report: any) => {
    setSelectedReportForView(report);
  };

  const handleExport = (reportId: number) => {
    setExportingReportId(reportId);
    // Simulate export
    setTimeout(() => {
      setExportingReportId(null);
      toast.success('Report exported successfully!');
    }, 1500);
  };

  const handleExportAll = () => {
    setExportingAll(true);
    // Simulate export all
    setTimeout(() => {
      setExportingAll(false);
      toast.success('All reports exported successfully!');
    }, 2000);
  };

  const handleCopy = async (report: any) => {
    // Try to copy report data to clipboard with fallback
    const textToCopy = `${report.reportName} - ${report.date}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success('Report details copied to clipboard!');
    } catch (error) {
      // Fallback: Create a temporary textarea element
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        document.execCommand('copy');
        toast.success('Report details copied to clipboard!');
      } catch (err) {
        // If all methods fail, just show the text in a toast
        toast.info(`Report: ${report.reportName} - ${report.date}`);
      }
      
      document.body.removeChild(textarea);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-black/60 via-blue-900/30 to-black/60 backdrop-blur-md z-40"
            onClick={onClose}
          >
            {/* Animated particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
                animate={{
                  x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                  y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </motion.div>

          {/* Full Screen Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-7xl h-[90vh] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border-4 border-blue-200/30"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#005AA7] to-[#00C6FF] p-6 pb-5 relative overflow-hidden">
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-blue-400/20"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  >
                    <FileText className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white text-xl">
                      Search Results
                    </h3>
                    <p className="text-white/90 text-sm mt-0.5">
                      {searchQuery ? `Found ${dummyData.length} reports matching "${searchQuery}"` : `Showing ${dummyData.length} recent reports`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Export All Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleExportAll}
                    disabled={exportingAll}
                    className="px-5 py-2.5 bg-white/95 backdrop-blur-sm hover:bg-white rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4 text-[#005AA7]" />
                    <span className="text-[#005AA7] font-medium text-sm">
                      {exportingAll ? 'Exporting...' : 'Export All'}
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center cursor-pointer transition-all"
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Content - Scrollable Grid */}
            <div className="p-6 overflow-y-auto h-[calc(90vh-140px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {dummyData.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl border-2 border-blue-100 p-4 shadow-md hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
                  >
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />

                    <div className="relative z-10">
                      {/* Status Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`${report.statusColor} text-white px-2.5 py-1 rounded-lg text-xs flex items-center gap-1`}>
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                          {report.status}
                        </span>
                        <Calendar className="w-4 h-4 text-gray-400" />
                      </div>

                      {/* Report Name */}
                      <h4 className="text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                        {report.reportName}
                      </h4>

                      {/* Date */}
                      <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {report.date}
                      </p>

                      {/* Zone and Ward */}
                      <div className="space-y-1.5 mb-3">
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-blue-500" />
                          {report.zone}
                        </p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-purple-500" />
                          {report.ward}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 mb-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-gray-600">Total Amount</span>
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        </div>
                        <p className="text-blue-600">{report.totalAmount}</p>
                        
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-100">
                          <span className="text-xs text-gray-600 flex items-center gap-1">
                            <User className="w-3 h-3" />
                            Consumers
                          </span>
                          <span className="text-sm text-gray-900">{report.consumers}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs h-8"
                          onClick={() => handleView(report)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-300 text-blue-600 hover:bg-blue-50 text-xs h-8"
                          onClick={() => handleExport(report.id)}
                          disabled={exportingReportId === report.id}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          {exportingReportId === report.id ? 'Exporting...' : 'Export'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="col-span-2 border-blue-300 text-blue-600 hover:bg-blue-50 text-xs h-8"
                          onClick={() => handleCopy(report)}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Report Details View Modal */}
          <AnimatePresence>
            {selectedReportForView && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
                  onClick={() => setSelectedReportForView(null)}
                />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 30 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl bg-white rounded-3xl shadow-2xl z-[70] overflow-hidden"
                >
                  {/* Modal Header */}
                  <div className="bg-gradient-to-r from-[#005AA7] to-[#00C6FF] p-6 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-blue-400/10"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white text-lg">
                            Report Details
                          </h3>
                          <p className="text-white/80 text-xs mt-0.5">
                            Complete information
                          </p>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedReportForView(null)}
                        className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center cursor-pointer transition-all"
                      >
                        <X className="w-5 h-5 text-white" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {/* Report Title */}
                    <div className="mb-6">
                      <h2 className="text-2xl text-gray-900 mb-2">
                        {selectedReportForView.reportName}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className={`${selectedReportForView.statusColor} text-white px-3 py-1 rounded-lg text-xs flex items-center gap-1.5`}>
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                          {selectedReportForView.status}
                        </span>
                        <span className="text-gray-500 text-sm flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {selectedReportForView.date}
                        </span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {/* Zone */}
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span className="text-xs text-gray-600">Zone</span>
                        </div>
                        <p className="text-gray-900">
                          {selectedReportForView.zone}
                        </p>
                      </div>

                      {/* Ward */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-purple-600" />
                          <span className="text-xs text-gray-600">Ward</span>
                        </div>
                        <p className="text-gray-900">
                          {selectedReportForView.ward}
                        </p>
                      </div>

                      {/* Total Amount */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-gray-600">Total Amount</span>
                        </div>
                        <p className="text-green-600 text-xl">
                          {selectedReportForView.totalAmount}
                        </p>
                      </div>

                      {/* Consumers */}
                      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-orange-600" />
                          <span className="text-xs text-gray-600">Total Consumers</span>
                        </div>
                        <p className="text-orange-600 text-xl">
                          {selectedReportForView.consumers}
                        </p>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-5 mb-6">
                      <h4 className="text-gray-900 mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        Report Summary
                      </h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p>• This report contains detailed water billing information</p>
                        <p>• Generated on {selectedReportForView.date}</p>
                        <p>• Coverage: {selectedReportForView.zone}, {selectedReportForView.ward}</p>
                        <p>• Total consumers processed: {selectedReportForView.consumers}</p>
                        <p>• Status: {selectedReportForView.status}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-11"
                        onClick={() => {
                          handleExport(selectedReportForView.id);
                          setSelectedReportForView(null);
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Report
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-2 border-blue-300 text-blue-600 hover:bg-blue-50 h-11"
                        onClick={() => setSelectedReportForView(null)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}