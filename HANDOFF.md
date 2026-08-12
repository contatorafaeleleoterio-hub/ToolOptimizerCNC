# Handoff — ToolOptimizer CNC — 12/08/2026
Status: Plano 17 (Gauntlet — Mockup Experimental da Calculadora) criado e aprovado. Execução não iniciada.

Feito nesta sessão:
- Discovery completo da calculadora atual: motor (`src/engine/`), store, UI, dados e validações mapeados
- Achado central: `Ferramenta.tipo` é union de 3 strings e **não entra em nenhum cálculo**; o eixo "material da ferramenta" (HSS × metal duro, 3–5× de diferença em Vc) **não existe no domínio**
- Escopo travado pelo Rafael: só fresadora/centro de usinagem (**nada de torneamento**), 5 famílias — Fresar (inteiriça MD, inteiriça HSS, cabeçote c/ pastilha), Furar (broca MD, broca HSS, U-drill), Roscar (macho HSS, macho MD), Mandrilar, e Cálculo Rápido agnóstico de ferramenta
- Pesquisa externa validou: `hm = fz·sin κ` (cabeçote), fator 3–5× carbide/HSS, avanço mínimo em U-drill
- Plano escrito em `docs/plans/PLAN_GAUNTLET_CALCULADORA_CNC.md`; backlog (item 16) e roadmap (item 17) sincronizados

Onde parou: plano aprovado, nada executado. A pasta `gauntlet-calculadora-cnc/` ainda **não existe**.

Próximo passo: executar o plano — criar a estrutura, Discovery formal (`DISCOVERY.md` + `CALCULATOR_SCOPE.md`), congelar `JUDGE_CRITERIA.md`, escrever cenários, instalar Playwright **isolado dentro da pasta gauntlet**, e rodar o loop BUILD → TEST → JUDGE (máx. 5 ciclos).

Blockers: nenhum. Playwright não está instalado — será instalado só dentro de `gauntlet-calculadora-cnc/`, sem tocar no `package.json` do projeto.

Arquivos tocados: `docs/plans/PLAN_GAUNTLET_CALCULADORA_CNC.md` (novo), `docs/plans/BACKLOG_IMPLEMENTACAO.md`, `docs/ROADMAP_SESSAO_ATUAL.md`, `HANDOFF.md`

Pendências do working tree (de sessões anteriores, **não commitadas nesta**): 5 testes do `.aiox-core/`, 2 deleções em `docs/plans/`, 6 modificações em docs, e untracked — `blueprint_calculadora_cnc.md`, `.claude/skills/cnc-*`, `.gemini/rules/`, `docs/_archive/nao-acessar/`, `docs/_canonicos/Design_system_referencia/`, `src/components/viewport-redirect.tsx`. Decidir o que entra.

Retomar com: "continuar"
