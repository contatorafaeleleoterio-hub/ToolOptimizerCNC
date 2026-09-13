Documento de Referência para Implementação no ToolOptimizer CNC
Versão: 2.0 Data de Criação: 05 de Março de 2026 Autor: Grok 4 (xAI) Objetivo: Este documento refinado compila todos os dados discutidos no chat, incluindo fichas de materiais, discussões sobre parâmetros (ap, ae, fz, Vc), fórmulas, refutações e sugestões de implementação. Ele é técnico e direcionado para uso como base pelo Claude Code na implementação da lógica do sistema ToolOptimizer CNC (Electron + React + TypeScript). Integra insights do repositório GitHub, focando em configuração de ranges na aba "Configurações" (Settings.tsx), sliders de ajuste fino e integração com ParameterHealthBar. Evita erros através de validações explícitas e faixas conservadoras.
Instruções para Claude Code:
• Use TypeScript para tipagem (ex.: interfaces para params).
• Integre com Zustand para estado global (ex.: store de ranges editáveis).
• Armazene dados em src/data/ como JSON editável; persista via localStorage.
• Valide todos inputs: Throw errors se ranges inválidos (ex.: min > max).
• Priorize segurança: Defaults conservadores (-10-20% em Vc/fz); use ParameterHealthBar para feedback visual.
• Teste: Rode em Electron; valide com exemplos reais (ex.: Ø10 mm, SAE 1020).
1. Contexto Geral do Projeto e Perfil do Usuário
Perfil de Rafael (Desenvolvedor/Usuário)
• Profissão: Fresador CNC há 17 anos; programador iniciante (2 anos). Foco em usinagem de metais com fresas CNC (metal duro: toroidais, esféricas, topo reto).
• Ferramentas: Claude Code (desktop), Terminal/PowerShell. Ênfase em dados validados para máquinas reais.
• Necessidades: Configuração de ranges para Vc, fz, ae, ap na aba Configurações, com edição por parâmetro e integração a indicadores.
Projeto ToolOptimizer CNC
• Descrição: App desktop para calcular parâmetros (RPM, avanço, etc.) em fresamento CNC. Baseado em repo GitHub: React 18.3, TypeScript 5.7, Electron 40.4.1, Zustand 5.0, Tailwind CSS v4.
• Estrutura Relevante:
o src/data/: Dados estáticos de materiais/ferramentas (base para ranges).
o src/store/: Estado global (Zustand) para params e configs.
o src/components/: Sliders e ParameterHealthBar para ajuste fino.
o src/pages/Settings.tsx: Aba para edição de configs (máquina, segurança, materiais).
• Implementação de Ajuste Fino: Sliders no dashboard (painel direito) para Vc, fz, ae, ap, com ±150% ajuste. Integre edição de ranges em Settings.tsx.
• Sugestão de Lógica: Função calcParams(material: string, D: number, strategy: 'desbaste' | 'acabamento') que usa ranges editados; atualize sliders dinamicamente.
2. Fichas Técnicas de Materiais para Usinagem CNC
Foco: Fresas metal duro revestidas. Refrigeração adequada. Ranges configuráveis em Settings.tsx (min/max por parâmetro, associado a material/estratégia).
2.1 Aços Carbono Comuns
SAE 1020
• Dureza: 120–170 HB. Vc: [180,260] m/min. fz: [0.08,0.25] mm/dente. ap Desbaste: [3,8] mm (Ø10 mm: [3,5]). ae: [40,80]% Ø.
SAE 1045
• Dureza: 160–220 HB. Vc: [150,220] m/min. fz: [0.07,0.22] mm/dente. ap Desbaste: [2,6] mm (Ø10 mm: [3,5]). ae: [30,70]% Ø.
2.2 Aços Ligados
SAE 4140
• Dureza: 200–320 HB. Vc: [120,200] m/min. fz: [0.06,0.18] mm/dente. ap Desbaste: [1.5,5] mm (Ø10 mm: [2,4]). ae: [30,60]% Ø.
SAE 8620
• Dureza: 150–200 HB. Vc: [140,210] m/min. fz: [0.08,0.22] mm/dente. ap Desbaste: [2,6] mm. ae: [30,60]% Ø.
2.3 Aços para Moldes
P20
• Dureza: 28–36 HRC. Vc: [130,190] m/min. fz: [0.05,0.18] mm/dente. ap Desbaste: [1,5] mm (Ø10 mm: [2,4]). ae: [30,70]% Ø.
H13
• Dureza: 45–52 HRC. Vc: [80,160] m/min. fz: [0.04,0.13] mm/dente. ap Desbaste: [0.5,3] mm (Ø10 mm: [1,2]). ae: [20,50]% Ø.
VPATLAS
• Dureza: 32–36 HRC. Vc: [130,180] m/min. fz: [0.05,0.17] mm/dente. ap: [1,4] mm.
MD-XTRA
• Dureza: 39–43 HRC. Vc: [90,140] m/min. fz: [0.04,0.14] mm/dente. ap: [1,4] mm.
2.4 Metais Não Ferrosos
Alumínio 6061/7075
• Vc: [400,800] m/min. fz: [0.12,0.45] mm/dente. ap Desbaste: [4,12] mm (Ø10 mm: [4,10]). ae: [50,90]% Ø.
Cobre
• Vc: [160,320] m/min. fz: [0.08,0.28] mm/dente. ap: [2,6] mm.
2.5 Polímeros
Nylon PA6/PA66
• Vc: [300,900] m/min. fz: [0.12,0.55] mm/dente. ap: [3,10] mm.
3. Discussões e Fórmulas para Parâmetros
3.1 Questionamento e Refutação sobre ap
• Questionamento: ap de 2 mm em desbaste parece alto; sugestão de 0.2–0.3 mm max para Ø10 mm.
• Refutação: 0.2–0.3 mm é para acabamento/duros; desbaste usa 2–8 mm para eficiência (Sandvik/Kennametal). Ajuste por rigidez.
3.2 Fórmulas e Implementação
• ap Máximo:ap_max = k * D (k: 0.5–1.0 editável em Settings; ex.: TypeScript: function calcApMax(D: number, k: number): number { return k * D; }).
• RPM:RPM = (Vc * 1000) / (Math.PI * D).
• Feed:feed = RPM * fz * z.
• MRR:MRR = ap * ae * feed. Valide em código: if (ap > D * 0.5) { alert('Risco alto'); }.
3.3 Configuração de Ranges na Aba Settings.tsx
• Estrutura em Código: Crie componente RangesEditor em Settings.tsx:
TypeScript
interface Range { min: number; max: number; }
const rangesStore = create((set) => ({ vc: {min: 180, max: 260}, /* ... */ }));
// Edição: <Input type="number" value={ranges.vc.min} onChange={(e) => set({vc: {...ranges.vc, min: e.target.value}})} />
• Integração com Sliders: Passe props min/max para sliders em components/. Atualize ParameterHealthBar: Verde se valor in [min, max*0.8].
• Validação: Hook useValidateRanges: if (min > max) throw new Error('Range inválido');.
4. Recomendações Finais para Claude Code
• Implemente em Steps: 1. Atualize src/data/ com ranges JSON. 2. Adicione edição em Settings.tsx. 3. Integre com Zustand/sliders. 4. Teste export JSON.
• Segurança: Defaults conservadores; bloqueie L/D >6.
• Expansão: Adicione gráficos para ranges vs. reais.

