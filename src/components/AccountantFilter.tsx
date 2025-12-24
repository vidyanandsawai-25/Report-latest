import { motion, AnimatePresence } from 'motion/react';
import { X, Filter, Calendar, Search, Clock, FileText, FileSpreadsheet, Download, Building2, DollarSign, TrendingUp, MapPin } from 'lucide-react';
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

interface AccountantFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: () => void;
  onExport?: () => void;
}

export function AccountantFilter({ isOpen, onClose, onSearch, onExport }: AccountantFilterProps) {
  const [cfc, setCfc] = useState('Akola');
  const [mode, setMode] = useState('All');
  const [sector, setSector] = useState('');
  const [payResource, setPayResource] = useState('All');
  const [paymentMode, setPaymentMode] = useState('');
  const [user, setUser] = useState('');
  const [tabUser, setTabUser] = useState('');
  const [fromDate, setFromDate] = useState('10/16/2025');
  const [toDate, setToDate] = useState('10/17/2025');
  const [fromTime, setFromTime] = useState('06:30 AM');
  const [toTime, setToTime] = useState('06:30 AM');
  const [reportName, setReportName] = useState('');

  const handleSearch = () => {
    onSearch();
  };

  const handleReportDownload = (reportType: string) => {
    // Handle report download
    console.log('Downloading:', reportType);
    setReportName(reportType);
    if (onExport) onExport();
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border-4 border-[#005AA7]/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#005AA7] to-[#00C6FF] p-6 pb-5 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20"
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
                    <FileText className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white">Accountant Filters</h3>
                    <p className="text-white/90 text-sm mt-0.5">Financial Reports & Collections</p>
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

            {/* Filter Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
              <div className="space-y-6">
                {/* Report Type Selection Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="mb-2"
                >
                  <Label className="mb-3 block text-gray-900">Select Report Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* Monthly Report */}
                    <motion.button
                      key="accountant-report-card-monthly"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleReportDownload('monthly')}
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
                          key="accountant-report-icon-monthly"
                          className="w-10 h-10 rounded-lg bg-white/90 flex items-center justify-center shadow-md"
                          animate={reportName === 'monthly' ? { rotate: [0, 5, -5, 0] } : {}}
                          transition={{ duration: 2, repeat: reportName === 'monthly' ? Infinity : 0 }}
                        >
                          <FileSpreadsheet className="w-5 h-5 text-green-600" />
                        </motion.div>
                        <div>
                          <div className={`font-semibold ${reportName === 'monthly' ? 'text-white' : 'text-green-700'}`}>
                            Monthly Report
                          </div>
                        </div>
                      </div>
                      {reportName === 'monthly' && (
                        <motion.div
                          key="accountant-report-glow-monthly"
                          className="absolute inset-0 rounded-xl blur-xl opacity-30"
                          style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)' }}
                          animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.2, 0.4, 0.2] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        />
                      )}
                    </motion.button>

                    {/* Consolidated Report */}
                    <motion.button
                      key="accountant-report-card-consolidated"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleReportDownload('consolidated')}
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
                          key="accountant-report-icon-consolidated"
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
                          key="accountant-report-glow-consolidated"
                          className="absolute inset-0 rounded-xl blur-xl opacity-30"
                          style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' }}
                          animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.2, 0.4, 0.2] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        />
                      )}
                    </motion.button>

                    {/* Zone Office Report */}
                    <motion.button
                      key="accountant-report-card-zone"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleReportDownload('zone')}
                      className={`relative p-4 rounded-xl text-left cursor-pointer transition-all duration-300 overflow-hidden ${
                        reportName === 'zone' 
                          ? 'shadow-2xl' 
                          : 'shadow-md hover:shadow-xl'
                      }`}
                      style={{
                        background: reportName === 'zone'
                          ? 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)'
                          : 'linear-gradient(135deg, #06B6D415 0%, #0891B215 100%)',
                        border: reportName === 'zone' ? '3px solid #06B6D4' : '2px solid #06B6D440',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          key="accountant-report-icon-zone"
                          className="w-10 h-10 rounded-lg bg-white/90 flex items-center justify-center shadow-md"
                          animate={reportName === 'zone' ? { rotate: [0, 5, -5, 0] } : {}}
                          transition={{ duration: 2, repeat: reportName === 'zone' ? Infinity : 0 }}
                        >
                          <Download className="w-5 h-5 text-cyan-600" />
                        </motion.div>
                        <div>
                          <div className={`font-semibold ${reportName === 'zone' ? 'text-white' : 'text-cyan-700'}`}>
                            Zone Office Report
                          </div>
                        </div>
                      </div>
                      {reportName === 'zone' && (
                        <motion.div
                          key="accountant-report-glow-zone"
                          className="absolute inset-0 rounded-xl blur-xl opacity-30"
                          style={{ background: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)' }}
                          animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.2, 0.4, 0.2] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        />
                      )}
                    </motion.button>

                    {/* A/c Collection Report */}
                    <motion.button
                      key="accountant-report-card-collection"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleReportDownload('collection')}
                      className={`relative p-4 rounded-xl text-left cursor-pointer transition-all duration-300 overflow-hidden ${
                        reportName === 'collection' 
                          ? 'shadow-2xl' 
                          : 'shadow-md hover:shadow-xl'
                      }`}
                      style={{
                        background: reportName === 'collection'
                          ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                          : 'linear-gradient(135deg, #EF444415 0%, #DC262615 100%)',
                        border: reportName === 'collection' ? '3px solid #EF4444' : '2px solid #EF444440',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          key="accountant-report-icon-collection"
                          className="w-10 h-10 rounded-lg bg-white/90 flex items-center justify-center shadow-md"
                          animate={reportName === 'collection' ? { rotate: [0, 5, -5, 0] } : {}}
                          transition={{ duration: 2, repeat: reportName === 'collection' ? Infinity : 0 }}
                        >
                          <DollarSign className="w-5 h-5 text-red-600" />
                        </motion.div>
                        <div>
                          <div className={`font-semibold ${reportName === 'collection' ? 'text-white' : 'text-red-700'}`}>
                            A/c Collection Report
                          </div>
                        </div>
                      </div>
                      {reportName === 'collection' && (
                        <motion.div
                          key="accountant-report-glow-collection"
                          className="absolute inset-0 rounded-xl blur-xl opacity-30"
                          style={{ background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' }}
                          animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.2, 0.4, 0.2] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  </div>
                </motion.div>
                
                {/* Primary Filters Row 1 */}
                <div className="grid md:grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                  >
                    <Label className="mb-2 block text-gray-900">CFC *</Label>
                    <Select value={cfc} onValueChange={setCfc}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Akola">Akola</SelectItem>
                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                        <SelectItem value="Pune">Pune</SelectItem>
                        <SelectItem value="Panvel">Panvel</SelectItem>
                         <SelectItem value="Amravati">Amravati</SelectItem>
                        <SelectItem value="Jalna">Jalna</SelectItem>
                        <SelectItem value="Parbhani">Parbhani</SelectItem>
                        <SelectItem value="Thane">Thane</SelectItem>
                        
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Label className="mb-2 block text-gray-900">Mode *</Label>
                    <Select value={mode} onValueChange={setMode}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Offline">Offline</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <Label className="mb-2 block text-gray-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      Sector *
                    </Label>
                    <Select value={sector} onValueChange={setSector}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-11">
                        <SelectValue placeholder="None selected" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sectors</SelectItem>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>

                {/* Primary Filters Row 2 */}
                <div className="grid md:grid-cols-4 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Label className="mb-2 block text-gray-900">PayResource *</Label>
                    <Select value={payResource} onValueChange={setPayResource}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Counter">Counter</SelectItem>
                        <SelectItem value="Online Portal">Online Portal</SelectItem>
                        <SelectItem value="Mobile App">Mobile App</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Label className="mb-2 block text-gray-900">Payment Mode *</Label>
                    <Select value={paymentMode} onValueChange={setPaymentMode}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-11">
                        <SelectValue placeholder="None selected" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Label className="mb-2 block text-gray-900">User *</Label>
                    <Select value={user} onValueChange={setUser}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-11">
                        <SelectValue placeholder="None selected" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="clerk">Clerk</SelectItem>
                        <SelectItem value="accountant">Accountant</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Label className="mb-2 block text-gray-900">Tab User *</Label>
                    <Select value={tabUser} onValueChange={setTabUser}>
                      <SelectTrigger className="cursor-pointer bg-white border-2 border-gray-200 hover:border-[#005AA7] transition-colors h-11">
                        <SelectValue placeholder="None selected" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tab Users</SelectItem>
                        <SelectItem value="field1">Field Officer 1</SelectItem>
                        <SelectItem value="field2">Field Officer 2</SelectItem>
                        <SelectItem value="field3">Field Officer 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>

                {/* Date and Time Selection */}
                <div className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-100">
                  {/* From Date/Time */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                  >
                    <div>
                      <Label className="mb-2 block text-gray-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        From Date *
                      </Label>
                      <input 
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#005AA7] focus:border-[#005AA7] cursor-pointer bg-white text-gray-800 transition-all"
                      />
                    </div>
                    
                    <div>
                      <Label className="mb-2 block text-gray-900 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        From Time *
                      </Label>
                      <input 
                        type="time"
                        value={fromTime}
                        onChange={(e) => setFromTime(e.target.value)}
                        className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#005AA7] focus:border-[#005AA7] cursor-pointer bg-white text-gray-800 transition-all"
                      />
                    </div>
                  </motion.div>

                  {/* To Date/Time */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 }}
                    className="space-y-4"
                  >
                    <div>
                      <Label className="mb-2 block text-gray-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        To Date *
                      </Label>
                      <input 
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#005AA7] focus:border-[#005AA7] cursor-pointer bg-white text-gray-800 transition-all"
                      />
                    </div>
                    
                    <div>
                      <Label className="mb-2 block text-gray-900 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        To Time *
                      </Label>
                      <input 
                        type="time"
                        value={toTime}
                        onChange={(e) => setToTime(e.target.value)}
                        className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#005AA7] focus:border-[#005AA7] cursor-pointer bg-white text-gray-800 transition-all"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t-2 border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50/30 p-5">
              <div className="space-y-4">
                {/* Search and Cancel */}
                <div className="grid md:grid-cols-2 gap-3 max-w-lg mx-auto">
                  <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                    <Button 
                      onClick={handleSearch}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white h-12"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Search
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                    <Button 
                      onClick={onClose}
                      variant="outline"
                      className="w-full border-2 border-red-500 text-red-600 hover:bg-red-50 h-12"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}