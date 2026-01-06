import React from 'react';
import { Truck, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { OrderStatus } from '../../../types';
import { OrderCardHeader } from '../OrderCardHeader/OrderCardHeader';
import { OrderCardItems } from '../OrderCardItems/OrderCardItems';
import { OrderCardFooter } from '../OrderCardFooter/OrderCardFooter';

export const OrderCard = ({ order, user }) => {
  const getStatusStyle = (status) => {
    if (status === OrderStatus.DELIVERED) {
      return {
        className: 'bg-emerald-50 text-emerald-600',
        icon: <CheckCircle2 className="w-4 h-4" />,
      };
    }

    if (status === OrderStatus.PENDING) {
      return {
        className: 'bg-amber-50 text-amber-600',
        icon: <Clock className="w-4 h-4" />,
      };
    }

    if (status === OrderStatus.SHIPPED) {
      return {
        className: 'bg-indigo-50 text-indigo-600',
        icon: <Truck className="w-4 h-4" />,
      };
    }

    if (status === OrderStatus.CANCELLED) {
      return {
        className: 'bg-red-50 text-red-600',
        icon: <XCircle className="w-4 h-4" />,
      };
    }

    return { className: '', icon: null };
  };

  const handleDownloadInvoice = () => {
    const lines = [
      "Library Invoice",
      `Order ID: ${order.id}`,
      `Date: ${new Date(order.date).toLocaleDateString()}`,
      `Customer: ${user?.name || "Guest"} (${user?.email || "N/A"})`,
      `Shipping Address: ${order.shippingAddress}`,
      "",
      "Items:",
      ...order.items.map(
        (item) =>
          `- ${item.book.title} by ${item.book.author} | Qty: ${item.quantity} | $${(
            item.book.price * item.quantity
          ).toFixed(2)}`
      ),
      "",
      `Total: $${order.total.toFixed(2)}`,
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-${order.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const status = getStatusStyle(order.status);

  return (
    <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-[0_8px_20px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
      <OrderCardHeader
        orderId={order.id}
        orderDate={order.date}
        total={order.total}
        status={order.status}
        statusClassName={status.className}
        statusIcon={status.icon}
      />

      <div className="p-6">
        <OrderCardItems items={order.items} />
        <OrderCardFooter
          shippingAddress={order.shippingAddress}
          onDownloadInvoice={handleDownloadInvoice}
        />
      </div>
    </div>
  );
};
