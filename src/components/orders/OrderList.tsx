
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
  status: string;
  total: string;
  date: string;
  payment: string;
  items: number;
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
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [selectedStatus, setSelectedStatus] = useState(statusFilter || "todos");

  // Filtragem de ordens baseada nos filtros
  const filteredOrders = useMemo(() => {
    let result = [...orders];
    
    // Filtrar por termo de busca (pode vir do prop ou do estado local)
    const term = searchTerm || localSearchTerm;
    if (term) {
      const termLower = term.toLowerCase();
      result = result.filter(
        order => order.id.toLowerCase().includes(termLower) || 
                order.customer.toLowerCase().includes(termLower)
      );
    }
    
    // Filtrar por status
    if (statusFilter) {
      // Se recebemos um statusFilter via props, esse tem prioridade
      result = result.filter(order => order.status === statusFilter);
    } else if (selectedStatus !== "todos") {
      // Caso contrário, usamos o selectedStatus do estado local
      result = result.filter(order => order.status === selectedStatus);
    }
    
    return result;
  }, [localSearchTerm, selectedStatus, statusFilter, orders, searchTerm]);

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
                value={searchTerm || localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {!statusFilter && (
                <Select 
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="aceito">Aceito</SelectItem>
                    <SelectItem value="em_preparo">Em Preparo</SelectItem>
                    <SelectItem value="saiu_entrega">Saiu para Entrega</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
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
