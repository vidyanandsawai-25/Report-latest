import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Calendar, FileText, User, Clock, Search, FileSpreadsheet, Filter, TrendingUp, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { formatDate, formatDateForFileName } from '@/src/lib/utils/format';

interface DownloadLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DownloadRecord {
  id: number;
  userName: string;
  reportName: string;
  downloadDate: string;
  downloadTime: string;
  reportType: string;
  fileFormat: string;
  fileSize: string;
  ward: string;
  zone: string;
}

export function DownloadLogModal({ isOpen, onClose }: DownloadLogModalProps) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedReport, setSelectedReport] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchResults, setSearchResults] = useState<DownloadRecord[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Generate years from 2015 to current year
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => (currentYear - i).toString());

  // Available reports from Report Engine
  const availableReports = [
    'All Reports',
    'Defaulter Report',
    'Collection Report',
    'Reading Summary Report',
    'Connection Seal Report',
    'Payment Mode Report',
    'Revenue Summary',
    'Accountant Report',
    'Mutation Report',
    'Alteration Report',
    'Consumer Report',
    'Advance Payment',
    'Zero Bill Report',
    'Consumer Category',
    'Statutory Report',
    'CRM Report'
  ];

  // List of users for the dropdown
  const users = [
    'All Users',
    'Rajesh Kumar',
    'Priya Sharma',
    'Amit Patel',
    'Sneha Deshmukh',
    'Vijay Mehta',
    'Anita Gupta',
    'Rahul Joshi',
    'Kavita Singh',
    'Suresh Reddy',
    'Pooja Kulkarni',
    'Manoj Rao',
    'Deepa Iyer',
    'Nitin Patil',
    'Sonal Shah',
    'Kiran Naik',
    'Arvind Jain'
  ];

  // Generate mock download log data
  const generateDownloadLogs = (): DownloadRecord[] => {
    const mockData: DownloadRecord[] = [];
    const usersList = users.filter(u => u !== 'All Users');
    
    const formats = ['Excel', 'PDF', 'CSV'];
    const fileSizes = ['245 KB', '512 KB', '1.2 MB', '856 KB', '3.4 MB', '678 KB', '2.1 MB', '445 KB'];
    
    const reportsList = selectedReport === 'all' 
      ? availableReports.filter(r => r !== 'All Reports')
      : [selectedReport];

    // Filter users based on selection
    const selectedUsersList = selectedUser === 'all' ? usersList : [selectedUser];
    
    // Determine date range for data generation
    let startDate: Date;
    let endDate: Date;
    
    if (selectedDate) {
      // Use custom date range
      startDate = new Date(selectedDate);
      endDate = new Date(selectedDate);
    } else {
      // No date range specified, use entire year
      startDate = new Date(`${selectedYear}-01-01`);
      endDate = new Date(`${selectedYear}-12-31`);
    }
    
    const count = selectedReport === 'all' && selectedUser === 'all' ? 65 : 30;
    
    for (let i = 1; i <= count; i++) {
      // Generate random date within the specified range
      const dateRange = endDate.getTime() - startDate.getTime();
      const randomTime = Math.floor(Math.random() * dateRange);
      const randomDate = new Date(startDate.getTime() + randomTime);
      
      const day = randomDate.getDate();
      const month = randomDate.getMonth() + 1;
      const year = randomDate.getFullYear();
      
      const hour = Math.floor(Math.random() * 12) + 1;
      const minute = Math.floor(Math.random() * 60);
      const ampm = Math.random() > 0.5 ? 'AM' : 'PM';
      
      mockData.push({
        id: i,
        userName: selectedUsersList[Math.floor(Math.random() * selectedUsersList.length)],
        reportName: reportsList[Math.floor(Math.random() * reportsList.length)],
        downloadDate: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`,
        downloadTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${ampm}`,
        reportType: 'Report Engine',
        fileFormat: formats[Math.floor(Math.random() * formats.length)],
        fileSize: fileSizes[Math.floor(Math.random() * fileSizes.length)],
        ward: 'Ward ' + (Math.floor(Math.random() * 10) + 1),
        zone: 'Zone ' + (Math.floor(Math.random() * 5) + 1)
      });
    }
    
    // Sort by date (most recent first)
    return mockData.sort((a, b) => {
      const dateA = new Date(a.downloadDate.split('/').reverse().join('-'));
      const dateB = new Date(b.downloadDate.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });
  };

  const handleSearch = () => {
    if (!selectedYear) {
      toast.error('Please select a year');
      return;
    }
    
    // Validate date range
    if (selectedDate) {
      const date = new Date(selectedDate);
      
      if (date.getFullYear() !== parseInt(selectedYear)) {
        toast.error('Selected date does not match the selected year');
        return;
      }
    }
    
    const logs = generateDownloadLogs();
    setSearchResults(logs);
    setShowResults(true);
    setCurrentPage(1);
    
    const userMsg = selectedUser !== 'all' ? ` by ${selectedUser}` : '';
    const reportMsg = selectedReport !== 'all' ? ` for ${selectedReport}` : '';
    
    let dateMsg = '';
    if (selectedDate) {
      const date = formatDate(new Date(selectedDate));
      dateMsg = ` on ${date}`;
    } else {
      dateMsg = ` in ${selectedYear}`;
    }
    
    toast.success(`Found ${logs.length} download records${reportMsg}${userMsg}${dateMsg}`);
  };

  const handleExport = () => {
    if (searchResults.length === 0) {
      toast.error('No data to export. Please search first.');
      return;
    }

    const headers = ['Sr. No', 'User Name', 'Report Name', 'Download Date', 'Download Time', 'Report Type', 'File Format', 'File Size', 'Ward', 'Zone'];
    const csvContent = [
      headers.join(','),
      ...searchResults.map((record, index) => [
        index + 1,
        `"${record.userName}"`,
        `"${record.reportName}"`,
        record.downloadDate,
        record.downloadTime,
        record.reportType,
        record.fileFormat,
        record.fileSize,
        record.ward,
        record.zone
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `download_log_${selectedYear}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(`Download log exported successfully! (${searchResults.length} records)`);
  };

  const handleRedownload = (record: DownloadRecord) => {
    const formatExtension = record.fileFormat.toLowerCase();
    const fileName = `${record.reportName.replace(/\s+/g, '_')}_${record.downloadDate.replace(/\//g, '-')}.${formatExtension}`;
    
    toast.loading(`Preparing ${record.fileFormat} file...`, { id: 'redownload' });
    
    setTimeout(() => {
      toast.success(`✅ Downloaded: ${fileName}`, { id: 'redownload' });
      
      // Show additional info in a second toast
      setTimeout(() => {
        toast.info(`📊 ${record.reportName} | ${record.fileFormat} | ${record.fileSize}`, {
          duration: 3000
        });
      }, 500);
    }, 1500);
  };

  // Calculate statistics
  const stats = {
    total: searchResults.length,
    excel: searchResults.filter(r => r.fileFormat === 'Excel').length,
    pdf: searchResults.filter(r => r.fileFormat === 'PDF').length,
    csv: searchResults.filter(r => r.fileFormat === 'CSV').length,
    uniqueUsers: new Set(searchResults.map(r => r.userName)).size,
  };

  // Pagination
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of table
    const tableContainer = document.getElementById('download-log-table');
    if (tableContainer) {
      tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReset = () => {
    setSelectedYear(currentYear.toString());
    setSelectedReport('all');
    setSelectedUser('all');
    setSelectedDate('');
    setSearchResults([]);
    setShowResults(false);
    setCurrentPage(1);
    toast.info('Filters reset successfully');
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
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[95vw] md:max-w-7xl md:h-[92vh] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#005AA7] via-[#0077B6] to-[#00C6FF] px-6 md:px-8 py-6 flex items-center justify-between relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl" />
              </div>
              
              <div className="flex items-center gap-4 relative z-10">
                <motion.div 
                  className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border-2 border-white/30"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Download className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl md:text-3xl text-white">Download Audit Log</h2>
                  <p className="text-white/90 text-sm md:text-base mt-1 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Comprehensive report download tracking & analytics
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all relative z-10 backdrop-blur-sm border border-white/30 cursor-pointer"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Filter Section */}
            <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 px-6 md:px-8 py-4 border-b-2 border-blue-200/50">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {/* Year Dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1.5 text-blue-600" />
                    Financial Year
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium transition-all hover:border-blue-400 py-[7px] py-[10px] px-[24px] px-[16px]"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>FY {year}-{(parseInt(year) + 1).toString().slice(-2)}</option>
                    ))}
                  </select>
                </div>

                {/* Report Dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-1.5 text-purple-600" />
                    Report Type
                  </label>
                  <select
                    value={selectedReport}
                    onChange={(e) => setSelectedReport(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 font-medium transition-all hover:border-purple-400"
                  >
                    {availableReports.map((report) => (
                      <option key={report} value={report === 'All Reports' ? 'all' : report}>
                        {report}
                      </option>
                    ))}
                  </select>
                </div>

                {/* User Dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1.5 text-blue-600" />
                    User
                  </label>
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium transition-all hover:border-blue-400"
                  >
                    {users.map((user) => (
                      <option key={user} value={user === 'All Users' ? 'all' : user}>
                        {user}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Range Dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1.5 text-green-600" />
                    Date Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      placeholder="From"
                      className="w-full px-4 py-2.5 border-2 border-green-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 font-medium transition-all hover:border-green-400"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-0.5">
                    Actions
                  </label>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSearch}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2.5 h-auto rounded-xl shadow-lg font-semibold"
                    >
                      <Search className="w-4 h-4 mr-1.5" />
                      Search
                    </Button>
                    <Button
                      onClick={handleReset}
                      className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold"
                      title="Reset Filters"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="flex-1 overflow-y-auto">
              {showResults ? (
                <div className="p-4 md:p-5">{/* Results Header with Export */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl text-gray-900 font-bold flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        Download Records
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Showing <span className="font-semibold text-gray-700">{((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, searchResults.length)}</span> of <span className="font-semibold text-gray-700">{searchResults.length}</span> records
                      </p>
                    </div>
                    <Button
                      onClick={handleExport}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-5 py-2 shadow-lg font-semibold text-sm"
                    >
                      <FileSpreadsheet className="w-4 h-4 mr-2" />
                      Export to Excel
                    </Button>
                  </div>

                  {/* Table */}
                  <div id="download-log-table" className="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-lg">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-[#005AA7] to-[#00C6FF] text-white">
                        <tr>
                          <th className="px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wider">Sr. No</th>
                          <th className="px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wider">User Name</th>
                          <th className="px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wider">Report Name</th>
                          <th className="px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wider">Download Date</th>
                          <th className="px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wider">Download Time</th>
                          <th className="px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wider">File Format</th>
                          <th className="px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wider">File Size</th>
                          <th className="px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wider">Ward</th>
                          <th className="px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wider">Zone</th>
                          <th className="px-3 py-2.5 text-center text-xs font-bold uppercase tracking-wider">Download Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedResults.map((record, index) => (
                          <motion.tr
                            key={record.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="hover:bg-blue-50 transition-colors"
                          >
                            <td className="px-3 py-2.5 text-xs font-semibold text-gray-900">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td className="px-3 py-2.5 text-xs">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold shadow-md">
                                  {record.userName.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="text-gray-900 font-medium">{record.userName}</span>
                              </div>
                            </td>
                            <td className="px-3 py-2.5 text-xs">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-orange-500" />
                                <span className="text-gray-900 font-semibold">{record.reportName}</span>
                              </div>
                            </td>
                            <td className="px-3 py-2.5 text-xs">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                                <span className="text-gray-700 font-medium">{record.downloadDate}</span>
                              </div>
                            </td>
                            <td className="px-3 py-2.5 text-xs">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-purple-500" />
                                <span className="text-gray-700 font-medium">{record.downloadTime}</span>
                              </div>
                            </td>
                            <td className="px-3 py-2.5 text-xs">
                              <span className={`px-2 py-1 rounded-lg text-xs font-bold shadow-sm ${
                                record.fileFormat === 'Excel' 
                                  ? 'bg-green-100 text-green-700 border border-green-300'
                                  : record.fileFormat === 'PDF'
                                  ? 'bg-red-100 text-red-700 border border-red-300'
                                  : 'bg-blue-100 text-blue-700 border border-blue-300'
                              }`}>
                                {record.fileFormat}
                              </span>
                            </td>
                            <td className="px-3 py-2.5 text-xs text-gray-700 font-medium">
                              {record.fileSize}
                            </td>
                            <td className="px-3 py-2.5 text-xs">
                              <span className="px-2 py-1 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 border border-indigo-300 shadow-sm">
                                {record.ward}
                              </span>
                            </td>
                            <td className="px-3 py-2.5 text-xs">
                              <span className="px-2 py-1 rounded-lg text-xs font-bold bg-teal-100 text-teal-700 border border-teal-300 shadow-sm">
                                {record.zone}
                              </span>
                            </td>
                            <td className="px-3 py-2.5 text-center">
                              <Button
                                onClick={() => handleRedownload(record)}
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-3 py-1.5 rounded-lg shadow-lg font-semibold text-xs"
                              >
                                <Download className="w-3.5 h-3.5 mr-1" />
                                Redownload
                              </Button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
                      <p className="text-sm text-gray-600">
                        Page <span className="font-semibold text-gray-900">{currentPage}</span> of <span className="font-semibold text-gray-900">{totalPages}</span>
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold"
                        >
                          Previous
                        </Button>
                        
                        <div className="flex gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                                onClick={() => handlePageChange(pageNum)}
                                className={`px-4 py-2.5 min-w-[44px] rounded-xl font-semibold ${
                                  currentPage === pageNum
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                }`}
                              >
                                {pageNum}
                              </Button>
                            );
                          })}
                        </div>

                        <Button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-20">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl"
                  >
                    <Search className="w-16 h-16 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Results Yet</h3>
                  <p className="text-gray-500 text-center max-w-md leading-relaxed">
                    Select filters from above and click <span className="font-semibold text-blue-600">"Search"</span> to view comprehensive download records and analytics
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}