
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
import { MenuFilters } from "./MenuFilters";
import { useState, useMemo } from "react";
import { CategoryFormModal } from "./CategoryFormModal";
import { format } from "date-fns";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { Trash2, Edit } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  description: string;
  active: boolean;
  order: number;
  products: number;
  createdAt: Date;
  updatedAt: Date;
}

const categories: Category[] = [
  {
    id: "1",
    name: "Pizzas Tradicionais",
    description: "Nossas pizzas mais vendidas",
    active: true,
    order: 1,
    products: 12,
    createdAt: new Date(2025, 0, 15),
    updatedAt: new Date(2025, 2, 5),
  },
  {
    id: "2",
    name: "Pizzas Premium",
    description: "Pizzas gourmet com ingredientes selecionados",
    active: true,
    order: 2,
    products: 8,
    createdAt: new Date(2025, 0, 20),
    updatedAt: new Date(2025, 1, 12),
  },
  {
    id: "3",
    name: "Bebidas",
    description: "Refrigerantes, sucos e outras bebidas",
    active: true,
    order: 3,
    products: 10,
    createdAt: new Date(2025, 0, 22),
    updatedAt: new Date(2025, 3, 1),
  },
  {
    id: "4",
    name: "Sobremesas",
    description: "Doces para depois da refeição",
    active: false,
    order: 4,
    products: 5,
    createdAt: new Date(2025, 1, 5),
    updatedAt: new Date(2025, 1, 5),
  },
  {
    id: "5",
    name: "Combos",
    description: "Combinações especiais com desconto",
    active: true,
    order: 5,
    products: 4,
    createdAt: new Date(2025, 1, 10),
    updatedAt: new Date(2025, 3, 20),
  },
];

export function CategoryList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("nome_asc");
  const [filter, setFilter] = useState("todas");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryList, setCategoryList] = useState<Category[]>(categories);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const filteredCategories = useMemo(() => {
    let result = [...categoryList];
    
    // Aplicar filtro de busca
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        cat => cat.name.toLowerCase().includes(searchLower) || 
               cat.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Aplicar filtro de status
    if (filter === "ativas") {
      result = result.filter(cat => cat.active);
    } else if (filter === "inativas") {
      result = result.filter(cat => !cat.active);
    }
    
    // Aplicar ordenação
    result.sort((a, b) => {
      switch (sortBy) {
        case "nome_asc":
          return a.name.localeCompare(b.name);
        case "nome_desc":
          return b.name.localeCompare(a.name);
        case "data_criacao":
          return a.createdAt.getTime() - b.createdAt.getTime();
        case "data_atualizacao":
          return b.updatedAt.getTime() - a.updatedAt.getTime();
        default:
          return a.order - b.order;
      }
    });
    
    return result;
  }, [searchTerm, sortBy, filter, categoryList]);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      setCategoryList(categoryList.filter(cat => cat.id !== categoryToDelete.id));
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleSaveCategory = (category: Category) => {
    // Se estiver editando, atualize o item existente
    if (editingCategory) {
      setCategoryList(categoryList.map(cat => 
        cat.id === category.id ? category : cat
      ));
    } else {
      // Se for novo, adicione à lista
      setCategoryList([...categoryList, category]);
    }
    setIsModalOpen(false);
  };

  const handleToggleActive = (category: Category) => {
    setCategoryList(categoryList.map(cat => 
      cat.id === category.id ? { ...cat, active: !cat.active } : cat
    ));
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <MenuFilters 
            type="categorias"
            onSearch={setSearchTerm}
            onSort={setSortBy}
            onFilter={setFilter}
          />
          <Button onClick={handleAddCategory}>Nova Categoria</Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Ordem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Descrição</TableHead>
                <TableHead className="hidden md:table-cell">Produtos</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Criado Em</TableHead>
                <TableHead className="hidden md:table-cell">Atualizado Em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.order}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{category.description}</TableCell>
                  <TableCell className="hidden md:table-cell">{category.products}</TableCell>
                  <TableCell>
                    <Switch 
                      checked={category.active} 
                      onCheckedChange={() => handleToggleActive(category)} 
                    />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{format(category.createdAt, 'dd/MM/yyyy')}</TableCell>
                  <TableCell className="hidden md:table-cell">{format(category.updatedAt, 'dd/MM/yyyy')}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category)}>
                      <Trash2 className="h-4 w-4 mr-1 text-destructive" />
                      <span className="text-destructive">Excluir</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={editingCategory}
        onSave={handleSaveCategory}
      />

      <DeleteConfirmationModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteCategory}
        itemName={categoryToDelete?.name || ""}
        itemType="categoria"
      />
    </Card>
  );
}
