/**
 * ============================================================================
 * MOCK DATA / DADOS SIMULADOS — FENIX PROTÓTIPO CANÔNICO (FASE 1)
 * ============================================================================
 * Centralização explícita de todos os dados simulados, catálogos e cenários
 * canônicos da Specification Sheet e Gabarito v1.6.
 */

const FENIX_MOCK_DATA = {
  // Lista padrão de 12 materiais industriais de partida
  materiaisPadrao: [
    { id: '1045', nome: 'Aço 1045', classeISO: 'P', dureza: '170–220 HB', kc11: 1500, mc: 0.21, vcPartida: 140 },
    { id: '4140', nome: 'Aço 4140', classeISO: 'P', dureza: '280–320 HB', kc11: 1750, mc: 0.24, vcPartida: 120 },
    { id: '8620', nome: 'Aço 8620', classeISO: 'P', dureza: '180–220 HB', kc11: 1550, mc: 0.22, vcPartida: 135 },
    { id: 'd2', nome: 'Aço Ferramenta D2', classeISO: 'H', dureza: '55–60 HRC', kc11: 2800, mc: 0.28, vcPartida: 50 },
    { id: '304', nome: 'Inox 304', classeISO: 'M', dureza: '160–200 HB', kc11: 2100, mc: 0.25, vcPartida: 90 },
    { id: '316l', nome: 'Inox 316L', classeISO: 'M', dureza: '150–190 HB', kc11: 2200, mc: 0.26, vcPartida: 85 },
    { id: 'gg25', nome: 'Ferro Fundido Cinzento GG25', classeISO: 'K', dureza: '180–230 HB', kc11: 1100, mc: 0.20, vcPartida: 160 },
    { id: 'ggg40', nome: 'Ferro Fundido Nodular GGG40', classeISO: 'K', dureza: '140–190 HB', kc11: 1250, mc: 0.21, vcPartida: 150 },
    { id: '6061', nome: 'Alumínio 6061-T6', classeISO: 'N', dureza: '95 HB', kc11: 700, mc: 0.15, vcPartida: 350 },
    { id: '7075', nome: 'Alumínio 7075-T6', classeISO: 'N', dureza: '150 HB', kc11: 850, mc: 0.17, vcPartida: 300 },
    { id: 'ti6al4v', nome: 'Titânio Grau 5 (Ti-6Al-4V)', classeISO: 'S', dureza: '310–360 HB', kc11: 2400, mc: 0.23, vcPartida: 45 },
    { id: 'inconel718', nome: 'Inconel 718', classeISO: 'S', dureza: '340–400 HB', kc11: 2900, mc: 0.26, vcPartida: 30 }
  ],

  /**
   * As 17 geometrias que o sistema conhece, com o que cada uma pede.
   * Transcrito de construcao/MAPEAMENTO_CAMPOS_FERRAMENTAS.md §2 — nada inventado aqui.
   * `campos` = atributos que a geometria tem. Atributo que ela não tem não aparece na tela
   * (ESCOPO_CONFIGURACOES §4.2) — nunca desabilitado.
   * `faixaD` = valor de partida da faixa de diâmetro, por substrato (decisão do Mestre, 03/09/2026).
   *  É orientação editável, não limite.
   */
  /**
   * Tipos / Famílias de ferramentas canônicos (MVP §1.1 / E1 §2).
   * O usuário NÃO cria novas famílias/tipos. Cada tipo reúne os modelos de ferramentas previstos.
   */
  tiposFerramenta: [
    {
      id: 'fresar',
      nome: 'Fresas',
      descricao: 'Fresas de corte rotativo periférico e frontal (avanço por dente fz).',
      modelos: [
        { id: 'fresa-topo-reto', nome: 'Fresa de Topo Reto', geometriaId: 'topo-reto', substratos: ['MD', 'HSS-Co'] },
        { id: 'fresa-toroidal', nome: 'Fresa Toroidal', geometriaId: 'toroidal', substratos: ['MD'] },
        { id: 'fresa-esferica', nome: 'Fresa Esférica', geometriaId: 'esferica', substratos: ['MD', 'HSS-Co'] },
        { id: 'fresa-chanfrar', nome: 'Fresa de Chanfrar', geometriaId: 'chanfrar', substratos: ['MD', 'HSS-Co'] },
        { id: 'fresa-alto-avanco', nome: 'Fresa de Alto Avanço', geometriaId: 'alto-avanco', substratos: ['MD'] },
        { id: 'cabecote-faceador', nome: 'Cabeçote Faceador', geometriaId: 'faceador', substratos: ['MD'] },
        { id: 'fresa-topo-pastilhas', nome: 'Fresa de Topo com Pastilhas', geometriaId: 'topo-pastilhas', substratos: ['MD'] },
        { id: 'fresa-disco', nome: 'Fresa de Disco / Serra', geometriaId: 'disco', substratos: ['MD', 'HSS-Co'] }
      ]
    },
    {
      id: 'furar',
      nome: 'Brocas e Furação',
      descricao: 'Ferramentas de penetração axial de furo pleno (avanço por rotação fn).',
      modelos: [
        { id: 'broca-helicoidal', nome: 'Broca Helicoidal', geometriaId: 'helicoidal', substratos: ['MD', 'HSS-Co'] },
        { id: 'broca-u-drill', nome: 'Broca de Insertos (U-Drill)', geometriaId: 'u-drill', substratos: ['MD'] },
        { id: 'broca-centro', nome: 'Broca de Centro / Spot', geometriaId: 'centro', substratos: ['MD', 'HSS-Co'] },
        { id: 'escareador', nome: 'Escareador / Rebaixador', geometriaId: 'escareador', substratos: ['MD', 'HSS-Co'] },
        { id: 'alargador', nome: 'Alargador', geometriaId: 'alargador', substratos: ['MD', 'HSS-Co'] }
      ]
    },
    {
      id: 'roscar',
      nome: 'Machos e Fresas de Rosca',
      descricao: 'Usinagem de roscas internas e externas (cinemática travada no passo ou interpolação).',
      modelos: [
        { id: 'macho-corte', nome: 'Macho de Corte', geometriaId: 'macho-corte', substratos: ['MD', 'HSS-Co'] },
        { id: 'macho-conformacao', nome: 'Macho de Conformação', geometriaId: 'macho-conformacao', substratos: ['MD', 'HSS-Co'] },
        { id: 'fresa-rosca', nome: 'Fresa de Rosca', geometriaId: 'fresa-rosca', substratos: ['MD'] }
      ]
    },
    {
      id: 'mandrilar',
      nome: 'Cabeçotes e Barras de Mandrilar',
      descricao: 'Calibração dimensional de alta precisão e acabamento fino de furos cilíndricos.',
      modelos: [
        { id: 'barra-mandrilar', nome: 'Cabeçote de Barra Única', geometriaId: 'barra', substratos: ['MD'] }
      ]
    }
  ],

  /**
   * As 17 geometrias canônicas que o sistema conhece.
   * A Geometria define a ESTRUTURA (quais variáveis de cálculo aquela ferramenta possui).
   * Ela é vinculada automaticamente pelo sistema ao modelo da ferramenta.
   * O usuário NÃO altera a geometria nem informa valores de cálculo no cadastro.
   */
  geometrias: [
    // FRESAR (8)
    {
      id: 'topo-reto',
      nome: 'Topo Reto',
      familia: 'fresar',
      substratos: ['MD', 'HSS-Co'],
      zPadrao: 4,
      apPartida: 3,
      aePartida: 5,
      lPartida: 30,
      campos: ['d', 'z', 'lc'],
      descricaoVariaveis: 'Diâmetro (D), Balanço (L), Arestas (Z), Profundidade (ap), Comprimento de aresta (Lc opcional)'
    },
    {
      id: 'toroidal',
      nome: 'Toroidal',
      familia: 'fresar',
      substratos: ['MD'],
      zPadrao: 4,
      apPartida: 1,
      aePartida: 3,
      lPartida: 30,
      campos: ['d', 'z', 'r', 'lc'],
      descricaoVariaveis: 'Diâmetro (D), Raio de canto (r), Balanço (L), Arestas (Z), Profundidade (ap), Comprimento (Lc opcional)'
    },
    {
      id: 'esferica',
      nome: 'Esférica',
      familia: 'fresar',
      substratos: ['MD', 'HSS-Co'],
      zPadrao: 2,
      apPartida: 2,
      aePartida: 3,
      lPartida: 25,
      campos: ['d', 'z', 'lc'],
      descricaoVariaveis: 'Diâmetro (D), Balanço (L), Arestas (Z), Profundidade (ap) — raio derivado r = D/2'
    },
    {
      id: 'chanfrar',
      nome: 'Chanfrar',
      familia: 'fresar',
      substratos: ['MD', 'HSS-Co'],
      zPadrao: 4,
      apPartida: 1,
      aePartida: 1.0,
      lPartida: 30,
      campos: ['d', 'z', 'dMin', 'lc'],
      descricaoVariaveis: 'Diâmetro maior (D), Diâmetro menor (Dmin), Balanço (L), Arestas (Z), Profundidade (ap)'
    },
    {
      id: 'alto-avanco',
      nome: 'Alto Avanço',
      familia: 'fresar',
      substratos: ['MD'],
      zPadrao: 3,
      apPartida: 1,
      aePartida: 8,
      lPartida: 30,
      campos: ['d', 'z', 'kappa', 'lc'],
      padroes: { kappa: 15 },
      descricaoVariaveis: 'Diâmetro (D), Ângulo de posição (κ), Balanço (L), Arestas (Z), Profundidade (ap)'
    },
    {
      id: 'faceador',
      nome: 'Cabeçote Faceador',
      familia: 'fresar',
      substratos: ['MD'],
      zPadrao: 5,
      apPartida: 1,
      aePartida: '0.7*D',
      lPartida: 40,
      campos: ['d', 'z', 'kappa', 'lc'],
      padroes: { kappa: 45 },
      descricaoVariaveis: 'Diâmetro (D), Ângulo de posição (κ), Balanço (L), Arestas (Z), Profundidade (ap)'
    },
    {
      id: 'topo-pastilhas',
      nome: 'Topo com Pastilhas',
      familia: 'fresar',
      substratos: ['MD'],
      zPadrao: 2,
      apPartida: 3,
      aePartida: 5,
      lPartida: 30,
      campos: ['d', 'z', 'lc'],
      descricaoVariaveis: 'Diâmetro (D), Balanço (L), Arestas / Insertos efetivos (Z), Profundidade (ap)'
    },
    {
      id: 'disco',
      nome: 'Disco / Serra',
      familia: 'fresar',
      substratos: ['MD', 'HSS-Co'],
      zPadrao: 8,
      apPartida: 5,
      aePartida: 3,
      lPartida: null,
      campos: ['d', 'z', 'lc'],
      descricaoVariaveis: 'Diâmetro (D), Balanço (L), Arestas (Z), Largura (b = ap), Penetração radial (ae)'
    },

    // FURAR (5)
    {
      id: 'helicoidal',
      nome: 'Broca Helicoidal',
      familia: 'furar',
      substratos: ['MD', 'HSS-Co'],
      apPartida: null,
      aePartida: null,
      lPartida: 50,
      campos: ['d', 'anguloPonta'],
      padroes: { anguloPonta: 140 },
      padroesPorSubstrato: { 'HSS-Co': { anguloPonta: 135 } },
      descricaoVariaveis: 'Diâmetro (D), Ângulo de ponta (118°/135° HSS ou 140° MD), Balanço (L)'
    },
    {
      id: 'u-drill',
      nome: 'Broca de Insertos (U-Drill)',
      familia: 'furar',
      substratos: ['MD'],
      apPartida: null,
      aePartida: null,
      lPartida: 50,
      campos: ['d', 'fn'],
      descricaoVariaveis: 'Diâmetro (D), Balanço (L), Avanço por rotação (fn editável)'
    },
    {
      id: 'centro',
      nome: 'Broca de Centro / Spot',
      familia: 'furar',
      substratos: ['MD', 'HSS-Co'],
      apPartida: null,
      aePartida: null,
      lPartida: null,
      campos: ['d', 'anguloPonta'],
      padroes: { anguloPonta: 120 },
      descricaoVariaveis: 'Diâmetro (D), Ângulo de ponta (90° ou 120°), Balanço (L)'
    },
    {
      id: 'escareador',
      nome: 'Escareador',
      familia: 'furar',
      substratos: ['MD', 'HSS-Co'],
      apPartida: null,
      aePartida: null,
      lPartida: null,
      campos: ['d'],
      descricaoVariaveis: 'Diâmetro maior (D), Balanço (L)'
    },
    {
      id: 'alargador',
      nome: 'Alargador',
      familia: 'furar',
      substratos: ['MD', 'HSS-Co'],
      apPartida: null,
      aePartida: null,
      lPartida: 40,
      campos: ['d'],
      descricaoVariaveis: 'Diâmetro calibrado (D), Balanço (L)'
    },

    // ROSCAR (3)
    {
      id: 'macho-corte',
      nome: 'Macho de Corte',
      familia: 'roscar',
      substratos: ['MD', 'HSS-Co'],
      apPartida: null,
      aePartida: null,
      lPartida: null,
      campos: ['designacao', 'd', 'passo'],
      descricaoVariaveis: 'Designação da rosca (M...), Passo (P), Balanço (L)'
    },
    {
      id: 'macho-conformacao',
      nome: 'Macho de Conformação',
      familia: 'roscar',
      substratos: ['MD', 'HSS-Co'],
      apPartida: null,
      aePartida: null,
      lPartida: null,
      campos: ['designacao', 'd', 'passo'],
      descricaoVariaveis: 'Designação da rosca (M...), Passo (P), Balanço (L)'
    },
    {
      id: 'fresa-rosca',
      nome: 'Fresa de Rosca',
      familia: 'roscar',
      substratos: ['MD'],
      zPadrao: 3,
      apPartida: null,
      aePartida: null,
      lPartida: null,
      campos: ['designacao', 'd', 'passo', 'z'],
      descricaoVariaveis: 'Designação, Diâmetro da fresa (D), Passo (P), Arestas (Z), Balanço (L)'
    },

    // MANDRILAR (1)
    {
      id: 'barra',
      nome: 'Cabeçote de Barra Única',
      familia: 'mandrilar',
      substratos: ['MD'],
      zPadrao: 1,
      apPartida: null,
      aePartida: null,
      lPartida: null,
      campos: ['dInicial', 'dFinal', 'rEpsilon', 'fn'],
      descricaoVariaveis: 'Diâmetro inicial (Di), Diâmetro final (Df), Raio de ponta (rε), Balanço (L), Avanço por rotação (fn)'
    }
  ],

  // Fatores de velocidade por substrato (MVP §3.5)
  // Multiplica a velocidade de corte (vc) de partida do material.
  // MD: 1,00 (referência) · HSS-Co: 0,22–0,25 (faixa publicada, adotado o piso 0,22)
  // O ponto dentro da faixa é decisão de projeto, e o piso é o único que a evidência sustenta aqui:
  // o próprio MVP §3.5 registra que o único par medido em FRESA aponta 0,12–0,23, e este fator só
  // atua em fresamento — furação e roscamento com aço rápido têm partida própria (CANONICO_FURACAO
  // §2.1 e §2.2). 0,25 fica fora do intervalo medido em fresa; 0,22 cai dentro dele.
  fatoresSubstrato: {
    'MD': 1.00,
    'HSS-Co': 0.22
  },

  // Curva de avanço por dente (fz) de partida por diâmetro (MVP §11.3)
  // Transcrição direta de MVP §11.3, linhas 1696–1710
  curvaFzPorDiametro: [
    { d: 0.2, fz: 0.003 },
    { d: 0.5, fz: 0.006 },
    { d: 1.0, fz: 0.012 },
    { d: 2.0, fz: 0.030 },
    { d: 3.0, fz: 0.050 },
    { d: 4.0, fz: 0.070 },
    { d: 6.0, fz: 0.100 },
    { d: 8.0, fz: 0.120 },
    { d: 10.0, fz: 0.140 },
    { d: 12.0, fz: 0.160 },
    { d: 14.0, fz: 0.180 },
    { d: 16.0, fz: 0.200 }
  ],

  // Biblioteca de ferramentas cadastradas na oficina (ESCOPO_CONFIGURACOES §4)
  // CADASTRO E ORGANIZAÇÃO PURA: Não contém valores variáveis de cálculo (D, Z, r, L, ap, etc.)
  ferramentasPadrao: [
    {
      id: 'fer-toroidal-10',
      apelido: 'Fresa Toroidal de Acabamento',
      tipoId: 'fresar',
      familia: 'fresar',
      modeloId: 'fresa-toroidal',
      geometriaId: 'toroidal',
      geometria: 'Toroidal',
      substrato: 'Metal duro (MD)',
      descricao: 'Fresa para perfilamento e matrizaria de precisão'
    },
    {
      id: 'fer-topo-reto',
      apelido: 'Fresa Topo Reto 4 Cortes',
      tipoId: 'fresar',
      familia: 'fresar',
      modeloId: 'fresa-topo-reto',
      geometriaId: 'topo-reto',
      geometria: 'Topo Reto',
      substrato: 'Metal duro (MD)',
      descricao: 'Desbaste e esquadrejamento de rasgos'
    },
    {
      id: 'fer-broca-85',
      apelido: 'Broca Pré-Furo M10 (HSS-Co)',
      tipoId: 'furar',
      familia: 'furar',
      modeloId: 'broca-helicoidal',
      geometriaId: 'helicoidal',
      geometria: 'Broca Helicoidal',
      substrato: 'Aço rápido ao cobalto (HSS-Co)',
      descricao: 'Broca helicoidal padrão de oficina com afiação 135°'
    },
    {
      id: 'fer-faceador-63',
      apelido: 'Cabeçote Faceador Industrial',
      tipoId: 'fresar',
      familia: 'fresar',
      modeloId: 'cabecote-faceador',
      geometriaId: 'faceador',
      geometria: 'Cabeçote Faceador',
      substrato: 'Metal duro (MD)',
      descricao: 'Faceamento pesado de blocos com pastilhas 45°'
    },
    {
      id: 'fer-macho-m8',
      apelido: 'Macho de Corte para Máquina',
      tipoId: 'roscar',
      familia: 'roscar',
      modeloId: 'macho-corte',
      geometriaId: 'macho-corte',
      geometria: 'Macho de Corte',
      substrato: 'Metal duro (MD)',
      descricao: 'Macho canal helicoidal para roscas métricas'
    },
    {
      id: 'fer-mandrilar-20',
      apelido: 'Barra de Mandrilar Acabamento',
      tipoId: 'mandrilar',
      familia: 'mandrilar',
      modeloId: 'barra-mandrilar',
      geometriaId: 'barra',
      geometria: 'Cabeçote de Barra Única',
      substrato: 'Metal duro (MD)',
      descricao: 'Mandrilamento fino de tolerância H7'
    }
  ],

  // Roscas métricas padronizadas para a família Roscar
  tabelaRoscas: [
    { designacao: 'M3 × 0,5', d: 3.0, passo: 0.50, brocaPrevia: 2.5 },
    { designacao: 'M4 × 0,7', d: 4.0, passo: 0.70, brocaPrevia: 3.3 },
    { designacao: 'M5 × 0,8', d: 5.0, passo: 0.80, brocaPrevia: 4.2 },
    { designacao: 'M6 × 1,0', d: 6.0, passo: 1.00, brocaPrevia: 5.0 },
    { designacao: 'M8 × 1,25', d: 8.0, passo: 1.25, brocaPrevia: 6.8 },
    { designacao: 'M10 × 1,5', d: 10.0, passo: 1.50, brocaPrevia: 8.5 },
    { designacao: 'M12 × 1,75', d: 12.0, passo: 1.75, brocaPrevia: 10.2 },
    { designacao: 'M16 × 2,0', d: 16.0, passo: 2.00, brocaPrevia: 14.0 }
  ],

  // Configurações padrão persistentes
  configuracoesPadrao: {
    margemSeguranca: 100, // 100% = neutra
    brocaHSS: {
      percentualAvanco: 10,  // vf = 10% de n
      divisorIncremento: 25, // Q = D / 25
      tetoIncremento: 0.8    // máx 0,8 mm
    }
  },

  // Conteúdos das gavetas explicativas de parâmetros (D11 / WAI-ARIA)
  gavetasInstrucao: {
    vc: {
      titulo: 'Velocidade de corte (vc)',
      oQueE: 'Velocidade do gume passando pelo material · manda no calor do corte.',
      aumentar: 'Esquenta mais · gume gasta mais rápido · menos vida útil da ferramenta.',
      diminuir: 'Gume dura mais · risco de aresta postiça (material gruda no gume) · acabamento superficial pior.',
      equilibrio: 'Cada material tem seu valor de partida canônico — o painel avisa se você se afastar da faixa.'
    },
    fz: {
      titulo: 'Avanço por dente (fz)',
      oQueE: 'Espessura do cavaco que cada aresta retira a cada rotação.',
      aumentar: 'Remove material mais rápido · eleva o esforço e potência de corte · tende a vibrar e pode quebrar a pastilha.',
      diminuir: 'Acabamento mais fino · menor esforço na haste · ciclo demora mais.',
      equilibrio: 'Avanço fino demais faz a aresta esfregar em vez de cortar (queima prematura do gume).'
    },
    ae: {
      titulo: 'Penetração de trabalho (ae)',
      oQueE: 'Largura do corte na lateral da ferramenta · define quanto da periferia corta por passe.',
      aumentar: 'Mais volume de cavaco · maior carga de deflexão · calor concentrado se ultrapassar 50% de D.',
      diminuir: 'Carga lateral menor · afinamento de cavaco · necessita de maior avanço (fz) para manter espessura de corte.',
      equilibrio: 'Pouca penetração é estratégia de alta velocidade (HSM), não defeito · o painel calcula o afinamento (CTF).'
    },
    ap: {
      titulo: 'Profundidade de corte (ap)',
      oQueE: 'Fatia axial de altura que cada passe remove do bloco bruto.',
      aumentar: 'Mais material por passe · esforço axial elevado · deflexão multiplicada no balanço longo.',
      diminuir: 'Menos força na haste · corte suave e silencioso · exige mais passes em Z para atingir a cota.',
      equilibrio: 'Deve respeitar o comprimento de corte útil (Lc) para não esfregar haste sem corte na peça.'
    },
    fn: {
      titulo: 'Avanço por rotação (fn)',
      oQueE: 'Distância axial que a broca penetra a cada volta completa da árvore.',
      deOndeVem: 'Na prática com HSS, o avanço é sincronizado em 10% da rotação, fixando fn em 0,10 mm/rot em qualquer diâmetro.',
      referencia: 'A referência usual de catálogo cresce com o diâmetro da broca, enquanto os 10% mantêm-se constantes.',
      aumentar: 'Fura mais rápido e quebra melhor o cavaco · eleva expressivamente a força de avanço axial.',
      diminuir: 'Menor carga axial na máquina · cavaco sai contínuo e tende a embolar na calha da broca.'
    }
  },

  // Cenários Canônicos predefinidos para testes de homologação (Specification Sheet)
  cenarios: {
    cenario1: {
      nome: 'Cenário 1: Fresamento Nominal Toroidal em Aço 1045',
      familia: 'fresar',
      materialId: '1045',
      ferramentaId: 'fer-toroidal-10',
      geometria: 'Toroidal',
      substrato: 'Metal duro (MD)',
      d: 10,
      r: 1.0,
      z: 4,
      l: 45,
      ap: 2.0,
      ae: 2.5,
      lc: 25,
      vc: 140,
      fz: 0.060,
      calculado: {
        s: 4456,
        f: 1070,
        ld: 4.5,
        hm: 0.018,
        ctf: 0.60,
        pc: 0.42,
        mc: 0.9,
        mrr: 5.35,
        vcReal: 140.0,
        nivelSeguranca: 'ATENÇÃO',
        alertaTitulo: 'Relação balanço/diâmetro (L/D) 4,5, acima do limiar de 4,0 da haste comum (+13%)',
        alertaCorpo: 'A ferramenta flete e tende a vibrar: a deflexão cresce com o cubo dessa relação, e a 4,5 ela é 42% maior que no limiar.',
        oQueVaiAcontecer: [
          'A ferramenta vai vibrar. A relação balanço/diâmetro (L/D) está em 4,5, acima do limiar de 4,0 da haste comum — a deflexão cresce com o cubo dessa relação, e a 4,5 ela é 42% maior que no limiar.',
          'Nada mais fora da faixa: torque (Mc) 0,9 N·m, potência de corte na aresta (Pc) 0,42 kW, taxa de remoção (MRR) 5,35 cm³/min.'
        ],
        oQueMexer: [
          {
            objetivo: 'Para a ferramenta parar de vibrar',
            badge: 'Resolve o alerta',
            instrucao: 'Reduza a penetração de trabalho (ae), hoje 2,5 mm — o teto recomendado para balanço longo é 25% do diâmetro (2,5 mm).',
            explicacao: 'A força radial cai com a seção de cavaco e a deflexão cai com ela, sem mexer no balanço que a peça exige. Não há valor publicado para quanto reduzir: acompanhe no recálculo.',
            contrapartida: 'Em troca: a taxa de remoção cai e a peça leva mais passadas.'
          },
          {
            objetivo: 'Para usinar mais rápido',
            badge: null,
            instrucao: 'Aumente o avanço por dente (fz) para 0,085 mm (hoje 0,060).',
            explicacao: 'A peça fica pronta antes — cerca de 40% mais material removido por minuto.',
            contrapartida: 'Em troca: a máquina puxa mais potência e amplia a tendência de vibração no balanço atual.'
          }
        ]
      }
    },

    cenario2: {
      nome: 'Cenário 2: Furar HSS-Co no Modo do Mestre',
      familia: 'furar',
      materialId: '1045',
      ferramentaId: 'fer-broca-85',
      geometria: 'Broca Helicoidal',
      substrato: 'Aço rápido ao cobalto (HSS-Co)',
      d: 10,
      anguloPonta: 140,
      l: 50,
      vc: 16,
      fn: 0.10,
      calculado: {
        s: 508,
        f: 50,
        q: 0.40,
        fnReal: 0.10,
        ld: 5.0,
        vcReal: 16.0,
        mrr: 3.9,
        nivelSeguranca: 'NORMAL',
        alertaTitulo: 'Nenhuma condição fora da faixa nesta combinação',
        alertaCorpo: 'A velocidade de corte (vc) está em 16 m/min, dentro da janela de 9,6 a 22,4 m/min desta broca neste material.',
        oQueVaiAcontecer: [
          'A furação corre dentro da faixa segura. A velocidade de corte (vc) está em 16 m/min, entre 9,6 e 22,4 m/min — a janela desta broca neste material.',
          'A broca sai do furo a cada 0,4 mm para quebrar e descarregar o cavaco. O incremento vem do diâmetro (Ø10 dividido por 25), com saturação de teto em 0,8 mm.',
          'A relação balanço/diâmetro (L/D) está em 5,0 e não pesa aqui: na furação quem manda é a profundidade do furo contra o diâmetro, não o balanço da haste.',
          'Taxa de remoção de material (MRR) 3,9 cm³/min, velocidade de corte real (vc) 16,0 m/min.'
        ],
        oQueMexer: [
          {
            objetivo: 'Para furar mais rápido',
            badge: null,
            instrucao: 'Aumente a velocidade de corte (vc) para 22 m/min (hoje 16).',
            explicacao: 'A rotação sobe para 699 rpm e o avanço para 69 mm/min (+38% de rendimento).',
            contrapartida: 'Em troca: o gume aquece mais rápido; mantenha refrigeração contínua.'
          }
        ]
      }
    },

    cenario3: {
      nome: 'Cenário 3: Validação de Entrada Sem Bloqueio (ae = 12 > D = 10)',
      familia: 'fresar',
      materialId: '1045',
      geometria: 'Toroidal',
      d: 10,
      r: 1.0,
      z: 4,
      l: 45,
      ap: 2.0,
      ae: 12.0,
      fz: 0.060,
      vc: 140,
      calculado: {
        s: 4456,
        f: 1070,
        ld: 4.5,
        hm: 0.024,
        ctf: 1.0,
        pc: 1.85,
        mc: 4.0,
        mrr: 25.6,
        vcReal: 140.0,
        nivelSeguranca: 'CRÍTICO',
        alertaTitulo: 'Penetração de trabalho (ae) 12,0 mm, maior que o diâmetro da ferramenta (D) 10,0 mm (+2,0 mm)',
        alertaCorpo: 'A fresa corta no máximo a própria largura: o cálculo descreve remoção fisicamente impossível fora da aresta.',
        alertaCondicaoExtra: 'Mais uma condição ativa: L/D em 4,5 excede referência de 4,0',
        oQueVaiAcontecer: [
          'Condição fisicamente impossível: o sistema calculou com base no valor informado, mas a ferramenta física não possui diâmetro suficiente para engajar 12 mm de penetração de trabalho.',
          'O cálculo é entregue conforme o princípio de Calculadora Livre (R1), mas o processo colidirá ou deixará degrau na peça.'
        ],
        oQueMexer: [
          {
            objetivo: 'Para corrigir a integridade geométrica',
            badge: 'Resolve o alerta crítico',
            instrucao: 'Reduza a penetração de trabalho (ae) para no máximo 10,0 mm (largura plena) ou use passe lateral de 2,5 a 5,0 mm.',
            explicacao: 'Garante que o corte ocorra totalmente dentro do raio físico dos insertos.',
            contrapartida: 'Adequa a trajetória de usinagem ao ferramental montado.'
          }
        ]
      }
    },

    cenarioRoscar: {
      nome: 'Roscar Canônico: Macho M8 × 1,25 em Aço 1045',
      familia: 'roscar',
      materialId: '1045',
      geometria: 'Macho de Corte',
      substrato: 'Metal duro (MD)',
      d: 8.0,
      passo: 1.25,
      brocaPrevia: 6.8,
      l: 30,
      vc: 140,
      calculado: {
        s: 5570,
        f: 6963,
        passoFormula: 'passo (P) 1,25 mm × rotação (n)',
        ld: 3.75,
        vcReal: 140.0,
        nivelSeguranca: 'NORMAL',
        alertaTitulo: 'Nenhuma condição fora da faixa nesta combinação',
        alertaCorpo: 'Velocidade de avanço Vf travada rigidamente pela cinemática do passo de rosca (P × n).',
        oQueVaiAcontecer: [
          'Rosca métrica M8 executada em furo prévio de Ø 6,80 mm.',
          'O avanço da mesa (vf) é travado rigidamente no passo de 1,25 mm/rot — não possui ajuste fino desvinculado da rotação para não estragar os filetes da rosca.'
        ],
        oQueMexer: [
          {
            objetivo: 'Para reduzir velocidade de roscamento',
            badge: null,
            instrucao: 'Reduza a velocidade de corte (vc) para 90 m/min.',
            explicacao: 'A rotação cai para 3.580 rpm e o avanço acompanha sincronizado para 4.475 mm/min.',
            contrapartida: 'Rosqueamento mais seguro com menor risco de quebra de macho.'
          }
        ]
      }
    },

    cenarioMandrilar: {
      nome: 'Mandrilar Canônico: Barra Única Ø18 → Ø20 em Aço 1045',
      familia: 'mandrilar',
      materialId: '1045',
      geometria: 'Cabeçote de Barra Única',
      substrato: 'Metal duro (MD)',
      dInicial: 18.0,
      dFinal: 20.0,
      rEpsilon: 0.4,
      l: 60,
      z: 1,
      apDerivado: 1.0,
      vc: 140,
      fn: 0.08,
      calculado: {
        s: 2228,
        f: 178,
        ld: 3.0,
        ap: 1.0,
        vcReal: 140.0,
        nivelSeguranca: 'NORMAL',
        alertaTitulo: 'Nenhuma condição fora da faixa nesta combinação',
        alertaCorpo: 'A relação balanço/diâmetro (L/D) está em 3,0, perfeitamente rígida (abaixo de 4,0).',
        oQueVaiAcontecer: [
          'Mandrilamento de precisão: diâmetro inicial 18 mm expandido para 20 mm em passe único (ap derivado = 1,0 mm).',
          'Avanço de 0,20 mm/rot garante remoção estável com pastilha de raio de ponta rε = 0,4 mm.'
        ],
        oQueMexer: [
          {
            objetivo: 'Para obter melhor rugosidade superficial',
            badge: null,
            instrucao: 'Reduza o avanço por rotação (fn) para 0,12 mm/rot.',
            explicacao: 'Diminui a altura teórica de cristas de rugosidade na parede do furo.',
            contrapartida: 'Aumenta ligeiramente o tempo de usinagem do furo.'
          }
        ]
      }
    }
  }
};

if (typeof window !== 'undefined') {
  window.FENIX_MOCK_DATA = FENIX_MOCK_DATA;
}
if (typeof module !== 'undefined') {
  module.exports = FENIX_MOCK_DATA;
}
