import { motion, AnimatePresence } from 'motion/react';
import { Search, Mic, Sparkles, X } from 'lucide-react';
import { Input } from './ui/input';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const aiSuggestions = [
    'Daily collection report for Ward 1',
    'Top 10 defaulters this month',
    'Payment mode analysis last week',
    'Revenue summary October 2024',
    'Pending readings in Zone A',
    'Monthly collection trends',
  ];

  useEffect(() => {
    if (value.length > 2) {
      const filtered = aiSuggestions.filter(s => 
        s.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 3));
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [value]);

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    // Simulate voice input
    setTimeout(() => {
      setIsListening(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={`px-4 md:px-6 bg-white/60 backdrop-blur-lg border-b border-gray-200 transition-all duration-300 ${
        showSuggestions ? 'py-4 pb-52' : 'py-4'
      }`}
    >
      
    </motion.div>
  );
}