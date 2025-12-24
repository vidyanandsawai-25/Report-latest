import { motion, AnimatePresence } from 'motion/react';
import { FileText, Droplet, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import logoImage from 'figma:asset/2ace7e0bf1082044c0cdc8f0827b8cabf2f06a0c.png';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      initial={{ width: 72 }}
      animate={{ width: isExpanded ? 256 : 72 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 bottom-0 text-white shadow-2xl z-50 flex-col hidden md:flex overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1e88e5 0%, #1565c0 50%, #0d47a1 100%)',
        boxShadow: '4px 0 32px rgba(0, 0, 0, 0.4), inset -1px 0 0 rgba(255, 255, 255, 0.2)'
      }}
    >
      {/* Subtle Pattern Overlay - very light */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 0%, transparent 50%)
            `
          }}
        />
      </div>

      {/* Logo Section */}
      <div className="p-4 border-b border-white/30 relative z-20" style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)'
      }}>
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg p-1 relative overflow-hidden"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.5)'
            }}
          >
            {/* Shimmer effect on logo */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            />
            <img 
              src={logoImage} 
              alt="Maharashtra Logo" 
              className="w-full h-full object-contain relative z-10"
            />
          </motion.div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1"
              >
                <h2 className="text-white whitespace-nowrap font-bold" style={{
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}>Water Portal</h2>
                <p className="text-white/80 text-xs whitespace-nowrap">Maharashtra Govt.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Menu - Only Reports */}
      <nav className="flex-1 p-4 relative z-10 space-y-2">
        <motion.button
          onClick={() => onTabChange('reports')}
          whileHover={{ x: 5, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl cursor-pointer relative overflow-hidden group transition-all duration-300 ${
            activeTab === 'reports' 
              ? 'bg-white/25 shadow-xl backdrop-blur-md' 
              : 'hover:bg-white/10'
          }`}
          style={{
            boxShadow: activeTab === 'reports' 
              ? '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.3)' 
              : 'none'
          }}
        >
          {/* Animated background gradient */}
          {activeTab === 'reports' && (
            <>
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-br from-white/20 via-[#00C6FF]/20 to-white/10"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 border-2 border-white/40 rounded-xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.2, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </>
          )}
          
          <div 
            className={`w-10 h-10 rounded-lg flex items-center justify-center relative z-10 flex-shrink-0 transition-all duration-300 ${
              activeTab === 'reports' 
                ? 'bg-white/40 shadow-lg' 
                : 'bg-white/15 group-hover:bg-white/20'
            }`}
            style={{ 
              boxShadow: activeTab === 'reports' 
                ? '0 4px 16px rgba(255, 255, 255, 0.25), 0 0 20px rgba(0, 198, 255, 0.3)' 
                : '0 2px 8px rgba(0, 0, 0, 0.1)' 
            }}
          >
            <motion.div
              animate={activeTab === 'reports' ? {
                rotate: [0, -10, 10, -10, 0]
              } : {}}
              transition={{
                duration: 0.5,
                ease: "easeInOut"
              }}
            >
              <FileText className="w-5 h-5 text-white" style={{
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
              }} />
            </motion.div>
          </div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.span 
                className="relative z-10 whitespace-nowrap text-white font-semibold"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }}
              >
                Reports
              </motion.span>
            )}
          </AnimatePresence>
          
          {/* Indicator dot with glow */}
          {activeTab === 'reports' && (
            <motion.div
              layoutId="indicator"
              className="absolute right-3 w-2.5 h-2.5 rounded-full bg-white"
              style={{ 
                boxShadow: '0 0 12px rgba(255,255,255,0.8), 0 0 4px rgba(0, 198, 255, 0.6)' 
              }}
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
          
          {/* Hover shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut"
            }}
          />
        </motion.button>

        {/* SMS Manager Tab */}
        <motion.button
          onClick={() => onTabChange('sms')}
          whileHover={{ x: 5, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl cursor-pointer relative overflow-hidden group transition-all duration-300 ${
            activeTab === 'sms' 
              ? 'bg-white/25 shadow-xl backdrop-blur-md' 
              : 'hover:bg-white/10'
          }`}
          style={{
            boxShadow: activeTab === 'sms' 
              ? '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.3)' 
              : 'none'
          }}
        >
          {/* Animated background gradient */}
          {activeTab === 'sms' && (
            <>
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-br from-white/20 via-[#00B894]/20 to-white/10"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 border-2 border-white/40 rounded-xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.2, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </>
          )}
          
          <div 
            className={`w-10 h-10 rounded-lg flex items-center justify-center relative z-10 flex-shrink-0 transition-all duration-300 ${
              activeTab === 'sms' 
                ? 'bg-white/40 shadow-lg' 
                : 'bg-white/15 group-hover:bg-white/20'
            }`}
            style={{ 
              boxShadow: activeTab === 'sms' 
                ? '0 4px 16px rgba(255, 255, 255, 0.25), 0 0 20px rgba(0, 184, 148, 0.3)' 
                : '0 2px 8px rgba(0, 0, 0, 0.1)' 
            }}
          >
            <motion.div
              animate={activeTab === 'sms' ? {
                scale: [1, 1.1, 1]
              } : {}}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                repeat: activeTab === 'sms' ? Infinity : 0,
                repeatDelay: 2
              }}
            >
              <MessageSquare className="w-5 h-5 text-white" style={{
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
              }} />
            </motion.div>
          </div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.span 
                className="relative z-10 whitespace-nowrap text-white font-semibold"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }}
              >
                SMS Manager
              </motion.span>
            )}
          </AnimatePresence>
          
          {/* Indicator dot with glow */}
          {activeTab === 'sms' && (
            <motion.div
              layoutId="indicator"
              className="absolute right-3 w-2.5 h-2.5 rounded-full bg-white"
              style={{ 
                boxShadow: '0 0 12px rgba(255,255,255,0.8), 0 0 4px rgba(0, 184, 148, 0.6)' 
              }}
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
          
          {/* Hover shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut"
            }}
          />
        </motion.button>
      </nav>

      {/* Bottom Accent Bar */}
      <div className="p-4 border-t border-white/20 relative z-10">
        <motion.div
          className="h-1 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.aside>
  );
}