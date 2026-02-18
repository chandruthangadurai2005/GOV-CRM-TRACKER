import {
  LayoutDashboard,
  MapPin,
  Truck,
  Route,
 

  Settings,
  Navigation,
  LogOut,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Live Tracking", icon: MapPin, path: "/live-tracking" },
  { title: "Vehicles", icon: Truck, path: "/vehicles" },  
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

const AppSidebar = ({ collapsed }: AppSidebarProps) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 border-r border-sidebar-border",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border flex-shrink-0">
        <div className="p-1.5 rounded-lg bg-sidebar-primary/20 flex-shrink-0">
          <Navigation className="h-5 w-5 text-sidebar-primary" />
        </div>
        {!collapsed && (
          <span className="text-base font-bold text-sidebar-accent-foreground tracking-tight whitespace-nowrap">
             GOV CRM VEHICLES TRACKING
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors w-full" onClick={handleLogout}>
          <LogOut className="h-[18px] w-[18px] flex-shrink-0" />
          {!collapsed && <span className="whitespace-nowrap">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
