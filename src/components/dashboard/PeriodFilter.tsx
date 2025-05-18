
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PeriodFilterProps {
  onFilterChange: (period: string) => void;
}

export function PeriodFilter({ onFilterChange }: PeriodFilterProps) {
  const [activePeriod, setActivePeriod] = useState("semanal");

  const handlePeriodChange = (period: string) => {
    setActivePeriod(period);
    onFilterChange(period);
  };

  return (
    <div className="flex gap-2 mb-4">
      <Button 
        variant={activePeriod === "semanal" ? "default" : "outline"}
        size="sm"
        onClick={() => handlePeriodChange("semanal")}
      >
        Semanal
      </Button>
      <Button 
        variant={activePeriod === "mensal" ? "default" : "outline"}
        size="sm"
        onClick={() => handlePeriodChange("mensal")}
      >
        Mensal
      </Button>
      <Button 
        variant={activePeriod === "anual" ? "default" : "outline"}
        size="sm"
        onClick={() => handlePeriodChange("anual")}
      >
        Anual
      </Button>
    </div>
  );
}
