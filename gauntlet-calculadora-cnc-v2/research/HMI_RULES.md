# Diretrizes de HMI Industrial — ISA-101.01

> **Documento de Referência para o Construtor (Builder)**  
> **Fonte:** ISA-101.01 (Human-Machine Interfaces for Process Automation) & SPEC §2 / §12  
> **Princípio Central:** Interface industrial de alta frequência de uso no chão de fábrica — clara, previsível, sem ornamentos decorativos e operável com luvas.

---

## 1. Regras de Cor e Significado Visual

1. **Fundo Neutro e Claro:**
   - Usar fundo `#E8ECF4` (`--bg`) e superfície `#FFFFFF` (`--surface`).
   - Fundo neutro reduz fadiga sob luminárias industriais.

2. **Cor Reservada para Anomalia e Estado (Semáforo Único):**
   - **NUNCA** usar cor (verde, amarelo, vermelho, azul) como elemento decorativo ou em bordas de cartões neutros.
   - Cor é sinal operacional puro:
     - **Verde (`#1A7A3C` / bg `#E7F5EC`):** Condição segura e dentro dos limites nominais.
     - **Amarelo (`#97670A` / bg `#FBF1DC`):** Alerta de risco (vibração, desgaste acelerado, material estimado, $L/D > 3$).
     - **Vermelho (`#C0271E` / bg `#FCEBE9`):** Alerta crítico (sobrecarga de torque, deflexão alta, $L/D > 4$).
     - **Bloqueio / Vermelho Denso:** Condição fisicamente inviável ($L/D > 6$ em fresas, $L/D > 5$ em mandris, furo prévio menor que o mínimo).
     - **Azul (`#1D5BD6` / bg `#E9F0FE`):** Destaque de seleção ativa ou informação de procedência.

---

## 2. Alvos de Toque e Dimensões

Operação em terminal/tablet de chão de fábrica (com luva de proteção e em pé ao lado da máquina):
- **Alvo de toque mínimo:** $\ge 40\text{ px}$.
- **CTA Principal (Executar / Ação primária):** Altura fixa de `56px` (`--h-cta`), largura total ou destacada.
- **Botões de Formulário e Selects:** Altura fixa de `44px` (`--h-btn`).
- **Botões Fantasma e Ações Secundárias:** Altura mínima de `34px` (`--h-ghost`).

---

## 3. Tipografia e Hierarquia Visual

Restrição rigorosa a no máximo **4 tamanhos de fonte** em toda a interface:
1. **Destaque Dominante (Zona 4 - Resultados Principais):** `28px` / `32px` Bold em `IBM Plex Mono` (Rotação $n$ e Avanço $Vf$).
2. **Títulos e Cabeçalhos de Seção:** `15px` SemiBold em `IBM Plex Sans`.
3. **Texto de Rótulo e Inputs (Body):** `13px` Regular/SemiBold (Inputs em `IBM Plex Mono`, Rótulos em `IBM Plex Sans`).
4. **Unidades e Textos Secundários:** `11px` Regular em `IBM Plex Sans` / `IBM Plex Mono`.

---

## 4. Prevenção de Erros e Mensagens Acionáveis

1. **Alerta Nunca Trava a Tela:**
   - Se os parâmetros excederem os limites recomendados, o sistema exibe o aviso em amarelo/vermelho na **Zona 2**, mas o resultado numérico permanece visível.
2. **Correção Numérica Escrita:**
   - Todo alerta de risco deve incluir a ação exata por escrito (ex.: *"Atenção: L/D = 4.2. Reduza a profundidade ap para 1.5 mm ou utilize haste antivibratória"*).
3. **Estado Vazio Honesto:**
   - Antes de calcular ou quando um campo obrigatório estiver vazio, exibir traço (`—`), **NUNCA** exibir `0` ou `NaN` formatado como se fosse resultado válido.

---

## 5. Zonas Fixas do Painel de Resultado (ISA-101 / SPEC §12)

O painel de resultado deve manter sempre as 6 zonas no mesmo lugar, independentemente do tipo de ferramenta selecionado:

- **Zona 1 (Cabeçalho):** Especificação da peça, material, operação e nível de segurança atual.
- **Zona 2 (Linha de Alerta):** Mensagem de semáforo com instrução corretiva escrita em português.
- **Zona 3 (Resumo da Ferramenta):** Especificação compacta da geometria montada.
- **Zona 4 (Destaque Principal):** Rotação ($n$ em rpm) e Avanço ($Vf$ em mm/min) em tipografia dominante (`28-32px mono`).
- **Zona 5 (Indicadores):** Medidores de índice de saúde (0–100), taxa de remoção ($Q$), chips de $L/D$ e alertas de cavaco.
- **Zona 6 (Detalhes e Fórmulas):** Potência líquida ($Pc$), Torque ($Mc$), $Vc$ real e cartões expansíveis de fórmulas com a conta demonstrada.
