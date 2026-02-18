import { Construction } from "lucide-react";

interface PlaceholderProps {
  title: string;
}

const Placeholder = ({ title }: PlaceholderProps) => (
  <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in">
    <div className="p-4 rounded-2xl bg-primary/10 mb-4">
      <Construction className="h-10 w-10 text-primary" />
    </div>
    <h2 className="text-xl font-semibold text-foreground">{title}</h2>
    <p className="text-sm text-muted-foreground mt-1">This section is coming soon.</p>
  </div>
);

export default Placeholder;
