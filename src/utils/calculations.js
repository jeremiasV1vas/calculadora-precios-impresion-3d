/**
 * Realiza los cálculos de costos de impresión 3D
 */
export function calculatePrintCosts({
  filamentPrice = 0,
  grams = 0,
  kwhPrice = 0,
  printerWatts = 0,
  hours = 0,
  minutes = 0,
  lifespanHours = 0,
  replacementCost = 0,
  errorMargin = 0,
  extraSupplies = 0,
  profitMultiplier = 2
}) {
  const fPrice = Math.max(0, Number(filamentPrice) || 0);
  const gWeight = Math.max(0, Number(grams) || 0);
  const kwh = Math.max(0, Number(kwhPrice) || 0);
  const watts = Math.max(0, Number(printerWatts) || 0);
  const h = Math.max(0, Number(hours) || 0);
  const m = Math.max(0, Number(minutes) || 0);
  const lifespan = Math.max(0, Number(lifespanHours) || 0);
  const repCost = Math.max(0, Number(replacementCost) || 0);
  const errMarginPercent = Math.max(0, Number(errorMargin) || 0);
  const extras = Math.max(0, Number(extraSupplies) || 0);
  const multiplier = Math.max(1, Number(profitMultiplier) || 1);

  // Tiempo total en horas decimales
  const totalHours = h + (m / 60);

  // 1. Precio material
  const materialCost = (fPrice / 1000) * gWeight;

  // 2. Precio luz (energía)
  const energyKwhUsed = (watts / 1000) * totalHours;
  const energyCost = energyKwhUsed * kwh;

  // 3. Desgaste de máquina (amortización y repuestos)
  const machineWear = lifespan > 0 ? (repCost / lifespan) * totalHours : 0;

  // Subtotal base
  const baseCost = materialCost + energyCost + machineWear;

  // 4. Margen de error (fallos de impresión, calibración, purgas)
  const errorMarginCost = baseCost * (errMarginPercent / 100);

  // 5. Costo total sin insumos
  const totalCostWithoutSupplies = baseCost + errorMarginCost;

  // 6. Costo total de producción (incluyendo insumos)
  const totalProductionCost = totalCostWithoutSupplies + extras;

  // 7. Total a cobrar con margen de ganancia aplicado
  const totalToCharge = totalProductionCost * multiplier;

  // Ganancia neta estimada
  const netProfit = totalToCharge - totalProductionCost;

  return {
    totalHours,
    materialCost,
    energyCost,
    machineWear,
    errorMarginCost,
    totalCostWithoutSupplies,
    extraSupplies: extras,
    totalProductionCost,
    totalToCharge,
    netProfit,
    multiplier
  };
}
