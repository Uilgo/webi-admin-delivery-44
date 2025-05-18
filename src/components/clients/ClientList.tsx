
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
import { Input } from "@/components/ui/input";
import { Search, Filter, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  orders: number;
  totalSpent: string;
  lastOrder: string;
  registrationStatus: "complete" | "partial" | "none";
}

const clients: Client[] = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@email.com",
    phone: "(11) 98765-4321",
    orders: 12,
    totalSpent: "R$ 698,40",
    lastOrder: "15/05/2025",
    registrationStatus: "complete",
  },
  {
    id: "2",
    name: "Carlos Ferreira",
    email: null,
    phone: "(11) 97654-3210",
    orders: 3,
    totalSpent: "R$ 142,70",
    lastOrder: "14/05/2025",
    registrationStatus: "none",
  },
  {
    id: "3",
    name: "Juliana Mendes",
    email: "juliana.m@email.com",
    phone: "(11) 96543-2109",
    orders: 8,
    totalSpent: "R$ 459,60",
    lastOrder: "12/05/2025",
    registrationStatus: "complete",
  },
  {
    id: "4",
    name: "Roberto Alves",
    email: null,
    phone: "(11) 95432-1098",
    orders: 1,
    totalSpent: "R$ 34,90",
    lastOrder: "10/05/2025",
    registrationStatus: "none",
  },
  {
    id: "5",
    name: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    phone: "(11) 94321-0987",
    orders: 6,
    totalSpent: "R$ 287,60",
    lastOrder: "09/05/2025",
    registrationStatus: "complete",
  },
  {
    id: "6",
    name: "Paulo Santos",
    email: "paulo@email.com",
    phone: "(11) 93210-9876",
    orders: 4,
    totalSpent: "R$ 196,80",
    lastOrder: "07/05/2025",
    registrationStatus: "partial",
  },
  {
    id: "7",
    name: "Fernanda Lima",
    email: null,
    phone: "(11) 92109-8765",
    orders: 2,
    totalSpent: "R$ 98,40",
    lastOrder: "05/05/2025",
    registrationStatus: "partial",
  },
];

const getStatusBadge = (status: Client["registrationStatus"]) => {
  const variants = {
    complete: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    partial: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    none: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  };

  const labels = {
    complete: "Cadastro Completo",
    partial: "Cadastro Parcial",
    none: "Sem Cadastro",
  };

  return (
    <Badge className={variants[status]} variant="outline">
      {labels[status]}
    </Badge>
  );
};

export function ClientList() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="text-xl">Clientes</CardTitle>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome, email ou telefone..." 
                className="pl-9 md:w-80"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="todos">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status de Cadastro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="complete">Cadastro Completo</SelectItem>
                  <SelectItem value="partial">Cadastro Parcial</SelectItem>
                  <SelectItem value="none">Sem Cadastro</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" title="Filtros avançados">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="Exportar dados">
                <Download className="h-4 w-4" />
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
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Telefone</TableHead>
                <TableHead>Pedidos</TableHead>
                <TableHead className="hidden md:table-cell">Total Gasto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {client.email || "-"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{client.phone}</TableCell>
                  <TableCell>{client.orders}</TableCell>
                  <TableCell className="hidden md:table-cell">{client.totalSpent}</TableCell>
                  <TableCell>{getStatusBadge(client.registrationStatus)}</TableCell>
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
