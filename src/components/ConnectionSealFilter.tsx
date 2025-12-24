import { motion, AnimatePresence } from 'motion/react';
import { X, Filter, Calendar, Search, Shield, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
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

interface ConnectionSealFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: () => void;
  onExport?: () => void;
}

export function ConnectionSealFilter({ isOpen, onClose, onSearch, onExport }: ConnectionSealFilterProps) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedWards, setSelectedWards] = useState<string[]>([]);
  const [sealType, setSealType] = useState('');
  const [sealStatus, setSealStatus] = useState('');
  const [connectionType, setConnectionType] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const [inspectorName, setInspectorName] = useState('');
  const [tamperingDetected, setTamperingDetected] = useState(false);

  const zones = ['Select All','Zone 1 - Central', 'Zone 2 - East', 'Zone 3 - West', 'Zone 4 - North', 'Zone 5 - South'];
  const wards = ['Select All','Ward A', 'Ward B', 'Ward C', 'Ward D', 'Ward E', 'Ward F', 'Ward G', 'Ward H'];

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
            {/* Header */}
            <div className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] p-6 pb-5 relative overflow-hidden">
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
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  >
                    <Shield className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white flex items-center gap-2">
                      Connection Seal Report
                    </h3>
                    <p className="text-white/90 text-sm mt-0.5">Seal Verification & Tampering Detection</p>
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
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-240px)]">
              <div className="space-y-6">
                {/* Date Range */}
                <div className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl border-2 border-purple-100">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Label className="mb-2 block text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      From Date
                    </Label>
                    <div className="relative">
                      <input 
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] cursor-pointer bg-white text-gray-800 transition-all"
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
                      <Calendar className="w-4 h-4 text-purple-600" />
                      To Date
                    </Label>
                    <div className="relative">
                      <input 
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] cursor-pointer bg-white text-gray-800 transition-all"
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </motion.div>
                </div>

                {/* Zone and Ward Selection - Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <MultiSelectCheckboxDropdown
                      label="Zone No"
                      options={zones}
                      selectedValues={selectedZones}
                      onChange={setSelectedZones}
                      placeholder="Select zones"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <MultiSelectCheckboxDropdown
                      label="Ward No"
                      options={wards}
                      selectedValues={selectedWards}
                      onChange={setSelectedWards}
                      placeholder="Select wards"
                    />
                  </motion.div>
                </div>

                {/* Filter Options */}
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Label className="mb-2 block text-gray-900">Seal Type</Label>
                    <Select value={sealType} onValueChange={setSealType}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#7C3AED] transition-colors h-11">
                        <SelectValue placeholder="Select seal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="meter">Meter Seal</SelectItem>
                        <SelectItem value="connection">Connection Seal</SelectItem>
                        <SelectItem value="valve">Valve Seal</SelectItem>
                        <SelectItem value="chamber">Chamber Seal</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Label className="mb-2 block text-gray-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Seal Status
                    </Label>
                    <Select value={sealStatus} onValueChange={setSealStatus}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#7C3AED] transition-colors h-11">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="intact">Intact</SelectItem>
                        <SelectItem value="broken">Broken</SelectItem>
                        <SelectItem value="missing">Missing</SelectItem>
                        <SelectItem value="replaced">Replaced</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Label className="mb-2 block text-gray-900">Connection Type</Label>
                    <Select value={connectionType} onValueChange={setConnectionType}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#7C3AED] transition-colors h-11">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Connections</SelectItem>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="govt">Government</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Label className="mb-2 block text-gray-900">Verification Status</Label>
                    <Select value={verificationStatus} onValueChange={setVerificationStatus}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#7C3AED] transition-colors h-11">
                        <SelectValue placeholder="Select verification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="pending">Pending Verification</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="md:col-span-2"
                  >
                    <Label className="mb-2 block text-gray-900">Inspector Name</Label>
                    <Select value={inspectorName} onValueChange={setInspectorName}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#7C3AED] transition-colors h-11">
                        <SelectValue placeholder="Select inspector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Inspectors</SelectItem>
                        <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
                        <SelectItem value="priya">Priya Sharma</SelectItem>
                        <SelectItem value="amit">Amit Patil</SelectItem>
                        <SelectItem value="sneha">Sneha Deshmukh</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>

                {/* Tampering Alert */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-red-50 to-orange-50 p-5 rounded-2xl border-2 border-red-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center space-x-3 flex-1">
                      <Checkbox 
                        id="tampering" 
                        checked={tamperingDetected}
                        onCheckedChange={(checked) => setTamperingDetected(checked as boolean)}
                        className="border-red-500 data-[state=checked]:bg-red-500" 
                      />
                      <label
                        htmlFor="tampering"
                        className="cursor-pointer text-gray-900 flex items-center gap-2"
                      >
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <span>Show only tampering detected cases</span>
                      </label>
                    </div>
                    {tamperingDetected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-red-500 text-white rounded-full text-xs"
                      >
                        Alert Mode
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t-2 border-gray-100 bg-gradient-to-r from-gray-50 to-purple-50/30 p-5">
              <div className="grid md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <motion.div 
                  whileHover={{ scale: 1.03, y: -2 }} 
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] hover:from-[#6D28D9] hover:to-[#8B5CF6] text-white cursor-pointer shadow-lg h-12 flex items-center justify-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    <span>Generate Report</span>
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
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
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