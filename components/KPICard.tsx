import React from 'react';
import { KPIMetric } from '../types';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface Props {
  data: KPIMetric;
}

const KPICard: React.FC<Props> = ({ data }) => {
  const getIcon = (direction: string) => {
    if (direction === 'up') return <ArrowUp size={12} />;
    if (direction === 'down') return <ArrowDown size={12} />;
    return <Minus size={12} />;
  };

  return (
    <div className="glass-panel p-3 rounded-lg flex flex-col justify-between h-full min-h-[110px] hover:bg-slate-800/80 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">{data.title}</h3>
        <div className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 ${data.trend.color}`}>
          {getIcon(data.trend.direction)}
          <span>{data.trend.value}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-1">
        {data.items.map((item, idx) => (
          <div key={idx} className="flex flex-col">
            <span className={`text-lg font-mono font-bold leading-none ${item.color || 'text-white'}`}>
              {item.value}
              {item.unit && <span className="text-[10px] ml-0.5 text-slate-500 font-sans">{item.unit}</span>}
            </span>
            <span className="text-[10px] text-slate-500 mt-1 truncate" title={item.label}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KPICard;
