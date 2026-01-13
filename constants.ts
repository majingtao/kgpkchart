import { KPIMetric, Order, Equipment, Shipment, WorkOrder, CPKData, Alert } from './types';

// --- 1. Top KPI Data ---
export const KPI_DATA: KPIMetric[] = [
  {
    title: "订单情况 (Orders)",
    items: [
      { label: "今日新增", value: 124, color: "text-blue-400" },
      { label: "在制订单", value: 450, color: "text-slate-200" },
      { label: "延期订单", value: 18, color: "text-rose-400" },
    ],
    trend: { value: "+12 vs Yesterday", direction: "up", color: "text-emerald-400" },
  },
  {
    title: "发货与收货 (Logistics)",
    items: [
      { label: "待发货", value: 45, color: "text-amber-400" },
      { label: "已发货", value: 120, color: "text-emerald-400" },
      { label: "来料未到", value: 3, color: "text-rose-400" },
    ],
    trend: { value: "-2 Pending", direction: "down", color: "text-emerald-400" },
  },
  {
    title: "交货率 (OTD)",
    items: [
      { label: "本月OTD", value: "96.5", unit: "%", color: "text-emerald-400" },
      { label: "本周OTD", value: "94.2", unit: "%", color: "text-amber-400" },
      { label: "风险单", value: 8, color: "text-rose-400" },
    ],
    trend: { value: "-1.2% vs Target", direction: "down", color: "text-rose-400" },
  },
  {
    title: "设备状态 (Equipment)",
    items: [
      { label: "运行中", value: 16, color: "text-emerald-400" },
      { label: "停机", value: 2, color: "text-slate-400" },
      { label: "故障", value: 2, color: "text-rose-500 font-bold" },
    ],
    trend: { value: "80% OEE", direction: "neutral", color: "text-blue-400" },
  },
  {
    title: "DBH (Output)",
    items: [
      { label: "实际产出", value: 12500, color: "text-blue-400" },
      { label: "目标产出", value: 13000, color: "text-slate-400" },
      { label: "达成率", value: "96.1", unit: "%", color: "text-amber-400" },
    ],
    trend: { value: "gap: -500", direction: "down", color: "text-amber-400" },
  },
  {
    title: "生产工单 (Work Orders)",
    items: [
      { label: "进行中", value: 62, color: "text-blue-400" },
      { label: "超期", value: 5, color: "text-rose-400" },
      { label: "准时率", value: "92", unit: "%", color: "text-emerald-400" },
    ],
    trend: { value: "+3 Overdue", direction: "down", color: "text-rose-400" },
  },
  {
    title: "CPK (Quality)",
    items: [
      { label: "达标工序", value: 42, color: "text-emerald-400" },
      { label: "不达标", value: 4, color: "text-rose-400" },
      { label: "最低", value: 0.85, color: "text-rose-500 font-bold" },
    ],
    trend: { value: "Stable", direction: "neutral", color: "text-slate-400" },
  },
];

// --- 2. Chart Data ---
export const ORDER_STATUS_DATA = [
  { name: 'On Track', value: 450, color: '#10b981' },
  { name: 'Completed', value: 320, color: '#3b82f6' },
  { name: 'Delayed', value: 45, color: '#ef4444' },
];

export const OTD_TREND_DATA = [
  { day: 'M', actual: 98, target: 95 },
  { day: 'T', actual: 96, target: 95 },
  { day: 'W', actual: 92, target: 95 },
  { day: 'T', actual: 94, target: 95 },
  { day: 'F', actual: 97, target: 95 },
  { day: 'S', actual: 95, target: 95 },
  { day: 'S', actual: 99, target: 95 },
];

export const DBH_DATA = [
  { time: '08:00', actual: 1200, target: 1500 },
  { time: '10:00', actual: 1450, target: 1500 },
  { time: '12:00', actual: 1550, target: 1500 },
  { time: '14:00', actual: 1100, target: 1500 }, // Dip
  { time: '16:00', actual: 1600, target: 1500 },
];

// --- 3. Lists Data ---

export const DELAYED_ORDERS: Order[] = [
  { id: 'ORD-9921', client: 'Tesla Inc', status: 'Delayed', dueDate: '10/24', delayDays: 3, productLine: 'Line A' },
  { id: 'ORD-9925', client: 'Foxconn', status: 'Delayed', dueDate: '10/25', delayDays: 2, productLine: 'Line B' },
  { id: 'ORD-9930', client: 'BYD Auto', status: 'Delayed', dueDate: '10/26', delayDays: 1, productLine: 'Line A' },
  { id: 'ORD-9932', client: 'Siemens', status: 'Delayed', dueDate: '10/24', delayDays: 3, productLine: 'Line C' },
];

export const EQUIPMENT_LIST: Equipment[] = Array.from({ length: 20 }, (_, i) => {
  const num = i + 1;
  const rand = Math.random();
  let status: Equipment['status'] = 'Running';
  if (rand > 0.9) status = 'Fault';
  else if (rand > 0.8) status = 'Stopped';
  else if (rand > 0.75) status = 'Maintenance';

  return {
    id: `EQ-${num}`,
    name: `CNC-${num < 10 ? '0' + num : num}`,
    status,
    duration: status === 'Running' ? '12h' : '45m',
    currentJob: `JOB-88${num}`,
    dbh: Math.floor(Math.random() * 200) + 800,
  };
});

export const WORK_ORDERS: WorkOrder[] = [
  { id: 'WO-1001', product: 'Gearbox Case X1', progress: 85, status: 'Normal', responsible: 'Team A' },
  { id: 'WO-1002', product: 'Shaft Gen-3', progress: 45, status: 'Overdue', responsible: 'Team B', reason: 'Material' },
  { id: 'WO-1003', product: 'Piston Ring', progress: 10, status: 'Risk', responsible: 'Team C', reason: 'Machine' },
  { id: 'WO-1005', product: 'Valve Body', progress: 92, status: 'Normal', responsible: 'Team A' },
  { id: 'WO-1008', product: 'Mounting Brkt', progress: 30, status: 'Overdue', responsible: 'Team D', reason: 'Quality' },
];

export const CPK_ALERTS: CPKData[] = [
  { process: 'CNC Turning', product: 'Shaft-A', value: 0.85, target: 1.33, status: 'Bad' },
  { process: 'Grinding', product: 'Bearing-X', value: 1.10, target: 1.33, status: 'Warning' },
  { process: 'Heat Treat', product: 'Gear-Y', value: 0.92, target: 1.33, status: 'Bad' },
  { process: 'Assembly', product: 'Module-Z', value: 1.25, target: 1.33, status: 'Warning' },
];

export const CRITICAL_ALERTS: Alert[] = [
  { id: 'AL-01', level: 'Critical', message: 'CNC-04 Spindle Failure', impact: 'Line B Halted', action: 'Maintenance Called', timestamp: '10:45' },
  { id: 'AL-02', level: 'Warning', message: 'Material Shortage: Steel 304', impact: 'WO-1002 Risk', action: 'Expedite Vendor', timestamp: '09:30' },
  { id: 'AL-03', level: 'Critical', message: 'ORD-9921 Delayed > 3 Days', impact: 'Client Escalation', action: 'Manager Review', timestamp: '08:15' },
];
