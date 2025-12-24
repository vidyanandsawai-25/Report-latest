import { motion } from 'motion/react';
import { RefreshCcw, Edit3, UserCheck, ClipboardCheck } from 'lucide-react';
import { ReportCard } from './ReportCard';
import waterBillBg from 'figma:asset/32a53904cdb2f84aba99f830aa52e4f10dd2974d.png';

interface CRMReportProps {
  onReportClick: (reportName: string) => void;
}

export function CRMReport({ onReportClick }: CRMReportProps) {
  const reports = [
    {
      id: 'mutation-report',
      title: 'Mutation Report',
      description: 'Property ownership transfer records',
      icon: RefreshCcw,
      color: '#D97706',
      gradient: 'from-amber-600 to-orange-600'
    },
    {
      id: 'alteration-report',
      title: 'Alteration Report',
      description: 'Connection modification requests',
      icon: Edit3,
      color: '#CA8A04',
      gradient: 'from-yellow-600 to-amber-600'
    },
    {
      id: 'customer-feedback',
      title: 'Customer Feedback',
      description: 'Service feedback and complaints',
      icon: UserCheck,
      color: '#06B6D4',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'service-requests',
      title: 'Service Requests',
      description: 'Pending and completed requests',
      icon: ClipboardCheck,
      color: '#10B981',
      gradient: 'from-emerald-500 to-green-600'
    }
  ];

  return (
    <div className="space-y-6 relative">
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
          <h2 className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] bg-clip-text text-transparent">
            CRM Report
          </h2>
          <p className="text-gray-700">Manage mutation and alteration reports with customer relationship data</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              {/* Golden gradient background for Mutation and Alteration cards */}
              <div className={index < 2 ? 'relative' : ''}>
                {index < 2 && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FEF3C7]/40 to-[#FDE68A]/40 rounded-2xl -z-10" />
                )}
                <ReportCard 
                  {...report}
                  onClick={() => onReportClick(report.title)}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}