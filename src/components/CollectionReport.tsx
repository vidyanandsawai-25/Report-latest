import { motion } from "motion/react";
import {
  Calendar,
  TrendingUp,
  CreditCard,
  Banknote,
  FileText,
  FileBarChart,
} from "lucide-react";
import { ReportCard } from "./ReportCard";
import waterBillBg from 'figma:asset/32a53904cdb2f84aba99f830aa52e4f10dd2974d.png';

interface CollectionReportProps {
  onReportClick: (reportName: string) => void;
}

export function CollectionReport({
  onReportClick,
}: CollectionReportProps) {
  const reports = [
    {
      id: "daywise-collection",
      title: "Day Wise Collection",
      description: "Date & time-based collection report",
      icon: Calendar,
      color: "#10B981",
      gradient: "from-emerald-500 to-green-600",
    },
    {
      id: "collection-details",
      title: "Collection Details",
      description: "Comprehensive collection details & analytics",
      icon: FileBarChart,
      color: "#8B5CF6",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      id: "accountant-report",
      title: "Accountant Report",
      description: "Financial reports & collection analysis",
      icon: FileText,
      color: "#0EA5E9",
      gradient: "from-sky-500 to-blue-600",
    },
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
      
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-10"
      >
        <div className="mb-6">
          <h2 className="bg-gradient-to-r from-[#10B981] to-[#059669] bg-clip-text text-transparent">
            Collection Report
          </h2>
          <p className="text-gray-700">
            Track daily and monthly collection with payment mode
            analysis
          </p>
        </div>
      </motion.div>

      {/* Report Cards Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className="relative z-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-5">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: 0.15 + index * 0.03,
              }}
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