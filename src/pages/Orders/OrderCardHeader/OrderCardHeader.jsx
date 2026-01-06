import React from 'react';
import { Calendar } from 'lucide-react';
import './OrderCardHeader.css';

export const OrderCardHeader = ({
  orderId,
  orderDate,
  total,
  status,
  statusClassName,
  statusIcon,
}) => (
  <div className="orders__card-header">
    <div className="orders__meta">
      <div>
        <p className="orders__meta-label">Order ID</p>
        <p className="orders__meta-value">#{orderId}</p>
      </div>
      <div>
        <p className="orders__meta-label">Date Placed</p>
        <p className="orders__meta-value orders__meta-value--date">
          <Calendar className="orders__meta-icon" />{' '}
          {new Date(orderDate).toLocaleDateString()}
        </p>
      </div>
      <div>
        <p className="orders__meta-label">Total Amount</p>
        <p className="orders__meta-value orders__meta-value--total">
          ${total.toFixed(2)}
        </p>
      </div>
    </div>

    <div className={`orders__status ${statusClassName}`}>
      {statusIcon} <span>{status}</span>
    </div>
  </div>
);
