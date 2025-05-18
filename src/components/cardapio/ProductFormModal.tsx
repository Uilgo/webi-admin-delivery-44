
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Product } from "./ProductList";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Updated schema without category (it will be provided by the parent component)
const formSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }).max(50, { 
    message: "Nome deve ter no máximo 50 caracteres" 
  }),
  description: z.string().max(200, { 
    message: "Descrição deve ter no máximo 200 caracteres" 
  }).optional(),
  price: z.string().min(1, { message: "Preço é obrigatório" }),
  active: z.boolean().default(true),
  featured: z.boolean().default(false),
  available: z.boolean().default(true),
  imageUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (product: Product) => void;
  onDelete?: () => void;
}

export function ProductFormModal({
  isOpen,
  onClose,
  product,
  onSave,
  onDelete,
}: ProductFormModalProps) {
  const isEditing = !!product;
  const [imagePreview, setImagePreview] = useState<string | null>(product?.imageUrl || null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || "",
      active: product?.active ?? true,
      featured: product?.featured ?? false,
      available: product?.available ?? true,
      imageUrl: product?.imageUrl || "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    const updatedProduct = {
      id: product?.id || String(Date.now()),
      ...values,
      // Keep the existing category (when editing) or use the category provided when creating
      category: product?.category || "",
      createdAt: product?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    onSave(updatedProduct as Product);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        form.setValue("imageUrl", result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 rounded-lg">
                  <AvatarImage src={imagePreview || ""} alt="Preview" />
                  <AvatarFallback className="bg-muted text-lg rounded-lg">
                    {form.watch("name")?.substring(0, 2).toUpperCase() || "IMG"}
                  </AvatarFallback>
                </Avatar>
                <label className="mt-3 cursor-pointer text-primary text-sm">
                  <span>Alterar foto</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Nome
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Máximo de 50 caracteres. O nome será truncado no card caso ultrapasse o espaço disponível.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do produto" {...field} maxLength={50} />
                    </FormControl>
                    <FormDescription>
                      {field.value?.length || 0}/50 caracteres
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input placeholder="R$ 0,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Descrição
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Máximo de 200 caracteres. A descrição será limitada a 2 linhas no card.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição do produto (opcional)"
                      {...field}
                      value={field.value || ""}
                      maxLength={200}
                      className="resize-none min-h-[100px]"
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/200 caracteres
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Status</FormLabel>
                      <FormDescription>
                        {field.value ? "Ativo" : "Inativo"}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Destaque</FormLabel>
                      <FormDescription>
                        {field.value ? "Em destaque" : "Sem destaque"}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Disponibilidade</FormLabel>
                      <FormDescription>
                        {field.value ? "Disponível" : "Indisponível"}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex justify-between sm:justify-between pt-4">
              {isEditing && onDelete && (
                <Button variant="destructive" type="button" onClick={onDelete} className="mr-auto">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              )}
              <div className="flex gap-2">
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
