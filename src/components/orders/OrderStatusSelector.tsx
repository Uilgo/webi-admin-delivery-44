
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { OrderStatus } from "./OrderCard";

interface OrderStatusSelectorProps {
  currentStatus: string;
  statusList: OrderStatus[];
  onStatusChange: (status: string) => void;
  disabled?: boolean;
}

export function OrderStatusSelector({ 
  currentStatus, 
  statusList, 
  onStatusChange,
  disabled = false
}: OrderStatusSelectorProps) {
  // Filtrar os status para o fluxo normal (sem cancelado)
  const normalStatusList = statusList.filter(status => status.id !== "cancelado");
  
  // Get the index of the current status in the normal status list
  const currentStatusIndex = normalStatusList.findIndex(s => s.id === currentStatus);
  
  return (
    <div className="mt-2 pb-4">
      <h4 className="font-medium mb-2">Alterar Status</h4>
      <Select 
        value={currentStatus} 
        onValueChange={onStatusChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione um status" />
        </SelectTrigger>
        <SelectContent>
          {normalStatusList.map((status, index) => {
            // Status is unavailable if it's before the current status
            const isUnavailable = index < currentStatusIndex;
            
            return (
              <SelectItem 
                key={status.id} 
                value={status.id}
                disabled={isUnavailable}
                className={currentStatus === status.id ? status.color : ""}
              >
                {status.label}
                {isUnavailable && " (bloqueado)"}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
