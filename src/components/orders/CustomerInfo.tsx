
interface CustomerInfoProps {
  customer: string;
  isRegistered: boolean;
  address: string;
}

export function CustomerInfo({ customer, isRegistered, address }: CustomerInfoProps) {
  return (
    <div>
      <h4 className="font-medium mb-2">Cliente</h4>
      <div className="bg-muted/50 p-3 rounded-md">
        <div className="flex items-center gap-1 mb-1">
          <span className="font-medium">{customer}</span>
          {isRegistered && (
            <span
              className="h-2 w-2 rounded-full bg-green-500"
              title="Cliente cadastrado"
            ></span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{address}</p>
      </div>
    </div>
  );
}
