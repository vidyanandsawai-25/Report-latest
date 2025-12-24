import { Download, RefreshCw, ChevronDown } from 'lucide-react';

interface ReportsHeaderProps {
  activeMainTab: 'dashboard' | 'reports';
  setActiveMainTab: (tab: 'dashboard' | 'reports') => void;
}

export function ReportsHeader({ activeMainTab, setActiveMainTab }: ReportsHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
      <div className="flex items-center justify-between">
        {/* Left: Main Tabs */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveMainTab('dashboard')}
            className={`px-4 py-2 rounded-full transition-all ${
              activeMainTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveMainTab('reports')}
            className={`px-4 py-2 rounded-full transition-all ${
              activeMainTab === 'reports'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Reports
          </button>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          {/* Year Dropdown */}
          <div className="relative">
            <select 
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm cursor-pointer hover:border-gray-400 transition-colors"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <option>2024-25</option>
              <option>2023-24</option>
              <option>2022-23</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Zone Selector */}
          <div className="relative">
            <select 
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm cursor-pointer hover:border-gray-400 transition-colors"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <option>All Zones</option>
              <option>Zone A</option>
              <option>Zone B</option>
              <option>Zone C</option>
              <option>Zone D</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Export Button */}
          <button 
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <Download className="w-4 h-4" />
            Export
          </button>

          {/* Refresh Button */}
          <button 
            className="bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}