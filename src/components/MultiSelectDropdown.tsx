import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function MultiSelectDropdown({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = 'Select options'
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter(v => v !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  const selectAll = () => {
    onChange(options);
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <label className="block text-sm text-[#005AA7]">
        {label}
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-[#00C6FF]/30 rounded-lg text-left flex items-center justify-between hover:border-[#00C6FF]/50 transition-all focus:outline-none focus:ring-2 focus:ring-[#00C6FF]/30"
        >
          <span className="text-sm text-gray-700 truncate">
            {selectedValues.length === 0
              ? placeholder
              : selectedValues.length === options.length
              ? 'All Selected'
              : `${selectedValues.length} selected`}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-[#005AA7]" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-2xl border border-[#00C6FF]/30 max-h-64 overflow-hidden"
            >
              {/* Select All / Clear All */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gradient-to-r from-[#005AA7]/5 to-[#00C6FF]/5">
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-xs text-[#005AA7] hover:underline"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs text-gray-500 hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Options List */}
              <div className="overflow-y-auto max-h-52">
                {options.map((option, index) => {
                  const isSelected = selectedValues.includes(option);
                  return (
                    <motion.button
                      key={option}
                      type="button"
                      onClick={() => toggleOption(option)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gradient-to-r hover:from-[#005AA7]/10 hover:to-[#00C6FF]/10 transition-all ${
                        isSelected ? 'bg-gradient-to-r from-[#005AA7]/5 to-[#00C6FF]/5' : ''
                      }`}
                    >
                      {/* Custom Checkbox */}
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#005AA7] to-[#00C6FF] border-[#005AA7]'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          >
                            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                          </motion.div>
                        )}
                      </div>
                      
                      <span className={`text-sm flex-1 text-left ${
                        isSelected ? 'text-[#005AA7]' : 'text-gray-700'
                      }`}>
                        {option}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Items Display */}
      {selectedValues.length > 0 && selectedValues.length < options.length && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-wrap gap-2 pt-2"
        >
          {selectedValues.map((value) => (
            <span
              key={value}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[#005AA7]/10 to-[#00C6FF]/10 text-[#005AA7] rounded-md text-xs border border-[#00C6FF]/20"
            >
              {value}
              <button
                type="button"
                onClick={() => toggleOption(value)}
                className="hover:text-red-500 transition-colors"
              >
                ×
              </button>
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
