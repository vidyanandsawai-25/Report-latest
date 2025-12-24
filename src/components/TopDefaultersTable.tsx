import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, Search, FileText } from 'lucide-react';
import { useState } from 'react';
import { generateTopDefaultersPDF } from '../utils/topDefaultersPDF';
import { formatDate, formatDateTime } from '@/src/lib/utils/format';

interface TopDefaultersTableProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TopDefaultersTable({ isOpen, onClose }: TopDefaultersTableProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data based on the image
  const defaultersData = [
    {
      srNo: 1,
      consumerNo: 'CHTD',
      consumerName: 'पवार महेश',
      mobileNo: '9876543210',
      fullAddress: 'पंजाब नॅशनल बॅँक समोर 3,4, 1260',
      connectionTypeSize: 'घरगुती',
      connectionDate: '15/01/2020',
      closedDate: '',
      meterNo: 'No Meter',
      category: 'Residential',
      subcategory: 'Domestic',
      outstandingAmount: 6900000,
      lastMonth: '0',
      outstandingBalance: 1895000,
      currentMonth: 26500,
      interestAmount: '0',
      totalOutstanding: 26500,
      totalDue: 1921500
    },
    {
      srNo: 2,
      consumerNo: 'CHTD',
      consumerName: 'कोरोळे रजनी',
      mobileNo: '9765432109',
      fullAddress: 'JAHILAR-400',
      connectionTypeSize: 'घरगुती',
      connectionDate: '22/03/2019',
      closedDate: '',
      meterNo: 'No Meter',
      category: 'Residential',
      subcategory: 'Domestic',
      outstandingAmount: 262000,
      lastMonth: '0',
      outstandingBalance: 469400,
      currentMonth: 42500,
      interestAmount: '0',
      totalOutstanding: 42500,
      totalDue: 506800
    },
    {
      srNo: 3,
      consumerNo: 'CHTD',
      consumerName: 'पवार महेश',
      mobileNo: '9654321098',
      fullAddress: 'गाव सभागृह जवळ 3,4, 1260',
      connectionTypeSize: 'सभागृह',
      connectionDate: '10/06/2018',
      closedDate: '15/08/2023',
      meterNo: 'No Meter',
      category: 'Commercial',
      subcategory: 'Hall',
      outstandingAmount: 750000,
      lastMonth: '0',
      outstandingBalance: 588400,
      currentMonth: 102500,
      interestAmount: '0',
      totalOutstanding: 102500,
      totalDue: 476300
    },
    {
      srNo: 4,
      consumerNo: 'CHTD',
      consumerName: 'मैंदाळ रजनी',
      mobileNo: '9543210987',
      fullAddress: 'KMCE-R',
      connectionTypeSize: 'मैंदाळ',
      connectionDate: '05/11/2017',
      closedDate: '',
      meterNo: 'No Meter',
      category: 'Commercial',
      subcategory: 'Shop',
      outstandingAmount: 531000,
      lastMonth: '0',
      outstandingBalance: 421000,
      currentMonth: 34300,
      interestAmount: '0',
      totalOutstanding: 34300,
      totalDue: 440250
    },
    {
      srNo: 5,
      consumerNo: 'CHTD',
      consumerName: 'पंढरीनाथ',
      mobileNo: '9432109876',
      fullAddress: 'मुख्य मार्ग',
      connectionTypeSize: 'घरगुती',
      connectionDate: '18/09/2016',
      closedDate: '',
      meterNo: 'No Meter',
      category: 'Residential',
      subcategory: 'Domestic',
      outstandingAmount: 425000,
      lastMonth: '0',
      outstandingBalance: 350000,
      currentMonth: 28000,
      interestAmount: '0',
      totalOutstanding: 28000,
      totalDue: 378000
    }
  ];

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-IN').format(num);
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Table Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[98vw] max-w-[1800px] max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-[#005AA7] to-[#00C6FF] text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <FileText className="w-7 h-7" />
                    Top Defaulters Report
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    Total Defaulters: {defaultersData.length} | Total Outstanding: ₹{formatCurrency(defaultersData.reduce((sum, item) => sum + item.totalDue, 0))}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                    <input
                      type="text"
                      placeholder="Search defaulter..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all w-64"
                    />
                  </div>

                  {/* Export Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      try {
                        generateTopDefaultersPDF({
                          fromDate: '',
                          toDate: '',
                          zone: '',
                          ward: '',
                          topNo: '10',
                          amount: ''
                        });
                      } catch (error) {
                        console.error('PDF generation error:', error);
                      }
                    }}
                    className="flex items-center gap-2 bg-white text-[#005AA7] px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Download className="w-5 h-5" />
                    Export PDF
                  </motion.button>

                  {/* Print Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-2.5 rounded-lg font-semibold transition-all"
                  >
                    <Printer className="w-5 h-5" />
                    Print
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

            {/* Table Container */}
            <div className="flex-1 overflow-auto p-6">
              <div className="rounded-xl border border-gray-200 overflow-hidden shadow-lg">
                <table className="w-full border-collapse">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-5">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Sr. No.</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Consumer No.</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Consumer Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Mobile No.</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Full Address</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Connection Type & Size</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Connection Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Closed Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Meter No.</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Subcategory</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Outstanding Amount ₹</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Last Month</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Outstanding Balance ₹</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Current Month ₹</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Interest Amount ₹</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Total Outstanding ₹</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Total Due ₹</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {defaultersData.map((row, index) => (
                      <motion.tr
                        key={row.srNo}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="hover:bg-blue-50 transition-colors"
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.srNo}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">{row.consumerNo}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.consumerName}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.mobileNo}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.fullAddress}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.connectionTypeSize}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.connectionDate}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.closedDate || '-'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.meterNo}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.category}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.subcategory}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold text-right">₹{formatCurrency(row.outstandingAmount)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 text-right">{row.lastMonth}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold text-right">₹{formatCurrency(row.outstandingBalance)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-orange-700 font-semibold text-right">₹{formatCurrency(row.currentMonth)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 text-right">{row.interestAmount}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-700 font-semibold text-right">₹{formatCurrency(row.totalOutstanding)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-red-700 font-bold text-right">₹{formatCurrency(row.totalDue)}</td>
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
                  Showing {defaultersData.length} records • Generated on {formatDate(new Date())}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      try {
                        generateTopDefaultersPDF({
                          fromDate: '',
                          toDate: '',
                          zone: '',
                          ward: '',
                          topNo: '10',
                          amount: ''
                        });
                      } catch (error) {
                        console.error('PDF generation error:', error);
                      }
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-[#005AA7] to-[#00C6FF] text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                  >
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
