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
  ChevronDown,
  ChevronUp,
  X,
  IndianRupee,
  MapPin,
  Calendar,
  AlertCircle,
  BarChart3,
  Users,
  TrendingUp
} from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { DailyReportReminder } from './DailyReportReminder';
import { formatDate, formatDateTime, formatDateForFileName } from '@/src/lib/utils/format';

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
  const [showStatusColumn, setShowStatusColumn] = useState(true);
  const [isQuickReportsExpanded, setIsQuickReportsExpanded] = useState(false);
  const [financialYearInfo, setFinancialYearInfo] = useState<string | null>(null);
  
  // Download popup states
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [selectedReport, setSelectedReport] = useState<{
    title: string;
    query: string;
    icon: any;
    gradient: string;
  } | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'excel' | 'pdf'>('excel');

  // Mock data - intelligently generated based on search query
  const generateMockData = (query: string): ResultRecord[] => {
    const mockData: ResultRecord[] = [];
    const lowerQuery = query.toLowerCase();
    
    // Parse query for specific filters
    const isDefaulter = lowerQuery.includes('defaulter') || lowerQuery.includes('overdue') || lowerQuery.includes('pending payment');
    const isPaid = lowerQuery.includes('paid') || lowerQuery.includes('completed') || lowerQuery.includes('cleared');
    const isCollection = lowerQuery.includes('collection');
    const isHighValue = lowerQuery.includes('high value') || lowerQuery.includes('high amount');
    const isLowValue = lowerQuery.includes('low value') || lowerQuery.includes('low amount');
    
    // Extract zone from query (Zone A, Zone B, etc.)
    const zoneMatch = lowerQuery.match(/zone\s*([a-d])/i);
    const specificZone = zoneMatch ? zoneMatch[1].toUpperCase() : null;
    
    // Extract ward from query (Ward 1, Ward 2, etc.)
    const wardMatch = lowerQuery.match(/ward\s*(\d+)/i);
    const specificWard = wardMatch ? wardMatch[1] : null;
    
    // Extract month from query
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const monthIndex = months.findIndex(m => lowerQuery.includes(m));
    const specificMonth = monthIndex >= 0 ? monthIndex + 1 : null;
    
    // Extract year from query and interpret as financial year (April to March)
    const yearMatch = lowerQuery.match(/20(2[0-9]|3[0-9])/);
    const specificYear = yearMatch ? yearMatch[0] : '2024';
    
    // Financial year interpretation: If year is mentioned, use April of that year to March of next year
    const isFYQuery = yearMatch !== null;
    const fyStartYear = specificYear;
    const fyEndYear = (parseInt(specificYear) + 1).toString();
    
    // Determine record count based on query type
    let count = 45;
    if (isDefaulter) count = 35;
    if (isPaid) count = 25;
    if (specificZone || specificWard) count = 20;
    
    // Names database for realistic data
    const indianNames = [
      'Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Deshmukh', 'Vijay Mehta',
      'Anita Gupta', 'Rahul Joshi', 'Kavita Singh', 'Suresh Reddy', 'Pooja Kulkarni',
      'Manoj Rao', 'Deepa Iyer', 'Anil Nair', 'Sunita Verma', 'Ravi Chopra',
      'Neha Agarwal', 'Sanjay Mishra', 'Rekha Pandey', 'Vikram Shah', 'Meera Bansal',
      'Ashok Tiwari', 'Geeta Malhotra', 'Prakash Yadav', 'Shweta Kapoor', 'Ramesh Shetty',
      'Anjali Bhatt', 'Dinesh Saxena', 'Madhuri Dixit', 'Kiran Jain', 'Sachin Dubey',
      'Asha Pillai', 'Harish Menon', 'Lalita Gokhale', 'Nitin Deshpande', 'Varsha Thakur'
    ];
    
    const localities = [
      'Shivaji Nagar', 'Gandhi Road', 'MG Road', 'Station Area', 'Nehru Chowk',
      'Tilak Road', 'Deccan Gymkhana', 'Kothrud', 'Pimpri', 'Chinchwad',
      'Hadapsar', 'Wakad', 'Baner', 'Aundh', 'Viman Nagar'
    ];
    
    for (let i = 1; i <= count; i++) {
      // Generate zone
      let zone;
      if (specificZone) {
        zone = `Zone ${specificZone}`;
      } else {
        zone = `Zone ${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`;
      }
      
      // Generate ward
      let ward;
      if (specificWard) {
        ward = specificWard;
      } else {
        ward = `${Math.floor(Math.random() * 15) + 1}`;
      }
      
      // Generate bill amount based on query
      let billAmount;
      if (isHighValue) {
        billAmount = `₹${(Math.random() * 15000 + 8000).toFixed(2)}`;
      } else if (isLowValue) {
        billAmount = `₹${(Math.random() * 2000 + 500).toFixed(2)}`;
      } else if (isDefaulter) {
        billAmount = `₹${(Math.random() * 12000 + 5000).toFixed(2)}`;
      } else {
        billAmount = `₹${(Math.random() * 8000 + 2000).toFixed(2)}`;
      }
      
      // Generate due date based on query
      let dueDate;
      if (specificMonth) {
        const day = Math.floor(Math.random() * 28) + 1;
        dueDate = `${specificYear}-${String(specificMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      } else if (isFYQuery) {
        // Financial Year: April to March
        // Randomly select a month from April (current year) to March (next year)
        const fyMonths = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3]; // Apr-Mar
        const randomFYMonth = fyMonths[Math.floor(Math.random() * fyMonths.length)];
        const yearForMonth = randomFYMonth >= 4 ? fyStartYear : fyEndYear;
        const day = Math.floor(Math.random() * 28) + 1;
        dueDate = `${yearForMonth}-${String(randomFYMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      } else {
        const month = Math.floor(Math.random() * 12) + 1;
        const day = Math.floor(Math.random() * 28) + 1;
        dueDate = `${specificYear}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      }
      
      // Generate status based on query
      let status;
      if (isDefaulter) {
        status = Math.random() > 0.3 ? 'Overdue' : 'Pending';
      } else if (isPaid) {
        status = 'Paid';
      } else {
        status = Math.random() > 0.6 ? 'Overdue' : Math.random() > 0.5 ? 'Pending' : 'Paid';
      }
      
      // Generate customer name
      const customerName = indianNames[Math.floor(Math.random() * indianNames.length)];
      const locality = localities[Math.floor(Math.random() * localities.length)];
      
      mockData.push({
        id: i,
        upicId: `PMC${300000 + i}`,
        name: customerName,
        ward: ward,
        zone: zone,
        billAmount: billAmount,
        dueDate: dueDate,
        mobile: `${['98', '99', '97', '96'][Math.floor(Math.random() * 4)]}${Math.floor(Math.random() * 90000000 + 10000000)}`,
        address: `Plot ${Math.floor(Math.random() * 500) + 1}, ${locality}, Pune`,
        status: status
      });
    }
    
    return mockData;
  };

  const [results, setResults] = useState<ResultRecord[]>([]);

  const handleAISearch = () => {
    const searchText = searchQuery;
    
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
      
      // Generate contextual success message
      const lowerQuery = searchText.toLowerCase();
      let message = `Found ${mockResults.length} records`;
      
      // Check for financial year in query
      const fyYearMatch = lowerQuery.match(/20(2[0-9]|3[0-9])/);
      const financialYear = fyYearMatch ? `FY ${fyYearMatch[0]}-${(parseInt(fyYearMatch[0]) + 1).toString().slice(-2)}` : null;
      
      // Determine if status column should be shown
      const shouldShowStatus = lowerQuery.includes('defaulter') || 
                              lowerQuery.includes('overdue') || 
                              lowerQuery.includes('pending') || 
                              lowerQuery.includes('status') ||
                              lowerQuery.includes('paid');
      
      // Hide status for collection, customer database, and summary reports
      const shouldHideStatus = lowerQuery.includes('collection') || 
                              lowerQuery.includes('customer') ||
                              lowerQuery.includes('database') ||
                              (lowerQuery.includes('summary') && !lowerQuery.includes('status'));
      
      setShowStatusColumn(shouldShowStatus || !shouldHideStatus);
      
      if (lowerQuery.includes('defaulter')) {
        message = `📊 Found ${mockResults.length} defaulter records`;
      } else if (lowerQuery.includes('zone')) {
        const zoneMatch = lowerQuery.match(/zone\s*([a-d])/i);
        if (zoneMatch) {
          message = `📍 Found ${mockResults.length} records for Zone ${zoneMatch[1].toUpperCase()}`;
        }
      } else if (lowerQuery.includes('ward')) {
        const wardMatch = lowerQuery.match(/ward\s*(\d+)/i);
        if (wardMatch) {
          message = `🏘️ Found ${mockResults.length} records for Ward ${wardMatch[1]}`;
        }
      } else if (lowerQuery.includes('collection')) {
        message = `💰 Found ${mockResults.length} collection records`;
      } else if (lowerQuery.includes('paid')) {
        message = `✅ Found ${mockResults.length} paid records`;
      } else if (lowerQuery.includes('high value') || lowerQuery.includes('high amount')) {
        message = `💎 Found ${mockResults.length} high-value records`;
      }
      
      const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
      const monthIndex = months.findIndex(m => lowerQuery.includes(m));
      if (monthIndex >= 0) {
        message += ` for ${months[monthIndex].charAt(0).toUpperCase() + months[monthIndex].slice(1)}`;
      }
      
      // Add financial year to message if detected
      if (financialYear) {
        message += ` (${financialYear})`;
        setFinancialYearInfo(financialYear);
      } else {
        setFinancialYearInfo(null);
      }
      
      toast.success(message);
    }, 1500);
  };

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      toast.info('🎤 Voice search activated! Speak now...', { duration: 3000 });
      
      // Simulate voice recognition (in production, use Web Speech API)
      setTimeout(() => {
        setIsListening(false);
        const sampleQuery = 'Show me defaulters for 2024';
        setSearchQuery(sampleQuery);
        toast.success('Voice recognized!', { duration: 2000 });
      }, 3000);
    } else {
      toast.info('Voice search cancelled', { duration: 2000 });
    }
  };

  const handleTemplateClick = (template: string) => {
    setSearchQuery(template);
    toast.success('Template applied! Click search or press Enter', { duration: 2000 });
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
      link.setAttribute('download', `${selectedReport.title.toLowerCase().replace(/\s+/g, '_')}_${formatDateForFileName(new Date())}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`Excel file downloaded successfully! (${mockData.length} records)`);
    } else {
      // Create HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${selectedReport.title}</title>
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
            <h1>Maharashtra Water Billing - ${selectedReport.title}</h1>
            <p>Total Records: ${mockData.length} | Generated: ${formatDateTime(new Date())}</p>
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
              ${mockData.map((record, index) => `
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

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${selectedReport.title.toLowerCase().replace(/\s+/g, '_')}_${formatDateForFileName(new Date())}.html`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`PDF file downloaded successfully! (${mockData.length} records)`);
    }
    
    setShowDownloadPopup(false);
    setSelectedReport(null);
  };

  const handleExportExcel = () => {
    const headers = showStatusColumn 
      ? ['Sr. No', 'UPIC ID', 'Customer Name', 'Ward', 'Zone', 'Bill Amount', 'Due Date', 'Mobile', 'Address', 'Status']
      : ['Sr. No', 'UPIC ID', 'Customer Name', 'Ward', 'Zone', 'Bill Amount', 'Due Date', 'Mobile', 'Address'];
    
    const csvContent = [
      headers.join(','),
      ...results.map((record, index) => {
        const row = [
          index + 1,
          record.upicId,
          `"${record.name}"`,
          record.ward,
          record.zone,
          record.billAmount.replace('₹', ''),
          record.dueDate,
          record.mobile,
          `"${record.address}"`
        ];
        if (showStatusColumn) {
          row.push(record.status);
        }
        return row.join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `search_results_${formatDateForFileName(new Date())}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(`Excel file exported successfully! (${results.length} records)`);
  };

  const handleExportPDF = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Search Results - Maharashtra Water Billing</title>
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
          .status.paid { background: #d1fae5; color: #065f46; }
          .status.pending { background: #fef3c7; color: #92400e; }
          .status.overdue { background: #fee2e2; color: #991b1b; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Maharashtra Water Billing - Search Results</h1>
          <p>Search Query: "${searchQuery}" | Total Records: ${results.length} | Generated: ${formatDateTime(new Date())}</p>
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
              <th>Address</th>
              ${showStatusColumn ? '<th>Status</th>' : ''}
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
                <td>${record.address}</td>
                ${showStatusColumn ? `<td><span class="status ${record.status.toLowerCase()}">${record.status}</span></td>` : ''}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `search_results_${formatDateForFileName(new Date())}.html`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(`PDF file exported successfully! (${results.length} records)`);
  };

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const paginatedResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4 relative px-4 md:px-12 lg:px-16 xl:px-20 px-[21px] py-3">
      {/* Daily Report Reminder - Flashing notification */}
      <DailyReportReminder />
      
      {/* Enhanced Floating Background Orbs with Multiple Layers */}
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

      {/* Google-Style DataMitra Search */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        {/* DataMitra Branding */}
        <div className="text-center mb-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl mb-1 tracking-tight"
          >
            <span className="bg-gradient-to-r from-[#005AA7] via-[#0077B6] to-[#00C6FF] text-transparent bg-clip-text font-bold">
              Data
            </span>
            <span className="text-gray-800 font-bold">Mitra</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-xs"
          >
            Your AI-Powered Water Billing Intelligence
          </motion.p>
        </div>
        
        {/* Google-Style Search Box */}
        <div className="relative group">
          {/* Subtle glow effect on hover */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#005AA7]/10 via-[#00C6FF]/10 to-[#005AA7]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative bg-white rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
            <div className="flex items-center px-6 py-4">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
                placeholder="Ask anything - reports, analytics, insights..."
                className="flex-1 px-4 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-base"
              />
              
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => { setSearchQuery(''); toast.info('Search cleared'); }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="mr-2 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </motion.button>
              )}
              
              {/* Voice Search Button */}
              <motion.button
                onClick={handleVoiceSearch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-gradient-to-br from-[#005AA7] to-[#00C6FF] hover:shadow-lg'
                }`}
              >
                {isListening && (
                  <motion.div
                    className="absolute inset-0 bg-white/30 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                <Mic className={`w-5 h-5 text-white relative z-10 ${isListening ? 'animate-pulse' : ''}`} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Query Templates */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4"
        >
          <p className="text-xs text-gray-500 mb-2 text-center">Quick search templates:</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: 'defaulters 2024', icon: AlertCircle, color: 'red' },
              { label: 'collection 2023', icon: IndianRupee, color: 'green' },
              { label: 'zone wise report', icon: MapPin, color: 'blue' },
              { label: 'monthly collection report', icon: Calendar, color: 'purple' },
              { label: 'ward wise analysis', icon: BarChart3, color: 'teal' },
              { label: 'customer database', icon: Users, color: 'cyan' },
            ].map((template, index) => {
              const Icon = template.icon;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTemplateClick(template.label)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-300 rounded-full text-sm text-gray-700 hover:text-blue-600 transition-all shadow-sm hover:shadow-md"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{template.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Pro Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <p>
            <span className="text-amber-600">Pro Tip:</span> Include year for financial year data (Apr-Mar). Try{' '}
            <button 
              onClick={() => handleTemplateClick('defaulters 2024')}
              className="text-[#005AA7] hover:underline cursor-pointer font-medium"
            >
              "defaulters 2024"
            </button>
            {' '}or{' '}
            <button 
              onClick={() => handleTemplateClick('collection 2023')}
              className="text-[#005AA7] hover:underline cursor-pointer font-medium"
            >
              "collection 2023"
            </button>
          </p>
        </motion.div>

        {/* Voice Listening Indicator */}
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-50"
          >
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [6, 20, 6] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 bg-white rounded-full"
                />
              ))}
            </div>
            <span className="text-sm font-semibold">Listening...</span>
          </motion.div>
        )}
      </motion.div>

      {/* Search Results Table */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="results-section"
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden"
          >
            {/* Results Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-0 px-[24px] md:px-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-xl md:text-2xl text-white mb-1">Search Results</h2>
                    {financialYearInfo && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border-2 border-white/40 flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4 text-white" />
                        <span className="text-white font-bold text-sm">{financialYearInfo}</span>
                        <span className="text-white/80 text-xs">(Apr-Mar)</span>
                      </motion.div>
                    )}
                  </div>
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

            {/* Database Query Display Box */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b-2 border-indigo-200 px-[24px] md:px-6 py-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Search className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Database Query</span>
                    <span className="px-2 py-0.5 bg-indigo-200 text-indigo-700 rounded text-xs font-medium">Active</span>
                  </div>
                  <div className="bg-white rounded-lg px-4 py-3 border border-indigo-200 shadow-sm">
                    <code className="text-sm text-gray-800 font-mono break-words">
                      SELECT * FROM water_billing WHERE {searchQuery.toLowerCase().includes('defaulter') && 'payment_status = "OVERDUE"'}
                      {searchQuery.toLowerCase().includes('collection') && 'transaction_type = "PAYMENT"'}
                      {searchQuery.toLowerCase().includes('zone') && 'GROUP BY zone_id'}
                      {searchQuery.toLowerCase().includes('ward') && 'GROUP BY ward_number'}
                      {searchQuery.toLowerCase().includes('customer') && 'customer_status = "ACTIVE"'}
                      {(!searchQuery.toLowerCase().includes('defaulter') && 
                        !searchQuery.toLowerCase().includes('collection') && 
                        !searchQuery.toLowerCase().includes('zone') && 
                        !searchQuery.toLowerCase().includes('ward') && 
                        !searchQuery.toLowerCase().includes('customer')) && 
                        `description LIKE "%${searchQuery}%"`}
                      {' '} ORDER BY created_at DESC LIMIT 100;
                    </code>
                  </div>
                  <p className="text-xs text-indigo-600 mt-2 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Query executed successfully • {results.length} rows returned
                  </p>
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
                    {showStatusColumn && (
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    )}
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
                      <td className="px-4 py-2 text-sm text-gray-600">{formatDate(record.dueDate)}</td>
                      {showStatusColumn && (
                        <td className="px-4 py-2 text-sm">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            record.status === 'Paid' 
                              ? 'bg-green-100 text-green-700'
                              : record.status === 'Pending' 
                              ? 'bg-yellow-100 text-yellow-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                      )}
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
                    {showStatusColumn && (
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        record.status === 'Paid' 
                          ? 'bg-green-100 text-green-700'
                          : record.status === 'Pending' 
                          ? 'bg-yellow-100 text-yellow-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {record.status}
                      </span>
                    )}
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

      {/* Download Format Selection Popup */}
      <AnimatePresence>
        {showDownloadPopup && selectedReport && (() => {
          const ReportIcon = selectedReport.icon;
          
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
              onClick={() => setShowDownloadPopup(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              >
                {/* Header with gradient */}
                <div className={`relative bg-gradient-to-r ${selectedReport.gradient} p-6 text-white overflow-hidden`}>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                  />
                  
                  <div className="relative flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ReportIcon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-1">{selectedReport.title}</h2>
                      <p className="text-white/90 text-sm">Choose your download format</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setShowDownloadPopup(false)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-6">
                    Select the file format you want to download this report in:
                  </p>
                  
                  {/* Format Selection Cards */}
                  <div className="space-y-3 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedFormat('excel')}
                      className={`w-full p-4 rounded-xl border-2 transition-all cursor-pointer text-left ${
                        selectedFormat === 'excel'
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                          selectedFormat === 'excel'
                            ? 'bg-green-500'
                            : 'bg-green-100'
                        }`}>
                          <Download className={`w-6 h-6 ${
                            selectedFormat === 'excel' ? 'text-white' : 'text-green-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-0.5 ${
                            selectedFormat === 'excel' ? 'text-green-700' : 'text-gray-900'
                          }`}>
                            Excel Format (.CSV)
                          </h3>
                          <p className="text-xs text-gray-500">
                            Best for data analysis and spreadsheets
                          </p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedFormat === 'excel'
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedFormat === 'excel' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2.5 h-2.5 rounded-full bg-white"
                            />
                          )}
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedFormat('pdf')}
                      className={`w-full p-4 rounded-xl border-2 transition-all cursor-pointer text-left ${
                        selectedFormat === 'pdf'
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-red-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                          selectedFormat === 'pdf'
                            ? 'bg-red-500'
                            : 'bg-red-100'
                        }`}>
                          <FileText className={`w-6 h-6 ${
                            selectedFormat === 'pdf' ? 'text-white' : 'text-red-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-0.5 ${
                            selectedFormat === 'pdf' ? 'text-red-700' : 'text-gray-900'
                          }`}>
                            PDF Format (.HTML)
                          </h3>
                          <p className="text-xs text-gray-500">
                            Best for printing and sharing reports
                          </p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedFormat === 'pdf'
                            ? 'border-red-500 bg-red-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedFormat === 'pdf' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2.5 h-2.5 rounded-full bg-white"
                            />
                          )}
                        </div>
                      </div>
                    </motion.button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowDownloadPopup(false)}
                      variant="outline"
                      className="flex-1 h-12"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDownloadReport}
                      className={`flex-1 h-12 ${
                        selectedFormat === 'excel'
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-red-500 hover:bg-red-600'
                      } text-white shadow-lg`}
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download {selectedFormat === 'excel' ? 'Excel' : 'PDF'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}