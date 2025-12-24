import { motion, AnimatePresence } from 'motion/react';
import { X, Filter, Calendar, Search, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from './ui/checkbox';
import { useState } from 'react';
import { MultiSelectCheckboxDropdown } from './MultiSelectCheckboxDropdown';

interface RevenueSummaryFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: () => void;
  onExport?: () => void;
}

export function RevenueSummaryFilter({ isOpen, onClose, onSearch, onExport }: RevenueSummaryFilterProps) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedWards, setSelectedWards] = useState<string[]>([]);
  const [revenueType, setRevenueType] = useState('');
  const [collectionSource, setCollectionSource] = useState('');
  const [reportPeriod, setReportPeriod] = useState('');
  const [includeArrears, setIncludeArrears] = useState(false);
  const [includePenalties, setIncludePenalties] = useState(false);

  const wards = ['All Wards', 'Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5'];

  const toggleWard = (ward: string) => {
    if (ward === 'All Wards') {
      setSelectedWards(selectedWards.includes('All Wards') ? [] : ['All Wards']);
    } else {
      setSelectedWards(prev => {
        const newWards = prev.includes(ward)
          ? prev.filter(w => w !== ward && w !== 'All Wards')
          : [...prev.filter(w => w !== 'All Wards'), ward];
        return newWards;
      });
    }
  };

  const handleSearch = () => {
    onSearch();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-black/60 via-blue-900/30 to-black/60 backdrop-blur-md z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border-4 border-[#F59E0B]/20"
          >
            <div className="bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] p-6 pb-5 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  >
                    <TrendingUp className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white">Revenue Summary</h3>
                    <p className="text-white/90 text-sm mt-0.5">Comprehensive Revenue Breakdown</p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center cursor-pointer transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-240px)]">
              <div className="space-y-6">
                {/* Date Range */}
                <div className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-2xl border-2 border-amber-100">
                  <div>
                    <Label className="mb-2 block text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      From Date
                    </Label>
                    <input 
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] cursor-pointer bg-white text-gray-800 transition-all"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      To Date
                    </Label>
                    <input 
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] cursor-pointer bg-white text-gray-800 transition-all"
                    />
                  </div>
                </div>

                {/* Ward Selection */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200">
                  <MultiSelectCheckboxDropdown
                    label="Ward No"
                    options={wards}
                    selectedValues={selectedWards}
                    onChange={setSelectedWards}
                    placeholder="Select wards"
                  />
                </div>

                {/* Revenue Filters */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block text-gray-900 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      Revenue Type
                    </Label>
                    <Select value={revenueType} onValueChange={setRevenueType}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select revenue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="water">Water Charges</SelectItem>
                        <SelectItem value="sewerage">Sewerage Charges</SelectItem>
                        <SelectItem value="connection">Connection Fees</SelectItem>
                        <SelectItem value="meter">Meter Rent</SelectItem>
                        <SelectItem value="other">Other Charges</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block text-gray-900">Collection Source</Label>
                    <Select value={collectionSource} onValueChange={setCollectionSource}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sources</SelectItem>
                        <SelectItem value="online">Online Collection</SelectItem>
                        <SelectItem value="offline">Counter Collection</SelectItem>
                        <SelectItem value="mobile">Mobile App</SelectItem>
                        <SelectItem value="agent">Field Agent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label className="mb-2 block text-gray-900 flex items-center gap-2">
                      <PieChart className="w-4 h-4 text-blue-600" />
                      Report Period
                    </Label>
                    <Select value={reportPeriod} onValueChange={setReportPeriod}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select report period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom">Custom Date Range</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="yesterday">Yesterday</SelectItem>
                        <SelectItem value="thisweek">This Week</SelectItem>
                        <SelectItem value="lastweek">Last Week</SelectItem>
                        <SelectItem value="thismonth">This Month</SelectItem>
                        <SelectItem value="lastmonth">Last Month</SelectItem>
                        <SelectItem value="thisquarter">This Quarter</SelectItem>
                        <SelectItem value="thisyear">This Financial Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Options */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-200 space-y-3">
                  <Label className="block text-gray-900">Include Additional Components</Label>
                  
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <Checkbox 
                      id="arrears"
                      checked={includeArrears}
                      onCheckedChange={(checked) => setIncludeArrears(checked as boolean)}
                    />
                    <label htmlFor="arrears" className="cursor-pointer text-sm flex-1">
                      Include Arrears Collection (₹)
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <Checkbox 
                      id="penalties"
                      checked={includePenalties}
                      onCheckedChange={(checked) => setIncludePenalties(checked as boolean)}
                    />
                    <label htmlFor="penalties" className="cursor-pointer text-sm flex-1">
                      Include Penalty & Interest Charges (₹)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-gray-100 bg-gradient-to-r from-gray-50 to-amber-50/30 p-5">
              <div className="grid md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <Button 
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] hover:from-[#D97706] hover:to-[#F59E0B] text-white h-12"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Generate Summary
                </Button>
                
                <Button 
                  onClick={onClose}
                  variant="outline"
                  className="w-full border-2 border-red-500 text-red-600 hover:bg-red-50 h-12"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}