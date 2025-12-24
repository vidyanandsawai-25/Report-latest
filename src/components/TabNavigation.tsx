import { motion } from 'motion/react';

interface TabNavigationProps {
  activeSubTab: 'engine' | 'collection' | 'crm' | 'quick';
  onSubTabChange: (tab: 'engine' | 'collection' | 'crm' | 'quick') => void;
}

export function TabNavigation({ activeSubTab, onSubTabChange }: TabNavigationProps) {
  const subTabs = [
    { id: 'engine', label: 'Quallity Assessment', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'collection', label: 'Collection Report', gradient: 'from-emerald-500 to-green-500' },
    { id: 'crm', label: 'CRM Report', gradient: 'from-amber-500 to-orange-500' },
    { id: 'quick', label: 'Quick Reports', gradient: 'from-purple-500 to-pink-500' }
  ];

  return (
    <div className="px-4 md:px-6 py-3 bg-white/70 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-20">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {subTabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onSubTabChange(tab.id as 'engine' | 'collection' | 'crm' | 'quick')}
            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl cursor-pointer transition-all whitespace-nowrap relative overflow-hidden text-sm md:text-base ${
              activeSubTab === tab.id
                ? 'bg-gradient-to-r text-white shadow-lg'
                : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-md'
            }`}
            style={{
              backgroundImage: activeSubTab === tab.id 
                ? `linear-gradient(to right, var(--tw-gradient-stops))` 
                : 'none'
            }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            {activeSubTab === tab.id && (
              <motion.div
                layoutId="activeSubTab"
                className={`absolute inset-0 bg-gradient-to-r ${tab.gradient}`}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 font-medium">{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}