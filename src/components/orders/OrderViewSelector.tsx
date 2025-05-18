
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

interface OrderViewSelectorProps {
  view: "card" | "list";
  onViewChange: (view: "card" | "list") => void;
}

export function OrderViewSelector({ view, onViewChange }: OrderViewSelectorProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={view === "card" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewChange("card")}
        title="Visualização em cards"
      >
        <LayoutGrid className="h-4 w-4 mr-2" />
        Cards
      </Button>
      <Button
        variant={view === "list" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewChange("list")}
        title="Visualização em lista"
      >
        <List className="h-4 w-4 mr-2" />
        Lista
      </Button>
    </div>
  );
}
