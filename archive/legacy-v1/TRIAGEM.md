# Triagem Explícita da Documentação e Código Legados (v1)

**Data da Triagem:** 13/09/2026  
**Local de Arquivamento:** `archive/legacy-v1/`  
**Autoridade:** Documento de governança para descarte e aproveitamento de artefatos da versão 1.0.

> [!IMPORTANT]
> **Regra de Conflito:** Qualquer divergência entre documentos desta pasta e os documentos canônicos em `Docs_inicial/` ou `CONTEXT.md` resolve-se **a favor de `Docs_inicial/`**, sem tentativa de conciliação. O motor canônico do Fenix é a fonte definitiva de números e fórmulas.

---

## 1. Classe A — Aproveitar (Conhecimento e Ativos Preservados)

Itens que continuam em vigor ou que guiaram a arquitetura v2:

| Arquivo / Diretório Original | O que é | Destino / Como é Aproveitado |
|---|---|---|
| `Logo_ToolOptimizer.png`, `logo_p_favcon.png` | Identidade visual da marca, logotipos de alta resolução e favicons | Mantidos na raiz e em `public/`; derivados gerados para a barra Z1 (`src/assets/logo-tooloptimizer.png`) |
| Textos institucionais e metatags de SEO | Copywriting da landing page, títulos e descrições de busca | Reincorporados no `<head>` do `index.html` e na landing page |
| `docs/_archive/superseded/ESTRATEGIA_DUAL_DOMAIN_SEO_TOOLOPTIMIZER.md` | Fundamentação estratégica da separação `www` (landing Pages) e `app` (Worker) | Consolidada no novo `CONTEXT.md` e `CLAUDE.md` |
| `docs/PROTOCOLO_CONVERSAO_APP/14_PROTOCOLO_DEVOPS.md` | Histórico e práticas de DevOps para Cloudflare | Regras de deploy absorvidas em `CLAUDE.md` e `.github/workflows/deploy-cloudflare.yml` |

---

## 2. Classe B — Adaptar (Revisão de Conteúdo Necessária)

Itens cujo valor estratégico permanece válido, mas cuja descrição funcional e técnica deve ser atualizada para a v2:

| Arquivo / Diretório Original | O que é | Veredito de Adaptação |
|---|---|---|
| `DOCUMENTACAO_MARKETING_MONETIZACAO/` | Dossiê de personas (operador, programador, gestor), estratégia de tráfego orgânico e monetização | Mantido fora do arquivo. As personas e estratégia comercial continuam válidas; as referências a telas antigas e rotas inexistentes (`/history`, `/settings`) são adaptadas para o painel único e overlay da v2. |
| `landing/index.html` | Landing page servida no domínio `www.tooloptimizercnc.com.br` | Adaptar para descrever a versão 2.0 (4 famílias: fresar, furar, roscar, mandrilar; Kienzle; modo HSS; offline PWA). |

---

## 3. Classes C / D / E — Arquivar sem Uso (Superados / Descartados)

Itens estritamente superados pela nova arquitetura, cujo conteúdo técnico ou de código não possui mais autoridade no projeto:

| Arquivo / Diretório | Motivo do Descarte / Substituição |
|---|---|
| `docs/specs/PRD_*` | PRDs da v1 baseados em suposições antigas. Superados por `Docs_inicial/escopo/` e `Docs_inicial/mvp/`. |
| `docs/architecture/ADR-001..007` | Registros arquiteturais da stack antiga (Tailwind, Zustand, React-Router, Electron, Capacitor). Superados pela toolchain canônica React 19 + TypeScript puro + IDB. |
| `docs/DOSSIE_CALCULADORA_PARAMETROS.md` | Dossiê de fórmulas da v1. **Caso de alto risco:** contém constantes arbitrárias e equações conflitantes com os canônicos. Fica arquivado sem autoridade. |
| `blueprint_calculadora_cnc.md` | Blueprint técnico antigo do motor de cálculo. Substituído por `Docs_inicial/canonicos/`. |
| `docs/design/*` | Especificações visuais antigas (tema neon escuro `#00D9FF` sobre `#0F1419`, reprovado em contraste WCAG AA). Substituído pelo Design System Fenix (petróleo `#0F3D5C` e creme `#F7F5F1`). |
| `docs/ai/*` | Protocolos de IA e regras de contexto obsoletos da ferramenta antiga. Substituídos por `src/harness/` e `harness_config.yml`. |
| `docs/plans/*` | Planos de implementação de releases passadas (v0.1 a v0.12). Substituídos por `tasks.md` e `ESTADO.md`. |
| `android/`, `capacitor.config.ts`, `electron-builder.json` | Canais móveis e desktop nativos descontinuados. O produto adota exclusivamente Web / PWA. |
| `src/` e `tests/` legados | Código React 18 / Zustand / Tailwind antigo. Substituído integralmente pelo código novo em `src/core/` e `src/ui/`. |
| `gauntlet-calculadora-cnc*/` | Sandboxes e suites de avaliação do motor anterior. Arquivados sem interferência no build. |