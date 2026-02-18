import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "success" | "warning" | "destructive";
}

const variantStyles = {
  default: "kpi-icon-bg text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
};

const KpiCard = ({ title, value, icon: Icon, trend, variant = "default" }: KpiCardProps) => {
  return (
    <div className="bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200 border border-border">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold text-card-foreground">{value}</p>
          {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
        </div>
        <div className={cn("p-2.5 rounded-lg", variantStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
