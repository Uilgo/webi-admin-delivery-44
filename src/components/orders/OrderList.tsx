
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { useMemo, useState } from "react";

interface Order {
  id: string;
  customer: string;
  status: "recebido" | "em preparo" | "pronto" | "finalizado" | "cancelado";
  total: string;
  date: string;
  payment: string;
  items: number;
  isRegistered: boolean;
}

interface OrderListProps {
  statusFilter?: string;
}

const orders: Order[] = [
  {
    id: "#42512",
    customer: "Ana Silva",
    status: "em preparo",
    total: "R$ 57,90",
    date: "15/05/2025 19:45",
    payment: "Cartão de Crédito",
    items: 3,
    isRegistered: true,
  },
  {
    id: "#42511",
    customer: "Carlos Ferreira",
    status: "recebido",
    total: "R$ 42,50",
    date: "15/05/2025 19:30",
    payment: "Pix",
    items: 2,
    isRegistered: false,
  },
  {
    id: "#42510",
    customer: "Juliana Mendes",
    status: "finalizado",
    total: "R$ 86,00",
    date: "15/05/2025 19:15",
    payment: "Dinheiro",
    items: 5,
    isRegistered: true,
  },
  {
    id: "#42509",
    customer: "Roberto Alves",
    status: "pronto",
    total: "R$ 34,90",
    date: "15/05/2025 19:00",
    payment: "Cartão de Débito",
    items: 1,
    isRegistered: false,
  },
  {
    id: "#42508",
    customer: "Maria Oliveira",
    status: "cancelado",
    total: "R$ 65,80",
    date: "15/05/2025 18:45",
    payment: "Pix",
    items: 4,
    isRegistered: true,
  },
  {
    id: "#42507",
    customer: "Paulo Santos",
    status: "finalizado",
    total: "R$ 53,40",
    date: "15/05/2025 18:30",
    payment: "Cartão de Crédito",
    items: 3,
    isRegistered: true,
  },
  {
    id: "#42506",
    customer: "Fernanda Lima",
    status: "finalizado",
    total: "R$ 78,20",
    date: "15/05/2025 18:15",
    payment: "Cartão de Crédito",
    items: 4,
    isRegistered: false,
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

export function OrderList({ statusFilter }: OrderListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(statusFilter || "todos");

  // Filtragem de ordens baseada nos filtros
  const filteredOrders = useMemo(() => {
    let result = [...orders];
    
    // Filtrar por termo de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        order => order.id.toLowerCase().includes(term) || 
                order.customer.toLowerCase().includes(term)
      );
    }
    
    // Filtrar por status
    const status = statusFilter || selectedStatus;
    if (status !== "todos") {
      result = result.filter(order => order.status === status);
    }
    
    return result;
  }, [searchTerm, selectedStatus, statusFilter]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="text-xl">Pedidos</CardTitle>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar pedido ou cliente..." 
                className="pl-9 md:w-80"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {!statusFilter && (
                <Select 
                  defaultValue={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="recebido">Recebido</SelectItem>
                    <SelectItem value="em preparo">Em Preparo</SelectItem>
                    <SelectItem value="pronto">Pronto</SelectItem>
                    <SelectItem value="finalizado">Finalizado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              )}
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
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
              {filteredOrders.map((order) => (
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
                    <Button variant="ghost" size="sm">Detalhes</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
