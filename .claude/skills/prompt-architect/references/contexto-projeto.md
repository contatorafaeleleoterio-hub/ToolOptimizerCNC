# Contexto Local do Projeto — ToolOptimizer CNC v2

> **Camada 2: Contexto Operacional Específico**  
> Este documento registra a realidade técnica, restrições inegociáveis, Design System, comandos de validação e áreas protegidas do **ToolOptimizer CNC v2**. Deve ser consultado pelo **Prompt Architect** antes da estruturação de qualquer prompt destinado a agentes de execução neste repositório.

---

## 1. Visão Geral do Produto e Propósito

* **Produto:** ToolOptimizer CNC (versão canônica `2.0.0`).
* **Repositório:** `contatorafaeleleoterio-hub/ToolOptimizerCNC`.
* **Domínio de Aplicação:** Calculadora industrial de alta precisão para parâmetros de usinagem e corte CNC (fresamento, furação, roscamento e mandrilamento).
* **Público-Alvo:** Operadores, preparadores, programadores CNC e engenheiros de manufatura em chão de fábrica.
* **Modelo Operacional:** **Offline-First**, sem dependência de APIs externas, sem autenticação/login obrigatório, com cálculos instantâneos 100% no cliente.
* **Dual-Domain (Cloudflare):**
  * **Aplicação (App SPA):** `https://app.tooloptimizercnc.com.br/` (Cloudflare Worker Static Assets com fallback SPA via `wrangler.jsonc`).
  * **Landing Page Institucional:** `https://www.tooloptimizercnc.com.br/` (Cloudflare Pages a partir de `landing/`).

---

## 2. Stack Tecnológica Real (Ativa no Repositório)

* **Linguagem:** TypeScript 7 (`^7.0.2`) em modo estrito (`strict: true`, target `ES2022`).
* **Framework UI:** React 19 (`19.2.8`) e `react-dom` (`19.2.8`).
* **Toolchain / Bundler:** Vite 8 (`8.2.2`) com `@vitejs/plugin-react` (`^6.1.1`).
* **PWA:** `vite-plugin-pwa` (`^1.2.0`) com Service Worker e Web App Manifest offline.
* **Banco Local / Persistência:** IndexedDB encapsulado via biblioteca leve `idb` (`^8.0.3`), banco `tooloptimizer_db` (stores: `settings` e `materials`).
* **Estilização:** **CSS Nativo Puro** com CSS Custom Properties (design tokens) em `src/ui/index.css`.
* **Gerenciamento de Estado:** **React Context Nativo** (`src/ui/context/CalculatorContext.tsx`).
* **Suíte de Testes:** Vitest 5 (`^5.0.0`), `@testing-library/react` (`^16.3.3`), `@testing-library/jest-dom` (`^7.0.1`), `jsdom` (`^30.0.1`), `fake-indexeddb` (`^6.2.5`).
* **Deploy e Emulação:** Cloudflare Workers via Wrangler (`^4.68.0`) e GitHub Actions (`.github/workflows/deploy-cloudflare.yml`).
* **Utilitários de Assets:** `sharp` e `png-to-ico` para geração de favicons e ícones PWA via `scripts/generate-icons.mjs`.

---

## 3. Regras Inegociáveis (Non-Negotiables)

1. **Autoridade Científica e Canônica do Modelo de Kienzle:**
   * Nenhuma fórmula empírica, constante física ou limiar de segurança pode ser inventado ou alterado sem embasamento nos documentos canônicos em `Docs_inicial/`.
   * O motor de força de corte baseia-se estritamente na equação de Kienzle:
     $$F_c = k_{c1.1} \cdot b \cdot h^{1 - m_c}$$
   * As grandezas físicas derivadas (Potência de Corte $P_c$, Torque $M_c$, Taxa de Remoção $Q$, Força de Avanço $F_f$) devem seguir estritamente as convenções de engenharia mecânica documentadas.
2. **Offline-First Absoluto:**
   * O aplicativo nunca deve falhar por falta de conectividade. Nenhum cálculo pode depender de requisições de rede ou serviços de terceiros.
3. **Frameworks Banidos (NÃO REINTRODUZIR):**
   * **Tailwind CSS:** Banido. O layout é 100% gerido por tokens e classes semânticas em `src/ui/index.css`.
   * **Zustand / Redux:** Banidos. O estado reativo reside unicamente no React Context (`CalculatorContext.tsx`).
   * **React-Router:** Banido. A interface é orientada a abas e vistas internas gerenciadas diretamente na árvore React.
4. **Suporte Robusto à Digitação e Localização Brasileira:**
   * Todos os campos numéricos devem aceitar tanto ponto (`.`) quanto vírgula (`,`) brasileira como separador decimal (ex.: `0,15` e `0.15`).
   * Não pode haver máscara destrutiva que limpe o campo durante a digitação com backspace ou que force dízimas de ponto flutuante.
5. **Quality Gate Obrigatório:**
   * Nenhuma entrega é considerada válida se `npm run check` (typecheck + vitest) não passar com 100% de sucesso (0 erros de tipagem e 120/120 testes verdes).

---

## 4. Design System Reconciliado (*Precision Surgical Machining*)

* **Diretriz de Design:** Especificado em `RECONCILED_DESIGN_SYSTEM.md` e implementado em `src/ui/index.css`.
* **Creative North Star:** *Precision Surgical Machining* — estética de instrumentação cirúrgico-industrial de alta densidade, feedback tátil e precisão dimensional.
* **Dual-Theme Nativo:**
  * **Tema Claro (Padrão Operacional Diurno / Chão de Fábrica):**
    * Fundo de página: `--bg-page: #F4F6F9`
    * Superfície de cartões: `--bg-surface: #FFFFFF`
    * Texto principal: `--tx-1: #0F172A`
    * Primário (Ciano Industrial Profundo): `--primary: #0F766E` (contraste $> 5.4:1$)
    * Ação / Destaque (Oliva Técnico): `--action: #3F700B` (contraste $> 5.9:1$)
  * **Tema Escuro (Cabine CNC / Turno Noturno / Dark Titanium):**
    * Fundo de página: `--bg-page: #080C12`
    * Superfícies: `--bg-surface: #131B29`
    * Texto principal: `--tx-1: #FFFFFF`
    * Primário luminescente: `--primary: #19E4BB` (Ciano cirúrgico neon)
    * Ação de alta produtividade: `--action: #BDFF4B` (Lime elétrico)
* **Tipografia Canônica:**
  * Interface e Títulos: `'Urbanist', sans-serif` (pesos 400 a 800).
  * Telemetria e Valores CNC: `'JetBrains Mono', monospace` com `font-variant-numeric: tabular-nums` obrigatório em todos os displays numéricos para evitar tremulação e layout shifts durante recálculos dinâmicos.
* **Acessibilidade:**
  * Padrão WCAG AA obrigatório em ambos os temas: contraste mínimo de 4.5:1 para texto normal e 3.0:1 para controles e bordas ativas.

---

## 5. Comandos de Validação, Build e Teste

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor Vite de desenvolvimento local (`http://localhost:5173`). |
| `npm run typecheck` | Validação estrita de tipos TypeScript via `tsc --noEmit`. |
| `npm run test` | Executa a suíte de testes unitários e de componentes via Vitest (`vitest run`). |
| `npm run test:watch` | Executa testes em modo interativo de monitoramento contínuo. |
| `npm run check` | **Quality Gate Principal:** Executa `typecheck` e `test` em sequência (deve ter exit code 0). |
| `npm run validate` | Alias para `npm run check`. |
| `npm run harness:check` | Executa testes do motor de governança mecânica e DAG (`vitest run src/harness`). |
| `npm run build` | Compila o bundle de produção otimizado na pasta `dist/`. |
| `npm run preview` | Compila e emula localmente o comportamento do Cloudflare Worker (`wrangler dev`). |
| `npm run deploy` | Compila e publica a aplicação diretamente no Cloudflare Worker (`wrangler deploy`). |
| `npm run icons` | Regenera favicons e ícones PWA a partir de `logo_p_favcon.png` via script Node. |

---

## 6. Áreas Protegidas e Limites Estruturais

1. **`src/core/` (Cérebro Físico-Matemático):**
   * `calculator.ts`: Motor de orquestração de corte das 4 famílias (fresamento, furação, roscamento, mandrilamento).
   * `analyzer.ts`: Motor de análise e validação de limites físicos (balanço $L/D$, potência $P_c$, torque $M_c$, deflexão).
   * `materials.ts`: Base de materiais ISO com coeficientes de usinabilidade e parâmetros Kienzle.
   * `tools.ts`: Especificações geométricas das famílias de ferramentas.
   * `storage.ts`: Módulo de persistência IndexedDB de materiais customizados e configurações.
   * `adjust.ts` / `types.ts`: Tipos canônicos e fatores de ajuste.
   * **Restrição:** Proibido alterar fórmulas, coeficientes de corte ou limiares de segurança sem confrontar com `Docs_inicial/`.
2. **`Docs_inicial/` (Repositório Canônico de Especificações):**
   * Documentação imutável com requisitos técnicos e fórmulas de engenharia mecânica.
3. **`src/harness/` (Validação Multi-Agente e DAG):**
   * Mecanismo de governança mecânica de execuções.
4. **`archive/legacy-v1/` (Código Morto e Histórico):**
   * Código de versões preliminares (React 18, Tailwind, Zustand). **Proibido reativar ou importar qualquer módulo deste diretório.**
5. **Suíte de Testes Existente (`src/**/__tests__/`):**
   * Suíte com 120 testes em 17 arquivos. Nenhuma alteração deve quebrar os testes existentes. Se um comportamento de negócio for alterado com autorização, os testes correspondentes devem ser atualizados deliberadamente e mantidos 100% verdes.
