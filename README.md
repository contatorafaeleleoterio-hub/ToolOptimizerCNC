# ToolOptimizer CNC

![CI](https://github.com/contatorafaeleleoterio-hub/ToolOptimizerCNC/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/contatorafaeleleoterio-hub/ToolOptimizerCNC/actions/workflows/deploy-cloudflare.yml/badge.svg)
![Versão](https://img.shields.io/badge/versão-2.0.0-0F3D5C)

**"A ciência da usinagem, simplificada."**

Sistema profissional de cálculo e recomendação de parâmetros de corte para máquinas-ferramenta CNC (fresadoras, centros de usinagem, tornos e furadeiras). O operador informa o material da peça, a ferramenta e a geometria; o sistema devolve rotação (`S`), avanço (`F`), potência exigida (`Pc`), torque (`Mc`) e uma avaliação física de segurança da operação.

> **O sistema RECOMENDA, o operador DECIDE.** Sempre valide os parâmetros antes de usinar.

---

## Funcionalidades da Versão 2.0

- **4 Famílias Completas de Usinagem:**
  - **Fresamento:** Fresas de topo reto, toroidal (bullnose), esférica (ball nose), alto avanço e cabeçote de facear.
  - **Furação:** Brocas helicoidais de aço rápido (HSS) e metal duro (MD) integral, com profundidade de picapau e parâmetros de avanço adaptativos.
  - **Roscamento:** Machos de corte e machos de conformação (laminação).
  - **Mandrilamento:** Cabeçotes micrométricos para acabamento fino de furos.
- **Precisão Física Canônica:** Fórmulas fundamentadas em constantes citadas e modelo de força de corte de Kienzle ($kc_{1.1}$, $mc$).
- **Modelo Vivo Bidirecional (±5%):** Ajuste fino tátil em tempo real nos botões de incremento/decremento com recálculo instantâneo mantendo o torque constante.
- **Diagnóstico e Alertas Físicos:** Semáforo de segurança (NORMAL, ATENÇÃO, CRÍTICO) cobrindo balanço de ferramenta ($L/D$), afinamento de cavaco ($hm$ e $CTF$), teto de potência e deflexão.
- **Offline-First:** Progressive Web App (PWA) instalável com banco de dados local **IndexedDB** (`tooloptimizer_db`) para persistência de margem de segurança global e cadastro de novos materiais.
- **Design System Acessível:** Paleta petróleo (`#0F3D5C`) e creme (`#F7F5F1`) auditada com 100% de conformidade WCAG AA.

---

## Materiais Suportados Nativamente

- **Aços Carbono e Ligados (ISO P):** Aço 1020, Aço 1045, P20, 2711, 8620.
- **Aços Inoxidáveis (ISO M):** Inox 304, Inox 316.
- **Não Ferrosos (ISO N):** Alumínio 6061-T6, Cobre, Latão.
- **Materiais Endurecidos (ISO H):** Aço H13 tratado, Aço 8620 cementado.

> Novos materiais e constantes personalizadas de usinagem podem ser cadastrados diretamente em **Configurações → Materiais** e persistem localmente no seu dispositivo.

---

## Como Executar Localmente

### Pré-requisitos
- Node.js 20+
- npm 10+

### Instalação e Desenvolvimento
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento local
npm run dev

# Executar suíte de typecheck e 102 testes unitários
npm run check

# Gerar build otimizado de produção
npm run build

# Visualizar preview do build com runtime Cloudflare
npm run preview
```

---

## Governança e Arquitetura

O projeto utiliza um núcleo modular em TypeScript puro (`src/core/`), desacoplado da casca de apresentação em React 19 (`src/ui/`), com orquestração de governança multi-agente (`src/harness/` e `harness_config.yml`). Toda a fundamentação técnica e relatórios de auditoria física encontram-se em `Docs_inicial/`.

---

## Autoria e Licença

- **Autor:** Mestre CNC ([mestrecnc.com.br](https://mestrecnc.com.br)) — Especialista em Usinagem CNC e Moldes de Injeção
- **Licença:** Proprietária / ToolOptimizer CNC