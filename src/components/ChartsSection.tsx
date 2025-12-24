import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function ChartsSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const zoneData = [
    { zone: 'Zone A', collection: 1.2 },
    { zone: 'Zone B', collection: 1.5 },
    { zone: 'Zone C', collection: 1.4 },
    { zone: 'Zone D', collection: 1.3 }
  ];

  const paymentModeData = [
    { name: 'Online', value: 45, color: '#3B82F6' },
    { name: 'Cash', value: 25, color: '#10B981' },
    { name: 'UPI', value: 20, color: '#8B5CF6' },
    { name: 'Cheque', value: 10, color: '#F59E0B' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.05 }}
      className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100"
    >
      <div 
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="bg-gradient-to-r from-[#005AA7] to-[#00C6FF] bg-clip-text text-transparent">
          Performance Charts
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-[#005AA7]" />
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 pt-2">
          {/* Bar Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 shadow-md border-2 border-blue-100"
          >
            <h4 className="text-gray-800 mb-4">Zone-wise Collection</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={zoneData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="zone" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #3B82F6',
                    borderRadius: '12px'
                  }}
                  formatter={(value: number) => `₹${value} Cr`}
                />
                <Bar 
                  dataKey="collection" 
                  fill="url(#barGradient)"
                  radius={[8, 8, 0, 0]}
                  animationDuration={600}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.03 }}
            className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-4 shadow-md border-2 border-violet-100"
          >
            <h4 className="text-gray-800 mb-4">Payment Mode Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={paymentModeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={50}
                  animationDuration={600}
                >
                  {paymentModeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #8B5CF6',
                    borderRadius: '12px'
                  }}
                  formatter={(value: number) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}