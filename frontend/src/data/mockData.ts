export interface Vehicle {
  id: string;
  driverName: string;
  status: "active" | "inactive";
  engineOn: boolean;
  lat: number;
  lng: number;
  lastUpdated: string;
  lastLocation: string;
  speed: number;
}

export interface Alert {
  id: string;
  vehicleId: string;
  type: "overspeed" | "idle" | "offline";
  severity: "low" | "medium" | "high";
  message: string;
  timestamp: string;
}

export interface Activity {
  id: string;
  vehicleId: string;
  event: string;
  timestamp: string;
  location: string;
}

export const vehicles: Vehicle[] = [
  { id: "VH-1001", driverName: "Ahmed Khan", status: "active", engineOn: true, lat: 24.8607, lng: 67.0011, lastUpdated: "2 min ago", lastLocation: "Clifton, Karachi", speed: 45 },
  { id: "VH-1002", driverName: "Sara Ali", status: "active", engineOn: true, lat: 24.9056, lng: 67.0822, lastUpdated: "1 min ago", lastLocation: "Gulshan, Karachi", speed: 60 },
  { id: "VH-1003", driverName: "Omar Farooq", status: "inactive", engineOn: false, lat: 24.8715, lng: 67.0251, lastUpdated: "15 min ago", lastLocation: "Saddar, Karachi", speed: 0 },
  { id: "VH-1004", driverName: "Fatima Noor", status: "active", engineOn: true, lat: 24.9281, lng: 67.1135, lastUpdated: "3 min ago", lastLocation: "North Nazimabad", speed: 35 },
  { id: "VH-1005", driverName: "Hassan Raza", status: "inactive", engineOn: false, lat: 24.8422, lng: 66.9905, lastUpdated: "45 min ago", lastLocation: "DHA Phase 6", speed: 0 },
  { id: "VH-1006", driverName: "Ayesha Malik", status: "active", engineOn: true, lat: 24.8955, lng: 67.0741, lastUpdated: "1 min ago", lastLocation: "Bahadurabad", speed: 52 },
  { id: "VH-1007", driverName: "Bilal Ahmed", status: "active", engineOn: false, lat: 24.9125, lng: 67.0365, lastUpdated: "8 min ago", lastLocation: "PECHS Block 2", speed: 0 },
  { id: "VH-1008", driverName: "Zara Sheikh", status: "active", engineOn: true, lat: 24.8830, lng: 67.0645, lastUpdated: "30 sec ago", lastLocation: "Tariq Road", speed: 28 },
];

export const alerts: Alert[] = [
  { id: "AL-001", vehicleId: "VH-1002", type: "overspeed", severity: "high", message: "Vehicle exceeded 80 km/h in restricted zone", timestamp: "10:32 AM" },
  { id: "AL-002", vehicleId: "VH-1003", type: "offline", severity: "medium", message: "Vehicle has been offline for 15 minutes", timestamp: "10:15 AM" },
  { id: "AL-003", vehicleId: "VH-1006", type: "overspeed", severity: "high", message: "Speed limit violation on Highway M-9", timestamp: "09:58 AM" },
  { id: "AL-004", vehicleId: "VH-1007", type: "idle", severity: "low", message: "Engine idle for more than 10 minutes", timestamp: "09:45 AM" },
  { id: "AL-005", vehicleId: "VH-1005", type: "offline", severity: "high", message: "Vehicle offline — no GPS signal detected", timestamp: "09:30 AM" },
  { id: "AL-006", vehicleId: "VH-1004", type: "idle", severity: "low", message: "Engine idle at parking zone", timestamp: "09:12 AM" },
  { id: "AL-007", vehicleId: "VH-1001", type: "overspeed", severity: "medium", message: "Brief speed spike detected near toll plaza", timestamp: "08:50 AM" },
];

export const recentActivity: Activity[] = [
  { id: "ACT-1", vehicleId: "VH-1001", event: "Engine Started", timestamp: "10:30 AM", location: "Clifton, Karachi" },
  { id: "ACT-2", vehicleId: "VH-1002", event: "Crossed Geofence", timestamp: "10:28 AM", location: "Gulshan Chowrangi" },
  { id: "ACT-3", vehicleId: "VH-1006", event: "Speed Alert", timestamp: "10:25 AM", location: "Shahrah-e-Faisal" },
  { id: "ACT-4", vehicleId: "VH-1003", event: "Engine Stopped", timestamp: "10:15 AM", location: "Saddar" },
  { id: "ACT-5", vehicleId: "VH-1008", event: "Trip Completed", timestamp: "10:10 AM", location: "Tariq Road" },
  { id: "ACT-6", vehicleId: "VH-1004", event: "Fuel Refill Detected", timestamp: "10:05 AM", location: "PSO Station, N. Nazimabad" },
];

export const chartData = [
  { time: "06:00", active: 2, inactive: 6 },
  { time: "08:00", active: 5, inactive: 3 },
  { time: "10:00", active: 6, inactive: 2 },
  { time: "12:00", active: 7, inactive: 1 },
  { time: "14:00", active: 5, inactive: 3 },
  { time: "16:00", active: 6, inactive: 2 },
  { time: "18:00", active: 4, inactive: 4 },
  { time: "20:00", active: 3, inactive: 5 },
  { time: "22:00", active: 1, inactive: 7 },
];
