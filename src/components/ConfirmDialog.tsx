import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles, FileText } from 'lucide-react';
import { Button } from './ui/button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConfirmDialog({ isOpen, onClose }: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-black/50 via-blue-900/30 to-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-white via-blue-50/40 to-white rounded-3xl shadow-2xl p-8 text-center border-4 border-white/50 relative overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <motion.div
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #005AA7 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                />
              </div>

              {/* Top Sparkles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-2 -right-2 text-yellow-400"
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-2 -left-2 text-blue-400"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>

              {/* Animated Check Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: 'spring', 
                  damping: 12, 
                  stiffness: 200,
                  delay: 0.1 
                }}
                className="flex justify-center mb-6 relative"
              >
                <motion.div 
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-[#22C55E] via-[#10B981] to-[#16A34A] flex items-center justify-center shadow-2xl relative"
                  animate={{ 
                    boxShadow: [
                      '0 0 20px #22C55E80',
                      '0 0 40px #22C55E80',
                      '0 0 20px #22C55E80'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Outer Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-emerald-300/50"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <CheckCircle2 className="w-12 h-12 text-white relative z-10" />
                </motion.div>
              </motion.div>

              {/* Title with Gradient */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="bg-gradient-to-r from-[#005AA7] via-[#0077BB] to-[#00C6FF] bg-clip-text text-transparent mb-3 flex items-center justify-center gap-2">
                  <FileText className="w-6 h-6 text-[#005AA7]" />
                  Report Processing
                </h3>
              </motion.div>
              
              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-gray-800 mb-2 font-medium">
                  Your report is being generated...
                </p>
                <p className="text-gray-600 text-sm mb-6">
                  Applying filters and fetching data from database
                </p>
              </motion.div>

              {/* Loading Animation with Progress */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                {/* Dots Animation */}
                <div className="flex justify-center mb-4 gap-2">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0.3, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: i * 0.15
                      }}
                      className="w-3 h-3 rounded-full bg-gradient-to-r from-[#005AA7] to-[#00C6FF]"
                      style={{
                        boxShadow: '0 0 10px #00C6FF80'
                      }}
                    />
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                    className="h-full bg-gradient-to-r from-[#22C55E] via-[#10B981] to-[#16A34A] rounded-full"
                    style={{
                      boxShadow: '0 0 10px #22C55E80'
                    }}
                  />
                </div>

                {/* Status Text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs text-gray-600 mt-3 font-medium"
                >
                  ✓ Filters applied • Processing data...
                </motion.p>
              </motion.div>

              {/* OK Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button 
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-[#22C55E] via-[#10B981] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white cursor-pointer shadow-xl font-semibold h-12 text-base"
                  style={{
                    boxShadow: '0 4px 20px #22C55E60'
                  }}
                >
                  ✓ OK
                </Button>
              </motion.div>

              {/* Bottom decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#005AA7] via-[#00C6FF] to-[#005AA7]"></div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}