
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-webi-50 dark:bg-gray-900">
      <div className="absolute inset-0 bg-[url('/src/assets/pattern.svg')] opacity-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-webi-600 to-webi-800">
                WebiDelivery
              </span>
              <span className="block mt-2">Seu delivery, seu sucesso.</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              A plataforma completa para gerenciar seu negócio de delivery, com cardápio digital, controle de pedidos e relatórios detalhados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8">
                <Link to="/cadastro">Começar Agora</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link to="/login">Fazer Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
    </div>
  );
}
