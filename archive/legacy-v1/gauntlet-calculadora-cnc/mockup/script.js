/* ToolOptimizer CNC — mockup calculadora — ciclo 1 gauntlet
 * Sem módulos, sem build. Roda direto via file://.
 * Fórmulas: ver gauntlet-calculadora-cnc/research/CALCULATOR_SCOPE.md
 */
(function () {
  'use strict';

  // ===================================================================
  // DADOS EMBARCADOS
  // ===================================================================

  // Copiado de src/data/materials.ts (id, nome, iso, kc1_1, mc, faixas Vc
  // desbaste/acabamento — base metal duro — e status de validação).
  var MATERIAIS = [
    { id: 1, nome: 'Aço 1020', iso: 'P', kc1_1: 1800, mc: 0.17, status: 'validado', vc: { desbaste: [185, 250], acabamento: [250, 350] } },
    { id: 2, nome: 'Aço 1045', iso: 'P', kc1_1: 2165, mc: 0.155, status: 'validado', vc: { desbaste: [150, 200], acabamento: [200, 280] } },
    { id: 3, nome: 'Aço Inox 304', iso: 'M', kc1_1: 2150, mc: 0.185, status: 'validado', vc: { desbaste: [60, 90], acabamento: [100, 150] } },
    { id: 4, nome: 'Alumínio 6061-T6', iso: 'N', kc1_1: 750, mc: 0.23, status: 'estimado', vc: { desbaste: [400, 600], acabamento: [600, 1000] } },
    { id: 5, nome: 'P20', iso: 'P', kc1_1: 2300, mc: 0.20, status: 'estimado', vc: { desbaste: [100, 120], acabamento: [150, 200] } },
    { id: 6, nome: '2711', iso: 'P', kc1_1: 2500, mc: 0.20, status: 'estimado', vc: { desbaste: [85, 105], acabamento: [125, 170] } },
    { id: 7, nome: '8620 (núcleo)', iso: 'P', kc1_1: 2100, mc: 0.20, status: 'estimado', vc: { desbaste: [120, 180], acabamento: [180, 250] } },
    { id: 8, nome: '8620 (cementado)', iso: 'H', kc1_1: 2800, mc: 0.20, status: 'estimado', vc: { desbaste: [60, 90], acabamento: [100, 150] } },
    { id: 9, nome: 'H13', iso: 'H', kc1_1: 2800, mc: 0.20, status: 'estimado', vc: { desbaste: [80, 125], acabamento: [125, 170] } }
  ];

  var TOOL_FACTORS = { 'hss': 0.29, 'hss-co': 0.37, 'metal-duro': 1.00, 'md-pastilha': 1.25 };
  var TOOL_LABELS = { 'hss': 'HSS', 'hss-co': 'HSS-Co', 'metal-duro': 'metal duro', 'md-pastilha': 'MD c/ pastilha' };

  // Passo grosso ISO padrão M3-M20.
  var THREAD_TABLE = {
    M3: 0.5, M4: 0.7, M5: 0.8, M6: 1.0, M8: 1.25, M10: 1.5,
    M12: 1.75, M14: 2.0, M16: 2.0, M18: 2.5, M20: 2.5
  };

  var LIMITS = { maxRpm: 12000, maxPower: 15, maxTorque: 80, maxFeed: 5000, eta: 0.85 };

  var TOOL_TYPES = {
    fresar: [
      { value: 'topo', label: 'Fresa inteiriça — topo' },
      { value: 'toroidal', label: 'Fresa inteiriça — toroidal' },
      { value: 'esferica', label: 'Fresa inteiriça — esférica' },
      { value: 'cabecote', label: 'Cabeçote / faceador' }
    ],
    furar: [
      { value: 'broca', label: 'Broca inteiriça' },
      { value: 'udrill', label: 'U-drill (broca c/ insertos)' },
      { value: 'alargador', label: 'Alargador' }
    ],
    roscar: [{ value: 'macho', label: 'Macho' }],
    mandrilar: [{ value: 'barra', label: 'Barra / cabeçote ajustável' }],
    rapido: []
  };

  // Quais campos do bloco comum se aplicam a cada operação.
  var RELEVANCIA_COMUM = {
    fresar: { z: true, fz: true, f: false, ap: true, ae: true, balanco: true },
    furar: { z: false, fz: false, f: true, ap: false, ae: false, balanco: true },
    roscar: { z: false, fz: false, f: false, ap: false, ae: false, balanco: true },
    mandrilar: { z: false, fz: false, f: true, ap: true, ae: false, balanco: true },
    rapido: { z: false, fz: false, f: false, ap: false, ae: false, balanco: false }
  };

  // ===================================================================
  // DOM
  // ===================================================================
  var el = {
    operacao: document.getElementById('operacao'),
    tipoFerramenta: document.getElementById('tipo-ferramenta'),
    grupoTipoFerramenta: document.getElementById('grupo-tipo-ferramenta'),
    materialFerramenta: document.getElementById('material-ferramenta'),
    materialPeca: document.getElementById('material-peca'),
    diametro: document.getElementById('diametro'),
    toggleModo: document.getElementById('toggle-modo'),
    toggleModoLabel: document.getElementById('toggle-modo-label'),
    badgeEstimado: document.getElementById('badge-material-estimado'),
    blocoComum: document.getElementById('bloco-comum'),
    blocoEspecifico: document.getElementById('bloco-especifico'),
    especificoFields: document.getElementById('especifico-fields'),
    blocoRapidoMsg: document.getElementById('bloco-rapido-msg'),
    origem: document.querySelector('[data-testid="origem-sugestao"]'),
    btnCalcular: document.getElementById('btn-calcular'),
    resRpm: document.getElementById('resultado-rpm'),
    resAvanco: document.getElementById('resultado-avanco'),
    resMrr: document.getElementById('resultado-mrr'),
    resPotencia: document.getElementById('resultado-potencia'),
    resTorque: document.getElementById('resultado-torque'),
    resLd: document.getElementById('resultado-ld-nivel'),
    furoTile: document.getElementById('furo-macho-tile'),
    resFuro: document.getElementById('resultado-furo-macho'),
    avisos: document.getElementById('avisos'),
    paramZ: document.getElementById('param-z'),
    paramFz: document.getElementById('param-fz'),
    paramF: document.getElementById('param-f'),
    paramAp: document.getElementById('param-ap'),
    paramAe: document.getElementById('param-ae'),
    paramBalanco: document.getElementById('param-balanco')
  };

  var manualFields = {}; // { fieldId: true }
  var modo = 'avancado'; // 'avancado' | 'rapido'

  // ===================================================================
  // HELPERS
  // ===================================================================
  function toRad(deg) { return deg * Math.PI / 180; }
  function avg(range) { return (range[0] + range[1]) / 2; }
  function numOr(elm, fallback) {
    if (!elm) return fallback;
    var v = parseFloat(elm.value);
    return isFinite(v) ? v : fallback;
  }
  function getMaterialById(id) {
    for (var i = 0; i < MATERIAIS.length; i++) if (MATERIAIS[i].id === id) return MATERIAIS[i];
    return MATERIAIS[0];
  }
  function nearestThreadKey(D) {
    var keys = Object.keys(THREAD_TABLE);
    var best = keys[0], bestDiff = Infinity;
    keys.forEach(function (k) {
      var diam = parseInt(k.slice(1), 10);
      var diff = Math.abs(diam - D);
      if (diff < bestDiff) { bestDiff = diff; best = k; }
    });
    return best;
  }
  function setResult(elm, value, unit, decimals) {
    if (value === null || value === undefined || !isFinite(value)) {
      elm.textContent = '—';
      return;
    }
    elm.textContent = value.toFixed(decimals) + (unit ? ' ' + unit : '');
  }
  function clearResultTexts() {
    [el.resRpm, el.resAvanco, el.resMrr, el.resPotencia, el.resTorque, el.resFuro].forEach(function (e) {
      e.textContent = '—';
    });
    el.resLd.textContent = '—';
    el.resLd.dataset.nivel = '';
  }
  function clearAvisos() {
    el.avisos.innerHTML = '';
  }
  function addAviso(text, nivel) {
    var div = document.createElement('div');
    div.className = 'aviso-item';
    div.setAttribute('data-testid', 'aviso-item');
    div.setAttribute('data-nivel', nivel);
    div.textContent = text;
    el.avisos.appendChild(div);
  }
  function nivelLabelPt(nivel) {
    return { verde: 'Verde', amarelo: 'Amarelo', vermelho: 'Vermelho', bloqueado: 'Bloqueado' }[nivel] || '—';
  }
  function kienzle(material, hm) {
    var hmSafe = Math.max(hm, 0.001);
    return material.kc1_1 * Math.pow(hmSafe, -material.mc);
  }
  function vcFor(op, tipo, material, toolFactor) {
    var usinagem = op === 'mandrilar' ? material.vc.acabamento : material.vc.desbaste;
    var base = avg(usinagem);
    var vc = base * toolFactor;
    // Assunção (sem dado de catálogo no escopo): Vc de macho gira em torno de
    // 30% do Vc de fresamento/torneamento do mesmo material — Vc de rosqueamento
    // é sempre baixo mesmo em metal duro (ver CALCULATOR_SCOPE.md §3).
    if (op === 'roscar') vc = vc * 0.30;
    if (tipo === 'alargador') vc = vc / 3; // regra explícita do discovery
    return vc;
  }
  function ldNivel(ratio, isMandril) {
    if (isMandril) {
      if (ratio <= 3) return 'verde';
      if (ratio <= 4) return 'amarelo';
      if (ratio <= 5) return 'vermelho';
      return 'bloqueado';
    }
    if (ratio <= 3) return 'verde';
    if (ratio <= 4) return 'amarelo';
    if (ratio <= 6) return 'vermelho';
    return 'bloqueado';
  }

  // ===================================================================
  // SUGESTÃO DE PARÂMETROS (defaults + origem)
  // ===================================================================
  function suggestParams(op, tipo, D) {
    var d = D > 0 ? D : 10;
    var out = {};
    out.z = op === 'fresar' ? (tipo === 'esferica' ? 2 : tipo === 'cabecote' ? 6 : 4) : 1;
    out.fz = 0.05;
    out.f = 0.10;
    out.ap = op === 'mandrilar' ? 0.5 : 1.0;
    out.ae = Math.min(0.5 * d, 5);
    out.balanco = Math.round(d * 3);
    out.kappa = 90;
    out.anguloPonta = tipo === 'udrill' ? 130 : tipo === 'alargador' ? 90 : 118;
    out.raioQuina = tipo === 'esferica' ? d / 2 : tipo === 'toroidal' ? Math.min(2, d / 4) : 0.4;
    var threadKey = nearestThreadKey(d);
    out.thread = { key: threadKey, passo: THREAD_TABLE[threadKey], diametro: parseInt(threadKey.slice(1), 10) };
    return out;
  }

  function applyDefaults() {
    var op = el.operacao.value;
    var tipo = el.tipoFerramenta.value;
    var D = numOr(el.diametro, 10);
    var sug = suggestParams(op, tipo, D);

    function setIfNotManual(inputEl, value, decimals) {
      if (!inputEl || manualFields[inputEl.id]) return;
      inputEl.value = decimals !== undefined ? Number(value).toFixed(decimals) : value;
    }
    setIfNotManual(el.paramZ, sug.z, 0);
    setIfNotManual(el.paramFz, sug.fz, 2);
    setIfNotManual(el.paramF, sug.f, 2);
    setIfNotManual(el.paramAp, sug.ap, 1);
    setIfNotManual(el.paramAe, sug.ae, 1);
    setIfNotManual(el.paramBalanco, sug.balanco, 0);

    var kappaEl = document.getElementById('param-kappa');
    var anguloEl = document.getElementById('param-angulo-ponta');
    var raioEl = document.getElementById('param-raio-quina');
    var passoEl = document.getElementById('param-passo');
    setIfNotManual(kappaEl, sug.kappa, 0);
    setIfNotManual(anguloEl, sug.anguloPonta, 0);
    setIfNotManual(raioEl, sug.raioQuina, 2);
    setIfNotManual(passoEl, sug.thread.passo, 2);

    // Origem da sugestão de Vc (linha única, sempre visível).
    var material = getMaterialById(parseInt(el.materialPeca.value, 10));
    var toolFactor = TOOL_FACTORS[el.materialFerramenta.value];
    var usinagemLabel = op === 'mandrilar' ? 'acabamento' : 'desbaste';
    var vcBase = avg(op === 'mandrilar' ? material.vc.acabamento : material.vc.desbaste);
    var vc = vcFor(op, tipo, material, toolFactor);
    var txt = 'Vc sugerido: ' + vc.toFixed(0) + ' m/min — faixa ' + usinagemLabel + ' ISO ' + material.iso +
      ' (' + vcBase.toFixed(0) + ' m/min base), ' + TOOL_LABELS[el.materialFerramenta.value] +
      ' (fator ' + toolFactor.toFixed(2) + ')';
    if (material.status === 'estimado') txt += ' — ⚠ material estimado';
    el.origem.textContent = txt;
    el.badgeEstimado.hidden = material.status !== 'estimado';
  }

  // ===================================================================
  // CAMPOS ESPECÍFICOS (bloco que muda por tipo de ferramenta)
  // ===================================================================
  function numberField(id, label, unit, step, min) {
    return '<div class="field" data-field-wrap="' + id + '">' +
      '<label for="' + id + '">' + label + ' <span class="unit">' + unit + '</span></label>' +
      '<input type="number" id="' + id + '" data-testid="' + id + '" step="' + step + '" min="' + (min !== undefined ? min : 0) + '">' +
      '</div>';
  }

  function renderEspecificoFields(op, tipo) {
    var html = '';
    if (op === 'fresar' && tipo === 'cabecote') {
      html += numberField('param-kappa', 'κ ângulo de posição', 'graus', 1, 10);
    } else if (op === 'fresar' && tipo === 'toroidal') {
      html += numberField('param-raio-quina', 'r raio de quina', 'mm', 0.1, 0.1);
    } else if (op === 'fresar' && tipo === 'esferica') {
      html += numberField('param-raio-quina', 'r raio (= Ø/2)', 'mm', 0.1, 0.1);
    } else if (op === 'furar') {
      html += numberField('param-angulo-ponta', 'θ ângulo de ponta', 'graus', 1, 60);
    } else if (op === 'roscar' && tipo === 'macho') {
      html += '<div class="field thread-select-row">' +
        '<div class="field" style="flex:1"><label for="tabela-rosca">Rosca (tabela M)</label>' +
        '<select id="tabela-rosca" data-testid="tabela-rosca">' +
        Object.keys(THREAD_TABLE).map(function (k) {
          return '<option value="' + k + '">' + k + ' × ' + THREAD_TABLE[k].toFixed(2) + '</option>';
        }).join('') +
        '</select></div>' +
        numberField('param-passo', 'P passo', 'mm', 0.05, 0.1) +
        '</div>' +
        '<div class="radio-row">' +
        '<label><input type="radio" name="macho-tipo" value="corte" checked> Macho de corte</label>' +
        '<label><input type="radio" name="macho-tipo" value="formador"> Macho formador</label>' +
        '</div>';
    } else if (op === 'mandrilar' && tipo === 'barra') {
      html += numberField('param-raio-quina', 'rε raio de quina do inserto', 'mm', 0.05, 0.05);
    }
    el.especificoFields.innerHTML = html || '<p class="unit">Nenhum parâmetro específico para esta ferramenta.</p>';

    // liga listeners "manual" nos campos recém-criados
    el.especificoFields.querySelectorAll('input[type="number"]').forEach(function (inp) {
      inp.addEventListener('input', function () { markManual(inp); });
    });
    var tabelaRosca = document.getElementById('tabela-rosca');
    if (tabelaRosca) {
      tabelaRosca.value = nearestThreadKey(numOr(el.diametro, 10));
      tabelaRosca.addEventListener('change', function () {
        var key = tabelaRosca.value;
        var passo = THREAD_TABLE[key];
        var diam = parseInt(key.slice(1), 10);
        el.diametro.value = diam;
        var passoEl = document.getElementById('param-passo');
        passoEl.value = passo.toFixed(2);
        markManual(passoEl);
        el.diametro.dispatchEvent(new Event('change'));
      });
    }
  }

  function markManual(inputEl) {
    manualFields[inputEl.id] = true;
    inputEl.classList.add('manual');
  }

  // ===================================================================
  // VISIBILIDADE / LAYOUT
  // ===================================================================
  function applyFieldRelevance(op) {
    // Campos do bloco comum que não se aplicam à operação atual são ocultados
    // (display:none) — o container do bloco permanece na mesma posição, só o
    // conteúdo interno reflui. Ex.: trocar para Roscar esconde ae (T02).
    var rel = RELEVANCIA_COMUM[op] || {};
    [['z', el.paramZ], ['fz', el.paramFz], ['f', el.paramF], ['ap', el.paramAp], ['ae', el.paramAe], ['balanco', el.paramBalanco]]
      .forEach(function (pair) {
        var key = pair[0], input = pair[1];
        var wrap = input.closest('[data-field-wrap]');
        var relevant = !!rel[key];
        wrap.style.display = relevant ? '' : 'none';
        input.disabled = !relevant;
      });
  }

  function updateVisibility() {
    var op = el.operacao.value;
    var quick = modo === 'rapido' || op === 'rapido';
    el.blocoComum.style.display = quick ? 'none' : '';
    el.blocoEspecifico.style.display = quick ? 'none' : '';
    el.blocoRapidoMsg.hidden = !quick;
    if (!quick) applyFieldRelevance(op);

    var rapidoOp = op === 'rapido';
    el.tipoFerramenta.disabled = rapidoOp;
    el.grupoTipoFerramenta.style.opacity = rapidoOp ? '0.35' : '1';

    el.furoTile.hidden = op !== 'roscar';
    el.toggleModoLabel.textContent = quick ? 'Rápido' : 'Avançado';
  }

  // ===================================================================
  // CÁLCULOS POR FAMÍLIA
  // ===================================================================
  function calcFresar(ctx) {
    var D = ctx.D, tipo = ctx.tipo, ap = ctx.ap, ae = ctx.ae;
    var avisos = [];
    var Def = D;
    if (tipo === 'esferica' && ap > 0 && ap < D / 2) {
      Def = 2 * Math.sqrt(ap * (D - ap));
    } else if (tipo === 'toroidal') {
      var r = ctx.raioQuina;
      if (r > 0 && ap > 0 && ap < r) {
        Def = D - 2 * r + 2 * Math.sqrt(ap * (2 * r - ap));
      }
    }
    if (!isFinite(Def) || Def <= 0) Def = D;

    var Vc = vcFor('fresar', tipo, ctx.material, ctx.toolFactor);
    var n = Vc * 1000 / (Math.PI * Def);

    var hm, Vf;
    if (tipo === 'cabecote') {
      hm = ctx.fz * Math.sin(toRad(ctx.kappa));
      Vf = ctx.fz * ctx.z * n;
      if (ae > 0.8 * D) avisos.push({ text: 'ae > 80% do Ø: posicione a ferramenta fora de centro para evitar choque no inserto.', nivel: 'amarelo' });
    } else {
      var fzEf = ctx.fz;
      if (ae > 0 && ae < D / 2) fzEf = ctx.fz / Math.sqrt(ae / D);
      hm = fzEf * Math.sqrt(Math.min(ae / D, 1));
      Vf = fzEf * ctx.z * n;
      if (ae >= D) avisos.push({ text: 'ae = Ø: rasgo fechado (slot). Reduza a velocidade de avanço para garantir evacuação de cavaco.', nivel: 'amarelo' });
    }

    var MRR = (ap * ae * Vf) / 1000;
    var kc = kienzle(ctx.material, hm);
    var Pc = MRR * kc / (60000 * LIMITS.eta);
    var M = n > 0 ? Pc * 9549 / n : null;

    return { rpm: n, vf: Vf, mrr: MRR, potencia: Pc, torque: M, avisos: avisos };
  }

  function calcFurar(ctx) {
    var D = ctx.D, tipo = ctx.tipo;
    var avisos = [];
    var Vc = vcFor('furar', tipo, ctx.material, ctx.toolFactor);
    var n = Vc * 1000 / (Math.PI * D);
    var Vf = ctx.f * n;
    var hm = ctx.f / 2; // aproximação padrão de furação: hm ≈ f/2
    var kc = kienzle(ctx.material, hm);
    var Pc = kc * ctx.f * D * Vc / (240000 * LIMITS.eta);
    var M = n > 0 ? Pc * 9549 / n : null;
    var MRR = (Math.PI * D * D / 4) * Vf / 1000;

    if (tipo === 'udrill') {
      if (ctx.f < 0.05 * Math.sqrt(D)) {
        avisos.push({ text: 'Avanço muito baixo para U-drill: o inserto central pode esfregar em vez de cortar. Aumente f.', nivel: 'vermelho' });
      }
      if (D < 12 || D > 60) {
        avisos.push({ text: 'Ø fora da faixa típica de U-drill (12–60 mm).', nivel: 'amarelo' });
      }
    }
    return { rpm: n, vf: Vf, mrr: MRR, potencia: Pc, torque: M, avisos: avisos };
  }

  function calcRoscar(ctx) {
    var D = ctx.D, P = ctx.passo;
    var avisos = [];
    var Vc = vcFor('roscar', ctx.tipo, ctx.material, ctx.toolFactor);
    var n = Vc * 1000 / (Math.PI * D);
    var Vf = n * P;
    var furo = ctx.tipoMacho === 'formador' ? D - P / 2 : D - P;
    if (furo <= 0) {
      avisos.push({ text: 'Passo maior ou igual ao Ø informado — verifique os valores da rosca.', nivel: 'vermelho' });
      furo = null;
    }
    // Potência/torque de rosqueamento não fazem parte do escopo essencial deste ciclo.
    return { rpm: n, vf: Vf, mrr: null, potencia: null, torque: null, furoMacho: furo, avisos: avisos };
  }

  function calcMandrilar(ctx) {
    var D = ctx.D;
    var avisos = [];
    var Vc = vcFor('mandrilar', ctx.tipo, ctx.material, ctx.toolFactor);
    var n = Vc * 1000 / (Math.PI * D);
    var Vf = ctx.f * n;
    var MRR = ctx.ap * ctx.f * Vc; // fórmula de torneamento/mandrilamento: ap·f·Vc = cm³/min
    var hm = ctx.f;
    var kc = kienzle(ctx.material, hm);
    var Pc = MRR * kc / (60000 * LIMITS.eta);
    var M = n > 0 ? Pc * 9549 / n : null;
    return { rpm: n, vf: Vf, mrr: MRR, potencia: Pc, torque: M, avisos: avisos };
  }

  function calcRapidoAgnostico(ctx) {
    var D = ctx.D;
    var Vc = vcFor('fresar', 'topo', ctx.material, ctx.toolFactor);
    var n = Vc * 1000 / (Math.PI * D);
    var fzSug = 0.05, zSug = 4;
    var Vf = fzSug * zSug * n;
    return { rpm: n, vf: Vf, mrr: null, potencia: null, torque: null, avisos: [], skipLd: true };
  }

  // ===================================================================
  // ORQUESTRAÇÃO DO CÁLCULO
  // ===================================================================
  function calcular() {
    clearAvisos();
    clearResultTexts();

    var D = parseFloat(el.diametro.value);
    if (!isFinite(D) || D <= 0) {
      addAviso('Informe um Ø maior que zero para calcular.', 'amarelo');
      return;
    }

    var op = el.operacao.value;
    var tipo = el.tipoFerramenta.value;
    var material = getMaterialById(parseInt(el.materialPeca.value, 10));
    var toolFactor = TOOL_FACTORS[el.materialFerramenta.value];

    var machoTipoInput = document.querySelector('input[name="macho-tipo"]:checked');

    var ctx = {
      D: D, op: op, tipo: tipo, material: material, toolFactor: toolFactor,
      z: numOr(el.paramZ, 1),
      fz: numOr(el.paramFz, 0.05),
      f: numOr(el.paramF, 0.10),
      ap: numOr(el.paramAp, 1),
      ae: numOr(el.paramAe, 1),
      balanco: numOr(el.paramBalanco, D * 3),
      kappa: numOr(document.getElementById('param-kappa'), 90),
      anguloPonta: numOr(document.getElementById('param-angulo-ponta'), 118),
      raioQuina: numOr(document.getElementById('param-raio-quina'), 0.4),
      passo: numOr(document.getElementById('param-passo'), 1.5),
      tipoMacho: machoTipoInput ? machoTipoInput.value : 'corte'
    };

    var out;
    if (op === 'rapido') out = calcRapidoAgnostico(ctx);
    else if (op === 'fresar') out = calcFresar(ctx);
    else if (op === 'furar') out = calcFurar(ctx);
    else if (op === 'roscar') out = calcRoscar(ctx);
    else if (op === 'mandrilar') out = calcMandrilar(ctx);
    else out = { rpm: null, vf: null, mrr: null, potencia: null, torque: null, avisos: [] };

    // Relação L/D — não se aplica ao cálculo rápido agnóstico.
    if (!out.skipLd) {
      var ratio = ctx.balanco > 0 && D > 0 ? ctx.balanco / D : 0;
      var isMandril = op === 'mandrilar';
      var nivel = ldNivel(ratio, isMandril);
      el.resLd.textContent = nivelLabelPt(nivel) + ' (L/D = ' + ratio.toFixed(2) + ')';
      el.resLd.dataset.nivel = nivel;

      if (nivel === 'bloqueado') {
        var limite = isMandril ? 5 : 6;
        addAviso('Relação L/D = ' + ratio.toFixed(2) + ' está BLOQUEADA (limite ' + limite + '). Reduza o balanço ou use ferramenta de Ø maior.', 'bloqueado');
        return; // arquitetura: bloqueado impede calcular o restante
      }
      if (nivel === 'vermelho') {
        addAviso('Relação L/D = ' + ratio.toFixed(2) + ' está crítica. Reduza o balanço ou aumente o Ø.', 'vermelho');
      } else if (nivel === 'amarelo') {
        addAviso('Relação L/D = ' + ratio.toFixed(2) + ' indica risco de vibração. Considere reduzir o balanço.', 'amarelo');
      }
    } else {
      el.resLd.textContent = '—';
      el.resLd.dataset.nivel = '';
    }

    setResult(el.resRpm, out.rpm, 'rpm', 0);
    setResult(el.resAvanco, out.vf, 'mm/min', 0);
    setResult(el.resMrr, out.mrr, 'cm³/min', 2);
    setResult(el.resPotencia, out.potencia, 'kW', 2);
    setResult(el.resTorque, out.torque, 'Nm', 1);

    if (op === 'roscar') {
      el.furoTile.hidden = false;
      setResult(el.resFuro, out.furoMacho, 'mm', 2);
    } else {
      el.furoTile.hidden = true;
    }

    (out.avisos || []).forEach(function (a) { addAviso(a.text, a.nivel); });

    if (out.rpm !== null && out.rpm > LIMITS.maxRpm) {
      addAviso('RPM (' + out.rpm.toFixed(0) + ') excede o limite da máquina (' + LIMITS.maxRpm + '). Reduza Vc ou aumente o Ø.', 'vermelho');
    }
    if (out.potencia !== null && out.potencia > LIMITS.maxPower) {
      addAviso('Potência (' + out.potencia.toFixed(2) + ' kW) excede o limite da máquina (' + LIMITS.maxPower + ' kW). Reduza ap/ae ou avanço.', 'vermelho');
    }
    if (out.torque !== null && out.torque > LIMITS.maxTorque) {
      addAviso('Torque (' + out.torque.toFixed(1) + ' Nm) excede o limite da máquina (' + LIMITS.maxTorque + ' Nm). Reduza a profundidade de corte.', 'vermelho');
    }
    if (out.vf !== null && out.vf > LIMITS.maxFeed) {
      addAviso('Avanço (' + out.vf.toFixed(0) + ' mm/min) excede o limite da máquina (' + LIMITS.maxFeed + ' mm/min). Reduza fz/f ou a rotação.', 'vermelho');
    }
  }

  // ===================================================================
  // EVENTOS
  // ===================================================================
  function populateMaterialPeca() {
    el.materialPeca.innerHTML = MATERIAIS.map(function (m) {
      return '<option value="' + m.id + '">' + m.nome + ' (ISO ' + m.iso + ')' + (m.status === 'estimado' ? ' ⚠' : '') + '</option>';
    }).join('');
  }

  function populateTipoFerramenta(op) {
    var opts = TOOL_TYPES[op] || [];
    el.tipoFerramenta.innerHTML = opts.map(function (o) {
      return '<option value="' + o.value + '">' + o.label + '</option>';
    }).join('') || '<option value="">—</option>';
  }

  function onContextoMaiorMudou() {
    // troca de operação: repopula tipo-ferramenta, reseta manualFields (exceto Ø/material da peça),
    // re-renderiza bloco específico, limpa resultado (não recalcula sozinho).
    var op = el.operacao.value;
    populateTipoFerramenta(op);
    manualFields = {};
    var tipo = el.tipoFerramenta.value;
    renderEspecificoFields(op, tipo);
    applyDefaults();
    updateVisibility();
    clearResultTexts();
    clearAvisos();
  }

  function onTipoFerramentaMudou() {
    manualFields = {};
    var op = el.operacao.value;
    var tipo = el.tipoFerramenta.value;
    renderEspecificoFields(op, tipo);
    applyDefaults();
    updateVisibility();
    clearResultTexts();
    clearAvisos();
  }

  function init() {
    populateMaterialPeca();
    populateTipoFerramenta(el.operacao.value);
    renderEspecificoFields(el.operacao.value, el.tipoFerramenta.value);
    applyDefaults();
    updateVisibility();

    el.operacao.addEventListener('change', onContextoMaiorMudou);
    el.tipoFerramenta.addEventListener('change', onTipoFerramentaMudou);
    el.materialFerramenta.addEventListener('change', function () {
      applyDefaults();
      clearResultTexts();
      clearAvisos();
    });
    el.materialPeca.addEventListener('change', function () {
      applyDefaults();
      clearResultTexts();
      clearAvisos();
    });
    el.diametro.addEventListener('change', function () {
      applyDefaults();
      clearResultTexts();
      clearAvisos();
    });

    [el.paramZ, el.paramFz, el.paramF, el.paramAp, el.paramAe, el.paramBalanco].forEach(function (inp) {
      inp.addEventListener('input', function () { markManual(inp); });
    });

    el.toggleModo.addEventListener('click', function () {
      modo = modo === 'avancado' ? 'rapido' : 'avancado';
      updateVisibility();
    });

    el.btnCalcular.addEventListener('click', calcular);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
