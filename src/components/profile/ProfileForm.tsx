
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
import { Separator } from "@/components/ui/separator";

export function ProfileForm() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Meu Perfil</h2>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais e de segurança.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>
            Atualize suas informações de perfil.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline">Alterar Foto</Button>
              <p className="text-xs text-muted-foreground">
                JPG, GIF ou PNG. Tamanho máximo de 800KB.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" defaultValue="João da Silva" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="joao@webidelivery.com" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Salvar Alterações</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
          <CardDescription>
            Atualize sua senha e configure opções de segurança.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Senha Atual</Label>
            <Input id="current-password" type="password" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input id="new-password" type="password" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Atualizar Senha</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Acessos</CardTitle>
          <CardDescription>
            Veja os últimos acessos à sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { date: "15/05/2025 19:42", ip: "177.182.45.89", device: "Windows - Chrome" },
            { date: "14/05/2025 12:28", ip: "177.182.45.89", device: "Android - App" },
            { date: "12/05/2025 08:15", ip: "189.76.123.45", device: "Windows - Firefox" },
          ].map((access, index) => (
            <div key={index} className="flex flex-col md:flex-row justify-between py-2">
              <div className="text-sm">
                <span className="font-medium">{access.date}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                IP: {access.ip} • {access.device}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
