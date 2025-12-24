import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Search, FileText } from 'lucide-react';
import { useState } from 'react';
import { formatDate } from '../src/lib/utils/format';

interface ClosedConnectionTableProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClosedConnectionTable({ isOpen, onClose }: ClosedConnectionTableProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for closed connections
  const closedConnections = [
    {
      srNo: 1,
      consumerNo: 'CNBJ0400018253',
      connectionNo: 'CONN001',
      name: 'सामोदकर पीत',
      address: 'प्रकाश घोषचे बाहेरील मैदान, पाटापाट',
      connectionDate: '15/01/2018',
      closureReason: 'Consumer Request',
      closedDate: '10/03/2025',
      meterNo: 'MTR18253',
      lastReading: 400,
      outstandingAmount: 0,
      totalAmount: 0,
      monthlyAmount: 0,
      expenseAmount: 0
    },
    {
      srNo: 2,
      consumerNo: 'CNBJ0400019254',
      connectionNo: 'CONN002',
      name: 'राजलकोट पीत',
      address: 'व्यवस्थापक विमानस मुळंच',
      connectionDate: '22/03/2017',
      closureReason: 'Non-Payment',
      closedDate: '15/03/2025',
      meterNo: 'MTR19254',
      lastReading: 1400,
      outstandingAmount: 0,
      totalAmount: 0,
      monthlyAmount: 0,
      expenseAmount: 0
    },
    {
      srNo: 3,
      consumerNo: 'CNBJ0400020145',
      connectionNo: 'CONN003',
      name: 'गिरशेट पीत',
      address: 'प्रकाश घोषचे बाहेरील मैदान',
      connectionDate: '10/06/2016',
      closureReason: 'Meter Fault',
      closedDate: '20/03/2025',
      meterNo: 'MTR20145',
      lastReading: 850,
      outstandingAmount: 2500,
      totalAmount: 2500,
      monthlyAmount: 0,
      expenseAmount: 0
    },
    {
      srNo: 4,
      consumerNo: 'CNBJ0400021456',
      connectionNo: 'CONN004',
      name: 'कुलकर्णी राज',
      address: 'निवृत्ती शाळा जवळ',
      connectionDate: '05/11/2015',
      closureReason: 'Property Sold',
      closedDate: '25/03/2025',
      meterNo: 'MTR21456',
      lastReading: 1250,
      outstandingAmount: 1200,
      totalAmount: 1200,
      monthlyAmount: 0,
      expenseAmount: 0
    },
    {
      srNo: 5,
      consumerNo: 'CNBJ0400022567',
      connectionNo: 'CONN005',
      name: 'पाटील सुरेश',
      address: 'बाजार पेठ समोर मंदीर',
      connectionDate: '20/07/2014',
      closureReason: 'Consumer Request',
      closedDate: '01/04/2025',
      meterNo: 'MTR22567',
      lastReading: 3200,
      outstandingAmount: 4500,
      totalAmount: 4500,
      monthlyAmount: 0,
      expenseAmount: 0
    }
  ];

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const totalOutstanding = closedConnections.reduce((sum, conn) => 
    sum + (typeof conn.outstandingAmount === 'string' ? parseFloat(conn.outstandingAmount) : conn.outstandingAmount), 0
  );

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
                    Closed Connection List Report
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    Total Closed: {closedConnections.length} connections | Outstanding: ₹{formatCurrency(totalOutstanding)}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                    <input
                      type="text"
                      placeholder="Search connection..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all w-64"
                    />
                  </div>

                  {/* Export Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-white text-[#005AA7] px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Download className="w-5 h-5" />
                    Export Excel
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
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Connection No.</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Consumer Address</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Connection Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Reason for Closure</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Closed Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Meter No.</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Last Reading</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Outstanding Amount</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Total Amount</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Monthly Amount</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Expense Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {closedConnections.map((row, index) => (
                      <motion.tr
                        key={row.srNo}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="hover:bg-blue-50 transition-colors"
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.srNo}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">{row.consumerNo}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.connectionNo || '-'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.address}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.connectionDate || '-'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.closureReason || '-'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.closedDate}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.meterNo}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold text-right">{row.lastReading}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-right">
                          <span className={parseFloat(row.outstandingAmount as string) > 0 ? 'text-red-600' : 'text-green-600'}>
                            ₹{formatCurrency(row.outstandingAmount)}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold text-right">₹{formatCurrency(row.totalAmount)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 text-right">₹{formatCurrency(row.monthlyAmount)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 text-right">₹{formatCurrency(row.expenseAmount)}</td>
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
                  Showing {closedConnections.length} records • Generated on {formatDate(new Date())}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium"
                  >
                    Close
                  </button>
                  <button
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
