import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import {
  Send,
  X,
  Users,
  IndianRupee,
  MessageSquare,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Edit3,
  User,
  Phone,
  ChevronDown,
  Zap,
  Clock,
  Shield,
  Eye,
  Copy,
  CheckCheck,
  TrendingUp
} from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface Customer {
  id: number;
  upicId: string;
  name: string;
  ward: string;
  address: string;
  mobile: string;
  status: 'pending' | 'sent' | 'failed';
  billAmount?: string;
}

interface SMSConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedCustomers: Customer[];
  totalAmount: string;
}

export function SMSConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  selectedCustomers,
  totalAmount
}: SMSConfirmDialogProps) {
  const [smsMessage, setSmsMessage] = useState(
    `Dear Customer, Your water bill of ₹{AMOUNT} is pending. Please pay at the earliest to avoid disconnection. - Akola Municipal Corporation`
  );
  const [isEditing, setIsEditing] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const smsCharges = selectedCustomers.length * 0.25; // ₹0.25 per SMS
  const estimatedTime = Math.ceil(selectedCustomers.length / 10); // 10 SMS per second
  
  // Character count with color coding
  const charCount = smsMessage.length;
  const charColor = charCount > 160 ? 'text-red-600' : charCount > 140 ? 'text-orange-600' : 'text-green-600';
  const charBg = charCount > 160 ? 'bg-red-100' : charCount > 140 ? 'bg-orange-100' : 'bg-green-100';

  const handleConfirm = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      setTimeout(() => {
        onConfirm();
        setSuccess(false);
      }, 2000);
    }, 2000);
  };

  const handleCopy = () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(smsMessage).then(() => {
          setCopied(true);
          toast.success('SMS template copied to clipboard');
          setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
          // Fallback to textarea method
          fallbackCopy();
        });
      } else {
        // Fallback for browsers that don't support clipboard API
        fallbackCopy();
      }
    } catch (error) {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    try {
      // Create a temporary textarea
      const textarea = document.createElement('textarea');
      textarea.value = smsMessage;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      
      // Execute copy command
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      if (successful) {
        setCopied(true);
        toast.success('SMS template copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
      } else {
        toast.error('Failed to copy. Please copy manually.');
      }
    } catch (error) {
      toast.error('Copy not supported. Please select and copy manually.');
    }
  };

  const quickTemplates = [
    'Payment Reminder',
    'Final Notice',
    'Thank You'
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            {/* Success Animation Overlay */}
            {success && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
              >
                {/* Confetti Effect */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: ['#60A5FA', '#34D399', '#F59E0B', '#EC4899'][i % 4],
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: (Math.random() - 0.5) * 400,
                      y: (Math.random() - 0.5) * 400,
                      rotate: Math.random() * 360,
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.03,
                      ease: 'easeOut',
                    }}
                  />
                ))}
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                  className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl"
                >
                  <CheckCircle2 className="w-20 h-20 text-white" strokeWidth={3} />
                </motion.div>
              </motion.div>
            )}

            {/* Dialog Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Animated Background Orbs */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                  }}
                  transition={{ duration: 20, repeat: Infinity }}
                  className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                  }}
                  transition={{ duration: 25, repeat: Infinity }}
                  className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"
                />
              </div>

              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-4 md:px-6 py-3 md:py-4">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg"
                    >
                      <Send className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </motion.div>
                    <div>
                      <h2 className="text-lg md:text-xl text-white font-semibold">Confirm SMS Sending</h2>
                      <p className="text-blue-100 text-[10px] md:text-xs">Review details before sending</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-9 h-9 md:w-10 md:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all"
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.button>
                </div>

                {/* Stats Cards in Header */}
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-2.5 border border-white/20 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                    <div className="flex items-center gap-1 md:gap-2 mb-0.5 relative z-10">
                      <Users className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                      <span className="text-[10px] md:text-xs text-blue-100">Recipients</span>
                    </div>
                    <p className="text-lg md:text-xl text-white font-bold relative z-10">{selectedCustomers.length}</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-2.5 border border-white/20 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        delay: 0.3,
                      }}
                    />
                    <div className="flex items-center gap-1 md:gap-2 mb-0.5 relative z-10">
                      <IndianRupee className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                      <span className="text-[10px] md:text-xs text-blue-100">Total Pending</span>
                    </div>
                    <p className="text-lg md:text-xl text-white font-bold relative z-10">{totalAmount}</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-2.5 border border-white/20 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        delay: 0.6,
                      }}
                    />
                    <div className="flex items-center gap-1 md:gap-2 mb-0.5 relative z-10">
                      <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                      <span className="text-[10px] md:text-xs text-blue-100">Est. Time</span>
                    </div>
                    <p className="text-lg md:text-xl text-white font-bold relative z-10">{estimatedTime}s</p>
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-4 md:p-6 space-y-3">
                {/* SMS Preview Card */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 md:p-4 border-2 border-purple-200 overflow-hidden"
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                  
                  <div className="relative flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                      <h3 className="text-gray-900 font-semibold text-sm">SMS Preview</h3>
                      <span className={`px-2 py-0.5 ${charBg} ${charColor} rounded-full text-[10px] font-bold`}>
                        {charCount}/160
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopy}
                        className="flex items-center gap-1 md:gap-1.5 px-2 md:px-2.5 py-1 bg-white border-2 border-purple-300 rounded-lg text-purple-600 text-xs hover:bg-purple-50 transition-all"
                      >
                        {copied ? (
                          <>
                            <CheckCheck className="w-3 h-3" />
                            <span className="hidden sm:inline">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="hidden sm:inline">Copy</span>
                          </>
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center gap-1 md:gap-1.5 px-2 md:px-2.5 py-1 bg-white border-2 border-purple-300 rounded-lg text-purple-600 text-xs hover:bg-purple-50 transition-all"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span className="hidden sm:inline">{isEditing ? 'Save' : 'Edit'}</span>
                      </motion.button>
                    </div>
                  </div>

                  {isEditing ? (
                    <motion.textarea
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      value={smsMessage}
                      onChange={(e) => setSmsMessage(e.target.value)}
                      className="w-full bg-white rounded-lg border-2 border-purple-300 p-3 text-xs text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                      rows={3}
                      placeholder="Type your SMS message here..."
                    />
                  ) : (
                    <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                      <p className="text-xs text-gray-700 leading-relaxed">{smsMessage}</p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-purple-200">
                        <span className="text-[10px] text-gray-500">Message Length</span>
                        <span className={`text-[10px] font-semibold ${charColor}`}>{smsMessage.length} characters</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Quick Templates */}
                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center gap-2 mt-2 flex-wrap"
                    >
                      <span className="text-[10px] text-purple-600 font-semibold">Quick:</span>
                      {quickTemplates.map((template, index) => (
                        <motion.button
                          key={template}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => {
                            toast.success(`${template} template applied`);
                          }}
                          className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-[10px] hover:shadow-lg transition-all"
                        >
                          {template}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Customer List Preview */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 overflow-hidden"
                  >
                    <button
                      onClick={() => setShowCustomers(!showCustomers)}
                      className="w-full p-3 flex items-center justify-between hover:bg-white/50 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <h3 className="text-gray-900 font-semibold text-sm">Customer List</h3>
                        <span className="px-1.5 py-0.5 bg-blue-200 text-blue-700 rounded-full text-[10px] font-semibold">
                          {selectedCustomers.length}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: showCustomers ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4 text-blue-600" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {showCustomers && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 space-y-2 max-h-64 overflow-y-auto">
                            {selectedCustomers.slice(0, 5).map((customer, index) => (
                              <motion.div
                                key={customer.id}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-xl p-3 border border-blue-200 hover:shadow-md transition-all"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                                    {customer.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-gray-900 truncate">{customer.name}</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                      <Phone className="w-3 h-3" />
                                      <span>{customer.mobile}</span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs text-gray-500">Bill Amount</p>
                                    <p className="text-sm font-bold text-green-600">{customer.billAmount || '₹850'}</p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                            {selectedCustomers.length > 5 && (
                              <div className="text-center py-2">
                                <span className="text-sm text-blue-600">
                                  +{selectedCustomers.length - 5} more customers
                                </span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Cost Breakdown */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border-2 border-green-200 relative overflow-hidden group"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-emerald-400/0 group-hover:from-green-400/10 group-hover:to-emerald-400/10 transition-all duration-500" />
                    
                    <div className="flex items-center gap-2 mb-2 relative z-10">
                      <Zap className="w-4 h-4 text-green-600" />
                      <h3 className="text-gray-900 font-semibold text-sm">Cost Breakdown</h3>
                    </div>
                    <div className="space-y-1.5 relative z-10">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">SMS Charges ({selectedCustomers.length} × ₹0.25)</span>
                        <span className="font-semibold text-gray-900">₹{smsCharges.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Platform Fee</span>
                        <span className="font-semibold text-green-600">₹0.00 FREE</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-green-600" />
                          Success Rate
                        </span>
                        <span className="font-semibold text-green-600">98.5%</span>
                      </div>
                      <div className="h-px bg-green-300 my-1"></div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900 text-sm">Total Cost</span>
                        <span className="text-lg font-bold text-green-600">₹{smsCharges.toFixed(2)}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Warning Banner */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-3 border-2 border-orange-300"
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-orange-900 mb-0.5">Important Notice</p>
                      <p className="text-[10px] text-orange-800">
                        SMS charges will be applied. This action cannot be undone once confirmed.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-3 gap-0 pt-2"
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={onClose}
                      variant="outline"
                      disabled={sending}
                      className="w-full h-10 md:h-11 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-l-xl rounded-r-none text-xs md:text-sm border-r-0 hover:border-gray-400 transition-all"
                    >
                      <X className="w-3.5 h-3.5 md:w-4 md:h-4 md:mr-1" />
                      <span className="hidden sm:inline">Cancel</span>
                    </Button>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02, zIndex: 10 }} 
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    <Button
                      onClick={() => toast.success('SMS Preview opened')}
                      variant="outline"
                      disabled={sending}
                      className="w-full h-10 md:h-11 border-2 border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 rounded-none text-xs md:text-sm transition-all relative z-10"
                    >
                      <Eye className="w-3.5 h-3.5 md:w-4 md:h-4 md:mr-1" />
                      <span className="hidden sm:inline">Preview</span>
                    </Button>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    <Button
                      onClick={handleConfirm}
                      disabled={sending}
                      className="w-full h-10 md:h-11 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-r-xl rounded-l-none shadow-lg hover:shadow-xl text-xs md:text-sm relative overflow-hidden border-0 transition-all"
                    >
                      {/* Glow Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-cyan-400/50 blur-xl"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                      
                      {sending ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-3.5 h-3.5 md:w-4 md:h-4 border-2 border-white/30 border-t-white rounded-full mr-1 md:mr-2 relative z-10"
                          />
                          <span className="relative z-10 hidden sm:inline">Sending...</span>
                          <span className="relative z-10 sm:hidden">Send</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 md:w-4 md:h-4 md:mr-2 relative z-10" />
                          <span className="relative z-10 hidden sm:inline">Confirm & Send</span>
                          <span className="relative z-10 sm:hidden">Send</span>
                        </>
                      )}
                      
                      {/* Sparkle Animation */}
                      {!sending && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute"
                              initial={{ scale: 0, x: '50%', y: '50%' }}
                              animate={{
                                scale: [0, 1, 0],
                                x: [50 + i * 30, 70 + i * 30],
                                y: [50, 20],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.3,
                              }}
                            >
                              <Sparkles className="w-3 h-3 text-white" />
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Security Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center gap-2 text-[10px] text-gray-500 pt-1 relative"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute w-4 h-4 bg-green-500/20 rounded-full blur-sm"
                  />
                  <Shield className="w-3 h-3 text-green-600 relative z-10" />
                  <span className="text-center">Secured by Maharashtra Government Portal Standards</span>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-green-500 rounded-full"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}