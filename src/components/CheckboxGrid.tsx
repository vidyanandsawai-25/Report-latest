import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface CheckboxGridProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  columns?: number;
  bgColor?: 'blue' | 'green' | 'purple' | 'orange';
}

export function CheckboxGrid({
  label,
  options,
  selectedValues,
  onChange,
  columns = 2,
  bgColor = 'blue'
}: CheckboxGridProps) {
  
  const toggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter(v => v !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  const bgColorClasses = {
    blue: 'bg-gradient-to-br from-blue-200 to-cyan-200 border-blue-400',
    green: 'bg-gradient-to-br from-green-200 to-emerald-200 border-green-400',
    purple: 'bg-gradient-to-br from-purple-200 to-pink-200 border-purple-400',
    orange: 'bg-gradient-to-br from-orange-200 to-amber-200 border-orange-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-5 rounded-2xl border-2 ${bgColorClasses[bgColor]}`}
    >
      <h4 className="text-gray-900 mb-4">{label}</h4>
      
      <div className={`grid gap-3`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {options.map((option, index) => {
          const isSelected = selectedValues.includes(option);
          
          return (
            <motion.button
              key={option}
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => toggleOption(option)}
              className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white border-[#005AA7] shadow-md'
                  : 'bg-white/60 border-gray-200 hover:border-gray-300 hover:bg-white/80'
              }`}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Custom Checkbox */}
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#005AA7] to-[#00C6FF] border-[#005AA7]'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </div>
              
              <span className={`text-sm ${isSelected ? 'text-[#005AA7]' : 'text-gray-700'}`}>
                {option}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}