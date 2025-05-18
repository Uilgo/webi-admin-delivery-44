
import { useState } from "react";
import { OrderCard, Order, OrderStatus } from "./OrderCard";
import { OrderDetailsManager } from "./OrderDetailsManager";
import { StatusColumn } from "./StatusColumn";

interface KanbanBoardProps {
  orders: Order[];
  statusList: OrderStatus[];
}

export function KanbanBoard({ orders, statusList }: KanbanBoardProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleOpenDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      // Aplicar alteração de status diretamente
      order.status = newStatus;
      
      // Se for cancelamento, fechar o modal
      if (newStatus === "cancelado") {
        setIsDetailsModalOpen(false);
      }
    }
  };

  return (
    <div className="overflow-auto pb-4">
      <div className="flex space-x-4 min-h-[70vh]">
        {statusList.map((status) => {
          const filteredOrders = orders.filter((o) => o.status === status.id);
          return (
            <StatusColumn
              key={status.id}
              status={status}
              orders={filteredOrders}
              onStatusChange={handleStatusChange}
              onViewDetails={handleOpenDetails}
            />
          );
        })}
      </div>

      <OrderDetailsManager
        selectedOrder={selectedOrder}
        statusList={statusList}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
