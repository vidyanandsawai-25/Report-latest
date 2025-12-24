import { motion } from 'motion/react';
import { BarChart3, Database, Filter } from 'lucide-react';

interface EngineTabNavigationProps {
  activeEngineTab: 'reports' | 'data';
  onEngineTabChange: (tab: 'reports' | 'data') => void;
  onFilterClick: () => void;
}

export function EngineTabNavigation({ activeEngineTab, onEngineTabChange, onFilterClick }: EngineTabNavigationProps) {
  const engineTabs = [
    { 
      id: 'reports', 
      label: 'Report Engine', 
      icon: BarChart3,
      gradient: 'from-[#005AA7] to-[#00C6FF]',
      description: 'Generate comprehensive reports'
    },
    { 
      id: 'data', 
      label: 'Data Mitra', 
      icon: Database,
      gradient: 'from-[#667eea] to-[#764ba2]',
      description: 'Download Any Report Any Time'
    }
  ];

  return (
    <div className="px-4 md:px-6 pt-6 pb-4 bg-gradient-to-r from-blue-50 via-white to-blue-50 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-30">
      {/* Container with flex layout */}
      <div className="flex items-center justify-between gap-4">
        {/* Left: Tabs */}
        <div className="flex items-center justify-center gap-4 md:gap-6 p-[0px]">
          {engineTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => onEngineTabChange(tab.id as 'reports' | 'data')}
                className={`group relative flex items-center gap-3 px-6 md:px-8 py-2 md:py-3 rounded-xl cursor-pointer transition-all whitespace-nowrap overflow-hidden ${
                  activeEngineTab === tab.id
                    ? 'bg-gradient-to-r text-white shadow-lg'
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-300 hover:border-blue-400'
                }`}
                style={activeEngineTab === tab.id ? {
                  boxShadow: '0 4px 12px -2px rgba(0, 90, 167, 0.25)'
                } : {}}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {activeEngineTab === tab.id && (
                  <motion.div
                    layoutId="activeEngineTab"
                    className={`absolute inset-0 bg-gradient-to-r ${tab.gradient}`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                
                {/* Shimmer effect on active tab */}
                {activeEngineTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: 'easeInOut'
                    }}
                  />
                )}
                
                {/* Icon */}
                <div className="relative z-10">
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${
                    activeEngineTab === tab.id 
                      ? 'text-white' 
                      : 'text-gray-600 group-hover:text-blue-600'
                  }`} />
                </div>
                
                {/* Label and Description */}
                <div className="relative z-10 text-left">
                  <div className={`font-semibold text-sm md:text-base ${
                    activeEngineTab === tab.id 
                      ? 'text-white' 
                      : 'text-gray-900'
                  }`}>
                    {tab.label}
                  </div>
                  <div className={`text-[10px] md:text-xs mt-0.5 hidden sm:block ${
                    activeEngineTab === tab.id 
                      ? 'text-white/90' 
                      : 'text-gray-500'
                  }`}>
                    {tab.description}
                  </div>
                </div>

                {/* Hover glow for inactive tabs */}
                {activeEngineTab !== tab.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/3 group-hover:to-blue-500/5 transition-all duration-500"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Right: Filter Button */}
        <motion.button
          onClick={onFilterClick}
          className="group relative flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-200%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut'
            }}
          />
          
          <Filter className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
          <span className="relative z-10 font-semibold text-sm md:text-base hidden sm:inline">Download Log</span>
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-white/20 blur-xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.button>
      </div>
    </div>
  );
}