
import { Order } from "./OrderCard";

interface OrderItemsTableProps {
  items: Order["items"];
  total: string;
}

export function OrderItemsTable({ items, total }: OrderItemsTableProps) {
  return (
    <div className="bg-muted/50 p-3 rounded-md">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Produto</th>
            <th className="text-center py-2">Qtd</th>
            <th className="text-right py-2">Valor</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="border-b border-muted">
              <td className="py-2">{item.name}</td>
              <td className="text-center py-2">{item.quantity}</td>
              <td className="text-right py-2">{item.price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} className="text-right font-medium py-2">
              Total:
            </td>
            <td className="text-right font-bold py-2">{total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
