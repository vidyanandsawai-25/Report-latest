import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect, ReactNode } from 'react';

interface MultiSelectCheckboxDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  icon?: ReactNode;
}

export function MultiSelectCheckboxDropdown({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = 'Select options',
  icon
}: MultiSelectCheckboxDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

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

  const displayText = selectedValues.length === 0 
    ? placeholder 
    : selectedValues.length === 1 
    ? selectedValues[0] 
    : `${selectedValues.length} selected`;

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="mb-1.5 block text-sm text-gray-900 flex items-center gap-2">
        {icon}
        {label}
      </label>
      
      {/* Dropdown Trigger */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.002 }}
        whileTap={{ scale: 0.998 }}
        className={`w-full h-10 px-4 py-2 border-2 rounded-lg outline-none transition-all flex items-center justify-between cursor-pointer ${
          isOpen 
            ? 'border-[#005AA7] bg-white' 
            : 'border-gray-200 hover:border-[#005AA7] bg-white'
        }`}
      >
        <span className={`truncate text-left text-sm ${selectedValues.length === 0 ? 'text-gray-400' : 'text-gray-900'}`}>
          {displayText}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0 ml-2" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute z-[100] w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="max-h-64 overflow-y-auto p-2">
              {options.map((option, index) => {
                const isSelected = selectedValues.includes(option);
                
                return (
                  <motion.button
                    key={option}
                    type="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                    onClick={() => toggleOption(option)}
                    className={`w-full px-3 py-2.5 flex items-center gap-2.5 cursor-pointer transition-all rounded-md text-sm ${
                      isSelected
                        ? 'bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected
                          ? 'bg-white border-gray-400'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                          <Check className="w-3 h-3 text-[#005AA7]" strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                    
                    <span className="flex-1 text-left text-gray-700">{option}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}