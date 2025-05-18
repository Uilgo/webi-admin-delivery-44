
import { useState } from "react";
import { Order, OrderStatus } from "./OrderCard";
import { OrderDetailsModal } from "./OrderDetailsModal";

interface OrderDetailsManagerProps {
  selectedOrder: Order | null;
  statusList: OrderStatus[];
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (orderId: string, newStatus: string) => void;
}

export function OrderDetailsManager({
  selectedOrder,
  statusList,
  isOpen,
  onClose,
  onStatusChange,
}: OrderDetailsManagerProps) {
  if (!selectedOrder) return null;

  return (
    <OrderDetailsModal
      isOpen={isOpen}
      onClose={onClose}
      order={selectedOrder}
      statusList={statusList}
      onStatusChange={onStatusChange}
    />
  );
}
