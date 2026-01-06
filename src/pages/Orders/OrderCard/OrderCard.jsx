import React from 'react';
import { Truck, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { OrderStatus } from '../../../types';
import { OrderCardHeader } from '../OrderCardHeader/OrderCardHeader';
import { OrderCardItems } from '../OrderCardItems/OrderCardItems';
import { OrderCardFooter } from '../OrderCardFooter/OrderCardFooter';
import './OrderCard.css';

export const OrderCard = ({ order, user }) => {
  const getStatusStyle = (status) => {
    if (status === OrderStatus.DELIVERED) {
      return {
        className: 'orders__status--delivered',
        icon: <CheckCircle2 className="orders__status-icon" />,
      };
    }

    if (status === OrderStatus.PENDING) {
      return {
        className: 'orders__status--pending',
        icon: <Clock className="orders__status-icon" />,
      };
    }

    if (status === OrderStatus.SHIPPED) {
      return {
        className: 'orders__status--shipped',
        icon: <Truck className="orders__status-icon" />,
      };
    }

    if (status === OrderStatus.CANCELLED) {
      return {
        className: 'orders__status--cancelled',
        icon: <XCircle className="orders__status-icon" />,
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
    <div className="orders__card">
      <OrderCardHeader
        orderId={order.id}
        orderDate={order.date}
        total={order.total}
        status={order.status}
        statusClassName={status.className}
        statusIcon={status.icon}
      />

      <div className="orders__card-body">
        <OrderCardItems items={order.items} />
        <OrderCardFooter
          shippingAddress={order.shippingAddress}
          onDownloadInvoice={handleDownloadInvoice}
        />
      </div>
    </div>
  );
};
