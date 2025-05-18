
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

interface Additional {
  id: string;
  name: string;
  group: string;
  price: string;
  active: boolean;
  isRequired: boolean;
  description?: string;
}

const additionals: Additional[] = [
  {
    id: "1",
    name: "Bacon",
    group: "Ingredientes Extras",
    price: "R$ 5,00",
    active: true,
    isRequired: false,
    description: "30g de bacon crocante"
  },
  {
    id: "2",
    name: "Borda Recheada",
    group: "Bordas",
    price: "R$ 8,00",
    active: true,
    isRequired: false,
    description: "Borda recheada com catupiry"
  },
  {
    id: "3",
    name: "Molho de Alho",
    group: "Molhos",
    price: "R$ 2,00",
    active: true,
    isRequired: false,
    description: "Molho de alho artesanal"
  },
  {
    id: "4",
    name: "Refrigerante Lata",
    group: "Bebidas",
    price: "R$ 6,00",
    active: true,
    isRequired: false,
    description: "Várias opções disponíveis"
  },
  {
    id: "5",
    name: "Escolha o Tamanho",
    group: "Tamanhos",
    price: "Variável",
    active: true,
    isRequired: true,
    description: "Pequena, Média ou Grande"
  },
];

export function AdditionalsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("nome_asc");
  const [filter, setFilter] = useState("todos");

  const filteredAdditionals = useMemo(() => {
    let result = [...additionals];
    
    // Aplicar filtro de busca
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        item => 
          item.name.toLowerCase().includes(searchLower) || 
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
        default:
          return 0;
      }
    });
    
    return result;
  }, [searchTerm, sortBy, filter]);

  return (
    <Card>
      <div className="p-6">
        <MenuFilters 
          type="adicionais"
          onSearch={setSearchTerm}
          onSort={setSortBy}
          onFilter={setFilter}
        />
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Grupo</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
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
                    <Switch checked={item.active} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Editar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}
