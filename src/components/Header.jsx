import React from 'react';
import { Box, Archive, Sparkles } from 'lucide-react';

export function Header({ savedCount, onOpenSaved }) {
  return (
    <header className="app-header">
      <div className="app-title-row">
        <div className="app-title-group">
          <h1 className="app-title">
            <Box size={32} color="#ef4444" strokeWidth={2.5} />
            Calculadora 3D
            <span className="app-title-badge">Desktop Edition</span>
          </h1>
          <p className="app-subtitle">
            Calculá el costo real de tus impresiones y el precio sugerido de venta.
          </p>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="btn-history"
            onClick={onOpenSaved}
            title="Ver productos cotizados y guardados"
            id="btn-saved-products"
          >
            <Archive size={16} />
            Productos guardados ({savedCount})
          </button>
        </div>
      </div>
    </header>
  );
}
