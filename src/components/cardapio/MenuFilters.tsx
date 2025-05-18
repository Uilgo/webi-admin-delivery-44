
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowUpDown } from "lucide-react";

interface MenuFiltersProps {
  type: "categorias" | "produtos" | "adicionais";
  onSearch: (term: string) => void;
  onSort: (sortBy: string) => void;
  onFilter: (filter: string) => void;
}

export function MenuFilters({ type, onSearch, onSort, onFilter }: MenuFiltersProps) {
  // Configurações específicas baseadas no tipo
  const placeholders = {
    categorias: "Buscar por nome ou descrição...",
    produtos: "Buscar por nome, descrição ou categoria...",
    adicionais: "Buscar por nome ou descrição..."
  };

  const sortOptions = {
    categorias: [
      { value: "nome_asc", label: "Nome (A-Z)" },
      { value: "nome_desc", label: "Nome (Z-A)" },
      { value: "data_criacao", label: "Data de criação" }
    ],
    produtos: [
      { value: "nome_asc", label: "Nome (A-Z)" },
      { value: "nome_desc", label: "Nome (Z-A)" },
      { value: "categoria", label: "Categoria" },
      { value: "preco_asc", label: "Preço (menor primeiro)" },
      { value: "preco_desc", label: "Preço (maior primeiro)" },
      { value: "vendas", label: "Mais vendidos" }
    ],
    adicionais: [
      { value: "nome_asc", label: "Nome (A-Z)" },
      { value: "nome_desc", label: "Nome (Z-A)" },
      { value: "grupo", label: "Grupo" },
      { value: "preco_asc", label: "Preço (menor primeiro)" },
      { value: "preco_desc", label: "Preço (maior primeiro)" }
    ]
  };

  const filterOptions = {
    categorias: [
      { value: "todas", label: "Todas" },
      { value: "ativas", label: "Ativas" },
      { value: "inativas", label: "Inativas" }
    ],
    produtos: [
      { value: "todos", label: "Todos" },
      { value: "ativos", label: "Ativos" },
      { value: "inativos", label: "Inativos" },
      { value: "destaque", label: "Em destaque" }
    ],
    adicionais: [
      { value: "todos", label: "Todos" },
      { value: "ativos", label: "Ativos" },
      { value: "inativos", label: "Inativos" },
      { value: "obrigatorios", label: "Obrigatórios" },
      { value: "opcionais", label: "Opcionais" }
    ]
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholders[type]}
          className="pl-9"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2">
        <Select defaultValue="nome_asc" onValueChange={onSort}>
          <SelectTrigger className="w-full md:w-48">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              <SelectValue placeholder="Ordenar por" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {sortOptions[type].map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select defaultValue="todos" onValueChange={onFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Filtrar" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions[type].map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
