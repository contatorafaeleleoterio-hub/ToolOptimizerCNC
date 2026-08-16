# Plano — Gauntlet Loop v2: Mockup Experimental da Calculadora CNC

> **Status:** 🟢 Fase 0 preenchida — pronto para execução E1 (Setup e Contratos)
> **Item do backlog:** 17 (redo do item 16, com protocolo revisado)
> **Técnica:** a mecânica completa do loop (papéis, teto de agentes, regras do Juiz cego, fases 0-6,
> critério de parada, template de critérios) **mora só em**
> [`protocolo-loop-construtor-juiz-cego.md`](C:\Users\USUARIO\Desktop\central_rafael\protocolos\protocolo-loop-construtor-juiz-cego.md).
> Este documento é a instância — só o que é específico do ToolOptimizer CNC e o campo de
> objetivo preenchido. Não duplicar a mecânica aqui; se o protocolo mudar, este plano herda a
> mudança automaticamente por referência.
> **Precedente:** rodada 1 concluída em 12/08/2026 — `gauntlet-calculadora-cnc/`, score 92/100, 7/7 gates, `reports/FINAL_REPORT.md`. **Preservada intacta, não é sobrescrita por este plano.**

---

## O que muda da rodada 1 pra esta versão

A rodada 1 usou a versão ingênua do loop (§7 do protocolo era mais simples então: contava ciclos
e parava quando batia o score mínimo — funcionou, PASS no ciclo 2, mas nunca testou convergência/
estagnação de verdade). O protocolo central foi revisado depois, com pesquisa externa (ver lá
§10). Esta v2 roda a versão atual do protocolo — sem reescrever a mecânica aqui, só apontando:

- Critério de parada: protocolo central §7.
- Teto de agentes e regra de fallback de subagente: protocolo central §3.
- Regras do Juiz cego: protocolo central §5.
- Template de matriz de critérios + gates: protocolo central §6.

---

## FASE 0 — Objetivo e fronteiras (PREENCHIDA)

```
Entregável (1 frase):
▢ Um único index.html autocontido (CSS + JS inline, abre em file://) — calculadora de parâmetros
  de corte cobrindo as 4 famílias de operação de fresadora/centro de usinagem.

Por que redesenhar (o que está errado ou faltando na calculadora atual — se for diferente
do motivo da rodada 1, dizer aqui; se for o mesmo, também dizer):
▢ Diferente da rodada 1. Lá o motivo era testar se a arquitetura suportava mais de um tipo de
  ferramenta. Aqui o motivo é outro: validar a tese arquitetural da §10 da SPEC — schema
  declarativo por tipo + uma função pura por família + camada de apresentação genérica —
  contra os 18 tipos reais, e sob as regras de HMI industrial (ISA-101), sem herdar nenhuma
  decisão de tela do produto atual.

Escopo travado (o que ENTRA nesta rodada — famílias/ferramentas/materiais/operações):
▢ 4 famílias × 18 tipos: Fresar (topo reto, toroidal, esférica, chanfrar, alto avanço,
  cabeçote faceador, topo c/ pastilhas, disco/serra) · Furar (broca HSS, broca MD inteiriça,
  U-drill, broca de centro, escareador/rebaixador, alargador) · Roscar (macho de corte,
  macho de conformação, fresa de rosca) · Mandrilar (barra/cabeçote)
  + 4 eixos ortogonais (§3) + Modo cálculo rápido (§5) + Fórmulas 1–28 da §6 + Semáforo (§8)
  + Painel de resultado zonas 1–6 (§12).

Escopo fora (o que fica de fora, mesmo que pareça óbvio incluir):
▢ §7 tabelas de consulta como tela (roscas, conversões, etc — só como dado interno) ·
  §13 persistência (receitas, histórico) · Fórmulas 29 e 30 · Tema escuro · unidades
  imperiais · mobile · qualquer item da §17 ou §18.

Sandbox desta rodada (pasta onde o loop pode mexer):
Sugestão padrão (evita sobrescrever a rodada 1): `gauntlet-calculadora-cnc-v2/`
▢ Confirmado: `gauntlet-calculadora-cnc-v2/`

Fronteiras proibidas (herdadas da rodada 1, valem por padrão salvo indicação contrária):
`src/**` · `package.json` raiz · `node_modules/` · `vite.config.ts` · `vitest.config.ts` ·
`wrangler.jsonc` · `.gitignore` da raiz · `gauntlet-calculadora-cnc/` (rodada 1) · qualquer deploy.
Nenhuma dependência instalada fora da pasta da sandbox.

Teto de ciclos (padrão do protocolo é 5 — trocar aqui se quiser outro número):
▢ 5

Score mínimo de aceite (padrão do protocolo é 90/100 + gates — trocar aqui se quiser outro):
▢ 90/100 + 8/8 gates

O que este loop NÃO decide:
Score ≥ mínimo não autoriza implementar em produção — exige aprovação explícita do Rafael,
igual na rodada 1. (Só mude esta linha se for uma decisão deliberada sua.)
```

**Sobre reaproveitar a pesquisa da rodada 1** (`gauntlet-calculadora-cnc/research/DISCOVERY.md` e
`CALCULATOR_SCOPE.md`): **não são herdados automaticamente**. Servem de referência de formato e
de dados já levantados uma vez (ex.: fatores de Vc por material da ferramenta, se o novo escopo
ainda usar esse eixo) — o conteúdo (taxonomia, prioridades) precisa ser reavaliado contra o
objetivo novo, não copiado.

---

## O que é específico deste projeto (não está no protocolo genérico)

- **Critérios de qualidade:** `gauntlet-calculadora-cnc/criteria/JUDGE_CRITERIA.md` da rodada 1 é
  o esqueleto já validado (9 categorias / 100 pts / 7 gates) — reaproveitar a estrutura, ajustar
  descrições ao objetivo novo da Fase 0. Congelar de novo antes do ciclo 1 (protocolo §6).
- **Contrato de `data-testid`:** definir antes do Builder trabalhar — foi o que evitou retrabalho
  na rodada 1 (27 testids, zero desvio). Não copiar os cenários T01-T13 da rodada 1
  automaticamente; derivam do objetivo novo.
- **Setup de infraestrutura** (protocolo Fase 4), comando exato deste projeto:
  ```bash
  npm init -y && npm i -D @playwright/test && npx playwright install chromium
  ```
  Rodar dentro da pasta de sandbox definida na Fase 0. Confirmar com `git status` na raiz do
  projeto que nada fora da sandbox mudou — a cada ciclo, não só no fim.
- **Tokens de design** (se o objetivo novo envolver UI): tokens reais de `src/index.css`
  (`#00D9FF`, `#39FF14`, `#0F1419`, glass `rgba(22,27,34,.7)+blur(24px)`, Inter + JetBrains Mono).
  Semáforo único `#2ecc71/#f39c12/#e74c3c` — não duplicar como paleta de gauge separada (dívida
  catalogada em `docs/_canonicos/DESIGN-SYSTEM.html` §18).

---

## Verificação (ao final)
1. `npx playwright test` dentro da pasta da sandbox — todos os cenários passam.
2. Abrir o mockup no navegador e navegar à mão pelos fluxos principais.
3. Ler `reports/FINAL_REPORT.md`.
4. `git status` na raiz do projeto — nada modificado fora da pasta da sandbox definida na Fase 0.

Ao fim: **para e espera aprovação explícita do Mestre.** Score ≥ 90 não autoriza produção.
