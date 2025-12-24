import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, AlertTriangle, Lightbulb, Sparkles, Download, Share2, Calendar, MapPin, Users, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface AIInsightModalProps {
  isOpen: boolean;
  onClose: () => void;
  insightId: string;
}

export function AIInsightModal({ isOpen, onClose, insightId }: AIInsightModalProps) {
  // Different data based on insight type
  const getInsightData = () => {
    switch(insightId) {
      case 'anomaly':
        return {
          title: 'Anomaly Detected - Zone C Water Consumption',
          icon: AlertTriangle,
          color: '#EF4444',
          gradient: 'from-red-500 to-rose-600',
          bgGradient: 'from-red-50 to-rose-100',
          confidence: 94,
          severity: 'High',
          detected: '10 Nov 2025, 02:30 PM',
          affectedArea: 'Zone C - Wards 12, 13, 14',
          affectedUsers: 3420,
          details: {
            current: '4.2 Million Liters/Day',
            average: '3.2 Million Liters/Day',
            increase: '+32%',
            trend: 'Upward'
          },
          chartData: [
            { date: '5 Nov', consumption: 3.1, normal: 3.2 },
            { date: '6 Nov', consumption: 3.2, normal: 3.2 },
            { date: '7 Nov', consumption: 3.3, normal: 3.2 },
            { date: '8 Nov', consumption: 3.5, normal: 3.2 },
            { date: '9 Nov', consumption: 3.9, normal: 3.2 },
            { date: '10 Nov', consumption: 4.2, normal: 3.2 }
          ],
          recommendations: [
            {
              title: 'Immediate Action Required',
              description: 'Inspect pipelines in Ward 12-14 for potential leakages',
              priority: 'Critical',
              estimatedTime: '2-4 hours'
            },
            {
              title: 'Field Inspection',
              description: 'Deploy field team to check illegal connections',
              priority: 'High',
              estimatedTime: '4-6 hours'
            },
            {
              title: 'Consumer Awareness',
              description: 'Send water conservation alerts to affected zone consumers',
              priority: 'Medium',
              estimatedTime: '1 hour'
            }
          ],
          insights: [
            'Pattern similar to leak detected in Zone B last month',
            'Consumption spike observed primarily during night hours (10 PM - 6 AM)',
            '67% increase in specific sub-ward 12-A',
            'No new connections reported in affected area recently'
          ]
        };
      
      case 'prediction':
        return {
          title: 'AI Revenue Prediction - Next Quarter',
          icon: TrendingUp,
          color: '#10B981',
          gradient: 'from-emerald-500 to-green-600',
          bgGradient: 'from-emerald-50 to-green-100',
          confidence: 89,
          severity: 'Positive',
          detected: '10 Nov 2025, 08:00 AM',
          affectedArea: 'All Zones',
          affectedUsers: 124000,
          details: {
            current: '₹5.4 Crore/Month',
            predicted: '₹6.05 Crore/Month',
            increase: '+12%',
            trend: 'Upward'
          },
          chartData: [
            { month: 'Aug', actual: 5.1, predicted: 5.1 },
            { month: 'Sep', actual: 5.3, predicted: 5.3 },
            { month: 'Oct', actual: 5.2, predicted: 5.2 },
            { month: 'Nov', actual: 5.4, predicted: 5.5 },
            { month: 'Dec', actual: 0, predicted: 5.8 },
            { month: 'Jan', actual: 0, predicted: 6.05 }
          ],
          recommendations: [
            {
              title: 'Optimize Collection Strategy',
              description: 'Focus on high-value defaulters to maximize recovery',
              priority: 'High',
              estimatedTime: '2-3 weeks'
            },
            {
              title: 'Digital Payment Push',
              description: 'Increase UPI/Online payment adoption by 15%',
              priority: 'Medium',
              estimatedTime: '1 month'
            },
            {
              title: 'Early Bird Incentive',
              description: 'Offer 5% discount for payments before 10th of month',
              priority: 'Low',
              estimatedTime: '1 week setup'
            }
          ],
          insights: [
            'Improved payment behavior in Zone A & B contributing 8% growth',
            'New connection rate up 15% indicating expanding customer base',
            'Digital payment adoption increased from 45% to 52%',
            'Seasonal factors: Winter months show better collection rates'
          ]
        };

      case 'recommendation':
        return {
          title: 'Smart Payment Reminder System',
          icon: Lightbulb,
          color: '#F59E0B',
          gradient: 'from-amber-500 to-yellow-600',
          bgGradient: 'from-amber-50 to-yellow-100',
          confidence: 92,
          severity: 'Actionable',
          detected: '10 Nov 2025, 06:00 AM',
          affectedArea: 'All Zones',
          affectedUsers: 247,
          details: {
            current: '247 Target Consumers',
            average: '15th of Month (Typical Payment)',
            increase: '94% Success Rate',
            trend: 'Consistent Payers'
          },
          chartData: [
            { zone: 'Zone A', consumers: 72, success: 96 },
            { zone: 'Zone B', consumers: 89, success: 94 },
            { zone: 'Zone C', consumers: 45, success: 91 },
            { zone: 'Zone D', consumers: 41, success: 93 }
          ],
          recommendations: [
            {
              title: 'Send SMS Reminders',
              description: 'Automated SMS on 13th Nov to 247 consumers',
              priority: 'High',
              estimatedTime: 'Immediate'
            },
            {
              title: 'WhatsApp Notifications',
              description: 'Send payment links via WhatsApp Business API',
              priority: 'High',
              estimatedTime: '30 minutes'
            },
            {
              title: 'Voice Call Campaign',
              description: 'IVR calls for high-value consumers (₹10K+)',
              priority: 'Medium',
              estimatedTime: '2 hours'
            }
          ],
          insights: [
            'These consumers have 98% on-time payment history',
            'Average bill amount: ₹3,450 per consumer',
            'Total potential collection: ₹8.52 Lakhs',
            'Best time to send: 10-11 AM for maximum engagement'
          ]
        };

      case 'optimization':
        return {
          title: 'Automate Mutation Report Process',
          icon: Sparkles,
          color: '#8B5CF6',
          gradient: 'from-violet-500 to-purple-600',
          bgGradient: 'from-violet-50 to-purple-100',
          confidence: 91,
          severity: 'Efficiency',
          detected: '9 Nov 2025, 10:00 AM',
          affectedArea: 'CRM Department',
          affectedUsers: 0,
          details: {
            current: '6.5 Hours/Week',
            automated: '1.5 Hours/Week',
            increase: '77% Time Saved',
            trend: 'Efficiency Gain'
          },
          chartData: [
            { task: 'Data Entry', manual: 2.5, automated: 0.3 },
            { task: 'Verification', manual: 1.5, automated: 0.4 },
            { task: 'Report Gen', manual: 1.5, automated: 0.2 },
            { task: 'Distribution', manual: 1.0, automated: 0.6 }
          ],
          recommendations: [
            {
              title: 'Enable Auto-Generation',
              description: 'Activate automated mutation report system',
              priority: 'High',
              estimatedTime: '1 day setup'
            },
            {
              title: 'Staff Training',
              description: 'Train 5 staff members on new automated system',
              priority: 'High',
              estimatedTime: '2 hours'
            },
            {
              title: 'Pilot Testing',
              description: 'Run parallel manual + automated for 1 week',
              priority: 'Medium',
              estimatedTime: '1 week'
            }
          ],
          insights: [
            'Current process: Manual data entry from 12 different sources',
            'Automation can reduce errors by 85%',
            'Staff can be reallocated to customer service improvement',
            'ROI: Break-even in 2 months, 300% return in 1 year'
          ]
        };

      default:
        return null;
    }
  };

  const data = getInsightData();
  if (!data) return null;

  const Icon = data.icon;

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
            className="fixed inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-black/60 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto"
          >
            <div className={`bg-gradient-to-br ${data.bgGradient} rounded-3xl shadow-2xl border-4 border-white/50 overflow-hidden`}>
              {/* Header */}
              <div className={`bg-gradient-to-r ${data.gradient} text-white p-6 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10">
                  <motion.div
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                    className="w-full h-full"
                    style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  />
                </div>

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl"
                    >
                      <Icon className="w-9 h-9 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h2 className="text-white mb-2 leading-tight">{data.title}</h2>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          AI Confidence: {data.confidence}%
                        </span>
                        <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          {data.severity}
                        </span>
                        <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {data.detected}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center backdrop-blur-sm"
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-lg border-2 border-white"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5" style={{ color: data.color }} />
                      <p className="text-gray-600 text-sm">Affected Area</p>
                    </div>
                    <p className="text-gray-900 font-semibold">{data.affectedArea}</p>
                  </motion.div>

                  {data.affectedUsers > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="bg-white rounded-xl p-4 shadow-lg border-2 border-white"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5" style={{ color: data.color }} />
                        <p className="text-gray-600 text-sm">Consumers</p>
                      </div>
                      <p className="text-gray-900 font-semibold">{data.affectedUsers.toLocaleString('en-IN')}</p>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl p-4 shadow-lg border-2 border-white"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-5 h-5" style={{ color: data.color }} />
                      <p className="text-gray-600 text-sm">Current Status</p>
                    </div>
                    <p className="text-gray-900 font-semibold">{data.details.current}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="bg-white rounded-xl p-4 shadow-lg border-2 border-white"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5" style={{ color: data.color }} />
                      <p className="text-gray-600 text-sm">Change</p>
                    </div>
                    <p className="text-gray-900 font-semibold">{data.details.increase}</p>
                  </motion.div>
                </div>

                {/* Chart Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 shadow-xl border-2 border-white"
                >
                  <h3 className="text-gray-900 mb-4">Data Visualization</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    {insightId === 'recommendation' || insightId === 'optimization' ? (
                      <BarChart data={data.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey={insightId === 'recommendation' ? 'zone' : 'task'} stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: `2px solid ${data.color}`,
                            borderRadius: '12px'
                          }}
                        />
                        {insightId === 'recommendation' ? (
                          <>
                            <Bar dataKey="consumers" fill={data.color} radius={[8, 8, 0, 0]} />
                            <Bar dataKey="success" fill="#10B981" radius={[8, 8, 0, 0]} />
                          </>
                        ) : (
                          <>
                            <Bar dataKey="manual" fill="#EF4444" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="automated" fill="#10B981" radius={[8, 8, 0, 0]} />
                          </>
                        )}
                      </BarChart>
                    ) : (
                      <AreaChart data={data.chartData}>
                        <defs>
                          <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={data.color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={data.color} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey={insightId === 'anomaly' ? 'date' : 'month'} stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: `2px solid ${data.color}`,
                            borderRadius: '12px'
                          }}
                        />
                        {insightId === 'anomaly' ? (
                          <>
                            <Area
                              type="monotone"
                              dataKey="consumption"
                              stroke={data.color}
                              strokeWidth={3}
                              fillOpacity={1}
                              fill="url(#colorConsumption)"
                            />
                            <Line type="monotone" dataKey="normal" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" />
                          </>
                        ) : (
                          <>
                            <Area
                              type="monotone"
                              dataKey="actual"
                              stroke="#3B82F6"
                              strokeWidth={3}
                              fillOpacity={1}
                              fill="url(#colorConsumption)"
                            />
                            <Line type="monotone" dataKey="predicted" stroke={data.color} strokeWidth={3} strokeDasharray="5 5" />
                          </>
                        )}
                      </AreaChart>
                    )}
                  </ResponsiveContainer>
                </motion.div>

                {/* AI Insights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="bg-white rounded-2xl p-6 shadow-xl border-2 border-white"
                >
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" style={{ color: data.color }} />
                    AI-Generated Insights
                  </h3>
                  <div className="space-y-2">
                    {data.insights.map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white"
                      >
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${data.color}20` }}>
                          <span className="font-semibold text-sm" style={{ color: data.color }}>
                            {index + 1}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">{insight}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Recommendations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="bg-white rounded-2xl p-6 shadow-xl border-2 border-white"
                >
                  <h3 className="text-gray-900 mb-4">Recommended Actions</h3>
                  <div className="space-y-3">
                    {data.recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        whileHover={{ scale: 1.01, x: 4 }}
                        className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border-l-4 cursor-pointer"
                        style={{ borderColor: data.color }}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-gray-900 font-semibold">{rec.title}</h4>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                              style={{
                                backgroundColor:
                                  rec.priority === 'Critical' || rec.priority === 'High'
                                    ? '#EF4444'
                                    : rec.priority === 'Medium'
                                    ? '#F59E0B'
                                    : '#10B981'
                              }}
                            >
                              {rec.priority}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{rec.description}</p>
                          <p className="text-gray-500 text-xs">⏱️ Estimated Time: {rec.estimatedTime}</p>
                        </div>
                        <Button
                          size="sm"
                          className="text-white font-medium"
                          style={{ backgroundColor: data.color }}
                        >
                          Execute
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 min-w-[200px]">
                    <Button
                      className="w-full h-12 text-white font-semibold shadow-lg"
                      style={{ backgroundColor: data.color }}
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Report
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 min-w-[200px]">
                    <Button
                      variant="outline"
                      className="w-full h-12 font-semibold shadow-lg"
                      style={{ borderColor: data.color, color: data.color }}
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      Share with Team
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="h-12 px-6 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold"
                    >
                      Close
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
