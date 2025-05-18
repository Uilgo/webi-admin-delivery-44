
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function RegisterForm() {
  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Criar uma conta</CardTitle>
        <CardDescription>
          Preencha os dados abaixo para registrar seu delivery
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input id="name" placeholder="Seu nome completo" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="business">Nome do seu delivery</Label>
          <Input id="business" placeholder="Ex: Pizzaria do João" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="seu@email.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" placeholder="(00) 00000-0000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar senha</Label>
          <Input id="confirmPassword" type="password" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full mb-4">Cadastrar</Button>
        <div className="text-sm text-center text-muted-foreground">
          Já possui uma conta?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Faça login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
