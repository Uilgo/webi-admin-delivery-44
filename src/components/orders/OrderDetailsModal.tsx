
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
import { useState } from "react";
import { StatusChangeConfirmation } from "./StatusChangeConfirmation";
import { InvalidStatusChangeModal } from "./InvalidStatusChangeModal";
import { OrderStatusStepper } from "./OrderStatusStepper";
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
  const [invalidStatusOpen, setInvalidStatusOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string | null>(null);
  const [nextValidStatus, setNextValidStatus] = useState<OrderStatus | undefined>(undefined);
  
  if (!order) return null;

  const currentStatus = statusList.find((s) => s.id === order.status);
  
  // Função para lidar com a solicitação de avançar para o próximo status
  const handleRequestNextStatus = () => {
    // Obter o status normal (excluindo cancelado)
    const normalStatusFlow = statusList.filter(s => s.id !== "cancelado");
    
    // Encontrar o índice do status atual
    const currentStatusIndex = normalStatusFlow.findIndex(s => s.id === order.status);
    
    // Verificar se há um próximo status disponível
    if (currentStatusIndex < normalStatusFlow.length - 1) {
      // Obter o próximo status na sequência
      const nextStatus = normalStatusFlow[currentStatusIndex + 1].id;
      
      // Definir o novo status e abrir o modal de confirmação
      setNewStatus(nextStatus);
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
        <DialogContent className="max-w-5xl overflow-hidden max-h-[90vh]" hideCloseButton>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Coluna da esquerda - Informações do pedido */}
            <div className="space-y-4">
              <CustomerInfo 
                customer={order.customer}
                isRegistered={order.isRegistered}
                address={order.address}
              />
              
              <PaymentInfo 
                payment={order.payment}
                total={order.total}
              />
              
              <div>
                <h4 className="font-medium mb-2">Itens do Pedido</h4>
                <OrderItemsTable 
                  items={order.items}
                  total={order.total}
                />
              </div>
            </div>
            
            {/* Coluna da direita - Stepper e ações */}
            <div className="flex flex-col justify-between">
              <div className="bg-muted/30 p-6 rounded-lg w-full">
                <h4 className="font-medium mb-4 text-center">Status do Pedido</h4>
                
                <OrderStatusStepper
                  statusList={statusList}
                  currentStatus={order.status}
                  onRequestNextStatus={handleRequestNextStatus}
                  disableProgress={order.status === "cancelado"}
                />
              </div>
              
              <div className="mt-auto pt-4 flex flex-row gap-2 justify-end">
                {isOrderCancelled ? (
                  <Button 
                    variant="outline" 
                    size="lg-fixed" 
                    onClick={handleRestoreOrder}
                    className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Restaurar Pedido
                  </Button>
                ) : (
                  <Button 
                    variant="destructive" 
                    size="lg-fixed" 
                    onClick={handleCancelOrder}
                    disabled={isCancelDisabled}
                    className={`${isCancelDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancelar Pedido
                  </Button>
                )}
                <Button variant="outline" size="lg-fixed" onClick={onClose}>
                  Fechar
                </Button>
              </div>
            </div>
          </div>
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
      
      <InvalidStatusChangeModal
        isOpen={invalidStatusOpen}
        onClose={() => setInvalidStatusOpen(false)}
        currentStatus={currentStatus}
        nextValidStatus={nextValidStatus}
      />
    </>
  );
}
