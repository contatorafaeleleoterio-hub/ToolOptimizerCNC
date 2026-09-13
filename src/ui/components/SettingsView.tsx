import React, { useState, useEffect, useCallback } from 'react';
import type { Material, IsoClass, AppConfig, ToolInstance, Family, ToolGeometryType } from '../../core/types.js';
import {
  getConfig,
  saveConfig,
  getAllMaterials,
  saveMaterial,
  deleteCustomMaterial,
  resetMaterial,
  resetAllFactoryMaterials,
  getAllTools,
  saveTool,
  deleteTool,
  DEFAULT_CONFIG,
} from '../../core/storage.js';
import { FACTORY_MATERIALS } from '../../core/materials.js';
import { FACTORY_TOOLS, type ToolGeometry, type Substrate } from '../../core/tools.js';
import { useCalculator } from '../context/CalculatorContext.js';

interface SettingsViewProps {
  onClose: () => void;
}

export default function SettingsView({ onClose }: SettingsViewProps) {
  const { setSafetyMargin, refreshMaterials, refreshWorkshopTools } = useCalculator();

  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const configRef = React.useRef<AppConfig>(DEFAULT_CONFIG);
  configRef.current = config;

  const [materials, setMaterials] = useState<Material[]>([]);
  const [tools, setTools] = useState<ToolInstance[]>([]);
  const [statusMsg, setStatusMsg] = useState<{ type: 'ok' | 'erro'; text: string } | null>(null);

  // Estados de gavetas abertas
  const [openDrawers, setOpenDrawers] = useState<Record<string, boolean>>({});

  // Confirmação de exclusão
  const [confirmDeleteMatId, setConfirmDeleteMatId] = useState<string | null>(null);
  const [confirmDeleteToolId, setConfirmDeleteToolId] = useState<string | null>(null);

  // Form de novo material
  const [newMatOpen, setNewMatOpen] = useState(true);
  const [newMatName, setNewMatName] = useState('');
  const [newMatIso, setNewMatIso] = useState<IsoClass>('P');
  const [newMatKc, setNewMatKc] = useState('');
  const [newMatMc, setNewMatMc] = useState('');
  const [newMatVc, setNewMatVc] = useState('');

  // Form de nova ferramenta
  const [newToolOpen, setNewToolOpen] = useState(false);
  const [newToolGeomId, setNewToolGeomId] = useState<string>('fresa-topo-reto');
  const [newToolSubstrate, setNewToolSubstrate] = useState<Substrate>('MD');
  const [newToolName, setNewToolName] = useState('');
  const [newToolD, setNewToolD] = useState('');
  const [newToolZ, setNewToolZ] = useState('');
  const [newToolLc, setNewToolLc] = useState('');
  const [newToolR, setNewToolR] = useState('');
  const [newToolKappa, setNewToolKappa] = useState('');
  const [newToolPointAngle, setNewToolPointAngle] = useState('');
  const [newToolPitch, setNewToolPitch] = useState('');

  const toggleDrawer = (id: string) => {
    setOpenDrawers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const notify = (text: string, type: 'ok' | 'erro' = 'ok') => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const loadData = useCallback(async () => {
    try {
      const cfg = await getConfig();
      setConfig(cfg);
      const mats = await getAllMaterials();
      setMaterials(mats);
      const tls = await getAllTools();
      setTools(tls);
    } catch (e) {
      console.error('Erro ao carregar dados locais:', e);
      notify('Erro ao acessar armazenamento local do navegador.', 'erro');
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Contagem de materiais
  const factoryCount = FACTORY_MATERIALS.length;
  const customCount = materials.filter(m => m.isCustom && !FACTORY_MATERIALS.some(f => f.id === m.id)).length;

  // Bloco 1: Handlers de Materiais
  const handleSaveEditedMaterial = async (mat: Material) => {
    try {
      await saveMaterial(mat);
      await loadData();
      await refreshMaterials();
      notify(`Material "${mat.name}" atualizado.`);
    } catch {
      notify('Erro ao salvar material.', 'erro');
    }
  };

  const handleResetMaterial = async (id: string, name: string) => {
    try {
      await resetMaterial(id);
      await loadData();
      await refreshMaterials();
      notify(`Material "${name}" revertido aos valores de fábrica.`);
    } catch {
      notify('Erro ao reverter material.', 'erro');
    }
  };

  const handleResetAllMaterials = async () => {
    try {
      await resetAllFactoryMaterials();
      await loadData();
      await refreshMaterials();
      notify('Todos os materiais de partida foram revertidos aos valores de fábrica.');
    } catch {
      notify('Erro ao reverter materiais de fábrica.', 'erro');
    }
  };

  const handleDeleteCustomMaterial = async (id: string, name: string) => {
    try {
      await deleteCustomMaterial(id);
      setConfirmDeleteMatId(null);
      await loadData();
      await refreshMaterials();
      notify(`Material "${name}" apagado.`);
    } catch {
      notify('Erro ao apagar material.', 'erro');
    }
  };

  const handleCreateMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatName.trim()) {
      notify('Informe o nome do material.', 'erro');
      return;
    }

    const mat: Material = {
      id: 'custom-' + Date.now(),
      name: newMatName.trim(),
      isoClass: newMatIso,
      kc1_1: parseFloat(newMatKc) || 1500,
      mc: parseFloat(newMatMc) || 0.21,
      vcReference: parseFloat(newMatVc) || 100,
      isCustom: true,
    };

    try {
      await saveMaterial(mat);
      setNewMatName('');
      setNewMatKc('');
      setNewMatMc('');
      setNewMatVc('');
      await loadData();
      await refreshMaterials();
      notify(`Material "${mat.name}" cadastrado com sucesso.`);
    } catch {
      notify('Erro ao criar material.', 'erro');
    }
  };

  // Bloco 2: Handlers de Ferramentas
  const selectedGeom = FACTORY_TOOLS.find(t => t.id === newToolGeomId) || FACTORY_TOOLS[0]!;

  const handleCreateTool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newToolName.trim()) {
      notify('Informe o apelido da ferramenta.', 'erro');
      return;
    }
    const dVal = parseFloat(newToolD);

    const toolInst: ToolInstance = {
      id: 'tool-' + Date.now(),
      name: newToolName.trim(),
      family: selectedGeom.family,
      geometryType: selectedGeom.geometryType,
      geometryId: selectedGeom.id,
      substrate: newToolSubstrate,
      D: isNaN(dVal) ? 0 : dVal,
      isIncomplete: isNaN(dVal) || dVal <= 0,
    };

    if (newToolZ) toolInst.Z = parseInt(newToolZ, 10);
    if (newToolLc) toolInst.Lc = parseFloat(newToolLc);
    if (newToolR) toolInst.r = parseFloat(newToolR);
    if (newToolKappa) toolInst.kappa = parseFloat(newToolKappa);
    if (newToolPointAngle) toolInst.pointAngle = parseFloat(newToolPointAngle);
    if (newToolPitch) toolInst.pitch = parseFloat(newToolPitch);

    try {
      await saveTool(toolInst);
      setNewToolName('');
      setNewToolD('');
      setNewToolZ('');
      setNewToolLc('');
      setNewToolR('');
      setNewToolKappa('');
      setNewToolPointAngle('');
      setNewToolPitch('');
      setNewToolOpen(false);
      await loadData();
      await refreshWorkshopTools();
      notify(`Ferramenta "${toolInst.name}" adicionada à oficina.`);
    } catch {
      notify('Erro ao salvar ferramenta.', 'erro');
    }
  };

  const handleDeleteTool = async (id: string, name: string) => {
    try {
      await deleteTool(id);
      setConfirmDeleteToolId(null);
      await loadData();
      await refreshWorkshopTools();
      notify(`Ferramenta "${name}" apagada.`);
    } catch {
      notify('Erro ao apagar ferramenta.', 'erro');
    }
  };

  // Bloco 3: Margem de Segurança
  const handleMarginStep = async (delta: number) => {
    const nextVal = Math.max(10, Math.min(200, (config.safetyMargin || 100) + delta));
    const nextCfg = { ...config, safetyMargin: nextVal };
    setConfig(nextCfg);
    setSafetyMargin(nextVal);
    await saveConfig(nextCfg);
  };

  const handleResetMargin = async () => {
    const nextCfg = { ...config, safetyMargin: 100 };
    setConfig(nextCfg);
    setSafetyMargin(100);
    await saveConfig(nextCfg);
    notify('Margem de segurança revertida ao padrão (100 %).');
  };

  const handleSaveAllConfig = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      await saveConfig(configRef.current);
      setSafetyMargin(configRef.current.safetyMargin);
      notify('Configurações salvas com sucesso no armazenamento local (IndexedDB)!');
    } catch {
      notify('Erro ao salvar configurações.', 'erro');
    }
  };

  // Bloco 4: Broca Aço Rápido
  const handleHssStep = async (field: 'hssFeedPercent' | 'hssPeckDivisor' | 'hssPeckCapMm', delta: number) => {
    let nextVal = (config[field] ?? DEFAULT_CONFIG[field]) + delta;
    if (field === 'hssPeckCapMm') {
      nextVal = parseFloat(nextVal.toFixed(1));
    }
    if (nextVal <= 0) return;
    const nextCfg = { ...config, [field]: nextVal };
    setConfig(nextCfg);
    await saveConfig(nextCfg);
  };

  const handleResetHss = async () => {
    const nextCfg = {
      ...config,
      hssFeedPercent: DEFAULT_CONFIG.hssFeedPercent,
      hssPeckDivisor: DEFAULT_CONFIG.hssPeckDivisor,
      hssPeckCapMm: DEFAULT_CONFIG.hssPeckCapMm,
    };
    setConfig(nextCfg);
    await saveConfig(nextCfg);
    notify('Parâmetros de broca de aço rápido revertidos ao padrão.');
  };

  const isHssDifferent =
    config.hssFeedPercent !== DEFAULT_CONFIG.hssFeedPercent ||
    config.hssPeckDivisor !== DEFAULT_CONFIG.hssPeckDivisor ||
    config.hssPeckCapMm !== DEFAULT_CONFIG.hssPeckCapMm;

  return (
    <div className="config-wrap" style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* MOLDURA SUPERIOR */}
      <div className="config-head">
        <div className="plate">TOOLOPTIMIZER</div>
        <div className="htitle">Configurações</div>
        <button
          type="button"
          className="config-back"
          onClick={onClose}
          aria-label="Voltar ao cálculo"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 8 H4"></path>
            <path d="M7.5 4 L4 8 L7.5 12"></path>
          </svg>
          <span>Voltar ao cálculo</span>
        </button>
      </div>

      {/* AVISO DO FORNECEDOR (ESCOPO_CONFIGURACOES §2.2) */}
      <div className="aviso-fornecedor">
        Os valores que vêm com o sistema são um ponto de partida.{' '}
        <strong>Peça os números ao fornecedor da sua ferramenta</strong> e ajuste aqui — quem fabricou a ferramenta sabe dela mais do que qualquer tabela geral.
      </div>

      {/* EXPLICAÇÃO DE NÍVEL SUPERIOR — GAVETA D9 */}
      <div className="drawer">
        <button
          type="button"
          className="dtrigger"
          aria-expanded={!!openDrawers['note-area']}
          onClick={() => toggleDrawer('note-area')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="chevron">
            <path d="M6 3.5 L11 8 L6 12.5"></path>
          </svg>
          <span className="dhint">onde estes ajustes valem e como ficam salvos</span>
        </button>
        {openDrawers['note-area'] && (
          <div className="dbody dbody--col">
            <div className="prose">
              O que muda aqui vale para toda a oficina e fica salvo neste computador. Nenhuma sincronização, nenhum download, nenhuma consulta remota — a área abre igual sem internet.
            </div>
          </div>
        )}
      </div>

      {/* STATUS FLUTUANTE */}
      <div className={`cfg-status ${statusMsg ? `visivel ${statusMsg.type}` : ''}`}>
        {statusMsg?.text}
      </div>

      {/* ================= BLOCO 1 — MATERIAIS (escopo §3) ================= */}
      <div className="card">
        <div className="bhead">
          <div className="lbl" style={{ flexGrow: 1 }}>Materiais</div>
          <span className="bsum">{factoryCount} de partida · {customCount} criados</span>
        </div>
        <hr className="sep" />

        {/* GAVETA EXPLICATIVA MATERIAIS */}
        <div className="drawer">
          <button
            type="button"
            className="dtrigger"
            aria-expanded={!!openDrawers['note-mat']}
            onClick={() => toggleDrawer('note-mat')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="chevron">
              <path d="M6 3.5 L11 8 L6 12.5"></path>
            </svg>
            <span className="dhint">o que estes cinco valores fazem · valor fora do usual</span>
          </button>
          {openDrawers['note-mat'] && (
            <div className="dbody dbody--col">
              <div className="prose">
                Cada material carrega cinco grandezas que entram na conta. Mudam raramente — só quando o fornecedor publica dados novos. Nenhum valor digitado é recusado, truncado ou ajustado: valor fora do usual aparece como alerta na tela de cálculo, nunca como bloqueio.
              </div>
            </div>
          )}
        </div>

        {/* CRIAR MATERIAL — GAVETA RECOLHIDA */}
        <div className="drawer">
          <button
            type="button"
            className="dtrigger"
            aria-expanded={newMatOpen}
            onClick={() => setNewMatOpen(!newMatOpen)}
          >
            <span className="plus-sign">+</span>
            <span className="lbl" style={{ flex: 'none' }}>Criar material</span>
            <span className="dhint">nome e as cinco grandezas · o operador é a fonte do número dele</span>
          </button>
          <form onSubmit={handleCreateMaterial} className="form-panel" style={{ display: newMatOpen ? 'flex' : 'none' }}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="cfg-mat-name" className="lbl">Nome do material</label>
                <input
                  id="cfg-mat-name"
                  type="text"
                  className="fld"
                  aria-label="Nome do material"
                  placeholder="o nome que você reconhece"
                  value={newMatName}
                  onChange={(e) => setNewMatName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="cfg-mat-iso" className="lbl">Classe ISO</label>
                <select
                  id="cfg-mat-iso"
                  className="fld"
                  aria-label="Classe ISO"
                  value={newMatIso}
                  onChange={(e) => setNewMatIso(e.target.value as IsoClass)}
                >
                  <option value="P">P (Aço carbono / baixa liga)</option>
                  <option value="M">M (Inox)</option>
                  <option value="K">K (Ferro Fundido)</option>
                  <option value="N">N (Não ferrosos / Alumínio)</option>
                  <option value="S">S (Superligas / Titânio)</option>
                  <option value="H">H (Aços endurecidos)</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="cfg-mat-kc" className="lbl">Força específica (kc1.1) N/mm²</label>
                <input
                  id="cfg-mat-kc"
                  type="number"
                  className="fld num"
                  aria-label="Força específica (kc1.1)"
                  placeholder="Ex: 1500"
                  value={newMatKc}
                  onChange={(e) => setNewMatKc(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="cfg-mat-mc" className="lbl">Expoente Kienzle (mc)</label>
                <input
                  id="cfg-mat-mc"
                  type="number"
                  step="0.01"
                  className="fld num"
                  aria-label="Expoente Kienzle (mc)"
                  placeholder="Ex: 0.21"
                  value={newMatMc}
                  onChange={(e) => setNewMatMc(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="cfg-mat-vc" className="lbl">Velocidade de partida (vc) m/min</label>
                <input
                  id="cfg-mat-vc"
                  type="number"
                  className="fld num"
                  aria-label="Velocidade de partida (vc)"
                  placeholder="Ex: 140"
                  value={newMatVc}
                  onChange={(e) => setNewMatVc(e.target.value)}
                />
              </div>
            </div>
            <div className="cap">
              Se uma das cinco ficar em branco, o material existe e fica na lista; ao ser escolhido no cálculo, a grandeza vazia vira campo obrigatório vazio — nada trava. Material criado não tem valor de fábrica: editar de novo é o caminho de volta.
            </div>
            <div className="acts">
              <button
                type="submit"
                className="btn-primary"
                aria-label="Cadastrar material"
                onClick={handleCreateMaterial}
              >
                + Cadastrar Material
              </button>
              <button type="button" className="btn-undo" onClick={() => setNewMatOpen(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </div>

        {/* LISTAGEM DE MATERIAIS */}
        <div className="lista-cfg">
          {materials.map((m) => {
            const factoryOrig = FACTORY_MATERIALS.find(f => f.id === m.id);
            const isModifiedFactory = factoryOrig && (
              factoryOrig.kc1_1 !== m.kc1_1 ||
              factoryOrig.mc !== m.mc ||
              factoryOrig.vcReference !== m.vcReference ||
              factoryOrig.isoClass !== m.isoClass
            );
            const isOperatorCreated = !factoryOrig;
            const drawerId = `mat-${m.id}`;
            const isOpen = !!openDrawers[drawerId];

            return (
              <div key={m.id} className="drawer">
                <button
                  type="button"
                  className="dtrigger"
                  aria-expanded={isOpen}
                  onClick={() => toggleDrawer(drawerId)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="chevron">
                    <path d="M6 3.5 L11 8 L6 12.5"></path>
                  </svg>
                  <span className="item-nome">{m.name}</span>
                  <span className="dsum">classe {m.isoClass}</span>
                  {isModifiedFactory && (
                    <span className="tag tag-info">diferente de fábrica</span>
                  )}
                  {isOperatorCreated && (
                    <span className="tag tag-plain">criado pelo operador</span>
                  )}
                </button>

                {isOpen && (
                  <div className="form-panel">
                    <div className="form-grid">
                      <div className="field">
                        <span className="lbl">Classe ISO</span>
                        <select
                          className="fld"
                          value={m.isoClass}
                          onChange={(e) => handleSaveEditedMaterial({ ...m, isoClass: e.target.value as IsoClass })}
                        >
                          <option value="P">P</option>
                          <option value="M">M</option>
                          <option value="K">K</option>
                          <option value="N">N</option>
                          <option value="S">S</option>
                          <option value="H">H</option>
                        </select>
                      </div>

                      <div className="field">
                        <span className="lbl">Força específica de corte (kc1.1) N/mm²</span>
                        <input
                          type="number"
                          className="fld num"
                          value={m.kc1_1}
                          onChange={(e) => handleSaveEditedMaterial({ ...m, kc1_1: parseFloat(e.target.value) || 0 })}
                        />
                        {factoryOrig && factoryOrig.kc1_1 !== m.kc1_1 && (
                          <div className="revert-line">
                            <span className="marca-fabrica">fábrica: {factoryOrig.kc1_1} N/mm²</span>
                            <button
                              type="button"
                              className="btn-undo"
                              onClick={() => handleSaveEditedMaterial({ ...m, kc1_1: factoryOrig.kc1_1 })}
                            >
                              voltar ao valor de fábrica
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="field">
                        <span className="lbl">Expoente (mc)</span>
                        <input
                          type="number"
                          step="0.01"
                          className="fld num"
                          value={m.mc}
                          onChange={(e) => handleSaveEditedMaterial({ ...m, mc: parseFloat(e.target.value) || 0 })}
                        />
                        {factoryOrig && factoryOrig.mc !== m.mc && (
                          <div className="revert-line">
                            <span className="marca-fabrica">fábrica: {factoryOrig.mc}</span>
                            <button
                              type="button"
                              className="btn-undo"
                              onClick={() => handleSaveEditedMaterial({ ...m, mc: factoryOrig.mc })}
                            >
                              voltar ao valor de fábrica
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="field">
                        <span className="lbl">Velocidade de corte ref (vc) m/min</span>
                        <input
                          type="number"
                          className="fld num"
                          value={m.vcReference}
                          onChange={(e) => handleSaveEditedMaterial({ ...m, vcReference: parseFloat(e.target.value) || 0 })}
                        />
                        {factoryOrig && factoryOrig.vcReference !== m.vcReference && (
                          <div className="revert-line">
                            <span className="marca-fabrica">fábrica: {factoryOrig.vcReference} m/min</span>
                            <button
                              type="button"
                              className="btn-undo"
                              onClick={() => handleSaveEditedMaterial({ ...m, vcReference: factoryOrig.vcReference })}
                            >
                              voltar ao valor de fábrica
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Botão de reverter material inteiro de fábrica */}
                    {isModifiedFactory && (
                      <div className="revert-line" style={{ marginTop: '10px' }}>
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => handleResetMaterial(m.id, m.name)}
                        >
                          Voltar todo o material ao valor de fábrica
                        </button>
                      </div>
                    )}

                    {/* Excluir material criado pelo operador */}
                    {isOperatorCreated && (
                      <div className="danger-zone">
                        {confirmDeleteMatId === m.id ? (
                          <div className="danger-zone confirmando">
                            <span className="cap" style={{ color: 'var(--st-crit-ink)', fontWeight: 700 }}>
                              Confirmar exclusão de &quot;{m.name}&quot;? Esta ação não tem desfazer.
                            </span>
                            <div className="acts">
                              <button
                                type="button"
                                className="btn-danger"
                                onClick={() => handleDeleteCustomMaterial(m.id, m.name)}
                              >
                                Sim, apagar material
                              </button>
                              <button
                                type="button"
                                className="btn-undo"
                                onClick={() => setConfirmDeleteMatId(null)}
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn-undo"
                            style={{ color: 'var(--st-crit-ink)' }}
                            onClick={() => setConfirmDeleteMatId(m.id)}
                          >
                            Apagar material
                          </button>
                        )}
                        <span className="cap">
                          Criado pelo operador — não há valor de fábrica para onde voltar. Apagar pede uma confirmação simples e não tem desfazer.
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* COMANDO ÚNICO DE VOLTAR TODOS OS MATERIAIS */}
        <div style={{ marginTop: '14px' }}>
          <button
            type="button"
            className="linkrow"
            onClick={handleResetAllMaterials}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12a8 8 0 1 0 2.4-5.7"></path>
              <path d="M4 4.5V10h5.5"></path>
            </svg>
            <span>Voltar todos os materiais ao valor de fábrica</span>
          </button>
          <div className="drawer" style={{ marginTop: '8px' }}>
            <button
              type="button"
              className="dtrigger"
              aria-expanded={!!openDrawers['note-revert-all']}
              onClick={() => toggleDrawer('note-revert-all')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="chevron">
                <path d="M6 3.5 L11 8 L6 12.5"></path>
              </svg>
              <span className="dhint">o que &quot;voltar todos ao valor de fábrica&quot; afeta</span>
            </button>
            {openDrawers['note-revert-all'] && (
              <div className="dbody dbody--col">
                <div className="prose">
                  Afeta só os materiais de partida. Material criado pelo operador não tem valor de fábrica e não é tocado.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= BLOCO 2 — FERRAMENTAS (escopo §4) ================= */}
      <div className="card">
        <div className="bhead">
          <div className="lbl" style={{ flexGrow: 1 }}>Ferramentas</div>
          <span className="bsum">{tools.length} cadastradas</span>
        </div>
        <hr className="sep" />

        {/* GAVETA EXPLICATIVA FERRAMENTAS */}
        <div className="drawer">
          <button
            type="button"
            className="dtrigger"
            aria-expanded={!!openDrawers['note-fer']}
            onClick={() => toggleDrawer('note-fer')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="chevron">
              <path d="M6 3.5 L11 8 L6 12.5"></path>
            </svg>
            <span className="dhint">a lista é atalho, não pré-requisito · onde fica o balanço (L)</span>
          </button>
          {openDrawers['note-fer'] && (
            <div className="dbody dbody--col">
              <div className="prose">
                A lista é um atalho: no cálculo você escolhe uma ferramenta pronta em vez de reescolher a geometria e redigitar tudo. Sem nenhuma cadastrada, o cálculo continua pela escolha direta da geometria — a lista nunca é pré-requisito. O balanço (L) não fica aqui: ele muda a cada montagem e continua sendo campo do cálculo.
              </div>
            </div>
          )}
        </div>

        {/* ADICIONAR FERRAMENTA — GAVETA RECOLHIDA */}
        <div className="drawer">
          <button
            type="button"
            className="dtrigger"
            aria-expanded={newToolOpen}
            onClick={() => setNewToolOpen(!newToolOpen)}
          >
            <span className="plus-sign">+</span>
            <span className="lbl" style={{ flex: 'none' }}>Adicionar ferramenta</span>
            <span className="dhint">uma das 17 geometrias · os campos mudam conforme a geometria</span>
          </button>
          {newToolOpen && (
            <form onSubmit={handleCreateTool} className="form-panel">
              <div className="form-grid">
                <div className="field wide" style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="cfg-tool-geom" className="lbl">Geometria</label>
                  <select
                    id="cfg-tool-geom"
                    className="fld"
                    value={newToolGeomId}
                    onChange={(e) => {
                      setNewToolGeomId(e.target.value);
                      const g = FACTORY_TOOLS.find(t => t.id === e.target.value);
                      if (g && g.substrates[0] && !g.substrates.includes(newToolSubstrate)) {
                        setNewToolSubstrate(g.substrates[0]);
                      }
                    }}
                  >
                    {FACTORY_TOOLS.map(t => (
                      <option key={t.id} value={t.id}>{t.name} — {t.family.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label className="lbl">Substrato</label>
                  <div className="seg">
                    {selectedGeom.substrates.map(sub => (
                      <button
                        key={sub}
                        type="button"
                        className={newToolSubstrate === sub ? 'on' : ''}
                        onClick={() => setNewToolSubstrate(sub)}
                      >
                        {sub === 'MD' ? 'Metal duro (MD)' : 'Aço rápido ao cobalto (HSS-Co)'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="cfg-tool-name" className="lbl">Apelido da ferramenta</label>
                  <input
                    id="cfg-tool-name"
                    type="text"
                    className="fld"
                    placeholder="o nome que você reconhece na lista"
                    value={newToolName}
                    onChange={(e) => setNewToolName(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label htmlFor="cfg-tool-d" className="lbl">Diâmetro da ferramenta (D) mm</label>
                  <input
                    id="cfg-tool-d"
                    type="number"
                    step="0.1"
                    className="fld num"
                    placeholder="Ex: 10"
                    value={newToolD}
                    onChange={(e) => setNewToolD(e.target.value)}
                  />
                </div>

                {selectedGeom.family === 'fresar' && (
                  <div className="field">
                    <label htmlFor="cfg-tool-z" className="lbl">Número de arestas (Z)</label>
                    <input
                      id="cfg-tool-z"
                      type="number"
                      className="fld num"
                      placeholder={selectedGeom.defaultZ ? String(selectedGeom.defaultZ) : '4'}
                      value={newToolZ}
                      onChange={(e) => setNewToolZ(e.target.value)}
                    />
                  </div>
                )}

                {selectedGeom.geometryType === 'toroidal' && (
                  <div className="field">
                    <label htmlFor="cfg-tool-r" className="lbl">Raio de canto (r) mm</label>
                    <input
                      id="cfg-tool-r"
                      type="number"
                      step="0.1"
                      className="fld num"
                      placeholder="1.0"
                      value={newToolR}
                      onChange={(e) => setNewToolR(e.target.value)}
                    />
                  </div>
                )}

                {(selectedGeom.geometryType === 'faceador' || selectedGeom.geometryType === 'alto-avanco') && (
                  <div className="field">
                    <label htmlFor="cfg-tool-kappa" className="lbl">Ângulo de posição (κ) graus</label>
                    <input
                      id="cfg-tool-kappa"
                      type="number"
                      className="fld num"
                      placeholder="45"
                      value={newToolKappa}
                      onChange={(e) => setNewToolKappa(e.target.value)}
                    />
                  </div>
                )}

                {selectedGeom.family === 'furar' && (
                  <div className="field">
                    <label htmlFor="cfg-tool-angle" className="lbl">Ângulo de ponta</label>
                    <input
                      id="cfg-tool-angle"
                      type="number"
                      className="fld num"
                      placeholder={newToolSubstrate === 'HSS-Co' ? '118' : '140'}
                      value={newToolPointAngle}
                      onChange={(e) => setNewToolPointAngle(e.target.value)}
                    />
                  </div>
                )}

                {selectedGeom.family === 'roscar' && (
                  <div className="field">
                    <label htmlFor="cfg-tool-pitch" className="lbl">Passo da rosca (P) mm</label>
                    <input
                      id="cfg-tool-pitch"
                      type="number"
                      step="0.05"
                      className="fld num"
                      placeholder="1.25"
                      value={newToolPitch}
                      onChange={(e) => setNewToolPitch(e.target.value)}
                    />
                  </div>
                )}

                <div className="field">
                  <label htmlFor="cfg-tool-lc" className="lbl">Comprimento de aresta (Lc) mm · opcional</label>
                  <input
                    id="cfg-tool-lc"
                    type="number"
                    className="fld num"
                    placeholder="—"
                    value={newToolLc}
                    onChange={(e) => setNewToolLc(e.target.value)}
                  />
                </div>
              </div>

              <div className="cap">
                Atributo que a geometria não tem simplesmente não aparece — nunca desabilitado. Ferramenta com diâmetro faltando é aceita e marcada como incompleta.
              </div>
              <div className="acts">
                <button type="submit" className="btn-primary">Adicionar ferramenta</button>
                <button type="button" className="btn-undo" onClick={() => setNewToolOpen(false)}>Cancelar</button>
              </div>
            </form>
          )}
        </div>

        {/* LISTAGEM DE FERRAMENTAS */}
        <div className="lista-cfg">
          {tools.length === 0 ? (
            <div className="estado-vazio">
              <span style={{ fontWeight: 700, color: 'var(--tx-1)' }}>Nenhuma ferramenta cadastrada</span>
              <span className="cap">
                A lista é um atalho: no cálculo você escolhe uma ferramenta pronta em vez de reescolher a geometria e redigitar tudo. Sem nenhuma cadastrada, o cálculo continua pela escolha direta da geometria — a lista nunca é pré-requisito.
              </span>
            </div>
          ) : (
            tools.map((t) => {
              const drawerId = `tool-${t.id}`;
              const isOpen = !!openDrawers[drawerId];
              const geom = FACTORY_TOOLS.find(g => g.id === t.geometryId || g.geometryType === t.geometryType);

              return (
                <div key={t.id} className="drawer">
                  <button
                    type="button"
                    className="dtrigger"
                    aria-expanded={isOpen}
                    onClick={() => toggleDrawer(drawerId)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="chevron">
                      <path d="M6 3.5 L11 8 L6 12.5"></path>
                    </svg>
                    <span className="item-nome">{t.name}</span>
                    <span className="dsum">
                      {geom ? geom.name : t.geometryType} · Ø{t.D || '—'} · {t.substrate === 'MD' ? 'metal duro' : 'aço rápido'}
                    </span>
                    {t.isIncomplete && (
                      <span className="tag tag-crit">incompleta — diâmetro da ferramenta (D) vazio</span>
                    )}
                  </button>

                  {isOpen && (
                    <div className="form-panel">
                      <div className="form-grid">
                        <div className="field">
                          <label className="lbl">Geometria</label>
                          <div className="valor-fixo">{geom ? geom.name : t.geometryType} ({t.family.toUpperCase()})</div>
                        </div>

                        <div className="field">
                          <label className="lbl">Substrato</label>
                          <div className="valor-fixo">{t.substrate === 'MD' ? 'Metal duro (MD)' : 'Aço rápido ao cobalto (HSS-Co)'}</div>
                        </div>

                        <div className="field">
                          <label className="lbl">Diâmetro da ferramenta (D)</label>
                          <div className="fbox">
                            <span className="num fval">{t.D || '—'}</span>
                            <span className="funit">mm</span>
                          </div>
                        </div>

                        {t.Z !== undefined && (
                          <div className="field">
                            <label className="lbl">Número de arestas (Z)</label>
                            <div className="fbox"><span className="num fval">{t.Z}</span></div>
                          </div>
                        )}

                        {t.r !== undefined && (
                          <div className="field">
                            <label className="lbl">Raio de canto (r)</label>
                            <div className="fbox"><span className="num fval">{t.r}</span><span className="funit">mm</span></div>
                          </div>
                        )}

                        {t.kappa !== undefined && (
                          <div className="field">
                            <label className="lbl">Ângulo de posição (κ)</label>
                            <div className="fbox"><span className="num fval">{t.kappa}°</span></div>
                          </div>
                        )}

                        {t.pointAngle !== undefined && (
                          <div className="field">
                            <label className="lbl">Ângulo de ponta</label>
                            <div className="fbox"><span className="num fval">{t.pointAngle}°</span></div>
                          </div>
                        )}

                        {t.pitch !== undefined && (
                          <div className="field">
                            <label className="lbl">Passo (P)</label>
                            <div className="fbox"><span className="num fval">{t.pitch}</span><span className="funit">mm</span></div>
                          </div>
                        )}

                        {t.Lc !== undefined && (
                          <div className="field">
                            <label className="lbl">Comprimento de aresta (Lc)</label>
                            <div className="fbox"><span className="num fval">{t.Lc}</span><span className="funit">mm</span></div>
                          </div>
                        )}
                      </div>

                      <div className="danger-zone">
                        {confirmDeleteToolId === t.id ? (
                          <div className="danger-zone confirmando">
                            <span className="cap" style={{ color: 'var(--st-crit-ink)', fontWeight: 700 }}>
                              Confirmar exclusão de &quot;{t.name}&quot;? Esta ação é irreversível.
                            </span>
                            <div className="acts">
                              <button
                                type="button"
                                className="btn-danger"
                                onClick={() => handleDeleteTool(t.id, t.name)}
                              >
                                Sim, apagar ferramenta
                              </button>
                              <button
                                type="button"
                                className="btn-undo"
                                onClick={() => setConfirmDeleteToolId(null)}
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn-undo"
                            style={{ color: 'var(--st-crit-ink)' }}
                            onClick={() => setConfirmDeleteToolId(t.id)}
                          >
                            Apagar ferramenta
                          </button>
                        )}
                        <span className="cap">
                          Irreversível. Apagar pede uma confirmação simples e não tem desfazer. Um cálculo em andamento que use esta ferramenta permanece na tela com os valores que tinha.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ================= BLOCO 3 — MARGEM DE SEGURANÇA (escopo §10) ================= */}
      <div className="card">
        <div className="bhead">
          <div className="lbl" style={{ flexGrow: 1 }}>Margem de segurança</div>
          <span className="bsum">{config.safetyMargin} %</span>
        </div>
        <hr className="sep" />

        <div className="drawer">
          <button
            type="button"
            className="dtrigger"
            aria-expanded={!!openDrawers['note-marg']}
            onClick={() => toggleDrawer('note-marg')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="chevron">
              <path d="M6 3.5 L11 8 L6 12.5"></path>
            </svg>
            <span className="dhint">por que a margem fica aqui e não no cálculo</span>
          </button>
          {openDrawers['note-marg'] && (
            <div className="dbody dbody--col">
              <div className="prose">
                Configuração persistente — vale para todos os cálculos até você mudar de novo. Não é campo por cálculo.
              </div>
            </div>
          )}
        </div>

        <div className="field" style={{ maxWidth: '420px', marginTop: '8px' }}>
          <label htmlFor="cfg-margin" className="lbl">Margem de segurança (% do calculado)</label>
          <div className="stepline">
            <button
              type="button"
              className="step"
              aria-label="Diminuir margem (−5%)"
              onClick={() => handleMarginStep(-5)}
            >
              −
            </button>
            <div className="stepval">
              <input
                id="cfg-margin"
                type="number"
                className="stepnum fin num"
                aria-label="Margem de segurança (% do calculado)"
                style={{ width: '80px', textAlign: 'center', height: '44px', border: '1px solid var(--border-control)', borderRadius: '4px' }}
                value={config.safetyMargin}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 100;
                  const next = { ...configRef.current, safetyMargin: val };
                  configRef.current = next;
                  setConfig(next);
                  setSafetyMargin(val);
                }}
              />
              <span className="funit">%</span>
            </div>
            <button
              type="button"
              className="step"
              aria-label="Aumentar margem (+5%)"
              onClick={() => handleMarginStep(5)}
            >
              +
            </button>
          </div>

          {config.safetyMargin !== 100 && (
            <div className="revert-line">
              <span className="tag tag-info">diferente do padrão · padrão 100 %</span>
              <button
                type="button"
                className="btn-undo"
                onClick={handleResetMargin}
              >
                voltar ao padrão (100 %)
              </button>
            </div>
          )}
        </div>

        <div className="drawer" style={{ maxWidth: '420px', marginTop: '8px' }}>
          <button
            type="button"
            className="dtrigger"
            aria-expanded={!!openDrawers['note-marg-step']}
            onClick={() => toggleDrawer('note-marg-step')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="chevron">
              <path d="M6 3.5 L11 8 L6 12.5"></path>
            </svg>
            <span className="dhint">o que 100 % significa, o passo e o que acontece acima</span>
          </button>
          {openDrawers['note-marg-step'] && (
            <div className="dbody dbody--col">
              <div className="prose">
                Em 100 % a tela mostra o resultado exatamente como o cálculo entrega. Passo de 5 pontos percentuais.
              </div>
              <div className="prose" style={{ color: 'var(--tx-3)', marginTop: '4px' }}>
                Acima de 100 % também é aceito — a tela passa a mostrar mais que o calculado. Nada trava: quem decide é você.
              </div>
            </div>
          )}
        </div>

        <div className="drawer" style={{ marginTop: '8px' }}>
          <button
            type="button"
            className="dtrigger"
            aria-expanded={!!openDrawers['marg-ctx']}
            onClick={() => toggleDrawer('marg-ctx')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="chevron">
              <path d="M6 3.5 L11 8 L6 12.5"></path>
            </svg>
            <span className="dhint">o que a margem de segurança faz</span>
          </button>
          {openDrawers['marg-ctx'] && (
            <div className="dbody dbody--col">
              <div className="prose">
                A margem de segurança é a lente pela qual você lê os resultados. A 85 %, a tela mostra sempre 85 % do que o cálculo entregou para a rotação (n), a velocidade de avanço da mesa (vf), a velocidade de corte real (vc), a potência de corte (Pc), o torque (Mc) e a taxa de remoção de material (MRR).
              </div>
              <div className="prose" style={{ color: 'var(--tx-3)', marginTop: '4px' }}>
                Não muda a espessura de cavaco (hex), a relação balanço/diâmetro (L/D), o afinamento de cavaco (CTF), o alerta nem o nível de segurança — esses seguem o valor real, porque é sobre o valor real que o alerta fala.
              </div>
              <div className="prose" style={{ color: 'var(--tx-3)', marginTop: '4px' }}>
                Também não mexe em nada que você digitou: profundidade de corte (ap), penetração de trabalho (ae), balanço (L), número de arestas (Z) e os dados do material ficam como estão.
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: '16px' }}>
          <button
            type="button"
            className="btn-primary"
            aria-label="Salvar configurações"
            onClick={handleSaveAllConfig}
          >
            Salvar Configurações
          </button>
        </div>
      </div>

      {/* ================= BLOCO 4 — BROCA DE AÇO RÁPIDO — CÁLCULO DE PARTIDA (escopo §10) ================= */}
      <div className="card">
        <div className="bhead">
          <div className="lbl" style={{ flexGrow: 1 }}>Broca de aço rápido — cálculo de partida</div>
          <span className="bsum">
            {config.hssFeedPercent} % · {config.hssPeckDivisor} · {config.hssPeckCapMm} mm
          </span>
        </div>
        <hr className="sep" />

        <div className="drawer">
          <button
            type="button"
            className="dtrigger"
            aria-expanded={!!openDrawers['note-hss']}
            onClick={() => toggleDrawer('note-hss')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="chevron">
              <path d="M6 3.5 L11 8 L6 12.5"></path>
            </svg>
            <span className="dhint">por que estes três ficam aqui e não no cálculo</span>
          </button>
          {openDrawers['note-hss'] && (
            <div className="dbody dbody--col">
              <div className="prose">
                São o jeito da oficina de furar com broca de aço rápido — valem para todos os cálculos até você mudar de novo. Não são campo por furo.
              </div>
            </div>
          )}
        </div>

        <div className="grid-cfg-steps" style={{ marginTop: '12px' }}>
          {/* 1. Percentual do avanço */}
          <div className="field">
            <label htmlFor="cfg-hss-feed" className="lbl">Percentual do avanço (HSS) %</label>
            <div className="stepline">
              <button
                type="button"
                className="step"
                aria-label="Diminuir o percentual do avanço em 1 ponto percentual"
                onClick={() => handleHssStep('hssFeedPercent', -1)}
              >
                −
              </button>
              <div className="stepval">
                <input
                  id="cfg-hss-feed"
                  type="number"
                  className="stepnum fin num"
                  aria-label="Percentual do avanço (HSS) %"
                  style={{ width: '70px', textAlign: 'center', height: '44px', border: '1px solid var(--border-control)', borderRadius: '4px' }}
                  value={config.hssFeedPercent}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 10;
                    setConfig(prev => ({ ...prev, hssFeedPercent: val }));
                  }}
                />
                <span className="funit">%</span>
              </div>
              <button
                type="button"
                className="step"
                aria-label="Aumentar o percentual do avanço em 1 ponto percentual"
                onClick={() => handleHssStep('hssFeedPercent', 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* 2. Divisor do incremento */}
          <div className="field">
            <label htmlFor="cfg-hss-peck-div" className="lbl">Divisor do pica-pau (D / X)</label>
            <div className="stepline">
              <button
                type="button"
                className="step"
                aria-label="Diminuir o divisor do incremento em 1"
                onClick={() => handleHssStep('hssPeckDivisor', -1)}
              >
                −
              </button>
              <div className="stepval">
                <input
                  id="cfg-hss-peck-div"
                  type="number"
                  className="stepnum fin num"
                  aria-label="Divisor do pica-pau (D / X)"
                  style={{ width: '70px', textAlign: 'center', height: '44px', border: '1px solid var(--border-control)', borderRadius: '4px' }}
                  value={config.hssPeckDivisor}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 25;
                    setConfig(prev => ({ ...prev, hssPeckDivisor: val }));
                  }}
                />
              </div>
              <button
                type="button"
                className="step"
                aria-label="Aumentar o divisor do incremento em 1"
                onClick={() => handleHssStep('hssPeckDivisor', 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* 3. Teto do incremento */}
          <div className="field">
            <label htmlFor="cfg-hss-peck-cap" className="lbl">Teto do incremento (mm)</label>
            <div className="stepline">
              <button
                type="button"
                className="step"
                aria-label="Diminuir teto (−0,1 mm)"
                onClick={() => handleHssStep('hssPeckCapMm', -0.1)}
              >
                −
              </button>
              <div className="stepval">
                <input
                  id="cfg-hss-peck-cap"
                  type="number"
                  step="0.1"
                  className="stepnum fin num"
                  style={{ width: '70px', textAlign: 'center', height: '44px', border: '1px solid var(--border-control)', borderRadius: '4px' }}
                  value={config.hssPeckCapMm}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0.8;
                    setConfig(prev => ({ ...prev, hssPeckCapMm: val }));
                  }}
                />
                <span className="funit">mm</span>
              </div>
              <button
                type="button"
                className="step"
                aria-label="Aumentar teto (+0,1 mm)"
                onClick={() => handleHssStep('hssPeckCapMm', 0.1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {isHssDifferent && (
          <div className="revert-line" style={{ marginTop: '12px' }}>
            <span className="tag tag-info">diferente do padrão · padrão 10 % · 25 · 0,8 mm</span>
            <button
              type="button"
              className="btn-undo"
              onClick={handleResetHss}
            >
              voltar aos padrões da oficina
            </button>
          </div>
        )}

        <div className="drawer" style={{ marginTop: '8px' }}>
          <button
            type="button"
            className="dtrigger"
            aria-expanded={!!openDrawers['hss-ctx']}
            onClick={() => toggleDrawer('hss-ctx')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="chevron">
              <path d="M6 3.5 L11 8 L6 12.5"></path>
            </svg>
            <span className="dhint">o que cada um dos três faz</span>
          </button>
          {openDrawers['hss-ctx'] && (
            <div className="dbody dbody--col">
              <div className="prose">
                O percentual do avanço tira a velocidade de avanço da mesa (vf) da rotação: a 10 %, uma rotação de 508 rpm vira 50 mm/min.
              </div>
              <div className="prose" style={{ marginTop: '4px' }}>
                O divisor do incremento tira o passo do pica-pau do diâmetro: a 25, uma broca de Ø10 sai do furo a cada 0,4 mm. O teto para esse crescimento — a partir de Ø20 o incremento fica em 0,8 mm, por mais grossa que seja a broca.
              </div>
              <div className="prose" style={{ color: 'var(--tx-3)', marginTop: '4px' }}>
                Juntos, com Ø10 e velocidade de corte (vc) de 16 m/min, os três padrões devolvem 508 rpm, 50 mm/min e incremento de 0,4 mm.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
