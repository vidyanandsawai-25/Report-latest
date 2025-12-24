import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Filter, Calendar, Search, DollarSign, MapPin, Building2, CreditCard, Clock, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CheckboxGrid } from './CheckboxGrid';
import { MultiSelectCheckboxDropdown } from './MultiSelectCheckboxDropdown';
import { ZoneWiseCollectionReport } from './ZoneWiseCollectionReport';
import waterBillBg from 'figma:asset/32a53904cdb2f84aba99f830aa52e4f10dd2974d.png';

interface CollectionReportFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: () => void;
  onExport?: () => void;
  selectedReport?: string;
}

export function CollectionReportFilter({ isOpen, onClose, onSearch, onExport, selectedReport }: CollectionReportFilterProps) {
  const [selectedModule, setSelectedModule] = useState('');
  const [reportName, setReportName] = useState('');
  const [showZoneReport, setShowZoneReport] = useState(false);
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);
  
  // Set initial report name based on the selected report card
  useEffect(() => {
    if (selectedReport === 'Day Wise Collection') {
      setReportName('daywise');
    } else if (selectedReport === 'Monthly Collection') {
      setReportName('monthly');
    }
  }, [selectedReport]);

  const [reportType, setReportType] = useState('');
  const [nodeNo, setNodeNo] = useState('');
  const [sectionNo, setSectionNo] = useState('');
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedWards, setSelectedWards] = useState<string[]>([]);
  const [selectedTapSizes, setSelectedTapSizes] = useState<string[]>([]);
  const [locationStatus, setLocationStatus] = useState('');
  const [paymentCollectionType, setPaymentCollectionType] = useState('');
  const [amountFrom, setAmountFrom] = useState('');
  const [amountTo, setAmountTo] = useState('');
  const [collectionAll, setCollectionAll] = useState('ALL');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromTimeHour, setFromTimeHour] = useState('6');
  const [fromTimeMinute, setFromTimeMinute] = useState('30');
  const [fromTimePeriod, setFromTimePeriod] = useState('AM');
  const [toTimeHour, setToTimeHour] = useState('6');
  const [toTimeMinute, setToTimeMinute] = useState('30');
  const [toTimePeriod, setToTimePeriod] = useState('PM');
  const [interestEnabled, setInterestEnabled] = useState(false);

  const zones = ['Zone 1 - Central', 'Zone 2 - East', 'Zone 3 - West', 'Zone 4 - North', 'Zone 5 - South'];
  const sectors = ['Sector A', 'Sector B', 'Sector C', 'Sector D', 'Sector E', 'Sector F'];
  const wards = ['Ward A', 'Ward B', 'Ward C', 'Ward D', 'Ward E', 'Ward F', 'Ward G', 'Ward H'];
  const tapSizes = ['15mm', '20mm', '25mm', '32mm', '40mm', '50mm'];

  const toggleZone = (zone: string) => {
    if (zone === 'All Zones') {
      if (selectedZones.includes('All Zones')) {
        setSelectedZones([]);
      } else {
        setSelectedZones(['All Zones']);
      }
    } else {
      setSelectedZones(prev => {
        const newZones = prev.includes(zone)
          ? prev.filter(z => z !== zone && z !== 'All Zones')
          : [...prev.filter(z => z !== 'All Zones'), zone];
        return newZones;
      });
    }
  };

  const toggleSector = (sector: string) => {
    if (sector === 'All Sectors') {
      if (selectedSectors.includes('All Sectors')) {
        setSelectedSectors([]);
      } else {
        setSelectedSectors(['All Sectors']);
      }
    } else {
      setSelectedSectors(prev => {
        const newSectors = prev.includes(sector)
          ? prev.filter(s => s !== sector && s !== 'All Sectors')
          : [...prev.filter(s => s !== 'All Sectors'), sector];
        return newSectors;
      });
    }
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
    if (tapSize === 'All Tap Sizes') {
      if (selectedTapSizes.includes('All Tap Sizes')) {
        setSelectedTapSizes([]);
      } else {
        setSelectedTapSizes(['All Tap Sizes']);
      }
    } else {
      setSelectedTapSizes(prev => {
        const newTapSizes = prev.includes(tapSize)
          ? prev.filter(t => t !== tapSize && t !== 'All Tap Sizes')
          : [...prev.filter(t => t !== 'All Tap Sizes'), tapSize];
        return newTapSizes;
      });
    }
  };

  const handleSearch = () => {
    if (reportName === 'daywise') {
      setShowZoneReport(true);
    } else {
      onSearch();
      onClose();
    }
  };

  const handleCancelClick = () => {
    // Directly close without confirmation popup
    onClose();
  };

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  // AI Smart Suggestions based on selection
  const getAISuggestion = () => {
    if (selectedWards.length > 0 && amountFrom && amountTo) {
      return "💡 High collection potential detected in selected wards";
    }
    if (paymentMethod === 'upi') {
      return "📱 UPI transactions show 23% faster processing";
    }
    return "🤖 AI analyzing your filter patterns...";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="collection-report-filter-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-black/60 via-blue-900/30 to-black/60 backdrop-blur-md z-40"
          />

          {/* Centered Modal */}
          <motion.div
            key="collection-report-filter-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[96vw] max-w-6xl max-h-[92vh] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border-4 border-[#005AA7]/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#005AA7] to-[#00C6FF] relative overflow-hidden p-6">
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
                      Collection Report Filters
                    </h3>
                    <p className="text-white/90 text-sm mt-0.5">Water Collection Module</p>
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

            {/* Filter Content */}
            <div className="p-5 overflow-y-auto max-h-[calc(92vh-200px)] relative">
              {/* Background Image */}
              <div className="absolute bottom-8 right-8 w-64 h-64 opacity-[0.08] pointer-events-none">
                <img 
                  src={waterBillBg} 
                  alt="" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="space-y-4 relative z-10">
                {/* Report Type Selection Cards - Hide for Day Wise Collection */}
                {reportName !== 'daywise' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-5"
                  >
                    <Label className="mb-3 block text-gray-900">Select Report Type</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {/* Monthly Report */}
                      <motion.button
                        key="report-card-monthly"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setReportName('monthly')}
                        className={`relative p-4 rounded-xl text-left cursor-pointer transition-all duration-300 overflow-hidden ${
                          reportName === 'monthly' 
                            ? 'shadow-2xl' 
                            : 'shadow-md hover:shadow-xl'
                        }`}
                        style={{
                          background: reportName === 'monthly'
                            ? 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)'
                            : 'linear-gradient(135deg, #22C55E15 0%, #16A34A15 100%)',
                          border: reportName === 'monthly' ? '3px solid #22C55E' : '2px solid #22C55E40',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-white/90 flex items-center justify-center shadow-md"
                            animate={reportName === 'monthly' ? { rotate: [0, 5, -5, 0] } : {}}
                            transition={{ duration: 2, repeat: reportName === 'monthly' ? Infinity : 0 }}
                          >
                            <Building2 className="w-5 h-5 text-green-600" />
                          </motion.div>
                          <div>
                            <div className={`font-semibold ${reportName === 'monthly' ? 'text-white' : 'text-green-700'}`}>
                              Monthly Report
                            </div>
                          </div>
                        </div>
                        {reportName === 'monthly' && (
                          <motion.div
                            className="absolute inset-0 rounded-xl blur-xl opacity-30"
                            style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)' }}
                            animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          />
                        )}
                      </motion.button>

                      {/* Consolidated Report */}
                      <motion.button
                        key="report-card-consolidated"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setReportName('consolidated')}
                        className={`relative p-4 rounded-xl text-left cursor-pointer transition-all duration-300 overflow-hidden ${
                          reportName === 'consolidated' 
                            ? 'shadow-2xl' 
                            : 'shadow-md hover:shadow-xl'
                        }`}
                        style={{
                          background: reportName === 'consolidated'
                            ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
                            : 'linear-gradient(135deg, #3B82F615 0%, #2563EB15 100%)',
                          border: reportName === 'consolidated' ? '3px solid #3B82F6' : '2px solid #3B82F640',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-white/90 flex items-center justify-center shadow-md"
                            animate={reportName === 'consolidated' ? { rotate: [0, 5, -5, 0] } : {}}
                            transition={{ duration: 2, repeat: reportName === 'consolidated' ? Infinity : 0 }}
                          >
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                          </motion.div>
                          <div>
                            <div className={`font-semibold ${reportName === 'consolidated' ? 'text-white' : 'text-blue-700'}`}>
                              Consolidated Report
                            </div>
                          </div>
                        </div>
                        {reportName === 'consolidated' && (
                          <motion.div
                            className="absolute inset-0 rounded-xl blur-xl opacity-30"
                            style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' }}
                            animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          />
                        )}
                      </motion.button>

                      {/* Zone Office Report */}
                      <motion.button
                        key="report-card-zone-office"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setReportName('zone-office');
                          setShowZoneReport(true);
                        }}
                        className={`relative p-4 rounded-xl text-left cursor-pointer transition-all duration-300 overflow-hidden ${
                          reportName === 'zone-office' 
                            ? 'shadow-2xl' 
                            : 'shadow-md hover:shadow-xl'
                        }`}
                        style={{
                          background: reportName === 'zone-office'
                            ? 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)'
                            : 'linear-gradient(135deg, #06B6D415 0%, #0891B215 100%)',
                          border: reportName === 'zone-office' ? '3px solid #06B6D4' : '2px solid #06B6D440',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-white/90 flex items-center justify-center shadow-md"
                            animate={reportName === 'zone-office' ? { rotate: [0, 5, -5, 0] } : {}}
                            transition={{ duration: 2, repeat: reportName === 'zone-office' ? Infinity : 0 }}
                          >
                            <MapPin className="w-5 h-5 text-cyan-600" />
                          </motion.div>
                          <div>
                            <div className={`font-semibold ${reportName === 'zone-office' ? 'text-white' : 'text-cyan-700'}`}>
                              Zone Office Report
                            </div>
                          </div>
                        </div>
                        {reportName === 'zone-office' && (
                          <motion.div
                            className="absolute inset-0 rounded-xl blur-xl opacity-30"
                            style={{ background: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)' }}
                            animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          />
                        )}
                      </motion.button>

                      {/* A/c Collection Report */}
                      <motion.button
                        key="report-card-ac-collection"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setReportName('ac-collection')}
                        className={`relative p-4 rounded-xl text-left cursor-pointer transition-all duration-300 overflow-hidden ${
                          reportName === 'ac-collection' 
                            ? 'shadow-2xl' 
                            : 'shadow-md hover:shadow-xl'
                        }`}
                        style={{
                          background: reportName === 'ac-collection'
                            ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                            : 'linear-gradient(135deg, #EF444415 0%, #DC262615 100%)',
                          border: reportName === 'ac-collection' ? '3px solid #EF4444' : '2px solid #EF444440',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-white/90 flex items-center justify-center shadow-md"
                            animate={reportName === 'ac-collection' ? { rotate: [0, 5, -5, 0] } : {}}
                            transition={{ duration: 2, repeat: reportName === 'ac-collection' ? Infinity : 0 }}
                          >
                            <DollarSign className="w-5 h-5 text-red-600" />
                          </motion.div>
                          <div>
                            <div className={`font-semibold ${reportName === 'ac-collection' ? 'text-white' : 'text-red-700'}`}>
                              A/c Collection Report
                            </div>
                          </div>
                        </div>
                        {reportName === 'ac-collection' && (
                          <motion.div
                            className="absolute inset-0 rounded-xl blur-xl opacity-30"
                            style={{ background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' }}
                            animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          />
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
                
                {/* Report Filters Section - Hide for Day Wise Collection */}
                {reportName !== 'daywise' && (
                  <div className="border-t-2 border-gray-100 pt-4">
                    <h4 className="text-red-600 mb-3 text-sm">Report Filters</h4>
                  
                    {/* Mandatory Fields - Always Visible */}
                    <div className="mb-4">
                      <div className="grid md:grid-cols-2 gap-3">
                        {/* Zone No - Mandatory */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="relative">
                            <div className="absolute -top-1 left-12 z-10 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
                              Required
                            </div>
                            <MultiSelectCheckboxDropdown
                              label={<span className="flex items-center gap-1">Zone <span className="text-red-500 text-base">*</span></span>}
                              options={zones}
                              selectedValues={selectedZones}
                              onChange={setSelectedZones}
                              placeholder="Select zones (Required)"
                              icon={<MapPin className="w-3.5 h-3.5 text-blue-600" />}
                            />
                          </div>
                        </motion.div>

                        {/* Ward No - Mandatory */}
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.12 }}
                        >
                          <div className="relative">
                            <div className="absolute -top-1 left-16 z-10 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
                              Required
                            </div>
                            <MultiSelectCheckboxDropdown
                              label={<span className="flex items-center gap-1">Ward No <span className="text-red-500 text-base">*</span></span>}
                              options={wards}
                              selectedValues={selectedWards}
                              onChange={setSelectedWards}
                              placeholder="Select wards (Required)"
                            />
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Additional Filters Toggle */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mb-3"
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
                          <div className="grid md:grid-cols-3 gap-3 pt-3 border-t border-blue-100">
                            {/* Section/Sector Multi-Select */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <MultiSelectCheckboxDropdown
                                label="Section/Sector"
                                options={sectors}
                                selectedValues={selectedSectors}
                                onChange={setSelectedSectors}
                                placeholder="Select sectors"
                                icon={<MapPin className="w-3.5 h-3.5 text-blue-600" />}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 }}
                            >
                              <Label className="mb-1.5 block text-gray-900 text-sm">Location Status</Label>
                              <Select value={locationStatus} onValueChange={setLocationStatus}>
                                <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-10 [&>span]:truncate [&>span]:block">
                                  <SelectValue placeholder="Nothing selected" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Locations</SelectItem>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                              </Select>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <MultiSelectCheckboxDropdown
                                label="Select Tap Sizes"
                                options={tapSizes}
                                selectedValues={selectedTapSizes}
                                onChange={setSelectedTapSizes}
                                placeholder="Select tap sizes"
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.25 }}
                            >
                              <Label className="mb-1.5 block text-gray-900 text-sm">Payment Collection Type</Label>
                              <Select value={paymentCollectionType} onValueChange={setPaymentCollectionType}>
                                <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-10 [&>span]:truncate [&>span]:block">
                                  <SelectValue placeholder="None selected" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Types</SelectItem>
                                  <SelectItem value="online">Online Payment</SelectItem>
                                  <SelectItem value="offline">Offline Payment</SelectItem>
                                  <SelectItem value="cash">Cash Collection</SelectItem>
                                </SelectContent>
                              </Select>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <Label className="mb-1.5 block text-gray-900 text-sm">Payment Date</Label>
                              <Select value={paymentDate} onValueChange={setPaymentDate}>
                                <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-10 [&>span]:truncate [&>span]:block">
                                  <SelectValue placeholder="None selected" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="today">Today</SelectItem>
                                  <SelectItem value="yesterday">Yesterday</SelectItem>
                                  <SelectItem value="last7">Last 7 Days</SelectItem>
                                  <SelectItem value="last30">Last 30 Days</SelectItem>
                                  <SelectItem value="custom">Custom Range</SelectItem>
                                </SelectContent>
                              </Select>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.35 }}
                              className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl border-2 border-green-200 relative"
                            >
                              {amountFrom && amountTo && parseInt(amountFrom) > parseInt(amountTo) && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full"
                                >
                                  Invalid
                                </motion.div>
                              )}
                              {amountFrom && amountTo && parseInt(amountFrom) <= parseInt(amountTo) && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-green-500 text-white text-xs rounded-full"
                                >
                                  ✓
                                </motion.div>
                              )}
                              <Label className="mb-1.5 block text-gray-900 text-sm">Amount Range (₹)</Label>
                              <div className="grid grid-cols-2 gap-2">
                                <input 
                                  type="number"
                                  value={amountFrom}
                                  onChange={(e) => setAmountFrom(e.target.value)}
                                  placeholder="From"
                                  className="h-10 px-3 py-2 border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#005AA7] focus:border-[#005AA7] bg-white text-gray-800 transition-all text-sm"
                                />
                                <input 
                                  type="number"
                                  value={amountTo}
                                  onChange={(e) => setAmountTo(e.target.value)}
                                  placeholder="To"
                                  className="h-10 px-3 py-2 border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#005AA7] focus:border-[#005AA7] bg-white text-gray-800 transition-all text-sm"
                                />
                              </div>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                            >
                              <Label className="mb-1.5 block text-gray-900 text-sm">Collection ALL</Label>
                              <Select value={collectionAll} onValueChange={setCollectionAll}>
                                <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-10 [&>span]:truncate [&>span]:block">
                                  <SelectValue placeholder="ALL" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ALL">ALL</SelectItem>
                                  <SelectItem value="collected">Collected</SelectItem>
                                  <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                              </Select>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Day Wise Collection Specific Filters - Only show when Day Wise Collection is selected */}
                {reportName === 'daywise' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t-2 border-blue-100 pt-4 mt-4"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <h4 className="text-blue-600 text-sm font-semibold">Day Wise Collection Filters</h4>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                      {/* Date Range Section */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border-2 border-blue-200"
                      >
                        <Label className="mb-2 block text-gray-900 text-sm font-semibold flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          Date Range
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="mb-1 block text-gray-600 text-xs">From Date</Label>
                            <input 
                              type="date"
                              value={fromDate}
                              onChange={(e) => setFromDate(e.target.value)}
                              className="w-full h-10 px-3 py-2 border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#005AA7] focus:border-[#005AA7] bg-white text-gray-800 transition-all text-sm"
                            />
                          </div>
                          <div>
                            <Label className="mb-1 block text-gray-600 text-xs">To Date</Label>
                            <input 
                              type="date"
                              value={toDate}
                              onChange={(e) => setToDate(e.target.value)}
                              className="w-full h-10 px-3 py-2 border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#005AA7] focus:border-[#005AA7] bg-white text-gray-800 transition-all text-sm"
                            />
                          </div>
                        </div>
                      </motion.div>

                      {/* Time Range Section */}
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200"
                      >
                        <Label className="mb-2 block text-gray-900 text-sm font-semibold flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-purple-600" />
                          Time Range
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          {/* From Time */}
                          <div>
                            <Label className="mb-1 block text-gray-600 text-xs">From Time</Label>
                            <div className="flex gap-1">
                              <Select value={fromTimeHour} onValueChange={setFromTimeHour}>
                                <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-9 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {hours.map(hour => (
                                    <SelectItem key={`from-hour-${hour}`} value={hour}>{hour}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select value={fromTimeMinute} onValueChange={setFromTimeMinute}>
                                <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-9 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {['00', '15', '30', '45'].map(min => (
                                    <SelectItem key={`from-min-${min}`} value={min}>{min}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select value={fromTimePeriod} onValueChange={setFromTimePeriod}>
                                <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-9 text-xs w-16">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem key="collection-from-am" value="AM">AM</SelectItem>
                                  <SelectItem key="collection-from-pm" value="PM">PM</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          {/* To Time */}
                          <div>
                            <Label className="mb-1 block text-gray-600 text-xs">To Time</Label>
                            <div className="flex gap-1">
                              <Select value={toTimeHour} onValueChange={setToTimeHour}>
                                <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-9 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {hours.map(hour => (
                                    <SelectItem key={`to-hour-${hour}`} value={hour}>{hour}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select value={toTimeMinute} onValueChange={setToTimeMinute}>
                                <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-9 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {['00', '15', '30', '45'].map(min => (
                                    <SelectItem key={`to-min-${min}`} value={min}>{min}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select value={toTimePeriod} onValueChange={setToTimePeriod}>
                                <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-9 text-xs w-16">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem key="to-am" value="AM">AM</SelectItem>
                                  <SelectItem key="to-pm" value="PM">PM</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Interest Toggle */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-2"
                      >
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border-2 border-amber-200">
                          <div className="flex items-center justify-between mb-3">
                            <Label className="text-gray-900 text-sm font-semibold flex items-center gap-2">
                              <Zap className="w-4 h-4 text-amber-600" />
                              Interest Calculation
                            </Label>
                            
                            {/* Toggle Switch */}
                            <motion.button
                              onClick={() => setInterestEnabled(!interestEnabled)}
                              className={`relative w-14 h-7 rounded-full transition-all duration-300 cursor-pointer ${
                                interestEnabled 
                                  ? 'bg-gradient-to-r from-green-500 to-green-600' 
                                  : 'bg-gray-300'
                              }`}
                              whileTap={{ scale: 0.95 }}
                            >
                              <motion.div
                                className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md"
                                animate={{
                                  x: interestEnabled ? 28 : 0
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 30
                                }}
                              />
                            </motion.button>
                          </div>
                          
                          {/* Status Text */}
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${
                              interestEnabled ? 'text-green-700' : 'text-gray-600'
                            }`}>
                              {interestEnabled ? '✓ Interest Enabled' : '○ Interest Disabled'}
                            </span>
                          </div>
                          
                          {interestEnabled && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-2 text-xs text-amber-700 bg-amber-100 px-3 py-2 rounded-lg"
                            >
                              ℹ️ Interest will be calculated based on configured rates
                            </motion.p>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t-2 border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50/30 p-5">
              <div className="grid md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <motion.div 
                  whileHover={{ scale: 1.03, y: -2 }} 
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white cursor-pointer shadow-lg h-12 flex items-center justify-center gap-2 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <Search className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Report Search All</span>
                  </Button>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.03, y: -2 }} 
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    onClick={handleCancelClick}
                    variant="outline"
                    className="w-full border-2 border-red-500 text-red-600 hover:bg-red-50 cursor-pointer h-12 flex items-center justify-center gap-2"
                  >
                    <span className="flex items-center gap-2">
                      <span>⊗</span>
                      <span>Cancel All</span>
                    </span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
      
      {/* Zone Wise Collection Report */}
      <ZoneWiseCollectionReport 
        isOpen={showZoneReport}
        onClose={() => setShowZoneReport(false)}
        fromDate={fromDate}
        toDate={toDate}
        fromTime={`${fromTimeHour}:${fromTimeMinute} ${fromTimePeriod}`}
        toTime={`${toTimeHour}:${toTimeMinute} ${toTimePeriod}`}
      />
    </AnimatePresence>
  );
}