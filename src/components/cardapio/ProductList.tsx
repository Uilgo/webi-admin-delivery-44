
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  active: boolean;
  featured: boolean;
  available: boolean;
}

const products: Product[] = [
  {
    id: "1",
    name: "Pizza Margherita",
    category: "Pizzas Tradicionais",
    price: "R$ 45,90",
    active: true,
    featured: true,
    available: true,
  },
  {
    id: "2",
    name: "Pizza Calabresa",
    category: "Pizzas Tradicionais",
    price: "R$ 42,90",
    active: true,
    featured: false,
    available: true,
  },
  {
    id: "3",
    name: "Pizza 4 Queijos",
    category: "Pizzas Tradicionais",
    price: "R$ 49,90",
    active: true,
    featured: true,
    available: false,
  },
  {
    id: "4",
    name: "Pizza Portuguesa",
    category: "Pizzas Tradicionais",
    price: "R$ 45,90",
    active: true,
    featured: false,
    available: true,
  },
  {
    id: "5",
    name: "Coca-Cola 2L",
    category: "Bebidas",
    price: "R$ 12,90",
    active: true,
    featured: false,
    available: true,
  },
];

export function ProductList() {
  return (
    <Card>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="hidden md:table-cell">Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  {product.name}
                  {product.featured && (
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900 dark:text-amber-300">
                      Destaque
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <Switch checked={product.active} />
                    <span className="text-xs text-muted-foreground">
                      {!product.available && "(Indisponível)"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
