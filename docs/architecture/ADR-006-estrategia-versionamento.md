# ADR-006: Estratégia de Versionamento — Semantic Versioning (SemVer)

**Status:** Aceito
**Data:** 19/02/2026
**Autor:** Rafael Eleotério

---

## Contexto

O projeto ToolOptimizer CNC está em `"version": "0.1.0"` desde o início, sem estratégia formal de versionamento. Com o crescimento do projeto (web + desktop + deploy), é necessário definir:
- Quando incrementar a versão
- Qual número mudar (major, minor, patch)
- Como a versão se reflete no build web e desktop (.exe)
- Como manter histórico claro de releases

## Decisão

Adotar **Semantic Versioning 2.0** (semver.org) com regras adaptadas ao contexto do projeto.

### Formato: `MAJOR.MINOR.PATCH`

| Componente | Quando incrementar | Exemplos |
|------------|-------------------|----------|
| **MAJOR** (X.0.0) | Mudanças incompatíveis — redesign completo da UI, mudança de stack, breaking changes na engine de cálculo | `0.x.x` → `1.0.0` (MVP completo) |
| **MINOR** (0.X.0) | Nova feature significativa — story completa, novo módulo, nova página | `0.1.0` → `0.2.0` (stories) |
| **PATCH** (0.0.X) | Bug fix, ajuste cosmético, hotfix, correção de texto, tweak de UI | `0.2.0` → `0.2.1` (fixes) |

### Regras Práticas para o ToolOptimizer

1. **Cada Story completa** = bump de MINOR
   - Ex: Story-003 CI/CD concluída → `0.1.0` → `0.2.0`
   - Ex: Story-004 SEO concluída → `0.2.0` → `0.3.0`

2. **Cada fix/hotfix entre stories** = bump de PATCH
   - Ex: Fix mobile responsiveness → `0.2.0` → `0.2.1`
   - Ex: Fix bug no cálculo → `0.2.1` → `0.2.2`

3. **Build desktop (.exe) herda** a versão do `package.json`
   - O nome do `.exe` inclui a versão automaticamente: `ToolOptimizer-CNC-{version}-portable.exe`
   - Para gerar novo .exe com versão atualizada: bumpar `package.json`, rebuild

4. **MVP feature-complete** = bump para `1.0.0`
   - Quando todas as stories planejadas estiverem concluídas
   - Deploy de produção estável
   - Usado em ambiente real por operadores CNC

5. **Pré-release e RC (futuro)**
   - `1.0.0-beta.1` — versão beta para testes ampliados
   - `1.0.0-rc.1` — release candidate antes da versão final

### Como Bumpar a Versão

```bash
# 1. Editar package.json manualmente
#    Mudar "version": "0.1.0" → "version": "0.2.0"

# 2. Commit da versão
git add package.json
git commit -m "chore: bump version to 0.2.0"

# 3. Opcional — criar git tag
git tag v0.2.0
git push origin v0.2.0
```

> **REGRA:** O bump de versão é feito **DEPOIS** de completar a story/fix e **ANTES** do deploy/build desktop. Assim o .exe e o deploy web refletem a versão correta.

### Histórico de Versões

| Versão | Data | Descrição | Commits Referência |
|--------|------|-----------|-------------------|
| `0.1.0` | fev/2026 | MVP inicial — Engine CNC + UI desktop + mobile + 333 testes | até `d74804e` |
| `0.2.0` | 19/02/2026 | Animações + Sliders + CI/CD + Mobile fixes + Desktop portable (stories 001-003) | `d74804e` → sessão 19/02 |
| `0.3.0` | (futuro) | SEO Schema.org + meta tags (Story-004) | — |
| `0.4.0` | (futuro) | Polimento UI/UX + HistoryPage responsiva | — |
| `1.0.0` | (futuro) | Feature-complete MVP — deploy produção | — |

### Versão Atual

```
Versão: 0.2.0
Motivo: Stories 001-003 completas + Desktop portable + CI/CD
```

> **Ação necessária:** Atualizar `package.json` de `"0.1.0"` para `"0.2.0"` para refletir o estado real do projeto.

---

## Alternativas Consideradas

| Alternativa | Motivo da rejeição |
|-------------|-------------------|
| **CalVer** (2026.02.19) | Não comunica escopo de mudanças, confuso para usuários |
| **Auto-versioning** (standard-version, semantic-release) | Overhead para projeto solo, conventional commits já manuais |
| **Sem versionamento** | Impossível rastrear qual .exe corresponde a qual estado do código |

## Consequências

### Positivas
- Qualquer pessoa sabe o escopo da mudança ao ver o número da versão
- `.exe` e deploy web sincronizados pela mesma versão
- Git tags permitem voltar a qualquer release específica
- Histórico de evolução claro para stakeholders

### Trade-offs
- Requer disciplina manual para bumpar antes de release (mitigado por checklist de sessão)
- Versão retroativa precisa de acordo (0.1.0 para 0.2.0 agora)
