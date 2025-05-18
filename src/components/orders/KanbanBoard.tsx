
import { useState } from "react";
import { OrderCard, Order, OrderStatus } from "./OrderCard";
import { OrderDetailsModal } from "./OrderDetailsModal";
import { StatusChangeConfirmation } from "./StatusChangeConfirmation";

interface KanbanBoardProps {
  orders: Order[];
  statusList: OrderStatus[];
}

export function KanbanBoard({ orders, statusList }: KanbanBoardProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isStatusChangeModalOpen, setIsStatusChangeModalOpen] = useState(false);
  const [statusChange, setStatusChange] = useState<{
    orderId: string;
    fromStatus: string;
    toStatus: string;
  } | null>(null);

  const handleOpenDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      setStatusChange({
        orderId,
        fromStatus: order.status,
        toStatus: newStatus,
      });
      setIsStatusChangeModalOpen(true);
    }
  };

  const confirmStatusChange = () => {
    // Aqui você implementaria a lógica real de alteração de status
    console.log("Status alterado:", statusChange);
    
    // Atualizar o estado localmente
    if (statusChange && selectedOrder) {
      // Na implementação real, isso seria feito via API
      selectedOrder.status = statusChange.toStatus;
    }
    
    setIsStatusChangeModalOpen(false);
  };

  const fromStatus = statusChange 
    ? statusList.find((s) => s.id === statusChange.fromStatus)
    : undefined;
  
  const toStatus = statusChange
    ? statusList.find((s) => s.id === statusChange.toStatus)
    : undefined;

  return (
    <div className="overflow-auto pb-4">
      <div className="flex space-x-4 min-h-[70vh]">
        {statusList.map((status) => {
          const filteredOrders = orders.filter((o) => o.status === status.id);
          return (
            <div
              key={status.id}
              className="flex-shrink-0 w-80 bg-muted/30 rounded-md p-3 h-fit"
            >
              <div className="flex items-center justify-between mb-3 sticky top-0 bg-muted/30 p-2 rounded">
                <h3 className="font-medium">{status.label}</h3>
                <Badge variant="outline" className={status.color}>
                  {filteredOrders.length}
                </Badge>
              </div>
              <div className="space-y-3">
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    statusList={statusList}
                    onStatusChange={handleStatusChange}
                    onViewDetails={handleOpenDetails}
                  />
                ))}
                {filteredOrders.length === 0 && (
                  <div className="text-center p-4 text-muted-foreground text-sm">
                    Nenhum pedido neste status
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <OrderDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        order={selectedOrder}
        statusList={statusList}
        onStatusChange={handleStatusChange}
      />

      <StatusChangeConfirmation
        isOpen={isStatusChangeModalOpen}
        onClose={() => setIsStatusChangeModalOpen(false)}
        onConfirm={confirmStatusChange}
        orderId={statusChange?.orderId || ""}
        fromStatus={fromStatus}
        toStatus={toStatus}
      />
    </div>
  );
}

// Importe o Badge que foi usado no código
import { Badge } from "@/components/ui/badge";
