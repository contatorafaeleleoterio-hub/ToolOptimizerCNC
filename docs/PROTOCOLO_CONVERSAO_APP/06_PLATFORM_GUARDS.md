---
Documento: 06 — Platform Guards (Capacitor Edition)
Origem: Refinado por GESTOR
Status: ✅ ATUALIZADO (Foco em Híbrido Web/Native)
---

# 06 — Platform Guards (Capacitor)

No ToolOptimizer CNC, o mesmo código-fonte roda na Web, no Desktop (Electron) e no Mobile (Android). Para evitar erros de "API não encontrada", utilizamos **Guards de Plataforma**.

---

## 1. Identificando a Plataforma

Diferente do React Native, no Capacitor usamos a API nativa ou verificamos a existência do objeto global `Capacitor`.

### Utilidade Recomendada (`src/utils/platform.ts`):

```typescript
import { Capacitor } from '@capacitor/core';

export const isNative = Capacitor.isNativePlatform(); // true se for iOS/Android
export const platform = Capacitor.getPlatform(); // 'web', 'android', 'ios' ou 'electron'
```

---

## 2. Guards por Funcionalidade

### Splash Screen & Status Bar (Somente Mobile)

Estes plugins crasham se chamados no Browser sem o devido guard.

```typescript
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

async function setupUI() {
  if (Capacitor.isNativePlatform()) {
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#1a73e8' });
  }
}
```

### Haptics (Feedback Tátil)

Utilizado nos sliders de cálculo CNC para simular a sensação de um ajuste físico.

```typescript
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

const triggerFeedback = async () => {
  if (Capacitor.isNativePlatform()) {
    await Haptics.impact({ style: ImpactStyle.Light });
  }
};
```

### Redirecionamento de Rota (`/` vs `/mobile`)

Utilizamos um guard no componente de roteamento para garantir que o usuário mobile caia na interface otimizada.

```typescript
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';

export function ViewportGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isMobile = Capacitor.getPlatform() !== 'web' || window.innerWidth < 768;
    
    if (isMobile && window.location.pathname === '/') {
      navigate('/mobile');
    }
  }, [navigate]);

  return null;
}
```

---

## 3. Tabela de Referência de Guards

| Recurso | Guard Necessário | Alternativa Web |
|---|---|---|
| **StatusBar** | `isNativePlatform()` | Nenhuma (Ignorar) |
| **SplashScreen** | `isNativePlatform()` | Nenhuma (Ignorar) |
| **Haptics** | `isNativePlatform()` | Nenhuma (Ignorar) |
| **Storage** | Nenhum | Automático via `StorageService` (Doc 05) |
| **Deep Links** | `isNativePlatform()` | `window.location.href` |

---

## 4. Como Identificar Erros de Plataforma

Se o app funcionar na Web (`npm run dev`), mas ficar com a tela branca no Android, verifique o Logcat no Android Studio:
- `Uncaught (in promise) ReferenceError: X is not defined`
- `Plugin X does not have implementation for web.`

Isso indica que um **Guard** está faltando naquele ponto do código.

---

## ✅ Checklist de conclusão desta etapa

- [ ] Arquivo `src/utils/platform.ts` criado.
- [ ] Chamadas de `Haptics` protegidas por guard.
- [ ] Chamadas de `StatusBar` protegidas por guard.
- [ ] Roteador configurado para redirecionar Mobile para `/mobile`.
- [ ] Verificação: App abre no Browser sem erros de "Plugin not found".
- [ ] Commit: `git commit -m "feat: add platform guards for capacitor plugins"`
