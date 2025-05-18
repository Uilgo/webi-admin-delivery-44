
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
  if (!order) return null;

  const currentStatus = statusList.find((s) => s.id === order.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md md:max-w-2xl overflow-y-auto max-h-[90vh]">
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
          <div>
            <h4 className="font-medium mb-2">Cliente</h4>
            <div className="bg-muted/50 p-3 rounded-md">
              <div className="flex items-center gap-1 mb-1">
                <span className="font-medium">{order.customer}</span>
                {order.isRegistered && (
                  <span
                    className="h-2 w-2 rounded-full bg-green-500"
                    title="Cliente cadastrado"
                  ></span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{order.address}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Pagamento</h4>
            <div className="bg-muted/50 p-3 rounded-md">
              <p className="text-sm">{order.payment}</p>
              <p className="text-xl font-bold mt-1">{order.total}</p>
            </div>
          </div>
        </div>

        <div className="pb-4">
          <h4 className="font-medium mb-2">Itens do Pedido</h4>
          <div className="bg-muted/50 p-3 rounded-md">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Produto</th>
                  <th className="text-center py-2">Qtd</th>
                  <th className="text-right py-2">Valor</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx} className="border-b border-muted">
                    <td className="py-2">{item.name}</td>
                    <td className="text-center py-2">{item.quantity}</td>
                    <td className="text-right py-2">{item.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} className="text-right font-medium py-2">
                    Total:
                  </td>
                  <td className="text-right font-bold py-2">{order.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="mt-2 pb-4">
          <h4 className="font-medium mb-2">Alterar Status</h4>
          <div className="flex flex-wrap gap-2">
            {statusList.map((status) => (
              <Button
                key={status.id}
                variant={order.status === status.id ? "default" : "outline"}
                size="sm"
                className={
                  order.status === status.id ? status.color : undefined
                }
                onClick={() => onStatusChange(order.id, status.id)}
                disabled={order.status === status.id}
              >
                {status.label}
              </Button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
