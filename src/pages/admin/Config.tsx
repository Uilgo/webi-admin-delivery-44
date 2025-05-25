
import { ConfigForm } from "@/components/config/ConfigForm";

const Config = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Configurações</h1>
          <p className="text-muted-foreground mt-1">Gerencie as configurações do seu estabelecimento</p>
        </div>
      </div>
      
      <ConfigForm />
    </div>
  );
};

export default Config;
