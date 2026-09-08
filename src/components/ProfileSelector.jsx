import React from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { CURRENCIES } from '../constants/currencies';

export function ProfileSelector({
  profiles,
  activeProfileId,
  onSelectProfile,
  onNewProfileClick,
  onDeleteProfile,
  currency,
  onCurrencyChange,
  onSaveProfile
}) {
  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  return (
    <div className="calc-card profile-card">
      <div className="card-header">
        <span className="card-title" style={{ fontSize: '1rem' }}>
          Perfil
        </span>
        <div className="profile-actions-bar">
          <button
            type="button"
            className="profile-action-btn"
            onClick={onNewProfileClick}
            id="btn-new-profile"
          >
            <Plus size={15} /> Nuevo
          </button>
          {profiles.length > 1 && (
            <button
              type="button"
              className="profile-action-btn danger"
              onClick={() => onDeleteProfile(activeProfileId)}
              title="Eliminar perfil actual"
              id="btn-delete-profile"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="form-grid-2">
        <div className="input-group">
          <select
            id="select-active-profile"
            className="select-field"
            value={activeProfileId}
            onChange={(e) => onSelectProfile(e.target.value)}
          >
            {profiles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <select
            id="select-currency"
            className="select-field"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
          >
            {CURRENCIES.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        className="btn-primary-accent"
        onClick={onSaveProfile}
        id="btn-update-profile"
      >
        <Save size={18} />
        Actualizar perfil
      </button>
    </div>
  );
}
