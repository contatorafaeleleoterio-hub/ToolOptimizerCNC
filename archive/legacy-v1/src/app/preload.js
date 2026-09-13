const { contextBridge } = require('electron');

// Expor APIs mínimas (sistema funciona offline-first com cálculos locais)
contextBridge.exposeInMainWorld('api', {
  version: '2.0.0',
  platform: process.platform
});

console.log('[Preload] API exposed to renderer - ToolOptimizer CNC v2.0');
