
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield, Camera, History } from "lucide-react";

export function ProfileForm() {
  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-lg font-semibold">JS</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">João da Silva</CardTitle>
              <CardDescription className="text-base">joao@webidelivery.com</CardDescription>
              <Badge variant="secondary" className="mt-2">Administrador</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="space-y-2">
                <Button variant="outline" className="gap-2">
                  <Camera className="h-4 w-4" />
                  Alterar Foto
                </Button>
                <p className="text-xs text-muted-foreground max-w-xs">
                  JPG, GIF ou PNG. Tamanho máximo de 800KB.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" defaultValue="João da Silva" className="h-11" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="joao@webidelivery.com" className="h-11" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 p-8">
          <Button size="lg">Salvar Alterações</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <Shield className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>
                Atualize sua senha e configure opções de segurança.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="space-y-2">
            <Label htmlFor="current-password">Senha Atual</Label>
            <Input id="current-password" type="password" className="h-11" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input id="new-password" type="password" className="h-11" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input id="confirm-password" type="password" className="h-11" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 p-8">
          <Button variant="destructive" size="lg">Atualizar Senha</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <History className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle>Histórico de Acessos</CardTitle>
              <CardDescription>
                Monitore os últimos acessos à sua conta para garantir a segurança.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-4">
            {[
              { date: "15/05/2025 19:42", ip: "177.182.45.89", device: "Windows - Chrome", isRecent: true },
              { date: "14/05/2025 12:28", ip: "177.182.45.89", device: "Android - App", isRecent: false },
              { date: "12/05/2025 08:15", ip: "189.76.123.45", device: "Windows - Firefox", isRecent: false },
            ].map((access, index) => (
              <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 px-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{access.date}</span>
                    {access.isRecent && <Badge variant="secondary" className="text-xs">Atual</Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {access.device}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-2 md:mt-0">
                  IP: {access.ip}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
