import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { ProfileSelector } from './components/ProfileSelector';
import { FixedCostsForm } from './components/FixedCostsForm';
import { PartDetailsForm } from './components/PartDetailsForm';
import { ProfitMarginCard } from './components/ProfitMarginCard';
import { ResultsPanel } from './components/ResultsPanel';
import { NewProfileModal } from './components/NewProfileModal';
import { SaveProductModal } from './components/SaveProductModal';
import { SavedProductsModal } from './components/SavedProductsModal';
import { calculatePrintCosts } from './utils/calculations';
import {
  getStoredProfiles,
  saveProfiles,
  getActiveProfileId,
  setActiveProfileId,
  getSavedProducts,
  saveProducts
} from './utils/storage';
import { CheckCircle2, Info } from 'lucide-react';

export function App() {
  // 1. Profiles State
  const [profiles, setProfiles] = useState(() => getStoredProfiles());
  const [activeProfileId, setActiveId] = useState(() =>
    getActiveProfileId(profiles[0]?.id || 'default-ender-3')
  );

  const activeProfile = useMemo(() => {
    return profiles.find((p) => p.id === activeProfileId) || profiles[0] || {};
  }, [profiles, activeProfileId]);

  // 2. Fixed costs form values (initialized from active profile)
  const [fixedCosts, setFixedCosts] = useState({
    filamentPrice: activeProfile.filamentPrice ?? 20000,
    kwhPrice: activeProfile.kwhPrice ?? 140,
    printerModel: activeProfile.printerModel ?? 'ender-3-v3-se',
    printerWatts: activeProfile.printerWatts ?? 120,
    lifespanHours: activeProfile.lifespanHours ?? 4320,
    replacementCost: activeProfile.replacementCost ?? 150000,
    errorMargin: activeProfile.errorMargin ?? 5,
  });

  // Currency
  const [currency, setCurrency] = useState(activeProfile.currency || 'ARS');

  // When active profile changes, reload form
  useEffect(() => {
    if (activeProfile && activeProfile.id) {
      setFixedCosts({
        filamentPrice: activeProfile.filamentPrice ?? 20000,
        kwhPrice: activeProfile.kwhPrice ?? 140,
        printerModel: activeProfile.printerModel ?? 'ender-3-v3-se',
        printerWatts: activeProfile.printerWatts ?? 120,
        lifespanHours: activeProfile.lifespanHours ?? 4320,
        replacementCost: activeProfile.replacementCost ?? 150000,
        errorMargin: activeProfile.errorMargin ?? 5,
      });
      setCurrency(activeProfile.currency || 'ARS');
    }
  }, [activeProfileId]);

  // 3. Part Details
  const [partDetails, setPartDetails] = useState({
    hours: '',
    minutes: '',
    grams: '',
    extraSupplies: ''
  });

  // 4. Profit Multiplier (default 3, as in reference)
  const [multiplier, setMultiplier] = useState(3);

  // 5. Saved Products Catalog
  const [savedProducts, setSavedProducts] = useState(() => getSavedProducts());

  // 6. Modals
  const [isNewProfileOpen, setIsNewProfileOpen] = useState(false);
  const [isSaveProductOpen, setIsSaveProductOpen] = useState(false);
  const [isSavedProductsOpen, setIsSavedProductsOpen] = useState(false);

  // 7. Toast Notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Profile Handlers
  const handleSelectProfile = (id) => {
    setActiveId(id);
    setActiveProfileId(id);
  };

  const handleUpdateProfile = () => {
    const updatedProfiles = profiles.map((p) => {
      if (p.id === activeProfileId) {
        return {
          ...p,
          ...fixedCosts,
          currency
        };
      }
      return p;
    });

    setProfiles(updatedProfiles);
    saveProfiles(updatedProfiles);
    showToast(`Perfil "${activeProfile.name}" actualizado con éxito.`);
  };

  const handleCreateProfile = (name) => {
    const newProfile = {
      id: 'profile_' + Date.now(),
      name,
      currency,
      ...fixedCosts
    };
    const updated = [...profiles, newProfile];
    setProfiles(updated);
    saveProfiles(updated);
    setActiveId(newProfile.id);
    setActiveProfileId(newProfile.id);
    showToast(`Perfil "${name}" creado exitosamente.`);
  };

  const handleDeleteProfile = (id) => {
    if (profiles.length <= 1) return;
    const remaining = profiles.filter((p) => p.id !== id);
    setProfiles(remaining);
    saveProfiles(remaining);
    const nextId = remaining[0].id;
    setActiveId(nextId);
    setActiveProfileId(nextId);
    showToast('Perfil eliminado correctamente.', 'info');
  };

  // Fixed Costs Update
  const handleFixedCostsChange = (fields) => {
    setFixedCosts((prev) => ({ ...prev, ...fields }));
  };

  // Part Details Update
  const handlePartDetailsChange = (fields) => {
    setPartDetails((prev) => ({ ...prev, ...fields }));
  };

  // Real-time calculation results
  const calculationResults = useMemo(() => {
    return calculatePrintCosts({
      filamentPrice: fixedCosts.filamentPrice,
      grams: partDetails.grams,
      kwhPrice: fixedCosts.kwhPrice,
      printerWatts: fixedCosts.printerWatts,
      hours: partDetails.hours,
      minutes: partDetails.minutes,
      lifespanHours: fixedCosts.lifespanHours,
      replacementCost: fixedCosts.replacementCost,
      errorMargin: fixedCosts.errorMargin,
      extraSupplies: partDetails.extraSupplies,
      profitMultiplier: multiplier
    });
  }, [fixedCosts, partDetails, multiplier]);

  // Product save handlers
  const handleSaveProduct = (product) => {
    const updated = [product, ...savedProducts];
    setSavedProducts(updated);
    saveProducts(updated);
    showToast(`Producto "${product.name}" guardado.`);
  };

  const handleDeleteProduct = (productId) => {
    const updated = savedProducts.filter((p) => p.id !== productId);
    setSavedProducts(updated);
    saveProducts(updated);
    showToast('Producto eliminado.', 'info');
  };

  const handleLoadProduct = (product) => {
    if (product.partDetails) {
      setPartDetails({
        hours: product.partDetails.hours || '',
        minutes: product.partDetails.minutes || '',
        grams: product.partDetails.grams || '',
        extraSupplies: product.partDetails.extraSupplies || ''
      });
    }
    if (product.calculation?.multiplier) {
      setMultiplier(product.calculation.multiplier);
    }
    setIsSavedProductsOpen(false);
    showToast(`Parámetros de "${product.name}" cargados en la calculadora.`);
  };

  return (
    <div className="app-container">
      <Header
        savedCount={savedProducts.length}
        onOpenSaved={() => setIsSavedProductsOpen(true)}
      />

      <main className="calculator-grid">
        {/* Left Column: Configuration Forms */}
        <section className="column-left">
          <ProfileSelector
            profiles={profiles}
            activeProfileId={activeProfileId}
            onSelectProfile={handleSelectProfile}
            onNewProfileClick={() => setIsNewProfileOpen(true)}
            onDeleteProfile={handleDeleteProfile}
            currency={currency}
            onCurrencyChange={setCurrency}
            onSaveProfile={handleUpdateProfile}
          />

          <FixedCostsForm
            values={fixedCosts}
            onChange={handleFixedCostsChange}
            currencyCode={currency}
          />

          <PartDetailsForm
            values={partDetails}
            onChange={handlePartDetailsChange}
            currencyCode={currency}
          />
        </section>

        {/* Right Column: Profit Margin & Results */}
        <section className="column-right">
          <ProfitMarginCard
            multiplier={multiplier}
            onChange={setMultiplier}
          />

          <ResultsPanel
            results={calculationResults}
            currencyCode={currency}
            onSaveProductClick={() => setIsSaveProductOpen(true)}
          />
        </section>
      </main>

      {/* Modals */}
      <NewProfileModal
        isOpen={isNewProfileOpen}
        onClose={() => setIsNewProfileOpen(false)}
        onConfirm={handleCreateProfile}
      />

      <SaveProductModal
        isOpen={isSaveProductOpen}
        onClose={() => setIsSaveProductOpen(false)}
        onSave={handleSaveProduct}
        currentCalculation={calculationResults}
        partDetails={partDetails}
        currencyCode={currency}
        profileName={activeProfile.name || 'Personalizado'}
      />

      <SavedProductsModal
        isOpen={isSavedProductsOpen}
        onClose={() => setIsSavedProductsOpen(false)}
        products={savedProducts}
        onDeleteProduct={handleDeleteProduct}
        onLoadProduct={handleLoadProduct}
      />

      {/* Toast Feedback */}
      {toast && (
        <aside className="toast-container" aria-live="polite">
          <div className={`toast ${toast.type}`}>
            {toast.type === 'success' ? (
              <CheckCircle2 size={18} color="#10b981" />
            ) : (
              <Info size={18} color="#38bdf8" />
            )}
            <span>{toast.message}</span>
          </div>
        </aside>
      )}
    </div>
  );
}

export default App;
