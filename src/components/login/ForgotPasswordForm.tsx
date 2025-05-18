
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ForgotPasswordForm() {
  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Recuperar senha</CardTitle>
        <CardDescription>
          Digite seu email para receber um link de recuperação
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="seu@email.com" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full mb-4">Enviar link de recuperação</Button>
        <div className="text-sm text-center text-muted-foreground">
          Lembrou sua senha?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Voltar para o login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
