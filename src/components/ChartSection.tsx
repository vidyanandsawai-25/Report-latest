import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const zoneData = [
  { zone: 'Zone A', collection: 145 },
  { zone: 'Zone B', collection: 132 },
  { zone: 'Zone C', collection: 98 },
  { zone: 'Zone D', collection: 85 },
];

const paymentData = [
  { name: 'Cash', value: 35, color: '#22C55E' },
  { name: 'Online', value: 45, color: '#3B82F6' },
  { name: 'UPI', value: 15, color: '#A855F7' },
  { name: 'Cheque', value: 5, color: '#F59E0B' },
];

export function ChartSection() {
  return (
    <div className="grid grid-cols-2 gap-6 flex-shrink-0" style={{ height: '240px' }}>
      {/* Bar Chart - Zone-wise Collection */}
      <div 
        className="p-4 rounded-2xl border"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderColor: 'rgba(0, 90, 167, 0.1)',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
        }}
      >
        <h4 
          className="text-gray-800 mb-2" 
          style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 500 }}
        >
          Zone-wise Collection / 
          <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '13px' }}> झोननुसार संकलन</span>
        </h4>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={zoneData}>
            <XAxis 
              dataKey="zone" 
              tick={{ fontSize: 11, fill: '#1E293B' }}
              stroke="#CBD5E1"
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#1E293B' }}
              stroke="#CBD5E1"
            />
            <Tooltip 
              contentStyle={{ 
                background: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                fontSize: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey="collection" 
              fill="url(#barGradient)" 
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#005AA7" />
                <stop offset="100%" stopColor="#00C6FF" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Payment Mode Split */}
      <div 
        className="p-4 rounded-2xl border"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderColor: 'rgba(0, 90, 167, 0.1)',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
        }}
      >
        <h4 
          className="text-gray-800 mb-2" 
          style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 500 }}
        >
          Payment Mode Split / 
          <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontSize: '13px' }}> पेमेंट मोड विभाजन</span>
        </h4>
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie
              data={paymentData}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={65}
              paddingAngle={3}
              dataKey="value"
              label={({ name, value }) => `${name} ${value}%`}
              labelStyle={{ fontSize: '11px', fill: '#1E293B', fontWeight: 500 }}
            >
              {paymentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                background: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                fontSize: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
