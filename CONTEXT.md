# CONTEXT — ToolOptimizer CNC v2

## 1. O que é o Produto
O **ToolOptimizer CNC** é uma calculadora profissional de parâmetros de corte para máquinas-ferramenta CNC (fresadoras, centros de usinagem, tornos e furadeiras). Ele fornece parâmetros operacionais recomendados (rotação `S`, avanço `F`, potência de corte `Pc`, torque `Mc`, taxa de remoção de material `Q`) com precisão técnica comprovada, utilizando o **modelo de Kienzle** para cálculo de forças de usinagem.

A aplicação cobre **4 famílias completas de usinagem**:
1. **Fresamento:** Fresas de topo reto, toroidal, esférica, alto avanço e cabeçote de facear.
2. **Furação:** Brocas helicoidais em aço rápido (HSS) e metal duro (MD) integral.
3. **Roscamento:** Machos de corte e machos de conformação (laminação).
4. **Mandrilamento:** Cabeçotes micrométricos de precisão para acabamento de furos.

A aplicação é **offline-first**, operando como PWA e persistindo configurações globais e cadastro de novos materiais localmente no navegador via **IndexedDB** (`tooloptimizer_db`). Sua identidade visual segue o tema canônico (petróleo `#0F3D5C` e creme `#F7F5F1`), aferido em contraste WCAG AA por inspeção automatizada.

---

## 2. Relação Fenix ↔ ToolOptimizer CNC
**Fenix** foi o codinome do projeto de reconstrução do motor matemático e da interface, desenvolvido para sanar as inconsistências conceituais do produto original e estabelecer uma base de código sólida em TypeScript puro e React 19, com 100% de cobertura nos requisitos físicos e 102 testes unitários em 15 suítes.  
O produto publicado, oficial e mantido é o **ToolOptimizer CNC** (`contatorafaeleleoterio-hub/ToolOptimizerCNC`). A migração transplantou o código validado do Fenix para o repositório mãe ToolOptimizerCNC, unificando a infraestrutura de deploy na Cloudflare, domínio `tooloptimizercnc.com.br`, favicons e SEO com o novo núcleo canônico. O repositório Fenix encontra-se desativado e arquivado para histórico.

---

## 3. Arquitetura e Organização do Repositório

```
ToolOptimizerCNC/
├── src/
│   ├── core/           # Motores canônicos de cálculo CNC, tipos, materiais e storage IndexedDB
│   ├── ui/             # Componentes React 19, hooks, CalculatorContext e index.css (tokens WCAG AA)
│   ├── harness/        # Governança multi-agente, DAG de execução e validação mecânica
│   └── assets/         # Imagens e logotipos de interface
├── Docs_inicial/       # Documentação técnica OFICIAL e CANÔNICA (fórmulas, requisitos, relatórios)
├── public/             # Ativos estáticos públicos (favicons, ícones PWA, og-image, robots, sitemap)
├── landing/            # Landing page institucional (Pages: www.tooloptimizercnc.com.br)
├── archive/legacy-v1/  # Acervo histórico v1 arquivado (sem autoridade decisória)
├── DOCUMENTACAO_MARKETING_MONETIZACAO/ # Estratégia de posicionamento, marketing e monetização
├── wrangler.jsonc      # Configuração do Cloudflare Worker (Static Assets SPA)
├── package.json        # Toolchain unificada v2.0.0 (React 19, Vite 8, TS 7, Vitest 5, IDB)
├── index.html          # Casulo React com metadados de SEO, Open Graph e Schema.org JSON-LD
├── CONTEXT.md          # Este documento (fonte única de contexto estrutural)
└── ESTADO.md           # Estado de evolução técnica e histórico de sessões
```

---

## 4. O que está arquivado e por quê
Todos os artefatos anteriores à v2 foram transferidos para `archive/legacy-v1/`:
- **Código e testes antigos (`src/`, `tests/`):** Utilizavam React 18, Tailwind, Zustand e React-Router com regras dispersas e sem validação mecânica canônica.
- **Documentações superadas (`docs/`, `DOCS_TREINAMENTO_RAG/`, `blueprint_*.md`):** Metodologias e formulações preliminares que foram superadas pelas especificações do Fenix. O gabarito canônico definitivo reside em `Docs_inicial/`.
- **Canais móveis descartados (`android/`, Capacitor, Electron):** O produto foca exclusivamente na web como PWA responsivo com suporte a desktop e dispositivos móveis.