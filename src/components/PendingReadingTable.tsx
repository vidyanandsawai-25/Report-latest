import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Search, Camera, FileText } from 'lucide-react';
import { useState } from 'react';
import { formatDate } from '../src/lib/utils/format';

interface PendingReadingTableProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PendingReadingTable({ isOpen, onClose }: PendingReadingTableProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for pending reading list
  const pendingReadings = [
    {
      srNo: 1,
      consumerNo: 'OB01000003650',
      consumerName: 'शिंदे सुनील',
      wardNo: '1C',
      zoneNo: '1',
      meterConnectionNo: 'MTR001234',
      previousReading: 3874000,
      connectionDate: '16/04/2020',
      outstandingDateWise: '15/03/2025',
      propertyTaxDate: '10/01/2025',
      objectionRaised: '',
      readingDate: '15/04/2025',
      readingTime: '10:30 AM',
      photo: 'Yes'
    },
    {
      srNo: 2,
      consumerNo: 'OB01000009050',
      consumerName: 'रामकृष्णा',
      wardNo: '12C',
      zoneNo: '1',
      meterConnectionNo: 'MTR001235',
      previousReading: 0,
      connectionDate: '15/04/2021',
      outstandingDateWise: '20/03/2025',
      propertyTaxDate: '15/01/2025',
      objectionRaised: '',
      readingDate: '15/04/2025',
      readingTime: '11:00 AM',
      photo: 'Yes'
    },
    {
      srNo: 3,
      consumerNo: 'OB01000008560',
      consumerName: 'गोपीजीन',
      wardNo: '14C',
      zoneNo: '1',
      meterConnectionNo: 'MTR001236',
      previousReading: 3378400,
      connectionDate: '15/04/2019',
      outstandingDateWise: '25/03/2025',
      propertyTaxDate: '20/01/2025',
      objectionRaised: '',
      readingDate: '15/04/2025',
      readingTime: '11:30 AM',
      photo: 'No'
    },
    {
      srNo: 4,
      consumerNo: 'OB01000009200',
      consumerName: 'माथू टेकू',
      wardNo: '2C',
      zoneNo: '1',
      meterConnectionNo: 'MTR001237',
      previousReading: 9174,
      connectionDate: '15/04/2018',
      readingDate: '15/04/2025',
      outstandingDateWise: '01/04/2025',
      propertyTaxDate: '25/01/2025',
      objectionRaised: '',
      readingTime: '12:00 PM',
      photo: 'Yes'
    },
    {
      srNo: 5,
      consumerNo: 'OB01000009420',
      consumerName: 'ब-जो टेकू',
      wardNo: '10C',
      zoneNo: '1',
      meterConnectionNo: 'MTR001238',
      previousReading: 296002,
      connectionDate: '15/04/2017',
      outstandingDateWise: '05/04/2025',
      propertyTaxDate: '30/01/2025',
      objectionRaised: '',
      readingDate: '15/04/2025',
      readingTime: '12:30 PM',
      photo: 'No'
    }
  ];

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
                    Pending Reading List Report
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    Total Pending: {pendingReadings.length} readings
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                    <input
                      type="text"
                      placeholder="Search reading..."
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
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Consumer Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Ward No.</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Zone No.</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Meter Connection No.</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Previous Reading</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Connection Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Outstanding Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Property Tax Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Objection Raised</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Reading Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Reading Time</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">Photo</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingReadings.map((row, index) => (
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
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.wardNo}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.zoneNo}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.meterConnectionNo}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold text-right">{row.previousReading.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.connectionDate}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.outstandingDateWise}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.propertyTaxDate}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.objectionRaised || '-'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.readingDate}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.readingTime}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
                            row.photo === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {row.photo === 'Yes' && <Camera className="w-3 h-3" />}
                            {row.photo}
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
                  Showing {pendingReadings.length} records • Generated on {formatDate(new Date())}
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
