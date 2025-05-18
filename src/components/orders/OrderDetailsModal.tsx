
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Order, OrderStatus } from "./OrderCard";
import { X, RotateCcw } from "lucide-react";
import { CustomerInfo } from "./CustomerInfo";
import { PaymentInfo } from "./PaymentInfo";
import { OrderItemsTable } from "./OrderItemsTable";
import { OrderStatusSelector } from "./OrderStatusSelector";
import { useState } from "react";
import { StatusChangeConfirmation } from "./StatusChangeConfirmation";
import { toast } from "@/hooks/use-toast";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  statusList: OrderStatus[];
  onStatusChange: (orderId: string, status: string) => void;
}

export function OrderDetailsModal({
  isOpen,
  onClose,
  order,
  statusList,
  onStatusChange,
}: OrderDetailsModalProps) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string | null>(null);
  
  if (!order) return null;

  const currentStatus = statusList.find((s) => s.id === order.status);
  
  // Função para lidar com a alteração de status via select
  const handleStatusChange = (selectedStatus: string) => {
    if (selectedStatus !== order.status) {
      // Verificar se a progressão de status é válida
      const currentStatusIndex = getStatusIndex(order.status);
      const selectedStatusIndex = getStatusIndex(selectedStatus);
      
      // Não permitir pular etapas (exceto para cancelar)
      if (selectedStatus !== "cancelado" && selectedStatusIndex - currentStatusIndex > 1) {
        toast({
          title: "Progressão de status inválida",
          description: "Não é possível pular etapas no fluxo de pedidos",
          variant: "destructive",
        });
        return;
      }
      
      setNewStatus(selectedStatus);
      setConfirmationOpen(true);
    }
  };
  
  // Função para obter o índice do status na sequência normal
  const getStatusIndex = (statusId: string): number => {
    const normalStatusFlow = statusList.filter(s => s.id !== "cancelado").map(s => s.id);
    return normalStatusFlow.indexOf(statusId);
  };
  
  // Função para confirmar a alteração de status
  const handleConfirmStatusChange = () => {
    if (newStatus) {
      onStatusChange(order.id, newStatus);
      toast({
        title: "Status alterado",
        description: `O status do pedido ${order.id} foi alterado com sucesso.`,
      });
      setConfirmationOpen(false);
    }
  };
  
  // Função para lidar com o cancelamento do pedido
  const handleCancelOrder = () => {
    setNewStatus("cancelado");
    setConfirmationOpen(true);
  };
  
  // Função para restaurar pedido cancelado
  const handleRestoreOrder = () => {
    setNewStatus("pendente");
    setConfirmationOpen(true);
  };

  // Verifica se o botão cancelar deve ser desabilitado (pedido concluído)
  const isCancelDisabled = order.status === "concluido";
  
  // Verifica se o pedido está cancelado para mostrar o botão de restaurar
  const isOrderCancelled = order.status === "cancelado";

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md md:max-w-2xl overflow-y-auto max-h-[90vh]" hideCloseButton>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                Pedido {order.id}
                <Badge
                  className={`${currentStatus?.color}`}
                  variant="outline"
                >
                  {currentStatus?.label}
                </Badge>
              </div>
              <span className="text-sm font-normal">{order.date}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <CustomerInfo 
              customer={order.customer}
              isRegistered={order.isRegistered}
              address={order.address}
            />
            <PaymentInfo 
              payment={order.payment}
              total={order.total}
            />
          </div>

          <div className="pb-4">
            <h4 className="font-medium mb-2">Itens do Pedido</h4>
            <OrderItemsTable 
              items={order.items}
              total={order.total}
            />
          </div>

          <OrderStatusSelector
            currentStatus={order.status}
            statusList={statusList}
            onStatusChange={handleStatusChange}
            disabled={order.status === "cancelado"}
          />

          <DialogFooter className="flex items-center justify-between sm:justify-end gap-2">
            {isOrderCancelled ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRestoreOrder}
                className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Restaurar Pedido
              </Button>
            ) : (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleCancelOrder}
                disabled={isCancelDisabled}
                className={`${isCancelDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <X className="h-4 w-4 mr-1" />
                Cancelar Pedido
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <StatusChangeConfirmation
        isOpen={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={handleConfirmStatusChange}
        orderId={order.id}
        fromStatus={currentStatus}
        toStatus={newStatus ? statusList.find(s => s.id === newStatus) : undefined}
      />
    </>
  );
}
