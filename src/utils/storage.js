const PROFILES_STORAGE_KEY = 'calc3d_profiles_v1';
const ACTIVE_PROFILE_KEY = 'calc3d_active_profile_id_v1';
const SAVED_PRODUCTS_KEY = 'calc3d_saved_products_v1';

export const DEFAULT_PROFILES = [
  {
    id: 'default-ender-3',
    name: 'Ender 3 V3 SE',
    currency: 'ARS',
    filamentPrice: 20000,
    kwhPrice: 140,
    printerModel: 'ender-3-v3-se',
    printerWatts: 120,
    lifespanHours: 4320,
    replacementCost: 150000,
    errorMargin: 5,
  },
  {
    id: 'default-bambu-a1',
    name: 'Bambu Lab A1 Mini',
    currency: 'ARS',
    filamentPrice: 22000,
    kwhPrice: 140,
    printerModel: 'bambu-a1-mini',
    printerWatts: 90,
    lifespanHours: 5000,
    replacementCost: 180000,
    errorMargin: 4,
  },
  {
    id: 'default-artillery',
    name: 'Artillery Genius',
    currency: 'ARS',
    filamentPrice: 20000,
    kwhPrice: 140,
    printerModel: 'artillery-genius',
    printerWatts: 120,
    lifespanHours: 4000,
    replacementCost: 120000,
    errorMargin: 6,
  }
];

export function getStoredProfiles() {
  try {
    const data = localStorage.getItem(PROFILES_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(DEFAULT_PROFILES));
      return DEFAULT_PROFILES;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PROFILES;
  } catch (err) {
    console.error('Error reading profiles from localStorage:', err);
    return DEFAULT_PROFILES;
  }
}

export function saveProfiles(profiles) {
  try {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
  } catch (err) {
    console.error('Error saving profiles to localStorage:', err);
  }
}

export function getActiveProfileId(fallbackId) {
  try {
    return localStorage.getItem(ACTIVE_PROFILE_KEY) || fallbackId;
  } catch {
    return fallbackId;
  }
}

export function setActiveProfileId(id) {
  try {
    localStorage.setItem(ACTIVE_PROFILE_KEY, id);
  } catch (err) {
    console.error('Error saving active profile ID:', err);
  }
}

export function getSavedProducts() {
  try {
    const data = localStorage.getItem(SAVED_PRODUCTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error loading saved products:', err);
    return [];
  }
}

export function saveProducts(products) {
  try {
    localStorage.setItem(SAVED_PRODUCTS_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Error saving products:', err);
  }
}
