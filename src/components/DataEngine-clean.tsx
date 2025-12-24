import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
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
  Users
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

  const handleAISearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setIsSearching(true);
    
    setTimeout(() => {
      const mockResults = generateMockData(searchQuery);
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

  const handleExportExcel = () => {
    toast.success('Exporting to Excel...');
    
    // Create CSV content
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

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      toast.success('Excel file downloaded successfully!');
    }, 500);
  };

  const handleExportPDF = () => {
    toast.success('Exporting to PDF...');
    
    // Create HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Report - ${searchQuery}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { background: linear-gradient(to right, #005AA7, #00C6FF); color: white; padding: 20px; margin-bottom: 20px; border-radius: 10px; }
          .header h1 { margin: 0; font-size: 24px; }
          .header p { margin: 5px 0 0 0; font-size: 14px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background: #f3f4f6; padding: 12px; text-align: left; border: 1px solid #ddd; font-size: 12px; }
          td { padding: 10px; border: 1px solid #ddd; font-size: 11px; }
          tr:nth-child(even) { background: #f9fafb; }
          .status { padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; }
          .status.pending { background: #fef3c7; color: #92400e; }
          .status.overdue { background: #fee2e2; color: #991b1b; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Maharashtra Water Billing - Search Report</h1>
          <p>Query: ${searchQuery}</p>
          <p>Total Records: ${results.length} | Generated: ${new Date().toLocaleString()}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>UPIC ID</th>
              <th>Customer Name</th>
              <th>Ward</th>
              <th>Zone</th>
              <th>Bill Amount</th>
              <th>Due Date</th>
              <th>Mobile</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${results.map((record, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${record.upicId}</td>
                <td>${record.name}</td>
                <td>Ward ${record.ward}</td>
                <td>${record.zone}</td>
                <td>${record.billAmount}</td>
                <td>${record.dueDate}</td>
                <td>${record.mobile}</td>
                <td><span class="status ${record.status.toLowerCase()}">${record.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `report_${new Date().toISOString().split('T')[0]}.html`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      toast.success('PDF file downloaded successfully!');
    }, 500);
  };

  const clearResults = () => {
    setShowResults(false);
    setResults([]);
    setSearchQuery('');
    toast.info('Results cleared');
  };

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const paginatedResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4 relative">
      {/* Floating Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Voice-Enabled Search Box */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-2xl shadow-lg p-4 md:p-5 border border-gray-200"
      >
        <div className="relative">
          {/* Search Input with Voice Button */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
              placeholder="Search any report by typing or use voice search..."
              className="w-full h-12 md:h-14 pl-12 pr-14 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 border-2 border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-blue-100 outline-none transition-all text-sm md:text-base shadow-sm"
            />
            
            {/* Voice Search Button */}
            <motion.button
              onClick={handleVoiceSearch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center shadow-md transition-all ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-[#007BFF] hover:bg-[#0056b3]'
              }`}
            >
              <Mic className={`w-4 h-4 text-white ${isListening ? 'animate-pulse' : ''}`} />
            </motion.button>

            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent rounded-xl pointer-events-none"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          </div>

          {/* Suggestion Text */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-2 mt-2 text-gray-500 text-xs"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p>
              <span className="font-medium">Try:</span> "top defaulters report 2023" or "collection report for October 2024"
            </p>
          </motion.div>

          {/* Voice Listening Indicator */}
          {isListening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute -top-14 left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 z-50"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-white rounded-full"
              />
              <span className="text-xs font-medium">Listening...</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Report Download Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Today's Collection Report */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-4 group hover:shadow-xl transition-all cursor-pointer"
          onClick={() => {
            setSearchQuery("today's collection report");
            handleAISearch();
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-3">
            <div className="bg-white/20 rounded-lg p-2.5">
              <IndianRupee className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Today's Collection Report</p>
              <p className="text-green-100 text-xs mt-0.5">Download payment summary</p>
            </div>
            <Download className="w-5 h-5 text-white/80" />
          </div>
        </motion.div>

        {/* Defaulters List Report */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-4 group hover:shadow-xl transition-all cursor-pointer"
          onClick={() => {
            setSearchQuery("top defaulters report 2023");
            handleAISearch();
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-3">
            <div className="bg-white/20 rounded-lg p-2.5">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Defaulters List</p>
              <p className="text-red-100 text-xs mt-0.5">Download pending payments</p>
            </div>
            <Download className="w-5 h-5 text-white/80" />
          </div>
        </motion.div>

        {/* Zone-wise Report */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-4 group hover:shadow-xl transition-all cursor-pointer"
          onClick={() => {
            setSearchQuery("zone wise collection report");
            handleAISearch();
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-3">
            <div className="bg-white/20 rounded-lg p-2.5">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Zone-wise Summary</p>
              <p className="text-blue-100 text-xs mt-0.5">Download zone reports</p>
            </div>
            <Download className="w-5 h-5 text-white/80" />
          </div>
        </motion.div>

        {/* Monthly Collection Report */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-4 group hover:shadow-xl transition-all cursor-pointer"
          onClick={() => {
            setSearchQuery("monthly collection report");
            handleAISearch();
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-3">
            <div className="bg-white/20 rounded-lg p-2.5">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Monthly Collection</p>
              <p className="text-purple-100 text-xs mt-0.5">Download monthly data</p>
            </div>
            <Download className="w-5 h-5 text-white/80" />
          </div>
        </motion.div>

        {/* Ward-wise Report */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-4 group hover:shadow-xl transition-all cursor-pointer"
          onClick={() => {
            setSearchQuery("ward wise report");
            handleAISearch();
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-3">
            <div className="bg-white/20 rounded-lg p-2.5">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Ward-wise Analysis</p>
              <p className="text-orange-100 text-xs mt-0.5">Download ward data</p>
            </div>
            <Download className="w-5 h-5 text-white/80" />
          </div>
        </motion.div>

        {/* Customer List Report */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg p-4 group hover:shadow-xl transition-all cursor-pointer"
          onClick={() => {
            setSearchQuery("customer list report");
            handleAISearch();
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-3">
            <div className="bg-white/20 rounded-lg p-2.5">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Customer Database</p>
              <p className="text-cyan-100 text-xs mt-0.5">Download customer list</p>
            </div>
            <Download className="w-5 h-5 text-white/80" />
          </div>
        </motion.div>
      </div>

      {/* Search Results Table */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden"
          >
            {/* Results Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-0 px-[24px] md:px-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl md:text-2xl text-white mb-1">Search Results</h2>
                  <p className="text-blue-100 text-sm">Query: "{searchQuery}"</p>
                  <p className="text-blue-100 text-xs mt-1">Found {results.length} records</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleExportExcel}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 h-10 text-sm shadow-md"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Excel
                  </Button>
                  <Button
                    onClick={handleExportPDF}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 h-10 text-sm shadow-md"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                  <Button
                    onClick={clearResults}
                    variant="outline"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/40 px-4 h-10 text-sm"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>
            </div>

            {/* Table - Desktop */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sr. No</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">UPIC ID</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer Name</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ward</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Zone</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bill Amount</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Due Date</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedResults.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-4 py-2 text-sm text-gray-900">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td className="px-4 py-2 text-sm">
                        <span className="text-blue-600 font-medium">{record.upicId}</span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">{record.name}</td>
                      <td className="px-4 py-2 text-sm">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {record.ward}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          {record.zone}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <span className="text-green-600 font-semibold">{record.billAmount}</span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">{record.dueDate}</td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          record.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden p-4 space-y-3">
              {paginatedResults.map((record, index) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">#{(currentPage - 1) * itemsPerPage + index + 1}</p>
                      <p className="text-blue-600 font-semibold text-sm">{record.upicId}</p>
                      <p className="text-gray-900 font-medium mt-1">{record.name}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      record.status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {record.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-gray-500">Ward</p>
                      <p className="text-blue-700 font-medium">Ward {record.ward}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Zone</p>
                      <p className="text-purple-700 font-medium">{record.zone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Bill Amount</p>
                      <p className="text-green-600 font-semibold">{record.billAmount}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Due Date</p>
                      <p className="text-gray-700 font-medium">{record.dueDate}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="bg-gray-50 border-t-2 border-gray-200 p-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <p className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, results.length)} of {results.length} records
                </p>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="h-9"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          size="sm"
                          variant={pageNum === currentPage ? 'default' : 'outline'}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-9 h-9 ${pageNum === currentPage ? 'bg-[#007BFF] text-white' : ''}`}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="h-9"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
                />
                <p className="text-gray-900 font-semibold">Searching...</p>
                <p className="text-gray-500 text-sm">Analyzing your query with AI</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
