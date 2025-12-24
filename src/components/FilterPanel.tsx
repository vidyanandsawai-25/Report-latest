import { motion, AnimatePresence } from 'motion/react';
import { X, Filter, Sparkles, Calendar, Search, AlertTriangle, RotateCcw, CheckCircle2, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState, useEffect } from 'react';
import { MultiSelectCheckboxDropdown } from './MultiSelectCheckboxDropdown';
import { generateTopDefaultersPDF } from '../utils/topDefaultersPDF';
import { formatDate } from '../src/lib/utils/format';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  reportName: string | null;
  onSearch: () => void;
}

export function FilterPanel({ isOpen, onClose, reportName, onSearch }: FilterPanelProps) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedWards, setSelectedWards] = useState<string[]>([]);
  const [selectedTapSizes, setSelectedTapSizes] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [connectionType, setConnectionType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showClearAnimation, setShowClearAnimation] = useState(false);
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);
  const [topNo, setTopNo] = useState('');
  const [amountFrom, setAmountFrom] = useState('');
  const [amountTo, setAmountTo] = useState('');
  const [financialYear, setFinancialYear] = useState('');
  const [yearType, setYearType] = useState('');

  // Calculate filter count
  const filterCount = 
    selectedZones.length + 
    selectedWards.length + 
    selectedTapSizes.length +
    (category ? 1 : 0) + 
    (connectionType ? 1 : 0) + 
    (fromDate ? 1 : 0) + 
    (toDate ? 1 : 0) +
    (topNo ? 1 : 0) +
    (amountFrom || amountTo ? 1 : 0) +
    (financialYear ? 1 : 0) +
    (yearType ? 1 : 0);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        handleCancelClick();
      } else if (e.key === 'Enter' && e.ctrlKey) {
        handleSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSearch = () => {
    // Normal flow - show table for all reports including Top Defaulter
    onSearch();
    onClose();
  };

  const handleCancelClick = () => {
    // Directly close without confirmation popup
    onClose();
  };

  const handleConfirmCancel = () => {
    setShowCancelConfirm(false);
    onClose();
  };

  const handleCancelClose = () => {
    setShowCancelConfirm(false);
  };

  const handleClearAll = () => {
    setShowClearAnimation(true);
    setTimeout(() => {
      setSelectedZones([]);
      setSelectedWards([]);
      setSelectedTapSizes([]);
      setCategory('');
      setConnectionType('');
      setFromDate('');
      setToDate('');
      setTopNo('');
      setAmountFrom('');
      setAmountTo('');
      setFinancialYear('');
      setYearType('');
      setShowClearAnimation(false);
    }, 300);
  };

  const toggleZone = (zone: string) => {
    setSelectedZones(prev => 
      prev.includes(zone) 
        ? prev.filter(z => z !== zone)
        : [...prev, zone]
    );
  };

  const toggleWard = (ward: string) => {
    if (ward === 'All Wards') {
      if (selectedWards.includes('All Wards')) {
        setSelectedWards([]);
      } else {
        setSelectedWards(['All Wards']);
      }
    } else {
      setSelectedWards(prev => {
        const newWards = prev.includes(ward)
          ? prev.filter(w => w !== ward && w !== 'All Wards')
          : [...prev.filter(w => w !== 'All Wards'), ward];
        return newWards;
      });
    }
  };

  const toggleTapSize = (tapSize: string) => {
    setSelectedTapSizes(prev => 
      prev.includes(tapSize) 
        ? prev.filter(t => t !== tapSize)
        : [...prev, tapSize]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with particle effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-black/60 via-blue-900/30 to-black/60 backdrop-blur-md z-40"
          >
            {/* Animated particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
                animate={{
                  x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                  y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </motion.div>

          {/* Centered Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl z-50 border-4 border-[#005AA7]/20 flex flex-col"
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-[#005AA7] to-[#00C6FF] p-6 pb-5 relative overflow-hidden rounded-[19px]">
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  >
                    <Filter className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white flex items-center gap-2">
                      Report Filters
                      <Sparkles className="w-5 h-5 text-cyan-200" />
                      {filterCount > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-2.5 py-0.5 bg-yellow-400 text-[#005AA7] rounded-full text-xs ml-2 shadow-lg"
                        >
                          {filterCount} active
                        </motion.span>
                      )}
                    </h3>
                    <p className="text-white/90 text-sm mt-0.5">{reportName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Clear All Button */}
                  {filterCount > 0 && (
                    <motion.button
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleClearAll}
                      className="w-10 h-10 rounded-xl bg-orange-500/90 hover:bg-orange-600 flex items-center justify-center cursor-pointer transition-all shadow-lg"
                      title="Clear all filters"
                    >
                      <RotateCcw className="w-5 h-5 text-white" />
                    </motion.button>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCancelClick}
                    className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center cursor-pointer transition-all"
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Keyboard shortcuts hint */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-3 flex items-center gap-3 text-white/70 text-xs relative z-10"
              >
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 bg-white/20 rounded">ESC</kbd>
                  <span>to close</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 bg-white/20 rounded">Ctrl+Enter</kbd>
                  <span>to search</span>
                </div>
              </motion.div>
            </div>

            {/* Quick Presets Section */}
            

            {/* Filter Content - Compact Grid Layout */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
              <AnimatePresence mode="wait">
                {showClearAnimation ? (
                  <motion.div
                    key="clearing"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center justify-center py-20"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5, ease: "linear" }}
                    >
                      <RotateCcw className="w-12 h-12 text-[#005AA7]" />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="filters"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* Mandatory Fields - Always Visible */}
                    <div className="mb-5">
                      <h4 className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                        <span className="text-red-500">*</span>
                        Required Fields
                      </h4>
                      <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                        {/* Zone Selection - Mandatory */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 }}
                          className="relative"
                        >
                          <div className="absolute -top-1 left-12 z-10 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
                            Required
                          </div>
                          {selectedZones.length > 0 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10"
                            >
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                          <MultiSelectCheckboxDropdown
                            label={<span className="flex items-center gap-1">Zone <span className="text-red-500 text-base">*</span></span>}
                            options={['Zone A', 'Zone B', 'Zone C', 'Zone D']}
                            selectedValues={selectedZones}
                            onChange={setSelectedZones}
                            placeholder="Select zones (Required)"
                          />
                        </motion.div>

                        {/* Ward Selection - Mandatory */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="relative"
                        >
                          <div className="absolute -top-1 left-16 z-10 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
                            Required
                          </div>
                          {selectedWards.length > 0 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10"
                            >
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                          <MultiSelectCheckboxDropdown
                            label={<span className="flex items-center gap-1">Ward No <span className="text-red-500 text-base">*</span></span>}
                            options={['All Wards', 'Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5']}
                            selectedValues={selectedWards}
                            onChange={setSelectedWards}
                            placeholder="Select wards (Required)"
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* Top No and Amount - Only for Top Defaulters */}
                    {reportName === 'Top Defaulter' && (
                      <div className="mb-5 pb-4 border-b border-gray-200">
                        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                          {/* Top No */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12 }}
                            className="relative"
                          >
                            {topNo && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10"
                              >
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                            <Label className="mb-2 block text-gray-900 text-sm">Top No</Label>
                            <Select value={topNo} onValueChange={setTopNo}>
                              <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-10">
                                <SelectValue placeholder="Select top number" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="5">Top 5</SelectItem>
                                <SelectItem value="10">Top 10</SelectItem>
                                <SelectItem value="20">Top 20</SelectItem>
                                <SelectItem value="50">Top 50</SelectItem>
                                <SelectItem value="100">Top 100</SelectItem>
                              </SelectContent>
                            </Select>
                          </motion.div>

                          {/* Amount */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.14 }}
                            className="relative"
                          >
                            {amountFrom && amountTo && parseInt(amountFrom) > parseInt(amountTo) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full z-10"
                              >
                                Invalid
                              </motion.div>
                            )}
                            {amountFrom && amountTo && parseInt(amountFrom) <= parseInt(amountTo) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10"
                              >
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                            {(amountFrom || amountTo) && !(amountFrom && amountTo) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center z-10"
                              >
                                <AlertTriangle className="w-3.5 h-3.5 text-white" />
                              </motion.div>
                            )}
                            <Label className="mb-2 block text-gray-900 text-sm">Amount Range (₹)</Label>
                            <div className="flex items-center gap-2">
                              <input 
                                type="number"
                                value={amountFrom}
                                onChange={(e) => setAmountFrom(e.target.value)}
                                placeholder="min"
                                className="w-full h-10 px-3 py-2 border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#005AA7] focus:border-[#005AA7] bg-white text-gray-800 transition-all"
                              />
                              <span className="text-gray-500 text-sm">to</span>
                              <input 
                                type="number"
                                value={amountTo}
                                onChange={(e) => setAmountTo(e.target.value)}
                                placeholder="max"
                                className="w-full h-10 px-3 py-2 border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#005AA7] focus:border-[#005AA7] bg-white text-gray-800 transition-all"
                              />
                            </div>
                            {amountFrom && amountTo && parseInt(amountFrom) > parseInt(amountTo) && (
                              <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-xs mt-1 flex items-center gap-1"
                              >
                                <AlertTriangle className="w-3 h-3" />
                                "From" amount must be less than "To" amount
                              </motion.p>
                            )}
                          </motion.div>
                        </div>
                      </div>
                    )}

                    {/* Additional Filters Toggle */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="mb-4 border-t border-gray-200 pt-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowAdditionalFilters(!showAdditionalFilters)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer w-full md:w-auto"
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${showAdditionalFilters ? 'border-blue-600 bg-blue-600' : 'border-gray-400 bg-white'}`}>
                          {showAdditionalFilters && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 rounded-full bg-white"
                            />
                          )}
                        </div>
                        <Label className="cursor-pointer text-gray-900 text-sm font-semibold flex items-center gap-2">
                          <Filter className="w-3.5 h-3.5 text-blue-600" />
                          Additional Filters
                        </Label>
                        <motion.div
                          animate={{ rotate: showAdditionalFilters ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-auto"
                        >
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.div>
                      </motion.button>
                    </motion.div>

                    {/* Additional Filters - Collapsible */}
                    <AnimatePresence>
                      {showAdditionalFilters && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-4 pt-3 border-t border-blue-100">
                            {/* Category, Connection Type, and Select Tap Size in one row */}
                            <div className="grid md:grid-cols-3 gap-x-4 gap-y-4">
                              {/* Category */}
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="relative"
                              >
                                {category && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                  </motion.div>
                                )}
                                <Label className="mb-2 block text-gray-900 text-sm">Category</Label>
                                <Select value={category} onValueChange={setCategory}>
                                  <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-10">
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="residential">Residential</SelectItem>
                                    <SelectItem value="commercial">Commercial</SelectItem>
                                    <SelectItem value="industrial">Industrial</SelectItem>
                                  </SelectContent>
                                </Select>
                              </motion.div>

                              {/* Connection Type */}
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="relative"
                              >
                                {connectionType && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                  </motion.div>
                                )}
                                <Label className="mb-2 block text-gray-900 text-sm">Connection Type</Label>
                                <Select value={connectionType} onValueChange={setConnectionType}>
                                  <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-10">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="metered">Metered</SelectItem>
                                    <SelectItem value="non-metered">Non-Metered</SelectItem>
                                  </SelectContent>
                                </Select>
                              </motion.div>

                              {/* Select Tap Size */}
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="relative"
                              >
                                {selectedTapSizes.length > 0 && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                  </motion.div>
                                )}
                                <Label className="mb-2 block text-gray-900 text-sm">Select Tap Size</Label>
                                <Select 
                                  value={selectedTapSizes.length > 0 ? selectedTapSizes[0] : ''} 
                                  onValueChange={(value) => {
                                    if (value) {
                                      setSelectedTapSizes([value]);
                                    } else {
                                      setSelectedTapSizes([]);
                                    }
                                  }}
                                >
                                  <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-10">
                                    <SelectValue placeholder="Select tap size" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="all">All Sizes</SelectItem>
                                    <SelectItem value="15mm">15mm</SelectItem>
                                    <SelectItem value="20mm">20mm</SelectItem>
                                    <SelectItem value="25mm">25mm</SelectItem>
                                    <SelectItem value="32mm">32mm</SelectItem>
                                    <SelectItem value="40mm">40mm</SelectItem>
                                    <SelectItem value="50mm">50mm</SelectItem>
                                    <SelectItem value="75mm">75mm</SelectItem>
                                    <SelectItem value="100mm">100mm</SelectItem>
                                  </SelectContent>
                                </Select>
                              </motion.div>
                            </div>

                            {/* From Date, To Date, Financial Year, Year Type */}
                            {reportName === 'Top Defaulter' ? (
                              // For Top Defaulter: All 4 fields in one row
                              <div className="grid md:grid-cols-4 gap-x-4 gap-y-4">
                                {/* From Date */}
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.25 }}
                                  className="relative"
                                >
                                  {fromDate && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-white" />
                                    </motion.div>
                                  )}
                                  <Label className="mb-2 block text-gray-900 text-sm flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    From Date
                                  </Label>
                                  <div className="relative group">
                                    <input 
                                      type="date"
                                      value={fromDate}
                                      onChange={(e) => setFromDate(e.target.value)}
                                      className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#005AA7] focus:border-[#005AA7] cursor-pointer bg-gradient-to-br from-white to-blue-50/30 text-gray-800 transition-all hover:border-blue-300 hover:shadow-md [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                      style={{ colorScheme: 'light' }}
                                    />
                                  </div>
                                </motion.div>

                                {/* To Date */}
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.3 }}
                                  className="relative"
                                >
                                  {toDate && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-white" />
                                    </motion.div>
                                  )}
                                  <Label className="mb-2 block text-gray-900 text-sm flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-purple-600" />
                                    To Date
                                  </Label>
                                  <div className="relative group">
                                    <input 
                                      type="date"
                                      value={toDate}
                                      onChange={(e) => setToDate(e.target.value)}
                                      min={fromDate}
                                      className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 cursor-pointer bg-gradient-to-br from-white to-purple-50/30 text-gray-800 transition-all hover:border-purple-300 hover:shadow-md [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                      style={{ colorScheme: 'light' }}
                                    />
                                  </div>
                                </motion.div>

                                {/* Select Financial Year */}
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.35 }}
                                  className="relative"
                                >
                                  {financialYear && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-white" />
                                    </motion.div>
                                  )}
                                  <Label className="mb-2 block text-gray-900 text-sm">Financial Year</Label>
                                  <Select value={financialYear} onValueChange={setFinancialYear}>
                                    <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-11">
                                      <SelectValue placeholder="Select FY" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="2024-25">2024-25</SelectItem>
                                      <SelectItem value="2023-24">2023-24</SelectItem>
                                      <SelectItem value="2022-23">2022-23</SelectItem>
                                      <SelectItem value="2021-22">2021-22</SelectItem>
                                      <SelectItem value="2020-21">2020-21</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </motion.div>

                                {/* Year Type */}
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.4 }}
                                  className="relative"
                                >
                                  {yearType && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-white" />
                                    </motion.div>
                                  )}
                                  <Label className="mb-2 block text-gray-900 text-sm">Year Type</Label>
                                  <Select value={yearType} onValueChange={setYearType}>
                                    <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-11">
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="all">All</SelectItem>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="current">Current</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </motion.div>
                              </div>
                            ) : (
                              // For other reports: Only From Date and To Date in 2 columns
                              <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                                {/* From Date */}
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.25 }}
                                  className="relative"
                                >
                                  {fromDate && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-white" />
                                    </motion.div>
                                  )}
                                  <Label className="mb-2 block text-gray-900 text-sm flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    From Date
                                  </Label>
                                  <div className="relative group">
                                    <input 
                                      type="date"
                                      value={fromDate}
                                      onChange={(e) => setFromDate(e.target.value)}
                                      className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#005AA7] focus:border-[#005AA7] cursor-pointer bg-gradient-to-br from-white to-blue-50/30 text-gray-800 transition-all hover:border-blue-300 hover:shadow-md [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                      style={{ colorScheme: 'light' }}
                                    />
                                  </div>
                                </motion.div>

                                {/* To Date */}
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.3 }}
                                  className="relative"
                                >
                                  {toDate && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-white" />
                                    </motion.div>
                                  )}
                                  <Label className="mb-2 block text-gray-900 text-sm flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-purple-600" />
                                    To Date
                                  </Label>
                                  <div className="relative group">
                                    <input 
                                      type="date"
                                      value={toDate}
                                      onChange={(e) => setToDate(e.target.value)}
                                      min={fromDate}
                                      className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 cursor-pointer bg-gradient-to-br from-white to-purple-50/30 text-gray-800 transition-all hover:border-purple-300 hover:shadow-md [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                      style={{ colorScheme: 'light' }}
                                    />
                                  </div>
                                </motion.div>
                              </div>
                            )}

                            {/* Date Range Quick Buttons */}
                            {(fromDate || toDate) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 border border-blue-100"
                              >
                                <div className="flex items-center gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                  <span className="text-gray-700">
                                    Date range selected: 
                                    {fromDate && <span className="font-semibold ml-1">{formatDate(fromDate)}</span>}
                                    {fromDate && toDate && <span className="mx-1">→</span>}
                                    {toDate && <span className="font-semibold">{formatDate(toDate)}</span>}
                                  </span>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => {
                                    setFromDate('');
                                    setToDate('');
                                  }}
                                  className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Clear dates"
                                >
                                  <X className="w-4 h-4" />
                                </motion.button>
                              </motion.div>
                            )}

                            {/* Date Quick Selection Buttons */}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Filter Summary */}
              {filterCount > 0 && !showClearAnimation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    <span className="text-green-900">Filter Summary</span>
                  </div>
                  <div className="text-sm text-green-700">
                    <span className="font-semibold">{filterCount}</span> filter{filterCount > 1 ? 's' : ''} applied
                    {selectedZones.length > 0 && <span> • {selectedZones.length} zone{selectedZones.length > 1 ? 's' : ''}</span>}
                    {(fromDate || toDate) && <span> • Date range set</span>}
                    {selectedTapSizes.length > 0 && <span> • Tap size filter active</span>}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Action Buttons - Fixed Footer */}
            <div className="border-t-2 border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50/30 p-5 rounded-[32px]">
              <div className="grid md:grid-cols-3 gap-3">
                <motion.div 
                  whileHover={{ scale: 1.03, y: -2 }} 
                  whileTap={{ scale: 0.97 }}
                  className="relative"
                >
                  <Button 
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white cursor-pointer shadow-lg h-11 flex items-center justify-center gap-2 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      <span>✓</span>
                      <span className="text-sm">Show</span>
                    </span>
                  </Button>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.03, y: -2 }} 
                  whileTap={{ scale: 0.97 }}
                  className="relative"
                >
                  <Button 
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-[#005AA7] to-[#00C6FF] hover:from-[#004080] hover:to-[#0099CC] text-white cursor-pointer shadow-lg h-11 flex items-center justify-center gap-2 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      <span className="text-sm">Search</span>
                    </span>
                  </Button>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.03, y: -2 }} 
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    onClick={handleCancelClick}
                    variant="outline"
                    className="w-full border-2 border-red-500 text-red-600 hover:bg-red-50 cursor-pointer h-11 flex items-center justify-center gap-2"
                  >
                    <span className="flex items-center gap-2">
                      <X className="w-4 h-4" />
                      <span className="text-sm">Cancel</span>
                    </span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Cancel Confirmation Dialog */}
          <AnimatePresence>
            {showCancelConfirm && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 z-[60]"
                  onClick={handleCancelClose}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white rounded-2xl shadow-2xl z-[70] overflow-hidden"
                >
                  {/* Warning Header */}
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-center relative overflow-hidden">
                    {/* Animated pulse rings */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: [
                          'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 70%)',
                          'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, -10, 10, 0]
                      }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 shadow-lg relative z-10"
                    >
                      <AlertTriangle className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-white text-xl relative z-10">Confirm Cancel</h3>
                    <p className="text-white/90 text-sm mt-1 relative z-10">रद्द करण्याची पुष्टी करा</p>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-700 text-center mb-2">
                      Are you sure you want to cancel?
                    </p>
                    <p className="text-gray-600 text-sm text-center mb-6">
                      तुम्हाला खात्री आहे की तुम्ही रद्द करू इच्छिता?
                    </p>
                    {filterCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4"
                      >
                        <p className="text-orange-700 text-xs text-center">
                          <span className="font-semibold">{filterCount}</span> active filter{filterCount > 1 ? 's' : ''} will be cleared
                        </p>
                      </motion.div>
                    )}
                    <p className="text-gray-500 text-xs text-center">
                      All selected filters will be cleared.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-gray-200 p-4 bg-gray-50 grid grid-cols-2 gap-3">
                    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={handleCancelClose}
                        variant="outline"
                        className="w-full border-2 border-gray-300 hover:bg-gray-100 cursor-pointer h-11"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-sm">Go Back</span>
                          <span className="text-xs">/</span>
                          <span className="text-sm">परत जा</span>
                        </div>
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={handleConfirmCancel}
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white cursor-pointer shadow-lg h-11 relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-black/10"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="flex items-center justify-center gap-2 relative z-10">
                          <X className="w-4 h-4" />
                          <span className="text-sm">Yes, Cancel</span>
                        </div>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}