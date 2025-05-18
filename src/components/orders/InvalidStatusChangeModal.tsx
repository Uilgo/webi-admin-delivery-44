
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

interface InvalidStatusChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus?: OrderStatus;
  nextValidStatus?: OrderStatus;
}

export function InvalidStatusChangeModal({
  isOpen,
  onClose,
  currentStatus,
  nextValidStatus,
}: InvalidStatusChangeModalProps) {
  if (!currentStatus || !nextValidStatus) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">Progressão de Status Inválida</DialogTitle>
          <DialogDescription className="pt-2">
            Você não pode pular etapas no fluxo de pedidos.
            <div className="mt-2">
              <p>Status atual: <span className="font-medium">{currentStatus.label}</span></p>
              <p>Próximo status válido: <span className="font-medium">{nextValidStatus.label}</span></p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <Button onClick={onClose}>
            Entendi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
