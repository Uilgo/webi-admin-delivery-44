
interface PaymentInfoProps {
  payment: string;
  total: string;
}

export function PaymentInfo({ payment, total }: PaymentInfoProps) {
  return (
    <div>
      <h4 className="font-medium mb-2">Pagamento</h4>
      <div className="bg-muted/50 p-3 rounded-md">
        <p className="text-sm">{payment}</p>
        <p className="text-xl font-bold mt-1">{total}</p>
      </div>
    </div>
  );
}
