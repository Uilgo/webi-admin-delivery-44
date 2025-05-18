
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, MapPin, CreditCard, Package } from "lucide-react";

export interface OrderStatus {
  id: string;
  label: string;
  color: string;
}

export interface Order {
  id: string;
  customer: string;
  status: string;
  address: string;
  payment: string;
  total: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: string;
  }[];
  isRegistered: boolean;
}

interface OrderCardProps {
  order: Order;
  statusList: OrderStatus[];
  onStatusChange: (orderId: string, status: string) => void;
  onViewDetails: (order: Order) => void;
}

export function OrderCard({ order, statusList, onStatusChange, onViewDetails }: OrderCardProps) {
  const currentStatus = statusList.find(s => s.id === order.status);
  
  return (
    <Card className="w-full mb-3 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            <span className="font-medium">{order.id}</span>
          </div>
          <Badge 
            className={`${currentStatus?.color}`} 
            variant="outline"
          >
            {currentStatus?.label}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-1">
              <span>{order.customer}</span>
              {order.isRegistered && (
                <span className="h-2 w-2 rounded-full bg-green-500" title="Cliente cadastrado"></span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground truncate">{order.address}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{order.payment}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{order.date}</span>
          </div>
        </div>
        
        <div className="border-t pt-3 mt-3">
          <p className="font-medium mb-1">Itens: {order.items.length}</p>
          <ul className="text-sm text-muted-foreground mb-3">
            {order.items.slice(0, 2).map((item, idx) => (
              <li key={idx} className="truncate">
                {item.quantity}x {item.name}
              </li>
            ))}
            {order.items.length > 2 && (
              <li className="italic">+{order.items.length - 2} item(s)...</li>
            )}
          </ul>
          
          <div className="flex justify-between items-center">
            <span className="font-bold">{order.total}</span>
            <Button size="sm" onClick={() => onViewDetails(order)}>Ver Detalhes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
