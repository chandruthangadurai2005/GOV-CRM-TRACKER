import { Bell, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopHeaderProps {
  onToggleSidebar: () => void;
  title: string;
}

const TopHeader = ({ onToggleSidebar, title }: TopHeaderProps) => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 flex-shrink-0 shadow-card">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="text-muted-foreground hover:text-foreground"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground hidden sm:block">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        
        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground leading-none">Admin</p>
           
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
