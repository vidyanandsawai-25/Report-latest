import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Zap,
  BarChart3,
  ChevronRight,
  Droplets,
  FileCheck,
  IndianRupee,
  Radio
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';

interface CollectionInsightsCardProps {
  onClick?: () => void;
}

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 0.3
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export function CollectionInsightsCard({ onClick }: CollectionInsightsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLive, setIsLive] = useState(true);
  
  // Base data for charts
  const baseWeeklyData = [
    { day: 'Mon', collection: 45000, bills: 120 },
    { day: 'Tue', collection: 52000, bills: 145 },
    { day: 'Wed', collection: 48000, bills: 130 },
    { day: 'Thu', collection: 61000, bills: 168 },
    { day: 'Fri', collection: 55000, bills: 152 },
    { day: 'Sat', collection: 49000, bills: 135 },
    { day: 'Sun', collection: 38000, bills: 98 }
  ];

  // Live updating data state
  const [weeklyCollectionData, setWeeklyCollectionData] = useState(baseWeeklyData);

  // Base connection type data
  const baseConnectionData = [
    { name: 'Residential', value: 2450, color: '#10B981' },
    { name: 'Commercial', value: 850, color: '#3B82F6' },
    { name: 'Industrial', value: 320, color: '#F59E0B' },
    { name: 'Government', value: 180, color: '#8B5CF6' }
  ];

  const [connectionTypeData, setConnectionTypeData] = useState(baseConnectionData);

  // Base bubble chart data - Ward wise collection analysis with vibrant colors
  const baseBubbleData = [
    { ward: 'Ward A', connections: 450, collection: 125000, billsPaid: 380, fill: '#10B981' },
    { ward: 'Ward B', connections: 620, collection: 168000, billsPaid: 520, fill: '#3B82F6' },
    { ward: 'Ward C', connections: 380, collection: 98000, billsPaid: 310, fill: '#F59E0B' },
    { ward: 'Ward D', connections: 520, collection: 142000, billsPaid: 445, fill: '#8B5CF6' },
    { ward: 'Ward E', connections: 410, collection: 115000, billsPaid: 345, fill: '#EC4899' },
    { ward: 'Ward F', connections: 680, collection: 185000, billsPaid: 590, fill: '#06B6D4' },
    { ward: 'Ward G', connections: 290, collection: 78000, billsPaid: 235, fill: '#84CC16' },
    { ward: 'Ward H', connections: 540, collection: 152000, billsPaid: 465, fill: '#F97316' }
  ];

  const [bubbleChartData, setBubbleChartData] = useState(baseBubbleData);

  const baseMonthlyStats = {
    totalBills: 3845,
    paidBills: 3210,
    pendingBills: 635,
    totalCollection: 348500,
    averageCollection: 108.5,
    collectionRate: 83.5
  };

  const [monthlyStats, setMonthlyStats] = useState(baseMonthlyStats);

  // Live data update simulation
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Update weekly collection with small random variations
      setWeeklyCollectionData(prev => prev.map(day => ({
        ...day,
        collection: Math.max(30000, day.collection + Math.floor(Math.random() * 2000 - 1000)),
        bills: Math.max(80, day.bills + Math.floor(Math.random() * 10 - 5))
      })));

      // Update connection type data
      setConnectionTypeData(prev => prev.map(conn => ({
        ...conn,
        value: Math.max(100, conn.value + Math.floor(Math.random() * 20 - 10))
      })));

      // Update bubble chart data
      setBubbleChartData(prev => prev.map(ward => ({
        ...ward,
        collection: Math.max(70000, ward.collection + Math.floor(Math.random() * 3000 - 1500)),
        billsPaid: Math.max(200, ward.billsPaid + Math.floor(Math.random() * 10 - 5))
      })));

      // Update monthly stats
      setMonthlyStats(prev => ({
        ...prev,
        paidBills: Math.min(prev.totalBills, prev.paidBills + Math.floor(Math.random() * 5)),
        pendingBills: Math.max(0, prev.pendingBills - Math.floor(Math.random() * 3)),
        totalCollection: prev.totalCollection + Math.floor(Math.random() * 2000 - 500),
        collectionRate: Math.min(100, prev.collectionRate + (Math.random() * 0.2 - 0.1))
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const metrics = [
    {
      icon: FileCheck,
      label: 'Bills Paid',
      value: monthlyStats.paidBills,
      total: monthlyStats.totalBills,
      color: '#10B981',
      gradient: 'from-emerald-500 to-green-600',
      percentage: ((monthlyStats.paidBills / monthlyStats.totalBills) * 100).toFixed(1)
    },
    {
      icon: Clock,
      label: 'Pending Bills',
      value: monthlyStats.pendingBills,
      total: monthlyStats.totalBills,
      color: '#F59E0B',
      gradient: 'from-amber-500 to-orange-600',
      percentage: ((monthlyStats.pendingBills / monthlyStats.totalBills) * 100).toFixed(1)
    },
    {
      icon: IndianRupee,
      label: 'Total Collection',
      value: `₹${(monthlyStats.totalCollection / 1000).toFixed(0)}K`,
      color: '#3B82F6',
      gradient: 'from-blue-500 to-indigo-600',
      subLabel: 'This Month'
    },
    {
      icon: TrendingUp,
      label: 'Collection Rate',
      value: `${monthlyStats.collectionRate}%`,
      color: '#8B5CF6',
      gradient: 'from-violet-500 to-purple-600',
      subLabel: '+5.2% from last month'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        delay: 0.15,
        type: "spring",
        stiffness: 100
      }}
      className="relative"
    >
      {/* Main Card Container */}
      <motion.div
        className={`bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40 backdrop-blur-xl rounded-3xl border-2 border-white/60 shadow-2xl overflow-hidden transition-all duration-500 ${
          isExpanded ? 'h-auto' : ''
        }`}
        style={{
          boxShadow: '0 20px 60px rgba(0, 90, 167, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5)'
        }}
      >
        {/* Header Section */}
        <div className="relative p-5 pb-3">
          {/* Animated Background Gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#005AA7]/5 via-[#00C6FF]/5 to-[#005AA7]/5"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <div className="relative z-10 flex items-start justify-between">
            <div className="flex-1">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.5,
                  type: "spring",
                  stiffness: 200
                }}
                className="inline-flex items-center gap-3"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#005AA7] to-[#00C6FF] flex items-center justify-center shadow-lg"
                >
                  <BarChart3 className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-gray-900">Monthly Insights</h3>
                    {isLive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1 px-2 py-0.5 bg-red-500 text-white rounded-full text-xs"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Radio className="w-3 h-3" />
                        </motion.div>
                        <span>LIVE</span>
                      </motion.div>
                    )}
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-block"
                    >
                      <Zap className="w-4 h-4 text-[#F59E0B]" />
                    </motion.span>
                  </div>
                  <p className="text-xs text-gray-600">Real-time collection analytics • Updates every 3s</p>
                </div>
              </motion.div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setIsLive(!isLive)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs shadow-md transition-all ${
                  isLive 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                <Radio className="w-3 h-3" />
                <span>{isLive ? 'Live' : 'Paused'}</span>
              </motion.button>

              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#005AA7] to-[#00C6FF] text-white rounded-lg shadow-lg hover:shadow-xl transition-all text-xs"
              >
                <span>{isExpanded ? 'Less' : 'Details'}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="w-3 h-3" />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="px-6 pb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.6 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -4,
                  boxShadow: `0 12px 32px ${metric.color}25`
                }}
                className="relative bg-white/80 backdrop-blur-sm rounded-xl p-3 border-2 border-white shadow-lg overflow-hidden group cursor-pointer"
              >
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-2">
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md"
                      style={{ 
                        backgroundColor: `${metric.color}15`,
                      }}
                    >
                      <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
                    </motion.div>
                    {metric.percentage && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="px-2 py-1 rounded-lg text-xs"
                        style={{ 
                          backgroundColor: `${metric.color}15`,
                          color: metric.color
                        }}
                      >
                        {metric.percentage}%
                      </motion.div>
                    )}
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    key={metric.value} // Add key for animation on value change
                  >
                    <motion.div 
                      className="text-xl text-gray-900 mb-0.5"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {metric.value}
                    </motion.div>
                    <div className="text-xs text-gray-600 mb-0.5">{metric.label}</div>
                    {metric.total && (
                      <div className="text-xs text-gray-500">of {metric.total} total</div>
                    )}
                    {metric.subLabel && (
                      <div className="text-xs text-gray-500">{metric.subLabel}</div>
                    )}
                  </motion.div>

                  {/* Progress Bar */}
                  {metric.percentage && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                      className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden"
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.percentage}%` }}
                        transition={{ delay: 1 + index * 0.1, duration: 1 }}
                        className={`h-full bg-gradient-to-r ${metric.gradient} rounded-full`}
                        key={metric.percentage} // Animate on value change
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="px-5 pb-5"
            >
              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Weekly Collection Trend */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border-2 border-white shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#10B981]" />
                      <h4 className="text-sm text-gray-900">Weekly Collection Trend</h4>
                    </div>
                    {isLive && (
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-red-500 rounded-full"
                      />
                    )}
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={weeklyCollectionData}>
                      <defs>
                        <linearGradient id="colorCollection" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
                      <YAxis stroke="#6B7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '2px solid #10B981',
                          borderRadius: '12px',
                          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.2)'
                        }}
                        formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Collection']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="collection" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorCollection)"
                        animationDuration={1000}
                        isAnimationActive={true}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Connection Type Distribution */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border-2 border-white shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-[#3B82F6]" />
                      <h4 className="text-sm text-gray-900">Connection Distribution</h4>
                    </div>
                    {isLive && (
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className="w-2 h-2 bg-red-500 rounded-full"
                      />
                    )}
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={connectionTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={65}
                        fill="#8884d8"
                        dataKey="value"
                        animationDuration={800}
                      >
                        {connectionTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '2px solid #3B82F6',
                          borderRadius: '12px',
                          boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Daily Bills Processed */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border-2 border-white shadow-lg lg:col-span-2"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
                      <h4 className="text-sm text-gray-900">Daily Bills Processed</h4>
                    </div>
                    {isLive && (
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="w-2 h-2 bg-red-500 rounded-full"
                      />
                    )}
                  </div>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={weeklyCollectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
                      <YAxis stroke="#6B7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '2px solid #8B5CF6',
                          borderRadius: '12px',
                          boxShadow: '0 8px 24px rgba(139, 92, 246, 0.2)'
                        }}
                        formatter={(value: number) => [value, 'Bills']}
                      />
                      <Bar 
                        dataKey="bills" 
                        radius={[8, 8, 0, 0]}
                        animationDuration={1000}
                        isAnimationActive={true}
                      >
                        {weeklyCollectionData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={`hsl(${260 - index * 10}, 70%, 60%)`}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Bubble Chart - Ward-wise Collection Analysis */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="relative bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/40 backdrop-blur-sm rounded-xl p-4 border-2 border-white lg:col-span-2 overflow-hidden group"
                  style={{
                    boxShadow: '0 8px 32px rgba(6, 182, 212, 0.15), 0 0 0 1px rgba(6, 182, 212, 0.1)'
                  }}
                >
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'linear-gradient(90deg, #06B6D4, #3B82F6, #8B5CF6, #06B6D4)',
                      backgroundSize: '300% 100%',
                      padding: '2px',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      WebkitMaskComposite: 'xor',
                      opacity: 0.4
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                    }}
                    animate={{
                      x: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Animated background gradient waves */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: 'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)'
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Corner accent gradients */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-200/20 to-transparent rounded-xl blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-200/20 to-transparent rounded-xl blur-2xl" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="relative"
                        >
                          <motion.div
                            className="absolute inset-0 bg-[#06B6D4] rounded-full blur-md"
                            animate={{ opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <Droplets className="w-4 h-4 text-[#06B6D4] relative z-10" />
                        </motion.div>
                        <h4 className="text-sm bg-gradient-to-r from-[#005AA7] to-[#00C6FF] bg-clip-text text-transparent">
                          Ward-wise Collection Performance
                        </h4>
                        <span className="text-xs text-gray-500 px-2 py-0.5 bg-cyan-100/50 rounded-full">
                          Bubble = Collection Amount
                        </span>
                      </div>
                      {isLive && (
                        <motion.div
                          className="flex items-center gap-1.5 px-2 py-1 bg-red-50 rounded-full"
                        >
                          <motion.div
                            animate={{ 
                              opacity: [0.3, 1, 0.3],
                              scale: [0.8, 1.2, 0.8]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
                          />
                          <span className="text-xs text-red-600">Live</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Enhanced Bubble Chart */}
                    <div className="relative">
                      {/* Floating particles */}
                      <FloatingParticles />
                      
                      {/* Glow effects behind bubbles */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {bubbleChartData.map((ward, index) => (
                          <motion.div
                            key={ward.ward}
                            className="absolute rounded-full blur-xl"
                            style={{
                              background: `radial-gradient(circle, ${ward.fill}40 0%, transparent 70%)`,
                              width: '100px',
                              height: '100px',
                              left: `${(index * 12) + 10}%`,
                              top: `${30 + (index % 3) * 20}%`
                            }}
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              delay: index * 0.3,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>

                      <ResponsiveContainer width="100%" height={240}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 30, left: 20 }}>
                          <defs>
                            {/* Grid gradient */}
                            <linearGradient id="gridGradient" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.3} />
                              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.3} />
                            </linearGradient>
                            
                            {/* Gradient definitions for each bubble */}
                            {bubbleChartData.map((ward, index) => (
                              <radialGradient 
                                key={`gradient-${ward.ward}`} 
                                id={`bubbleGradient-${index}`}
                              >
                                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.9} />
                                <stop offset="30%" stopColor={ward.fill} stopOpacity={1} />
                                <stop offset="100%" stopColor={ward.fill} stopOpacity={0.8} />
                              </radialGradient>
                            ))}
                          </defs>
                          
                          <CartesianGrid 
                            strokeDasharray="4 4" 
                            stroke="url(#gridGradient)" 
                            strokeOpacity={0.4}
                          />
                          
                          <XAxis 
                            type="number" 
                            dataKey="connections" 
                            name="Connections"
                            stroke="#6B7280" 
                            fontSize={11}
                            tick={{ fill: '#6B7280' }}
                            label={{ 
                              value: 'Total Connections →', 
                              position: 'bottom', 
                              style: { 
                                fontSize: 11, 
                                fill: '#6B7280',
                                fontWeight: 500
                              } 
                            }}
                          />
                          
                          <YAxis 
                            type="number" 
                            dataKey="billsPaid" 
                            name="Bills Paid"
                            stroke="#6B7280" 
                            fontSize={11}
                            tick={{ fill: '#6B7280' }}
                            label={{ 
                              value: '↑ Bills Paid', 
                              angle: -90, 
                              position: 'insideLeft', 
                              style: { 
                                fontSize: 11, 
                                fill: '#6B7280',
                                fontWeight: 500
                              } 
                            }}
                          />
                          
                          <ZAxis 
                            type="number" 
                            dataKey="collection" 
                            range={[400, 2500]} 
                            name="Collection"
                          />
                          
                          <Tooltip 
                            cursor={{ 
                              strokeDasharray: '5 5',
                              stroke: '#06B6D4',
                              strokeWidth: 2
                            }}
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                              border: 'none',
                              borderRadius: '16px',
                              boxShadow: '0 20px 40px rgba(6, 182, 212, 0.3), 0 8px 16px rgba(0, 0, 0, 0.1)',
                              padding: '14px 18px',
                              backdropFilter: 'blur(10px)'
                            }}
                            labelStyle={{ 
                              fontWeight: 700, 
                              color: '#0F172A', 
                              marginBottom: '10px',
                              fontSize: '14px',
                              background: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }}
                            itemStyle={{
                              color: '#475569',
                              fontSize: '13px',
                              padding: '4px 0',
                              fontWeight: 500
                            }}
                            formatter={(value: number, name: string, props: any) => {
                              const ward = props.payload;
                              if (name === 'Collection') {
                                return [`₹${value.toLocaleString('en-IN')}`, name];
                              }
                              return [value, name];
                            }}
                            labelFormatter={(label: any, payload: any) => {
                              if (payload && payload[0]) {
                                return `🎯 ${payload[0].payload.ward}`;
                              }
                              return label;
                            }}
                          />
                          
                          <Scatter 
                            name="Wards" 
                            data={bubbleChartData} 
                            animationDuration={1500}
                            animationBegin={0}
                            isAnimationActive={true}
                          >
                            {bubbleChartData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={`url(#bubbleGradient-${index})`}
                                stroke={entry.fill}
                                strokeWidth={2}
                                opacity={0.85}
                              />
                            ))}
                          </Scatter>
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Enhanced Ward Legend with gradient badges */}
                  <div className="relative mt-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {bubbleChartData.map((ward, index) => (
                        <motion.div
                          key={ward.ward}
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ 
                            delay: 0.6 + index * 0.08,
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ 
                            scale: 1.12, 
                            y: -3,
                            boxShadow: `0 8px 20px ${ward.fill}40`
                          }}
                          className="relative group cursor-pointer"
                        >
                          {/* Glow effect on hover */}
                          <motion.div
                            className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ backgroundColor: ward.fill }}
                          />
                          
                          {/* Badge container */}
                          <div
                            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-white shadow-md backdrop-blur-sm"
                            style={{ 
                              background: `linear-gradient(135deg, ${ward.fill}20 0%, ${ward.fill}10 100%)`,
                            }}
                          >
                            {/* Animated bubble dot */}
                            <div className="relative">
                              <motion.div 
                                className="w-2 h-2 rounded-full shadow-lg"
                                style={{ 
                                  backgroundColor: ward.fill,
                                  boxShadow: `0 0 10px ${ward.fill}80`
                                }}
                                animate={{ 
                                  scale: isLive ? [1, 1.4, 1] : 1,
                                  boxShadow: isLive 
                                    ? [`0 0 10px ${ward.fill}80`, `0 0 20px ${ward.fill}`, `0 0 10px ${ward.fill}80`]
                                    : `0 0 10px ${ward.fill}80`
                                }}
                                transition={{ 
                                  duration: 2.5, 
                                  repeat: isLive ? Infinity : 0, 
                                  delay: index * 0.3,
                                  ease: "easeInOut"
                                }}
                              />
                              {isLive && (
                                <motion.div
                                  className="absolute inset-0 rounded-full"
                                  style={{ backgroundColor: ward.fill }}
                                  animate={{
                                    scale: [1, 2, 1],
                                    opacity: [0.6, 0, 0.6]
                                  }}
                                  transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    delay: index * 0.3,
                                    ease: "easeOut"
                                  }}
                                />
                              )}
                            </div>

                            {/* Ward name */}
                            <span className="text-xs text-gray-800">
                              {ward.ward}
                            </span>

                            {/* Collection amount with animation */}
                            <motion.span 
                              className="text-xs px-1.5 py-0.5 rounded-md"
                              style={{ 
                                color: ward.fill,
                                backgroundColor: `${ward.fill}25`,
                                fontWeight: 600
                              }}
                              key={ward.collection}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, type: "spring" }}
                            >
                              ₹{(ward.collection / 1000).toFixed(0)}K
                            </motion.span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Performance indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="mt-3 text-center"
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200">
                        <TrendingUp className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-green-700">
                          Average Performance: <span className="font-semibold">85.4%</span>
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* AI Insights Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 bg-gradient-to-r from-[#005AA7] to-[#00C6FF] rounded-xl p-3 text-white shadow-xl"
              >
                <div className="flex items-center gap-2.5">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex-shrink-0"
                  >
                    <Zap className="w-5 h-5" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm mb-0.5 flex items-center gap-2">
                      <span>AI-Powered Insight</span>
                      {isLive && (
                        <span className="px-1.5 py-0.5 bg-white/20 rounded text-xs">Real-time</span>
                      )}
                    </div>
                    <div className="text-xs text-white/90 leading-relaxed">
                      Collection rate: <span className="font-semibold">+5.2%</span> this month • 
                      Peak day: <span className="font-semibold">Thursday</span> • 
                      Top contributor: <span className="font-semibold">Residential (65%)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
