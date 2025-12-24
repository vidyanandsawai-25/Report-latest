import { LucideIcon, ArrowRight, Sparkles, Zap } from 'lucide-react';

interface ReportCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  gradient?: string;
  onClick: () => void;
}

export function ReportCard({ title, description, icon: Icon, color, gradient, onClick }: ReportCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full h-[165px] rounded-3xl p-5 shadow-lg border text-left cursor-pointer relative overflow-hidden group"
      style={{
        background: `
          linear-gradient(135deg, 
            ${color}08 0%, 
            ${color}04 40%, 
            #ffffff 70%,
            ${color}03 100%
          )
        `,
        borderColor: `${color}20`,
        boxShadow: `
          0 4px 20px ${color}15,
          0 2px 8px rgba(0,0,0,0.06),
          inset 0 1px 2px rgba(255,255,255,0.8),
          0 0 0 1px ${color}10
        `
      }}
    >
      {/* Premium gradient mesh background */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at top left, ${color}15 0%, transparent 50%),
            radial-gradient(ellipse at top right, ${color}10 0%, transparent 50%),
            radial-gradient(ellipse at bottom left, ${color}08 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, ${color}12 0%, transparent 50%)
          `
        }}
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(${color} 1px, transparent 1px),
            linear-gradient(90deg, ${color} 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Glow effect orb */}
      <div
        className="absolute w-32 h-32 rounded-full blur-3xl opacity-25"
        style={{ 
          background: `radial-gradient(circle, ${color}60 0%, ${color}30 50%, transparent 70%)`,
          top: '20%',
          left: '20%'
        }}
      />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Icon Section with Premium Design */}
        <div className="flex items-start justify-between mb-3">
          <div className="relative">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: `radial-gradient(circle, ${color}25 0%, transparent 70%)`,
                filter: 'blur(8px)'
              }}
            />

            {/* Icon container */}
            <div 
              className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl overflow-hidden"
              style={{ 
                background: `
                  linear-gradient(135deg, 
                    ${color}20 0%, 
                    ${color}35 50%, 
                    ${color}25 100%
                  )
                `,
                boxShadow: `
                  0 8px 24px ${color}30,
                  inset 0 1px 2px rgba(255,255,255,0.5),
                  inset 0 -2px 8px ${color}20
                `
              }}
            >
              {/* Glossy top highlight */}
              <div 
                className="absolute top-0 left-0 right-0 h-1/2 opacity-40"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)',
                  borderRadius: '16px 16px 0 0'
                }}
              />

              <Icon 
                className="w-7 h-7 relative z-10" 
                style={{ 
                  color,
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))'
                }} 
              />
              
              {/* Corner sparkle */}
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-3 h-3" style={{ color: '#fff', filter: `drop-shadow(0 0 4px ${color})` }} />
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl backdrop-blur-md shadow-lg"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))`,
              border: `1px solid ${color}25`,
              boxShadow: `0 4px 12px ${color}15`
            }}
          >
            <Zap className="w-3 h-3" style={{ color }} />
            <span className="text-[10px] font-semibold tracking-wide" style={{ color }}>ACTIVE</span>
          </div>
        </div>

        {/* Content Section with Enhanced Typography */}
        <div className="flex-1 flex flex-col justify-start space-y-2">
          <h3 className="text-gray-900 font-bold leading-tight text-[15px] group-hover:text-gray-950 transition-colors tracking-tight">
            {title}
          </h3>
          
          <p className="text-gray-600 text-[11px] leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors">
            {description}
          </p>
        </div>

        {/* Bottom Action Bar */}
        <div 
          className="flex items-center justify-between mt-3 pt-2.5"
          style={{
            borderTop: `1px solid ${color}10`
          }}
        >
          {/* Quick access label */}
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles className="w-3.5 h-3.5" style={{ color }} />
            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color }}>
              Quick View
            </span>
          </div>

          {/* Action button */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg shadow-md"
            style={{
              background: `linear-gradient(135deg, ${color}15, ${color}25)`,
              border: `1px solid ${color}30`
            }}
          >
            <span className="text-[10px] font-bold" style={{ color }}>Generate</span>
            <ArrowRight className="w-3.5 h-3.5" style={{ color }} />
          </div>
        </div>
      </div>

      {/* Premium bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 h-1 rounded-full w-full"
        style={{ 
          background: `linear-gradient(90deg, 
            transparent 0%, 
            ${color}40 20%, 
            ${color} 50%, 
            ${color}40 80%, 
            transparent 100%
          )`,
          boxShadow: `0 0 20px ${color}60, 0 -2px 10px ${color}40`
        }}
      />

      {/* Corner glow effects */}
      <div
        className="absolute top-0 right-0 w-16 h-16 rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity"
        style={{ backgroundColor: color }}
      />

      <div
        className="absolute bottom-0 left-0 w-16 h-16 rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity"
        style={{ backgroundColor: color }}
      />
    </button>
  );
}
