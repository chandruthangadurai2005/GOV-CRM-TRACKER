import { useEffect, useState } from "react";
import { Truck, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import KpiCard from "@/components/dashboard/KpiCard";
import api from "@/lib/api";

type Vehicle = {
  id: number;
  machineId: string;
  type: string;
  district: string;
  status: "active" | "inactive";
  approvalStatus: "pending" | "approved" | "rejected";
};

const Dashboard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await api.get("/api/machines");

        // ✅ Ensure array
        if (Array.isArray(res.data)) {
          setVehicles(res.data);
        } else {
          setVehicles([]);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // ✅ Safe calculations
  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter(
    (v) => v.status === "active"
  ).length;

  const approvedVehicles = vehicles.filter(
    (v) => v.approvalStatus === "approved"
  ).length;

  const pendingVehicles = vehicles.filter(
    (v) => v.approvalStatus === "pending"
  ).length;

  // Temporary chart data
  const chartData = [
    { time: "08:00", active: activeVehicles },
    { time: "09:00", active: activeVehicles },
    { time: "10:00", active: activeVehicles },
    { time: "11:00", active: activeVehicles },
    { time: "12:00", active: activeVehicles },
  ];

  if (loading) {
    return <div className="p-6">Loading dashboard data...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Vehicles"
          value={totalVehicles}
          icon={Truck}
        />

        <KpiCard
          title="Active Vehicles"
          value={activeVehicles}
          icon={Activity}
          variant="success"
        />

        <KpiCard
          title="Approved Vehicles"
          value={approvedVehicles}
          icon={Truck}
          variant="success"
        />

        <KpiCard
          title="Pending Approval"
          value={pendingVehicles}
          icon={Activity}
          variant="warning"
        />
      </div>

      {/* Chart */}
      <div className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-base font-semibold mb-4">
          Vehicle Activity Overview
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="active"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              name="Active Vehicles"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Vehicles */}
      <div className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-base font-semibold mb-4">
          Recent Vehicles
        </h3>

        <div className="space-y-3">
          {vehicles.slice(0, 5).map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div
                className={`h-2 w-2 rounded-full mt-1.5 ${
                  vehicle.status === "active"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />

              <div className="min-w-0">
                <p className="text-sm font-medium">
                  {vehicle.machineId}
                </p>
                <p className="text-xs text-muted-foreground">
                  {vehicle.type} • {vehicle.district}
                </p>
                <p className="text-xs text-muted-foreground">
                  Approval: {vehicle.approvalStatus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
