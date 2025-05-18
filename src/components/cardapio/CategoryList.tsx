
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

interface Category {
  id: string;
  name: string;
  description: string;
  active: boolean;
  order: number;
  products: number;
}

const categories: Category[] = [
  {
    id: "1",
    name: "Pizzas Tradicionais",
    description: "Nossas pizzas mais vendidas",
    active: true,
    order: 1,
    products: 12,
  },
  {
    id: "2",
    name: "Pizzas Premium",
    description: "Pizzas gourmet com ingredientes selecionados",
    active: true,
    order: 2,
    products: 8,
  },
  {
    id: "3",
    name: "Bebidas",
    description: "Refrigerantes, sucos e outras bebidas",
    active: true,
    order: 3,
    products: 10,
  },
  {
    id: "4",
    name: "Sobremesas",
    description: "Doces para depois da refeição",
    active: false,
    order: 4,
    products: 5,
  },
  {
    id: "5",
    name: "Combos",
    description: "Combinações especiais com desconto",
    active: true,
    order: 5,
    products: 4,
  },
];

export function CategoryList() {
  return (
    <Card>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ordem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="hidden md:table-cell">Descrição</TableHead>
              <TableHead className="hidden md:table-cell">Produtos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.order}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell className="hidden md:table-cell">{category.description}</TableCell>
                <TableCell className="hidden md:table-cell">{category.products}</TableCell>
                <TableCell>
                  <Switch checked={category.active} />
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
