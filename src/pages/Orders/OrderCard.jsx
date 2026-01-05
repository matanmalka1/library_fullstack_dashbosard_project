import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ChevronRight,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';
import { OrderStatus } from '../../types';
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
      <div className="orders__card-header">
        <div className="orders__meta">
          <div>
            <p className="orders__meta-label">Order ID</p>
            <p className="orders__meta-value">#{order.id}</p>
          </div>
          <div>
            <p className="orders__meta-label">Date Placed</p>
            <p className="orders__meta-value orders__meta-value--date">
              <Calendar className="orders__meta-icon" />{" "}
              {new Date(order.date).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="orders__meta-label">Total Amount</p>
            <p className="orders__meta-value orders__meta-value--total">
              ${order.total.toFixed(2)}
            </p>
          </div>
        </div>

        <div className={`orders__status ${status.className}`}>
          {status.icon} <span>{order.status}</span>
        </div>
      </div>

      <div className="orders__card-body">
        <div className="orders__items">
          {order.items.map((item) => (
            <div key={item.bookId} className="orders__item">
              <div className="orders__item-thumb">
                <img src={item.book.coverImage} className="orders__item-img" />
              </div>
              <div className="orders__item-body">
                <h4 className="orders__item-title">{item.book.title}</h4>
                <p className="orders__item-author">{item.book.author}</p>
                <div className="orders__item-meta">
                  <span className="orders__item-qty">
                    Qty: {item.quantity}
                  </span>
                  <span className="orders__item-price">
                    ${(item.book.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <Link to={`/books/${item.bookId}`} className="orders__item-link">
                <ChevronRight className="orders__item-link-icon" />
              </Link>
            </div>
          ))}
        </div>

        <div className="orders__footer">
          <div className="orders__footer-note">
            <Truck className="orders__footer-icon" /> Delivered to:{" "}
            {order.shippingAddress}
          </div>
          <button
            onClick={handleDownloadInvoice}
            className="orders__footer-action"
          >
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};
