# Walkthrough — Revisão e Alinhamento Canônico do Projeto Fenix

Concluímos a revisão completa e o alinhamento arquitetural do projeto Fenix, implementando estritamente os comportamentos acordados para o motor de cálculo, painel interativo e configurações, com 100% de aderência às especificações canônicas (`CANONICO_MOTOR_DE_CALCULO.md`, `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md`, `ESCOPO_CONFIGURACOES.md`, `GABARITO_PROTOTIPO.md` e regras R1 a R15).

---

## 1. Princípios e Comportamentos Canônicos Implementados

### 1.1 Estado Inicial do Painel — Painel Vazio (Cenário A)
- **Estrutura Visual Completa e Normal**: O painel mantém rigorosamente todas as suas zonas (Z1 a Z7) sem criar telas alternativas, sem mensagens invasivas ou cards de boas-vindas substituindo os resultados.
- **Valores Zerados**: Ao abrir o sistema ou alternar para o estado inicial zerado, nenhum material ou ferramenta fica pré-selecionado (`Nenhum material selecionado`, `Nenhuma ferramenta selecionada`), todos os campos de montagem iniciam vazios (`''`) e os heróis e indicadores numéricos de resultado exibem `0`.
- **Botão Calcular Desabilitado**: O botão principal **Calcular** nasce desabilitado com o atributo `disabled`, a classe canônica `.btn-cta-disabled` e feedback visual indicando que os requisitos mínimos precisam ser preenchidos.

### 1.2 Condições para Habilitar o Cálculo (Cenários B e C)
- Validação estrita dos requisitos mínimos de cada família operacional:
  - **Fresar**: Diâmetro $D > 0$, Balanço $L > 0$, Arestas $Z \ge 1$, Profundidade $a_p > 0$, Penetração $a_e > 0$, Velocidade $v_c > 0$, Avanço por dente $f_z > 0$ e Raio $r > 0$ (se geometria Toroidal).
  - **Furar**: Diâmetro $D > 0$, Ângulo de ponta $> 0$, Balanço $L > 0$, Velocidade $v_c > 0$, Avanço por rotação $f_n > 0$.
  - **Roscar**: Tipo de Rosca métrica selecionada ($P > 0, D > 0$), Balanço $L > 0$, Velocidade $v_c > 0$.
  - **Mandrilar**: Diâmetro inicial $D_i > 0$, Diâmetro final $D_f > D_i$, Raio de ponta $r_\epsilon > 0$, Balanço $L > 0$, Velocidade $v_c > 0$, Avanço por rotação $f_n > 0$.
- O botão **Calcular** habilita automaticamente assim que o último requisito da família é preenchido.

### 1.3 Seleção de Ferramenta da Oficina (Cenário I)
- Ao selecionar uma ferramenta cadastrada da oficina, o sistema carrega os metadados e a geometria vinculada, **sem impor valores arbitrários de corte** ($v_c, f_z, a_p$, etc.).
- Se houver requisitos operacionais pendentes, o botão Calcular permanece desabilitado.

### 1.4 Atualização Dinâmica e Interdependência (Cenários D, E, F, G, H)
- **Modelo Vivo em Tempo Real**: Após o primeiro cálculo, o painel opera em sincronia dinâmica contínua:
  - Alteração de $n$ (via step $\pm$ do hero card) $\longleftrightarrow$ recalcula $v_c$, $v_f$, $P_c$, $M_c$ e $Q$.
  - Alteração de $v_c$ $\longleftrightarrow$ recalcula instantaneamente a rotação $n$ e o avanço de mesa $v_f$.
  - Alteração de $v_f$ $\longleftrightarrow$ recalcula $f_z$ (em fresar) ou $f_n$ (em furar e mandrilar).
  - Alteração de $a_p$ ou $a_e$ $\longleftrightarrow$ recalcula o volume de cavaco $Q$, potência de corte $P_c$ e torque $M_c$, mantendo $n$ e $v_f$.
  - **Furação**: Diâmetro $D$ recalcula rotação $n$, passo pica-pau $Q$ e avanço $v_f$ em tempo real.
  - **Roscamento**: Velocidade de avanço $v_f$ é travada rigorosamente na cinemática com o passo da rosca ($v_f = n \cdot P$), sem permitir ajuste de avanço desvinculado.
  - **Variáveis Fixas Mantidas**: Coeficientes de Kienzle ($k_{c1.1}, m_c$), número de arestas $Z$ e o modelo de corte são preservados durante as atualizações.

---

## 2. Arquivos Modificados e Melhorias Realizadas

### [prototipo.css](file:///c:/Users/USUARIO/Desktop/Projetos/Fenix/Docs_inicial/construcao/prototipo/css/prototipo.css)
- Implementada estilização canônica para `.btn-cta:disabled` e `.btn-cta.btn-cta-disabled` (`cursor: not-allowed; opacity: 0.45; pointer-events: auto;`), mantendo a identidade visual sem efeito hover ativo quando desabilitado.

### [index.html](file:///c:/Users/USUARIO/Desktop/Projetos/Fenix/Docs_inicial/construcao/prototipo/index.html)
- Adicionada opção padrão no seletor da barra de testes: `<option value="vazio" selected>Estado Inicial Zerado: Painel Vazio (Cenário A)</option>`.

### [app.js](file:///c:/Users/USUARIO/Desktop/Projetos/Fenix/Docs_inicial/construcao/prototipo/js/app.js)
1. **Função `parseBrNum`**: Aperfeiçoada para tratar adequadamente números nativos de JavaScript e strings com vírgula decimal ou ponto decimal sem remover pontos acidentalmente.
2. **Função `valStr`**: Criada para formatação segura de inputs vazios (`''`), evitando a emissão de `NaN` nos campos numéricos no estado zerado.
3. **Estado `state`**: Configurado com `isCalculated: false`, `activeScenarioKey: ''` e todos os campos das 4 famílias inicializados como strings vazias (`''`).
4. **Validação e Motor de Cálculo**:
   - `validarRequisitosCalculo(fam)`: Validação rigorosa por família.
   - `calcularResultados(fam)`: Retorna estrutura completa com valores numéricos em `0` quando `!state.isCalculated` ou `!valido`. Quando calculado, executa a física canônica (Kienzle, CTF, $h_m, Q, P_c, M_c$).
5. **Formulário da Coluna Esquerda (`renderConfigForm` e `bindInputs`)**:
   - Opções vazias padrão nos selects de materiais e ferramentas.
   - No campo `fn` da furação: controle interativo com step controls e digitação para permitir ajuste fino imediato.
   - `bindField` conectando `input` e `change` diretamente ao `recalcularDinamico(key)` quando calculado, e ao `atualizarEstadoBotaoCalcular(fam)` quando pendente.
   - `setupStepControls` disparando eventos nativos sem sobrescrever os listeners dos inputs.
6. **Hero Cards Z4 e Z1**:
   - Steps $\pm$ do hero card desabilitados no estado não calculado e vinculados a `recalcularDinamico` no estado calculado.
   - Z1 tratando com segurança quando nenhum material ou ferramenta estiver selecionado.
7. **Inicialização (`init`) e `loadScenario`**:
   - Inicia por padrão no Cenário A (`loadScenario('vazio')`).
   - Suporte completo a alternar entre Cenário A e os cenários pré-configurados da Specification Sheet.

---

## 3. Validação e Verificação Automatizada

Desenvolvemos e executamos uma suíte de testes unitários e de integração (`test_suite_dinamica.js`) que cobriu 31 asserções críticas em ambiente Node.js:

```
====================================================
INICIANDO BATERIA DE TESTES CANÔNICOS (CENÁRIOS A a I)
====================================================

--- Teste 1: Cenário A (Estado Inicial Zerado / Painel Vazio) ---
  [PASS] Z1 exibe "Nenhum material selecionado"
  [PASS] Z1 exibe "Nenhuma ferramenta selecionada"
  [PASS] Botão Calcular inicia desabilitado (disabled=true)
  [PASS] Botão Calcular possui classe .btn-cta-disabled
  [PASS] Hero S (rotação) está presente na estrutura normal
  [PASS] Hero F (avanço) está presente na estrutura normal
  [PASS] Resultados principais exibem o valor numérico 0
  [PASS] Não há card invasivo de boas-vindas substituindo o painel normal

--- Teste 2: Cenários B e C (Requisitos Mínimos para Habilitar Cálculo) ---
  [PASS] Select de material possui evento onchange
  [PASS] Botão continua desabilitado após selecionar apenas material
  [PASS] Select de ferramenta possui evento onchange
  [PASS] Cenário I: Selecionar ferramenta NÃO preenche corte arbitrário; cálculo continua desabilitado
  [PASS] Botão continua desabilitado enquanto fz e r não estão preenchidos
  [PASS] Botão Calcular habilita após preenchimento completo de todos os requisitos mínimos
  [PASS] Classe .btn-cta-disabled é removida

--- Teste 3: Execução do Primeiro Cálculo ---
  [PASS] Hero S calculado corretamente para D10 vc140 (~4456 rpm)
  [PASS] Hero F calculado corretamente para 4 dentes e fz 0.060 (~1070 mm/min)

--- Teste 4: Fresamento - Atualização Dinâmica e Interdependência ---
  [PASS] Ao alterar vc para 180, rotação n recalcula dinamicamente para ~5730 rpm
  [PASS] Ao alterar vc para 180, avanço da mesa vf recalcula dinamicamente para ~1375 mm/min
  [PASS] Alteração de ap recalcula a taxa de remoção Q

--- Teste 5: Família Furar (Validação, Cálculo e Interdependência) ---
  [PASS] Furação: Rotação calculada para Broca D10 vc16 é 509 rpm
  [PASS] Furação: Avanço da mesa vf é 51 mm/min (n * fn)
  [PASS] Furação: Passo do pica-pau Q é 0,40 mm (D/25)
  [PASS] Furação: Reduzir broca para D8 recalcula rotação para 637 rpm dinamicamente

--- Teste 6: Família Roscar (Avanço travado no Passo P) ---
  [PASS] Roscar: Rotação para M8 vc140 é ~5.570 rpm
  [PASS] Roscar: Avanço vf é rigorosamente n * P = 5570 * 1.25 = 6.963 mm/min
  [PASS] Roscar: Exibe nota explicativa de avanço travado no passo

--- Teste 7: Família Mandrilar (Cálculo e Interdependência) ---
  [PASS] Mandrilar: Rotação calculada para Df20 vc140 é ~2.228 rpm
  [PASS] Mandrilar: Avanço vf é 2228 * 0.20 = 446 mm/min

--- Teste 8: Retorno ao Cenário Vazio ---
  [PASS] Retorno ao cenário vazio desabilita botão Calcular
  [PASS] Retorno ao cenário vazio zera todos os indicadores numéricos

====================================================
TODOS OS 31/31 TESTES FORAM EXECUTADOS COM SUCESSO!
====================================================
```

Executamos também a regressão completa da área de Configurações e separação de escopo (`test_suite.js`), confirmando que todo o fluxo permanece íntegro e em perfeito funcionamento.
