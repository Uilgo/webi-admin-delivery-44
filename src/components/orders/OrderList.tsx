
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Updated Order interface to match the one in OrderCard.tsx
interface Order {
  id: string;
  customer: string;
  status: string;
  total: string;
  date: string;
  payment: string;
  address: string; // Added to match OrderCard.tsx
  items: {
    name: string;
    quantity: number;
    price: string;
  }[]; // Updated to match the actual data structure
  isRegistered: boolean;
}

interface OrderListProps {
  statusFilter?: string;
  orders: Order[];
  onViewDetails: (orderId: string) => void;
  searchTerm?: string;
}

const getStatusBadge = (status: string) => {
  const variants = {
    pendente: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    aceito: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    em_preparo: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    saiu_entrega: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    concluido: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    cancelado: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  const labels = {
    pendente: "Pendente",
    aceito: "Aceito",
    em_preparo: "Em Preparo",
    saiu_entrega: "Saiu para Entrega",
    concluido: "Concluído",
    cancelado: "Cancelado",
  };

  return (
    <Badge className={variants[status] || "bg-gray-100"} variant="outline">
      {labels[status] || status}
    </Badge>
  );
};

export function OrderList({ statusFilter, orders, onViewDetails, searchTerm = "" }: OrderListProps) {
  // Filtragem de ordens baseada nos filtros
  const filteredOrders = orders.filter(order => {
    // Filtrar por termo de busca
    if (searchTerm) {
      const termLower = searchTerm.toLowerCase();
      if (!order.id.toLowerCase().includes(termLower) && 
          !order.customer.toLowerCase().includes(termLower)) {
        return false;
      }
    }
    
    // Filtrar por status
    if (statusFilter && order.status !== statusFilter) {
      return false;
    }
    
    return true;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Pedidos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="hidden md:table-cell">Horário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Pagamento</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      {order.customer}
                      {order.isRegistered && (
                        <span className="h-2 w-2 rounded-full bg-green-500" title="Cliente cadastrado"></span>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="hidden md:table-cell">{order.payment}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onViewDetails(order.id)}
                      >
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Nenhum pedido encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
