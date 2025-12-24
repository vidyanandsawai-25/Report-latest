import { CheckCircle2, Loader2 } from 'lucide-react';

export function ReportDialog() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-in zoom-in duration-300"
        style={{
          border: '2px solid rgba(34, 197, 94, 0.3)',
        }}
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
            <Loader2 className="w-16 h-16 text-green-600 absolute inset-0 animate-spin opacity-30" />
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-6">
          <h3 className="text-gray-800 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Report Search
          </h3>
          <p className="text-gray-600 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Searching for report data...
          </p>
          <p className="text-gray-600 text-sm" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
            अहवाल डेटा शोधत आहे...
          </p>
        </div>

        {/* OK Button */}
        <button
          className="w-full py-3 rounded-xl text-white shadow-lg hover:shadow-xl transition-all"
          style={{
            background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          <span>OK / </span>
          <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>ठीक आहे</span>
        </button>
      </div>
    </div>
  );
}
