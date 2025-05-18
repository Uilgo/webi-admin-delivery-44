
import { Badge } from "@/components/ui/badge";
import { OrderCard, Order, OrderStatus } from "./OrderCard";

interface StatusColumnProps {
  status: OrderStatus;
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: string) => void;
  onViewDetails: (order: Order) => void;
}

export function StatusColumn({
  status,
  orders,
  onStatusChange,
  onViewDetails,
}: StatusColumnProps) {
  return (
    <div className="flex-shrink-0 w-80 bg-muted/30 rounded-md p-3 h-fit">
      <div className="flex items-center justify-between mb-3 sticky top-0 bg-muted/30 p-2 rounded">
        <h3 className="font-medium">{status.label}</h3>
        <Badge variant="outline" className={status.color}>
          {orders.length}
        </Badge>
      </div>
      <div className="space-y-3">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            statusList={[status]}
            onStatusChange={onStatusChange}
            onViewDetails={() => onViewDetails(order)}
          />
        ))}
        {orders.length === 0 && (
          <div className="text-center p-4 text-muted-foreground text-sm">
            Nenhum pedido neste status
          </div>
        )}
      </div>
    </div>
  );
}
