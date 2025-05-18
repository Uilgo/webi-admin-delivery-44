
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType: "categoria" | "produto" | "adicional";
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType,
}: DeleteConfirmationModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir {itemType}</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que deseja excluir {itemType === "categoria" ? "a" : "o"} {itemType}{" "}
            <strong>{itemName}</strong>? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" size="lg-fixed">Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" size="lg-fixed" onClick={onConfirm}>
              Excluir
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
