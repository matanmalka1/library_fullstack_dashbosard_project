import React from 'react';
import { Truck } from 'lucide-react';
import './OrderCardFooter.css';

export const OrderCardFooter = ({ shippingAddress, onDownloadInvoice }) => (
  <div className="orders__footer">
    <div className="orders__footer-note">
      <Truck className="orders__footer-icon" /> Delivered to: {shippingAddress}
    </div>
    <button onClick={onDownloadInvoice} className="orders__footer-action">
      Download Invoice
    </button>
  </div>
);
