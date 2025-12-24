import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Users, Calendar, Filter } from 'lucide-react';
import { useState } from 'react';

interface GoshwaraFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: (financialYear: string, subType: string) => void;
}

export function GoshwaraFilterModal({ isOpen, onClose, onDownload }: GoshwaraFilterModalProps) {
  const [financialYear, setFinancialYear] = useState('2024-25');
  const [subType, setSubType] = useState('Ward Wise');

  // Generate financial years (current and past 5 years)
  const currentYear = new Date().getFullYear();
  const financialYears = [];
  for (let i = 0; i < 6; i++) {
    const startYear = currentYear - i;
    const endYear = startYear + 1;
    financialYears.push(`${startYear}-${endYear.toString().slice(-2)}`);
  }

  const subTypes = ['Ward Wise', 'Connection Type Wise'];

  const handleDownload = () => {
    onDownload(financialYear, subType);
    onClose();
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[520px] bg-gradient-to-br from-white via-sky-50/30 to-blue-50/30 rounded-2xl shadow-2xl z-50 overflow-hidden border-2 border-sky-500/30"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 px-6 py-5 border-b-2 border-sky-300">
              {/* Animated background orbs */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ 
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{ 
                    x: [0, -80, 0],
                    y: [0, 80, 0],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-300/20 rounded-full blur-3xl"
                />
              </div>

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md flex items-center justify-center border-2 border-white/40 shadow-lg"
                  >
                    <Users className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-white text-2xl flex items-center gap-3">
                      Goshwara Report
                      <motion.span
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-xs shadow-lg flex items-center gap-1"
                      >
                        <Filter className="w-3 h-3" />
                        FILTERS
                      </motion.span>
                    </h2>
                    <p className="text-white/90 text-sm mt-1">Configure report parameters</p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 flex items-center justify-center transition-all shadow-lg"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Financial Year Dropdown */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="w-4 h-4 text-sky-600" />
                  <span className="font-semibold">Select Financial Year</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={financialYear}
                    onChange={(e) => setFinancialYear(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all appearance-none cursor-pointer hover:border-sky-400"
                  >
                    {financialYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Sub Type Dropdown */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <Filter className="w-4 h-4 text-sky-600" />
                  <span className="font-semibold">Select Sub Type</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={subType}
                    onChange={(e) => setSubType(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all appearance-none cursor-pointer hover:border-sky-400"
                  >
                    {subTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Info Box */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-sky-50 to-blue-50 p-4 rounded-xl border-2 border-sky-200"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 text-sm mb-1">Selected Configuration</h4>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-700">
                        <span className="font-semibold">Year:</span> {financialYear}
                      </p>
                      <p className="text-xs text-gray-700">
                        <span className="font-semibold">Type:</span> {subType}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Actions */}
            <div className="bg-gradient-to-r from-gray-50 via-sky-50 to-blue-50 px-6 py-4 border-t-2 border-gray-200 flex items-center justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 rounded-xl border-2 border-gray-300 transition-all shadow-sm"
              >
                Cancel
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
