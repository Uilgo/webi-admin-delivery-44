
import { OrderStatus } from "./OrderCard";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderStatusStepperProps {
  statusList: OrderStatus[];
  currentStatus: string;
  onRequestNextStatus: () => void;
  disableProgress?: boolean;
}

export function OrderStatusStepper({
  statusList,
  currentStatus,
  onRequestNextStatus,
  disableProgress = false
}: OrderStatusStepperProps) {
  // Filtra apenas os status regulares (exclui cancelado)
  const normalStatusFlow = statusList.filter(status => status.id !== "cancelado");
  
  // Encontra o índice do status atual
  const currentIndex = normalStatusFlow.findIndex(status => status.id === currentStatus);
  
  // Status final/concluído
  const isCompleted = currentStatus === "concluido";
  const isCancelled = currentStatus === "cancelado";

  return (
    <div className="mt-4 mb-6">
      <h4 className="font-medium mb-4">Status do Pedido</h4>
      
      {/* Stepper Horizontal */}
      <div className="relative mb-8">
        {/* Linha conectora */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
        
        {/* Etapas do Stepper */}
        <div className="relative flex justify-between">
          {normalStatusFlow.map((status, index) => {
            // Determinar o estado visual deste step
            const isActive = index === currentIndex;
            const isCompleted = index < currentIndex;
            
            // Classes para estilização condicional
            const stepCircleClasses = `
              z-10 flex items-center justify-center w-8 h-8 rounded-full 
              ${isActive 
                ? 'bg-blue-500 text-white border-2 border-blue-500' 
                : isCompleted 
                  ? 'bg-green-100 border-2 border-green-500 text-green-800' 
                  : 'bg-gray-100 border-2 border-gray-300 text-gray-500'
              }
            `;
            
            const labelClasses = `
              absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap
              ${isActive 
                ? 'text-blue-700'
                : isCompleted
                  ? 'text-green-700'
                  : 'text-gray-500'
              }
            `;
            
            return (
              <div key={status.id} className="relative flex flex-col items-center">
                <div className={stepCircleClasses}>
                  {isCompleted ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className={labelClasses}>{status.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Botão para avançar para o próximo status */}
      {!isCancelled && !isCompleted && (
        <Button 
          onClick={onRequestNextStatus} 
          className="w-full mt-2"
          variant="default"
          disabled={disableProgress}
        >
          Avançar para {currentIndex < normalStatusFlow.length - 1 
            ? normalStatusFlow[currentIndex + 1].label 
            : "Concluído"}
        </Button>
      )}
    </div>
  );
}
