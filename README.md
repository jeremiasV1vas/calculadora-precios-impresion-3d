# 🖨️ Calculadora de Costos de Impresión 3D

Una aplicación moderna, precisa y de código abierto para calcular el costo real de producción y el precio sugerido de venta de piezas impresas en 3D (FDM y Resina).

Diseñada para funcionar tanto en el navegador como aplicación de escritorio nativa en **Windows** y **Linux** mediante Electron.

---

## ✨ Características Principales

- ⚡ **Cálculo en Tiempo Real**: Visualización instantánea del desglose de costos conforme se ingresan los parámetros.
- ⚙️ **Costos Fijos y Amortización**:
  - Costo de filamento por kilogramo.
  - Consumo eléctrico según el modelo de impresora (con catálogo de potencias estimadas en Watts para Creality, Bambu Lab, Prusa, Artillery, etc.).
  - Amortización y desgaste del equipo (vida útil en horas y costo de repuestos).
  - Margen de error porcentual (purgas, fallas y pruebas).
- 🧩 **Detalle de la Pieza**:
  - Tiempo de impresión (horas y minutos).
  - Gramos de filamento consumidos.
  - Insumos adicionales (tornillos, insertos roscados, imanes, pintura, packaging, etc.).
- 📈 **Márgenes de Ganancia**:
  - Multiplicadores rápidos (`×2`, `×2.5`, `×3`, `×3.5`, `×4`, `×5`).
  - Multiplicador personalizado configurable.
  - Guía integrada de referencias comerciales (mayorista, minorista, piezas chicas, volumen).
- 🗂️ **Gestor de Perfiles de Impresora**:
  - Crea, modifica y guarda configuraciones independientes para cada máquina de tu taller.
  - Persistencia local en el dispositivo (sin necesidad de servidores externos ni cuentas).
- 📦 **Catálogo Local de Productos Guardados**:
  - Guarda cotizaciones frecuentes con fecha, peso, tiempo y margen.
  - Recarga cualquier producto guardado con un clic para recalcular o ajustar precios.
- 🌎 **Soporte Multimoneda**:
  - ARS (Pesos argentinos), USD (Dólares), EUR (Euros), MXN, CLP, COP, BRL, PEN, UYU.
- 📋 **Exportación Rápida**:
  - Copia el desglose de la cotización formateado al portapapeles para enviarlo por WhatsApp o correo a clientes.

---

## 📐 Fórmulas de Cálculo

El motor de cálculo utiliza el siguiente desglose matemático:

1. **Tiempo total en horas ($T$)**:
   $$T = \text{Horas} + \frac{\text{Minutos}}{60}$$

2. **Costo de Material**:
   $$\text{Costo Material} = \left(\frac{\text{Precio Filamento por kg}}{1000}\right) \times \text{Gramos}$$

3. **Costo de Energía (Luz)**:
   $$\text{Costo Electricidad} = \left(\frac{\text{Potencia en Watts}}{1000}\right) \times T \times \text{Precio del kWh}$$

4. **Desgaste de la Máquina (Amortización)**:
   $$\text{Desgaste Máquina} = \left(\frac{\text{Costo de Repuestos}}{\text{Vida Útil en Horas}}\right) \times T$$

5. **Costo Base**:
   $$\text{Costo Base} = \text{Costo Material} + \text{Costo Electricidad} + \text{Desgaste Máquina}$$

6. **Margen de Error**:
   $$\text{Margen de Error (\$)} = \text{Costo Base} \times \left(\frac{\text{Margen de Error (\%)}}{100}\right)$$

7. **Costo de Producción Total**:
   $$\text{Costo Producción} = \text{Costo Base} + \text{Margen de Error (\$)} + \text{Insumos Extra}$$

8. **Total a Cobrar**:
   $$\text{Total a Cobrar} = \text{Costo Producción} \times \text{Multiplicador de Ganancia}$$

---

## 🚀 Instalación y Uso

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18 o superior.
- `npm` (incluido con Node.js).

### Clonar el Repositorio

```bash
git clone https://github.com/jeremiasV1vas/calculadora-precios-impresion-3d.git
cd calculadora-precios-impresion-3d
npm install
```

### Ejecutar en Desarrollo (Navegador)

Inicia el servidor local de Vite:

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador web.

### Ejecutar como Aplicación de Escritorio (Desktop)

Inicia la aplicación nativa en Windows o Linux usando Electron:

```bash
npm run electron:dev
```

### Ejecutar Pruebas Unitarias

Ejecuta la suite de pruebas del motor de cálculo:

```bash
npm test
```

### Compilar para Producción

Genera el paquete optimizado de la aplicación:

```bash
npm run build
```

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Entorno de Escritorio**: [Electron](https://www.electronjs.org/)
- **Íconos**: [Lucide React](https://lucide.dev/)
- **Estilos**: Vanilla CSS con tokens de diseño, Dark Theme y Glassmorphism
- **Testing**: Node.js Test Runner nativo (`node:test`)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
