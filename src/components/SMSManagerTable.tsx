import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import {
  Phone,
  Mail,
  Eye,
  MoreVertical,
  ChevronDown,
  CheckCheck,
  Clock,
  MapPin,
  User,
  TrendingUp,
  Send,
  Copy,
  Edit,
  Trash2,
  AlertCircle,
  IndianRupee
} from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
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
  lastContacted?: string;
  priority?: 'high' | 'medium' | 'low';
  deliveryStatus?: 'delivered' | 'pending' | 'failed';
  email?: string;
}

interface SMSManagerTableProps {
  customers: Customer[];
  selectedCustomers: number[];
  onSelectCustomer: (id: number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  currentPage: number;
  itemsPerPage: number;
  onSendSMS?: (customerId: number) => void;
}

export function SMSManagerTable({
  customers,
  selectedCustomers,
  onSelectCustomer,
  onSelectAll,
  currentPage,
  itemsPerPage,
  onSendSMS
}: SMSManagerTableProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // Generate avatar initials and color
  const getAvatarData = (name: string) => {
    const initials = name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('');
    
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-teal-500 to-teal-600',
    ];
    
    const colorIndex = name.charCodeAt(0) % colors.length;
    return { initials, gradient: colors[colorIndex] };
  };

  // Get priority badge
  const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
    const styles = {
      high: 'bg-red-100 text-red-700 border-red-300',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      low: 'bg-green-100 text-green-700 border-green-300',
    };
    return styles[priority];
  };

  const handleQuickCall = (mobile: string) => {
    toast.success(`Calling ${mobile}...`);
  };

  const handleQuickSMS = (id: number, name: string) => {
    toast.success(`SMS sent to ${name}`);
    if (onSendSMS) {
      onSendSMS(id);
    }
  };

  const handleViewDetails = (customer: Customer) => {
    setExpandedRow(expandedRow === customer.id ? null : customer.id);
  };

  return (
    <div className="space-y-2">
      {/* Select All Header Card - Hidden on mobile, visible on tablet+ */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden lg:block bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-3 shadow-md overflow-x-auto"
      >
        <div className="grid grid-cols-[40px_50px_minmax(280px,1fr)_120px_150px_120px_140px] gap-4 items-center text-white min-w-[900px]">
          <div className="flex justify-center">
            <Checkbox
              checked={selectedCustomers.length === customers.length && customers.length > 0}
              onCheckedChange={onSelectAll}
              className="border-2 border-white data-[state=checked]:bg-white data-[state=checked]:text-blue-600"
            />
          </div>
          <span className="text-xs font-medium text-center">#</span>
          <span className="text-xs font-medium">Customer Details</span>
          <span className="text-xs font-medium text-center">Ward</span>
          <span className="text-xs font-medium text-center">Contact</span>
          <span className="text-xs font-medium text-center">Status</span>
          <span className="text-xs font-medium text-center">Actions</span>
        </div>
      </motion.div>

      {/* Mobile Select All Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:hidden bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-3 shadow-md"
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={selectedCustomers.length === customers.length && customers.length > 0}
              onCheckedChange={onSelectAll}
              className="border-2 border-white data-[state=checked]:bg-white data-[state=checked]:text-blue-600"
            />
            <span className="text-sm font-medium">Select All</span>
          </div>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
            {selectedCustomers.length} / {customers.length} selected
          </span>
        </div>
      </motion.div>

      {/* Customer Cards */}
      <AnimatePresence mode="popLayout">
        {customers.map((customer, index) => {
          const { initials, gradient } = getAvatarData(customer.name);
          const isExpanded = expandedRow === customer.id;
          const isHovered = hoveredRow === customer.id;
          const isSelected = selectedCustomers.includes(customer.id);
          
          // Generate random bill amount and priority for demo
          const billAmount = customer.billAmount || `₹${Math.floor(Math.random() * 2000) + 500}`;
          const priority = (customer.priority || ['high', 'medium', 'low'][Math.floor(Math.random() * 3)]) as 'high' | 'medium' | 'low';
          const lastContacted = customer.lastContacted || `${Math.floor(Math.random() * 30) + 1} days ago`;

          return (
            <motion.div
              key={customer.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredRow(customer.id)}
              onMouseLeave={() => setHoveredRow(null)}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                isSelected
                  ? 'shadow-xl ring-2 ring-blue-400 ring-offset-2'
                  : 'shadow-md hover:shadow-xl'
              }`}
              style={{
                background: isSelected
                  ? 'linear-gradient(135deg, #E0F2FE 0%, #DBEAFE 100%)'
                  : 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
              }}
            >
              {/* Animated Border Gradient */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899, #3B82F6)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '200% 0%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              )}

              {/* Main Card Content - Desktop Layout */}
              <div className="relative p-3 hidden lg:block overflow-x-auto">
                <div className="grid grid-cols-[40px_50px_minmax(280px,1fr)_120px_150px_120px_140px] gap-4 items-center min-w-[900px]">
                  {/* Checkbox */}
                  <div className="flex justify-center">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => onSelectCustomer(customer.id, checked as boolean)}
                      className="w-4 h-4 border-2"
                    />
                  </div>

                  {/* Sr. No with Pulse Animation */}
                  <div className="flex justify-center">
                    <motion.div
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-gray-700 font-semibold text-sm relative z-10">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </span>
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 opacity-30"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Avatar & Customer Details */}
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 3 }}
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-bold shadow-md relative overflow-hidden flex-shrink-0`}
                    >
                      {initials}
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 font-medium text-sm truncate">
                        {customer.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-700 text-xs hover:underline"
                        >
                          {customer.upicId}
                        </a>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${getPriorityBadge(priority)}`}>
                          {priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ward */}
                  <div className="flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200 shadow-sm inline-flex items-center gap-1.5"
                    >
                      <MapPin className="w-3 h-3 text-blue-600" />
                      <span className="text-blue-700 font-medium text-xs">Ward {customer.ward}</span>
                    </motion.div>
                  </div>

                  {/* Contact */}
                  <div className="flex justify-center">
                    <motion.a
                      href={`tel:${customer.mobile}`}
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-sm transition-all"
                    >
                      <Phone className="w-3 h-3 text-green-600" />
                      <span className="text-green-700 font-medium text-xs">{customer.mobile}</span>
                    </motion.a>
                  </div>

                  {/* Status Badge */}
                  <div className="flex justify-center">
                    {customer.status === 'sent' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-2.5 py-1.5 bg-gradient-to-br from-green-100 to-emerald-100 border border-green-300 rounded-lg flex items-center gap-1.5"
                      >
                        <CheckCheck className="w-3 h-3 text-green-600" />
                        <span className="text-green-700 font-medium text-xs">Sent</span>
                      </motion.div>
                    )}
                    {customer.status === 'pending' && (
                      <motion.div
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="px-2.5 py-1.5 bg-gradient-to-br from-orange-100 to-yellow-100 border border-orange-300 rounded-lg flex items-center gap-1.5"
                      >
                        <Clock className="w-3 h-3 text-orange-600" />
                        <span className="text-orange-700 font-medium text-xs">Pending</span>
                      </motion.div>
                    )}
                    {customer.status === 'failed' && (
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="px-2.5 py-1.5 bg-gradient-to-br from-red-100 to-pink-100 border border-red-300 rounded-lg flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-3 h-3 text-red-600" />
                        <span className="text-red-700 font-medium text-xs">Failed</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center justify-center gap-1.5">
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickCall(customer.mobile)}
                      className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all"
                      title="Call Customer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickSMS(customer.id, customer.name)}
                      className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all"
                      title="Send SMS"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleViewDetails(customer)}
                      className={`w-8 h-8 rounded-lg ${
                        isExpanded
                          ? 'bg-gradient-to-br from-purple-500 to-purple-600'
                          : 'bg-gradient-to-br from-gray-400 to-gray-500'
                      } text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all`}
                      title="View Details"
                    >
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </motion.div>
                    </motion.button>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t-2 border-gray-200 px-3 lg:px-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Address Card */}
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-5 h-5 text-blue-600" />
                              <span className="text-sm text-gray-600">Address</span>
                            </div>
                            <p className="text-gray-900 text-sm">{customer.address}</p>
                          </motion.div>

                          {/* Bill Amount Card */}
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <IndianRupee className="w-5 h-5 text-green-600" />
                              <span className="text-sm text-gray-600">Pending Bill</span>
                            </div>
                            <p className="text-green-600 font-bold text-xl">{billAmount}</p>
                          </motion.div>

                          {/* Last Contacted Card */}
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-5 h-5 text-purple-600" />
                              <span className="text-sm text-gray-600">Last Contacted</span>
                            </div>
                            <p className="text-purple-600 font-medium">{lastContacted}</p>
                          </motion.div>
                        </div>

                        {/* Additional Actions */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.25 }}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4"
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-2 border-green-300 text-green-600 hover:bg-green-50"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Info
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-2 border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Card Layout */}
              <div className="relative p-4 lg:hidden">
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <div className="flex-shrink-0 pt-1">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => onSelectCustomer(customer.id, checked as boolean)}
                      className="w-5 h-5 border-2"
                    />
                  </div>

                  {/* Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shadow-md relative overflow-hidden flex-shrink-0`}
                  >
                    {initials}
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    />
                  </motion.div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 font-medium text-sm mb-1 truncate">
                          {customer.name}
                        </h3>
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-700 text-xs hover:underline block mb-1"
                        >
                          {customer.upicId}
                        </a>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border inline-block ${getPriorityBadge(priority)}`}>
                          {priority.toUpperCase()}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div className="flex-shrink-0">
                        {customer.status === 'sent' && (
                          <div className="px-2 py-1 bg-gradient-to-br from-green-100 to-emerald-100 border border-green-300 rounded-lg flex items-center gap-1">
                            <CheckCheck className="w-3 h-3 text-green-600" />
                            <span className="text-green-700 font-medium text-xs">Sent</span>
                          </div>
                        )}
                        {customer.status === 'pending' && (
                          <div className="px-2 py-1 bg-gradient-to-br from-orange-100 to-yellow-100 border border-orange-300 rounded-lg flex items-center gap-1">
                            <Clock className="w-3 h-3 text-orange-600" />
                            <span className="text-orange-700 font-medium text-xs">Pending</span>
                          </div>
                        )}
                        {customer.status === 'failed' && (
                          <div className="px-2 py-1 bg-gradient-to-br from-red-100 to-pink-100 border border-red-300 rounded-lg flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-red-600" />
                            <span className="text-red-700 font-medium text-xs">Failed</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contact & Ward Info */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <a
                        href={`tel:${customer.mobile}`}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg text-xs"
                      >
                        <Phone className="w-3 h-3 text-green-600" />
                        <span className="text-green-700 font-medium">{customer.mobile}</span>
                      </a>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
                        <MapPin className="w-3 h-3 text-blue-600" />
                        <span className="text-blue-700 font-medium text-xs">Ward {customer.ward}</span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuickCall(customer.mobile)}
                        className="flex-1 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center gap-1.5 shadow-sm text-xs font-medium"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Call
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuickSMS(customer.id, customer.name)}
                        className="flex-1 h-9 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center gap-1.5 shadow-sm text-xs font-medium"
                      >
                        <Send className="w-3.5 h-3.5" />
                        SMS
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewDetails(customer)}
                        className={`flex-1 h-9 rounded-lg ${
                          isExpanded
                            ? 'bg-gradient-to-br from-purple-500 to-purple-600'
                            : 'bg-gradient-to-br from-gray-400 to-gray-500'
                        } text-white flex items-center justify-center gap-1.5 shadow-sm text-xs font-medium`}
                      >
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </motion.div>
                        Details
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}