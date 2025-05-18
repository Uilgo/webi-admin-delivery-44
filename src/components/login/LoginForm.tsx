
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginForm() {
  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Entrar no WebiDelivery</CardTitle>
        <CardDescription>
          Digite suas credenciais para acessar o painel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="seu@email.com" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <Link to="/recuperar-senha" className="text-sm text-primary hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full mb-4">Entrar</Button>
        <div className="text-sm text-center text-muted-foreground">
          Não possui uma conta?{" "}
          <Link to="/cadastro" className="text-primary hover:underline">
            Cadastre-se
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
