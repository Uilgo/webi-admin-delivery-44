
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
import { MenuFilters } from "./MenuFilters";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { ProductFormModal } from "./ProductFormModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  active: boolean;
  featured: boolean;
  available: boolean;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
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
    description: "Molho de tomate, mussarela, manjericão fresco e azeite",
    imageUrl: "/placeholder.svg",
    createdAt: new Date(2025, 0, 15),
    updatedAt: new Date(2025, 3, 5),
  },
  {
    id: "2",
    name: "Pizza Calabresa",
    category: "Pizzas Tradicionais",
    price: "R$ 42,90",
    active: true,
    featured: false,
    available: true,
    description: "Molho de tomate, mussarela e calabresa fatiada",
    imageUrl: "/placeholder.svg",
    createdAt: new Date(2025, 0, 20),
    updatedAt: new Date(2025, 2, 12),
  },
  {
    id: "3",
    name: "Pizza 4 Queijos",
    category: "Pizzas Tradicionais",
    price: "R$ 49,90",
    active: true,
    featured: true,
    available: false,
    imageUrl: "/placeholder.svg",
    createdAt: new Date(2025, 0, 22),
    updatedAt: new Date(2025, 1, 15),
  },
  {
    id: "4",
    name: "Pizza Portuguesa",
    category: "Pizzas Tradicionais",
    price: "R$ 45,90",
    active: true,
    featured: false,
    available: true,
    imageUrl: "/placeholder.svg",
    createdAt: new Date(2025, 1, 5),
    updatedAt: new Date(2025, 1, 5),
  },
  {
    id: "5",
    name: "Coca-Cola 2L",
    category: "Bebidas",
    price: "R$ 12,90",
    active: true,
    featured: false,
    available: true,
    imageUrl: "/placeholder.svg",
    createdAt: new Date(2025, 1, 10),
    updatedAt: new Date(2025, 3, 20),
  },
];

export function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("nome_asc");
  const [filter, setFilter] = useState("todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Aplicar filtro de busca
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(searchLower) || 
          (product.description || "").toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.price.toLowerCase().includes(searchLower)
      );
    }
    
    // Aplicar filtro de status
    if (filter === "ativos") {
      result = result.filter(product => product.active);
    } else if (filter === "inativos") {
      result = result.filter(product => !product.active);
    } else if (filter === "destaque") {
      result = result.filter(product => product.featured);
    }
    
    // Aplicar ordenação
    result.sort((a, b) => {
      switch (sortBy) {
        case "nome_asc":
          return a.name.localeCompare(b.name);
        case "nome_desc":
          return b.name.localeCompare(a.name);
        case "categoria":
          return a.category.localeCompare(b.category);
        case "preco_asc":
          return a.price.localeCompare(b.price);
        case "preco_desc":
          return b.price.localeCompare(a.price);
        case "data_criacao":
          return a.createdAt.getTime() - b.createdAt.getTime();
        case "data_atualizacao":
          return b.updatedAt.getTime() - a.updatedAt.getTime();
        default:
          return 0;
      }
    });
    
    return result;
  }, [searchTerm, sortBy, filter]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (product: Product) => {
    // Aqui seria implementada a lógica para salvar o produto
    console.log("Salvando produto:", product);
    setIsModalOpen(false);
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <MenuFilters 
            type="produtos"
            onSearch={setSearchTerm}
            onSort={setSortBy}
            onFilter={setFilter}
          />
          <Button onClick={handleAddProduct}>Novo Produto</Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Criado Em</TableHead>
                <TableHead className="hidden lg:table-cell">Atualizado Em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={product.imageUrl} alt={product.name} />
                      <AvatarFallback>{product.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </TableCell>
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
                  <TableCell className="hidden lg:table-cell">{format(product.createdAt, 'dd/MM/yyyy')}</TableCell>
                  <TableCell className="hidden lg:table-cell">{format(product.updatedAt, 'dd/MM/yyyy')}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>Editar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingProduct}
        onSave={handleSaveProduct}
      />
    </Card>
  );
}
