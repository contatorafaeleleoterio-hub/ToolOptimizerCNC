import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import 'fake-indexeddb/auto'; // Polyfill para rodar no Node
import { 
  initDB, 
  closeDB, 
  getAllMaterials, 
  getMaterial, 
  saveMaterial, 
  deleteCustomMaterial,
  getConfig,
  saveConfig,
  DEFAULT_CONFIG
} from '../storage.js';
import type { Material } from '../types.js';
import { FACTORY_MATERIALS } from '../materials.js';

describe('Storage (IndexedDB Wrapper)', () => {
  beforeEach(async () => {
    // Garante que o banco seja inicializado e esteja limpo
    const db = await initDB();
    await db.clear('materials');
    await db.clear('config');
  });

  afterEach(async () => {
    await closeDB();
  });

  it('deve retornar os materiais de fábrica inicialmente', async () => {
    const materials = await getAllMaterials();
    expect(materials.length).toBeGreaterThanOrEqual(FACTORY_MATERIALS.length);
    const m = materials.find(x => x.id === '1045');
    expect(m).toBeDefined();
    expect(m!.isCustom).toBe(false);
  });

  it('deve inserir um material customizado e lista-lo junto com os de fábrica', async () => {
    const newMat: Material = {
      id: 'custom-1',
      name: 'Aço Ferramenta X',
      isoClass: 'P',
      kc1_1: 1850,
      mc: 0.24,
      vcReference: 110,
      isCustom: false // Será forçado para true pela camada
    };

    await saveMaterial(newMat);
    const materials = await getAllMaterials();
    
    const saved = materials.find(m => m.id === 'custom-1');
    expect(saved).toBeDefined();
    expect(saved!.isCustom).toBe(true);
    expect(saved!.kc1_1).toBe(1850);
  });

  it('deve sobrescrever um material de fábrica localmente', async () => {
    const factory1045 = FACTORY_MATERIALS.find(m => m.id === '1045')!;
    const edited1045: Material = {
      ...factory1045,
      kc1_1: 1600, // Alterado
    };

    await saveMaterial(edited1045);
    const m = await getMaterial('1045');
    
    expect(m).toBeDefined();
    expect(m!.kc1_1).toBe(1600);
    expect(m!.isCustom).toBe(true);
  });

  it('deve reverter para o material de fábrica ao deletar a edição customizada', async () => {
    const factory1045 = FACTORY_MATERIALS.find(m => m.id === '1045')!;
    const edited1045: Material = { ...factory1045, kc1_1: 1600 };
    await saveMaterial(edited1045);
    
    await deleteCustomMaterial('1045');
    
    const m = await getMaterial('1045');
    expect(m).toBeDefined();
    expect(m!.kc1_1).toBe(1500); // Voltou ao de fábrica
    expect(m!.isCustom).toBe(false);
  });

  describe('Configurações Globais (AppConfig)', () => {
    it('deve retornar a configuração padrão se o banco estiver vazio', async () => {
      const config = await getConfig();
      expect(config).toEqual(DEFAULT_CONFIG);
      expect(config.safetyMargin).toBe(100);
    });

    it('deve salvar e carregar as edições de configuração', async () => {
      await saveConfig({ safetyMargin: 85, hssFeedPercent: 12 });
      
      const config = await getConfig();
      expect(config.safetyMargin).toBe(85);
      expect(config.hssFeedPercent).toBe(12);
      
      // Os outros devem permanecer no padrão
      expect(config.hssPeckDivisor).toBe(DEFAULT_CONFIG.hssPeckDivisor);
    });
  });
});

