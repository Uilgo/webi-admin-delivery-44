
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, ChevronRight, Grid, Plus } from "lucide-react";
import { Category } from "./CategoryList";
import { Product } from "./ProductList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CategoryFormModal } from "./CategoryFormModal";
import { ProductFormModal } from "./ProductFormModal";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

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
    name: "Combos",
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

export function UnifiedMenuView() {
  const [categoryList, setCategoryList] = useState<Category[]>(categories);
  const [productList, setProductList] = useState<Product[]>(products);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{type: 'category' | 'product', item: Category | Product} | null>(null);

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

  const handleAddProduct = (categoryName: string) => {
    setEditingProduct({
      id: "",
      name: "",
      category: categoryName,
      price: "",
      active: true,
      featured: false,
      available: true,
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

  return (
    <div className="space-y-8">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">Categorias do Cardápio</h2>
        <Button onClick={handleAddCategory}>
          <Plus className="h-4 w-4 mr-1" />
          Nova Categoria
        </Button>
      </div>

      {activeCategories.map((category) => (
        <div key={category.id} className="space-y-4">
          <div className="flex items-center justify-between bg-accent/30 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Grid className="h-5 w-5" />
              <h3 className="text-lg font-medium">{category.name}</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
              <Edit className="h-4 w-4 mr-1" />
              Editar
            </Button>
          </div>

          <div className="pl-2 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-md font-medium text-muted-foreground pl-2">Produtos</h4>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAddProduct(category.name)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Novo Produto
              </Button>
            </div>
            
            {productsByCategory[category.name]?.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {productsByCategory[category.name].map((product) => (
                  <div 
                    key={product.id} 
                    className="flex bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden animate-fade-in"
                  >
                    <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 relative">
                      <div className="absolute inset-0">
                        <Avatar className="h-full w-full rounded-none">
                          <AvatarImage src={product.imageUrl} alt={product.name} className="object-cover" />
                          <AvatarFallback className="rounded-none h-full text-lg">
                            {product.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute bottom-1 right-1 bg-white/80 dark:bg-gray-800/80 rounded-full h-7 w-7"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    
                    <div className="flex-grow p-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-lg">{product.name}</h3>
                          {product.featured && (
                            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900 dark:text-amber-300">
                              Destaque
                            </Badge>
                          )}
                          {!product.available && (
                            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-300">
                              Indisponível
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                        
                        <div className="mt-2">
                          <p className="text-lg font-bold text-amber-500 dark:text-amber-400">
                            {product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 border rounded-lg bg-muted/20">
                <p className="text-muted-foreground">Nenhum produto nesta categoria</p>
              </div>
            )}
          </div>
        </div>
      ))}

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
