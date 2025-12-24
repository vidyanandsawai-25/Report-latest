import { motion } from 'motion/react';
import { Download, RefreshCw, Languages, Sparkles, FileDown, ChevronDown, User, Calendar, Clock } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import logoImage from 'figma:asset/2ace7e0bf1082044c0cdc8f0827b8cabf2f06a0c.png';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { formatDate, formatTime, formatDateForFileName } from '@/src/lib/utils/format';

interface HeaderProps {
  language?: 'en' | 'mr';
  onLanguageChange?: (lang: 'en' | 'mr') => void;
  userName?: string;
}

export function Header({ language = 'en', onLanguageChange, userName = 'Rajesh Kumar' }: HeaderProps) {
  const [showAIInsight, setShowAIInsight] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(formatDate(now, 'long')); // "22 Dec 2024"
      setCurrentTime(formatTime(now)); // "02:30 PM"
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const aiInsights = [
    '🎯 23 high-priority readings pending in Zone A',
    '📈 Collection efficiency up by 12% this week',
    '⚠️ 5 meters showing unusual consumption patterns',
  ];
  
  const [currentInsight, setCurrentInsight] = useState(0);
  
  // Rotate insights every 5 seconds
  setTimeout(() => {
    setCurrentInsight((prev) => (prev + 1) % aiInsights.length);
  }, 5000);
  
  const handleDailyReportDownload = (reportName: string) => {
    const today = formatDate(new Date()); // "22/12/2024"
    const fileName = `${reportName.replace(/\s+/g, '_')}_${formatDateForFileName()}`; // "Report_22-12-2024"
    
    toast.success(`📥 Downloading ${reportName} for ${today}...`);
    
    // Simulate download
    setTimeout(() => {
      toast.success(`✅ ${reportName} downloaded successfully!`);
    }, 1500);
  };
  
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-[#1976D2] text-white px-4 md:px-6 py-4 shadow-lg"
    >
      {/* User Info Bar - Top Left */}
      

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 md:gap-4">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center shadow-lg p-1">
              <img 
                src={logoImage} 
                alt="Maharashtra Municipal Corporation Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
          <div>
            <h1 className="text-base md:text-xl leading-tight">Akola Muncipal Corporation</h1>
        
          </div>
        </div>

        
      </div>



      {/* Scrolling News Bar */}
      
    </motion.header>
  );
}