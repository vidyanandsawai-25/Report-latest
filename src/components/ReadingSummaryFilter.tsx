import { motion, AnimatePresence } from 'motion/react';
import { X, Filter, Calendar, Search, BookOpen, Zap, TrendingUp, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from 'react';

interface ReadingSummaryFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: () => void;
  onExport?: () => void;
}

export function ReadingSummaryFilter({ isOpen, onClose, onSearch, onExport }: ReadingSummaryFilterProps) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [division, setDivision] = useState('');
  const [status, setStatus] = useState('');
  const [readingType, setReadingType] = useState('');
  const [meterStatus, setMeterStatus] = useState('');
  const [billCycle, setBillCycle] = useState('');
  const [consumptionRange, setConsumptionRange] = useState('');

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-black/60 via-blue-900/30 to-black/60 backdrop-blur-md z-40"
          />

          {/* Centered Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border-4 border-[#005AA7]/20"
          >
            {/* Header with AI Glow */}
            <div className="bg-gradient-to-r from-[#005AA7] to-[#00C6FF] p-6 pb-5 relative overflow-hidden">
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
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  >
                    <BookOpen className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white flex items-center gap-2">
                      Reading Summary Filters
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Zap className="w-5 h-5 text-yellow-300" />
                      </motion.div>
                    </h3>
                    <p className="text-white/90 text-sm mt-0.5">AI-Powered Meter Reading Analysis</p>
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

              {/* AI Insights Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-3 flex items-center gap-2 text-white/80 text-xs relative z-10"
              >
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  <span>Smart anomaly detection enabled</span>
                </div>
              </motion.div>
            </div>

            {/* Filter Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-240px)]">
              <div className="space-y-6">
                {/* Primary Filters */}
                <div className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-100">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Label className="mb-2 block text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      From Date
                    </Label>
                    <div className="relative">
                      <input 
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#005AA7] focus:border-[#005AA7] cursor-pointer bg-white text-gray-800 transition-all"
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <Label className="mb-2 block text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      To Date
                    </Label>
                    <div className="relative">
                      <input 
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#005AA7] focus:border-[#005AA7] cursor-pointer bg-white text-gray-800 transition-all"
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </motion.div>
                </div>

                {/* Advanced Filters */}
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Label className="mb-2 block text-gray-900">Division</Label>
                    <Select value={division} onValueChange={setDivision}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-11">
                        <SelectValue placeholder="None selected" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Divisions</SelectItem>
                        <SelectItem value="north">North Division</SelectItem>
                        <SelectItem value="south">South Division</SelectItem>
                        <SelectItem value="east">East Division</SelectItem>
                        <SelectItem value="west">West Division</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Label className="mb-2 block text-gray-900">Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-11">
                        <SelectValue placeholder="None selected" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inprogress">In Progress</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Label className="mb-2 block text-gray-900 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-purple-600" />
                      Reading Type
                    </Label>
                    <Select value={readingType} onValueChange={setReadingType}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-11">
                        <SelectValue placeholder="Select reading type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="actual">Actual Reading</SelectItem>
                        <SelectItem value="estimated">Estimated Reading</SelectItem>
                        <SelectItem value="average">Average Reading</SelectItem>
                        <SelectItem value="self">Self Reading</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Label className="mb-2 block text-gray-900">Meter Status</Label>
                    <Select value={meterStatus} onValueChange={setMeterStatus}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-11">
                        <SelectValue placeholder="Select meter status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Meters</SelectItem>
                        <SelectItem value="working">Working</SelectItem>
                        <SelectItem value="faulty">Faulty</SelectItem>
                        <SelectItem value="stopped">Stopped</SelectItem>
                        <SelectItem value="removed">Removed</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Label className="mb-2 block text-gray-900">Bill Cycle</Label>
                    <Select value={billCycle} onValueChange={setBillCycle}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-11">
                        <SelectValue placeholder="Select bill cycle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cycles</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="bimonthly">Bi-Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <Label className="mb-2 block text-gray-900">Consumption Range</Label>
                    <Select value={consumptionRange} onValueChange={setConsumptionRange}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-11">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ranges</SelectItem>
                        <SelectItem value="0-10">0 - 10 KL</SelectItem>
                        <SelectItem value="11-25">11 - 25 KL</SelectItem>
                        <SelectItem value="26-50">26 - 50 KL</SelectItem>
                        <SelectItem value="51-100">51 - 100 KL</SelectItem>
                        <SelectItem value="100+">100+ KL</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>

                {/* AI Insights Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-2xl border-2 border-purple-200"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-purple-900">AI Smart Suggestions</h4>
                  </div>
                  <div className="space-y-2 text-sm text-purple-800">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span>Auto-detect unusual consumption patterns</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span>Identify potential meter tampering or faults</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span>Highlight zero or negative readings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span>Compare with historical averages</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t-2 border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50/30 p-5">
              <div className="grid grid-cols-3 gap-3 max-w-3xl mx-auto">
                <motion.div 
                  whileHover={{ scale: 1.03, y: -2 }} 
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    onClick={() => {
                      // Show action
                      handleSearch();
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white cursor-pointer shadow-lg h-11"
                  >
                    <span className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">Show</span>
                    </span>
                  </Button>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.03, y: -2 }} 
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-[#005AA7] to-[#00C6FF] hover:from-[#004A8F] hover:to-[#00B0E8] text-white cursor-pointer shadow-lg h-11"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      <span className="text-sm">Report Search</span>
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
                    className="w-full border-2 border-red-500 text-red-600 hover:bg-red-50 cursor-pointer h-11"
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
        </>
      )}
    </AnimatePresence>
  );
}
