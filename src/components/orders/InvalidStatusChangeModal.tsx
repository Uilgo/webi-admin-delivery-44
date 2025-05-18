
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
import { AlertCircle } from "lucide-react";

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
        <DialogHeader className="flex flex-col items-center gap-2">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-red-600">Progressão de Status Inválida</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Você não pode pular etapas no fluxo de pedidos.
            <div className="mt-3 p-3 border rounded-md bg-gray-50">
              <p>Status atual: <span className="font-medium">{currentStatus.label}</span></p>
              <p>Próximo status válido: <span className="font-medium">{nextValidStatus.label}</span></p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <Button onClick={onClose} className="w-full">
            Entendi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
