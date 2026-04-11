import { describe, it, expect, beforeEach } from 'vitest';
import { useFavoritesStore } from '@/store/favorites-store';
import { TipoUsinagem } from '@/types';
import type { ResultadoUsinagem, Ferramenta, ParametrosUsinagem } from '@/types';

const MOCK_FERRAMENTA: Ferramenta = {
  tipo: 'toroidal',
  diametro: 10,
  numeroArestas: 4,
  balanco: 30,
  raioQuina: 1.0,
};

const MOCK_PARAMETROS: ParametrosUsinagem = { ap: 2, ae: 5, fz: 0.1, vc: 100 };

const MOCK_RESULTADO: ResultadoUsinagem = {
  rpm: 3183,
  avanco: 1273,
  potenciaCorte: 0.85,
  potenciaMotor: 0.68,
  torque: 2.04,
  mrr: 12.7,
  vcReal: 100,
  fzEfetivo: 0.1,
  seguranca: { nivel: 'verde', avisos: [], razaoLD: 3.0, ctf: 1 },
  powerHeadroom: 95,
  healthScore: 80,
};

function makeFavData(overrides?: {
  materialId?: number;
  tipoOperacao?: TipoUsinagem;
  ferramentaTipo?: Ferramenta['tipo'];
}) {
  return {
    materialId: overrides?.materialId ?? 2,
    materialNome: 'Aço 1045',
    tipoOperacao: overrides?.tipoOperacao ?? TipoUsinagem.DESBASTE,
    ferramenta: { ...MOCK_FERRAMENTA, tipo: overrides?.ferramentaTipo ?? 'toroidal' } as Ferramenta,
    parametros: { ...MOCK_PARAMETROS },
    resultado: { ...MOCK_RESULTADO },
    safetyFactor: 0.8,
  };
}

describe('FavoritesStore', () => {
  beforeEach(() => {
    // Reset state between tests
    useFavoritesStore.setState({ favorites: [] });
  });

  it('starts with empty favorites', () => {
    expect(useFavoritesStore.getState().favorites).toHaveLength(0);
  });

  it('addFavorite saves complete snapshot with all fields', () => {
    useFavoritesStore.getState().addFavorite(makeFavData());
    const favs = useFavoritesStore.getState().favorites;
    expect(favs).toHaveLength(1);
    const fav = favs[0];
    expect(fav.id).toBeTruthy();
    expect(fav.timestamp).toBeTruthy();
    expect(new Date(fav.timestamp).getTime()).toBeGreaterThan(0);
    expect(fav.materialId).toBe(2);
    expect(fav.materialNome).toBe('Aço 1045');
    expect(fav.tipoOperacao).toBe(TipoUsinagem.DESBASTE);
    expect(fav.ferramenta.tipo).toBe('toroidal');
    expect(fav.parametros.vc).toBe(100);
    expect(fav.resultado.rpm).toBe(3183);
    expect(fav.safetyFactor).toBe(0.8);
    expect(fav.editedAt).toBeNull();
    expect(fav.userNote).toBe('');
  });

  it('removeFavorite removes by id', () => {
    useFavoritesStore.getState().addFavorite(makeFavData());
    const favs = useFavoritesStore.getState().favorites;
    expect(favs).toHaveLength(1);
    const id = favs[0].id;
    useFavoritesStore.getState().removeFavorite(id);
    expect(useFavoritesStore.getState().favorites).toHaveLength(0);
  });

  it('updateFavorite updates parametros, resultado and sets editedAt', () => {
    useFavoritesStore.getState().addFavorite(makeFavData());
    const id = useFavoritesStore.getState().favorites[0].id;
    const newParams = { ...MOCK_PARAMETROS, vc: 200 };
    const newResultado = { ...MOCK_RESULTADO, rpm: 6366 };
    useFavoritesStore.getState().updateFavorite(id, {
      parametros: newParams,
      resultado: newResultado,
    });
    const updated = useFavoritesStore.getState().favorites[0];
    expect(updated.parametros.vc).toBe(200);
    expect(updated.resultado.rpm).toBe(6366);
    expect(updated.editedAt).toBeTruthy();
    expect(new Date(updated.editedAt!).getTime()).toBeGreaterThan(0);
  });

  it('getByCombo returns most recent favorite for the combo', () => {
    useFavoritesStore.getState().addFavorite(makeFavData());
    // Add second with same combo (different rpm to distinguish)
    const second = makeFavData();
    second.resultado = { ...MOCK_RESULTADO, rpm: 9999 };
    useFavoritesStore.getState().addFavorite(second);

    const found = useFavoritesStore.getState().getByCombo(2, TipoUsinagem.DESBASTE, 'toroidal');
    expect(found).toBeDefined();
    // Most recent = last added
    expect(found!.resultado.rpm).toBe(9999);
  });

  it('getByCombo returns undefined when no match', () => {
    useFavoritesStore.getState().addFavorite(makeFavData());
    const found = useFavoritesStore.getState().getByCombo(99, TipoUsinagem.ACABAMENTO, 'esferica');
    expect(found).toBeUndefined();
  });

  it('enforces FIFO limit at 50 favorites', () => {
    // Add 50 favorites
    for (let i = 0; i < 50; i++) {
      const data = makeFavData({ materialId: i + 1 });
      data.materialNome = `Material ${i + 1}`;
      useFavoritesStore.getState().addFavorite(data);
    }
    expect(useFavoritesStore.getState().favorites).toHaveLength(50);
    // First entry should be materialId=1
    expect(useFavoritesStore.getState().favorites[0].materialId).toBe(1);

    // Add 51st — should remove materialId=1 (oldest)
    useFavoritesStore.getState().addFavorite({ ...makeFavData({ materialId: 99 }), materialNome: 'Extra' });
    const favs = useFavoritesStore.getState().favorites;
    expect(favs).toHaveLength(50);
    expect(favs[0].materialId).toBe(2); // materialId=1 was removed
    expect(favs[49].materialId).toBe(99); // newest is last
  });

  it('persists favorites in localStorage (persist key present)', () => {
    useFavoritesStore.getState().addFavorite(makeFavData());
    // Zustand persist writes to localStorage synchronously in tests
    const raw = localStorage.getItem('fenix_favorites_v1');
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    expect(parsed.state.favorites).toHaveLength(1);
  });

  it('isFavorited returns true when combo exists', () => {
    useFavoritesStore.getState().addFavorite(makeFavData());
    expect(
      useFavoritesStore.getState().isFavorited(2, TipoUsinagem.DESBASTE, 'toroidal')
    ).toBe(true);
  });

  it('isFavorited returns false when combo does not exist', () => {
    useFavoritesStore.getState().addFavorite(makeFavData());
    expect(
      useFavoritesStore.getState().isFavorited(2, TipoUsinagem.ACABAMENTO, 'toroidal')
    ).toBe(false);
    expect(
      useFavoritesStore.getState().isFavorited(99, TipoUsinagem.DESBASTE, 'toroidal')
    ).toBe(false);
    expect(
      useFavoritesStore.getState().isFavorited(2, TipoUsinagem.DESBASTE, 'esferica')
    ).toBe(false);
  });
});
