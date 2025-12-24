import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { IndianRupee, Users, FileText, TrendingUp, ChevronDown } from 'lucide-react';

export function KPISection() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const kpis = [
    {
      id: 'collection',
      title: 'Total Collection',
      value: 5.4,
      unit: 'Cr',
      icon: IndianRupee,
      color: '#10B981',
      bgColor: 'from-emerald-50 to-green-100',
      iconBg: 'from-emerald-400 to-green-500'
    },
    {
      id: 'consumers',
      title: 'Active Consumers',
      value: 124000,
      unit: '',
      icon: Users,
      color: '#3B82F6',
      bgColor: 'from-blue-50 to-indigo-100',
      iconBg: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'pending',
      title: 'Pending Bills',
      value: 12340,
      unit: '',
      icon: FileText,
      color: '#F59E0B',
      bgColor: 'from-amber-50 to-orange-100',
      iconBg: 'from-amber-400 to-orange-500'
    },
    {
      id: 'success',
      title: 'Success Rate',
      value: 94.5,
      unit: '%',
      icon: TrendingUp,
      color: '#8B5CF6',
      bgColor: 'from-violet-50 to-purple-100',
      iconBg: 'from-violet-400 to-purple-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100"
    >
      <div 
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="bg-gradient-to-r from-[#005AA7] to-[#00C6FF] bg-clip-text text-transparent">
            Analytics & Insights
          </h3>
          <p className="text-gray-600 text-sm">Key performance metrics and water report summaries</p>
        </div>
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 pt-2">
          {kpis.map((kpi, index) => (
            <KPICard key={kpi.id} {...kpi} index={index} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

interface KPICardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  iconBg: string;
  index: number;
}

function KPICard({ title, value, unit, icon: Icon, color, bgColor, iconBg, index }: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const stepValue = value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setDisplayValue(stepValue * currentStep);
      } else {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  const formatValue = (val: number) => {
    if (unit === 'Cr') {
      return `₹${val.toFixed(1)} ${unit}`;
    } else if (unit === '%') {
      return `${val.toFixed(1)}${unit}`;
    } else if (val >= 1000) {
      return val.toLocaleString('en-IN');
    }
    return val.toFixed(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className={`h-[120px] rounded-2xl p-4 shadow-lg border-2 border-white/50 flex flex-col justify-center items-center cursor-pointer bg-gradient-to-br ${bgColor} relative overflow-hidden group`}
    >
      {/* Animated background pulse */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-200"
        style={{ backgroundColor: color }}
      />
      
      <motion.div 
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ duration: 0.15 }}
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-2 shadow-lg bg-gradient-to-br ${iconBg}`}
      >
        <Icon className="w-7 h-7 text-white" />
      </motion.div>
      <p className="text-gray-800 text-center mb-1 font-medium">{title}</p>
      <p className="text-center font-bold" style={{ color }}>
        {formatValue(displayValue)}
      </p>
    </motion.div>
  );
}