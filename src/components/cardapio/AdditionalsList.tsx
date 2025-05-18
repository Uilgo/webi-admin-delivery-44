
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
import { AdditionalFormModal } from "./AdditionalFormModal";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { Trash2, Edit } from "lucide-react";

export interface Additional {
  id: string;
  name: string;
  group: string;
  price: string;
  active: boolean;
  isRequired: boolean;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const additionals: Additional[] = [
  {
    id: "1",
    name: "Bacon",
    group: "Ingredientes Extras",
    price: "R$ 5,00",
    active: true,
    isRequired: false,
    description: "30g de bacon crocante",
    createdAt: new Date(2025, 0, 15),
    updatedAt: new Date(2025, 2, 5),
  },
  {
    id: "2",
    name: "Borda Recheada",
    group: "Bordas",
    price: "R$ 8,00",
    active: true,
    isRequired: false,
    description: "Borda recheada com catupiry",
    createdAt: new Date(2025, 0, 20),
    updatedAt: new Date(2025, 1, 12),
  },
  {
    id: "3",
    name: "Molho de Alho",
    group: "Molhos",
    price: "R$ 2,00",
    active: true,
    isRequired: false,
    description: "Molho de alho artesanal",
    createdAt: new Date(2025, 0, 22),
    updatedAt: new Date(2025, 3, 1),
  },
  {
    id: "4",
    name: "Refrigerante Lata",
    group: "Bebidas",
    price: "R$ 6,00",
    active: true,
    isRequired: false,
    description: "Várias opções disponíveis",
    createdAt: new Date(2025, 1, 5),
    updatedAt: new Date(2025, 1, 5),
  },
  {
    id: "5",
    name: "Escolha o Tamanho",
    group: "Tamanhos",
    price: "Variável",
    active: true,
    isRequired: true,
    description: "Pequena, Média ou Grande",
    createdAt: new Date(2025, 1, 10),
    updatedAt: new Date(2025, 3, 20),
  },
];

export function AdditionalsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("nome_asc");
  const [filter, setFilter] = useState("todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdditional, setEditingAdditional] = useState<Additional | null>(null);
  const [additionalList, setAdditionalList] = useState<Additional[]>(additionals);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [additionalToDelete, setAdditionalToDelete] = useState<Additional | null>(null);

  const filteredAdditionals = useMemo(() => {
    let result = [...additionalList];
    
    // Aplicar filtro de busca
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        item => 
          item.name.toLowerCase().includes(searchLower) || 
          item.group.toLowerCase().includes(searchLower) ||
          (item.description || "").toLowerCase().includes(searchLower)
      );
    }
    
    // Aplicar filtro de status
    if (filter === "ativos") {
      result = result.filter(item => item.active);
    } else if (filter === "inativos") {
      result = result.filter(item => !item.active);
    } else if (filter === "obrigatorios") {
      result = result.filter(item => item.isRequired);
    } else if (filter === "opcionais") {
      result = result.filter(item => !item.isRequired);
    }
    
    // Aplicar ordenação
    result.sort((a, b) => {
      switch (sortBy) {
        case "nome_asc":
          return a.name.localeCompare(b.name);
        case "nome_desc":
          return b.name.localeCompare(a.name);
        case "grupo":
          return a.group.localeCompare(b.group);
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
  }, [searchTerm, sortBy, filter, additionalList]);

  const handleAddAdditional = () => {
    setEditingAdditional(null);
    setIsModalOpen(true);
  };

  const handleEditAdditional = (additional: Additional) => {
    setEditingAdditional(additional);
    setIsModalOpen(true);
  };

  const handleDeleteAdditional = (additional: Additional) => {
    setAdditionalToDelete(additional);
    setDeleteModalOpen(true);
  };

  const confirmDeleteAdditional = () => {
    if (additionalToDelete) {
      setAdditionalList(additionalList.filter(item => item.id !== additionalToDelete.id));
      setDeleteModalOpen(false);
      setAdditionalToDelete(null);
    }
  };

  const handleSaveAdditional = (additional: Additional) => {
    // Se estiver editando, atualize o item existente
    if (editingAdditional) {
      setAdditionalList(additionalList.map(item => 
        item.id === additional.id ? additional : item
      ));
    } else {
      // Se for novo, adicione à lista
      setAdditionalList([...additionalList, additional]);
    }
    setIsModalOpen(false);
  };

  const handleToggleActive = (additional: Additional) => {
    setAdditionalList(additionalList.map(item => 
      item.id === additional.id ? { ...item, active: !item.active } : item
    ));
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <MenuFilters 
            type="adicionais"
            onSearch={setSearchTerm}
            onSort={setSortBy}
            onFilter={setFilter}
          />
          <Button onClick={handleAddAdditional}>Novo Adicional</Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Grupo</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Criado Em</TableHead>
                <TableHead className="hidden lg:table-cell">Atualizado Em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdditionals.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {item.name}
                    {item.isRequired && (
                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-300">
                        Obrigatório
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{item.group}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Switch 
                      checked={item.active}
                      onCheckedChange={() => handleToggleActive(item)} 
                    />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{format(item.createdAt, 'dd/MM/yyyy')}</TableCell>
                  <TableCell className="hidden lg:table-cell">{format(item.updatedAt, 'dd/MM/yyyy')}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditAdditional(item)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteAdditional(item)}>
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

      <AdditionalFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        additional={editingAdditional}
        onSave={handleSaveAdditional}
      />

      <DeleteConfirmationModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteAdditional}
        itemName={additionalToDelete?.name || ""}
        itemType="adicional"
      />
    </Card>
  );
}
