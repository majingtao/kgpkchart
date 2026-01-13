import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, CartesianGrid, ReferenceLine
} from 'recharts';
import { ORDER_STATUS_DATA, OTD_TREND_DATA, DBH_DATA } from '../constants';

export const OrderStatusChart = () => (
  <div className="h-28 w-28 mx-auto relative">
     <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={ORDER_STATUS_DATA}
            cx="50%"
            cy="50%"
            innerRadius={25}
            outerRadius={40}
            paddingAngle={2}
            dataKey="value"
          >
            {ORDER_STATUS_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xs font-bold text-slate-300">Total</span>
        <span className="text-sm font-mono font-bold text-white">815</span>
      </div>
  </div>
);

export const OTDTrendChart = () => (
  <ResponsiveContainer width="100%" height={100}>
    <AreaChart data={OTD_TREND_DATA}>
      <defs>
        <linearGradient id="colorOtd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
      <YAxis hide domain={[80, 100]} />
      <Tooltip 
        contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155'}} 
        itemStyle={{color: '#fff', fontSize: '12px'}}
        labelStyle={{display: 'none'}}
      />
      <Area type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorOtd)" />
      <ReferenceLine y={95} stroke="#ef4444" strokeDasharray="3 3" />
    </AreaChart>
  </ResponsiveContainer>
);

export const DBHBarChart = () => (
  <ResponsiveContainer width="100%" height={100}>
    <BarChart data={DBH_DATA} barSize={20}>
      <CartesianGrid vertical={false} stroke="#334155" strokeDasharray="3 3" opacity={0.3} />
      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
      <YAxis hide />
      <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155', fontSize: '12px'}} />
      <Bar dataKey="actual" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      <Bar dataKey="target" fill="#334155" radius={[4, 4, 0, 0]} opacity={0.3} />
    </BarChart>
  </ResponsiveContainer>
);
