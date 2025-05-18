
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "./OrderCard";

interface StatusChangeConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderId: string;
  fromStatus?: OrderStatus;
  toStatus?: OrderStatus;
}

export function StatusChangeConfirmation({
  isOpen,
  onClose,
  onConfirm,
  orderId,
  fromStatus,
  toStatus,
}: StatusChangeConfirmationProps) {
  if (!fromStatus || !toStatus) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar alteração de status</DialogTitle>
          <DialogDescription>
            Deseja alterar o status do pedido {orderId} de{" "}
            <span className="font-medium">{fromStatus.label}</span> para{" "}
            <span className="font-medium">{toStatus.label}</span>?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
