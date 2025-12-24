import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { SMSManagerTable } from './SMSManagerTable';
import { SMSConfirmDialog } from './SMSConfirmDialog';

type TabType = 'pending' | 'sent' | 'failed';

interface Customer {
  id: number;
  upicId: string;
  name: string;
  ward: string;
  address: string;
  mobile: string;
  status: TabType;
  billAmount?: string;
  lastContacted?: string;
  priority?: 'high' | 'medium' | 'low';
  deliveryStatus?: 'delivered' | 'pending' | 'failed';
}

export function SMSManager() {
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedWards, setSelectedWards] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 10;

  // Available zones and wards
  const zones = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4'];
  const wards = ['3', '5', '6', '7', '8', '9', '11', '12', '14', '15'];

  // Dummy customer data
  const allCustomers: Customer[] = [
    { id: 1, upicId: 'PMC302004', name: 'Ramesh Kumar Sharma', ward: '12', address: 'Plot No. 45, Shivaji Nagar, Akola', mobile: '9876543210', status: 'pending' },
    { id: 2, upicId: 'PMC211002', name: 'Anil Rajendra Deshmukh', ward: '15', address: 'Flat 302, Ambedkar Colony, Akola', mobile: '9654321098', status: 'pending' },
    { id: 3, upicId: 'RP0818', name: 'Rajesh Kumar Joshi', ward: '5', address: 'Shop No. 12, Market Road, Akola', mobile: '9432109876', status: 'pending' },
    { id: 4, upicId: 'AKL45621', name: 'Sunita Devi Patil', ward: '8', address: 'House No. 78, Gandhi Chowk, Akola', mobile: '9123456789', status: 'pending' },
    { id: 5, upicId: 'WTR9034', name: 'Vikas Narayan Kulkarni', ward: '3', address: 'Block B, Raj Apartment, Akola', mobile: '9876512345', status: 'pending' },
    { id: 6, upicId: 'PMC107865', name: 'Meena Rajesh Pawar', ward: '11', address: 'Lane 4, Civil Lines, Akola', mobile: '9654378912', status: 'pending' },
    { id: 7, upicId: 'AKL89201', name: 'Prakash Singh Rathore', ward: '7', address: 'Plot No. 23, Station Road, Akola', mobile: '9871234560', status: 'sent' },
    { id: 8, upicId: 'WTR5432', name: 'Kavita Mohan Bhosale', ward: '14', address: 'Flat 101, Laxmi Heights, Akola', mobile: '9123987654', status: 'sent' },
    { id: 9, upicId: 'PMC654210', name: 'Suresh Damodar Naik', ward: '9', address: 'Shop No. 45, Main Bazaar, Akola', mobile: '9654123789', status: 'sent' },
    { id: 10, upicId: 'RPfailed123', name: 'Anita Ashok Jadhav', ward: '6', address: 'House No. 56, College Road, Akola', mobile: '9999999999', status: 'failed' },
  ];

  // Filter customers by zone and ward
  const filteredCustomers = allCustomers.filter(c => {
    // Filter by tab
    if (c.status !== activeTab) return false;
    
    // Filter by ward if selected
    if (selectedWards.length > 0 && !selectedWards.includes(c.ward)) return false;
    
    // For zone filtering, we'll map wards to zones (simple mapping for demo)
    if (selectedZones.length > 0) {
      const wardToZone: Record<string, string> = {
        '3': 'Zone 1', '5': 'Zone 1', '6': 'Zone 2', '7': 'Zone 2',
        '8': 'Zone 3', '9': 'Zone 3', '11': 'Zone 4', '12': 'Zone 4',
        '14': 'Zone 4', '15': 'Zone 4'
      };
      const customerZone = wardToZone[c.ward];
      if (!selectedZones.includes(customerZone)) return false;
    }
    
    return true;
  });
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(paginatedCustomers.map(c => c.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, id]);
    } else {
      setSelectedCustomers(selectedCustomers.filter(cid => cid !== id));
    }
  };

  const handleSendSMS = () => {
    if (selectedCustomers.length === 0) {
      toast.error('Please select at least one customer');
      return;
    }
    setShowConfirmDialog(true);
  };

  const handleConfirmSend = () => {
    toast.success(`SMS sent to ${selectedCustomers.length} customer(s)`);
    setSelectedCustomers([]);
    setShowConfirmDialog(false);
  };

  const handleExport = () => {
    toast.success('Data exported to Excel successfully');
  };

  const handleZoneToggle = (zone: string) => {
    if (zone === 'Select All') {
      if (selectedZones.length === zones.length) {
        setSelectedZones([]);
      } else {
        setSelectedZones([...zones]);
      }
    } else {
      setSelectedZones(prev =>
        prev.includes(zone) ? prev.filter(z => z !== zone) : [...prev, zone]
      );
    }
    setCurrentPage(1);
  };

  const handleWardToggle = (ward: string) => {
    if (ward === 'Select All') {
      if (selectedWards.length === wards.length) {
        setSelectedWards([]);
      } else {
        setSelectedWards([...wards]);
      }
    } else {
      setSelectedWards(prev =>
        prev.includes(ward) ? prev.filter(w => w !== ward) : [...prev, ward]
      );
    }
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedZones([]);
    setSelectedWards([]);
    setCurrentPage(1);
    toast.success('Filters cleared');
  };

  const tabCounts = {
    pending: allCustomers.filter(c => c.status === 'pending').length,
    sent: allCustomers.filter(c => c.status === 'sent').length,
    failed: allCustomers.filter(c => c.status === 'failed').length,
  };

  const currentTime = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <div className="relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-white to-blue-50/50 rounded-2xl shadow-lg p-4 md:p-6 mb-6 border-2 border-blue-100"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-1.5">
              <span className="hidden sm:inline">Report Engine</span>
              <ChevronRight className="w-3 h-3 hidden sm:inline" />
              <span className="text-[#007BFF]">SMS Manager</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-[#007BFF] to-[#00B894] flex items-center justify-center shadow-md"
              >
                <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </motion.div>
              <h1 className="text-xl md:text-2xl text-gray-900">SMS Manager</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleSendSMS}
              disabled={selectedCustomers.length === 0}
              className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] hover:from-[#0056b3] hover:to-[#003d82] text-white px-3 md:px-4 h-9 text-xs md:text-sm shadow-md disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 md:mr-1.5" />
              <span className="hidden sm:inline">Send SMS</span>
            </Button>
            <Button
              onClick={handleExport}
              variant="outline"
              className="border-2 border-[#00B894] text-[#00B894] hover:bg-[#00B894] hover:text-white px-3 md:px-4 h-9 text-xs md:text-sm shadow-sm"
            >
              <Download className="w-3.5 h-3.5 md:mr-1.5" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className={`border-2 px-3 md:px-4 h-9 text-xs md:text-sm shadow-sm ${
                showFilters || selectedZones.length > 0 || selectedWards.length > 0
                  ? 'border-purple-500 text-purple-600 bg-purple-50'
                  : 'border-gray-300 text-gray-700'
              }`}
            >
              <Filter className="w-3.5 h-3.5 md:mr-1.5" />
              <span className="hidden sm:inline">Filters</span>
              {(selectedZones.length > 0 || selectedWards.length > 0) && (
                <span className="ml-1.5 w-5 h-5 bg-purple-500 text-white rounded-full text-[10px] flex items-center justify-center">
                  {selectedZones.length + selectedWards.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0">
          {[
            { key: 'pending' as TabType, label: 'Pending', fullLabel: 'Pending Customers', icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-300' },
            { key: 'sent' as TabType, label: 'Sent', fullLabel: 'SMS Sent', icon: CheckCircle2, color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-300' },
            { key: 'failed' as TabType, label: 'Failed', fullLabel: 'SMS Failed', icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-300' },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setCurrentPage(1);
                  setSelectedCustomers([]);
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition-all text-xs md:text-sm flex-1 sm:flex-none whitespace-nowrap ${
                  activeTab === tab.key
                    ? `${tab.bgColor} ${tab.borderColor} border-2 shadow-sm`
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${activeTab === tab.key ? tab.color : 'text-gray-500'}`} />
                <span className={`font-medium ${activeTab === tab.key ? tab.color : 'text-gray-700'}`}>
                  <span className="sm:hidden">{tab.label}</span>
                  <span className="hidden sm:inline">{tab.fullLabel}</span>
                </span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                  activeTab === tab.key
                    ? 'bg-white text-gray-900'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tabCounts[tab.key]}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: 'auto', opacity: 1, marginBottom: 24 }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg p-4 md:p-6 border-2 border-purple-200 bg-[rgba(45,182,235,0)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-purple-600" />
                  <h3 className="text-gray-900 font-semibold">Filter Customers</h3>
                </div>
                <div className="flex items-center gap-2">
                  {(selectedZones.length > 0 || selectedWards.length > 0) && (
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-600 hover:bg-red-50 h-8 text-xs"
                    >
                      <X className="w-3.5 h-3.5 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Zone Filter */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl p-4 border-2 border-purple-200"
                >
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center justify-between">
                    <span>Select Zone</span>
                    {selectedZones.length > 0 && (
                      <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                        {selectedZones.length} selected
                      </span>
                    )}
                  </h4>
                  <div className="space-y-2">
                    {/* Select All Option */}
                    <motion.label
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-purple-50 transition-all border-2 border-purple-300 bg-purple-50"
                    >
                      <input
                        type="checkbox"
                        checked={selectedZones.length === zones.length}
                        onChange={() => handleZoneToggle('Select All')}
                        className="w-4 h-4 rounded border-2 border-purple-400 text-purple-600 focus:ring-2 focus:ring-purple-400"
                      />
                      <span className="text-sm font-semibold text-purple-700">Select All Zones</span>
                    </motion.label>
                    
                    {zones.map((zone) => (
                      <motion.label
                        key={zone}
                        whileHover={{ x: 2 }}
                        className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all ${
                          selectedZones.includes(zone)
                            ? 'bg-purple-100 border-2 border-purple-300'
                            : 'bg-gray-50 border-2 border-gray-200 hover:bg-purple-50 hover:border-purple-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedZones.includes(zone)}
                          onChange={() => handleZoneToggle(zone)}
                          className="w-4 h-4 rounded border-2 border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-400"
                        />
                        <span className={`text-sm ${selectedZones.includes(zone) ? 'text-purple-900 font-medium' : 'text-gray-700'}`}>
                          {zone}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>

                {/* Ward Filter */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="bg-white rounded-xl p-4 border-2 border-purple-200"
                >
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center justify-between">
                    <span>Select Ward</span>
                    {selectedWards.length > 0 && (
                      <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                        {selectedWards.length} selected
                      </span>
                    )}
                  </h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {/* Select All Option */}
                    <motion.label
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-purple-50 transition-all border-2 border-purple-300 bg-purple-50 sticky top-0 z-10"
                    >
                      <input
                        type="checkbox"
                        checked={selectedWards.length === wards.length}
                        onChange={() => handleWardToggle('Select All')}
                        className="w-4 h-4 rounded border-2 border-purple-400 text-purple-600 focus:ring-2 focus:ring-purple-400"
                      />
                      <span className="text-sm font-semibold text-purple-700">Select All Wards</span>
                    </motion.label>
                    
                    {wards.map((ward) => (
                      <motion.label
                        key={ward}
                        whileHover={{ x: 2 }}
                        className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all ${
                          selectedWards.includes(ward)
                            ? 'bg-purple-100 border-2 border-purple-300'
                            : 'bg-gray-50 border-2 border-gray-200 hover:bg-purple-50 hover:border-purple-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedWards.includes(ward)}
                          onChange={() => handleWardToggle(ward)}
                          className="w-4 h-4 rounded border-2 border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-400"
                        />
                        <span className={`text-sm ${selectedWards.includes(ward) ? 'text-purple-900 font-medium' : 'text-gray-700'}`}>
                          Ward {ward}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Active Filters Summary */}
              {(selectedZones.length > 0 || selectedWards.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-white rounded-xl border-2 border-purple-200"
                >
                  <p className="text-xs text-gray-600 mb-2">Active Filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedZones.map((zone) => (
                      <motion.span
                        key={zone}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="px-2.5 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs flex items-center gap-1.5"
                      >
                        {zone}
                        <button
                          onClick={() => handleZoneToggle(zone)}
                          className="w-4 h-4 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.span>
                    ))}
                    {selectedWards.map((ward) => (
                      <motion.span
                        key={ward}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="px-2.5 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-xs flex items-center gap-1.5"
                      >
                        Ward {ward}
                        <button
                          onClick={() => handleWardToggle(ward)}
                          className="w-4 h-4 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data Grid - New Innovative Card-Based Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <SMSManagerTable
          customers={paginatedCustomers}
          selectedCustomers={selectedCustomers}
          onSelectCustomer={handleSelectCustomer}
          onSelectAll={handleSelectAll}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </motion.div>

      {/* Pagination & Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-md border-2 border-gray-100 p-3 md:p-4"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 w-full md:w-auto">
            <p className="text-xs text-gray-600 text-center sm:text-left">Last updated: {currentTime}</p>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
              <span>Showing</span>
              <span className="font-semibold text-blue-600">
                {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredCustomers.length)}
              </span>
              <span>of</span>
              <span className="font-semibold text-blue-600">{filteredCustomers.length}</span>
              <span className="hidden sm:inline">customers</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto justify-center">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="h-9 text-xs"
            >
              <ChevronLeft className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                let pageNum;
                if (totalPages <= 3) {
                  pageNum = i + 1;
                } else if (currentPage <= 2) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 1) {
                  pageNum = totalPages - 2 + i;
                } else {
                  pageNum = currentPage - 1 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    size="sm"
                    variant={pageNum === currentPage ? 'default' : 'outline'}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 text-xs ${pageNum === currentPage ? 'bg-[#007BFF] text-white' : ''}`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="h-9 text-xs"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4 sm:ml-1" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* AI Assistant FAB */}
   

      {/* AI Recommendation Panel */}
      <AnimatePresence>
        {aiPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAiPanelOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />
            
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[400px] bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {/* Panel Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl">AI Assistant</h3>
                      <p className="text-white/90 text-sm">Smart SMS Recommendations</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAiPanelOpen(false)}
                    className="w-8 h-8 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Panel Content */}
              <div className="p-6 space-y-4">
                {/* Template Suggestions */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border-2 border-blue-200">
                  <h4 className="text-gray-900 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Suggested Templates
                  </h4>
                  <div className="space-y-2">
                    {[
                      'Payment reminder for pending water bills',
                      'Bill generation notification',
                      'Payment confirmation message',
                    ].map((template, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 4 }}
                        className="p-3 bg-white rounded-xl cursor-pointer hover:shadow-md transition-all border border-blue-100"
                      >
                        <p className="text-sm text-gray-700">{template}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* AI Generated Message */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200">
                  <h4 className="text-gray-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    AI Generated Message
                  </h4>
                  <div className="bg-white rounded-xl p-4 border border-purple-100">
                    <p className="text-sm text-gray-700 mb-3">
                      "Dear Customer, your water bill of ₹850 for October 2024 is pending. 
                      Please pay before 25th Nov to avoid late charges. Pay online at akola.gov.in. 
                      - Akola Municipal Corporation"
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    >
                      Use This Template
                    </Button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-200">
                  <h4 className="text-gray-900 mb-3 flex items-center gap-2">
                    <Send className="w-5 h-5 text-green-600" />
                    Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <Button
                      size="sm"
                      className="w-full bg-green-600 hover:bg-green-700 text-white justify-start"
                    >
                      Send to All Pending
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-green-300 text-green-700 hover:bg-green-50 justify-start"
                    >
                      Schedule for Tomorrow
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Confirm Dialog */}
      <SMSConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmSend}
        selectedCustomers={allCustomers.filter(c => selectedCustomers.includes(c.id))}
        totalAmount={`₹${selectedCustomers.reduce((sum, id) => {
          const customer = allCustomers.find(c => c.id === id);
          const amount = customer?.billAmount || '850';
          return sum + parseInt(amount.replace('₹', ''));
        }, 0).toLocaleString('en-IN')}`}
      />
    </div>
  );
}