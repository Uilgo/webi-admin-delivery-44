
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { OrderViewSelector } from "@/components/orders/OrderViewSelector";

interface OrderFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  view: "card" | "list";
  onViewChange: (view: "card" | "list") => void;
}

export function OrderFilters({
  searchTerm,
  setSearchTerm,
  view,
  onViewChange,
}: OrderFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex items-center relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Buscar pedido, cliente ou endereço..." 
          className="pl-9 w-full md:w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <OrderViewSelector view={view} onViewChange={onViewChange} />
    </div>
  );
}
