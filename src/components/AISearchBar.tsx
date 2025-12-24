import { Search, Mic, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function AISearchBar() {
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = [
    'Zone A water collection report',
    'Top defaulters in Zone B',
    'Monthly collection summary',
    'Zone A कलेक्शन अहवाल',
    'सर्व प्रलंबित बिले',
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex-shrink-0">
      <div className="max-w-5xl mx-auto relative">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Type or speak: 'Zone A water collection report' / 'Zone A कलेक्शन अहवाल'"
            className="w-full pl-20 pr-32 py-2.5 border-2 border-gray-300 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:shadow-lg focus:shadow-purple-200/50"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Voice Input Button */}
            <button
              onClick={() => setIsListening(!isListening)}
              className={`p-2 rounded-lg transition-all ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>
            {/* Search Button */}
            <button
              className="px-4 py-2 rounded-lg text-white transition-all hover:shadow-lg hover:shadow-purple-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #7B61FF 0%, #9B79FF 100%)',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px',
              }}
            >
              Search / <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '13px' }}>शोधा</span>
            </button>
          </div>
        </div>

        {/* AI Suggestions Dropdown */}
        {showSuggestions && (
          <div 
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200"
          >
            <div className="p-2 border-b border-gray-100 bg-purple-50">
              <p className="text-xs text-purple-700 flex items-center gap-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <Sparkles className="w-3 h-3" />
                AI Suggestions
              </p>
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm text-gray-700"
                style={{ fontFamily: suggestion.match(/[ऀ-ॿ]/) ? 'Noto Sans Devanagari, sans-serif' : 'Poppins, sans-serif' }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}