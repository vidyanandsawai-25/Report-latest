import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, Download, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { formatDate } from '../src/lib/utils/format';

interface AutoReportNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  reportName: string;
  reportType: string;
  language: 'en' | 'mr';
}

export function AutoReportNotification({ 
  isOpen, 
  onClose, 
  reportName, 
  reportType,
  language 
}: AutoReportNotificationProps) {
  
  const content = {
    en: {
      title: 'Auto-Generated Report',
      message: 'Your daily report has been generated successfully!',
      reportLabel: 'Report Type',
      generatedOn: 'Generated On',
      download: 'Download Now',
      close: 'Close'
    },
    mr: {
      title: 'स्वयं-निर्मित अहवाल',
      message: 'तुमचा दैनिक अहवाल यशस्वीरित्या तयार झाला आहे!',
      reportLabel: 'अहवाल प्रकार',
      generatedOn: 'तयार केले',
      download: 'आता डाउनलोड करा',
      close: 'बंद करा'
    }
  };

  const t = content[language];
  const currentDate = formatDate(new Date());

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
          
          {/* Notification Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-[#10B981] to-[#059669] p-6 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  style={{
                    backgroundImage: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                  }}
                />
                
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 relative z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-white mb-1"
                    >
                      {t.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-white/90 text-sm"
                    >
                      {t.message}
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Report Details */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100"
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Download className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-xs text-gray-600 mb-1">{t.reportLabel}</div>
                        <div className="text-gray-900">{reportName}</div>
                        <div className="text-xs text-gray-500 mt-1 bg-blue-100 px-2 py-1 rounded inline-block">
                          {reportType}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 pt-2 border-t border-blue-200">
                      <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-xs text-gray-600">{t.generatedOn}</div>
                        <div className="text-sm text-gray-900">{currentDate}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-3"
                >
                  <Button
                    onClick={onClose}
                    className="flex-1 bg-gradient-to-r from-[#005AA7] to-[#00C6FF] hover:from-[#004c8f] hover:to-[#00b0e6] text-white shadow-lg relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      {t.download}
                    </span>
                  </Button>
                  
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="px-6 border-gray-300 hover:bg-gray-50"
                  >
                    {t.close}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
