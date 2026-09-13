/**
 * ============================================================================
 * FENIX — CONTROLADOR VISUAL INTERATIVO (GOLDEN MASTER UX/UI)
 * ============================================================================
 * Implementa todo o comportamento visual e interativo do protótipo canônico.
 * Zero dependência de rede, zero cálculos arbitrários de produção.
 */

(function () {
  'use strict';

  // Chaves de persistência local (localStorage)
  const STORAGE_KEY_CONFIG = 'fenix_config_v1';
  const STORAGE_KEY_MATS = 'fenix_materiais_v1';
  const STORAGE_KEY_TOOLS = 'fenix_ferramentas_v1';

  // Passo do ajuste fino de rotação e avanço, em % do valor calculado.
  // GABARITO_PROTOTIPO.md D7 nasceu com 10%; o Mestre mudou para 5% em 07/09/2026.
  const STEP_PERCENT = 5;

  // Formatação Numérica Canônica (D8): ponto para milhar, vírgula para decimal
  function formatInt(val) {
    if (val === null || val === undefined || isNaN(val)) return '—';
    return Math.round(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function formatDec(val, decimals = 1) {
    if (val === null || val === undefined || isNaN(val)) return '—';
    const num = Number(val);
    const fixed = num.toFixed(decimals);
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join(',');
  }

  // Ajuste manual sobre o valor calculado, sempre com sinal explícito: "+5 %" / "−5 %"
  function formatOffset(off) {
    return (off > 0 ? '+' : '−') + Math.abs(off) + ' %';
  }

  function parseBrNum(val) {
    if (val === null || val === undefined || val === '') return 0;
    if (typeof val === 'number') return isNaN(val) ? 0 : val;
    const str = val.toString().trim();
    if (!str) return 0;
    // Se contém vírgula, o ponto é milhar e a vírgula é decimal (ex: "1.234,56")
    if (str.includes(',')) {
      const clean = str.replace(/\./g, '').replace(',', '.');
      const n = parseFloat(clean);
      return isNaN(n) ? 0 : n;
    }
    // Se não contém vírgula, o ponto já é decimal (ex: "0.060" ou "123.45")
    const n = parseFloat(str);
    return isNaN(n) ? 0 : n;
  }

  // Obter representação textual de valor de input sem produzir NaN quando vazio
  function valStr(val, decimals) {
    if (val === null || val === undefined || val === '') return '';
    if (typeof decimals === 'number') return formatDec(val, decimals);
    return String(val);
  }

  // Estado da Aplicação
  const state = {
    activeTab: 'fresar', // 'fresar', 'furar', 'roscar', 'mandrilar', 'configuracoes'
    previousTab: 'fresar',
    isCalculated: false, // ESTADO INICIAL: ZERO / VAZIO (Cenário A)
    isOutdated: false,
    isCalculating: false,
    activeScenarioKey: '',

    // Configurações
    safetyMargin: 100, // 100% = padrão
    brocaHSS: {
      percentualAvanco: 10,
      divisorIncremento: 25,
      tetoIncremento: 0.8
    },

    // Materiais e Ferramentas
    materiais: [],
    ferramentas: [],

    // Ajuste manual de S e F (D7)
    sOffsetPercent: 0,
    fOffsetPercent: 0,

    // Área Configurações: painéis abertos/fechados, confirmação pendente e linha de status
    panelState: {},
    confirmando: null,
    cfgStatus: null,
    // Rastreamento de campos alterados manualmente pelo operador (MVP Q1 l. 1797)
    manualmenteAjustado: {
      fresar: {},
      furar: {},
      roscar: {},
      mandrilar: {}
    },

    // Inputs ativos do painel de cálculo (valores das variáveis de cálculo no corte)
    // Estado inicial: vazio / sem preenchimento prévio
    inputs: {
      fresar: {
        materialId: '',
        ferramentaId: '',
        ferramentaTipo: '',
        geometriaId: '',
        geometria: '',
        d: '',
        r: '',
        l: '',
        z: '',
        ap: '',
        ae: '',
        lc: '',
        vc: '',
        fz: ''
      },
      furar: {
        materialId: '',
        ferramentaId: '',
        ferramentaTipo: '',
        geometriaId: '',
        geometria: '',
        d: '',
        anguloPonta: '',
        l: '',
        vc: '',
        fn: ''
      },
      roscar: {
        materialId: '',
        ferramentaId: '',
        ferramentaTipo: '',
        geometriaId: '',
        geometria: '',
        roscaDesignacao: '',
        l: '',
        vc: ''
      },
      mandrilar: {
        materialId: '',
        ferramentaId: '',
        ferramentaTipo: '',
        geometriaId: '',
        geometria: '',
        dInicial: '',
        dFinal: '',
        rEpsilon: '',
        l: '',
        vc: '',
        fn: ''
      }
    }
  };

  // Carregar dados salvos ou defaults
  function loadPersistedData() {
    try {
      const savedConfig = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        if (parsed.safetyMargin !== undefined) state.safetyMargin = parsed.safetyMargin;
        if (parsed.brocaHSS) state.brocaHSS = { ...state.brocaHSS, ...parsed.brocaHSS };
      }

      const savedMats = localStorage.getItem(STORAGE_KEY_MATS);
      if (savedMats) {
        state.materiais = JSON.parse(savedMats);
      } else {
        state.materiais = FENIX_MOCK_DATA.materiaisPadrao.map(m => ({ ...m }));
      }

      const savedTools = localStorage.getItem(STORAGE_KEY_TOOLS);
      if (savedTools) {
        const parsed = JSON.parse(savedTools);
        // Higieniza ferramentas persistidas para o modelo canônico de cadastro
        state.ferramentas = parsed.map(t => {
          const geo = FENIX_MOCK_DATA.geometrias.find(g => g.id === t.geometriaId || g.nome === t.geometria) || FENIX_MOCK_DATA.geometrias[0];
          const fam = t.tipoId || t.familia || geo.familia || 'fresar';
          const tipo = FENIX_MOCK_DATA.tiposFerramenta.find(tp => tp.id === fam) || FENIX_MOCK_DATA.tiposFerramenta[0];
          const mod = (t.modeloId && tipo.modelos.find(m => m.id === t.modeloId)) || tipo.modelos.find(m => m.geometriaId === geo.id) || tipo.modelos[0];
          return {
            id: t.id || ('fer_' + Date.now() + Math.random()),
            apelido: t.apelido || t.nome || mod.nome,
            tipoId: fam,
            familia: fam,
            modeloId: mod.id,
            geometriaId: geo.id,
            geometria: geo.nome,
            substrato: t.substrato || (geo.substratos && geo.substratos[0] === 'MD' ? 'Metal duro (MD)' : 'Aço rápido ao cobalto (HSS-Co)'),
            descricao: t.descricao || ''
          };
        });
      } else {
        state.ferramentas = FENIX_MOCK_DATA.ferramentasPadrao.map(t => ({ ...t }));
      }
    } catch (e) {
      console.warn('Erro ao carregar localStorage:', e);
      state.materiais = FENIX_MOCK_DATA.materiaisPadrao.map(m => ({ ...m }));
      state.ferramentas = FENIX_MOCK_DATA.ferramentasPadrao.map(t => ({ ...t }));
    }
  }

  function saveConfig() {
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify({
        safetyMargin: state.safetyMargin,
        brocaHSS: state.brocaHSS
      }));
    } catch (e) {
      console.warn(e);
    }
  }

  function saveMaterials() {
    try {
      localStorage.setItem(STORAGE_KEY_MATS, JSON.stringify(state.materiais));
    } catch (e) {
      console.warn(e);
    }
  }

  function saveTools() {
    try {
      localStorage.setItem(STORAGE_KEY_TOOLS, JSON.stringify(state.ferramentas));
    } catch (e) {
      console.warn(e);
    }
  }

  // Obter material atualmente selecionado na aba ativa
  function getActiveMaterial() {
    const fam = state.activeTab === 'configuracoes' ? state.previousTab : state.activeTab;
    const matId = state.inputs[fam] ? state.inputs[fam].materialId : '';
    if (!matId) return null;
    return state.materiais.find(m => m.id === matId) || null;
  }

  // Obter ferramenta atualmente selecionada na aba ativa
  function getActiveTool() {
    const fam = state.activeTab === 'configuracoes' ? state.previousTab : state.activeTab;
    const toolId = state.inputs[fam] ? state.inputs[fam].ferramentaId : '';
    if (!toolId) return null;
    return state.ferramentas.find(t => t.id === toolId) || null;
  }

  // Validar se todos os requisitos mínimos da família ativa estão preenchidos (Cenários B e C)
  function validarRequisitosCalculo(fam) {
    if (!state.inputs[fam]) return { valido: false, faltantes: ['família'] };
    const inp = state.inputs[fam];
    const mat = getActiveMaterial();
    const tool = getActiveTool();
    const faltantes = [];

    if (!mat || !inp.materialId) faltantes.push('Material');
    if (!tool || !inp.ferramentaId) faltantes.push('Ferramenta');

    if (fam === 'fresar') {
      const d = parseBrNum(inp.d);
      const l = parseBrNum(inp.l);
      const z = parseBrNum(inp.z);
      const ap = parseBrNum(inp.ap);
      const ae = parseBrNum(inp.ae);
      const vc = parseBrNum(inp.vc);
      const fz = parseBrNum(inp.fz);

      if (inp.d === '' || d <= 0) faltantes.push('Diâmetro (D)');
      if (inp.l === '' || l <= 0) faltantes.push('Balanço (L)');
      if (inp.z === '' || z < 1) faltantes.push('Número de dentes (Z)');
      if (inp.ap === '' || ap <= 0) faltantes.push('Profundidade de corte (ap)');
      if (inp.ae === '' || ae <= 0) faltantes.push('Penetração de trabalho (ae)');
      if (inp.vc === '' || vc <= 0) faltantes.push('Velocidade de corte (vc)');
      if (inp.fz === '' || fz <= 0) faltantes.push('Avanço por dente (fz)');

      if (inp.geometriaId === 'toroidal' || inp.geometria === 'Toroidal') {
        const r = parseBrNum(inp.r);
        if (inp.r === '' || r <= 0) faltantes.push('Raio de canto (r)');
      }
    } else if (fam === 'furar') {
      const d = parseBrNum(inp.d);
      const ang = parseBrNum(inp.anguloPonta);
      const l = parseBrNum(inp.l);
      const vc = parseBrNum(inp.vc);
      const fn = parseBrNum(inp.fn);

      if (inp.d === '' || d <= 0) faltantes.push('Diâmetro da broca (D)');
      if (inp.anguloPonta === '' || ang <= 0) faltantes.push('Ângulo de ponta');
      if (inp.l === '' || l <= 0) faltantes.push('Balanço (L)');
      if (inp.vc === '' || vc <= 0) faltantes.push('Velocidade de corte (vc)');
      if (inp.fn === '' || fn <= 0) faltantes.push('Avanço por rotação (fn)');
    } else if (fam === 'roscar') {
      if (!inp.roscaDesignacao) faltantes.push('Designação da rosca');
      const l = parseBrNum(inp.l);
      const vc = parseBrNum(inp.vc);

      if (inp.l === '' || l <= 0) faltantes.push('Balanço do macho (L)');
      if (inp.vc === '' || vc <= 0) faltantes.push('Velocidade de corte (vc)');
    } else if (fam === 'mandrilar') {
      const di = parseBrNum(inp.dInicial);
      const df = parseBrNum(inp.dFinal);
      const re = parseBrNum(inp.rEpsilon);
      const l = parseBrNum(inp.l);
      const vc = parseBrNum(inp.vc);
      const fn = parseBrNum(inp.fn);

      if (inp.dInicial === '' || di <= 0) faltantes.push('Diâmetro inicial (Di)');
      if (inp.dFinal === '' || df <= 0) faltantes.push('Diâmetro final (Df)');
      if (df > 0 && di > 0 && df <= di) faltantes.push('Df maior que Di');
      if (inp.rEpsilon === '' || re <= 0) faltantes.push('Raio de ponta (rε)');
      if (inp.l === '' || l <= 0) faltantes.push('Balanço (L)');
      if (inp.vc === '' || vc <= 0) faltantes.push('Velocidade de corte (vc)');
      if (inp.fn === '' || fn <= 0) faltantes.push('Avanço por rotação (fn)');
    }

    return {
      valido: faltantes.length === 0,
      faltantes
    };
  }

  // Motor Canônico de Cálculo Unificado (Cenários A a I)
  function calcularResultados(fam) {
    const validacao = validarRequisitosCalculo(fam);
    const calculado = state.isCalculated && validacao.valido;

    if (!calculado) {
      // Estado Inicial Zerado (Cenário A): estrutura visual normal completa com valores 0
      let z3Params = [];
      let resumoGeral = [];
      let isRoscar = (fam === 'roscar');
      let qVal = null;
      let passoDesc = '';

      if (fam === 'fresar') {
        z3Params = [
          { label: 'AP', val: '0,0' },
          { label: 'VC', val: '0' },
          { label: 'FZ', val: '0,000' },
          { label: 'AE', val: '0,0' }
        ];
        resumoGeral = [
          { lbl: 'Espessura de cavaco máxima (hex)', val: '0,000 mm' },
          { lbl: 'Fator de afinamento (CTF)', val: '1,00 ×' },
          { lbl: 'Taxa de remoção de material (MRR)', val: '0,00 cm³/min' },
          { lbl: 'Relação balanço/diâmetro (L/D)', val: '0,0', isAlert: false },
          { lbl: 'Velocidade de corte real (vc)', val: '0,0 m/min' },
          { lbl: 'Potência de corte na aresta (Pc)', val: '0,00 kW' },
          { lbl: 'Torque (Mc)', val: '0,0 N·m' }
        ];
      } else if (fam === 'furar') {
        z3Params = [
          { label: 'VC', val: '0' },
          { label: 'FN', val: '0,00' }
        ];
        qVal = '0,00';
        resumoGeral = [
          { lbl: 'Avanço por rotação (fn)', val: '0,00 mm/rot' },
          { lbl: 'Passo do pica-pau (Q)', val: '0,00 mm' },
          { lbl: 'Taxa de remoção (MRR)', val: '0,00 cm³/min' },
          { lbl: 'Relação balanço/diâmetro (L/D)', val: '0,0', isAlert: false },
          { lbl: 'Velocidade de corte real (vc)', val: '0,0 m/min' },
          { lbl: 'Potência de corte na aresta (Pc)', val: '0,00 kW' },
          { lbl: 'Torque (Mc)', val: '0,0 N·m' }
        ];
      } else if (fam === 'roscar') {
        z3Params = [
          { label: 'ROSCA', val: '—' },
          { label: 'VC', val: '0' },
          { label: 'PASSO', val: '0,00' }
        ];
        passoDesc = 'passo (P) 0,00 mm × rotação (n)';
        resumoGeral = [
          { lbl: 'Diâmetro nominal (D)', val: '0,0 mm' },
          { lbl: 'Broca prévia recomendada', val: '0,00 mm' },
          { lbl: 'Passo da rosca (P)', val: '0,00 mm' },
          { lbl: 'Relação balanço/diâmetro (L/D)', val: '0,0', isAlert: false },
          { lbl: 'Velocidade de corte real (vc)', val: '0,0 m/min' },
          { lbl: 'Potência de corte na aresta (Pc)', val: '0,00 kW' },
          { lbl: 'Torque (Mc)', val: '0,0 N·m' }
        ];
      } else if (fam === 'mandrilar') {
        z3Params = [
          { label: 'Ø INICIAL', val: '0' },
          { label: 'Ø FINAL', val: '0' },
          { label: 'AP', val: '0,0' },
          { label: 'FN', val: '0,00' }
        ];
        resumoGeral = [
          { lbl: 'Profundidade derivada (ap)', val: '0,0 mm' },
          { lbl: 'Raio de ponta (rε)', val: '0,0 mm' },
          { lbl: 'Relação balanço/diâmetro (L/D)', val: '0,0', isAlert: false },
          { lbl: 'Velocidade de corte real (vc)', val: '0,0 m/min' },
          { lbl: 'Potência de corte na aresta (Pc)', val: '0,00 kW' },
          { lbl: 'Torque (Mc)', val: '0,0 N·m' }
        ];
      }

      return {
        nivel: 'NORMAL',
        alertaTitulo: 'Aguardando definição dos parâmetros de corte e montagem',
        alertaCorpo: 'Preencha os campos obrigatórios da ferramenta e montagem à esquerda para habilitar o cálculo.',
        alertaExtra: null,
        z3Params,
        sVal: 0,
        fVal: 0,
        qVal,
        isRoscar,
        passoDesc,
        oQueVaiAcontecer: [
          'Aguardando execução do cálculo para análise de esforços e estabilidade do corte.'
        ],
        oQueMexer: [
          {
            titulo: 'Definição da usinagem',
            badge: null,
            acao: 'Selecione o material e a ferramenta para iniciar.',
            explicacao: 'As recomendações de otimização de tempo e redução de vibrações aparecerão aqui após o cálculo.',
            contrapartida: '—'
          }
        ],
        resumoGeral
      };
    }

    // Cálculo Ativo (quando state.isCalculated && validacao.valido)
    const mat = getActiveMaterial();
    const marginFactor = state.safetyMargin / 100;
    const sOffsetFactor = 1 + (state.sOffsetPercent / 100);
    const fOffsetFactor = 1 + (state.fOffsetPercent / 100);
    const kc11 = mat ? mat.kc11 : 1500;
    const mc = mat ? mat.mc : 0.21;

    if (fam === 'fresar') {
      const inp = state.inputs.fresar;
      const D = parseBrNum(inp.d);
      const L = parseBrNum(inp.l);
      const Z = Math.max(1, Math.round(parseBrNum(inp.z)));
      const ap = parseBrNum(inp.ap);
      const ae = parseBrNum(inp.ae);
      const vc = parseBrNum(inp.vc);
      const fz = parseBrNum(inp.fz);
      const ld = parseFloat((L / D).toFixed(1));

      let dEfetivo = D;
      if ((inp.geometriaId === 'esferica' || inp.geometria === 'Esférica') && ap > 0 && ap < D) {
        dEfetivo = 2 * Math.sqrt(ap * (D - ap));
      }

      const nBase = (vc * 1000) / (Math.PI * dEfetivo);
      const sNominal = Math.round(nBase * marginFactor * sOffsetFactor);
      const vcReal = (Math.PI * dEfetivo * sNominal) / 1000;

      const vfBase = nBase * Z * fz;
      const fNominal = Math.round(vfBase * marginFactor * fOffsetFactor);

      const eps = Math.min(1.0, Math.max(0.0001, ae / D));
      const phiMax = Math.acos(1 - 2 * eps);
      const hm = fz * (2 * eps) / phiMax;
      const ctf = eps <= 0.5 ? 1 / Math.sqrt(1 - Math.pow(1 - 2 * eps, 2)) : 1.0;
      const hex = eps <= 0.5 ? fz * Math.sqrt(1 - Math.pow(1 - 2 * eps, 2)) : fz;

      const kc = kc11 * Math.pow(Math.max(0.001, hm), -mc);
      const mrrNominal = Number(((ap * ae * fNominal) / 1000).toFixed(2));
      const pcNominal = Number(((mrrNominal * kc) / 60000).toFixed(2));
      const mcNominal = sNominal > 0 ? Number(((pcNominal * 9549) / sNominal).toFixed(1)) : 0;

      let nivel = 'NORMAL';
      let alertaTitulo = 'Nenhuma condição fora da faixa nesta combinação';
      let alertaCorpo = 'Os parâmetros informados respeitam os limites geométricos e as referências rígidas de corte.';
      let alertaExtra = null;

      if (ae > D) {
        nivel = 'CRÍTICO';
        alertaTitulo = `Penetração de trabalho (ae) ${formatDec(ae, 1)} mm, maior que o diâmetro da ferramenta (D) ${formatDec(D, 1)} mm (+${formatDec(ae - D, 1)} mm)`;
        alertaCorpo = 'A fresa corta no máximo a própria largura: o cálculo descreve remoção fisicamente impossível fora da aresta física.';
        if (ld > 4.0) alertaExtra = `Mais uma condição ativa: relação balanço/diâmetro (L/D) em ${formatDec(ld, 1)} excede 4,0`;
      } else if (ld > 4.0) {
        nivel = 'ATENÇÃO';
        const diffPerc = Math.round(((ld / 4.0) - 1) * 100);
        alertaTitulo = `Relação balanço/diâmetro (L/D) ${formatDec(ld, 1)}, acima do limiar de 4,0 da haste comum (+${diffPerc}%)`;
        alertaCorpo = 'A ferramenta flete e tende a vibrar: a deflexão cresce com o cubo dessa relação, e a 4,5 ela é 42% maior que no limiar.';
      }

      return {
        nivel,
        alertaTitulo,
        alertaCorpo,
        alertaExtra,
        z3Params: [
          { label: 'AP', val: formatDec(ap, 1) },
          { label: 'VC', val: inp.vc },
          { label: 'FZ', val: formatDec(fz, 3) },
          { label: 'AE', val: formatDec(ae, 1) }
        ],
        sVal: sNominal,
        fVal: fNominal,
        qVal: null,
        isRoscar: false,
        passoDesc: '',
        oQueVaiAcontecer: [
          ld > 4.0 ? `A ferramenta tende a vibrar. A relação balanço/diâmetro (L/D) está em ${formatDec(ld, 1)}, acima do limiar de 4,0 da haste comum.` : 'Usinagem em balanço rígido e estável.',
          `Espessura de cavaco média (hm) em ${formatDec(hm, 3)} mm com avanço por dente de ${formatDec(fz, 3)} mm/dente.`,
          `Potência de corte estimada na aresta: ${formatDec(pcNominal, 2)} kW · Torque: ${formatDec(mcNominal, 1)} N·m · Taxa de remoção (MRR): ${formatDec(mrrNominal, 2)} cm³/min.`
        ],
        oQueMexer: [
          {
            titulo: 'Para a ferramenta parar de vibrar',
            badge: ld > 4.0 ? 'Resolve o alerta' : null,
            acao: `Reduza a penetração de trabalho (ae), hoje ${formatDec(ae, 1)} mm — o teto recomendado para balanço longo é 25% do diâmetro (${formatDec(D * 0.25, 1)} mm).`,
            explicacao: 'A força radial cai com a seção de cavaco e a deflexão cai com ela, sem mexer no balanço que a peça exige. Não há valor publicado para quanto reduzir: acompanhe no recálculo.',
            contrapartida: 'Em troca: a taxa de remoção cai e a peça leva mais passadas.'
          },
          {
            titulo: 'Para usinar mais rápido',
            badge: null,
            acao: `Aumente o avanço por dente (fz) para ${formatDec(fz * 1.4, 3)} mm/dente.`,
            explicacao: 'Aumenta a taxa de remoção volumétrica em aproximadamente 40%.',
            contrapartida: 'Em troca: exige mais potência do spindle e acentua esforços na haste.'
          }
        ],
        resumoGeral: [
          { lbl: 'Espessura de cavaco máxima (hex)', val: `${formatDec(hex, 3)} mm` },
          { lbl: 'Fator de afinamento (CTF)', val: `${formatDec(ctf, 2)} ×` },
          { lbl: 'Taxa de remoção de material (MRR)', val: `${formatDec(mrrNominal, 2)} cm³/min` },
          { lbl: 'Relação balanço/diâmetro (L/D)', val: formatDec(ld, 1), isAlert: ld > 4.0 },
          { lbl: 'Velocidade de corte real (vc)', val: `${formatDec(vcReal, 1)} m/min` },
          { lbl: 'Potência de corte na aresta (Pc)', val: `${formatDec(pcNominal, 2)} kW` },
          { lbl: 'Torque (Mc)', val: `${formatDec(mcNominal, 1)} N·m` }
        ]
      };
    } else if (fam === 'furar') {
      const inp = state.inputs.furar;
      const D = parseBrNum(inp.d);
      const ang = parseBrNum(inp.anguloPonta) || 140;
      const L = parseBrNum(inp.l);
      const vc = parseBrNum(inp.vc);
      const fn = parseBrNum(inp.fn);
      const ld = parseFloat((L / D).toFixed(1));

      const nBase = (vc * 1000) / (Math.PI * D);
      const sNominal = Math.round(nBase * marginFactor * sOffsetFactor);
      const vcReal = (Math.PI * D * sNominal) / 1000;

      const vfBase = nBase * fn;
      const fNominal = Math.round(vfBase * marginFactor * fOffsetFactor);

      const kappaRad = ((ang / 2) * Math.PI) / 180;
      const h = (fn / 2) * Math.sin(kappaRad);
      const kc = kc11 * Math.pow(Math.max(0.001, h), -mc);

      const pcNominal = Number(((kc * fn * D * vcReal) / 240000).toFixed(2));
      const mcNominal = Number(((kc * fn * Math.pow(D, 2)) / 8000).toFixed(1));
      const mrrNominal = Number(((Math.PI * Math.pow(D, 2) * fNominal) / 4000).toFixed(2));
      const qNominal = Math.min(D / state.brocaHSS.divisorIncremento, state.brocaHSS.tetoIncremento);

      return {
        nivel: 'NORMAL',
        alertaTitulo: 'Nenhuma condição fora da faixa nesta combinação',
        alertaCorpo: `A velocidade de corte (vc) está em ${inp.vc} m/min, dentro da janela recomendada para broca neste material.`,
        alertaExtra: null,
        z3Params: [
          { label: 'VC', val: inp.vc },
          { label: 'FN', val: formatDec(fn, 2) }
        ],
        sVal: sNominal,
        fVal: fNominal,
        qVal: formatDec(qNominal, 2),
        isRoscar: false,
        passoDesc: '',
        oQueVaiAcontecer: [
          `Furação em regime estável. Avanço sincronizado em fn de ${formatDec(fn, 2)} mm/rot.`,
          `Ciclo com pica-pau descarrega o cavaco a cada ${formatDec(qNominal, 2)} mm (D/${state.brocaHSS.divisorIncremento} com teto ${formatDec(state.brocaHSS.tetoIncremento, 1)} mm).`,
          `Taxa de remoção volumétrica (MRR): ${formatDec(mrrNominal, 1)} cm³/min · Potência: ${formatDec(pcNominal, 2)} kW · Torque: ${formatDec(mcNominal, 1)} N·m · Relação L/D: ${formatDec(ld, 1)}.`
        ],
        oQueMexer: [
          {
            titulo: 'Para furar mais rápido',
            badge: null,
            acao: `Aumente a velocidade de corte (vc) em cerca de 25%.`,
            explicacao: 'A rotação e o avanço sobem proporcionalmente, reduzindo o tempo de ciclo.',
            contrapartida: 'Em troca: eleva a temperatura de ponta; garanta boa refrigeração.'
          }
        ],
        resumoGeral: [
          { lbl: 'Avanço por rotação (fn)', val: `${formatDec(fn, 2)} mm/rot` },
          { lbl: 'Passo do pica-pau (Q)', val: `${formatDec(qNominal, 2)} mm` },
          { lbl: 'Taxa de remoção (MRR)', val: `${formatDec(mrrNominal, 2)} cm³/min` },
          { lbl: 'Relação balanço/diâmetro (L/D)', val: formatDec(ld, 1), isAlert: ld > 4.0 },
          { lbl: 'Velocidade de corte real (vc)', val: `${formatDec(vcReal, 1)} m/min` },
          { lbl: 'Potência de corte na aresta (Pc)', val: `${formatDec(pcNominal, 2)} kW` },
          { lbl: 'Torque (Mc)', val: `${formatDec(mcNominal, 1)} N·m` }
        ]
      };
    } else if (fam === 'roscar') {
      const inp = state.inputs.roscar;
      const rosca = FENIX_MOCK_DATA.tabelaRoscas.find(r => r.designacao === inp.roscaDesignacao) || { d: 8, passo: 1.25, brocaPrevia: 6.8 };
      const D = rosca.d;
      const L = parseBrNum(inp.l);
      const vc = parseBrNum(inp.vc);
      const ld = parseFloat((L / D).toFixed(1));

      const nBase = (vc * 1000) / (Math.PI * D);
      const sNominal = Math.round(nBase * marginFactor * sOffsetFactor);
      const vcReal = (Math.PI * D * sNominal) / 1000;
      const fNominal = Math.round(sNominal * rosca.passo);

      const h = rosca.passo;
      const kc = kc11 * Math.pow(Math.max(0.001, h), -mc);
      const pcNominal = Number(((kc * rosca.passo * D * vcReal) / 240000).toFixed(2));
      const mcNominal = Number(((kc * rosca.passo * Math.pow(D, 2)) / 8000).toFixed(1));

      let nivel = 'NORMAL';
      let alertaTitulo = 'Nenhuma condição fora da faixa nesta combinação';
      let alertaCorpo = `Velocidade de avanço (vf) travada rigidamente pela cinemática do passo de rosca (${formatDec(rosca.passo, 2)} mm × n).`;
      let alertaExtra = null;

      if (vc > 40) {
        nivel = 'CRÍTICO';
        alertaTitulo = `Velocidade de corte (${vc} m/min) excede o teto seguro para machos de corte (40 m/min)`;
        alertaCorpo = 'Machos de corte operam sob atrito severo; velocidades elevadas causam soldagem a frio dos cavacos e quebra prematura.';
      }

      return {
        nivel,
        alertaTitulo,
        alertaCorpo,
        alertaExtra,
        z3Params: [
          { label: 'ROSCA', val: rosca.designacao },
          { label: 'VC', val: inp.vc },
          { label: 'PASSO', val: formatDec(rosca.passo, 2) }
        ],
        sVal: sNominal,
        fVal: fNominal,
        qVal: null,
        isRoscar: true,
        passoDesc: `passo (P) ${formatDec(rosca.passo, 2)} mm × rotação (n)`,
        oQueVaiAcontecer: [
          `Rosqueamento métrico ${rosca.designacao} em furo prévio de Ø ${formatDec(rosca.brocaPrevia, 2)} mm.`,
          `O avanço é travado fisicamente pelo passo da rosca para evitar deformação ou corte duplo dos filetes.`
        ],
        oQueMexer: [
          {
            titulo: 'Para rosquear com menor risco',
            badge: null,
            acao: 'Reduza a velocidade de corte (vc) se a reversão apresentar trancos.',
            explicacao: 'A rotação e o avanço caem proporcionalmente, oferecendo maior controle na reversão do macho.',
            contrapartida: 'Ciclo ligeiramente mais longo por furo.'
          }
        ],
        resumoGeral: [
          { lbl: 'Diâmetro nominal (D)', val: `${formatDec(rosca.d, 1)} mm` },
          { lbl: 'Broca prévia recomendada', val: `${formatDec(rosca.brocaPrevia, 2)} mm` },
          { lbl: 'Passo da rosca (P)', val: `${formatDec(rosca.passo, 2)} mm` },
          { lbl: 'Relação balanço/diâmetro (L/D)', val: formatDec(ld, 1), isAlert: ld > 4.0 },
          { lbl: 'Velocidade de corte real (vc)', val: `${formatDec(vcReal, 1)} m/min` },
          { lbl: 'Potência de corte na aresta (Pc)', val: `${formatDec(pcNominal, 2)} kW` },
          { lbl: 'Torque (Mc)', val: `${formatDec(mcNominal, 1)} N·m` }
        ]
      };
    } else if (fam === 'mandrilar') {
      const inp = state.inputs.mandrilar;
      const di = parseBrNum(inp.dInicial);
      const df = parseBrNum(inp.dFinal);
      const re = parseBrNum(inp.rEpsilon);
      const L = parseBrNum(inp.l);
      const vc = parseBrNum(inp.vc);
      const fn = parseBrNum(inp.fn);
      const apCalc = Math.max(0, (df - di) / 2);
      const ld = parseFloat((L / df).toFixed(1));

      const nBase = (vc * 1000) / (Math.PI * df);
      const sNominal = Math.round(nBase * marginFactor * sOffsetFactor);
      const vcReal = (Math.PI * df * sNominal) / 1000;

      const vfBase = nBase * fn;
      const fNominal = Math.round(vfBase * marginFactor * fOffsetFactor);

      const mrrNominal = Number(((Math.PI * (Math.pow(df, 2) - Math.pow(di, 2)) * fNominal) / 4000).toFixed(2));
      const h = fn;
      const kc = kc11 * Math.pow(Math.max(0.001, h), -mc);
      const pcNominal = Number(((mrrNominal * kc / 60000) * (df > 0 ? (1 - apCalc / df) : 1)).toFixed(2));
      const mcNominal = sNominal > 0 ? Number(((pcNominal * 9549) / sNominal).toFixed(1)) : 0;

      // Gatilho 5 tambem vale para mandrilar: barra comum avisa acima de 4 x D (E4 §3.2).
      const barraAcimaDoLimiar = ld > 4.0;

      return {
        nivel: barraAcimaDoLimiar ? 'ATENÇÃO' : 'NORMAL',
        alertaTitulo: barraAcimaDoLimiar
          ? `Relação balanço/diâmetro (L/D) ${formatDec(ld, 1)}, acima do limiar de 4,0 da barra de mandrilar comum (+${Math.round(((ld / 4.0) - 1) * 100)}%)`
          : 'Nenhuma condição fora da faixa nesta combinação',
        alertaCorpo: barraAcimaDoLimiar
          ? 'A barra flete e tende a vibrar: a deflexão cresce com o cubo dessa relação. Barra amortecida de aço avisa só acima de 10 × D; com reforço de metal duro, acima de 14 × D.'
          : `Balanço relativo L/D em ${formatDec(ld, 1)} dentro da zona de rigidez ideal (< 4,0).`,
        alertaExtra: null,
        z3Params: [
          { label: 'Ø INICIAL', val: inp.dInicial },
          { label: 'Ø FINAL', val: inp.dFinal },
          { label: 'AP', val: formatDec(apCalc, 1) },
          { label: 'FN', val: formatDec(fn, 2) }
        ],
        sVal: sNominal,
        fVal: fNominal,
        qVal: null,
        isRoscar: false,
        passoDesc: '',
        oQueVaiAcontecer: [
          `Mandrilamento de precisão expandindo de Ø ${inp.dInicial} mm para Ø ${inp.dFinal} mm em passe único (ap = ${formatDec(apCalc, 1)} mm).`,
          `Pastilha com raio de ponta rε = ${formatDec(re, 1)} mm e avanço de ${formatDec(fn, 2)} mm/rot garantem rugosidade geométrica controlada.`
        ],
        oQueMexer: [
          ...(barraAcimaDoLimiar ? [{
            titulo: 'Para a barra parar de vibrar',
            badge: 'Resolve o alerta',
            acao: `Reduza a profundidade por passe (ap), hoje ${formatDec(apCalc, 1)} mm — o piso é 2/3 do raio de ponta (rε ${formatDec(re, 1)} mm), ou seja ${formatDec(re * 2 / 3, 1)} mm.`,
            explicacao: 'Menos profundidade, menos força radial — a que fleta a barra no balanço que o furo exige. Abaixo do piso a aresta trabalha só no raio e esfrega em vez de cortar.',
            contrapartida: 'Em troca: a expansão do furo passa a exigir mais passes.'
          }] : []),
          {
            titulo: 'Para obter acabamento espelhado',
            badge: null,
            acao: 'Reduza o avanço por rotação (fn) para 0,12 mm/rot.',
            explicacao: 'Minimiza a crista helicoidal residual na superfície interna.',
            contrapartida: 'Aumenta o tempo de usinagem por furo.'
          }
        ],
        resumoGeral: [
          { lbl: 'Profundidade derivada (ap)', val: `${formatDec(apCalc, 1)} mm` },
          { lbl: 'Raio de ponta (rε)', val: `${formatDec(re, 1)} mm` },
          { lbl: 'Relação balanço/diâmetro (L/D)', val: formatDec(ld, 1), isAlert: ld > 4.0 },
          { lbl: 'Velocidade de corte real (vc)', val: `${formatDec(vcReal, 1)} m/min` },
          { lbl: 'Potência de corte na aresta (Pc)', val: `${formatDec(pcNominal, 2)} kW` },
          { lbl: 'Torque (Mc)', val: `${formatDec(mcNominal, 1)} N·m` }
        ]
      };
    }
  }

  // Atualizar o botão Calcular e o feedback da validação
  function atualizarEstadoBotaoCalcular(fam) {
    const ctaBtn = document.getElementById('btn-calcular');
    const fb = document.getElementById('calc-feedback');
    const validacao = validarRequisitosCalculo(fam);
    const isCalc = state.isCalculated && !state.isOutdated;

    if (ctaBtn) {
      if (!validacao.valido) {
        ctaBtn.disabled = true;
        ctaBtn.classList.add('btn-cta-disabled');
        ctaBtn.classList.remove('is-calculated');
        ctaBtn.title = `Preencha os campos obrigatórios para calcular: ${validacao.faltantes.join(', ')}`;
        ctaBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          Calcular Parâmetros
        `;
      } else {
        ctaBtn.disabled = false;
        ctaBtn.classList.remove('btn-cta-disabled');
        ctaBtn.title = isCalc ? 'Parâmetros sincronizados' : 'Calcular Parâmetros';
        if (isCalc) {
          ctaBtn.classList.add('is-calculated');
          ctaBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
            Parâmetros Atualizados
          `;
        } else {
          ctaBtn.classList.remove('is-calculated');
          ctaBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            Calcular Parâmetros
          `;
        }
      }
    }

    if (fb) {
      if (!validacao.valido) {
        fb.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="7"></circle><line x1="8" y1="8" x2="8" y2="12"></line><line x1="8" y1="4" x2="8.01" y2="4"></line></svg>
          Pendente: ${validacao.faltantes.slice(0, 3).join(', ')}${validacao.faltantes.length > 3 ? '...' : ''}
        `;
        fb.style.opacity = '0.9';
      } else if (isCalc) {
        fb.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5 L6.5 12 L13 4.5"></path></svg>
          Parâmetros sincronizados com a montagem
        `;
        fb.style.opacity = '1';
      } else {
        fb.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5 L6.5 12 L13 4.5"></path></svg>
          Requisitos preenchidos — pronto para calcular
        `;
        fb.style.opacity = '1';
      }
    }
  }

  // Recálculo dinâmico em tempo real e interdependência (Cenários D, E, F, G, H)
  function recalcularDinamico(origem) {
    const fam = state.activeTab === 'configuracoes' ? state.previousTab : state.activeTab;
    const inp = state.inputs[fam];
    if (!inp) return;

    if (state.isCalculated) {
      if (origem === 's') {
        // Alteração em rotação (n) -> atualiza velocidade de corte vc
        const D = fam === 'mandrilar' ? parseBrNum(inp.dFinal) : (fam === 'roscar' ? (FENIX_MOCK_DATA.tabelaRoscas.find(r => r.designacao === inp.roscaDesignacao)?.d || 8) : parseBrNum(inp.d));
        if (D > 0) {
          const sOffsetFactor = 1 + (state.sOffsetPercent / 100);
          const marginFactor = state.safetyMargin / 100;
          const baseS = (parseBrNum(inp.vc) * 1000) / (Math.PI * D);
          const nAtual = Math.round(baseS * marginFactor * sOffsetFactor);
          const novoVc = Math.round((Math.PI * D * nAtual) / 1000);
          inp.vc = novoVc;
          const vcInput = document.getElementById(fam === 'furar' ? 'fu-vc' : (fam === 'mandrilar' ? 'man-vc' : (fam === 'roscar' ? 'ro-vc' : 'f-vc')));
          if (vcInput) vcInput.value = novoVc.toString();
        }
      } else if (origem === 'f' && fam !== 'roscar') {
        // Alteração em avanço da mesa (vf) -> fz ou fn se recalcula
        const fOffsetFactor = 1 + (state.fOffsetPercent / 100);
        if (fam === 'fresar') {
          const fzBase = parseBrNum(inp.fz);
          const novoFz = Number((fzBase * fOffsetFactor).toFixed(3));
          inp.fz = novoFz;
          const fzInput = document.getElementById('f-fz');
          if (fzInput) fzInput.value = formatDec(novoFz, 3);
        } else if (fam === 'furar' || fam === 'mandrilar') {
          const fnBase = parseBrNum(inp.fn);
          const novoFn = Number((fnBase * fOffsetFactor).toFixed(2));
          inp.fn = novoFn;
          const fnInput = document.getElementById(fam === 'furar' ? 'fu-fn' : 'man-fn');
          if (fnInput) fnInput.value = formatDec(novoFn, 2);
        }
      }

      renderHeaderZ1();
      renderCalculatedResults();
      atualizarEstadoBotaoCalcular(fam);
    } else {
      atualizarEstadoBotaoCalcular(fam);
      renderHeaderZ1();
    }
  }

  // Executar cálculo de corte
  function executeCalculation() {
    const fam = state.activeTab === 'configuracoes' ? state.previousTab : state.activeTab;
    const validacao = validarRequisitosCalculo(fam);
    if (!validacao.valido) return;

    state.isCalculating = true;
    const ctaBtn = document.getElementById('btn-calcular');
    if (ctaBtn) {
      ctaBtn.classList.add('loading');
      ctaBtn.innerHTML = `Calculando Parâmetros...`;
    }

    setTimeout(() => {
      state.isCalculating = false;
      state.isCalculated = true;
      state.isOutdated = false;
      state.sOffsetPercent = 0;
      state.fOffsetPercent = 0;

      atualizarEstadoBotaoCalcular(fam);
      renderHeaderZ1();
      renderCalculatedResults();

      // Pulso sutil de confirmação visual nos resultados
      const resCol = document.getElementById('col-resultados-content');
      if (resCol) {
        resCol.classList.remove('calc-pulse');
        void resCol.offsetWidth;
        resCol.classList.add('calc-pulse');
      }
    }, 240);
  }

  // Interpolação linear da curva de avanço por dente (fz) por diâmetro (MVP §11.3)
  function interpolarFzPorDiametro(d) {
    const curva = (typeof FENIX_MOCK_DATA !== 'undefined' && FENIX_MOCK_DATA.curvaFzPorDiametro) || [];
    if (!curva || curva.length === 0) return 0.060;
    const numD = Number(d);
    if (!numD || isNaN(numD) || numD <= 0) {
      // Se diâmetro ainda não informado pelo operador, adota o ponto de referência Ø10 mm (MVP §7.6.1 / §11.3)
      const p10 = curva.find(p => p.d === 10);
      return p10 ? p10.fz : 0.140;
    }
    if (numD <= curva[0].d) return curva[0].fz;
    if (numD >= curva[curva.length - 1].d) return curva[curva.length - 1].fz;

    for (let i = 0; i < curva.length - 1; i++) {
      const p0 = curva[i];
      const p1 = curva[i + 1];
      if (numD >= p0.d && numD <= p1.d) {
        const t = (numD - p0.d) / (p1.d - p0.d);
        const fz = p0.fz + t * (p1.fz - p0.fz);
        return Number(fz.toFixed(3));
      }
    }
    return 0.140;
  }

  // Fonte única de derivação de valores de partida canônicos (MVP §3.2, §3.5, §11.2, §11.3 e CANONICO_FURACAO)
  function derivarValoresDePartida(fam, matId, toolId, currentInputs) {
    const mat = state.materiais.find(m => m.id === matId) || (matId && typeof FENIX_MOCK_DATA !== 'undefined' ? FENIX_MOCK_DATA.materiaisPadrao.find(m => m.id === matId) : null);
    const fer = state.ferramentas.find(t => t.id === toolId) || (toolId && typeof FENIX_MOCK_DATA !== 'undefined' ? FENIX_MOCK_DATA.ferramentasPadrao.find(t => t.id === toolId) : null);
    const geo = fer ? (typeof FENIX_MOCK_DATA !== 'undefined' && FENIX_MOCK_DATA.geometrias.find(g => g.id === fer.geometriaId || g.nome === fer.geometria) || null) : null;
    const substrato = fer ? (fer.substrato || 'Metal duro (MD)') : '';
    const isHSS = substrato.includes('HSS') || substrato.includes('aço rápido') || substrato.includes('Aço rápido');
    const fatorSub = isHSS ? (FENIX_MOCK_DATA.fatoresSubstrato?.['HSS-Co'] || 0.25) : 1.0;

    const res = {};

    if (fam === 'fresar') {
      // vc: partida do material x fator do substrato (se ferramenta selecionada)
      if (mat) {
        res.vc = fer ? Math.round(mat.vcPartida * fatorSub) : mat.vcPartida;
      }
      if (fer && geo) {
        // ap: padrão da geometria (MVP §3.2)
        if (geo.apPartida !== undefined) res.ap = geo.apPartida;
        // ae: padrão da geometria (MVP §3.2); cabeçote faceador usa 0.7 * D
        if (geo.aePartida === '0.7*D') {
          const dVal = (currentInputs && currentInputs.d) ? parseBrNum(currentInputs.d) : 0;
          if (dVal > 0) res.ae = Number((0.7 * dVal).toFixed(2));
        } else if (typeof geo.aePartida === 'number') {
          res.ae = geo.aePartida;
        }
        // fz: curva por diâmetro (MVP §11.3)
        const dVal = (currentInputs && currentInputs.d) ? parseBrNum(currentInputs.d) : 0;
        res.fz = interpolarFzPorDiametro(dVal);
      }
    } else if (fam === 'furar') {
      if (mat) {
        if (fer && isHSS) {
          // CANONICO_FURACAO §2.1 linha 331 / R9: broca helicoidal HSS em aço 1045 -> vc 16 m/min (piso da faixa 16–30)
          res.vc = (mat.id === '1045' || (mat.nome && mat.nome.includes('1045'))) ? 16 : Math.round(mat.vcPartida * fatorSub);
        } else {
          res.vc = fer ? Math.round(mat.vcPartida * fatorSub) : mat.vcPartida;
        }
      }
      if (fer) {
        // CANONICO_FURACAO §2.1: avanço padrão da broca
        res.fn = 0.10;
        res.anguloPonta = isHSS ? 118 : 140;
      }
    } else if (fam === 'roscar') {
      if (mat) {
        if (fer) {
          const isMacho = geo ? (geo.id.includes('macho') || geo.nome.includes('Macho')) : true;
          if (isMacho) {
            // CANONICO_FURACAO §2.2 linha 346: macho de corte HSS em aço 1045 -> vc 14 m/min (faixa 10-18)
            res.vc = (mat.id === '1045' || (mat.nome && mat.nome.includes('1045'))) ? 14 : Math.round(mat.vcPartida * 0.10);
          } else {
            res.vc = mat.vcPartida;
          }
        } else {
          res.vc = mat.vcPartida;
        }
      }
    } else if (fam === 'mandrilar') {
      if (mat) {
        res.vc = fer ? Math.round(mat.vcPartida * fatorSub) : mat.vcPartida;
      }
      if (fer) {
        // CANONICO_FURACAO §2.3: fn de mandrilamento em aço 1045 = 0,04 a 0,12 mm/rot.
        // A fonte publica faixa e não aponta partida; adotado o centro dela, 0,08 — o extremo alto
        // é o lado errado para partida numa barra em balanço (acabamento e deflexão pioram com
        // avanço), e o extremo baixo a fonte não declara como partida. Ponto = decisão de projeto.
        res.fn = 0.08;
        res.rEpsilon = 0.4;
      }
    }

    return res;
  }

  // Restaurar parâmetros da família ativa para os valores de partida padrão
  function resetActiveFamilyParams() {
    const fam = state.activeTab === 'configuracoes' ? state.previousTab : state.activeTab;
    state.sOffsetPercent = 0;
    state.fOffsetPercent = 0;

    // Limpa registros de ajuste manual da família ativa
    state.manualmenteAjustado[fam] = {};

    const matId = state.inputs[fam] ? state.inputs[fam].materialId : '';
    const toolId = state.inputs[fam] ? state.inputs[fam].ferramentaId : '';

    const defaults = derivarValoresDePartida(fam, matId, toolId, state.inputs[fam]);

    if (fam === 'fresar') {
      if (defaults.vc !== undefined) state.inputs.fresar.vc = defaults.vc;
      if (defaults.ap !== undefined) state.inputs.fresar.ap = defaults.ap;
      if (defaults.ae !== undefined) state.inputs.fresar.ae = defaults.ae;
      if (defaults.fz !== undefined) state.inputs.fresar.fz = defaults.fz;
    } else if (fam === 'furar') {
      if (defaults.vc !== undefined) state.inputs.furar.vc = defaults.vc;
      if (defaults.fn !== undefined) state.inputs.furar.fn = defaults.fn;
      if (defaults.anguloPonta !== undefined) state.inputs.furar.anguloPonta = defaults.anguloPonta;
    } else if (fam === 'roscar') {
      if (defaults.vc !== undefined) state.inputs.roscar.vc = defaults.vc;
    } else if (fam === 'mandrilar') {
      if (defaults.vc !== undefined) state.inputs.mandrilar.vc = defaults.vc;
      if (defaults.fn !== undefined) state.inputs.mandrilar.fn = defaults.fn;
      if (defaults.rEpsilon !== undefined) state.inputs.mandrilar.rEpsilon = defaults.rEpsilon;
    }

    const val = validarRequisitosCalculo(fam);
    if (state.isCalculated && val.valido) {
      state.isOutdated = false;
      renderCalculatedResults();
    } else {
      atualizarEstadoBotaoCalcular(fam);
    }
    renderHeaderZ1();
    renderConfigForm();

    const fb = document.getElementById('calc-feedback');
    if (fb) {
      fb.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
        Valores restaurados para o padrão de partida
      `;
      fb.style.opacity = '1';
      setTimeout(() => { if (fb) fb.style.opacity = '0.7'; }, 2600);
    }
  }

  // Alternar gavetas e painéis recolhíveis (D9 / D11 WAI-ARIA)
  function setupCollapsible(triggerEl, panelEl) {
    if (!triggerEl || !panelEl) return;

    // Restaura o que o operador tinha aberto antes do último render
    if (panelEl.id && state.panelState[panelEl.id] !== undefined) {
      const aberto = state.panelState[panelEl.id];
      triggerEl.setAttribute('aria-expanded', aberto ? 'true' : 'false');
      panelEl.hidden = !aberto;
    }

    triggerEl.addEventListener('click', () => {
      const isExpanded = triggerEl.getAttribute('aria-expanded') === 'true';
      triggerEl.setAttribute('aria-expanded', !isExpanded);
      panelEl.hidden = isExpanded;
      if (panelEl.id) state.panelState[panelEl.id] = !isExpanded;
    });
  }

  // Configurar campos com incremento e decremento (step +/-)
  function setupStepControls() {
    document.querySelectorAll('.sctl').forEach(sctl => {
      const input = sctl.querySelector('input');
      const minusBtn = sctl.querySelector('.step:first-child');
      const plusBtn = sctl.querySelector('.step:last-child');
      if (!input || !minusBtn || !plusBtn) return;

      const stepVal = parseFloat(input.dataset.step) || 1;
      const decimals = parseInt(input.dataset.decimals) || 0;

      minusBtn.onclick = () => {
        let val = parseBrNum(input.value);
        val -= stepVal;
        if (val < 0) val = 0;
        if (input.dataset.min !== undefined && val < parseFloat(input.dataset.min)) {
          val = parseFloat(input.dataset.min);
        }
        input.value = decimals > 0 ? formatDec(val, decimals) : val.toString();
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      };

      plusBtn.onclick = () => {
        let val = parseBrNum(input.value);
        val += stepVal;
        input.value = decimals > 0 ? formatDec(val, decimals) : val.toString();
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      };
    });
  }

  // Atualizar cabeçalho Z1 de identidade
  function renderHeaderZ1() {
    const z1 = document.getElementById('z1-identidade');
    if (!z1) return;

    const fam = state.activeTab === 'configuracoes' ? state.previousTab : state.activeTab;
    const mat = getActiveMaterial();
    const marginBadge = state.safetyMargin !== 100
      ? `<span class="z1-badge-margin"><svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="7"></circle><path d="M8 5v4"></path></svg>Margem: ${state.safetyMargin}%</span>`
      : '';

    const ferCadastrada = getActiveTool();
    const inp = state.inputs[fam] || {};

    let matStr = '';
    if (mat) {
      matStr = `
        <span class="z1-chip">
          <span class="zidlbl">Material</span>
          <span class="zidval">${mat.nome}</span>
          <span class="tag" style="background:var(--surface-hover-field);border-color:var(--border-subtle);color:var(--tx-1);padding:1px 6px;font-size:10px">ISO ${mat.classeISO}</span>
        </span>
      `;
    } else {
      matStr = `
        <span class="z1-chip">
          <span class="zidlbl">Material</span>
          <span class="zidval" style="color:var(--tx-3)">Nenhum material selecionado</span>
        </span>
      `;
    }

    let toolStr = '';
    if (fam === 'fresar') {
      if (ferCadastrada || inp.ferramentaId || inp.d) {
        const nomeFer = ferCadastrada ? ferCadastrada.apelido : (inp.geometria ? `Fresa ${inp.geometria}` : 'Fresa');
        toolStr = `
          <span class="z1-chip">
            <span class="zidlbl">Ferramenta</span>
            <span class="zidval">${nomeFer}${inp.geometria ? ` (${inp.geometria})` : ''}</span>
          </span>
          <span class="z1-chip">
            <span class="zidlbl">Dimensões</span>
            <span class="zidval">${inp.d ? `<span class="num">Ø${inp.d}</span> mm` : 'Ø—'}${inp.r ? ` · <span class="num">r ${formatDec(inp.r, 1)}</span>` : ''}${inp.z ? ` · <span class="num">Z${inp.z}</span>` : ''}${inp.l ? ` · <span class="num">L${inp.l}</span> mm` : ''}</span>
          </span>
        `;
      } else {
        toolStr = `
          <span class="z1-chip">
            <span class="zidlbl">Ferramenta</span>
            <span class="zidval" style="color:var(--tx-3)">Nenhuma ferramenta selecionada</span>
          </span>
          <span class="z1-chip">
            <span class="zidlbl">Dimensões</span>
            <span class="zidval" style="color:var(--tx-3)">—</span>
          </span>
        `;
      }
    } else if (fam === 'furar') {
      if (ferCadastrada || inp.ferramentaId || inp.d) {
        const nomeFer = ferCadastrada ? ferCadastrada.apelido : (inp.geometria || 'Broca');
        const sub = ferCadastrada ? ferCadastrada.substrato : (inp.ferramentaTipo || 'HSS-Co');
        toolStr = `
          <span class="z1-chip">
            <span class="zidlbl">Ferramenta</span>
            <span class="zidval">${nomeFer} (${sub})</span>
          </span>
          <span class="z1-chip">
            <span class="zidlbl">Dimensões</span>
            <span class="zidval">${inp.d ? `<span class="num">Ø${inp.d}</span> mm` : 'Ø—'}${inp.anguloPonta ? ` · <span class="num">${inp.anguloPonta}°</span>` : ''}${inp.l ? ` · <span class="num">L${inp.l}</span> mm` : ''}</span>
          </span>
        `;
      } else {
        toolStr = `
          <span class="z1-chip">
            <span class="zidlbl">Ferramenta</span>
            <span class="zidval" style="color:var(--tx-3)">Nenhuma ferramenta selecionada</span>
          </span>
          <span class="z1-chip">
            <span class="zidlbl">Dimensões</span>
            <span class="zidval" style="color:var(--tx-3)">—</span>
          </span>
        `;
      }
    } else if (fam === 'roscar') {
      if (ferCadastrada || inp.ferramentaId || inp.roscaDesignacao) {
        const nomeFer = ferCadastrada ? ferCadastrada.apelido : 'Macho de Corte';
        toolStr = `
          <span class="z1-chip">
            <span class="zidlbl">Rosca</span>
            <span class="zidval">${inp.roscaDesignacao || 'Não definida'}</span>
          </span>
          <span class="z1-chip">
            <span class="zidlbl">Montagem</span>
            <span class="zidval">${nomeFer}${inp.l ? ` · <span class="num">L${inp.l}</span> mm` : ''}</span>
          </span>
        `;
      } else {
        toolStr = `
          <span class="z1-chip">
            <span class="zidlbl">Rosca</span>
            <span class="zidval" style="color:var(--tx-3)">Nenhuma rosca selecionada</span>
          </span>
          <span class="z1-chip">
            <span class="zidlbl">Montagem</span>
            <span class="zidval" style="color:var(--tx-3)">—</span>
          </span>
        `;
      }
    } else if (fam === 'mandrilar') {
      if (ferCadastrada || inp.ferramentaId || inp.dFinal) {
        const nomeFer = ferCadastrada ? ferCadastrada.apelido : 'Barra Única';
        toolStr = `
          <span class="z1-chip">
            <span class="zidlbl">Ferramenta</span>
            <span class="zidval">${nomeFer}</span>
          </span>
          <span class="z1-chip">
            <span class="zidlbl">Variação Ø</span>
            <span class="zidval">${inp.dInicial ? `<span class="num">Ø${inp.dInicial}</span>` : 'Ø—'} → ${inp.dFinal ? `<span class="num">Ø${inp.dFinal}</span> mm` : 'Ø—'}${inp.rEpsilon ? ` · <span class="num">rε ${formatDec(inp.rEpsilon, 1)}</span>` : ''}${inp.l ? ` · <span class="num">L${inp.l}</span> mm` : ''}</span>
          </span>
        `;
      } else {
        toolStr = `
          <span class="z1-chip">
            <span class="zidlbl">Ferramenta</span>
            <span class="zidval" style="color:var(--tx-3)">Nenhuma ferramenta selecionada</span>
          </span>
          <span class="z1-chip">
            <span class="zidlbl">Variação Ø</span>
            <span class="zidval" style="color:var(--tx-3)">—</span>
          </span>
        `;
      }
    }

    z1.innerHTML = `
      ${matStr}
      ${toolStr}
      ${marginBadge}
    `;
  }

  // Renderizar a coluna de leitura e resultados (Z2 a Z7)
  function renderCalculatedResults() {
    const resCol = document.getElementById('col-resultados-content');
    if (!resCol) return;

    // A área Configurações pode disparar recálculo do painel: vale a família de trás
    const fam = state.activeTab === 'configuracoes' ? state.previousTab : state.activeTab;
    const resData = calcularResultados(fam);

    // Gerar HTML de Z2 (Alerta)
    let alertClass = 'normal';
    if (resData.nivel === 'ATENÇÃO') alertClass = 'warning';
    if (resData.nivel === 'CRÍTICO') alertClass = 'critical';

    const z2Html = `
      <div class="alert-band ${alertClass}">
        <div class="chip ${alertClass}">${resData.nivel}</div>
        <div style="display:flex;flex-direction:column;gap:4px">
          <div style="font-size:13px;font-weight:600;color:var(--tx-1)">${resData.alertaTitulo}</div>
          <div class="prose">${resData.alertaCorpo}</div>
          ${resData.alertaExtra ? `<div class="lbl" style="color:inherit;margin-top:2px">${resData.alertaExtra}</div>` : ''}
        </div>
      </div>
    `;

    // Gerar HTML de Z3 (Resumo de Parâmetros)
    const z3Pairs = resData.z3Params.map(p => `
      <span class="z3pair"><span class="lbl" style="flex:none">${p.label}</span><span class="z3name">${p.val}</span></span>
    `).join('<span class="funit" aria-hidden="true">·</span>');
    const z3Html = `<div class="z3">${z3Pairs}</div>`;

    // Gerar HTML de Z4 (Cartões Heróis)
    const outdatedClass = state.isOutdated ? 'state-outdated' : '';
    let statusStripHtml = '';
    if (!state.isCalculated) {
      statusStripHtml = `
        <div class="calc-status-strip">
          <div style="display:flex;align-items:center;gap:8px">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="7"></circle><line x1="8" y1="8" x2="8" y2="12"></line><line x1="8" y1="4" x2="8.01" y2="4"></line></svg>
            <span>Aguardando definição dos parâmetros para cálculo</span>
          </div>
          <span class="num" style="font-size:11px;opacity:0.85">Painel Zerado</span>
        </div>
      `;
    } else if (state.isOutdated) {
      statusStripHtml = `
        <div class="calc-status-strip outdated">
          <div style="display:flex;align-items:center;gap:8px">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="7"></circle><polyline points="8 4 8 8 11 10"></polyline></svg>
            <span>Montagem alterada — aguardando clique em Calcular para sincronizar</span>
          </div>
          <span class="num" style="font-size:11px;opacity:0.9">Recálculo pendente</span>
        </div>
      `;
    } else {
      statusStripHtml = `
        <div class="calc-status-strip in-sync">
          <div style="display:flex;align-items:center;gap:8px">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 L6.5 12 L13 4.5"></path></svg>
            <span>Parâmetros de corte calculados e em dia com a montagem</span>
          </div>
          <span class="num" style="font-size:11px;opacity:0.85">Sincronizado</span>
        </div>
      `;
    }

    // Cartão de comando (Z4/D7). Dois números editáveis — rotação e avanço —, os demais só leitura.
    function heroCardHtml(cfg) {
      const off = cfg.offset || 0;
      const minusTravado = (off - STEP_PERCENT) <= -100;
      const nome = cfg.nomeAcessivel;

      const meta = off !== 0
        ? `<span class="tag tag-info">ajuste ${formatOffset(off)}</span>`
        : '';

      const valor = `
            <div class="rval">
              <span class="rbig">${formatInt(cfg.val)}</span>
              <span class="funit" style="font-size:13px;font-weight:700">${cfg.unidade}</span>
            </div>`;

      const linha = cfg.temStep
        ? `<div class="rtall-row">
             <button type="button" class="hero-step-btn btn-step-hero" data-target="${cfg.target}" data-dir="-1"
               ${minusTravado || !state.isCalculated ? 'disabled aria-disabled="true" title="Fim do ajuste para baixo"' : `title="Diminuir ${nome} em ${STEP_PERCENT}%"`}
               aria-label="Diminuir ${nome} em ${STEP_PERCENT} por cento">−</button>
             ${valor}
             <button type="button" class="hero-step-btn btn-step-hero" data-target="${cfg.target}" data-dir="1"
               ${!state.isCalculated ? 'disabled aria-disabled="true"' : ''}
               title="Aumentar ${nome} em ${STEP_PERCENT}%" aria-label="Aumentar ${nome} em ${STEP_PERCENT} por cento">+</button>
           </div>`
        : `<div class="rtall-row">${valor}</div>`;

      // Rodapé só existe com ajuste: diz de onde o número saiu e oferece a volta
      const base = off !== 0
        ? `<div class="hero-base">
             <span>calculado ${formatInt(cfg.base)} ${cfg.unidade}</span>
             <button type="button" class="btn-revert btn-revert-hero" data-target="${cfg.target}" title="Voltar ao valor calculado, sem ajuste">⟲ Padrão</button>
           </div>`
        : '';

      return `
        <div class="rcard rcard-hero ${outdatedClass} ${off !== 0 ? 'manual-edit' : ''}" data-hero="${cfg.target}" style="flex:1 1 ${cfg.flex || '240px'}">
          <div class="rcard-header">
            <div style="display:flex;align-items:center;gap:8px">
              <span class="hero-addr-badge">${cfg.addr}</span>
              <div class="lbl">${cfg.rotulo}</div>
            </div>
            ${meta}
          </div>
          ${linha}
          ${base}
          ${cfg.nota ? `<div class="lbl" style="text-transform:none;color:var(--tx-3)">${cfg.nota}</div>` : ''}
        </div>`;
    }

    const sOffsetFactor = 1 + (state.sOffsetPercent / 100);
    const fOffsetFactor = 1 + (state.fOffsetPercent / 100);
    const sBase = state.isCalculated ? Math.round(resData.sVal / sOffsetFactor) : 0;
    const fBase = state.isCalculated ? Math.round(resData.fVal / fOffsetFactor) : 0;

    const cardS = heroCardHtml({
      target: 's', addr: 'S', rotulo: 'Rotação (<span class="sym">n</span>)',
      nomeAcessivel: 'a rotação', unidade: 'rpm',
      val: resData.sVal, base: sBase, offset: state.sOffsetPercent,
      temStep: true, flex: resData.isRoscar ? '260px' : '240px'
    });

    let z4Html = '';
    if (resData.isRoscar) {
      // Roscar: o avanço acompanha o passo da rosca — sem ± próprio (D7)
      const cardF = heroCardHtml({
        target: 'f', addr: 'F', rotulo: 'Velocidade de avanço da mesa (<span class="sym">vf</span>)',
        nomeAcessivel: 'o avanço', unidade: 'mm/min',
        val: resData.fVal, base: fBase, offset: 0,
        temStep: false, flex: '260px', nota: resData.passoDesc
      });
      z4Html = `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">${cardS}${cardF}</div>`;
    } else {
      const cardF = heroCardHtml({
        target: 'f', addr: 'F', rotulo: 'Velocidade de avanço (<span class="sym">vf</span>)',
        nomeAcessivel: 'o avanço', unidade: 'mm/min',
        val: resData.fVal, base: fBase, offset: state.fOffsetPercent,
        temStep: true
      });

      const qCard = resData.qVal ? `
        <div class="rcard rcard-hero ${outdatedClass}" style="flex:0 1 180px">
          <div class="rcard-header">
            <div style="display:flex;align-items:center;gap:8px">
              <span class="hero-addr-badge">Q</span>
              <div class="lbl">Passo pica-pau</div>
            </div>
          </div>
          <div class="rval" style="justify-content:center;height:44px">
            <span class="rbig" style="font-size:26px">${resData.qVal}</span>
            <span class="funit" style="font-size:13px;font-weight:700">mm</span>
          </div>
        </div>
      ` : '';

      z4Html = `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">${cardS}${cardF}${qCard}</div>`;
    }

    // Gerar HTML de Z5 ("O que vai acontecer" - nasce recolhido, D9)
    const z5Items = resData.oQueVaiAcontecer.map(p => `<div class="prose">${p}</div>`).join('');
    const z5Html = `
      <div class="drawer">
        <button type="button" class="dtrigger" id="trig-z5" aria-expanded="false" aria-controls="panel-z5">
          <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
          <span class="lbl" style="flex:none">O que vai acontecer</span>
          <span class="dhint">${resData.nivel === 'CRÍTICO' ? 'alerta crítico ativo' : (resData.nivel === 'ATENÇÃO' ? 'vibração pela relação balanço/diâmetro' : (state.isCalculated ? 'previsão estável' : 'aguardando cálculo'))}</span>
        </button>
        <div id="panel-z5" class="dbody dbody--col" hidden style="gap:8px">
          ${z5Items}
        </div>
      </div>
    `;

    // Gerar HTML de Z6 ("O que mexer" - nasce recolhido, D9)
    const z6Items = resData.oQueMexer.map(m => `
      <div style="display:flex;flex-direction:column;gap:4px">
        <div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap">
          <div style="font-size:13px;font-weight:600;color:var(--tx-1)">${m.titulo}</div>
          ${m.badge ? `<div class="lbl" style="color:var(--st-warn-ink)">${m.badge}</div>` : ''}
        </div>
        <div class="qline">${m.acao}</div>
        <div class="prose">${m.explicacao}</div>
        <div class="prose" style="color:var(--tx-3)">${m.contrapartida}</div>
      </div>
    `).join('');

    const z6Html = `
      <div class="drawer">
        <button type="button" class="dtrigger" id="trig-z6" aria-expanded="false" aria-controls="panel-z6">
          <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
          <span class="lbl" style="flex:none">O que mexer</span>
          <span class="dhint">${state.isCalculated ? resData.oQueMexer.length + ' direções sugeridas' : 'direções de ajuste'}</span>
        </button>
        <div id="panel-z6" class="dbody dbody--col" hidden style="gap:16px">
          ${z6Items}
        </div>
      </div>
    `;

    // Gerar HTML de Z7 (Resumo Geral em cartões baixos)
    const z7Cards = resData.resumoGeral.map(c => `
      <div class="rcard">
        <div class="lbl">${c.lbl}</div>
        <div style="display:flex;align-items:baseline;gap:6px">
          <span class="u20${c.isAlert ? ' is-alert' : ''}" style="${c.isAlert ? 'color:var(--st-warn-ink)' : ''}">${c.val}</span>
          ${c.isAlert ? '<span class="lbl" style="color:var(--st-warn-ink)">ATENÇÃO</span>' : ''}
        </div>
      </div>
    `).join('');

    const z7Html = `
      <div class="card ${outdatedClass}" style="display:flex;flex-direction:column;gap:12px">
        <div class="lbl">RESUMO GERAL</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:12px">
          ${z7Cards}
        </div>
      </div>
    `;

    resCol.innerHTML = `
      <div id="hero-live" class="sr-only" role="status" aria-live="polite"></div>
      ${statusStripHtml}
      ${z2Html}
      ${z3Html}
      ${z4Html}
      ${z5Html}
      ${z6Html}
      ${z7Html}
    `;

    // Ativar gavetas Z5 e Z6
    setupCollapsible(document.getElementById('trig-z5'), document.getElementById('panel-z5'));
    setupCollapsible(document.getElementById('trig-z6'), document.getElementById('panel-z6'));

    // Ajuste fino de rotação e avanço: cada toque anda STEP_PERCENT sobre o valor calculado (D7)
    document.querySelectorAll('.btn-step-hero').forEach(btn => {
      btn.onclick = () => {
        if (btn.disabled || !state.isCalculated) return;
        const target = btn.dataset.target;
        const dir = parseInt(btn.dataset.dir);
        const atual = target === 's' ? state.sOffsetPercent : state.fOffsetPercent;
        const proximo = atual + dir * STEP_PERCENT;
        if (proximo <= -100) return; // o número de comando nunca chega a zero
        if (target === 's') {
          state.sOffsetPercent = proximo;
          recalcularDinamico('s');
        } else {
          state.fOffsetPercent = proximo;
          recalcularDinamico('f');
        }
        flashHero(target);
      };
    });

    // Voltar ao valor calculado, um eixo por vez
    document.querySelectorAll('.btn-revert-hero').forEach(btn => {
      btn.onclick = () => {
        if (!state.isCalculated) return;
        const target = btn.dataset.target;
        if (target === 's') {
          state.sOffsetPercent = 0;
          recalcularDinamico('s');
        } else {
          state.fOffsetPercent = 0;
          recalcularDinamico('f');
        }
        flashHero(target);
      };
    });
  }

  // Confirmação visual do toque: realce breve no número tocado e anúncio para leitor de tela
  function flashHero(target) {
    const card = document.querySelector(`.rcard-hero[data-hero="${target}"]`);
    if (!card) return;
    const num = card.querySelector('.rbig');
    if (num) {
      num.classList.remove('calc-pulse');
      void num.offsetWidth;
      num.classList.add('calc-pulse');
    }
    const live = document.getElementById('hero-live');
    if (live && num) {
      const off = target === 's' ? state.sOffsetPercent : state.fOffsetPercent;
      const nome = target === 's' ? 'Rotação' : 'Velocidade de avanço';
      const unidade = target === 's' ? 'rpm' : 'mm/min';
      live.textContent = off === 0
        ? `${nome} ${num.textContent} ${unidade}, sem ajuste`
        : `${nome} ${num.textContent} ${unidade}, ajuste ${formatOffset(off)}`;
    }
  }

  // Renderizar o formulário da coluna esquerda de acordo com a família ativa
  function renderConfigForm() {
    const configContainer = document.getElementById('config-form-container');
    if (!configContainer) return;

    const fam = state.activeTab === 'configuracoes' ? state.previousTab : state.activeTab;
    const mat = getActiveMaterial();
    const ferAtiva = getActiveTool();

    // Material apagado em Configurações não some em silêncio do cálculo (§3.4, R1/R15)
    const matSumiu = state.inputs[fam] && state.inputs[fam].materialId && !state.materiais.some(m => m.id === state.inputs[fam].materialId);

    // Bloco de Material (comum a todas as famílias)
    const matBlockHtml = `
      <div class="card" style="display:flex;flex-direction:column;gap:12px">
        <button type="button" class="bhead" id="bhead-material" aria-expanded="false" aria-controls="b-material-panel">
          <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="color:var(--tx-3)"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
          <span class="lbl" style="flex-grow:1">MATERIAL A SER USINADO</span>
          <span class="bsum">${mat ? `${mat.nome} · classe ${mat.classeISO} · ${mat.dureza}` : 'Nenhum material selecionado'}</span>
        </button>
        ${matSumiu ? `
          <div class="alert-band info" style="padding:10px 14px">
            <div class="chip info">AVISO</div>
            <div class="prose">O material deste cálculo saiu da lista em Configurações. Os valores continuam na tela como estavam — escolha outro material quando quiser.</div>
          </div>
        ` : ''}
        <div id="b-material-panel" hidden style="display:flex;flex-direction:column;gap:12px">
          <hr class="sep">
          <div class="selbox">
            <select class="fsel" id="sel-material-ativo" aria-label="Material a ser usinado">
              <option value="" ${!mat ? 'selected' : ''}>Selecione um material...</option>
              ${state.materiais.map(m => `<option value="${m.id}" ${mat && m.id === mat.id ? 'selected' : ''}>${m.nome} (Classe ${m.classeISO})</option>`).join('')}
            </select>
            <svg class="selcv" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 6 L8 11 L12.5 6"></path></svg>
          </div>
          <div class="lbl">DADOS DO MATERIAL</div>
          <div class="mgrid">
            <div class="field"><span class="lbl">Classe ISO</span><span class="mval">${mat ? mat.classeISO : '—'}</span></div>
            <div class="field"><span class="lbl">Dureza</span><span class="mval">${mat ? mat.dureza : '—'}</span></div>
            <div class="field"><span class="lbl">Força específica (<span class="sym">kc1.1</span>)</span><span class="mval">${mat ? `${formatInt(mat.kc11)} <span class="funit">N/mm²</span>` : '—'}</span></div>
            <div class="field"><span class="lbl">Expoente (<span class="sym">mc</span>)</span><span class="mval">${mat ? formatDec(mat.mc, 2) : '—'}</span></div>
            <div class="field" style="grid-column:span 2"><span class="lbl">Velocidade de corte de partida (<span class="sym">vc</span>)</span><span class="mval">${mat ? `${mat.vcPartida} <span class="funit">m/min</span>` : '—'}</span></div>
          </div>
          <button type="button" class="linkrow" id="link-ir-configuracoes-mat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.3 2.4a7 7 0 0 0-1.7 1l-2.4-1-2 3.4L3 11a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 1.7 1L9.5 21h5l.3-2.4a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6a7 7 0 0 0 .1-1Z"></path></svg>
            <span>Editar dados de material em Configurações</span>
          </button>
        </div>
      </div>
    `;

    // Blocos específicos de Ferramenta e Ajuste Fino
    let toolBlockHtml = '';
    let fineTuneBlockHtml = '';

    if (fam === 'fresar') {
      const inp = state.inputs.fresar;
      const ferramentasFamilia = state.ferramentas.filter(t => t.familia === 'fresar' || t.tipoId === 'fresar');
      const geo = ferAtiva ? geometriaDaFerramenta(ferAtiva) : (inp.geometriaId ? geometriaPorId(inp.geometriaId) : null);

      toolBlockHtml = `
        <div class="card" style="display:flex;flex-direction:column;gap:12px">
          <button type="button" class="bhead" id="bhead-ferramenta" aria-expanded="true" aria-controls="b-tool-panel">
            <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="color:var(--tx-3)"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
            <span class="lbl" style="flex-grow:1">FERRAMENTA A SER USADA</span>
            <span class="bsum">${ferAtiva ? `${inp.geometria || ferAtiva.geometria} · Ø${valStr(inp.d)} · Z${valStr(inp.z)} · L${valStr(inp.l)}` : 'Nenhuma ferramenta selecionada'}</span>
          </button>
          <div id="b-tool-panel" style="display:flex;flex-direction:column;gap:12px">
            <hr class="sep">
            <div style="display:flex;flex-direction:column;gap:8px">
              <div class="field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                  <label class="lbl" for="sel-ferramenta-ativa">FERRAMENTA CADASTRADA DA OFICINA</label>
                  <button type="button" class="btn-link-cfg" id="link-cfg-ferramentas">Gerenciar na oficina</button>
                </div>
                <div class="selbox">
                  <select class="fsel" id="sel-ferramenta-ativa">
                    <option value="" ${!ferAtiva ? 'selected' : ''}>Selecione uma ferramenta da oficina...</option>
                    ${ferramentasFamilia.map(t => `<option value="${t.id}" ${ferAtiva && t.id === ferAtiva.id ? 'selected' : ''}>${t.apelido} (${t.geometria} · ${t.substrato})</option>`).join('')}
                  </select>
                  <svg class="selcv" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3.5 6 L8 11 L12.5 6"></path></svg>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:6px;padding:6px 10px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:4px">
                <span class="cap" style="color:var(--tx-2)">Geometria vinculada: <strong>${geo ? geo.nome : (inp.geometria || '—')}</strong> · Substrato: <strong>${ferAtiva ? ferAtiva.substrato : (inp.ferramentaTipo || '—')}</strong></span>
              </div>
            </div>

            <div class="lbl">VARIÁVEIS DA GEOMETRIA DESTA MONTAGEM</div>
            <div class="vgrid">
              <div class="field">
                <label class="lbl" for="f-d">Diâmetro da ferramenta (<span class="sym">D</span>)</label>
                <div class="sctl">
                  <button type="button" class="step" aria-label="Diminuir diâmetro">−</button>
                  <div class="fbox"><input class="fin" id="f-d" type="text" inputmode="decimal" value="${valStr(inp.d)}" data-step="1" data-decimals="0"><span class="funit">mm</span></div>
                  <button type="button" class="step" aria-label="Aumentar diâmetro">+</button>
                </div>
              </div>
              ${(inp.geometria === 'Toroidal' || (geo && geo.id === 'toroidal')) ? `
              <div class="field">
                <label class="lbl" for="f-r">Raio de canto (<span class="sym">r</span>)</label>
                <div class="sctl">
                  <button type="button" class="step" aria-label="Diminuir raio">−</button>
                  <div class="fbox"><input class="fin" id="f-r" type="text" inputmode="decimal" value="${valStr(inp.r, 1)}" data-step="0.5" data-decimals="1"><span class="funit">mm</span></div>
                  <button type="button" class="step" aria-label="Aumentar raio">+</button>
                </div>
              </div>` : ''}
              <div class="field">
                <label class="lbl" for="f-z">Número de arestas (<span class="sym">Z</span>)</label>
                <div class="sctl">
                  <button type="button" class="step" aria-label="Diminuir arestas">−</button>
                  <div class="fbox"><input class="fin" id="f-z" type="text" inputmode="decimal" value="${valStr(inp.z)}" data-step="1" data-decimals="0"></div>
                  <button type="button" class="step" aria-label="Aumentar arestas">+</button>
                </div>
              </div>
              <div class="field">
                <label class="lbl" for="f-l">Balanço (<span class="sym">L</span>)</label>
                <div class="sctl">
                  <button type="button" class="step" aria-label="Diminuir balanço">−</button>
                  <div class="fbox ${inp.l > 300 ? 'error' : ''}"><input class="fin" id="f-l" type="text" inputmode="decimal" value="${valStr(inp.l)}" data-step="5" data-decimals="0"><span class="funit">mm</span></div>
                  <button type="button" class="step" aria-label="Aumentar balanço">+</button>
                </div>
                ${inp.l > 300 ? '<div style="color:var(--st-crit-ink);font-weight:600;font-size:11px">Confira a digitação: faixa usual de 5 a 300 mm.</div>' : ''}
              </div>
              <div class="field">
                <label class="lbl" for="f-ap">Profundidade de corte (<span class="sym">ap</span>)</label>
                <div class="sctl">
                  <button type="button" class="step" aria-label="Diminuir ap">−</button>
                  <div class="fbox"><input class="fin" id="f-ap" type="text" inputmode="decimal" value="${valStr(inp.ap, 1)}" data-step="0.5" data-decimals="1"><span class="funit">mm</span></div>
                  <button type="button" class="step" aria-label="Aumentar ap">+</button>
                </div>
              </div>
              <div class="field">
                <div style="display:flex;align-items:baseline;gap:6px"><label class="lbl" for="f-lc">Comprimento aresta (<span class="sym">Lc</span>)</label><span class="dhint" style="flex:none">opcional</span></div>
                <div class="sctl">
                  <button type="button" class="step" aria-label="Diminuir Lc">−</button>
                  <div class="fbox"><input class="fin" id="f-lc" type="text" inputmode="decimal" value="${valStr(inp.lc)}" placeholder="—" data-step="1"><span class="funit">mm</span></div>
                  <button type="button" class="step" aria-label="Aumentar Lc">+</button>
                </div>
              </div>
            </div>

            <!-- Gaveta explicativa ap (D11) -->
            <div class="drawer">
              <button type="button" class="dtrigger" id="trig-d-ap" aria-expanded="false" aria-controls="panel-d-ap">
                <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
                <span class="lbl" style="flex:none">Profundidade de corte (<span class="sym">ap</span>)</span>
                <span class="dsum">${inp.ap !== '' ? `${formatDec(inp.ap, 1)} mm` : '—'}</span>
              </button>
              <div id="panel-d-ap" class="dbody" hidden>
                <span class="lbl">O que é</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.ap.oQueE}</span>
                <span class="lbl">▲ aumentar</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.ap.aumentar}</span>
                <span class="lbl">▼ diminuir</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.ap.diminuir}</span>
                <span class="lbl">Equilíbrio</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.ap.equilibrio}</span>
              </div>
            </div>
          </div>
        </div>
      `;

      fineTuneBlockHtml = `
        <div class="card" style="display:flex;flex-direction:column;gap:16px">
          <button type="button" class="bhead" id="bhead-ajuste" aria-expanded="true" aria-controls="b-tune-panel">
            <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
            <span class="lbl" style="flex-grow:1">Ajuste fino</span>
            <span class="bsum">${inp.vc !== '' ? `vc ${valStr(inp.vc)} · fz ${valStr(inp.fz, 3)} · ae ${valStr(inp.ae, 1)}` : 'Aguardando valores'}</span>
          </button>
          <div id="b-tune-panel" style="display:flex;flex-direction:column;gap:16px">
            <hr class="sep">
            <div class="field">
              <label class="lbl" for="f-vc">Velocidade de corte (<span class="sym">vc</span>)</label>
              <div class="sctl">
                <button type="button" class="step" aria-label="Diminuir vc">−</button>
                <div class="fbox"><input class="fin" id="f-vc" type="text" inputmode="decimal" value="${valStr(inp.vc)}" data-step="5"><span class="funit">m/min</span></div>
                <button type="button" class="step" aria-label="Aumentar vc">+</button>
              </div>
              <div class="drawer">
                <button type="button" class="dtrigger" id="trig-d-vc" aria-expanded="false" aria-controls="panel-d-vc">
                  <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
                  <span class="dhint">o que a velocidade de corte faz</span>
                </button>
                <div id="panel-d-vc" class="dbody" hidden>
                  <span class="lbl">O que é</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.vc.oQueE}</span>
                  <span class="lbl">▲ aumentar</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.vc.aumentar}</span>
                  <span class="lbl">▼ diminuir</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.vc.diminuir}</span>
                  <span class="lbl">Equilíbrio</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.vc.equilibrio}</span>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="lbl" for="f-fz">Avanço por dente (<span class="sym">fz</span>)</label>
              <div class="sctl">
                <button type="button" class="step" aria-label="Diminuir fz">−</button>
                <div class="fbox"><input class="fin" id="f-fz" type="text" inputmode="decimal" value="${valStr(inp.fz, 3)}" data-step="0.005" data-decimals="3"><span class="funit">mm/dente</span></div>
                <button type="button" class="step" aria-label="Aumentar fz">+</button>
              </div>
              <div class="drawer">
                <button type="button" class="dtrigger" id="trig-d-fz" aria-expanded="false" aria-controls="panel-d-fz">
                  <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
                  <span class="dhint">o que o avanço por dente faz</span>
                </button>
                <div id="panel-d-fz" class="dbody" hidden>
                  <span class="lbl">O que é</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.fz.oQueE}</span>
                  <span class="lbl">▲ aumentar</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.fz.aumentar}</span>
                  <span class="lbl">▼ diminuir</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.fz.diminuir}</span>
                  <span class="lbl">Equilíbrio</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.fz.equilibrio}</span>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="lbl" for="f-ae">Penetração de trabalho (<span class="sym">ae</span>)</label>
              <div class="sctl">
                <button type="button" class="step" aria-label="Diminuir ae">−</button>
                <div class="fbox"><input class="fin" id="f-ae" type="text" inputmode="decimal" value="${valStr(inp.ae, 1)}" data-step="0.5" data-decimals="1"><span class="funit">mm</span></div>
                <button type="button" class="step" aria-label="Aumentar ae">+</button>
              </div>
              <div class="drawer">
                <button type="button" class="dtrigger" id="trig-d-ae" aria-expanded="false" aria-controls="panel-d-ae">
                  <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
                  <span class="dhint">o que a penetração de trabalho faz</span>
                </button>
                <div id="panel-d-ae" class="dbody" hidden>
                  <span class="lbl">O que é</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.ae.oQueE}</span>
                  <span class="lbl">▲ aumentar</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.ae.aumentar}</span>
                  <span class="lbl">▼ diminuir</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.ae.diminuir}</span>
                  <span class="lbl">Equilíbrio</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.ae.equilibrio}</span>
                </div>
              </div>
            </div>

            <button type="button" class="linkrow" id="btn-reset-params">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.4-5.7"></path><path d="M4 4.5V10h5.5"></path></svg>
              <span>Resetar valores de partida</span>
            </button>
          </div>
        </div>
      `;
    } else if (fam === 'furar') {
      const inp = state.inputs.furar;
      const ferramentasFamilia = state.ferramentas.filter(t => t.familia === 'furar' || t.tipoId === 'furar');
      const geo = ferAtiva ? geometriaDaFerramenta(ferAtiva) : (inp.geometriaId ? geometriaPorId(inp.geometriaId) : null);

      toolBlockHtml = `
        <div class="card" style="display:flex;flex-direction:column;gap:12px">
          <button type="button" class="bhead" id="bhead-ferramenta" aria-expanded="true" aria-controls="b-tool-panel">
            <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
            <span class="lbl" style="flex-grow:1">FERRAMENTA A SER USADA</span>
            <span class="bsum">${ferAtiva ? `${ferAtiva.substrato} · ${inp.geometria || ferAtiva.geometria} · Ø${valStr(inp.d)} · ${valStr(inp.anguloPonta)}° · L${valStr(inp.l)}` : 'Nenhuma ferramenta selecionada'}</span>
          </button>
          <div id="b-tool-panel" style="display:flex;flex-direction:column;gap:12px">
            <hr class="sep">
            <div style="display:flex;flex-direction:column;gap:8px">
              <div class="field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                  <label class="lbl" for="sel-ferramenta-ativa">FERRAMENTA CADASTRADA DA OFICINA</label>
                  <button type="button" class="btn-link-cfg" id="link-cfg-ferramentas">Gerenciar na oficina</button>
                </div>
                <div class="selbox">
                  <select class="fsel" id="sel-ferramenta-ativa">
                    <option value="" ${!ferAtiva ? 'selected' : ''}>Selecione uma ferramenta da oficina...</option>
                    ${ferramentasFamilia.map(t => `<option value="${t.id}" ${ferAtiva && t.id === ferAtiva.id ? 'selected' : ''}>${t.apelido} (${t.geometria} · ${t.substrato})</option>`).join('')}
                  </select>
                  <svg class="selcv" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3.5 6 L8 11 L12.5 6"></path></svg>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:6px;padding:6px 10px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:4px">
                <span class="cap" style="color:var(--tx-2)">Geometria vinculada: <strong>${geo ? geo.nome : (inp.geometria || '—')}</strong> · Substrato: <strong>${ferAtiva ? ferAtiva.substrato : (inp.ferramentaTipo || '—')}</strong></span>
              </div>
            </div>

            <div class="lbl">VARIÁVEIS DA GEOMETRIA DESTA MONTAGEM</div>
            <div class="vgrid">
              <div class="field">
                <label class="lbl" for="fu-d">Diâmetro da ferramenta (<span class="sym">D</span>)</label>
                <div class="sctl">
                  <button type="button" class="step" aria-label="Diminuir diâmetro">−</button>
                  <div class="fbox"><input class="fin" id="fu-d" type="text" inputmode="decimal" value="${valStr(inp.d)}" data-step="1" data-decimals="0"><span class="funit">mm</span></div>
                  <button type="button" class="step" aria-label="Aumentar diâmetro">+</button>
                </div>
              </div>
              <div class="field">
                <label class="lbl" for="fu-ang">Ângulo de ponta</label>
                <div class="sctl">
                  <button type="button" class="step" aria-label="Diminuir ângulo">−</button>
                  <div class="fbox"><input class="fin" id="fu-ang" type="text" inputmode="decimal" value="${valStr(inp.anguloPonta)}" data-step="1"><span class="funit">°</span></div>
                  <button type="button" class="step" aria-label="Aumentar ângulo">+</button>
                </div>
              </div>
              <div class="field">
                <label class="lbl" for="fu-l">Balanço (<span class="sym">L</span>)</label>
                <div class="sctl">
                  <button type="button" class="step" aria-label="Diminuir balanço">−</button>
                  <div class="fbox"><input class="fin" id="fu-l" type="text" inputmode="decimal" value="${valStr(inp.l)}" data-step="5"><span class="funit">mm</span></div>
                  <button type="button" class="step" aria-label="Aumentar balanço">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      fineTuneBlockHtml = `
        <div class="card" style="display:flex;flex-direction:column;gap:16px">
          <button type="button" class="bhead" id="bhead-ajuste" aria-expanded="true" aria-controls="b-tune-panel">
            <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
            <span class="lbl" style="flex-grow:1">Ajuste fino</span>
            <span class="bsum">${inp.vc !== '' ? `vc ${valStr(inp.vc)} · fn ${valStr(inp.fn, 2)}` : 'Aguardando valores'}</span>
          </button>
          <div id="b-tune-panel" style="display:flex;flex-direction:column;gap:16px">
            <hr class="sep">
            <div class="field">
              <label class="lbl" for="fu-vc">Velocidade de corte (<span class="sym">vc</span>)</label>
              <div class="sctl">
                <button type="button" class="step" aria-label="Diminuir vc">−</button>
                <div class="fbox"><input class="fin" id="fu-vc" type="text" inputmode="decimal" value="${valStr(inp.vc)}" data-step="1"><span class="funit">m/min</span></div>
                <button type="button" class="step" aria-label="Aumentar vc">+</button>
              </div>
            </div>

            <div class="field">
              <label class="lbl" for="fu-fn">Avanço por rotação (<span class="sym">fn</span>)</label>
              <div class="sctl">
                <button type="button" class="step" aria-label="Diminuir fn">−</button>
                <div class="fbox"><input class="fin" id="fu-fn" type="text" inputmode="decimal" value="${valStr(inp.fn, 2)}" data-step="0.01" data-decimals="2"><span class="funit">mm/rot</span></div>
                <button type="button" class="step" aria-label="Aumentar fn">+</button>
              </div>
              <div class="drawer">
                <button type="button" class="dtrigger" id="trig-d-fn" aria-expanded="false" aria-controls="panel-d-fn">
                  <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
                  <span class="dhint">de onde vem o avanço por rotação</span>
                </button>
                <div id="panel-d-fn" class="dbody" hidden>
                  <span class="lbl">O que é</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.fn.oQueE}</span>
                  <span class="lbl">De onde vem</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.fn.deOndeVem}</span>
                  <span class="lbl">A referência</span><span>${FENIX_MOCK_DATA.gavetasInstrucao.fn.referencia}</span>
                </div>
              </div>
            </div>

            <button type="button" class="linkrow" id="btn-reset-params">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.4-5.7"></path><path d="M4 4.5V10h5.5"></path></svg>
              <span>Resetar valores de partida</span>
            </button>
          </div>
        </div>
      `;
    } else if (fam === 'roscar') {
      const inp = state.inputs.roscar;
      const ferramentasFamilia = state.ferramentas.filter(t => t.familia === 'roscar' || t.tipoId === 'roscar');
      const geo = ferAtiva ? geometriaDaFerramenta(ferAtiva) : (inp.geometriaId ? geometriaPorId(inp.geometriaId) : null);

      toolBlockHtml = `
        <div class="card" style="display:flex;flex-direction:column;gap:12px">
          <div class="field">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
              <label class="lbl" for="sel-ferramenta-ativa">FERRAMENTA CADASTRADA DA OFICINA</label>
              <button type="button" class="btn-link-cfg" id="link-cfg-ferramentas">Gerenciar na oficina</button>
            </div>
            <div class="selbox">
              <select class="fsel" id="sel-ferramenta-ativa">
                <option value="" ${!ferAtiva ? 'selected' : ''}>Selecione uma ferramenta da oficina...</option>
                ${ferramentasFamilia.map(t => `<option value="${t.id}" ${ferAtiva && t.id === ferAtiva.id ? 'selected' : ''}>${t.apelido} (${t.geometria} · ${t.substrato})</option>`).join('')}
              </select>
              <svg class="selcv" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3.5 6 L8 11 L12.5 6"></path></svg>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px;padding:6px 10px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:4px">
            <span class="cap" style="color:var(--tx-2)">Geometria vinculada: <strong>${geo ? geo.nome : (inp.geometria || '—')}</strong> · Substrato: <strong>${ferAtiva ? ferAtiva.substrato : (inp.ferramentaTipo || '—')}</strong></span>
          </div>
          <div class="lbl">VARIÁVEIS DA GEOMETRIA DESTA MONTAGEM</div>
          <div class="field">
            <label class="lbl" for="ro-rosca">DESIGNAÇÃO DA ROSCA MÉTRICA</label>
            <div class="selbox">
              <select class="fsel" id="ro-rosca">
                <option value="" ${!inp.roscaDesignacao ? 'selected' : ''}>Selecione o tipo de rosca...</option>
                ${FENIX_MOCK_DATA.tabelaRoscas.map(r => `<option value="${r.designacao}" ${r.designacao === inp.roscaDesignacao ? 'selected' : ''}>${r.designacao} (Passo ${formatDec(r.passo, 2)} mm · Broca ${formatDec(r.brocaPrevia, 1)} mm)</option>`).join('')}
              </select>
              <svg class="selcv" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3.5 6 L8 11 L12.5 6"></path></svg>
            </div>
          </div>
          <div class="field">
            <label class="lbl" for="ro-l">Balanço do macho (<span class="sym">L</span>)</label>
            <div class="sctl">
              <button type="button" class="step" aria-label="Diminuir balanço">−</button>
              <div class="fbox"><input class="fin" id="ro-l" type="text" inputmode="decimal" value="${valStr(inp.l)}" data-step="5"><span class="funit">mm</span></div>
              <button type="button" class="step" aria-label="Aumentar balanço">+</button>
            </div>
          </div>
          <div class="field">
            <label class="lbl" for="ro-vc">Velocidade de corte (<span class="sym">vc</span>)</label>
            <div class="sctl">
              <button type="button" class="step" aria-label="Diminuir vc">−</button>
              <div class="fbox"><input class="fin" id="ro-vc" type="text" inputmode="decimal" value="${valStr(inp.vc)}" data-step="5"><span class="funit">m/min</span></div>
              <button type="button" class="step" aria-label="Aumentar vc">+</button>
            </div>
          </div>

          <button type="button" class="linkrow" id="btn-reset-params">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.4-5.7"></path><path d="M4 4.5V10h5.5"></path></svg>
            <span>Resetar valores de partida</span>
          </button>
        </div>
      `;
    } else if (fam === 'mandrilar') {
      const inp = state.inputs.mandrilar;
      const ferramentasFamilia = state.ferramentas.filter(t => t.familia === 'mandrilar' || t.tipoId === 'mandrilar');
      const geo = ferAtiva ? geometriaDaFerramenta(ferAtiva) : (inp.geometriaId ? geometriaPorId(inp.geometriaId) : null);

      toolBlockHtml = `
        <div class="card" style="display:flex;flex-direction:column;gap:12px">
          <div class="field">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
              <label class="lbl" for="sel-ferramenta-ativa">FERRAMENTA CADASTRADA DA OFICINA</label>
              <button type="button" class="btn-link-cfg" id="link-cfg-ferramentas">Gerenciar na oficina</button>
            </div>
            <div class="selbox">
              <select class="fsel" id="sel-ferramenta-ativa">
                <option value="" ${!ferAtiva ? 'selected' : ''}>Selecione uma ferramenta da oficina...</option>
                ${ferramentasFamilia.map(t => `<option value="${t.id}" ${ferAtiva && t.id === ferAtiva.id ? 'selected' : ''}>${t.apelido} (${t.geometria} · ${t.substrato})</option>`).join('')}
              </select>
              <svg class="selcv" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3.5 6 L8 11 L12.5 6"></path></svg>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px;padding:6px 10px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:4px">
            <span class="cap" style="color:var(--tx-2)">Geometria vinculada: <strong>${geo ? geo.nome : (inp.geometria || '—')}</strong> · Substrato: <strong>${ferAtiva ? ferAtiva.substrato : (inp.ferramentaTipo || '—')}</strong></span>
          </div>
          <div class="lbl">VARIÁVEIS DA GEOMETRIA DESTA MONTAGEM</div>
          <div class="vgrid">
            <div class="field">
              <label class="lbl" for="man-di">Diâmetro inicial do furo (<span class="sym">Di</span>)</label>
              <div class="sctl">
                <button type="button" class="step" aria-label="Diminuir diâmetro inicial">−</button>
                <div class="fbox"><input class="fin" id="man-di" type="text" inputmode="decimal" value="${valStr(inp.dInicial)}" data-step="1"><span class="funit">mm</span></div>
                <button type="button" class="step" aria-label="Aumentar diâmetro inicial">+</button>
              </div>
            </div>
            <div class="field">
              <label class="lbl" for="man-df">Diâmetro final desejado (<span class="sym">Df</span>)</label>
              <div class="sctl">
                <button type="button" class="step" aria-label="Diminuir diâmetro final">−</button>
                <div class="fbox"><input class="fin" id="man-df" type="text" inputmode="decimal" value="${valStr(inp.dFinal)}" data-step="1"><span class="funit">mm</span></div>
                <button type="button" class="step" aria-label="Aumentar diâmetro final">+</button>
              </div>
            </div>
          </div>
          <div class="vgrid">
            <div class="field">
              <label class="lbl" for="man-re">Raio de ponta (<span class="sym">rε</span>)</label>
              <div class="sctl">
                <button type="button" class="step" aria-label="Diminuir rε">−</button>
                <div class="fbox"><input class="fin" id="man-re" type="text" inputmode="decimal" value="${valStr(inp.rEpsilon, 1)}" data-step="0.2" data-decimals="1"><span class="funit">mm</span></div>
                <button type="button" class="step" aria-label="Aumentar rε">+</button>
              </div>
            </div>
            <div class="field">
              <label class="lbl" for="man-l">Balanço da barra (<span class="sym">L</span>)</label>
              <div class="sctl">
                <button type="button" class="step" aria-label="Diminuir L">−</button>
                <div class="fbox"><input class="fin" id="man-l" type="text" inputmode="decimal" value="${valStr(inp.l)}" data-step="5"><span class="funit">mm</span></div>
                <button type="button" class="step" aria-label="Aumentar L">+</button>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="lbl" for="man-vc">Velocidade de corte (<span class="sym">vc</span>)</label>
            <div class="sctl">
              <button type="button" class="step" aria-label="Diminuir vc">−</button>
              <div class="fbox"><input class="fin" id="man-vc" type="text" inputmode="decimal" value="${valStr(inp.vc)}" data-step="5"><span class="funit">m/min</span></div>
              <button type="button" class="step" aria-label="Aumentar vc">+</button>
            </div>
          </div>
          <div class="field">
            <label class="lbl" for="man-fn">Avanço por rotação (<span class="sym">fn</span>)</label>
            <div class="sctl">
              <button type="button" class="step" aria-label="Diminuir fn">−</button>
              <div class="fbox"><input class="fin" id="man-fn" type="text" inputmode="decimal" value="${valStr(inp.fn, 2)}" data-step="0.05" data-decimals="2"><span class="funit">mm/rot</span></div>
              <button type="button" class="step" aria-label="Aumentar fn">+</button>
            </div>
          </div>

          <button type="button" class="linkrow" id="btn-reset-params">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.4-5.7"></path><path d="M4 4.5V10h5.5"></path></svg>
            <span>Resetar valores de partida</span>
          </button>
        </div>
      `;
    }

    const validacao = validarRequisitosCalculo(fam);
    const isCalc = state.isCalculated && !state.isOutdated && validacao.valido;
    const isDisabled = !validacao.valido;

    let ctaText = '';
    if (isCalc) {
      ctaText = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg> Parâmetros Atualizados`;
    } else if (isDisabled) {
      ctaText = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Calcular Parâmetros`;
    } else {
      ctaText = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Calcular Parâmetros`;
    }

    configContainer.innerHTML = `
      ${matBlockHtml}
      ${toolBlockHtml}
      ${fineTuneBlockHtml}

      <div class="form-actions-group">
        <button type="button" class="btn-cta ${isCalc ? 'is-calculated' : ''} ${isDisabled ? 'btn-cta-disabled' : ''}" id="btn-calcular" ${isDisabled ? 'disabled' : ''} title="${isDisabled ? ('Falta preencher: ' + validacao.faltantes.join(', ')) : 'Calcular parâmetros de corte'}">
          ${ctaText}
        </button>
        <button type="button" class="btn-reset-main" id="btn-reset-params-main" title="Restaurar valores de partida da ferramenta e montagem">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
          Restaurar Valores Padrão
        </button>
        <div class="calc-feedback" id="calc-feedback" style="opacity:${isCalc || !isDisabled ? '1' : '0.8'}">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5 L6.5 12 L13 4.5"></path></svg>
          ${isCalc ? 'Parâmetros sincronizados com a montagem' : (isDisabled ? 'Preencha os requisitos para habilitar o cálculo' : 'Requisitos preenchidos — pronto para calcular')}
        </div>
      </div>
    `;

    // Conectar eventos do formulário gerado
    setupCollapsible(document.getElementById('bhead-material'), document.getElementById('b-material-panel'));
    setupCollapsible(document.getElementById('bhead-ferramenta'), document.getElementById('b-tool-panel'));
    setupCollapsible(document.getElementById('bhead-ajuste'), document.getElementById('b-tune-panel'));
    setupCollapsible(document.getElementById('trig-d-ap'), document.getElementById('panel-d-ap'));
    setupCollapsible(document.getElementById('trig-d-vc'), document.getElementById('panel-d-vc'));
    setupCollapsible(document.getElementById('trig-d-fz'), document.getElementById('panel-d-fz'));
    setupCollapsible(document.getElementById('trig-d-ae'), document.getElementById('panel-d-ae'));
    setupCollapsible(document.getElementById('trig-d-fn'), document.getElementById('panel-d-fn'));

    const selMat = document.getElementById('sel-material-ativo');
    if (selMat) {
      selMat.onchange = () => {
        state.inputs[fam].materialId = selMat.value;
        const derived = derivarValoresDePartida(fam, selMat.value, state.inputs[fam].ferramentaId, state.inputs[fam]);
        if (!state.manualmenteAjustado[fam].vc && derived.vc !== undefined && derived.vc !== '') {
          state.inputs[fam].vc = derived.vc;
        }
        renderHeaderZ1();
        renderConfigForm();
        if (state.isCalculated) {
          recalcularDinamico('material');
        } else {
          atualizarEstadoBotaoCalcular(fam);
        }
      };
    }

    const selFerAtiva = document.getElementById('sel-ferramenta-ativa');
    if (selFerAtiva) {
      selFerAtiva.onchange = () => {
        const fer = state.ferramentas.find(t => t.id === selFerAtiva.value);
        if (fer) {
          state.inputs[fam].ferramentaId = fer.id;
          state.inputs[fam].geometriaId = fer.geometriaId;
          state.inputs[fam].geometria = fer.geometria;
          state.inputs[fam].ferramentaTipo = fer.substrato;

          const derived = derivarValoresDePartida(fam, state.inputs[fam].materialId, fer.id, state.inputs[fam]);

          if (fam === 'fresar') {
            if (!state.manualmenteAjustado[fam].vc && derived.vc !== undefined && derived.vc !== '') {
              state.inputs[fam].vc = derived.vc;
            }
            if (!state.manualmenteAjustado[fam].ap && derived.ap !== undefined && derived.ap !== '') {
              state.inputs[fam].ap = derived.ap;
            }
            if (!state.manualmenteAjustado[fam].ae && derived.ae !== undefined && derived.ae !== '') {
              state.inputs[fam].ae = derived.ae;
            }
            if (!state.manualmenteAjustado[fam].fz && derived.fz !== undefined && derived.fz !== '') {
              state.inputs[fam].fz = derived.fz;
            }
          } else if (fam === 'furar') {
            if (!state.manualmenteAjustado[fam].vc && derived.vc !== undefined && derived.vc !== '') {
              state.inputs[fam].vc = derived.vc;
            }
            if (!state.manualmenteAjustado[fam].fn && derived.fn !== undefined && derived.fn !== '') {
              state.inputs[fam].fn = derived.fn;
            }
            if (!state.manualmenteAjustado[fam].anguloPonta && derived.anguloPonta !== undefined && derived.anguloPonta !== '') {
              state.inputs[fam].anguloPonta = derived.anguloPonta;
            }
          } else if (fam === 'roscar') {
            if (!state.manualmenteAjustado[fam].vc && derived.vc !== undefined && derived.vc !== '') {
              state.inputs[fam].vc = derived.vc;
            }
          } else if (fam === 'mandrilar') {
            if (!state.manualmenteAjustado[fam].vc && derived.vc !== undefined && derived.vc !== '') {
              state.inputs[fam].vc = derived.vc;
            }
            if (!state.manualmenteAjustado[fam].fn && derived.fn !== undefined && derived.fn !== '') {
              state.inputs[fam].fn = derived.fn;
            }
            if (!state.manualmenteAjustado[fam].rEpsilon && derived.rEpsilon !== undefined && derived.rEpsilon !== '') {
              state.inputs[fam].rEpsilon = derived.rEpsilon;
            }
          }
        } else {
          state.inputs[fam].ferramentaId = '';
          state.inputs[fam].geometriaId = '';
          state.inputs[fam].geometria = '';
          state.inputs[fam].ferramentaTipo = '';
          if (!state.manualmenteAjustado[fam].ap) state.inputs[fam].ap = '';
          if (!state.manualmenteAjustado[fam].ae) state.inputs[fam].ae = '';
          if (!state.manualmenteAjustado[fam].fz) state.inputs[fam].fz = '';
          if (fam === 'furar' && !state.manualmenteAjustado[fam].fn) state.inputs[fam].fn = '';
          if (fam === 'mandrilar' && !state.manualmenteAjustado[fam].fn) state.inputs[fam].fn = '';
        }
        renderHeaderZ1();
        renderConfigForm();
        if (state.isCalculated) {
          recalcularDinamico('ferramenta');
        } else {
          atualizarEstadoBotaoCalcular(fam);
        }
      };
    }

    const linkCfgFer = document.getElementById('link-cfg-ferramentas');
    if (linkCfgFer) {
      linkCfgFer.onclick = () => {
        state.panelState['panel-cfg-tools'] = true;
        switchTab('configuracoes');
      };
    }

    const linkCfgMat = document.getElementById('link-ir-configuracoes-mat');
    if (linkCfgMat) {
      linkCfgMat.onclick = () => {
        switchTab('configuracoes');
      };
    }

    const ctaBtn = document.getElementById('btn-calcular');
    if (ctaBtn) {
      ctaBtn.onclick = () => {
        executeCalculation();
      };
    }

    const resetBtns = [document.getElementById('btn-reset-params'), document.getElementById('btn-reset-params-main')].filter(Boolean);
    resetBtns.forEach(btn => {
      btn.onclick = () => {
        resetActiveFamilyParams();
      };
    });

    // Bindings de inputs dinâmicos
    bindInputs(fam);
    setupStepControls();
    atualizarEstadoBotaoCalcular(fam);
  }

  // Sincronizar inputs digitados com state e recálculo dinâmico
  function bindInputs(fam) {
    function bindField(id, key) {
      const el = document.getElementById(id);
      if (!el) return;
      if (state.inputs[fam] && state.inputs[fam][key] !== undefined) {
        const v = state.inputs[fam][key];
        el.value = (v === '' || v === null || v === undefined) ? '' : valStr(v, key === 'fz' ? 3 : (key === 'ap' || key === 'ae' || key === 'r' || key === 'rEpsilon' ? 1 : undefined));
      }
      const handler = () => {
        const rawVal = el.value.trim();
        state.inputs[fam][key] = rawVal === '' ? '' : parseBrNum(rawVal);
        state.manualmenteAjustado[fam][key] = true;

        if (fam === 'fresar' && key === 'd') {
          const dVal = parseBrNum(rawVal);
          if (dVal > 0) {
            if (!state.manualmenteAjustado.fresar.fz) {
              const novoFz = interpolarFzPorDiametro(dVal);
              state.inputs.fresar.fz = novoFz;
              const fzEl = document.getElementById('f-fz');
              if (fzEl) fzEl.value = valStr(novoFz, 3);
            }
            const geo = state.inputs.fresar.geometriaId ? geometriaPorId(state.inputs.fresar.geometriaId) : null;
            if (geo && geo.aePartida === '0.7*D') {
              if (!state.manualmenteAjustado.fresar.ae) {
                const novoAe = Number((0.7 * dVal).toFixed(2));
                state.inputs.fresar.ae = novoAe;
                const aeEl = document.getElementById('f-ae');
                if (aeEl) aeEl.value = valStr(novoAe, 1);
              }
            }
          }
        }

        renderHeaderZ1();
        if (state.isCalculated) {
          recalcularDinamico(key);
        } else {
          atualizarEstadoBotaoCalcular(fam);
        }
      };
      el.oninput = handler;
      el.onchange = handler;
    }

    if (fam === 'fresar') {
      bindField('f-d', 'd');
      bindField('f-r', 'r');
      bindField('f-l', 'l');
      bindField('f-z', 'z');
      bindField('f-ap', 'ap');
      bindField('f-lc', 'lc');
      bindField('f-vc', 'vc');
      bindField('f-fz', 'fz');
      bindField('f-ae', 'ae');
    } else if (fam === 'furar') {
      bindField('fu-d', 'd');
      bindField('fu-ang', 'anguloPonta');
      bindField('fu-l', 'l');
      bindField('fu-vc', 'vc');
      bindField('fu-fn', 'fn');
    } else if (fam === 'roscar') {
      const roRosca = document.getElementById('ro-rosca');
      if (roRosca) {
        roRosca.onchange = () => {
          state.inputs.roscar.roscaDesignacao = roRosca.value;
          renderHeaderZ1();
          if (state.isCalculated) {
            recalcularDinamico('rosca');
          } else {
            atualizarEstadoBotaoCalcular('roscar');
          }
        };
      }
      bindField('ro-l', 'l');
      bindField('ro-vc', 'vc');
    } else if (fam === 'mandrilar') {
      bindField('man-di', 'dInicial');
      bindField('man-df', 'dFinal');
      bindField('man-re', 'rEpsilon');
      bindField('man-l', 'l');
      bindField('man-vc', 'vc');
      bindField('man-fn', 'fn');
    }
  }

  /* ==========================================================================
     ÁREA CONFIGURAÇÕES — apoio de edição
     Fontes: mvp/ESCOPO_CONFIGURACOES.md §2.2, §3 e §4 · folha Configuracoes.dc.html
     ========================================================================== */

  // Frase permanente do §2.2 — postura, não ressalva. Não é selo, não é procedência, não é alerta.
  const AVISO_FORNECEDOR = 'Os valores que vêm com o sistema são um ponto de partida. <strong>Peça os números ao fornecedor da sua ferramenta</strong> e ajuste aqui — quem fabricou a ferramenta sabe dela mais do que qualquer tabela geral.';

  const CLASSES_ISO = [
    { v: 'P', t: 'P (Aços ao carbono / baixa liga)' },
    { v: 'M', t: 'M (Aços inoxidáveis)' },
    { v: 'K', t: 'K (Ferros fundidos)' },
    { v: 'N', t: 'N (Metais não ferrosos / Alumínio)' },
    { v: 'S', t: 'S (Ligas resistentes ao calor / Titânio)' },
    { v: 'H', t: 'H (Materiais endurecidos)' }
  ];

  // As cinco grandezas do material (ESCOPO_CONFIGURACOES §3.1). Nenhuma a mais, nenhuma a menos.
  const CAMPOS_MATERIAL = [
    { key: 'classeISO', rotulo: 'Classe ISO', tipo: 'select' },
    { key: 'dureza', rotulo: 'Dureza', tipo: 'texto', dica: 'HB ou HRC · ex: 170–220 HB' },
    { key: 'kc11', rotulo: 'Força específica de corte (<span class="sym">kc1.1</span>)', tipo: 'inteiro', unidade: 'N/mm²' },
    { key: 'mc', rotulo: 'Expoente (<span class="sym">mc</span>)', tipo: 'decimal2' },
    { key: 'vcPartida', rotulo: 'Velocidade de corte de partida (<span class="sym">vc</span>)', tipo: 'inteiro', unidade: 'm/min' }
  ];

  const SUBSTRATOS = {
    'MD': 'Metal duro (MD)',
    'HSS-Co': 'Aço rápido ao cobalto (HSS-Co)'
  };


  function tipoPorId(tipoId) {
    return FENIX_MOCK_DATA.tiposFerramenta.find(t => t.id === tipoId) || FENIX_MOCK_DATA.tiposFerramenta[0];
  }

  function modeloPorId(modeloId) {
    for (const t of FENIX_MOCK_DATA.tiposFerramenta) {
      const m = t.modelos.find(mod => mod.id === modeloId);
      if (m) return { ...m, tipoId: t.id, tipoNome: t.nome };
    }
    return null;
  }

  function geometriaPorId(id) {
    return FENIX_MOCK_DATA.geometrias.find(g => g.id === id) || null;
  }

  function geometriaDaFerramenta(tool) {
    if (!tool) return null;
    return geometriaPorId(tool.geometriaId) ||
      FENIX_MOCK_DATA.geometrias.find(g => g.nome === tool.geometria) || null;
  }

  function siglaSubstrato(tool) {
    if (!tool || !tool.substrato) return 'MD';
    return Object.keys(SUBSTRATOS).find(k => SUBSTRATOS[k] === tool.substrato) || 'MD';
  }

  // Resumo de cadastro da ferramenta na biblioteca (sem variáveis variáveis de cálculo)
  function resumoFerramenta(tool) {
    const geo = geometriaDaFerramenta(tool);
    const partes = [geo ? geo.nome : (tool.geometria || 'Ferramenta')];
    if (tool.substrato) partes.push(tool.substrato);
    return partes.join(' · ');
  }

  /**
   * Configurações persistentes ajustadas por passo ±.
   * Sem teto (R1: nada trava, acima do padrão é decisão do operador). O piso existe só onde o
   * valor perde sentido — porcentagem negativa, divisor zero.
   */
  const CFG_STEPS = {
    margem: {
      rotulo: 'Margem de segurança', rotuloCampo: 'Percentual do valor calculado',
      unidade: '%', passo: 5, piso: 0, padrao: 100, casas: 0,
      avisoPiso: 'A lente não vai abaixo de zero',
      get: () => state.safetyMargin,
      set: (v) => { state.safetyMargin = v; }
    },
    hssAvanco: {
      rotulo: 'Percentual do avanço', unidade: '%', passo: 1, piso: 1, padrao: 10, casas: 0,
      avisoPiso: 'O avanço não vai abaixo de 1% da rotação',
      get: () => state.brocaHSS.percentualAvanco,
      set: (v) => { state.brocaHSS.percentualAvanco = v; }
    },
    hssDivisor: {
      rotulo: 'Divisor do incremento (D / N)', unidade: '', passo: 1, piso: 1, padrao: 25, casas: 0,
      avisoPiso: 'O divisor não vai abaixo de 1',
      get: () => state.brocaHSS.divisorIncremento,
      set: (v) => { state.brocaHSS.divisorIncremento = v; }
    },
    hssTeto: {
      rotulo: 'Teto do incremento pica-pau', unidade: 'mm', passo: 0.1, piso: 0.1, padrao: 0.8, casas: 1,
      avisoPiso: 'O teto não vai abaixo de 0,1 mm',
      get: () => state.brocaHSS.tetoIncremento,
      set: (v) => { state.brocaHSS.tetoIncremento = v; }
    }
  };

  function textoCfg(cfg, valor) {
    return cfg.casas ? formatDec(valor, cfg.casas) : formatInt(valor);
  }

  function stepConfigHtml(alvo) {
    const cfg = CFG_STEPS[alvo];
    const valor = cfg.get();
    const noPiso = Number((valor - cfg.passo).toFixed(2)) < cfg.piso;
    const diferente = Number(valor) !== Number(cfg.padrao);
    const passoTexto = `${textoCfg(cfg, cfg.passo)}${cfg.unidade ? ' ' + cfg.unidade : ''}`;
    const padraoTexto = `${textoCfg(cfg, cfg.padrao)}${cfg.unidade ? ' ' + cfg.unidade : ''}`;
    const nome = textoSimples(cfg.rotulo);

    return `
      <div class="field">
        <div class="lbl">${cfg.rotuloCampo || cfg.rotulo}</div>
        <div class="stepline">
          <button type="button" class="step btn-cfg-step" id="step-${alvo}-menos" data-alvo="${alvo}" data-dir="-1"
            ${noPiso ? `disabled aria-disabled="true" title="${cfg.avisoPiso}"` : `title="Diminuir ${passoTexto}"`}
            aria-label="Diminuir ${nome} em ${passoTexto}">−</button>
          <div class="stepval">
            <span class="stepnum">${textoCfg(cfg, valor)}</span>
            ${cfg.unidade ? `<span class="funit">${cfg.unidade}</span>` : ''}
          </div>
          <button type="button" class="step btn-cfg-step" id="step-${alvo}-mais" data-alvo="${alvo}" data-dir="1"
            title="Aumentar ${passoTexto}" aria-label="Aumentar ${nome} em ${passoTexto}">+</button>
        </div>
        ${diferente ? `
          <div class="revert-line">
            <span class="marca-fabrica">diferente do padrão · padrão ${padraoTexto}</span>
            <button type="button" class="btn-undo btn-cfg-reset" data-alvo="${alvo}">voltar ao padrão (${padraoTexto})</button>
          </div>`
        : `<div class="cap">no padrão de fábrica · passo de ${passoTexto}</div>`}
      </div>`;
  }

  function nomeFamilia(f) {
    return { fresar: 'Fresar', furar: 'Furar', roscar: 'Roscar', mandrilar: 'Mandrilar' }[f] || f;
  }

  // Rascunho da ferramenta em cadastro. Sem campos de variáveis de cálculo.
  function novaFerramentaPadrao(tipoId, modeloId, substrato, apelido, descricao) {
    const tipo = tipoPorId(tipoId || 'fresar');
    const modelo = (modeloId && tipo.modelos.find(m => m.id === modeloId)) || tipo.modelos[0];
    const geo = geometriaPorId(modelo.geometriaId) || FENIX_MOCK_DATA.geometrias[0];
    const subValido = substrato && modelo.substratos.indexOf(substrato) >= 0 ? substrato : modelo.substratos[0];
    return {
      tipoId: tipo.id,
      modeloId: modelo.id,
      geometriaId: geo.id,
      geometria: geo.nome,
      substrato: subValido,
      apelido: apelido || '',
      descricao: descricao || '',
      erroApelido: false
    };
  }

  function formNovaFerramentaHtml() {
    if (!state.novaFerramenta) state.novaFerramenta = novaFerramentaPadrao('fresar');
    const nova = state.novaFerramenta;
    const tipo = tipoPorId(nova.tipoId);
    const modelo = modeloPorId(nova.modeloId) || tipo.modelos[0];
    const geo = geometriaPorId(nova.geometriaId) || geometriaPorId(modelo.geometriaId);

    const opcoesTipos = FENIX_MOCK_DATA.tiposFerramenta.map(t => `
      <option value="${t.id}" ${t.id === nova.tipoId ? 'selected' : ''}>${t.nome}</option>
    `).join('');

    const opcoesModelos = tipo.modelos.map(m => `
      <option value="${m.id}" ${m.id === nova.modeloId ? 'selected' : ''}>${m.nome}</option>
    `).join('');

    const substratoHtml = modelo.substratos.length > 1
      ? selectFieldHtml({
          id: 'sel-nova-substrato',
          rotulo: 'Substrato',
          valor: nova.substrato,
          opcoes: modelo.substratos.map(k => ({ v: k, t: SUBSTRATOS[k] }))
        })
      : `<div class="field">
           <span class="lbl">Substrato</span>
           <div class="valor-fixo">${SUBSTRATOS[nova.substrato] || SUBSTRATOS[modelo.substratos[0]]}</div>
           <div class="cap">Este modelo existe exclusivamente em ${SUBSTRATOS[modelo.substratos[0]].toLowerCase()}.</div>
         </div>`;

    return `
      <div class="form-grid">
        <div class="field">
          <label class="lbl" for="sel-nova-tipo">Tipo / Família de Ferramenta</label>
          <div class="selbox">
            <select class="fsel" id="sel-nova-tipo">${opcoesTipos}</select>
            <svg class="selcv" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3.5 6 L8 11 L12.5 6"></path></svg>
          </div>
          <div class="cap">${tipo.descricao}</div>
        </div>

        <div class="field">
          <label class="lbl" for="sel-nova-modelo">Modelo da Ferramenta</label>
          <div class="selbox">
            <select class="fsel" id="sel-nova-modelo">${opcoesModelos}</select>
            <svg class="selcv" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3.5 6 L8 11 L12.5 6"></path></svg>
          </div>
          <div class="cap">A geometria de corte correspondente é determinada automaticamente pelo sistema.</div>
        </div>

        ${substratoHtml}

        ${fieldHtml({
          id: 'nova-fer-apelido',
          rotulo: 'Nome / Apelido da Ferramenta',
          valor: nova.apelido,
          classe: 'in-nova-fer',
          modo: 'text',
          placeholder: 'ex: Fresa Toroidal de Acabamento',
          dataset: 'data-campo="apelido"',
          erro: nova.erroApelido,
          rodape: nova.erroApelido
            ? '<div class="erro-campo">Informe o nome ou apelido para reconhecer esta ferramenta na oficina.</div>'
            : '<div class="cap">O nome que você reconhece no armário ou na montagem.</div>'
        })}

        ${fieldHtml({
          id: 'nova-fer-desc',
          rotulo: 'Descrição / Aplicação <span class="dhint">opcional</span>',
          valor: nova.descricao || '',
          classe: 'in-nova-fer',
          modo: 'text',
          placeholder: 'ex: Uso em moldes e cavidades',
          dataset: 'data-campo="descricao"'
        })}
      </div>

      <!-- Estrutura da Geometria Vinculada (Informativa, somente leitura) -->
      <div class="card" style="background:var(--bg-card);border:1px solid var(--border-subtle);padding:12px 14px;margin-top:10px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--tx-brand)"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          <span class="lbl" style="font-weight:600;color:var(--tx-1)">Geometria Vinculada: ${geo.nome}</span>
        </div>
        <div class="cap" style="color:var(--tx-2);margin-bottom:4px">
          <strong>Variáveis solicitadas no cálculo:</strong> ${geo.descricaoVariaveis}
        </div>
        <div class="cap" style="color:var(--tx-3)">
          A geometria é determinada pela documentação e não é editada aqui. Dimensões, balanço e parâmetros de corte pertencem à tela de cálculo.
        </div>
      </div>

      <div class="acts" style="margin-top:14px">
        <button type="button" class="btn-primary" id="btn-criar-ferramenta">Adicionar Ferramenta</button>
        <button type="button" class="btn-secondary" id="btn-cancelar-ferramenta">Cancelar</button>
      </div>`;
  }

  // Guarda o que já foi digitado antes de um re-render do formulário
  function lerFormNovaFerramenta() {
    const nova = state.novaFerramenta;
    if (!nova) return;
    const inApelido = document.getElementById('nova-fer-apelido');
    if (inApelido) nova.apelido = inApelido.value.trim();
    const inDesc = document.getElementById('nova-fer-desc');
    if (inDesc) nova.descricao = inDesc.value.trim();
  }

  function materialDeFabrica(id) {
    return FENIX_MOCK_DATA.materiaisPadrao.find(m => m.id === id) || null;
  }

  function textoCampoMaterial(campo, valor) {
    if (valor === '' || valor === null || valor === undefined) return '—';
    if (campo.tipo === 'inteiro') return formatInt(valor);
    if (campo.tipo === 'decimal2') return formatDec(valor, 2);
    return String(valor);
  }

  // Quais das cinco grandezas diferem do valor de fábrica. Material criado nunca tem fábrica.
  function camposMaterialAlterados(mat) {
    const fab = materialDeFabrica(mat.id);
    if (!fab) return [];
    return CAMPOS_MATERIAL.filter(c => String(mat[c.key]) !== String(fab[c.key])).map(c => c.key);
  }

  // Re-render da área preservando o que estava aberto e devolvendo o foco ao controle usado
  function rerenderConfig(focusId) {
    const alvo = focusId || (document.activeElement && document.activeElement.id) || null;
    renderSettingsView();
    if (alvo) {
      const el = document.getElementById(alvo);
      if (el) el.focus({ preventScroll: true });
    }
  }

  function textoSimples(html) {
    return html.replace(/<[^>]*>/g, '');
  }

  // Marca os números da tela como desatualizados: houve mudança de dado depois do
  // último cálculo. Antes do primeiro cálculo não há o que desatualizar (R4).
  // O alerta e o nível de diagnóstico NÃO acompanham — R7, alarme ativo nunca esmaece.
  function markOutdated() {
    if (!state.isCalculated) return;
    state.isOutdated = true;
    renderCalculatedResults();
  }

  // Editar dado de um material em uso afeta também o cálculo que está na tela (§3.4, decisão Q-D)
  function marcarCalculoDesatualizadoPorMaterial(id) {
    const fam = state.activeTab === 'configuracoes' ? state.previousTab : state.activeTab;
    if (state.inputs[fam] && state.inputs[fam].materialId === id) markOutdated();
  }

  let cfgStatusTimer = null;

  // Linha única de confirmação da área: salvo, revertido, apagado, erro. Discreta e anunciada.
  function flashStatus(msg, tipo) {
    state.cfgStatus = { msg, tipo: tipo || 'ok' };
    pintarStatus();
    clearTimeout(cfgStatusTimer);
    cfgStatusTimer = setTimeout(() => {
      state.cfgStatus = null;
      pintarStatus();
    }, 3600);
  }

  function pintarStatus() {
    const el = document.getElementById('cfg-status');
    if (!el) return;
    if (!state.cfgStatus) {
      el.className = 'cfg-status';
      el.innerHTML = '';
      return;
    }
    el.className = 'cfg-status visivel ' + state.cfgStatus.tipo;
    el.innerHTML = `<span aria-hidden="true">${state.cfgStatus.tipo === 'erro' ? '!' : '✓'}</span><span>${state.cfgStatus.msg}</span>`;
  }

  // Campo de texto/número da área Configurações
  function fieldHtml(cfg) {
    return `
      <div class="field">
        <label class="lbl" for="${cfg.id}">${cfg.rotulo}</label>
        <div class="fbox ${cfg.erro ? 'error' : ''}">
          <input class="fin ${cfg.classe || ''}" id="${cfg.id}" type="text" inputmode="${cfg.modo || 'decimal'}"
            value="${cfg.valor === null || cfg.valor === undefined ? '' : cfg.valor}"
            placeholder="${cfg.placeholder || '—'}" ${cfg.dataset || ''}>
          ${cfg.unidade ? `<span class="funit">${cfg.unidade}</span>` : ''}
        </div>
        ${cfg.rodape || ''}
      </div>`;
  }

  function selectFieldHtml(cfg) {
    return `
      <div class="field">
        <label class="lbl" for="${cfg.id}">${cfg.rotulo}</label>
        <div class="selbox">
          <select class="fsel ${cfg.classe || ''}" id="${cfg.id}" ${cfg.dataset || ''}>
            ${cfg.opcoes.map(o => `<option value="${o.v}" ${String(o.v) === String(cfg.valor) ? 'selected' : ''}>${o.t}</option>`).join('')}
          </select>
          <svg class="selcv" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 6 L8 11 L12.5 6"></path></svg>
        </div>
        ${cfg.rodape || ''}
      </div>`;
  }

  // Ação destrutiva: o pedido vira um par confirmar/cancelar dentro do próprio cartão (§3.6, §4.7)
  function blocoApagarHtml(cfg) {
    const pedindo = state.confirmando && state.confirmando.tipo === cfg.tipo && state.confirmando.id === cfg.id;
    if (!pedindo) {
      return `
        <div class="danger-zone">
          <button type="button" class="btn-undo btn-pedir-apagar" data-tipo="${cfg.tipo}" data-id="${cfg.id}">${cfg.rotulo}</button>
          <div class="cap">${cfg.nota}</div>
        </div>`;
    }
    return `
      <div class="danger-zone confirmando">
        <div class="prose" style="font-weight:600;color:var(--st-crit-ink)">${cfg.pergunta}</div>
        <div class="acts">
          <button type="button" class="btn-danger btn-confirmar-apagar" id="confirmar-${cfg.tipo}-${cfg.id}" data-tipo="${cfg.tipo}" data-id="${cfg.id}">Sim, apagar</button>
          <button type="button" class="btn-secondary btn-cancelar-apagar">Cancelar</button>
        </div>
        <div class="cap">${cfg.nota}</div>
      </div>`;
  }

  // Renderizar a tela de Configurações completa (Materiais, Ferramentas, Margem de Segurança)
  function renderSettingsView() {
    const configRoot = document.getElementById('view-configuracoes');
    if (!configRoot) return;

    // ---- Bloco 1: materiais (ESCOPO_CONFIGURACOES §3) ----
    const matCriados = state.materiais.filter(m => !materialDeFabrica(m.id));
    const matDePartida = state.materiais.length - matCriados.length;
    const totalAlterados = state.materiais.reduce((n, m) => n + camposMaterialAlterados(m).length, 0);

    const matItensHtml = state.materiais.map(m => {
      const fab = materialDeFabrica(m.id);
      const alterados = camposMaterialAlterados(m);

      const marca = fab
        ? (alterados.length
            ? `<span class="tag tag-info">${alterados.length} ${alterados.length === 1 ? 'grandeza diferente' : 'grandezas diferentes'} de fábrica</span>`
            : '')
        : '<span class="tag tag-info">criado pelo operador</span>';

      const camposHtml = CAMPOS_MATERIAL.map(c => {
        const diferente = alterados.indexOf(c.key) >= 0;
        const vazio = m[c.key] === '' || m[c.key] === null || m[c.key] === undefined;
        const id = `mat-${m.id}-${c.key}`;
        const dataset = `data-mat="${m.id}" data-campo="${c.key}"`;

        let rodape = '';
        if (diferente) {
          rodape = `
            <div class="revert-line">
              <span class="marca-fabrica">diferente de fábrica · valor de fábrica ${textoCampoMaterial(c, fab[c.key])}${c.unidade ? ' ' + c.unidade : ''}</span>
              <button type="button" class="btn-undo btn-reverter-campo" ${dataset}>voltar ao valor de fábrica</button>
            </div>`;
        } else if (vazio) {
          rodape = '<div class="cap">Em branco. O material continua na lista; ao ser escolhido no cálculo, esta grandeza vira campo obrigatório vazio — nada trava.</div>';
        } else if (c.dica) {
          rodape = `<div class="cap">${c.dica}</div>`;
        }

        if (c.tipo === 'select') {
          return selectFieldHtml({ id, rotulo: c.rotulo, valor: m[c.key], opcoes: CLASSES_ISO, classe: 'sel-material', dataset, rodape });
        }
        return fieldHtml({
          id,
          rotulo: c.rotulo,
          valor: vazio ? '' : textoCampoMaterial(c, m[c.key]),
          unidade: c.unidade,
          classe: 'in-material',
          modo: c.tipo === 'texto' ? 'text' : 'decimal',
          dataset,
          rodape
        });
      }).join('');

      const apagar = fab ? '' : blocoApagarHtml({
        tipo: 'material',
        id: m.id,
        rotulo: 'Apagar material',
        pergunta: `Apagar o material “${m.nome}”?`,
        nota: 'Criado pelo operador — não há valor de fábrica para onde voltar. Não tem desfazer. Um cálculo em andamento que use este material permanece na tela com os valores que tinha.'
      });

      return `
        <div class="drawer">
          <button type="button" class="dtrigger" id="trig-mat-${m.id}" aria-expanded="false" aria-controls="panel-mat-${m.id}">
            <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
            <span class="item-nome">${m.nome}</span>
            <span class="dsum">classe ${m.classeISO} · ${m.dureza || '—'}</span>
            ${marca}
          </button>
          <div id="panel-mat-${m.id}" class="dbody dbody--col" hidden style="gap:14px">
            <div class="form-grid">${camposHtml}</div>
            ${apagar}
          </div>
        </div>`;
    }).join('');

    // ---- Bloco 2: ferramentas (ESCOPO_CONFIGURACOES §4) ----
    // ---- Bloco 2: ferramentas organizadas por Tipo / Família (ESCOPO_CONFIGURACOES §4) ----
    const tiposFerramentasHtml = FENIX_MOCK_DATA.tiposFerramenta.map(tipo => {
      const ferramentasDoTipo = state.ferramentas.filter(t => t.familia === tipo.id || t.tipoId === tipo.id);

      const itensHtml = ferramentasDoTipo.length === 0
        ? `<div class="estado-vazio">
             <span class="lbl">Nenhuma ferramenta cadastrada nesta categoria</span>
             <span class="cap">Use "Adicionar ferramenta", acima, para cadastrar a primeira.</span>
           </div>`
        : ferramentasDoTipo.map(tool => {
            const geo = geometriaDaFerramenta(tool);
            const modelo = modeloPorId(tool.modeloId);
            const substratosPermitidos = (modelo && modelo.substratos) || (geo && geo.substratos) || ['MD'];

            const substratoEditHtml = substratosPermitidos.length > 1
              ? selectFieldHtml({
                  id: `fer-${tool.id}-substrato`,
                  rotulo: 'Substrato',
                  valor: tool.substrato,
                  opcoes: substratosPermitidos.map(k => ({ v: SUBSTRATOS[k], t: SUBSTRATOS[k] })),
                  classe: 'in-ferramenta-sel',
                  dataset: `data-tool="${tool.id}" data-campo="substrato"`
                })
              : `<div class="field">
                   <span class="lbl">Substrato</span>
                   <div class="valor-fixo">${tool.substrato}</div>
                   <div class="cap">Este modelo existe exclusivamente em ${tool.substrato.toLowerCase()}.</div>
                 </div>`;

            return `
              <div class="drawer">
                <button type="button" class="dtrigger" id="trig-tool-${tool.id}" aria-expanded="false" aria-controls="panel-tool-${tool.id}">
                  <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
                  <span class="item-nome">${tool.apelido}</span>
                  <span class="dsum">${resumoFerramenta(tool)}</span>
                </button>
                <div id="panel-tool-${tool.id}" class="dbody dbody--col" hidden style="gap:14px">
                  <div class="form-grid">
                    <div class="field">
                      <span class="lbl">Tipo / Categoria</span>
                      <div class="valor-fixo">${tipo.nome}</div>
                    </div>
                    <div class="field">
                      <span class="lbl">Modelo da Ferramenta</span>
                      <div class="valor-fixo">${geo ? geo.nome : tool.geometria}</div>
                      <div class="cap">O modelo e a geometria são propriedades fixas do sistema para esta ferramenta.</div>
                    </div>
                    ${substratoEditHtml}
                    ${fieldHtml({
                      id: `fer-${tool.id}-apelido`,
                      rotulo: 'Nome / Apelido da ferramenta',
                      valor: tool.apelido,
                      classe: 'in-ferramenta',
                      modo: 'text',
                      dataset: `data-tool="${tool.id}" data-campo="apelido"`
                    })}
                    ${fieldHtml({
                      id: `fer-${tool.id}-descricao`,
                      rotulo: 'Descrição / Aplicação <span class="dhint">opcional</span>',
                      valor: tool.descricao || '',
                      classe: 'in-ferramenta',
                      modo: 'text',
                      dataset: `data-tool="${tool.id}" data-campo="descricao"`
                    })}
                  </div>

                  <!-- Geometria Vinculada (Informativa, somente leitura) -->
                  <div class="card" style="background:var(--bg-card);border:1px solid var(--border-subtle);padding:10px 14px">
                    <div style="font-weight:600;font-size:12px;color:var(--tx-1);margin-bottom:4px">
                      Geometria vinculada: ${geo ? geo.nome : tool.geometria}
                    </div>
                    <div class="cap" style="color:var(--tx-2);margin-bottom:4px">
                      <strong>Variáveis de cálculo:</strong> ${geo ? geo.descricaoVariaveis : 'Dimensões e montagem'}
                    </div>
                    <div class="cap" style="color:var(--tx-3)">
                      A geometria define quais grandezas são solicitadas no cálculo. Valores variáveis (diâmetro, raio, arestas, balanço) são informados na tela de cálculo, não no cadastro.
                    </div>
                  </div>

                  ${blocoApagarHtml({
                    tipo: 'ferramenta',
                    id: tool.id,
                    rotulo: 'Apagar ferramenta',
                    pergunta: `Apagar a ferramenta “${tool.apelido}”?`,
                    nota: 'Irreversível, sem desfazer. Um cálculo em andamento que use esta ferramenta permanece na tela com os valores que tinha.'
                  })}
                </div>
              </div>`;
          }).join('');

      return `
        <div class="tipo-ferramenta-grupo">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 2px;margin-bottom:6px;border-bottom:1px solid var(--border-subtle)">
            <span style="font-size:13px;font-weight:600;color:var(--tx-1)">${tipo.nome}</span>
            <span class="cap" style="color:var(--tx-3)">${ferramentasDoTipo.length} cadastrada${ferramentasDoTipo.length === 1 ? '' : 's'}</span>
          </div>
          <div class="lista-cfg">
            ${itensHtml}
          </div>
        </div>`;
    }).join('');

    configRoot.innerHTML = `
      <div class="config-wrap">
        <div class="config-head">
          <div class="brand-plate">FENIX</div>
          <div style="font-size:16px;font-weight:600;color:var(--tx-1)">Configurações</div>
          <button type="button" class="config-back" id="btn-voltar-calculo">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M13 8 H4"></path><path d="M7.5 4 L4 8 L7.5 12"></path></svg>
            <span>Voltar ao cálculo</span>
          </button>
        </div>

        <div id="cfg-status" class="cfg-status" role="status" aria-live="polite"></div>

        <div class="drawer">
          <button type="button" class="dtrigger" id="trig-cfg-note" aria-expanded="false" aria-controls="panel-cfg-note">
            <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
            <span class="dhint">onde estes ajustes valem e como ficam salvos</span>
          </button>
          <div id="panel-cfg-note" class="dbody dbody--col" hidden>
            <div class="prose">O que muda aqui vale para toda a oficina e fica salvo neste computador (localStorage). Zero sincronização em nuvem, zero dependência de conexão de internet — a área abre idêntica offline (R11).</div>
          </div>
        </div>

        <!-- BLOCO 1: MATERIAIS -->
        <div class="card">
          <button type="button" class="bhead" id="bhead-cfg-mat" aria-expanded="false" aria-controls="panel-cfg-mat">
            <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
            <div class="lbl" style="flex-grow:1">Materiais</div>
            <span class="bsum">${matDePartida} de partida${matCriados.length ? ` · ${matCriados.length} criado${matCriados.length > 1 ? 's' : ''}` : ''}${totalAlterados ? ` · ${totalAlterados} editada${totalAlterados > 1 ? 's' : ''}` : ''}</span>
          </button>
          <div id="panel-cfg-mat" hidden style="display:flex;flex-direction:column;gap:12px">
            <hr class="sep">

            <div class="drawer">
              <button type="button" class="dtrigger" id="trig-note-mat" aria-expanded="false" aria-controls="panel-note-mat">
                <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
                <span class="dhint">o que estes cinco valores fazem · valor fora do usual</span>
              </button>
              <div id="panel-note-mat" class="dbody dbody--col" hidden>
                <div class="prose">Cada material carrega cinco grandezas que entram na conta. Mudam raramente — só quando o fornecedor publica dados novos. Nenhum valor digitado é recusado, truncado ou ajustado: valor fora do usual aparece como alerta na tela de cálculo, nunca como bloqueio.</div>
              </div>
            </div>

            <div class="aviso-fornecedor">${AVISO_FORNECEDOR}</div>

            <!-- Criar material (D12) -->
            <div class="drawer">
              <button type="button" class="dtrigger" id="trig-add-mat" aria-expanded="false" aria-controls="panel-add-mat">
                <span class="plus-sign" aria-hidden="true">+</span>
                <span class="lbl" style="flex:none">Criar material</span>
                <span class="dhint">nome e as cinco grandezas · o operador é a fonte do número dele</span>
              </button>
              <div id="panel-add-mat" class="form-panel" hidden>
                <div class="form-grid">
                  <div class="field">
                    <label class="lbl" for="new-mat-nome">Nome do material</label>
                    <div class="fbox"><input class="fin" id="new-mat-nome" placeholder="o nome que você reconhece"></div>
                  </div>
                  <div class="field">
                    <label class="lbl" for="new-mat-iso">Classe ISO</label>
                    <div class="selbox">
                      <select class="fsel" id="new-mat-iso">
                        ${CLASSES_ISO.map(o => `<option value="${o.v}">${o.t}</option>`).join('')}
                      </select>
                      <svg class="selcv" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3.5 6 L8 11 L12.5 6"></path></svg>
                    </div>
                  </div>
                  <div class="field">
                    <label class="lbl" for="new-mat-dureza">Dureza</label>
                    <div class="fbox"><input class="fin" id="new-mat-dureza" placeholder="170–220 HB"></div>
                  </div>
                  <div class="field">
                    <label class="lbl" for="new-mat-kc">Força específica de corte (<span class="sym">kc1.1</span>)</label>
                    <div class="fbox"><input class="fin" id="new-mat-kc" inputmode="decimal" placeholder="1.500"><span class="funit">N/mm²</span></div>
                  </div>
                  <div class="field">
                    <label class="lbl" for="new-mat-mc">Expoente (<span class="sym">mc</span>)</label>
                    <div class="fbox"><input class="fin" id="new-mat-mc" inputmode="decimal" placeholder="0,21"></div>
                  </div>
                  <div class="field">
                    <label class="lbl" for="new-mat-vc">Velocidade de corte de partida (<span class="sym">vc</span>)</label>
                    <div class="fbox"><input class="fin" id="new-mat-vc" inputmode="decimal" placeholder="140"><span class="funit">m/min</span></div>
                  </div>
                </div>
                <div class="cap">Se uma das cinco ficar em branco, o material existe e fica na lista; ao ser escolhido no cálculo, a grandeza vazia vira campo obrigatório vazio — nada trava. Material criado não tem valor de fábrica: editar de novo é o caminho de volta.</div>
                <div class="acts">
                  <button type="button" class="btn-primary" id="btn-salvar-material">Criar material</button>
                  <button type="button" class="btn-secondary" id="btn-cancelar-material">Cancelar</button>
                </div>
              </div>
            </div>

            <div class="lista-cfg">
              ${matItensHtml}
            </div>

            <div class="revert-line">
              <button type="button" class="btn-undo" id="btn-reverter-todos-mat" ${totalAlterados ? '' : 'disabled'}>Voltar todos os materiais ao valor de fábrica</button>
              ${totalAlterados ? `<span class="tag tag-info">${totalAlterados} ${totalAlterados === 1 ? 'grandeza diferente' : 'grandezas diferentes'} de fábrica</span>` : '<span class="cap">nenhuma grandeza diferente de fábrica</span>'}
            </div>

            <div class="drawer">
              <button type="button" class="dtrigger" id="trig-note-revtudo" aria-expanded="false" aria-controls="panel-note-revtudo">
                <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
                <span class="dhint">o que "voltar todos ao valor de fábrica" afeta</span>
              </button>
              <div id="panel-note-revtudo" class="dbody dbody--col" hidden>
                <div class="prose">Afeta só os materiais de partida. Material criado pelo operador não tem valor de fábrica e não é tocado.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- BLOCO 2: FERRAMENTAS (ESCOPO_CONFIGURACOES §4) -->
        <div class="card">
          <button type="button" class="bhead" id="bhead-cfg-tools" aria-expanded="false" aria-controls="panel-cfg-tools">
            <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
            <div class="lbl" style="flex-grow:1">Ferramentas</div>
            <span class="bsum">${state.ferramentas.length} cadastrada${state.ferramentas.length === 1 ? '' : 's'}</span>
          </button>
          <div id="panel-cfg-tools" hidden style="display:flex;flex-direction:column;gap:12px">
            <hr class="sep">

            <div class="drawer">
              <button type="button" class="dtrigger" id="trig-note-tool" aria-expanded="false" aria-controls="panel-note-tool">
                <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
                <span class="dhint">cadastro e organização · relação com o cálculo</span>
              </button>
              <div id="panel-note-tool" class="dbody dbody--col" hidden>
                <div class="prose">Esta área é responsável por <strong>cadastrar e organizar as ferramentas da sua oficina</strong> dentro das categorias canônicas. A geometria é determinada automaticamente pelo tipo e modelo escolhidos.</div>
                <div class="prose" style="color:var(--tx-3)">Parâmetros numéricos variáveis (como diâmetro, raio de canto, arestas, balanço e profundidade) pertencem ao contexto do cálculo e são preenchidos na tela de corte.</div>
              </div>
            </div>

            <div class="aviso-fornecedor">${AVISO_FORNECEDOR}</div>

            <!-- Adicionar ferramenta -->
            <div class="drawer">
              <button type="button" class="dtrigger" id="trig-add-tool" aria-expanded="false" aria-controls="panel-add-tool">
                <span class="plus-sign" aria-hidden="true">+</span>
                <span class="lbl" style="flex:none">Adicionar ferramenta</span>
                <span class="dhint">escolha o tipo e modelo · a geometria vincula automaticamente</span>
              </button>
              <div id="panel-add-tool" class="form-panel" hidden>
                ${formNovaFerramentaHtml()}
              </div>
            </div>

            <div style="margin-top:6px">
              ${tiposFerramentasHtml}
            </div>
          </div>
        </div>

        <!-- BLOCO 3: MARGEM DE SEGURANÇA (ESCOPO_CONFIGURACOES §10) -->
        <div class="card">
          <div class="bhead">
            <div class="lbl" style="flex-grow:1">Margem de segurança</div>
            <span class="bsum">${state.safetyMargin} %</span>
          </div>
          <hr class="sep">
          <div class="drawer">
            <button type="button" class="dtrigger" id="trig-note-marg-onde" aria-expanded="false" aria-controls="panel-note-marg-onde">
              <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
              <span class="dhint">por que a margem fica aqui e não no cálculo</span>
            </button>
            <div id="panel-note-marg-onde" class="dbody dbody--col" hidden>
              <div class="prose">Configuração persistente — vale para todos os cálculos até você mudar de novo. Não é campo por cálculo.</div>
            </div>
          </div>
          <div style="max-width:460px">
            ${stepConfigHtml('margem')}
          </div>
          <div class="drawer" style="max-width:460px">
            <button type="button" class="dtrigger" id="trig-note-marg" aria-expanded="false" aria-controls="panel-note-marg">
              <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
              <span class="dhint">o que a margem de segurança faz</span>
            </button>
            <div id="panel-note-marg" class="dbody dbody--col" hidden>
              <div class="prose">Em 100 % a tela mostra o resultado exatamente como o cálculo entrega. A 85 %, a tela mostra sempre 85 % do que o cálculo entregou para a rotação (n), a velocidade de avanço da mesa (vf), a velocidade de corte real (vc), a potência de corte (Pc), o torque (Mc) e a taxa de remoção (MRR).</div>
              <div class="prose" style="color:var(--tx-3)">Não muda a espessura de cavaco (hex), a relação balanço/diâmetro (L/D), o afinamento de cavaco (CTF), o alerta nem o nível de segurança — esses seguem o valor real, porque é sobre o valor real que o alerta fala. Também não mexe em nada que você digitou.</div>
              <div class="prose" style="color:var(--tx-3)">Acima de 100 % também é aceito — a tela passa a mostrar mais que o calculado. Nada trava: quem decide é você.</div>
            </div>
          </div>
        </div>

        <!-- BLOCO 4: BROCA DE AÇO RÁPIDO (ESCOPO_BROCA_ACO_RAPIDO §5) -->
        <div class="card">
          <div class="bhead">
            <div class="lbl" style="flex-grow:1">Broca de aço rápido — cálculo de partida</div>
            <span class="bsum">${state.brocaHSS.percentualAvanco} % · ${state.brocaHSS.divisorIncremento} · ${formatDec(state.brocaHSS.tetoIncremento, 1)} mm</span>
          </div>
          <hr class="sep">
          <div class="drawer">
            <button type="button" class="dtrigger" id="trig-note-hss-onde" aria-expanded="false" aria-controls="panel-note-hss-onde">
              <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
              <span class="dhint">por que estes três ficam aqui e não no cálculo</span>
            </button>
            <div id="panel-note-hss-onde" class="dbody dbody--col" hidden>
              <div class="prose">São o jeito da oficina de furar com broca de aço rápido — valem para todos os cálculos até você mudar de novo. Não são campo por furo.</div>
            </div>
          </div>
          <div class="grid-cfg-steps">
            ${stepConfigHtml('hssAvanco')}
            ${stepConfigHtml('hssDivisor')}
            ${stepConfigHtml('hssTeto')}
          </div>
          <div class="drawer">
            <button type="button" class="dtrigger" id="trig-note-hss" aria-expanded="false" aria-controls="panel-note-hss">
              <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5 L11 8 L6 12.5"></path></svg>
              <span class="dhint">o que cada um dos três faz</span>
            </button>
            <div id="panel-note-hss" class="dbody dbody--col" hidden>
              <div class="prose">O percentual do avanço tira a velocidade de avanço da mesa (vf) da rotação: a 10 %, uma rotação de 508 rpm vira 50 mm/min.</div>
              <div class="prose">O divisor do incremento tira o passo do pica-pau do diâmetro: a 25, uma broca de Ø10 sai do furo a cada 0,4 mm. O teto para esse crescimento — a partir de Ø20 o incremento fica em 0,8 mm, por mais grossa que seja a broca.</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Conectar eventos da tela de Configurações
    const btnVoltar = document.getElementById('btn-voltar-calculo');
    if (btnVoltar) {
      btnVoltar.onclick = () => {
        switchTab(state.previousTab || 'fresar');
      };
    }

    pintarStatus();

    setupCollapsible(document.getElementById('trig-cfg-note'), document.getElementById('panel-cfg-note'));
    setupCollapsible(document.getElementById('bhead-cfg-mat'), document.getElementById('panel-cfg-mat'));
    setupCollapsible(document.getElementById('trig-note-mat'), document.getElementById('panel-note-mat'));
    setupCollapsible(document.getElementById('trig-note-revtudo'), document.getElementById('panel-note-revtudo'));
    setupCollapsible(document.getElementById('trig-add-mat'), document.getElementById('panel-add-mat'));

    state.materiais.forEach(m => {
      setupCollapsible(document.getElementById(`trig-mat-${m.id}`), document.getElementById(`panel-mat-${m.id}`));
    });
    setupCollapsible(document.getElementById('bhead-cfg-tools'), document.getElementById('panel-cfg-tools'));
    setupCollapsible(document.getElementById('trig-note-tool'), document.getElementById('panel-note-tool'));
    setupCollapsible(document.getElementById('trig-add-tool'), document.getElementById('panel-add-tool'));
    setupCollapsible(document.getElementById('trig-note-marg-onde'), document.getElementById('panel-note-marg-onde'));
    setupCollapsible(document.getElementById('trig-note-marg'), document.getElementById('panel-note-marg'));
    setupCollapsible(document.getElementById('trig-note-hss-onde'), document.getElementById('panel-note-hss-onde'));
    setupCollapsible(document.getElementById('trig-note-hss'), document.getElementById('panel-note-hss'));

    state.ferramentas.forEach(t => {
      setupCollapsible(document.getElementById(`trig-tool-${t.id}`), document.getElementById(`panel-tool-${t.id}`));
    });

    // Editar as cinco grandezas de qualquer material (§3.1). Aplica ao confirmar o campo.
    document.querySelectorAll('.in-material, .sel-material').forEach(el => {
      el.onchange = () => {
        const mat = state.materiais.find(m => m.id === el.dataset.mat);
        const campo = CAMPOS_MATERIAL.find(c => c.key === el.dataset.campo);
        if (!mat || !campo) return;

        const bruto = el.value.trim();
        // R1: nada é recusado nem ajustado em silêncio — em branco entra como em branco
        mat[campo.key] = campo.tipo === 'select' || campo.tipo === 'texto'
          ? bruto
          : (bruto === '' ? '' : parseBrNum(bruto));

        saveMaterials();
        marcarCalculoDesatualizadoPorMaterial(mat.id);
        flashStatus(`${mat.nome} · ${textoSimples(campo.rotulo)} salvo`);
        rerenderConfig(el.id);
      };
    });

    // Voltar uma grandeza ao valor de fábrica (§3.1)
    document.querySelectorAll('.btn-reverter-campo').forEach(btn => {
      btn.onclick = () => {
        const mat = state.materiais.find(m => m.id === btn.dataset.mat);
        const fab = materialDeFabrica(btn.dataset.mat);
        const campo = CAMPOS_MATERIAL.find(c => c.key === btn.dataset.campo);
        if (!mat || !fab || !campo) return;
        mat[campo.key] = fab[campo.key];
        saveMaterials();
        marcarCalculoDesatualizadoPorMaterial(mat.id);
        flashStatus(`${mat.nome} · ${textoSimples(campo.rotulo)} de volta ao valor de fábrica`);
        rerenderConfig(`mat-${mat.id}-${campo.key}`);
      };
    });

    // Voltar tudo — afeta só os materiais de partida (§3.6)
    const btnRevTodosMat = document.getElementById('btn-reverter-todos-mat');
    if (btnRevTodosMat) {
      btnRevTodosMat.onclick = () => {
        state.materiais = state.materiais.map(m => {
          const fab = materialDeFabrica(m.id);
          return fab ? { ...fab } : m;
        });
        saveMaterials();
        markOutdated();
        flashStatus('Materiais de partida de volta ao valor de fábrica');
        rerenderConfig('btn-reverter-todos-mat');
      };
    }

    // Criar material (§3.1)
    const btnSaveMat = document.getElementById('btn-salvar-material');
    if (btnSaveMat) {
      btnSaveMat.onclick = () => {
        const campoNome = document.getElementById('new-mat-nome');
        const nome = campoNome.value.trim();
        if (!nome) {
          campoNome.closest('.fbox').classList.add('error');
          const field = campoNome.closest('.field');
          if (field && !field.querySelector('.erro-campo')) {
            field.insertAdjacentHTML('beforeend', '<div class="erro-campo">Informe o nome para reconhecer este material na lista.</div>');
          }
          campoNome.focus();
          flashStatus('O material precisa de um nome', 'erro');
          return;
        }

        // As cinco grandezas entram como digitadas; em branco fica em branco (R1, §3.5)
        const num = (id) => {
          const bruto = document.getElementById(id).value.trim();
          return bruto === '' ? '' : parseBrNum(bruto);
        };

        state.materiais.unshift({
          id: 'mat_custom_' + Date.now(),
          nome,
          classeISO: document.getElementById('new-mat-iso').value,
          dureza: document.getElementById('new-mat-dureza').value.trim(),
          kc11: num('new-mat-kc'),
          mc: num('new-mat-mc'),
          vcPartida: num('new-mat-vc')
        });
        saveMaterials();
        state.panelState['panel-add-mat'] = false;
        flashStatus(`Material “${nome}” criado`);
        rerenderConfig('trig-add-mat');
      };
    }

    const btnCancelMat = document.getElementById('btn-cancelar-material');
    if (btnCancelMat) {
      btnCancelMat.onclick = () => {
        state.panelState['panel-add-mat'] = false;
        rerenderConfig('trig-add-mat');
      };
    }

    // Editar atributo de ferramenta cadastrada (§4.1). Aplica ao confirmar o campo.
    document.querySelectorAll('.in-ferramenta, .in-ferramenta-sel').forEach(el => {
      el.onchange = () => {
        const tool = state.ferramentas.find(t => t.id === el.dataset.tool);
        if (!tool) return;
        const campo = el.dataset.campo;
        const bruto = el.value.trim();
        tool[campo] = bruto;
        saveTools();
        const rotulo = campo === 'apelido' ? 'apelido' : (campo === 'substrato' ? 'substrato' : 'descrição');
        flashStatus(`${tool.apelido} · ${rotulo} salvo`);
        renderHeaderZ1();
        rerenderConfig(el.id);
      };
    });

    // Formulário de nova ferramenta: trocar o tipo, modelo ou substrato
    const selNovaTipo = document.getElementById('sel-nova-tipo');
    if (selNovaTipo) {
      selNovaTipo.onchange = () => {
        lerFormNovaFerramenta();
        state.novaFerramenta = novaFerramentaPadrao(selNovaTipo.value, null, null, state.novaFerramenta.apelido, state.novaFerramenta.descricao);
        rerenderConfig('sel-nova-tipo');
      };
    }

    const selNovaMod = document.getElementById('sel-nova-modelo');
    if (selNovaMod) {
      selNovaMod.onchange = () => {
        lerFormNovaFerramenta();
        state.novaFerramenta = novaFerramentaPadrao(state.novaFerramenta.tipoId, selNovaMod.value, null, state.novaFerramenta.apelido, state.novaFerramenta.descricao);
        rerenderConfig('sel-nova-modelo');
      };
    }

    const selNovaSub = document.getElementById('sel-nova-substrato');
    if (selNovaSub) {
      selNovaSub.onchange = () => {
        lerFormNovaFerramenta();
        state.novaFerramenta.substrato = selNovaSub.value;
        rerenderConfig('sel-nova-substrato');
      };
    }

    // Adicionar ferramenta (§4.1)
    const btnCriarFer = document.getElementById('btn-criar-ferramenta');
    if (btnCriarFer) {
      btnCriarFer.onclick = () => {
        lerFormNovaFerramenta();
        const nova = state.novaFerramenta;
        if (!nova.apelido) {
          nova.erroApelido = true;
          flashStatus('A ferramenta precisa de um apelido', 'erro');
          rerenderConfig('nova-fer-apelido');
          return;
        }
        const tipo = tipoPorId(nova.tipoId);
        const modelo = modeloPorId(nova.modeloId) || tipo.modelos[0];
        const geo = geometriaPorId(nova.geometriaId) || geometriaPorId(modelo.geometriaId);

        const novaCriada = {
          id: 'fer_custom_' + Date.now(),
          apelido: nova.apelido,
          tipoId: tipo.id,
          familia: tipo.familia,
          modeloId: modelo.id,
          geometriaId: geo.id,
          geometria: geo.nome,
          substrato: SUBSTRATOS[nova.substrato] || nova.substrato,
          descricao: nova.descricao || ''
        };

        state.ferramentas.unshift(novaCriada);
        saveTools();
        state.novaFerramenta = null;
        state.panelState['panel-add-tool'] = false;
        flashStatus(`Ferramenta “${nova.apelido}” adicionada`);
        rerenderConfig('trig-add-tool');
      };
    }

    const btnCancelFer = document.getElementById('btn-cancelar-ferramenta');
    if (btnCancelFer) {
      btnCancelFer.onclick = () => {
        state.novaFerramenta = null;
        state.panelState['panel-add-tool'] = false;
        rerenderConfig('trig-add-tool');
      };
    }

    // Ação destrutiva em dois toques, dentro do próprio cartão (§3.6, §4.7)
    document.querySelectorAll('.btn-pedir-apagar').forEach(btn => {
      btn.onclick = () => {
        state.confirmando = { tipo: btn.dataset.tipo, id: btn.dataset.id };
        rerenderConfig(`confirmar-${btn.dataset.tipo}-${btn.dataset.id}`);
      };
    });

    document.querySelectorAll('.btn-cancelar-apagar').forEach(btn => {
      btn.onclick = () => {
        state.confirmando = null;
        rerenderConfig();
      };
    });

    document.querySelectorAll('.btn-confirmar-apagar').forEach(btn => {
      btn.onclick = () => {
        const { tipo, id } = btn.dataset;
        if (tipo === 'material') {
          const alvo = state.materiais.find(m => m.id === id);
          state.materiais = state.materiais.filter(m => m.id !== id);
          saveMaterials();
          flashStatus(`Material “${alvo ? alvo.nome : ''}” apagado`);
        } else {
          const alvo = state.ferramentas.find(t => t.id === id);
          state.ferramentas = state.ferramentas.filter(t => t.id !== id);
          saveTools();
          flashStatus(`Ferramenta “${alvo ? alvo.apelido : ''}” apagada`);
        }
        state.confirmando = null;
        rerenderConfig();
      };
    });


    // Margem de segurança e padrões da broca de aço rápido: mesmo passo ±, mesmo contrato de volta
    document.querySelectorAll('.btn-cfg-step').forEach(btn => {
      btn.onclick = () => {
        if (btn.disabled) return;
        const alvo = btn.dataset.alvo;
        const cfg = CFG_STEPS[alvo];
        const dir = parseInt(btn.dataset.dir);
        const novo = Number((cfg.get() + dir * cfg.passo).toFixed(2));
        if (novo < cfg.piso) return;
        cfg.set(novo);
        saveConfig();
        aplicarConfigNoPainel();
        flashStatus(`${textoSimples(cfg.rotulo)} em ${textoCfg(cfg, novo)}${cfg.unidade ? ' ' + cfg.unidade : ''}`);
        rerenderConfig(btn.id);
      };
    });

    document.querySelectorAll('.btn-cfg-reset').forEach(btn => {
      btn.onclick = () => {
        const cfg = CFG_STEPS[btn.dataset.alvo];
        cfg.set(cfg.padrao);
        saveConfig();
        aplicarConfigNoPainel();
        flashStatus(`${textoSimples(cfg.rotulo)} de volta ao padrão`);
        rerenderConfig(`step-${btn.dataset.alvo}-mais`);
      };
    });
  }

  // A margem é reexibição, não recálculo (§10.4): o painel já mostra pela lente nova, sem desatualizar
  function aplicarConfigNoPainel() {
    renderHeaderZ1();
    renderCalculatedResults();
  }

  // Alternância de Abas / Telas
  function switchTab(tabId) {
    const famAnterior = state.activeTab === 'configuracoes' ? state.previousTab : state.activeTab;
    if (state.activeTab !== 'configuracoes') {
      state.previousTab = state.activeTab;
    }
    state.activeTab = tabId;

    // Atualizar visual das abas
    document.querySelectorAll('.nav-tab').forEach(t => {
      const isActive = t.dataset.tab === tabId;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    const calcView = document.getElementById('view-calculo');
    const configView = document.getElementById('view-configuracoes');
    const navBar = document.getElementById('main-nav-bar');
    const z1Header = document.querySelector('.z1-card');

    if (tabId === 'configuracoes') {
      // A área abre limpa: nenhuma confirmação pendente, nenhum rascunho de cadastro
      state.confirmando = null;
      state.novaFerramenta = null;
      if (calcView) calcView.hidden = true;
      if (configView) configView.hidden = false;
      if (navBar) navBar.style.display = 'none';
      if (z1Header) z1Header.style.display = 'none';
      renderSettingsView();
    } else {
      if (calcView) calcView.hidden = false;
      if (configView) configView.hidden = true;
      if (navBar) navBar.style.display = '';
      if (z1Header) z1Header.style.display = '';
      // O ajuste manual é da família: zera ao trocar de família, sobrevive à ida e volta de Configurações
      if (tabId !== famAnterior) {
        state.sOffsetPercent = 0;
        state.fOffsetPercent = 0;
      }
      renderHeaderZ1();
      renderConfigForm();
      renderCalculatedResults();
    }
  }

  // Carregar Cenário Canônico predefinido
  function loadScenario(scenarioKey) {
    state.activeScenarioKey = scenarioKey;
    state.sOffsetPercent = 0;
    state.fOffsetPercent = 0;

    if (scenarioKey === 'vazio') {
      state.isCalculated = false;
      state.isOutdated = false;
      state.manualmenteAjustado = {
        fresar: {},
        furar: {},
        roscar: {},
        mandrilar: {}
      };
      state.inputs.fresar = {
        materialId: '', ferramentaId: '', ferramentaTipo: '', geometriaId: '', geometria: '',
        d: '', r: '', l: '', z: '', ap: '', ae: '', lc: '', vc: '', fz: ''
      };
      state.inputs.furar = {
        materialId: '', ferramentaId: '', ferramentaTipo: '', geometriaId: '', geometria: '',
        d: '', anguloPonta: '', l: '', vc: '', fn: ''
      };
      state.inputs.roscar = {
        materialId: '', ferramentaId: '', ferramentaTipo: '', geometriaId: '', geometria: '',
        roscaDesignacao: '', l: '', vc: ''
      };
      state.inputs.mandrilar = {
        materialId: '', ferramentaId: '', ferramentaTipo: '', geometriaId: '', geometria: '',
        dInicial: '', dFinal: '', rEpsilon: '', l: '', vc: '', fn: ''
      };
      switchTab('fresar');
      return;
    }

    if (scenarioKey === 'erro_digitacao') {
      state.activeTab = 'fresar';
      state.inputs.fresar.l = 3000;
      state.isCalculated = true;
      state.isOutdated = false;
      switchTab('fresar');
      return;
    }

    const sc = FENIX_MOCK_DATA.cenarios[scenarioKey];
    if (!sc) return;

    state.isCalculated = true;
    state.isOutdated = false;

    if (sc.familia === 'fresar') {
      state.inputs.fresar = {
        materialId: sc.materialId || '1045',
        ferramentaId: sc.ferramentaId || 'fer-toroidal-10',
        ferramentaTipo: 'Metal duro (MD)',
        geometriaId: 'toroidal',
        geometria: sc.geometria || 'Toroidal',
        d: sc.d || 10,
        r: sc.r || 1.0,
        l: sc.l || 45,
        z: sc.z || 4,
        ap: sc.ap || 2.0,
        ae: sc.ae || 2.5,
        lc: sc.lc || '',
        vc: sc.vc || 140,
        fz: sc.fz || 0.060
      };
      switchTab('fresar');
    } else if (sc.familia === 'furar') {
      state.inputs.furar = {
        materialId: sc.materialId || '1045',
        ferramentaId: sc.ferramentaId || 'fer-broca-85',
        ferramentaTipo: sc.substrato || 'Aço rápido ao cobalto (HSS-Co)',
        geometriaId: 'helicoidal',
        geometria: sc.geometria || 'Broca Helicoidal',
        d: sc.d || 10,
        anguloPonta: sc.anguloPonta || 140,
        l: sc.l || 50,
        vc: sc.vc || 16,
        fn: sc.fn || 0.10
      };
      switchTab('furar');
    } else if (sc.familia === 'roscar') {
      state.inputs.roscar = {
        materialId: sc.materialId || '1045',
        ferramentaId: sc.ferramentaId || 'fer-macho-m8',
        ferramentaTipo: 'Metal duro (MD)',
        geometriaId: 'macho-corte',
        geometria: 'Macho de Corte',
        roscaDesignacao: 'M8 × 1,25',
        l: sc.l || 30,
        vc: sc.vc || 140
      };
      switchTab('roscar');
    } else if (sc.familia === 'mandrilar') {
      state.inputs.mandrilar = {
        materialId: sc.materialId || '1045',
        ferramentaId: sc.ferramentaId || 'fer-mandrilar-20',
        ferramentaTipo: 'Metal duro (MD)',
        geometriaId: 'barra',
        geometria: 'Cabeçote de Barra Única',
        dInicial: sc.dInicial || 18,
        dFinal: sc.dFinal || 20,
        rEpsilon: sc.rEpsilon || 0.4,
        l: sc.l || 60,
        vc: sc.vc || 140,
        fn: sc.fn || 0.08
      };
      switchTab('mandrilar');
    }
  }

  // Inicialização Geral
  function init() {
    loadPersistedData();

    // Eventos da barra de navegação superior
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        switchTab(tab.dataset.tab);
      });
    });

    const btnIrConfig = document.getElementById('btn-nav-configuracoes');
    if (btnIrConfig) {
      btnIrConfig.addEventListener('click', () => {
        switchTab('configuracoes');
      });
    }

    // Seletor de Cenários Canônicos (Barra de Demonstração / Homologação)
    const selCenario = document.getElementById('demo-scenario-select');
    if (selCenario) {
      selCenario.addEventListener('change', () => {
        loadScenario(selCenario.value);
      });
    }

    // Seletor de Viewport / Modo de Tela (Desktop, Tablet, Celular)
    const vpWrapper = document.getElementById('viewport-container');
    document.querySelectorAll('.demo-vbtn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.demo-vbtn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (vpWrapper) {
          vpWrapper.classList.remove('viewport-tablet', 'viewport-mobile');
          if (btn.dataset.vp === 'tablet') vpWrapper.classList.add('viewport-tablet');
          if (btn.dataset.vp === 'mobile') vpWrapper.classList.add('viewport-mobile');
        }
      });
    });

    // Iniciar na aba padrão no estado zerado canônico (Cenário A: Painel Vazio)
    switchTab('fresar');
    loadScenario('vazio');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
