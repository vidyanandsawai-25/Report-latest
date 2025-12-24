import { motion, AnimatePresence } from 'motion/react';
import { X, DollarSign, Droplet, UserPlus, Ban, FileX, Receipt, Clock, Calendar, Download, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { MultiSelectCheckboxDropdown } from './MultiSelectCheckboxDropdown';

interface CollectionDetailsFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: () => void;
  onExport: () => void;
}

export function CollectionDetailsFilter({ isOpen, onClose, onSearch, onExport }: CollectionDetailsFilterProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [selectedFinancialYears, setSelectedFinancialYears] = useState<string[]>([]);
  const [selectedReceiptBooks, setSelectedReceiptBooks] = useState<string[]>([]);
  const [selectedPaymentResources, setSelectedPaymentResources] = useState<string[]>([]);
  const [selectedPaymentModes, setSelectedPaymentModes] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState<string[]>([]);
  const [selectedPaymentOptions, setSelectedPaymentOptions] = useState<string[]>([]);
  const [receiptNumber, setReceiptNumber] = useState('');

  const nodes = ['Select All', 'Node 1', 'Node 2', 'Node 3', 'Node 4', 'Node 5'];
  const financialYears = ['Select All', '2023-24', '2024-25', '2025-26'];
  const receiptBooks = ['Select All', 'GB2020', 'PMCWC12021', 'PMCWC22021', 'PMCWC32021'];
  const paymentResources = ['Select All', 'Online', 'Offline', 'Counter', 'Field'];
  const paymentModes = ['Select All', 'Cash', 'Cheque', 'DD', 'RTGS', 'Card Payment'];
  const users = ['Select All', 'Admin', 'Collector 1', 'Collector 2', 'Supervisor'];
  const sectors = ['Select All', 'Sector 1', 'Sector 2', 'Sector 3', 'Sector 4'];
  const paymentTypes = ['Select All', 'Full Payment', 'Partial Payment', 'Advance Payment', 'Arrears'];
  const paymentOptions = ['Select All', 'Immediate', 'Scheduled', 'Recurring'];

  const collectionTypes = [
    {
      id: 'all',
      title: 'All',
      description: 'All collection records',
      icon: DollarSign,
      color: '#6366F1',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'water-tax',
      title: 'Water Tax Collection',
      description: 'Regular water tax payments',
      icon: Droplet,
      color: '#3B82F6',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'new-connection',
      title: 'New Connection Collection',
      description: 'New connection fees',
      icon: UserPlus,
      color: '#10B981',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'collection-cancelation',
      title: 'Collection Cancelation',
      description: 'Canceled payment records',
      icon: Ban,
      color: '#EF4444',
      gradient: 'from-red-500 to-red-600'
    },
    {
      id: 'new-cheque-bounce',
      title: 'New Connection Cheque Bounce Report',
      description: 'Bounced cheques for new connections',
      icon: FileX,
      color: '#F97316',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'water-cheque-bounce',
      title: 'Water Bill Cheque Bounce Report',
      description: 'Bounced cheques for water bills',
      icon: Receipt,
      color: '#F59E0B',
      gradient: 'from-amber-500 to-amber-600'
    },
    {
      id: 'cheque-inprocess',
      title: 'Cheque Inprocess',
      description: 'Pending cheque clearance',
      icon: Clock,
      color: '#8B5CF6',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  const handleSearch = () => {
    onSearch();
    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="collection-details-filter-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-black/60 backdrop-blur-md z-40"
          >
            {/* Animated particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`collection-details-particle-${i}`}
                className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
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
            key="collection-details-filter-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-6xl max-h-[90vh] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border-4 border-purple-500/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] p-6 pb-5 relative overflow-hidden">
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-violet-400/20"
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
                    <DollarSign className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white text-xl">
                      Collection Details
                    </h3>
                    <p className="text-white/90 text-sm mt-0.5">Comprehensive collection details & analytics</p>
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
              {/* Collection Type Selection */}
              <div className="mb-5">
                <Label className="mb-3 block text-gray-900">Select Collection Type *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                  {collectionTypes.map((type, index) => (
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
                              scale: [1, 1.05, 1],
                              opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </>
                      )}

                      {/* Icon */}
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <motion.div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                          style={{
                            background: selectedType === type.id
                              ? `linear-gradient(135deg, ${type.color}30, ${type.color}50)`
                              : 'linear-gradient(135deg, #f3f4f6, #e5e7eb)'
                          }}
                          animate={{
                            rotate: selectedType === type.id ? [0, 5, -5, 0] : 0
                          }}
                          transition={{
                            duration: 2,
                            repeat: selectedType === type.id ? Infinity : 0
                          }}
                        >
                          <type.icon 
                            className="w-6 h-6" 
                            style={{ color: selectedType === type.id ? type.color : '#6b7280' }}
                          />
                        </motion.div>
                        <div className="text-xs font-semibold line-clamp-2" style={{ 
                          color: selectedType === type.id ? type.color : '#374151' 
                        }}>
                          {type.title}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5">
                {/* Node No. */}
                <div>
                  <MultiSelectCheckboxDropdown
                    label="Node No."
                    options={nodes}
                    selectedValues={selectedNodes}
                    onChange={setSelectedNodes}
                    placeholder="Select Nodes"
                  />
                </div>

                {/* Financial Year */}
                <div>
                  <MultiSelectCheckboxDropdown
                    label="Financial Year"
                    options={financialYears}
                    selectedValues={selectedFinancialYears}
                    onChange={setSelectedFinancialYears}
                    placeholder="Select Financial Year"
                  />
                </div>

                {/* Receipt Book */}
                <div>
                  <MultiSelectCheckboxDropdown
                    label="Receipt Book"
                    options={receiptBooks}
                    selectedValues={selectedReceiptBooks}
                    onChange={setSelectedReceiptBooks}
                    placeholder="Select Receipt Book"
                  />
                </div>

                {/* Payment Resource */}
                <div>
                  <MultiSelectCheckboxDropdown
                    label="Payment Resource"
                    options={paymentResources}
                    selectedValues={selectedPaymentResources}
                    onChange={setSelectedPaymentResources}
                    placeholder="Select Payment Resource"
                  />
                </div>

                {/* Payment Mode */}
                <div>
                  <MultiSelectCheckboxDropdown
                    label="Payment Mode"
                    options={paymentModes}
                    selectedValues={selectedPaymentModes}
                    onChange={setSelectedPaymentModes}
                    placeholder="Select Payment Modes"
                  />
                </div>

                {/* User */}
                <div>
                  <MultiSelectCheckboxDropdown
                    label="User"
                    options={users}
                    selectedValues={selectedUsers}
                    onChange={setSelectedUsers}
                    placeholder="Select User"
                  />
                </div>

                {/* Sector No */}
                <div>
                  <MultiSelectCheckboxDropdown
                    label="Sector No."
                    options={sectors}
                    selectedValues={selectedSectors}
                    onChange={setSelectedSectors}
                    placeholder="Select Sector"
                  />
                </div>

                {/* Payment Type */}
                <div>
                  <MultiSelectCheckboxDropdown
                    label="Payment Type"
                    options={paymentTypes}
                    selectedValues={selectedPaymentTypes}
                    onChange={setSelectedPaymentTypes}
                    placeholder="Select Payment Type"
                  />
                </div>

                {/* Receipt Number */}
                <div>
                  <Label className="mb-2 block text-gray-700">Receipt Number</Label>
                  <Input 
                    type="text"
                    placeholder="Enter Receipt Number"
                    value={receiptNumber}
                    onChange={(e) => setReceiptNumber(e.target.value)}
                    className="w-full h-11 rounded-xl border-2 border-gray-200 hover:border-purple-300 focus:border-purple-500 transition-all bg-white shadow-sm"
                  />
                </div>

                {/* Payment Option */}
                <div>
                  <MultiSelectCheckboxDropdown
                    label="Payment Option"
                    options={paymentOptions}
                    selectedValues={selectedPaymentOptions}
                    onChange={setSelectedPaymentOptions}
                    placeholder="Select Payment Option"
                  />
                </div>
              </div>

              {/* Date and Time Range Section */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-5 border-2 border-purple-200 mb-5">
                <Label className="mb-4 block text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Date & Time Range
                </Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* From Date */}
                  <div>
                    <Label className="mb-2 block text-gray-700 text-sm">From Date</Label>
                    <Input 
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full h-11 rounded-xl border-2 border-purple-200 hover:border-purple-400 focus:border-purple-600 transition-all bg-white shadow-sm"
                    />
                  </div>

                  {/* To Date */}
                  <div>
                    <Label className="mb-2 block text-gray-700 text-sm">To Date</Label>
                    <Input 
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full h-11 rounded-xl border-2 border-purple-200 hover:border-purple-400 focus:border-purple-600 transition-all bg-white shadow-sm"
                    />
                  </div>

                  {/* From Time */}
                  <div>
                    <Label className="mb-2 block text-gray-700 text-sm">From Time</Label>
                    <Input 
                      type="time"
                      value={fromTime}
                      onChange={(e) => setFromTime(e.target.value)}
                      className="w-full h-11 rounded-xl border-2 border-purple-200 hover:border-purple-400 focus:border-purple-600 transition-all bg-white shadow-sm"
                    />
                  </div>

                  {/* To Time */}
                  <div>
                    <Label className="mb-2 block text-gray-700 text-sm">To Time</Label>
                    <Input 
                      type="time"
                      value={toTime}
                      onChange={(e) => setToTime(e.target.value)}
                      className="w-full h-11 rounded-xl border-2 border-purple-200 hover:border-purple-400 focus:border-purple-600 transition-all bg-white shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="border-t-2 border-gray-100 bg-gradient-to-r from-purple-50 to-violet-50 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              {/* Left side - Info */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Search className="w-4 h-4 text-purple-500" />
                </motion.div>
                <span>Configure filters and generate report</span>
              </div>

              {/* Right side - Action buttons */}
              <div className="flex flex-wrap gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleCancelClick}
                    className="px-6 h-11 rounded-xl bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-md transition-all"
                  >
                    Cancel
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={onExport}
                    className="px-6 h-11 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-600 hover:to-violet-700 shadow-lg transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Button
                    onClick={handleSearch}
                    className="px-8 h-11 rounded-xl bg-gradient-to-r from-purple-600 to-violet-700 text-white hover:from-purple-700 hover:to-violet-800 shadow-xl transition-all relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 0.5
                      }}
                    />
                    <Search className="w-4 h-4 mr-2" />
                    <span className="relative z-10">Generate Report</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}