export interface KPIMetric {
  title: string;
  items: { label: string; value: string | number; unit?: string; color?: string }[];
  trend: { value: string; direction: 'up' | 'down' | 'neutral'; color: string };
}

export interface Order {
  id: string;
  client: string;
  status: 'In Progress' | 'Completed' | 'Delayed';
  dueDate: string;
  delayDays: number;
  productLine: string;
}

export interface Shipment {
  id: string;
  partner: string; // Client or Vendor
  type: 'Outbound' | 'Inbound';
  date: string;
  status: 'Pending' | 'Shipped' | 'Delayed' | 'Received';
  reason?: string;
}

export interface Equipment {
  id: string;
  name: string;
  status: 'Running' | 'Stopped' | 'Fault' | 'Maintenance';
  duration: string; // e.g. "4h 20m"
  currentJob: string;
  dbh: number; // Day By Hour output
}

export interface WorkOrder {
  id: string;
  product: string;
  progress: number;
  status: 'Normal' | 'Risk' | 'Overdue';
  responsible: string;
  reason?: string;
}

export interface CPKData {
  process: string;
  product: string;
  value: number;
  target: number;
  status: 'Good' | 'Warning' | 'Bad';
}

export interface Alert {
  id: string;
  level: 'Critical' | 'Warning' | 'Info';
  message: string;
  impact: string;
  action: string;
  timestamp: string;
}
