import React, { useState } from 'react';
import { X, PackagePlus } from 'lucide-react';
import { formatCurrency } from '../constants/currencies';

export function SaveProductModal({
  isOpen,
  onClose,
  onSave,
  currentCalculation,
  partDetails,
  currencyCode,
  profileName
}) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName.trim()) return;

    const newProduct = {
      id: 'prod_' + Date.now(),
      name: productName.trim(),
      category: category.trim() || 'General',
      date: new Date().toISOString(),
      profileName,
      currencyCode,
      partDetails: { ...partDetails },
      calculation: { ...currentCalculation },
    };

    onSave(newProduct);
    setProductName('');
    setCategory('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            <PackagePlus size={20} color="#ef4444" />
            Guardar como producto
          </h3>
          <button type="button" className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="input-group">
              <label className="input-label" htmlFor="input-product-name">
                Nombre de la pieza o producto
              </label>
              <input
                id="input-product-name"
                type="text"
                className="input-field"
                placeholder="ej: Soporte para Auriculares RGB"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="input-product-category">
                Categoría / Etiqueta (opcional)
              </label>
              <input
                id="input-product-category"
                type="text"
                className="input-field"
                placeholder="ej: Decoración, Repuestos, Cosplay"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div
              style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '14px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {partDetails.grams}g • {partDetails.hours}h {partDetails.minutes}m
                </div>
                <div style={{ fontSize: '0.85rem', color: '#f8fafc', fontWeight: 600 }}>
                  Perfil: {profileName}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: 700 }}>
                  TOTAL A COBRAR
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                  {formatCurrency(currentCalculation.totalToCharge, currencyCode)}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="profile-action-btn"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary-accent"
              style={{ width: 'auto', marginTop: 0 }}
              disabled={!productName.trim()}
            >
              Guardar producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
