# ToolOptimizer CNC

![CI](https://github.com/contatorafaeleleoterio-hub/ToolOptimizerCNC/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/contatorafaeleleoterio-hub/ToolOptimizerCNC/actions/workflows/deploy.yml/badge.svg)
![Versão](https://img.shields.io/badge/versão-0.3.0-cyan)

**"A ciência da usinagem, simplificada."**

Sistema de recomendação de parâmetros de corte para fresamento CNC. Calcula RPM, Avanço e Potência em menos de 2 segundos, com validação de segurança integrada.

> **O sistema RECOMENDA, o operador DECIDE.** Sempre valide os parâmetros antes de usinar.

---

## Funcionalidades

- **Cálculo completo:** RPM, Avanço (mm/min), Potência (kW), Torque (Nm), MRR (cm³/min), Vc real
- **Chip Thinning (CTF):** correção automática do fz quando ae < 50% do diâmetro
- **Validação L/D:** semáforo visual (Verde / Amarelo / Vermelho / Bloqueado)
- **Ajuste fino:** sliders bidirecionais para RPM e Avanço (−150% a +150%), sliders para Vc, fz, ae, ap
- **ParameterHealthBar:** indicadores visuais de saúde por parâmetro no painel de ajuste fino
- **Fórmulas educativas:** cards expansíveis com substituição de valores reais
- **Configurações completas:** limites de máquina, materiais, ferramentas, fator de segurança, fatores de correção
- **Histórico:** registro de simulações com feedback do operador (sucesso, quebra, acabamento ruim)
- **Exportação:** JSON e CSV dos resultados
- **Mobile:** interface adaptada para tablets e smartphones
- **Desktop .exe:** versão portátil para uso offline (sem instalação)

---

## Materiais Suportados

| Material | ISO | Dureza |
|----------|-----|--------|
| Aço 1020 | P | 120–160 HB |
| Aço 1045 | P | 170–220 HB |
| Aço Inox 304 | M | 140–180 HB |
| Alumínio 6061-T6 | N | 95 HB |
| P20 (tratado) | P | 280–320 HB |
| 2711 (tratado) | P | 300–340 HB |
| 8620 (núcleo) | P | 180–220 HB |
| 8620 (cementado) | H | 58–62 HRC |
| H13 (tratado) | H | 45–52 HRC |

Materiais customizados podem ser adicionados em **Configurações → Materiais**.

---

## Ferramentas Suportadas

- Fresa Toroidal (Bullnose) — Raios R0.2, R0.5, R1.0 (customizável)
- Fresa de Topo Reto (Flat End Mill)
- Fresa Esférica (Ball Nose)

Diâmetros disponíveis: 0.2 mm a 16 mm (padrão) + diâmetros customizados via Configurações.

---

## Como Usar (Web)

### Pré-requisitos

- Node.js 18+
- npm 9+

### Instalação

```bash
git clone https://github.com/contatorafaeleleoterio-hub/ToolOptimizerCNC.git
cd ToolOptimizerCNC
npm install
```

### Desenvolvimento

```bash
npm run dev
# Acesse: http://localhost:5173/ToolOptimizerCNC/
```

### Build de Produção

```bash
npm run build
# Arquivos gerados em: dist/
```

### Testes

```bash
npm run test          # Todos os testes (401 casos)
npm run typecheck     # Verificação TypeScript
npm run validate      # typecheck + test + lint
```

---

## Como Usar (Desktop — .exe Portátil)

O arquivo `.exe` não requer instalação. Basta executar diretamente do pen drive ou pasta local.

**Localização:** `Sistema_Desktop_Pen_driver/dist-electron/ToolOptimizer-CNC-{versão}-portable.exe`

> Para instruções de rebuild do .exe, consulte `docs/architecture/ADR-005-electron-desktop-build.md`.

---

## Fluxo de Uso Básico

1. **Selecione o Material** — sistema auto-popula a faixa de Vc recomendada
2. **Selecione a Ferramenta** — tipo, diâmetro, raio (toroidal), número de arestas, altura de fixação
3. **Selecione a Operação** — Desbaste, Semi-acabamento ou Acabamento
4. **Ajuste os Parâmetros** — ap, ae, fz, Vc nos campos numéricos
5. **Clique em SIMULAR** — resultados calculados instantaneamente
6. **Analise o resultado** — verifique o status de segurança (verde / amarelo / vermelho)
7. **Ajuste fino (opcional)** — use os sliders no painel direito para refinar RPM, Avanço e parâmetros de corte

> **Primeira usinagem:** recomenda-se usar 50–70% dos parâmetros sugeridos e aumentar progressivamente enquanto monitora som, vibração e qualidade do cavaco.

---

## Configurações

Acesse via botão **⚙ Configurações** no cabeçalho:

| Seção | O que configura |
|-------|----------------|
| **Máquina** | RPM máx, Potência máx, Torque máx, Avanço máx, Eficiência do fuso, Nome da máquina |
| **Segurança** | Fator de segurança (0.5–1.0), Limites L/D, Multiplicadores ap por operação |
| **Materiais** | Adicionar/editar materiais com Kc, mc, faixas de Vc por operação |
| **Ferramentas** | Diâmetros e raios customizados, Fatores de correção por ferramenta/diâmetro |
| **Exibição** | Casas decimais dos resultados |
| **Dados** | Exportar/importar configurações (JSON), restaurar padrões de fábrica |

---

## Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| UI | React 18.3 + TypeScript 5.7 |
| Build | Vite 6.1 |
| Estilo | Tailwind CSS v4 (dark theme) |
| Estado | Zustand 5.0 |
| Roteamento | react-router-dom 7.13 |
| Testes | Vitest 3.0 + Testing Library (401 testes) |
| Desktop | Electron 40.4.1 |
| Deploy | GitHub Pages + CI/CD (GitHub Actions) |

---

## Limites Padrão da Máquina

| Parâmetro | Valor Padrão |
|-----------|-------------|
| RPM Máximo | 12.000 rpm |
| Potência Máxima | 15 kW |
| Torque Máximo | 80 Nm |
| Avanço Máximo | 5.000 mm/min |
| Eficiência do Fuso | 85% |
| Fator de Segurança | 0.75 |

Todos os valores são editáveis em **Configurações → Máquina**.

---

## Advertências de Segurança

- Este sistema fornece **estimativas** com margem de erro de ±15–25%
- **Nunca** use os valores diretamente sem validação humana
- Verifique estado da máquina, fixação e ferramentas antes de usinar
- O sistema não lê dados reais da máquina (potência, vibração, temperatura)
- Parâmetros com L/D > 6 são bloqueados automaticamente (risco crítico de vibração)
- Materiais marcados com **⚠ Estimado** possuem dados não validados por fabricante

---

## Estrutura do Projeto

```
src/
  engine/       # Fórmulas de cálculo (RPM, feed, power, chip-thinning, validators)
  data/         # Banco de dados estático (materiais, ferramentas, operações)
  store/        # Estado global (Zustand)
  components/   # Componentes React
  pages/        # Páginas (Settings, History, Mobile)
  hooks/        # Hooks customizados
tests/          # Testes unitários e de integração (espelho de src/)
docs/           # PRDs, ADRs, especificações técnicas
```

---

## Versão

**v0.3.0** — [Estratégia de versionamento](docs/architecture/ADR-006-estrategia-versionamento.md)

| Versão | Feature |
|--------|---------|
| 0.1.0 | MVP base — cálculos + UI |
| 0.2.0 | Animações + Sliders bidirecionais + Mobile + CI/CD |
| 0.2.1 | SEO + Schema.org |
| 0.3.0 | ParameterHealthBar (indicadores visuais de saúde) |

---

## Deploy

- **Web:** [GitHub Pages](https://contatorafaeleleoterio-hub.github.io/ToolOptimizerCNC/)
- **CI/CD:** GitHub Actions — build + test automático em cada push para `main`

---

## Autor

**Rafael Eleoterio** — [mestrecnc.com.br](https://mestrecnc.com.br)

---

*ToolOptimizer CNC — Sistema de Recomendação de Parâmetros de Usinagem CNC*
