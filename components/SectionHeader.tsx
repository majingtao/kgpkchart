import React from 'react';

const SectionHeader: React.FC<{ title: string; subtitle?: string; color?: string }> = ({ title, subtitle, color = "bg-blue-500" }) => (
  <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
    <div className={`w-1 h-4 rounded-sm ${color}`} />
    <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">{title}</h2>
    {subtitle && <span className="text-xs text-slate-500 ml-auto">{subtitle}</span>}
  </div>
);

export default SectionHeader;
