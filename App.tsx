import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, RefreshCw, Calendar, Settings, 
  AlertTriangle, CheckCircle, Truck, Package, Activity, AlertOctagon 
} from 'lucide-react';
import KPICard from './components/KPICard';
import SectionHeader from './components/SectionHeader';
import { OrderStatusChart, OTDTrendChart, DBHBarChart } from './components/Charts';
import { KPI_DATA, DELAYED_ORDERS, EQUIPMENT_LIST, WORK_ORDERS, CPK_ALERTS, CRITICAL_ALERTS } from './constants';

const App: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 p-4 gap-4 overflow-hidden selection:bg-blue-500/30">
      
      {/* --- HEADER --- */}
      <header className="flex-none flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">派克汉尼汾(上海)公司</h1>
            <span className="text-xs text-slate-500 font-mono">PLANT: SHANGHAI-HQ | UNIT: ASSEMBLY-A</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
           {/* Filters Mockup */}
           <div className="flex gap-2 text-xs">
              {['All Lines', 'Shift A', 'This Month'].map(f => (
                <button key={f} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded hover:bg-slate-700 transition">
                  {f}
                </button>
              ))}
           </div>
           
           <div className="h-6 w-px bg-slate-700" />

           <div className="text-right">
              <div className="text-lg font-mono font-bold leading-none">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              <div className="text-[10px] text-slate-400 font-mono">{time.toLocaleDateString()}</div>
           </div>
           
           <button className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
             <RefreshCw size={18} />
           </button>
        </div>
      </header>

      {/* --- SECTION 1: TOP KPI ROW --- */}
      <section className="flex-none grid grid-cols-7 gap-3 h-[120px]">
        {KPI_DATA.map((kpi, index) => (
          <KPICard key={index} data={kpi} />
        ))}
      </section>

      {/* --- SECTION 2: MIDDLE SPLIT VIEW --- */}
      <section className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        
        {/* LEFT: SUPPLY CHAIN (5 cols) */}
        <div className="col-span-5 flex flex-col gap-4">
            
            {/* 2A: Order Status */}
            <div className="flex-1 glass-panel rounded-lg p-3 flex flex-col">
              <SectionHeader title="A. 订单情况 (Order Status)" color="bg-blue-500" />
              <div className="flex items-center gap-4 h-full">
                <div className="flex-none">
                   <OrderStatusChart />
                </div>
                <div className="flex-1 h-full overflow-hidden flex flex-col">
                  <h4 className="text-xs font-bold text-rose-400 mb-2 flex items-center gap-1">
                    <AlertOctagon size={12} /> DELAYED ORDERS (Top 5)
                  </h4>
                  <div className="overflow-y-auto pr-1 custom-scrollbar">
                    <table className="w-full text-[10px] text-left">
                      <thead className="text-slate-500 border-b border-slate-700 sticky top-0 bg-slate-900/90 backdrop-blur">
                        <tr>
                          <th className="py-1">ID</th>
                          <th className="py-1">Client</th>
                          <th className="py-1 text-right">Delay</th>
                        </tr>
                      </thead>
                      <tbody className="font-mono">
                        {DELAYED_ORDERS.map((order, i) => (
                          <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800 cursor-pointer">
                            <td className="py-1.5 text-blue-300">{order.id}</td>
                            <td className="py-1.5 text-slate-300">{order.client}</td>
                            <td className="py-1.5 text-right text-rose-400 font-bold">{order.delayDays}d</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* 2B: Logistics */}
            <div className="flex-1 glass-panel rounded-lg p-3 flex flex-col">
               <SectionHeader title="B. 物流情况 (Logistics)" color="bg-amber-500" />
               <div className="flex gap-4 h-full">
                  <div className="flex-1 bg-slate-800/30 rounded p-2 border border-dashed border-slate-700">
                     <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] text-slate-400 uppercase">Outbound Plan</span>
                       <Truck size={12} className="text-emerald-400" />
                     </div>
                     <div className="flex items-end gap-2">
                       <span className="text-xl font-mono font-bold">120</span>
                       <span className="text-[10px] text-slate-500 mb-1">/ 145 items</span>
                     </div>
                     <div className="w-full bg-slate-700 h-1 mt-2 rounded-full overflow-hidden">
                       <div className="bg-emerald-500 h-full w-[82%]"></div>
                     </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex justify-between items-center mb-1">
                       <span className="text-[10px] text-slate-400">Incoming Delay (Top 3)</span>
                    </div>
                     <table className="w-full text-[10px] text-left">
                      <tbody className="font-mono">
                        <tr className="border-b border-slate-800 hover:bg-slate-800">
                           <td className="py-1 text-slate-300">PO-4421</td>
                           <td className="py-1 text-slate-400">Steel Corp</td>
                           <td className="py-1 text-right text-amber-400">2d</td>
                        </tr>
                        <tr className="border-b border-slate-800 hover:bg-slate-800">
                           <td className="py-1 text-slate-300">PO-4455</td>
                           <td className="py-1 text-slate-400">Elec Parts</td>
                           <td className="py-1 text-right text-rose-400">5d</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
               </div>
            </div>

        </div>

        {/* RIGHT: PRODUCTION (7 cols) */}
        <div className="col-span-7 flex flex-col gap-4">
            
            <div className="flex gap-4 h-[120px]">
               {/* 2C: OTD */}
               <div className="w-1/2 glass-panel rounded-lg p-3">
                  <SectionHeader title="C. 交货率趋势 (OTD)" color="bg-emerald-500" />
                  <div className="-mt-2">
                    <OTDTrendChart />
                  </div>
               </div>

               {/* 2E: DBH */}
               <div className="w-1/2 glass-panel rounded-lg p-3">
                   <SectionHeader title="E. 产出 (DBH)" color="bg-blue-400" />
                   <div className="-mt-2">
                     <DBHBarChart />
                   </div>
               </div>
            </div>

            {/* 2D: Equipment Matrix */}
            <div className="flex-1 glass-panel rounded-lg p-3 overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-3">
                 <SectionHeader title="D. 设备状态矩阵 (Equipment 4x5)" color="bg-slate-200" />
                 <div className="flex gap-3 text-[10px]">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Running</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Fault</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-500"></div> Stopped</div>
                 </div>
              </div>

              <div className="grid grid-cols-5 gap-2 h-full">
                {EQUIPMENT_LIST.map((eq) => (
                  <div 
                    key={eq.id}
                    className={`
                      relative flex flex-col justify-center items-center rounded border transition-all duration-300 cursor-pointer group
                      ${eq.status === 'Running' ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500' : ''}
                      ${eq.status === 'Fault' ? 'bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/20' : ''}
                      ${eq.status === 'Stopped' ? 'bg-slate-700/30 border-slate-600/30 grayscale' : ''}
                      ${eq.status === 'Maintenance' ? 'bg-amber-500/10 border-amber-500/30' : ''}
                    `}
                  >
                    <div className="text-[10px] font-mono font-bold text-slate-300">{eq.name}</div>
                    
                    {eq.status === 'Running' && (
                       <div className="text-[9px] text-emerald-400 mt-0.5">{eq.dbh} pcs</div>
                    )}
                    {eq.status === 'Fault' && (
                       <AlertTriangle size={12} className="text-rose-500 mt-1 animate-bounce" />
                    )}
                     {eq.status === 'Stopped' && (
                       <span className="text-[8px] text-slate-500 mt-0.5">STOP</span>
                    )}

                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-slate-900 border border-slate-700 p-2 rounded shadow-xl z-10 hidden group-hover:block pointer-events-none">
                       <div className="text-[10px] font-bold text-white">{eq.name}</div>
                       <div className="text-[9px] text-slate-400">Job: {eq.currentJob}</div>
                       <div className="text-[9px] text-slate-400">Time: {eq.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

        </div>
      </section>

      {/* --- SECTION 3: BOTTOM DETAILS --- */}
      <section className="flex-none h-[220px] grid grid-cols-3 gap-4">
        
        {/* 3F: Work Orders */}
        <div className="glass-panel rounded-lg p-3 flex flex-col">
           <SectionHeader title="F. 生产工单 (Work Orders)" color="bg-blue-500" />
           <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-[11px] text-left border-collapse">
                <thead className="text-slate-500 sticky top-0 bg-slate-900/95 backdrop-blur z-10">
                   <tr>
                     <th className="pb-2 font-medium">WO #</th>
                     <th className="pb-2 font-medium">Product</th>
                     <th className="pb-2 font-medium">Progress</th>
                     <th className="pb-2 font-medium text-right">Status</th>
                   </tr>
                </thead>
                <tbody className="font-mono text-slate-300">
                   {WORK_ORDERS.map(wo => (
                     <tr key={wo.id} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                       <td className="py-1.5">{wo.id}</td>
                       <td className="py-1.5 font-sans">{wo.product}</td>
                       <td className="py-1.5">
                          <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                             <div className={`h-full ${wo.progress > 80 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{width: `${wo.progress}%`}} />
                          </div>
                       </td>
                       <td className="py-1.5 text-right">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                             wo.status === 'Overdue' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                             wo.status === 'Risk' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                             'text-emerald-500'
                          }`}>
                            {wo.status}
                          </span>
                       </td>
                     </tr>
                   ))}
                </tbody>
              </table>
           </div>
        </div>

        {/* 3G: CPK Quality */}
        <div className="glass-panel rounded-lg p-3 flex flex-col">
           <SectionHeader title="G. 质量 CPK (Process Capability)" color="bg-purple-500" />
           <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-[11px] text-left">
                <thead className="text-slate-500 sticky top-0 bg-slate-900/95 z-10">
                   <tr>
                     <th className="pb-2 font-medium">Process</th>
                     <th className="pb-2 font-medium">Product</th>
                     <th className="pb-2 font-medium text-right">Value</th>
                     <th className="pb-2 font-medium text-right">Status</th>
                   </tr>
                </thead>
                <tbody className="font-mono">
                   {CPK_ALERTS.map((cpk, i) => (
                     <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/50">
                       <td className="py-1.5 font-sans text-slate-300">{cpk.process}</td>
                       <td className="py-1.5 font-sans text-slate-400">{cpk.product}</td>
                       <td className="py-1.5 text-right font-bold">{cpk.value.toFixed(2)}</td>
                       <td className="py-1.5 text-right">
                          <span className={`text-[10px] ${
                             cpk.status === 'Bad' ? 'text-rose-500 font-bold' : 
                             cpk.status === 'Warning' ? 'text-amber-400' : 'text-emerald-400'
                          }`}>
                             {cpk.status.toUpperCase()}
                          </span>
                       </td>
                     </tr>
                   ))}
                </tbody>
              </table>
           </div>
        </div>

        {/* 3H: Alerts */}
        <div className="glass-panel rounded-lg p-3 flex flex-col border-l-4 border-l-rose-500/50">
           <SectionHeader title="H. 重点预警 (Critical Alerts)" color="bg-rose-500" />
           <div className="flex-1 flex flex-col gap-2 overflow-auto custom-scrollbar">
              {CRITICAL_ALERTS.map(alert => (
                 <div key={alert.id} className="bg-slate-800/50 p-2 rounded border border-slate-700 hover:border-rose-500/50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-1">
                       <span className={`text-[10px] px-1.5 rounded font-bold ${
                          alert.level === 'Critical' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-black'
                       }`}>
                          {alert.level}
                       </span>
                       <span className="text-[10px] text-slate-500 font-mono">{alert.timestamp}</span>
                    </div>
                    <div className="text-xs text-slate-200 font-medium mb-0.5">{alert.message}</div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                       <span>Impact: {alert.impact}</span>
                       <span className="group-hover:text-blue-400 transition-colors">Action: {alert.action} &rarr;</span>
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </section>

    </div>
  );
};

export default App;