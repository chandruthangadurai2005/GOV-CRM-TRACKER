import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import TopHeader from "./TopHeader";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/live-tracking": "Live Tracking",
  "/vehicles": "Vehicle Management",
  "/trip-history": "Trip History",
 
  "/settings": "Settings",
};

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300",
          collapsed ? "ml-[70px]" : "ml-[240px]"
        )}
      >
        <TopHeader onToggleSidebar={() => setCollapsed(!collapsed)} title={title} />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
