---
Documento: 05 — Abstração de Armazenamento (Storage Strategy)
Origem: Refinado por GESTOR
Status: ✅ ATUALIZADO (Foco em Persistência Híbrida)
---

# 05 — Abstração de Armazenamento (Storage)

O ToolOptimizer CNC exige alta confiabilidade na persistência de dados (ferramentas, favoritos e cálculos) em ambientes industriais, onde a conectividade pode ser instável.

---

## 1. Estratégia de Persistência Híbrida

Diferente do ecossistema Expo que exige SQL, utilizaremos uma abordagem baseada em **Key-Value Store**, que é nativa e extremamente performática em Web e Mobile.

| Plataforma | Tecnologia | Persistência |
|---|---|---|
| **Web / PWA** | `localStorage` | Persiste no navegador do usuário |
| **Desktop (Electron)** | `localStorage` | Persiste no arquivo de dados do app |
| **Mobile (Capacitor)** | `@capacitor/preferences` | Persiste no armazenamento nativo do Android |

---

## 2. Abstração: O Serviço de Storage

Para evitar o uso direto de `localStorage` em todo o código, utilizaremos um serviço que detecta a plataforma e usa a melhor API disponível.

### Exemplo de Implementação (`src/services/storage.ts`):

```typescript
import { Preferences } from '@capacitor/preferences';
import { Device } from '@capacitor/device';

export const StorageService = {
  async set(key: string, value: any) {
    const stringValue = JSON.stringify(value);
    
    // Mobile usa Plugin Nativo para maior segurança
    const info = await Device.getInfo();
    if (info.platform !== 'web') {
      await Preferences.set({ key, value: stringValue });
    } else {
      // Web/Desktop usa localStorage padrão
      localStorage.setItem(key, stringValue);
    }
  },

  async get(key: string) {
    const info = await Device.getInfo();
    let value: string | null;

    if (info.platform !== 'web') {
      const { value: val } = await Preferences.get({ key });
      value = val;
    } else {
      value = localStorage.getItem(key);
    }

    return value ? JSON.parse(value) : null;
  }
};
```

---

## 3. Estrutura de Dados (JSON)

Os dados são armazenados como objetos JSON para facilitar a evolução do schema sem `migrations` complexas.

**Chaves Principais:**
- `tooloptimizer:favoritos` -> Lista de ferramentas favoritas.
- `tooloptimizer:historico` -> Últimas 20 simulações realizadas.
- `tooloptimizer:settings` -> Preferências de tema e unidade de medida.

---

## 4. Por que não usar SQLite agora?

Como **GESTOR**, decidi manter a simplicidade do MVP:
1.  **Velocidade:** O `localStorage` e `@capacitor/preferences` são síncronos/quase-síncronos e fáceis de depurar.
2.  **Manutenibilidade:** Não exige SQL complexo ou migrations de banco de dados no estágio inicial.
3.  **Confiabilidade:** Em ambientes CNC, o volume de dados (favoritos/histórico) é pequeno o suficiente para ser gerenciado via Key-Value sem perda de performance.

---

## ✅ Checklist de conclusão desta etapa

- [ ] Plugin `@capacitor/preferences` instalado.
- [ ] Serviço de abstração `StorageService` criado.
- [ ] Hook `useCalculo` atualizado para ler/gravar via `StorageService`.
- [ ] Verificação: Os dados salvos no APK persistem após fechar e abrir o app.
- [ ] Commit: `git commit -m "feat: implement unified storage service (Capacitor)"`
