export const CURRENCIES = [
  { code: 'ARS', label: 'Pesos argentinos (ARS)', symbol: 'AR$', locale: 'es-AR' },
  { code: 'USD', label: 'Dólares estadounidenses (USD)', symbol: 'US$', locale: 'en-US' },
  { code: 'EUR', label: 'Euros (EUR)', symbol: '€', locale: 'es-ES' },
  { code: 'MXN', label: 'Pesos mexicanos (MXN)', symbol: 'MX$', locale: 'es-MX' },
  { code: 'CLP', label: 'Pesos chilenos (CLP)', symbol: 'CLP$', locale: 'es-CL' },
  { code: 'COP', label: 'Pesos colombianos (COP)', symbol: 'COP$', locale: 'es-CO' },
  { code: 'BRL', label: 'Reales brasileños (BRL)', symbol: 'R$', locale: 'pt-BR' },
  { code: 'PEN', label: 'Soles peruanos (PEN)', symbol: 'S/', locale: 'es-PE' },
  { code: 'UYU', label: 'Pesos uruguayos (UYU)', symbol: '$U', locale: 'es-UY' }
];

export const formatCurrency = (value, currencyCode = 'ARS') => {
  const currency = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];
  const num = Number(value) || 0;
  
  // Format with standard thousands and decimals
  return `${currency.symbol} ${num.toLocaleString(currency.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
