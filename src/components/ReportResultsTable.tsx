import { motion } from 'motion/react';
import { Download, FileSpreadsheet, FileText, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { formatDate } from '../src/lib/utils/format';

interface ReportResultsTableProps {
  reportName: string;
  onClose: () => void;
  language: 'en' | 'mr';
}

export function ReportResultsTable({ reportName, onClose, language }: ReportResultsTableProps) {
  const [selectedFormat, setSelectedFormat] = useState<'excel' | 'pdf'>('excel');

  // Generate mock data based on report type
  const generateMockData = () => {
    const baseData = [];
    const recordCount = Math.floor(Math.random() * 30) + 20; // 20-50 records
    
    for (let i = 1; i <= recordCount; i++) {
      const zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D'];
      const wards = ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5'];
      const statuses = ['Pending', 'Paid', 'Overdue', 'Partial'];
      
      baseData.push({
        srNo: i,
        upicId: `UPIC${10000 + i}`,
        customerName: `Customer ${i}`,
        ward: wards[Math.floor(Math.random() * wards.length)],
        zone: zones[Math.floor(Math.random() * zones.length)],
        billAmount: (Math.random() * 5000 + 500).toFixed(2),
        dueDate: formatDate(new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)),
        mobile: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        address: `Plot ${i}, Sector ${Math.floor(Math.random() * 10) + 1}, Maharashtra`,
        status: statuses[Math.floor(Math.random() * statuses.length)]
      });
    }
    
    return baseData;
  };

  const mockData = generateMockData();

  const handleDownload = () => {
    if (selectedFormat === 'excel') {
      // Create CSV content
      const headers = ['Sr. No', 'UPIC ID', 'Customer Name', 'Ward', 'Zone', 'Bill Amount (₹)', 'Due Date', 'Mobile', 'Address', 'Status'];
      const csvContent = [
        headers.join(','),
        ...mockData.map(row => 
          `${row.srNo},${row.upicId},"${row.customerName}",${row.ward},${row.zone},${row.billAmount},${row.dueDate},"${row.mobile}","${row.address}",${row.status}`
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${reportName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(
        language === 'en' 
          ? `Excel report downloaded successfully with ${mockData.length} records!`
          : `${mockData.length} रेकॉर्डसह Excel अहवाल डाउनलोड झाला!`,
        { duration: 3000 }
      );
    } else {
      toast.info(
        language === 'en'
          ? 'PDF download feature will be available soon!'
          : 'PDF डाउनलोड वैशिष्ट्य लवकरच उपलब्ध होईल!',
        { duration: 3000 }
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#005AA7] to-[#00C6FF] text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{reportName}</h2>
              <p className="text-blue-100 text-sm mt-1">
                {language === 'en' 
                  ? `Total Records: ${mockData.length}`
                  : `एकूण रेकॉर्ड: ${mockData.length}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Format Selector */}
              <div className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-1">
                <button
                  onClick={() => setSelectedFormat('excel')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    selectedFormat === 'excel'
                      ? 'bg-white text-[#005AA7] shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span className="font-medium">Excel</span>
                </button>
                <button
                  onClick={() => setSelectedFormat('pdf')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    selectedFormat === 'pdf'
                      ? 'bg-white text-[#005AA7] shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="font-medium">PDF</span>
                </button>
              </div>

              {/* Download Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center gap-2 bg-white text-[#005AA7] px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Download className="w-5 h-5" />
                <span>{language === 'en' ? 'Download' : 'डाउनलोड'}</span>
              </motion.button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-auto max-h-[calc(90vh-120px)] p-6">
          <div className="rounded-xl border border-gray-200 overflow-hidden shadow-lg">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-5">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    {language === 'en' ? 'Sr. No' : 'अ.क्र.'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    {language === 'en' ? 'UPIC ID' : 'UPIC ID'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    {language === 'en' ? 'Customer Name' : 'ग्राहकाचे नाव'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    {language === 'en' ? 'Ward' : 'प्रभाग'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    {language === 'en' ? 'Zone' : 'झोन'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    {language === 'en' ? 'Bill Amount (₹)' : 'बिल रक्कम (₹)'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    {language === 'en' ? 'Due Date' : 'देय दिनांक'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    {language === 'en' ? 'Mobile' : 'मोबाईल'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    {language === 'en' ? 'Address' : 'पत्ता'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                    {language === 'en' ? 'Status' : 'स्थिती'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockData.map((row, index) => (
                  <motion.tr
                    key={row.srNo}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.srNo}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">{row.upicId}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.customerName}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.ward}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.zone}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold">₹{row.billAmount}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.dueDate}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.mobile}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={row.address}>{row.address}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        row.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        row.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {language === 'en' 
                ? `Showing ${mockData.length} records • Generated on ${formatDate(new Date())}`
                : `${mockData.length} रेकॉर्ड दाखवत आहे • ${formatDate(new Date())} रोजी तयार केले`}
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium"
              >
                {language === 'en' ? 'Close' : 'बंद करा'}
              </button>
              <button
                onClick={handleDownload}
                className="px-6 py-2 bg-gradient-to-r from-[#005AA7] to-[#00C6FF] text-white rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                {language === 'en' ? 'Download Report' : 'अहवाल डाउनलोड करा'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
