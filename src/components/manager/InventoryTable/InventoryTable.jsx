
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import './InventoryTable.css';

export const InventoryTable = ({ books, onEdit, onDelete }) => (
  <div className="inventory-table">
    <div className="inventory-table__header">
      <h2 className="inventory-table__title">Master Catalog</h2>
    </div>
    <div className="inventory-table__scroll">
      <table className="inventory-table__table">
        <thead>
          <tr className="inventory-table__head-row">
            <th className="inventory-table__cell inventory-table__cell--head">Book Details</th>
            <th className="inventory-table__cell inventory-table__cell--head">Price</th>
            <th className="inventory-table__cell inventory-table__cell--head">Stock</th>
            <th className="inventory-table__cell inventory-table__cell--head inventory-table__cell--right">Actions</th>
          </tr>
        </thead>
        <tbody className="inventory-table__body">
          {books.map(b => (
            <tr key={b.id} className="inventory-table__row">
              <td className="inventory-table__cell inventory-table__cell--details">
                <img src={b.coverImage} className="inventory-table__cover" />
                <div>
                  <p className="inventory-table__book-title">{b.title}</p>
                  <p className="inventory-table__book-author">{b.author}</p>
                </div>
              </td>
              <td className="inventory-table__cell inventory-table__price">${b.price.toFixed(2)}</td>
              <td className="inventory-table__cell">
                <span className={`inventory-table__stock ${b.stockQuantity <= 5 ? 'is-low' : 'is-ok'}`}>
                  {b.stockQuantity} units
                </span>
              </td>
              <td className="inventory-table__cell inventory-table__cell--right">
                <div className="inventory-table__actions">
                  <button onClick={() => onEdit(b)} className="inventory-table__action inventory-table__action--edit"><Edit className="inventory-table__action-icon" /></button>
                  <button onClick={() => onDelete(b.id)} className="inventory-table__action inventory-table__action--delete"><Trash2 className="inventory-table__action-icon" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
