import { motion } from 'motion/react';
import { FileText, ClipboardList, FileBarChart, UserPlus, Users, UserX, Shield } from 'lucide-react';
import { ReportCard } from './ReportCard';
import { DailyReportReminder } from './DailyReportReminder';
import waterBillBg from 'figma:asset/32a53904cdb2f84aba99f830aa52e4f10dd2974d.png';

interface ReportEngineProps {
  onReportClick: (reportName: string) => void;
}

export function ReportEngine({ onReportClick }: ReportEngineProps) {
  const reports = [
    {
      id: 'top-defaulter',
      title: 'Top Defaulter',
      description: 'View list of highest outstanding consumers',
      icon: FileText,
      color: '#0EA5E9',
      gradient: 'from-sky-500 to-blue-600'
    },
    {
      id: 'pending-reading',
      title: 'Pending Reading List',
      description: 'Meters awaiting reading updates',
      icon: ClipboardList,
      color: '#F97316',
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      id: 'reading-summary',
      title: 'Reading Summary Report',
      description: 'Comprehensive meter reading analysis',
      icon: FileBarChart,
      color: '#06B6D4',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'connection-seal',
      title: 'Connection Seal Report',
      description: 'Seal verification & tampering detection',
      icon: Shield,
      color: '#7C3AED',
      gradient: 'from-purple-600 to-violet-700'
    },
    {
      id: 'new-connection',
      title: 'New Connection List',
      description: 'Recently added water connections',
      icon: UserPlus,
      color: '#10B981',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      id: 'all-consumers',
      title: 'All Consumers',
      description: 'Complete consumer database',
      icon: Users,
      color: '#8B5CF6',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      id: 'closed-connection',
      title: 'Closed Connection List',
      description: 'Terminated or inactive connections',
      icon: UserX,
      color: '#64748B',
      gradient: 'from-slate-500 to-gray-600'
    }
  ];

  return (
    <div className="space-y-6 relative">
      {/* Daily Report Reminder - Flashing notification */}
      <DailyReportReminder />
      
      {/* Background Image */}
      <div className="fixed bottom-8 right-8 w-80 h-80 opacity-[0.06] pointer-events-none z-0">
        <img 
          src={waterBillBg} 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Report Cards Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-10"
      >
        <div className="mb-6">
          <h2 className="bg-gradient-to-r from-[#005AA7] to-[#00C6FF] bg-clip-text text-transparent">
            Water Report Engine
          </h2>
          <p className="text-gray-700">Generate and analyze detailed water management reports</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              <ReportCard 
                {...report}
                onClick={() => onReportClick(report.title)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}