import React from 'react';
import { X, Trash2, ArrowUpRight, Package, Calendar } from 'lucide-react';
import { formatCurrency } from '../constants/currencies';

export function SavedProductsModal({
  isOpen,
  onClose,
  products,
  onDeleteProduct,
  onLoadProduct
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            <Package size={20} color="#ef4444" />
            Productos guardados ({products.length})
          </h3>
          <button type="button" className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {products.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#64748b'
              }}
            >
              <Package size={42} strokeWidth={1.5} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <p style={{ fontSize: '1rem', fontWeight: 500, color: '#94a3b8' }}>
                No tienes productos guardados todavía.
              </p>
              <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>
                Calcula una pieza y pulsa "Guardar como producto" para conservarla en tu catálogo local.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {products.map((item) => {
                const dateStr = item.date ? new Date(item.date).toLocaleDateString() : '';
                return (
                  <div
                    key={item.id}
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '10px',
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '1rem' }}>
                          {item.name}
                        </span>
                        {item.category && (
                          <span
                            style={{
                              fontSize: '0.72rem',
                              padding: '2px 8px',
                              borderRadius: '999px',
                              background: 'rgba(255,255,255,0.08)',
                              color: '#94a3b8'
                            }}
                          >
                            {item.category}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', gap: '12px' }}>
                        <span>⚖️ {item.partDetails?.grams || 0}g</span>
                        <span>⏱️ {item.partDetails?.hours || 0}h {item.partDetails?.minutes || 0}m</span>
                        {dateStr && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={13} /> {dateStr}
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                          {formatCurrency(item.calculation?.totalToCharge, item.currencyCode)}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#10b981' }}>
                          +{formatCurrency(item.calculation?.netProfit, item.currencyCode)} neta
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          className="profile-action-btn"
                          title="Cargar estos valores en la calculadora"
                          onClick={() => onLoadProduct(item)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            padding: '6px 10px',
                            borderRadius: '6px'
                          }}
                        >
                          <ArrowUpRight size={16} />
                        </button>
                        <button
                          type="button"
                          className="profile-action-btn danger"
                          title="Eliminar producto"
                          onClick={() => onDeleteProduct(item.id)}
                          style={{ padding: '6px 10px' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-primary-accent"
            style={{ width: 'auto', marginTop: 0 }}
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
