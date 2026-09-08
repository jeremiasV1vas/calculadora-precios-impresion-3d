import React, { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';

export function NewProfileModal({ isOpen, onClose, onConfirm }) {
  const [profileName, setProfileName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!profileName.trim()) return;
    onConfirm(profileName.trim());
    setProfileName('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            <PlusCircle size={20} color="#ef4444" />
            Crear nuevo perfil
          </h3>
          <button type="button" className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="input-group">
              <label className="input-label" htmlFor="input-new-profile-name">
                Nombre del perfil o impresora
              </label>
              <input
                id="input-new-profile-name"
                type="text"
                className="input-field"
                placeholder="ej: Creality K1 Max - Taller 1"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                autoFocus
              />
              <span className="input-helper">
                Se duplicarán los parámetros actuales como base para el nuevo perfil.
              </span>
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
              disabled={!profileName.trim()}
            >
              Crear perfil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
