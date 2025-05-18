
import { OrderStatus } from "./OrderCard";

// Lista de status para pedidos em ordem de progressão
export const orderStatusList: OrderStatus[] = [
  { id: "pendente", label: "Pendente", color: "bg-gray-100 text-gray-800" },
  { id: "aceito", label: "Aceito", color: "bg-blue-100 text-blue-800" },
  { id: "em_preparo", label: "Em Preparo", color: "bg-yellow-100 text-yellow-800" },
  { id: "saiu_entrega", label: "Saiu para Entrega", color: "bg-purple-100 text-purple-800" },
  { id: "concluido", label: "Concluído", color: "bg-green-100 text-green-800" },
  { id: "cancelado", label: "Cancelado", color: "bg-red-100 text-red-800" },
];

// Dados simulados de pedidos
export const mockOrders = [
  {
    id: "#42512",
    customer: "Ana Silva",
    status: "em_preparo",
    address: "Rua das Flores, 123 - Jardim Primavera",
    total: "R$ 57,90",
    date: "15/05/2025 19:45",
    payment: "Cartão de Crédito",
    isRegistered: true,
    items: [
      { name: "Pizza de Calabresa Grande", quantity: 1, price: "R$ 42,90" },
      { name: "Refrigerante 2L", quantity: 1, price: "R$ 12,00" },
      { name: "Borda Recheada", quantity: 1, price: "R$ 3,00" },
    ],
  },
  {
    id: "#42511",
    customer: "Carlos Ferreira",
    status: "pendente",
    address: "Av. Principal, 456 - Centro",
    total: "R$ 42,50",
    date: "15/05/2025 19:30",
    payment: "Pix",
    isRegistered: false,
    items: [
      { name: "Hambúrguer Artesanal", quantity: 1, price: "R$ 32,50" },
      { name: "Batata Frita", quantity: 1, price: "R$ 10,00" },
    ],
  },
  {
    id: "#42510",
    customer: "Juliana Mendes",
    status: "concluido",
    address: "Rua dos Pinheiros, 789 - Vila Verde",
    total: "R$ 86,00",
    date: "15/05/2025 19:15",
    payment: "Dinheiro",
    isRegistered: true,
    items: [
      { name: "Pizza de Frango c/ Catupiry", quantity: 1, price: "R$ 45,00" },
      { name: "Pizza de Chocolate", quantity: 1, price: "R$ 35,00" },
      { name: "Refrigerante 2L", quantity: 1, price: "R$ 12,00" },
    ],
  },
  {
    id: "#42509",
    customer: "Roberto Alves",
    status: "saiu_entrega",
    address: "Rua Secundária, 321 - Jardim Europa",
    total: "R$ 34,90",
    date: "15/05/2025 19:00",
    payment: "Cartão de Débito",
    isRegistered: false,
    items: [
      { name: "Açaí 500ml", quantity: 1, price: "R$ 25,90" },
      { name: "Complementos", quantity: 3, price: "R$ 9,00" },
    ],
  },
  {
    id: "#42508",
    customer: "Maria Oliveira",
    status: "cancelado",
    address: "Av. das Palmeiras, 654 - Centro",
    total: "R$ 65,80",
    date: "15/05/2025 18:45",
    payment: "Pix",
    isRegistered: true,
    items: [
      { name: "Pizza Quatro Queijos", quantity: 1, price: "R$ 45,80" },
      { name: "Refrigerante 2L", quantity: 1, price: "R$ 12,00" },
      { name: "Borda Recheada", quantity: 1, price: "R$ 8,00" },
    ],
  },
  {
    id: "#42507",
    customer: "Paulo Santos",
    status: "aceito",
    address: "Rua das Acácias, 987 - Jardim Floresta",
    total: "R$ 53,40",
    date: "15/05/2025 18:30",
    payment: "Cartão de Crédito",
    isRegistered: true,
    items: [
      { name: "Hambúrguer Duplo", quantity: 1, price: "R$ 38,90" },
      { name: "Refrigerante Lata", quantity: 1, price: "R$ 6,50" },
      { name: "Batata Frita P", quantity: 1, price: "R$ 8,00" },
    ],
  },
];

// Função para determinar quais status podem ser selecionados a partir de um status atual
export const getAvailableStatuses = (currentStatus: string): OrderStatus[] => {
  // Lógica para definir a progressão de status permitida
  const statusIndex = orderStatusList.findIndex(s => s.id === currentStatus);
  
  if (currentStatus === "cancelado") {
    // Pedido cancelado não pode mudar para outros status
    return [orderStatusList.find(s => s.id === "cancelado")!];
  } 
  else if (currentStatus === "concluido") {
    // Pedido concluído só pode ser cancelado
    return [
      orderStatusList.find(s => s.id === "concluido")!,
      orderStatusList.find(s => s.id === "cancelado")!
    ];
  }
  
  // Retorna o status atual e todos os status posteriores (sem os anteriores)
  return orderStatusList.filter((_, index) => index >= statusIndex || index === orderStatusList.length - 1);
};
