import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle, Maximize2, Edit3, TrendingUp, Zap, FileText, Calendar, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { useState } from 'react';
import { CheckboxGrid } from './CheckboxGrid';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { MultiSelectCheckboxDropdown } from './MultiSelectCheckboxDropdown';

interface AlterationReportFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: () => void;
  onExport: () => void;
}

export function AlterationReportFilter({ isOpen, onClose, onSearch, onExport }: AlterationReportFilterProps) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedWards, setSelectedWards] = useState<string[]>([]);
  const [selectedTapSizes, setSelectedTapSizes] = useState<string[]>([]);
  const [selectedConnectionTypes, setSelectedConnectionTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const zones = ['Zone 1 - Central', 'Zone 2 - East', 'Zone 3 - West', 'Zone 4 - North', 'Zone 5 - South'];
  const wards = ['Ward A', 'Ward B', 'Ward C', 'Ward D', 'Ward E', 'Ward F', 'Ward G', 'Ward H'];
  const tapSizes = ['15mm', '20mm', '25mm', '32mm', '40mm', '50mm'];
  const connectionTypes = ['Domestic', 'Commercial', 'Industrial', 'Institutional', 'Government'];
  const categories = ['Residential', 'Non-Residential', 'Mix Use', 'Bulk Supply', 'Temporary'];

  const alterationTypes = [
    {
      id: 'meter-size-increase',
      title: 'Meter Size Increase',
      description: 'Upgrade water meter size',
      icon: Maximize2,
      color: '#06B6D4',
      gradient: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'connection-upgrade',
      title: 'Connection Upgrade',
      description: 'Enhance connection capacity',
      icon: TrendingUp,
      color: '#10B981',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'category-upgrade',
      title: 'Category Upgrade',
      description: 'Upgrade service category',
      icon: Edit3,
      color: '#8B5CF6',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'capacity-increase',
      title: 'Capacity Increase',
      description: 'Increase water supply capacity',
      icon: Zap,
      color: '#F97316',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'all-wadhgat-reports',
      title: 'All Wadhgat Reports',
      description: 'View all increment reports',
      icon: FileText,
      color: '#6366F1',
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ];

  const handleSearch = () => {
    onSearch();
    onClose();
  };

  const handleCancelClick = () => {
    // Directly close without confirmation popup
    onClose();
  };

  const handleConfirmCancel = () => {
    setShowCancelConfirm(false);
    setSelectedType(null);
    setFromDate('');
    setToDate('');
    onClose();
  };

  const handleCancelClose = () => {
    setShowCancelConfirm(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-black/60 via-amber-900/20 to-black/60 backdrop-blur-md z-40"
          >
            {/* Animated particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border-4 border-amber-500/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#CA8A04] to-[#D97706] p-6 pb-5 relative overflow-hidden">
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20"
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
                    <Edit3 className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white text-xl">
                      Alteration Report
                    </h3>
                    <p className="text-white/90 text-sm mt-0.5">Select alteration type and date range</p>
                  </div>
                </div>
                
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

            {/* Content */}
            <div className="p-5 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Alteration Type Selection */}
              <div className="mb-5">
                <Label className="mb-3 block text-gray-900">Select Alteration Type *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {alterationTypes.map((type, index) => (
                    <motion.button
                      key={type.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.08, y: -4 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectedType(type.id)}
                      className={`relative p-4 rounded-2xl text-center cursor-pointer transition-all duration-300 group overflow-hidden ${
                        selectedType === type.id
                          ? 'shadow-2xl'
                          : 'shadow-md hover:shadow-xl'
                      }`}
                      style={{
                        background: selectedType === type.id 
                          ? `linear-gradient(135deg, ${type.color}20 0%, ${type.color}35 100%)`
                          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                        border: selectedType === type.id 
                          ? `3px solid ${type.color}` 
                          : '2px solid #e5e7eb',
                      }}
                    >
                      {/* Animated shine effect */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, transparent 0%, ${type.color}10 50%, transparent 100%)`,
                        }}
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut"
                        }}
                      />

                      {/* Glow effect for selected state */}
                      {selectedType === type.id && (
                        <>
                          <motion.div
                            className="absolute inset-0 rounded-2xl blur-xl"
                            style={{
                              background: `linear-gradient(135deg, ${type.color}40 0%, ${type.color}20 100%)`,
                            }}
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                              scale: [0.95, 1, 0.95],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          
                          {/* Pulsing ring */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl"
                            style={{
                              border: `2px solid ${type.color}`,
                            }}
                            animate={{
                              boxShadow: [
                                `0 0 0 0 ${type.color}60`,
                                `0 0 0 8px ${type.color}00`,
                              ]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeOut"
                            }}
                          />
                        </>
                      )}

                      <div className="relative z-10 flex flex-col items-center gap-3">
                        {/* Icon container with gradient background */}
                        <motion.div 
                          className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            selectedType === type.id
                              ? 'scale-110 shadow-lg'
                              : 'group-hover:scale-105'
                          }`}
                          style={{
                            background: selectedType === type.id
                              ? `linear-gradient(135deg, ${type.color} 0%, ${type.color}dd 100%)`
                              : `linear-gradient(135deg, ${type.color}15 0%, ${type.color}25 100%)`,
                          }}
                        >
                          <motion.div
                            animate={selectedType === type.id ? {
                              rotate: [0, -5, 5, -5, 0],
                            } : {}}
                            transition={{
                              duration: 0.5,
                              repeat: selectedType === type.id ? Infinity : 0,
                              repeatDelay: 3,
                            }}
                          >
                            <type.icon 
                              className={`w-7 h-7 transition-all duration-300 ${
                                selectedType === type.id ? 'text-white' : ''
                              }`}
                              style={{
                                color: selectedType === type.id ? '#ffffff' : type.color,
                              }}
                            />
                          </motion.div>
                        </motion.div>

                        {/* Title */}
                        <div className="text-center">
                          <h4 
                            className="text-sm leading-tight transition-all duration-300"
                            style={{
                              color: selectedType === type.id ? type.color : '#1F2937',
                              fontWeight: selectedType === type.id ? 700 : 600,
                            }}
                          >
                            {type.title}
                          </h4>
                        </div>
                      </div>

                      {/* Premium checkmark badge */}
                      {selectedType === type.id && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-xl z-20 border-2 border-white"
                          style={{
                            background: `linear-gradient(135deg, ${type.color} 0%, ${type.color}dd 100%)`,
                          }}
                        >
                          <motion.svg 
                            className="w-4 h-4 text-white" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            <motion.path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={3.5} 
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                        </motion.div>
                      )}

                      {/* Sparkle effect on hover */}
                      <motion.div
                        className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                        }}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Date Range Selection */}
              <div className="grid md:grid-cols-2 gap-4 bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-2xl border-2 border-purple-100 mb-5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label className="mb-2 block text-gray-900 text-sm">From Date *</Label>
                  <div className="relative">
                    <input 
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full h-10 px-3 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#CA8A04] focus:border-[#CA8A04] cursor-pointer bg-white text-gray-800 transition-all text-sm"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Label className="mb-2 block text-gray-900 text-sm">To Date *</Label>
                  <div className="relative">
                    <input 
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full h-10 px-3 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#CA8A04] focus:border-[#CA8A04] cursor-pointer bg-white text-gray-800 transition-all text-sm"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </motion.div>
              </div>

              {/* Additional Filters - All in 2 column grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <MultiSelectCheckboxDropdown
                  label="Select Zones"
                  options={zones}
                  selectedValues={selectedZones}
                  onChange={setSelectedZones}
                  placeholder="Select zones"
                />

                <MultiSelectCheckboxDropdown
                  label="Ward No"
                  options={wards}
                  selectedValues={selectedWards}
                  onChange={setSelectedWards}
                  placeholder="Select wards"
                />

                <MultiSelectCheckboxDropdown
                  label="Select Tap Sizes"
                  options={tapSizes}
                  selectedValues={selectedTapSizes}
                  onChange={setSelectedTapSizes}
                  placeholder="Select tap sizes"
                />

                <MultiSelectCheckboxDropdown
                  label="Connection Types"
                  options={connectionTypes}
                  selectedValues={selectedConnectionTypes}
                  onChange={setSelectedConnectionTypes}
                  placeholder="Select connection types"
                />

                <MultiSelectCheckboxDropdown
                  label="Categories"
                  options={categories}
                  selectedValues={selectedCategories}
                  onChange={setSelectedCategories}
                  placeholder="Select categories"
                />
              </div>
            </div>

            {/* Action Buttons - Fixed Footer */}
            <div className="border-t-2 border-gray-100 bg-gradient-to-r from-amber-50/50 to-yellow-50/50 p-5">
              <div className="grid md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                <motion.div 
                  whileHover={{ scale: 1.03, y: -2 }} 
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    onClick={handleSearch}
                    disabled={!selectedType || !fromDate || !toDate}
                    className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white cursor-pointer shadow-lg h-11 flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      <span>🔍</span>
                      <span>Report Search</span>
                    </span>
                  </Button>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.03, y: -2 }} 
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    onClick={onExport}
                    disabled={!selectedType || !fromDate || !toDate}
                    className="w-full bg-[#00BCD4] hover:bg-[#00ACC1] text-white cursor-pointer shadow-lg h-11 flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
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
                      <span>⊗</span>
                      <span>Cancel</span>
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
                    <p className="text-white/90 text-sm mt-1 relative z-10">Are you sure you want to cancel?</p>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-700 text-center mb-6">
                      All your selections will be cleared.
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
                        Go Back
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