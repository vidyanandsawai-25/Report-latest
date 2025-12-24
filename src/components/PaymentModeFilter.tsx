import { motion, AnimatePresence } from 'motion/react';
import { X, Filter, Calendar, Search, DollarSign, CreditCard, Wallet, Smartphone, Building2 } from 'lucide-react';
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

interface PaymentModeFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: () => void;
  onExport?: () => void;
}

export function PaymentModeFilter({ isOpen, onClose, onSearch, onExport }: PaymentModeFilterProps) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedWards, setSelectedWards] = useState<string[]>([]);
  const [paymentChannel, setPaymentChannel] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [amountRange, setAmountRange] = useState('');
  const [selectedModes, setSelectedModes] = useState<string[]>([]);

  const wards = ['All Wards', 'Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5'];
  
  const paymentModes = [
    { id: 'cash', label: 'Cash', icon: Wallet, color: 'green' },
    { id: 'card', label: 'Debit/Credit Card', icon: CreditCard, color: 'blue' },
    { id: 'upi', label: 'UPI', icon: Smartphone, color: 'purple' },
    { id: 'netbanking', label: 'Net Banking', icon: Building2, color: 'orange' },
  ];

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

  const togglePaymentMode = (mode: string) => {
    setSelectedModes(prev =>
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    );
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border-4 border-[#8B5CF6]/20"
          >
            <div className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] p-6 pb-5 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-purple-400/20"
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
                    <CreditCard className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white">Payment Mode Analysis</h3>
                    <p className="text-white/90 text-sm mt-0.5">Transaction Distribution & Trends</p>
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
                <div className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-2xl border-2 border-violet-100">
                  <div>
                    <Label className="mb-2 block text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-violet-600" />
                      From Date
                    </Label>
                    <input 
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] cursor-pointer bg-white text-gray-800 transition-all"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-violet-600" />
                      To Date
                    </Label>
                    <input 
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] cursor-pointer bg-white text-gray-800 transition-all"
                    />
                  </div>
                </div>

                {/* Payment Mode Selection */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200">
                  <Label className="mb-3 block text-gray-900">Select Payment Modes</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentModes.map((mode) => (
                      <motion.div
                        key={mode.id}
                        className={`flex items-center space-x-3 p-4 rounded-lg transition-all cursor-pointer ${
                          selectedModes.includes(mode.id)
                            ? `bg-${mode.color}-100 ring-2 ring-${mode.color}-500`
                            : 'bg-white hover:bg-gray-50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => togglePaymentMode(mode.id)}
                      >
                        <Checkbox 
                          id={mode.id}
                          checked={selectedModes.includes(mode.id)}
                          onCheckedChange={() => togglePaymentMode(mode.id)}
                        />
                        <mode.icon className={`w-5 h-5 text-${mode.color}-600`} />
                        <label htmlFor={mode.id} className="cursor-pointer text-sm flex-1">
                          {mode.label}
                        </label>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Ward Selection */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-200">
                  <MultiSelectCheckboxDropdown
                    label="Ward No"
                    options={wards}
                    selectedValues={selectedWards}
                    onChange={setSelectedWards}
                    placeholder="Select wards"
                  />
                </div>

                {/* Additional Filters */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block text-gray-900">Payment Channel</Label>
                    <Select value={paymentChannel} onValueChange={setPaymentChannel}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Channels</SelectItem>
                        <SelectItem value="online">Online Portal</SelectItem>
                        <SelectItem value="counter">Counter Payment</SelectItem>
                        <SelectItem value="mobile">Mobile App</SelectItem>
                        <SelectItem value="kiosk">Kiosk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block text-gray-900">Transaction Status</Label>
                    <Select value={transactionStatus} onValueChange={setTransactionStatus}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label className="mb-2 block text-gray-900">Amount Range (₹)</Label>
                    <Select value={amountRange} onValueChange={setAmountRange}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select amount range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Amounts</SelectItem>
                        <SelectItem value="0-500">₹0 - ₹500</SelectItem>
                        <SelectItem value="501-2000">₹501 - ₹2,000</SelectItem>
                        <SelectItem value="2001-5000">₹2,001 - ₹5,000</SelectItem>
                        <SelectItem value="5001-10000">₹5,001 - ₹10,000</SelectItem>
                        <SelectItem value="10000+">₹10,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-gray-100 bg-gradient-to-r from-gray-50 to-violet-50/30 p-5">
              <div className="grid md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <Button 
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] hover:from-[#7C3AED] hover:to-[#8B5CF6] text-white h-12"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Generate Analysis
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