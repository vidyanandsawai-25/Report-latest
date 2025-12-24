import { Calendar, Search, X } from 'lucide-react';

interface SlideInFilterPanelProps {
  reportType: string;
  onShow: () => void;
  onCancel: () => void;
}

export function SlideInFilterPanel({ reportType, onShow, onCancel }: SlideInFilterPanelProps) {
  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onCancel}
      />
      
      {/* Slide-in Panel */}
      <div 
        className="fixed right-0 top-0 bottom-0 w-[420px] bg-white shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div 
          className="sticky top-0 p-4 border-b border-gray-200 bg-white z-10"
          style={{
            background: 'linear-gradient(135deg, #005AA7 0%, #00C6FF 100%)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Report Filters
            </h3>
            <button
              onClick={onCancel}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-white/90 text-sm" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
            रिपोर्ट फिल्टर
          </p>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-4">
          {/* Zone Filter */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Zone / <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>झोन</span>
            </label>
            <div className="space-y-2">
              {['A', 'B', 'C', 'D'].map((zone) => (
                <label key={zone} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 cursor-pointer" />
                  <span className="text-gray-700 text-sm">Zone {zone}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ward Dropdown */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ward / <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>प्रभाग</span>
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer">
              <option>All Wards</option>
              <option>Ward 1</option>
              <option>Ward 2</option>
              <option>Ward 3</option>
            </select>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Category / <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>कॅटेगरी</span>
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer">
              <option>All Categories</option>
              <option>Residential</option>
              <option>Commercial</option>
              <option>Industrial</option>
              <option>Government</option>
            </select>
          </div>

          {/* Connection Type */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Connection Type / <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>जोडणी प्रकार</span>
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer">
              <option>All Types</option>
              <option>Metered</option>
              <option>Non-Metered</option>
            </select>
          </div>

          {/* From Date */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              From Date / <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>पासून तारीख</span>
            </label>
            <div className="relative">
              <input 
                type="date" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* To Date */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              To Date / <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>पर्यंत तारीख</span>
            </label>
            <div className="relative">
              <input 
                type="date" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Status / <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>स्थिती</span>
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
            </select>
          </div>

          {/* Amount Range */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Amount Range / <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>रकम श्रेणी</span>
            </label>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="Min"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <input 
                type="number" 
                placeholder="Max"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Consumer Number Search */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Consumer No / <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>ग्राहक क्रमांक</span>
            </label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Enter consumer number..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Action Buttons - Sticky Footer */}
        <div className="sticky bottom-0 p-4 border-t border-gray-200 bg-white space-y-2">
          <button
            onClick={onShow}
            className="w-full py-2.5 rounded-xl text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
            }}
          >
            <div className="flex items-center justify-center gap-1">
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 500 }}>Show</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 300 }}>/</span>
              <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '14px', fontWeight: 500 }}>दाखवा</span>
            </div>
          </button>
          
          <button
            onClick={onShow}
            className="w-full py-2.5 rounded-xl text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            }}
          >
            <div className="flex items-center justify-center gap-1">
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 500 }}>Search</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 300 }}>/</span>
              <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '14px', fontWeight: 500 }}>शोधा</span>
            </div>
          </button>
          
          <button
            onClick={onCancel}
            className="w-full py-2.5 rounded-xl text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
            }}
          >
            <div className="flex items-center justify-center gap-1">
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 500 }}>Cancel</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 300 }}>/</span>
              <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '14px', fontWeight: 500 }}>रद्द करा</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}