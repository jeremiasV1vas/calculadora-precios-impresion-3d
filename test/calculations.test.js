import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculatePrintCosts } from '../src/utils/calculations.js';

test('Cálculo de costos con valores por defecto e inputs de pieza', () => {
  const result = calculatePrintCosts({
    filamentPrice: 20000,
    grams: 100,
    kwhPrice: 140,
    printerWatts: 120,
    hours: 2,
    minutes: 0,
    lifespanHours: 4320,
    replacementCost: 150000,
    errorMargin: 5,
    extraSupplies: 0,
    profitMultiplier: 3
  });

  // Material: (20000 / 1000) * 100 = 2000
  assert.equal(result.materialCost, 2000);

  // Luz: (120 / 1000) * 2 * 140 = 33.6
  assert.equal(result.energyCost, 33.6);

  // Desgaste: (150000 / 4320) * 2 ≈ 69.44
  assert.ok(Math.abs(result.machineWear - 69.444) < 0.01);

  // Costo sin insumos
  assert.ok(result.totalCostWithoutSupplies > 2200);

  // Total a cobrar con multiplicador x3
  assert.ok(result.totalToCharge > 6600);
  assert.ok(result.netProfit > 4400);
});

test('Manejo de valores vacíos o cero', () => {
  const result = calculatePrintCosts({});
  assert.equal(result.materialCost, 0);
  assert.equal(result.energyCost, 0);
  assert.equal(result.machineWear, 0);
  assert.equal(result.totalToCharge, 0);
  assert.equal(result.netProfit, 0);
});

test('Insumos extra se multiplican por el margen según la respuesta del usuario', () => {
  const result = calculatePrintCosts({
    extraSupplies: 1000,
    profitMultiplier: 3
  });
  // Si costo base es 0 e insumos es 1000, total a cobrar con margen x3 debe ser 3000
  assert.equal(result.extraSupplies, 1000);
  assert.equal(result.totalProductionCost, 1000);
  assert.equal(result.totalToCharge, 3000);
});
