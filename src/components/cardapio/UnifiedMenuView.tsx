import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2, Copy, Move, List, LayoutGrid, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryFormModal } from "./CategoryFormModal";
import { ProductFormModal } from "./ProductFormModal";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Product } from "./ProductList";
import { Category } from "./CategoryList";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Dados de exemplo de categorias (igual ao CategoryList.tsx)
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
    name: "Pizzas Doces",
    description: "Combinações especiais com desconto",
    active: true,
    order: 5,
    products: 4,
    createdAt: new Date(2025, 1, 10),
    updatedAt: new Date(2025, 3, 20),
  },
];

// Dados de exemplo de produtos (igual ao ProductList.tsx)
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
    description: "Mussarela, provolone, parmesão e gorgonzola",
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
    description: "Mussarela, presunto, cebola, ovo cozido e ervilha",
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
    description: "Refrigerante Coca-Cola 2 litros",
    imageUrl: "/placeholder.svg",
    createdAt: new Date(2025, 1, 10),
    updatedAt: new Date(2025, 3, 20),
  },
  {
    id: "6",
    name: "Pizza de Chocolate",
    category: "Pizzas Doces",
    price: "R$ 39,90",
    active: true,
    featured: true,
    available: true,
    description: "Chocolate ao leite e chocolate branco",
    imageUrl: "/placeholder.svg",
    createdAt: new Date(2025, 1, 15),
    updatedAt: new Date(2025, 3, 25),
  },
];

// Componente de Card de Produto
function ProductCard({ product, onEdit, onDuplicate, onDelete }) {
  return (
    <Card className="hover:shadow-md transition-shadow mb-3 animate-fade-in h-[160px]">
      <CardContent className="p-4 h-full">
        <div className="flex items-center h-full">
          {/* Imagem do produto com bordas arredondadas em 8px */}
          <div className="flex-shrink-0 w-20 h-20 relative">
            <Avatar className="h-full w-full rounded-lg overflow-hidden">
              <AvatarImage 
                src={product.imageUrl} 
                alt={product.name} 
                className="object-cover"
              />
              <AvatarFallback className="rounded-lg">{product.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          
          {/* Informações do produto */}
          <div className="flex-grow p-3 overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h3 className="font-medium text-lg truncate">{product.name}</h3>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{product.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {product.featured && (
                  <Badge className="bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300">
                    Destaque
                  </Badge>
                )}
              </div>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2 overflow-hidden">
                      {product.description || "Sem descrição"}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{product.description || "Sem descrição"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <div className="mt-2">
                <p className="text-lg font-bold text-amber-500 dark:text-amber-400">
                  {product.price}
                </p>
              </div>
            </div>
          </div>
          
          {/* Ações do produto */}
          <div className="flex-shrink-0 flex flex-col gap-1">
            <Button variant="ghost" size="icon" onClick={() => onEdit(product)}>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDuplicate(product)}>
              <Copy className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(product)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function UnifiedMenuView() {
  const [categoryList, setCategoryList] = useState<Category[]>(categories);
  const [productList, setProductList] = useState<Product[]>(products);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{type: 'category' | 'product', item: Category | Product} | null>(null);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategoryCollapse = (categoryId: string) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setItemToDelete({type: 'category', item: category});
    setDeleteModalOpen(true);
  };

  const handleDuplicateCategory = (category: Category) => {
    const newCategory: Category = {
      ...category,
      id: String(Date.now()),
      name: `${category.name} (Cópia)`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setCategoryList([...categoryList, newCategory]);
  };

  const handleAddProduct = (categoryName: string) => {
    setEditingProduct({
      id: "",
      name: "",
      category: categoryName,
      price: "",
      active: true,
      featured: false,
      available: true,
      description: "",
      createdAt: new Date(),
      updatedAt: new Date()
    } as Product);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setItemToDelete({type: 'product', item: product});
    setDeleteModalOpen(true);
  };

  const handleDuplicateProduct = (product: Product) => {
    const newProduct: Product = {
      ...product,
      id: String(Date.now()),
      name: `${product.name} (Cópia)`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setProductList([...productList, newProduct]);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === 'category') {
      setCategoryList(categoryList.filter(cat => cat.id !== (itemToDelete.item as Category).id));
    } else {
      setProductList(productList.filter(prod => prod.id !== (itemToDelete.item as Product).id));
    }
    
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleSaveCategory = (category: Category) => {
    if (editingCategory) {
      setCategoryList(categoryList.map(cat => cat.id === category.id ? category : cat));
    } else {
      const newCategory = {
        ...category,
        id: String(Date.now()),
        products: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setCategoryList([...categoryList, newCategory]);
    }
    setIsCategoryModalOpen(false);
  };

  const handleSaveProduct = (product: Product) => {
    if (editingProduct && editingProduct.id) {
      setProductList(productList.map(prod => prod.id === product.id ? product : prod));
    } else {
      const newProduct = {
        ...product,
        id: String(Date.now()),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setProductList([...productList, newProduct]);
    }
    setIsProductModalOpen(false);
  };

  // Agrupar produtos por categoria
  const productsByCategory = useMemo(() => {
    const groups: { [key: string]: Product[] } = {};
    
    productList.forEach(product => {
      if (!groups[product.category]) {
        groups[product.category] = [];
      }
      groups[product.category].push(product);
    });
    
    return groups;
  }, [productList]);

  const activeCategories = useMemo(() => {
    return categoryList.filter(cat => cat.active);
  }, [categoryList]);

  // Handle drag end for category reordering
  const handleCategoryDragEnd = (result: any) => {
    const { source, destination } = result;
    
    // If the item was dropped outside of a droppable area
    if (!destination) return;
    
    // If the item was dropped in the same position
    if (source.index === destination.index) return;
    
    const reorderedCategories = Array.from(activeCategories);
    const [removedCategory] = reorderedCategories.splice(source.index, 1);
    reorderedCategories.splice(destination.index, 0, removedCategory);
    
    // Update category orders
    const updatedCategories = reorderedCategories.map((cat, idx) => ({
      ...cat,
      order: idx + 1
    }));
    
    setCategoryList([
      ...updatedCategories,
      ...categoryList.filter(cat => !cat.active)
    ]);
  };

  // Handle drag end for product reordering within a category
  const handleProductDragEnd = (result: any, categoryName: string) => {
    const { source, destination } = result;
    
    // If the item was dropped outside of a droppable area
    if (!destination) return;
    
    // If the item was dropped in the same position
    if (source.index === destination.index) return;
    
    const categoryProducts = Array.from(productsByCategory[categoryName] || []);
    const [movedProduct] = categoryProducts.splice(source.index, 1);
    categoryProducts.splice(destination.index, 0, movedProduct);
    
    // Update product list with the reordered products
    const updatedProductList = productList
      .filter(p => p.category !== categoryName)
      .concat(categoryProducts);
    
    setProductList(updatedProductList);
  };

  // Render a product in list view
  const renderProductListItem = (product: Product) => (
    <TableRow key={product.id}>
      <TableCell className="w-12">
        <Avatar className="h-9 w-9 rounded-md">
          <AvatarImage src={product.imageUrl} alt={product.name} />
          <AvatarFallback className="rounded-md">{product.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell className="font-medium">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="truncate block max-w-[150px]">{product.name}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{product.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="truncate block max-w-[250px]">{product.description}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{product.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>
        {product.featured && (
          <Badge className="bg-amber-100 text-amber-800">Destaque</Badge>
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDuplicateProduct(product)}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">Categorias do Cardápio</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="icon"
            className={viewMode === 'card' ? 'bg-muted' : ''}
            onClick={() => setViewMode('card')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            size="icon"
            className={viewMode === 'list' ? 'bg-muted' : ''}
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            className="border-dashed border-2 border-amber-300 hover:border-amber-400 text-amber-600 hover:text-amber-700 dark:border-amber-700 dark:hover:border-amber-600 dark:text-amber-500 dark:hover:text-amber-400"
            onClick={handleAddCategory}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Categoria
          </Button>
        </div>
      </div>

      {/* Drag and Drop Context para Categorias */}
      <DragDropContext onDragEnd={handleCategoryDragEnd}>
        <Droppable droppableId="categories" type="category">
          {(provided) => (
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef} 
              className="space-y-8"
            >
              {activeCategories.map((category, index) => (
                <Draggable 
                  key={category.id} 
                  draggableId={category.id} 
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="mb-10 animate-fade-in"
                    >
                      <Collapsible open={!collapsedCategories[category.id]}>
                        <Card className="bg-white dark:bg-gray-800 shadow-md overflow-hidden">
                          {/* Cabeçalho da categoria com handle de drag e toggle collapse */}
                          <div className="p-4 flex items-center justify-between border-b">
                            <div className="flex items-center gap-2">
                              <div {...provided.dragHandleProps}>
                                <Move className="h-5 w-5 text-gray-500 cursor-move" />
                              </div>
                              <h3 className="text-lg font-medium">{category.name}</h3>
                              <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => toggleCategoryCollapse(category.id)}>
                                  {collapsedCategories[category.id] ? 
                                    <ChevronDown className="h-4 w-4" /> : 
                                    <ChevronUp className="h-4 w-4" />
                                  }
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditCategory(category)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDuplicateCategory(category)}>
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteCategory(category)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                          
                          <CollapsibleContent>
                            {/* Produtos da categoria - Com contexto DND separado */}
                            <div className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="text-md font-medium text-muted-foreground">Produtos</h4>
                              </div>
                              
                              {viewMode === 'card' ? (
                                /* Card view - Com drag and drop */
                                <DragDropContext onDragEnd={(result) => handleProductDragEnd(result, category.name)}>
                                  <Droppable droppableId={`products-${category.id}`} type={`products-${category.id}`}>
                                    {(provided) => (
                                      <div 
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="space-y-4"
                                      >
                                        {productsByCategory[category.name]?.length > 0 ? (
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {productsByCategory[category.name].map((product, idx) => (
                                              <Draggable 
                                                key={product.id} 
                                                draggableId={product.id} 
                                                index={idx}
                                              >
                                                {(provided) => (
                                                  <div 
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className="animate-fade-in"
                                                  >
                                                    <div className="flex items-center">
                                                      <div 
                                                        className="p-2 cursor-move mr-2 text-gray-400 hover:text-gray-600"
                                                        {...provided.dragHandleProps}
                                                      >
                                                        <Move className="h-4 w-4" />
                                                      </div>
                                                      <div className="flex-grow">
                                                        <ProductCard
                                                          product={product}
                                                          onEdit={handleEditProduct}
                                                          onDuplicate={handleDuplicateProduct}
                                                          onDelete={handleDeleteProduct}
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
                                              </Draggable>
                                            ))}
                                          </div>
                                        ) : (
                                          <div className="text-center py-6 border rounded-lg bg-muted/20">
                                            <p className="text-muted-foreground">Nenhum produto nesta categoria</p>
                                          </div>
                                        )}
                                        {provided.placeholder}
                                      </div>
                                    )}
                                  </Droppable>
                                </DragDropContext>
                              ) : (
                                /* List view */
                                <div className="border rounded-lg overflow-hidden">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="w-12"></TableHead>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Descrição</TableHead>
                                        <TableHead>Preço</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {productsByCategory[category.name]?.length > 0 ? (
                                        productsByCategory[category.name].map(product => 
                                          renderProductListItem(product)
                                        )
                                      ) : (
                                        <TableRow>
                                          <TableCell colSpan={6} className="h-24 text-center">
                                            Nenhum produto nesta categoria
                                          </TableCell>
                                        </TableRow>
                                      )}
                                    </TableBody>
                                  </Table>
                                </div>
                              )}
                              
                              {/* Botão para adicionar novo produto */}
                              <div className="mt-4">
                                <Button 
                                  variant="outline" 
                                  className="w-full border-dashed border-2 border-amber-300 hover:border-amber-400 text-amber-600 hover:text-amber-700 dark:border-amber-700 dark:hover:border-amber-600 dark:text-amber-500 dark:hover:text-amber-400 h-14"
                                  onClick={() => handleAddProduct(category.name)}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Adicionar novo produto
                                </Button>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Card>
                      </Collapsible>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <CategoryFormModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        category={editingCategory}
        onSave={handleSaveCategory}
        onDelete={editingCategory ? () => handleDeleteCategory(editingCategory) : undefined}
      />

      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={editingProduct}
        onSave={handleSaveProduct}
        onDelete={editingProduct && editingProduct.id ? () => handleDeleteProduct(editingProduct) : undefined}
      />

      <DeleteConfirmationModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.item?.name || ""}
        itemType={itemToDelete?.type === 'category' ? 'categoria' : 'produto'}
      />
    </div>
  );
}
