import { openDB } from 'idb';
import type { IDBPDatabase } from 'idb';
import type { Material, AppConfig } from './types.js';
import { FACTORY_MATERIALS } from './materials.js';

const DB_NAME = 'fenix_db';
const DB_VERSION = 2; // Incremented for config store
const STORE_MATERIALS = 'materials';
const STORE_TOOLS = 'tools';
const STORE_CONFIG = 'config';

export let dbPromise: Promise<IDBPDatabase<any>> | null = null;

export function initDB(): Promise<IDBPDatabase<any>> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_MATERIALS)) {
          db.createObjectStore(STORE_MATERIALS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORE_TOOLS)) {
          db.createObjectStore(STORE_TOOLS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORE_CONFIG)) {
          db.createObjectStore(STORE_CONFIG, { keyPath: 'id' });
        }
      }
    });
  }
  return dbPromise;
}

export async function closeDB(): Promise<void> {
  if (dbPromise) {
    const db = await dbPromise;
    db.close();
    dbPromise = null;
  }
}

/**
 * Retorna todos os materiais disponíveis: os imutáveis de fábrica
 * sobrepostos pelos customizados do usuário.
 */
export async function getAllMaterials(): Promise<Material[]> {
  const db = await initDB();
  const customMaterials = await db.getAll(STORE_MATERIALS);
  
  // Factory items are base.
  const allMaterials = [...FACTORY_MATERIALS];
  
  // Se o usuário editar um de fábrica, ele salva com isCustom: true e o mesmo ID?
  // Na regra do negócio: "Os materiais de fábrica são a semente imutável; o cadastro do operador entra por cima."
  for (const custom of customMaterials) {
    const index = allMaterials.findIndex(m => m.id === custom.id);
    if (index >= 0) {
      allMaterials[index] = custom;
    } else {
      allMaterials.push(custom);
    }
  }
  
  return allMaterials;
}

export async function getMaterial(id: string): Promise<Material | undefined> {
  const db = await initDB();
  const custom = await db.get(STORE_MATERIALS, id);
  if (custom) return custom;
  return FACTORY_MATERIALS.find(m => m.id === id);
}

export async function saveMaterial(material: Material): Promise<void> {
  const db = await initDB();
  // Força flag custom = true para diferenciar
  const materialToSave = { ...material, isCustom: true };
  await db.put(STORE_MATERIALS, materialToSave);
}

export async function deleteCustomMaterial(id: string): Promise<void> {
  const db = await initDB();
  await db.delete(STORE_MATERIALS, id);
}

/**
 * Reverte um material de fábrica ao seu estado original apagando a customização no IndexedDB.
 */
export async function resetMaterial(id: string): Promise<void> {
  const db = await initDB();
  await db.delete(STORE_MATERIALS, id);
}

/**
 * Reverte todos os materiais de fábrica aos seus estados originais.
 * Materiais criados pelo operador não são afetados.
 */
export async function resetAllFactoryMaterials(): Promise<void> {
  const db = await initDB();
  for (const fm of FACTORY_MATERIALS) {
    await db.delete(STORE_MATERIALS, fm.id);
  }
}

/**
 * Ferramentas da oficina (instâncias criadas pelo operador).
 */
export async function getAllTools(): Promise<import('./types.js').ToolInstance[]> {
  const db = await initDB();
  return db.getAll(STORE_TOOLS);
}

export async function getTool(id: string): Promise<import('./types.js').ToolInstance | undefined> {
  const db = await initDB();
  return db.get(STORE_TOOLS, id);
}

export async function saveTool(tool: import('./types.js').ToolInstance): Promise<void> {
  const db = await initDB();
  await db.put(STORE_TOOLS, tool);
}

export async function deleteTool(id: string): Promise<void> {
  const db = await initDB();
  await db.delete(STORE_TOOLS, id);
}

export const DEFAULT_CONFIG: AppConfig = {
  safetyMargin: 100,
  hssFeedPercent: 10,
  hssPeckDivisor: 25,
  hssPeckCapMm: 0.8
};

export async function getConfig(): Promise<AppConfig> {
  const db = await initDB();
  const config = await db.get(STORE_CONFIG, 'main');
  if (config) {
    return { ...DEFAULT_CONFIG, ...config };
  }
  return DEFAULT_CONFIG;
}

export async function saveConfig(config: Partial<AppConfig>): Promise<void> {
  const current = await getConfig();
  const db = await initDB();
  await db.put(STORE_CONFIG, { ...current, ...config, id: 'main' });
}

