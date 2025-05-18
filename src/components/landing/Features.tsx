
import {
  BarChart,
  LayoutDashboard,
  ClipboardList,
  Store,
  Clock,
  UserCheck,
} from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <LayoutDashboard className="h-8 w-8 text-webi-600" />,
    title: "Painel Completo",
    description: "Dashboard intuitivo com todas as informações importantes do seu negócio em um só lugar."
  },
  {
    icon: <ClipboardList className="h-8 w-8 text-webi-600" />,
    title: "Gestão de Pedidos",
    description: "Acompanhe os pedidos em tempo real, com notificações e atualizações de status."
  },
  {
    icon: <Store className="h-8 w-8 text-webi-600" />,
    title: "Cardápio Digital",
    description: "Crie e edite seu cardápio digital com categorias, produtos, adicionais e promoções."
  },
  {
    icon: <BarChart className="h-8 w-8 text-webi-600" />,
    title: "Relatórios Detalhados",
    description: "Analise o desempenho do seu negócio com relatórios de vendas, produtos mais vendidos e muito mais."
  },
  {
    icon: <Clock className="h-8 w-8 text-webi-600" />,
    title: "Horários Personalizados",
    description: "Configure os horários de funcionamento do seu estabelecimento para cada dia da semana."
  },
  {
    icon: <UserCheck className="h-8 w-8 text-webi-600" />,
    title: "Cadastro Progressivo",
    description: "Capture dados dos clientes gradualmente, melhorando a experiência e aumentando as conversões."
  },
];

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

export function Features() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher o WebiDelivery?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tudo o que você precisa para gerenciar seu delivery em uma única plataforma.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
