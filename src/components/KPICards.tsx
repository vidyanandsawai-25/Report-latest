import { IndianRupee, Users, FileText, TrendingUp } from 'lucide-react';

export function KPICards() {
  const kpis = [
    {
      icon: IndianRupee,
      titleEn: 'Total Collection',
      titleMr: 'एकूण संकलन',
      value: '₹5.4 Cr',
      gradient: 'linear-gradient(135deg, #16A34A 0%, #22C55E 100%)',
      bgColor: 'rgba(34, 197, 94, 0.1)'
    },
    {
      icon: Users,
      titleEn: 'Active Consumers',
      titleMr: 'सक्रिय ग्राहक',
      value: '1,24,000',
      gradient: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
      bgColor: 'rgba(59, 130, 246, 0.1)'
    },
    {
      icon: FileText,
      titleEn: 'Pending Bills',
      titleMr: 'प्रलंबित बिले',
      value: '12,340',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    {
      icon: TrendingUp,
      titleEn: 'Success Rate',
      titleMr: 'यश दर',
      value: '94.5%',
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
      bgColor: 'rgba(168, 85, 247, 0.1)'
    }
  ];

  return (
    <div className="mb-3 flex-shrink-0">
      <h4 
        className="text-gray-800 mb-2" 
        style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 600 }}
      >
        Analytics & Insights / 
        <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '13px' }}> विश्लेषण आणि अंतर्दृष्टी</span>
      </h4>
      
      <div className="grid grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="p-3.5 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105"
              style={{
                background: kpi.bgColor,
                borderColor: 'rgba(0, 90, 167, 0.1)',
                height: '110px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  style={{ background: kpi.gradient }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <p 
                className="text-gray-600 mb-0.5" 
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}
              >
                {kpi.titleEn}
              </p>
              <p 
                className="text-gray-500 mb-1.5" 
                style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '11px' }}
              >
                {kpi.titleMr}
              </p>
              <p 
                className="text-gray-800" 
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600 }}
              >
                {kpi.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}