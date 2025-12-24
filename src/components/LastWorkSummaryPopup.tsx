import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Download, FileText, Search, Calendar, User, TrendingUp, FileSpreadsheet, RefreshCw, CheckCircle2, CalendarDays, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { formatDate, formatTime } from '../src/lib/utils/format';

interface LastWorkSummaryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  language?: 'en' | 'mr';
}

interface DownloadedReport {
  id: number;
  reportName: string;
  downloadDate: string;
  downloadTime: string;
  fileFormat: string;
  fileSize: string;
}

interface SearchQuery {
  id: number;
  query: string;
  timestamp: string;
  resultsCount: number;
}

export function LastWorkSummaryPopup({ isOpen, onClose, userName = 'Rajesh Kumar', language = 'en' }: LastWorkSummaryPopupProps) {
  const [lastLoginDate, setLastLoginDate] = useState('');
  const [lastLoginTime, setLastLoginTime] = useState('');
  const [daysSinceLastLogin, setDaysSinceLastLogin] = useState(0);
  const [customDateMode, setCustomDateMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoadingCustomData, setIsLoadingCustomData] = useState(false);
  const [currentSessionDate, setCurrentSessionDate] = useState('');

  // Translations
  const t = {
    welcomeBack: language === 'en' ? 'Welcome Back!' : 'पुन्हा स्वागत आहे!',
    sessionSummary: language === 'en' ? 'Your last work session summary' : 'तुमच्या शेवटच्या कार्य सत्राचा सारांश',
    user: language === 'en' ? 'User' : 'वापरकर्ता',
    lastLogin: language === 'en' ? 'Last Login' : 'शेवटचा लॉगिन',
    time: language === 'en' ? 'Time' : 'वेळ',
    note: language === 'en' ? 'Note:' : 'टीप:',
    youLastLogged: language === 'en' ? 'You last logged in' : 'तुम्ही शेवटचा लॉगिन केला',
    todaySession: language === 'en' ? 'You logged in today.' : 'तुम्ही आज लॉगिन केलात.',
    workingOn: language === 'en' ? "Here's what you were working on:" : 'तुम्ही यावर काम करत होता:',
    todayWorkingOn: language === 'en' ? "Here's what you're working on today:" : 'आज तुम्ही यावर काम करत आहात:',
    downloadedReports: language === 'en' ? 'Downloaded Reports' : 'डाउनलोड केलेले अहवाल',
    reportsInSession: language === 'en' ? 'Reports you downloaded in your last session' : 'तुमच्या शेवटच्या सत्रात डाउनलोड केलेले अहवाल',
    todayReports: language === 'en' ? 'Reports you downloaded today' : 'आज तुम्ही डाउनलोड केलेले अहवाल',
    recentSearches: language === 'en' ? 'Recent Searches' : 'अलीकडील शोध',
    lastSearchQueries: language === 'en' ? 'Your last search queries' : 'तुमचे शेवटचे शोध प्रश्न',
    todaySearchQueries: language === 'en' ? 'Your search queries today' : 'आज तुमचे शोध प्रश्न',
    redownload: language === 'en' ? 'Re-download' : 'पुन्हा डाउनलोड करा',
    results: language === 'en' ? 'results' : 'परिणाम',
    tip: language === 'en' ? 'Tip:' : 'टीप:',
    tipMessage: language === 'en' ? 'You can re-download any report from the Download Log' : 'तुम्ही डाउनलोड लॉग मधून कोणताही अहवाल पुन्हा डाउनलोड करू शकता',
    continueToDashboard: language === 'en' ? 'Continue to Dashboard' : 'डॅशबोर्डवर जा',
    viewCustomDate: language === 'en' ? 'View Custom Date' : 'सानुकूल तारीख पहा',
    selectDate: language === 'en' ? 'Select Date' : 'तारीख निवडा',
    loadData: language === 'en' ? 'Load Data' : 'डेटा लोड करा',
    backToToday: language === 'en' ? 'Back to Today' : 'आजच्या तारखेला परत या',
    customDateTitle: language === 'en' ? 'Custom Date Session' : 'सानुकूल तारीख सत्र',
    dataFor: language === 'en' ? 'Session Data for' : 'यासाठी सत्र डेटा',
    loading: language === 'en' ? 'Loading session data...' : 'सत्र डेटा लोड होत आहे...',
    noDataFound: language === 'en' ? 'No data found for this date' : 'या तारखेसाठी कोणताही डेटा सापडला नाही',
    viewPreviousDate: language === 'en' ? 'View work from a previous date' : 'मागील तारखेचे काम पहा',
    daysAgo: language === 'en' ? (days: number) => `${days} day${days > 1 ? 's' : ''} ago` : (days: number) => `${days} दिवसांपूर्वी`,
  };

  useEffect(() => {
    if (isOpen && !customDateMode) {
      // Show TODAY's session by default
      const today = new Date();
      
      const date = formatDate(today);
      const time = formatTime(today);
      
      setLastLoginDate(date);
      setLastLoginTime(time);
      setCurrentSessionDate(date);
      setDaysSinceLastLogin(0); // 0 because it's today
    }
  }, [isOpen, customDateMode]);

  // Mock downloaded reports from last session
  const downloadedReports: DownloadedReport[] = [
    {
      id: 1,
      reportName: 'Defaulter Report',
      downloadDate: lastLoginDate,
      downloadTime: '10:45 AM',
      fileFormat: 'Excel',
      fileSize: '1.2 MB'
    },
    {
      id: 2,
      reportName: 'Collection Summary',
      downloadDate: lastLoginDate,
      downloadTime: '11:20 AM',
      fileFormat: 'PDF',
      fileSize: '856 KB'
    },
    {
      id: 3,
      reportName: 'Zone A Report',
      downloadDate: lastLoginDate,
      downloadTime: '02:15 PM',
      fileFormat: 'Excel',
      fileSize: '2.3 MB'
    }
  ];

  // Mock recent search queries
  const recentSearches: SearchQuery[] = [
    { id: 1, query: 'defaulters report 2024', timestamp: '10:42 AM', resultsCount: 35 },
    { id: 2, query: 'zone A collection', timestamp: '11:18 AM', resultsCount: 28 },
    { id: 3, query: 'ward 5 pending bills', timestamp: '02:10 PM', resultsCount: 42 }
  ];

  const handleRedownload = (report: DownloadedReport) => {
    const formatExtension = report.fileFormat.toLowerCase();
    const fileName = `${report.reportName.replace(/\s+/g, '_')}.${formatExtension}`;
    
    const loadingMsg = language === 'en' ? `Preparing ${report.fileFormat} file...` : `${report.fileFormat} फाईल तयार करत आहे...`;
    const successMsg = language === 'en' ? `✅ Downloaded: ${fileName}` : `✅ डाउनलोड केले: ${fileName}`;
    
    toast.loading(loadingMsg, { id: 'redownload-summary' });
    
    setTimeout(() => {
      toast.success(successMsg, { id: 'redownload-summary' });
      
      setTimeout(() => {
        toast.info(`📊 ${report.reportName} | ${report.fileFormat} | ${report.fileSize}`, {
          duration: 3000
        });
      }, 500);
    }, 1500);
  };

  const handleLoadCustomDate = () => {
    if (!selectedDate) {
      toast.error(language === 'en' ? 'Please select a date' : 'कृपया तारीख निवडा');
      return;
    }

    const selected = new Date(selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected >= today) {
      toast.error(language === 'en' ? 'Please select a date before today' : 'कृपया आजच्या आधीची तारीख निवडा');
      return;
    }

    setIsLoadingCustomData(true);
    toast.loading(t.loading);

    // Simulate loading data for the selected date
    setTimeout(() => {
      setIsLoadingCustomData(false);
      setCustomDateMode(true);
      
      // Update the displayed date
      const date = formatDate(selected);
      setLastLoginDate(date);
      
      // Calculate days difference
      const diffTime = Math.abs(today.getTime() - selected.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysSinceLastLogin(diffDays);

      toast.success(language === 'en' ? `Loaded data for ${date}` : `${date} साठी डेटा लोड केला`);
    }, 2000);
  };

  const handleBackToLastSession = () => {
    setCustomDateMode(false);
    setSelectedDate('');
    toast.info(language === 'en' ? 'Showing today\'s session data' : 'आजचा सत्र डेटा दाखवत आहे');
  };

  const handleContinue = () => {
    const msg = language === 'en' ? 'Welcome back! Ready to work 🚀' : 'पुन्हा स्वागत आहे! काम करण्यासाठी तयार 🚀';
    toast.success(msg);
    onClose();
  };

  // Get max date (yesterday)
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const maxDate = yesterday.toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90vw] md:max-w-5xl md:max-h-[90vh] bg-white rounded-3xl shadow-2xl z-[101] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#005AA7] via-[#0077B6] to-[#00C6FF] px-6 md:px-8 py-6 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl" />
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
                {/* Left: User Details Box */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4 bg-white/15 backdrop-blur-xl border-2 border-white/30 rounded-2xl px-4 py-3"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-xs">{t.user}</p>
                    <p className="text-white font-bold">{userName}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-white/80 text-xs">
                        <Calendar className="w-3 h-3" />
                        {lastLoginDate}
                      </div>
                      <div className="flex items-center gap-1 text-white/80 text-xs">
                        <Clock className="w-3 h-3" />
                        {lastLoginTime}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right: Title and Close Button */}
                <div className="flex items-center justify-between w-full md:w-auto gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl text-white">{t.welcomeBack}</h2>
                    <p className="text-white/90 text-sm md:text-base mt-1 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      {customDateMode ? t.customDateTitle : t.sessionSummary}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all backdrop-blur-sm border border-white/30 cursor-pointer"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {/* Custom Date Selector */}
              {!customDateMode && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 rounded-2xl p-5 mb-6 border-2 border-cyan-200"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <CalendarDays className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{t.viewCustomDate}</p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {language === 'en' ? 'View your work summary from any previous date' : 'कोणत्याही मागील तारखेपासून तुमचा कार्य सारांश पहा'}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <div className="relative">
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          max={maxDate}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all pr-10"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                      <Button
                        onClick={handleLoadCustomDate}
                        disabled={isLoadingCustomData}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-5 py-2.5 rounded-xl shadow-lg font-semibold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoadingCustomData ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                            {language === 'en' ? 'Loading...' : 'लोड होत आहे...'}
                          </>
                        ) : (
                          <>
                            <CalendarDays className="w-4 h-4 mr-2" />
                            {t.loadData}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Back to Last Session Button */}
              {customDateMode && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 space-y-4"
                >
                  <Button
                    onClick={handleBackToLastSession}
                    className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-5 py-2.5 rounded-xl shadow-lg font-semibold"
                  >
                    <ChevronDown className="w-4 h-4 mr-2 rotate-90" />
                    {t.backToToday}
                  </Button>

                  {/* Data Loaded Indicator */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-4 border-2 border-green-300 shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0"
                      >
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <p className="font-bold text-green-900 flex items-center gap-2">
                          {language === 'en' ? 'Data Loaded Successfully' : 'डेटा यशस्वीरित्या लोड झाला'}
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-green-600"
                          >
                            ✓
                          </motion.span>
                        </p>
                        <p className="text-sm text-gray-700 mt-1 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-600" />
                          {language === 'en' ? (
                            <>Showing data for: <span className="font-bold text-green-800">{lastLoginDate}</span></>
                          ) : (
                            <>यासाठी डेटा दाखवत आहे: <span className="font-bold text-green-800">{lastLoginDate}</span></>
                          )}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Welcome Message & Last Login Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-5 mb-6 border-2 border-amber-200"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-amber-900 flex items-center gap-2">
                      {t.note} {daysSinceLastLogin === 0 ? t.todaySession : `${t.youLastLogged} ${daysSinceLastLogin === 1 ? '1 ' + (language === 'en' ? 'day ago' : 'दिवसापूर्वी') : t.daysAgo(daysSinceLastLogin)}`}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {daysSinceLastLogin === 0 ? t.todayWorkingOn : t.workingOn}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Downloaded Reports Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Download className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{t.downloadedReports}</h3>
                    <p className="text-sm text-gray-600">{t.reportsInSession}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {downloadedReports.map((report, index) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            report.fileFormat === 'Excel' 
                              ? 'bg-green-100' 
                              : report.fileFormat === 'PDF'
                              ? 'bg-red-100'
                              : 'bg-blue-100'
                          }`}>
                            <FileSpreadsheet className={`w-6 h-6 ${
                              report.fileFormat === 'Excel' 
                                ? 'text-green-600' 
                                : report.fileFormat === 'PDF'
                                ? 'text-red-600'
                                : 'text-blue-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-gray-900 mb-1">{report.reportName}</p>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {report.downloadDate}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {report.downloadTime}
                              </span>
                              <span className={`px-2 py-1 rounded-md font-bold ${
                                report.fileFormat === 'Excel' 
                                  ? 'bg-green-100 text-green-700' 
                                  : report.fileFormat === 'PDF'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {report.fileFormat}
                              </span>
                              <span className="text-gray-500">{report.fileSize}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleRedownload(report)}
                          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-2.5 rounded-xl shadow-lg font-semibold whitespace-nowrap"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          {t.redownload}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Searches Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                

                
              </motion.div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-gray-200 px-6 md:px-8 py-4 bg-gray-50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <p className="text-sm text-gray-600">
                  💡 <span className="font-semibold">{t.tip}</span> {t.tipMessage}
                </p>
                <Button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-[#005AA7] to-[#00C6FF] hover:from-[#004080] hover:to-[#0099CC] text-white px-8 py-3 rounded-xl shadow-lg font-bold text-base"
                >
                  {t.continueToDashboard}
                  <TrendingUp className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}