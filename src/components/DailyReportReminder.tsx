import { motion, AnimatePresence } from 'motion/react';
import { FileDown, X, AlertCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { formatDate, formatTime, formatDateForFileName } from '@/src/lib/utils/format';

export function DailyReportReminder() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if it's close to office ending time (after 4 PM)
  const currentHour = new Date().getHours();
  const isOfficeEndingTime = currentHour >= 16; // After 4 PM

  const handleDownload = (reportName: string) => {
    const today = formatDate(new Date()); // "22/12/2024"
    const fileName = `${reportName.replace(/\s+/g, '_')}_${formatDateForFileName()}`; // "Report_22-12-2024"
    
    toast.success(`📥 Downloading ${reportName} for ${today}...`);
    
    setTimeout(() => {
      toast.success(`✅ ${reportName} downloaded successfully!`);
    }, 1500);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="fixed top-24 right-6 z-40"
      >
        {/* Main Notification Card */}
        <motion.div
          className={`relative bg-gradient-to-r ${
            isOfficeEndingTime 
              ? 'from-red-500 via-orange-500 to-amber-500' 
              : 'from-blue-500 via-cyan-500 to-teal-500'
          } rounded-2xl shadow-2xl overflow-hidden max-w-sm`}
          animate={{
            boxShadow: [
              '0 10px 40px rgba(239, 68, 68, 0.4)',
              '0 10px 60px rgba(239, 68, 68, 0.6)',
              '0 10px 40px rgba(239, 68, 68, 0.4)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Animated gradient overlay - flashing effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
          />

          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <div className="relative p-4">
            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all cursor-pointer z-10"
            >
              <X className="w-3.5 h-3.5 text-white" />
            </button>

            {/* Header with icon */}
            <div className="flex items-start gap-3 mb-3">
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <FileDown className="w-5 h-5 text-white" />
              </motion.div>
              
              <div className="flex-1 pr-4">
                <motion.h3 
                  className="text-white font-bold text-base leading-tight"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {isOfficeEndingTime ? '⚠️ Office Closing Soon!' : '📊 Daily Reports Ready'}
                </motion.h3>
                <p className="text-white/90 text-xs mt-1 leading-relaxed">
                  {isOfficeEndingTime 
                    ? 'Download required reports before leaving' 
                    : 'Download today\'s important reports'}
                </p>
              </div>
            </div>

            {/* Time indicator */}
            <div className="flex items-center gap-2 mb-3 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-semibold">
                {formatTime(new Date())}
              </span>
              <span className="text-white/70 text-xs mx-1">•</span>
              <span className="text-white text-xs">
                {formatDate(new Date())}
              </span>
            </div>

            {/* Quick action buttons - collapsed/expanded */}
            {!isExpanded ? (
              <motion.button
                onClick={() => setIsExpanded(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white/90 hover:bg-white text-gray-900 rounded-lg px-4 py-2.5 font-semibold text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <FileDown className="w-4 h-4" />
                View Daily Reports
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-1"
                >
                  →
                </motion.span>
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {/* Top Defaulters - Priority */}
                <motion.button
                  onClick={() => handleDownload("Today's Top Defaulters")}
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-900 rounded-lg px-3 py-2 font-semibold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 border-2 border-red-200"
                >
                  <span className="text-base">🚫</span>
                  <span className="flex-1 text-left">Top Defaulters List</span>
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ↓
                  </motion.span>
                </motion.button>

                {/* Collection Summary */}
                <motion.button
                  onClick={() => handleDownload("Today's Collection Summary")}
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-50 hover:bg-green-100 text-green-900 rounded-lg px-3 py-2 font-semibold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 border-2 border-green-200"
                >
                  <span className="text-base">💰</span>
                  <span className="flex-1 text-left">Collection Summary</span>
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  >
                    ↓
                  </motion.span>
                </motion.button>

                {/* Pending Readings */}
                <motion.button
                  onClick={() => handleDownload("Today's Pending Readings")}
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg px-3 py-2 font-semibold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 border-2 border-blue-200"
                >
                  <span className="text-base">📊</span>
                  <span className="flex-1 text-left">Pending Readings</span>
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  >
                    ↓
                  </motion.span>
                </motion.button>

                {/* Collapse button */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-full bg-white/20 hover:bg-white/30 text-white rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer mt-2"
                >
                  Collapse ↑
                </button>
              </motion.div>
            )}

            {/* Blinking indicator */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <motion.div
                className="w-2 h-2 rounded-full bg-white"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-white/80 text-xs font-medium">
                {isOfficeEndingTime ? 'Action Required' : 'Reports Available'}
              </span>
              <motion.div
                className="w-2 h-2 rounded-full bg-white"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}