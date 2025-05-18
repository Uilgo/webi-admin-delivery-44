
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  customer: string;
  status: "recebido" | "em preparo" | "pronto" | "finalizado" | "cancelado";
  total: string;
  items: number;
  time: string;
  isRegistered: boolean;
}

const orders: Order[] = [
  {
    id: "#42512",
    customer: "Ana Silva",
    status: "em preparo",
    total: "R$ 57,90",
    items: 3,
    time: "15 min atrás",
    isRegistered: true,
  },
  {
    id: "#42511",
    customer: "Carlos Ferreira",
    status: "recebido",
    total: "R$ 42,50",
    items: 2,
    time: "23 min atrás",
    isRegistered: false,
  },
  {
    id: "#42510",
    customer: "Juliana Mendes",
    status: "finalizado",
    total: "R$ 86,00",
    items: 5,
    time: "45 min atrás",
    isRegistered: true,
  },
  {
    id: "#42509",
    customer: "Roberto Alves",
    status: "pronto",
    total: "R$ 34,90",
    items: 1,
    time: "1h atrás",
    isRegistered: false,
  },
  {
    id: "#42508",
    customer: "Maria Oliveira",
    status: "cancelado",
    total: "R$ 65,80",
    items: 4,
    time: "1h atrás",
    isRegistered: true,
  },
];

const getStatusBadge = (status: Order["status"]) => {
  const variants = {
    recebido: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "em preparo": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    pronto: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    finalizado: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    cancelado: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  const labels = {
    recebido: "Recebido",
    "em preparo": "Em Preparo",
    pronto: "Pronto",
    finalizado: "Finalizado",
    cancelado: "Cancelado",
  };

  return (
    <Badge className={variants[status]} variant="outline">
      {labels[status]}
    </Badge>
  );
};

export function RecentOrders() {
  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Pedidos Recentes</CardTitle>
          <CardDescription>Você tem 5 pedidos hoje.</CardDescription>
        </div>
        <Button variant="outline" size="sm">Ver Todos</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Total</TableHead>
              <TableHead className="hidden md:table-cell">Itens</TableHead>
              <TableHead className="text-right">Tempo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell className="flex items-center gap-2">
                  {order.customer}
                  {order.isRegistered && (
                    <span className="h-2 w-2 rounded-full bg-green-500" title="Cliente cadastrado"></span>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="hidden md:table-cell">{order.total}</TableCell>
                <TableCell className="hidden md:table-cell">{order.items}</TableCell>
                <TableCell className="text-right">{order.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
