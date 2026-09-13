# Plano de correção do protótipo do painel — Fenix

**Criado em:** 30/08/2026 · **Fase:** correção do desenho (pós-F1, régua = `GABARITO_PROTOTIPO.md` v1.3)
**Autor:** executor delegado por fenix-2a.

> **Estado: EXECUTADO em 30/08/2026, uma folha por vez, com conferência do fenix-2a entre cada uma.**
> As cinco folhas foram reescritas e aprovadas; `Procedencia.dc.html` removida com `git rm`; efeitos
> colaterais resolvidos. Sem commit — o fenix-2a fecha o conjunto com o Mestre. Log na seção 9.

---

## 1. Contra o que o protótipo é medido agora

Três blocos de mudança, todos com decisão escrita do Mestre por trás:

| Bloco | Decisão | Efeito no desenho |
|---|---|---|
| **Procedência sai inteira** | commit `2783a6b` + `ESTADO_VARREDURA.md` | some marca de origem (`extrapolado` / `editado` / `manual` / `Informado` / `Partida`), some a fonte, some "de onde veio o número", some a margem `±15–25%`, some a tela `Detalhes e fórmulas`, some o sublinhado pontilhado que abria essa tela. `Procedencia.dc.html` deixa de existir |
| **Régua do design system** (D6–D9) | GABARITO §2.8 | D6 escala tipográfica `11·13·16` + `20·32` mono; D7 cada resultado em cartão próprio (2 altos com `−`/`+` 44px, 7–8 baixos); D8 milhar com ponto; D9 prosa nasce recolhida, só o alerta abre |
| **Revisão item a item** (D1–D12) | GABARITO §2.7 | D1 `ap` vira caixa simples; D2 editar material vai p/ Configurações; D4 trilha de posição relativa sai; D10 check ao calcular; D11 gaveta de instrução por parâmetro; D12 material criável (mora em Configurações) |

**Fora de escopo desta correção:** grade de 12 colunas e grade da Zona 5 (camada 2, veredito do Mestre
em F3 — GABARITO §3); tela "Configurações" (D2/D5/D12 — tarefa separada); qualquer edição de documento.

---

## 2. Mudanças transversais (valem para as 5 folhas que sobrevivem)

Aplicar uma vez, varrendo as cinco. Contam **1 item por folha** nas somas da seção 4.

| # | O que | Onde | Decisão |
|---|---|---|---|
| **T1** | Separador de milhar: `4 456` → `4.456`, `1 070` → `1.070`. O caractere hoje é espaço ASCII (`0x20`), confirmado por `od`. Decimal segue vírgula (`0,019`, `0,060`) — já correto | todo número ≥ 1000 exibido | D8 · DS §2.8 |
| **T2** | Remover as marcas de origem do texto: `extrapolado`, `editado`/`Editado`/`Extrapolado`, `Manual`, `Informado`, `Partida` (como rótulo de estado de campo). O comando único **"Voltar tudo ao valor de partida"** (§5.4/§8.1) **fica** | `.mark` ao lado de rótulos e nos cabeçalhos de contexto | GABARITO Q1-def.1, §2.7 D1, task |
| **T3** | Remover `±15–25%` e a frase "margem declarada do modelo" — do rodapé e de dentro de toda prosa. A linha fixa **"O sistema recomenda, o operador decide."** fica (MVP §7.8) | rodapé de cada folha + prosa de Z5 | task (procedência) |
| **T4** | Remover a mecânica "Detalhes e fórmulas": o gatilho/rodapé, a frase "Todo número sublinhado abre aqui", e a classe `.aud` (sublinhado pontilhado) de **todos** os números. Ver **Q-A** | `.aud`, blocos "Detalhes e fórmulas", refs "ver Detalhes e fórmulas" no alerta | task; `ESTADO_VARREDURA` ("fórmulas no código, invisíveis ao operador") |
| **T5** | Remover a **trilha**: CSS `.trk`, `.trk-seg`, `.trk-tick`, `.trk-thumb`, `.trk-hit`, `.valbtn`, e o texto de faixa recomendada ("faixa 84–196 m/min", "no ponto de partida", "abaixo do valor de partida (0,140)"). Cada controle de ajuste fino vira **caixa de digitar simples** (`.fbox`), rótulo + valor + unidade | Main / Tablet / Celular, bloco Ajuste fino | GABARITO §2.7 D4 (Q2 "remover do MVP") |
| **T6** | D6 — tirar tamanhos fora da escala: `font-size:12px` (`.bsum` e links de texto) → `11px`; `font-size:14px` (número do Z3) → `13px` ou `16px`. `gap:14px` (Celular L96) → `16px` | `:root`/CSS + estilos inline | GABARITO §2.8 D6 |

> **Decisão de execução (fenix-2a, opção A) — o valor de campo `.fval` fica `16px` mono nas 6 folhas.**
> O D6 fixa os **tamanhos** permitidos (`11·13·16` texto + `20·32` mono), não a família de cada
> tamanho. `16` está na lista; usá-lo em mono num valor numérico não cria tamanho novo, e mono em
> valor numérico é o que o design system manda. Trocar seria alteração visual não pedida em 6 folhas.
| **T7** | `:root` — acrescentar `--h-target:44px; --h-cta:56px` ao bloco pronto (hoje ausente nas 6 folhas; DS §3 já os traz). Usar `--h-cta` no botão Calcular e `--h-target` nos `−`/`+` de D7 | `<helmet>` `:root` de cada folha | DS §3; GABARITO §2.4 (meia cópia = falha A13) |
| **T8** | D10 — check ao calcular: confirmação visual curta de que o cálculo rodou (um *check* junto ao botão Calcular ou no topo da coluna de resultado). Estático no protótipo; a **forma** tem de estar lá | Main (real) + Estados (contrato) | GABARITO §2.7 D10; MVP §10.1 |

**Vocabulário:** `extrapolado` / `editado` / `manual` deixam de aparecer na tela. Passar essas três à
lista de proibidos do GABARITO §2.2 é **edição de documento** — fora desta rodada, fica registrado como
pendência para fenix-2a.

---

## 3. Folha por folha

Legenda: **SAI** remove · **ENTRA** cria · **REESCREVE** troca conteúdo. Linhas = arquivo atual.

### 3.1 `Main.dc.html` (referência do desenho)

| Ação | Linha(s) | O quê | Decisão |
|---|---|---|---|
| REESCREVE | 70–78 | Cabeçalho de contexto: **sai** `2 valores manuais` (L76) e `extrapolado` (L77); **fica** `kc1.1 1500 · mc 0,21 · vc 140` (dado do material em uso, MVP §4.7); `calculado 14:32` ver **Q-D**. Sai o comentário L70 sobre marca "editado" | T2 · MVP §4.7 |
| REESCREVE | 100–132 | Bloco Material: **sai** "Reverter todos os dados do material" (L104–106), os `⟲` por campo (`span.rev` L111/115/119/123/127), a frase "digite os dele… marca editado" (L131). **Fica** os 5 valores visíveis (Classe ISO, Dureza, kc1.1, mc, vc de partida). **Entra** um ponteiro curto "Editar em Configurações" (MVP §4.7, sem desenhar a tela) | GABARITO §2.7 D2 |
| SAI | 150–151 | Marca `Informado` no campo Balanço (L) | T2 |
| REESCREVE | 154–158 | `ap` = caixa de digitar comum: **sai** a marca `Partida` (L156) e o comentário L154 ("Manual → troca Partida por Manual + ⟲"). Fica rótulo "Profundidade de corte (ap)" + caixa + `mm`. Ganha a gaveta D11 (ver abaixo) | GABARITO §2.7 D1 |
| SAI | 159, 161 | Campo `Lc` opcional pode ficar; **sai** a frase explicativa solta L161 (vira gaveta ou corta — D9) | D9 |
| REESCREVE | 165–249 | Ajuste fino: **sai** as 3 trilhas (vc L181–191, fz L200–209, ae L233–243) e as marcas `Partida`/`Manual` (L178, L196, L229). Cada controle = `.fbox` simples. **Fica** "Voltar tudo ao valor de partida" (L245–248) | T5 · D1 · §5.4 |
| REESCREVE | 211–223 | Gaveta D11 de `fz`: hoje **aberta** → nasce **recolhida**; gatilho mostra "Avanço por dente (fz) · 0,060 mm/dente"; texto de 4 partes preservado (L26). Igual para `vc`, `ae` (gavetas novas) e `ap`. Texto de 4 partes de vc/ae/ap **não existe** — ver **Q-B** | GABARITO §2.7 D9+D11; DS §4.4 r6 |
| SAI | 251–260 | Bloco-exemplo "Recolhido, cada bloco vira uma linha" pode ficar como demonstração; **sai** a frase solta L259 (D9) e o `.aud` do resumo | D9 · T4 |
| REESCREVE | 267–274 | Alerta (Z2): **fica aberto** (R7, única exceção do D9). **Sai** a ref "ver Detalhes e fórmulas" (L272) → "Há mais uma condição ativa (ver abaixo)" (texto do MVP §7.6) | T4 · MVP §7.6 |
| REESCREVE | 277–281 | Z3 "Montado": hoje "Fresa Toroidal Ø10 r1,0 Z4 L45" → formato compacto **`10 R1 Z4 L45`** maiúsculo + "metal duro" (GABARITO §2.2, MVP §7.5). Ver achado F-1 | GABARITO §2.2 |
| REESCREVE | 284–312 | **Z4 → D7 dois cartões altos.** Cada um: rótulo por extenso 11px · `[− 44px]` `[número 32px mono + unidade]` `[+ 44px]` · `−`/`+` andam 10%. Some a frase L305 (vira nota curta ou corta). Endereço `S`/`F` pode ficar (T2 do canvas, ajuda C4). Superfície `--surface-card`, borda `--border-subtle` | GABARITO §2.7 D7; DS §4.6 |
| REESCREVE / SAI | 314–328 | Filete "Fixado · condição A — mude um parâmetro para comparar" + "Fixar este resultado" (L306–310): lê-se como comparação lado a lado (T12), que a **Q3 fechou fora do MVP**. Recomendo **remover** o snapshot de comparação; manter só o "fixar valor" do §8.2 como comportamento. Ver **Q-C** | GABARITO §4 Q3 |
| REESCREVE | 330–335 | Z5 "O que vai acontecer": **nasce recolhido** (D9); gatilho mostra o rótulo. Texto reescrito para o do MVP §7.6 — **sai** "marcado como extrapolado" e "margem de ±15–25%" (L333), **entra** "abaixo do limite do modelo (0,1 mm): nessa faixa as constantes de força não valem para a faixa" | D9 · T3 · MVP §7.6 |
| REESCREVE | 337–355 | Z6 "O que mexer": **nasce recolhido** (D9), mesmo sendo a direção que resolve o alerta (§7.4 r5 = ordem interna, não abre sozinho). Gatilho mostra "O que mexer · 2 direções". Conteúdo preservado | GABARITO Q1-def.1 · D9 |
| REESCREVE | 357–370 | **Z7 → D7 cartões baixos.** 7 cartões: hex · CTF · MRR · L/D · vc real · Pc · Mc. Cada um: rótulo 11px + número **20px mono 700** + unidade, sem `−`/`+`, superfície de cartão. **Sai** o item `hm` "extrapolado" (L362) — hm vive só na prosa de Z5. Altura de crista = 8º cartão? ver **Q-G** | GABARITO §2.7 D7; DS §4.6; MVP §7.2/§7.6 |
| SAI | 372–376 | Bloco "Detalhes e fórmulas" inteiro | T4 |
| REESCREVE | 381–384 | Rodapé: **sai** "Margem declarada do modelo: ±15–25%" (L383). Fica só "O sistema recomenda, o operador decide." | T3 |

**Contagem Main:** ~19 itens (5 transversais + ~14 locais). Três mais pesados: Z4→D7, Z7→D7, Ajuste-fino/D11.

### 3.2 `Vazio.dc.html`

| Ação | Linha(s) | O quê | Decisão |
|---|---|---|---|
| REESCREVE | 60–83 | Bloco Material: mesmo tratamento do Main — **sai** `⟲` por campo, "Reverter todos" (L70–73), frase "digite os dele" (L82). **Fica** os 5 valores visíveis. **Q-F:** manter ou não o rótulo "(declarado, não calculado)" | GABARITO §2.7 D2 · R4 |
| SAI | 82 | Marca `declarado` (`.mark`) — ver Q-F | Q-F |
| REESCREVE | 85–92 | Bloco Ferramenta (estado vazio): fica a chamada "Escolher a ferramenta…"; encurtar a frase L91 (D9) | D9 |
| REESCREVE | 98–103 | Coluna de resultado vazia: 4 parágrafos → **1 linha curta** ("Escolha o material e a ferramenta, depois calcule.", MVP §10). R4 preservado: nenhum dígito de resultado | D9 · MVP §10 · R4 |
| SAI | 109 | Rodapé "Margem declarada do modelo: ±15–25%" | T3 |
| — | `:root` L11–27 | T7 (`--h-target`/`--h-cta`) | T7 |

> **Decisão de execução fora do plano original (endossada por fenix-2a, registrada para o Mestre poder
> discordar):** o cabeçalho do Vazio passou de "Parâmetros de corte" para **"Aço 1045 · escolha a
> ferramenta"** — o material já está escolhido na cena, e isso alinha o cabeçalho ao Z1 (MVP §2.3)
> sem inventar dado. Sem chip de nível, porque não há cálculo.
>
> **Observação de dado (não bloqueia):** o MVP §5.2 descreve o campo de velocidade do material como
> "Faixa … dois números", mas o aço 1045 não tem faixa com fonte nos documentos — só a partida `140`
> (§11.2). Main, Vazio e Estados exibem todas **"Velocidade de corte de partida — 140 m/min"**
> (consistente e com fonte). Mostrar a faixa exigiria fonte para o 1045.

**Contagem Vazio:** ~7 itens. Mais pesado: enxugar a coluna de resultado vazia.

### 3.3 `Estados.dc.html` (folha de contrato — codifica o modelo final)

| Ação | Linha(s) | O quê | Decisão |
|---|---|---|---|
| REESCREVE | 83 | §1 alerta CRÍTICO: "ver Detalhes e fórmulas" → "Mais uma condição ativa (ver abaixo)" | T4 |
| REESCREVE | 90–100 | §2 erro de digitação: **fica** (é validação de entrada, não procedência — sobrevive). `3000` → `3.000` (T1) | T1 · MVP §9.4 |
| SAI / REPROPÕE | 102–122 | **§3 "Marcas de origem" sai inteira** — o conceito morreu com a procedência. Reaproveitar o slot "3 ·" para **"Check ao calcular (D10)"** (mantém 9 seções, entrega conteúdo que falta) | task · GABARITO §2.7 D10 |
| REESCREVE | 124–151 | §4 Desatualizado: **fica** (é estado real, MVP §2.5). `4 456`→`4.456`, `1 070`→`1.070` | T1 |
| REESCREVE | 153–170 | §5 Reconfiguração: bloco **MUDOU** fica. Bloco **FIXADO** (L162–168) = §8.2 (fixar valor, legítimo) — fica, `4 456`→`4.456`. Não confundir com o snapshot de comparação do Main (Q-C) | MVP §7.3/§8.2 |
| REESCREVE | 172–188 | **§6 "Prosa comprimida por estado — não colapsada por escolha"** → contradiz o D9 diretamente. Reescrever: **prosa nasce recolhida (D9), só o alerta abre e permanece aberto (R7)**. Sai a tabela "NORMAL × alerta ativo" (modelo do D3 revogado) e a frase "A direção que resolve o alerta abre sozinha" | GABARITO §2.8 D9 (revoga parte do D3) |
| REESCREVE | 190–205 | §7 Blocos recolhidos: fica (cabeçalho mostra valores — MVP §2.4). Sai `.aud` do resumo (T4); `font-size:12px`→11px (T6) | T4 · T6 |
| REESCREVE | 207–217 | **§8 "Dados do material — visíveis, editáveis, com caminho de volta"** → reescrever por D2: **ver** os 5 valores fica na tela de cálculo; **editar** e **criar material** (D12) vão para Configurações. Sai "Edita-se por revelação no lugar… nunca por rota separada" (L215) — agora **é** rota separada. Sai o `⟲` (L211/213) e a marca `Editado` | GABARITO §2.7 D2/D5/D12 |
| REESCREVE | 219–222 | §9 "O que esta tela nunca vai ter": **acrescenta** trilha de posição relativa / faixa recomendada (D4), procedência / fonte / marca de origem, tela de detalhes. Mantém gauge/índice/`% do limite`/selo "estimado" | GABARITO §2.7 D4 · task |
| — | `:root` L11–27 | T7 | T7 |

**Contagem Estados:** ~10 itens. Três mais pesados: §3 sai + vira D10, §6 reescrita (D9), §8 reescrita (D2).

### 3.4 `Tablet.dc.html` (eco responsivo do Main, ~834px)

| Ação | Linha(s) | O quê | Decisão |
|---|---|---|---|
| REESCREVE | 66–77 | Cabeçalho de contexto: sai `2 valores manuais` (L73), `extrapolado` (L74) | T2 |
| REESCREVE | 81–90 | Cabeçalhos recolhidos de Material/Ferramenta: sai `.aud`; sai "ap 1,0 partida" → "ap 1,0" (L89); `font-size:12px`→11px | T2·T4·T6 |
| REESCREVE | 92–162 | Ajuste fino: sai as 3 trilhas (L107–155) e marcas `Partida`/`Manual`; controles viram `.fbox` simples; **entra** as 4 gavetas D11 recolhidas (vc/fz/ae/ap) — texto de vc/ae/ap ver Q-B. Fica "Voltar tudo ao valor de partida" | T5 · D9 · D11 |
| REESCREVE | 166–173 | Alerta: fica aberto; sai ref "ver Detalhes e fórmulas" (L171) | T4 |
| REESCREVE | 175–179 | Z3 "Montado" → formato compacto `10 R1 Z4 L45` (F-1); `font-size:14px`→13/16px | GABARITO §2.2 · T6 |
| REESCREVE | 181–208 | Z4 → 2 cartões altos D7 com `−`/`+` 44px; `4 456`→`4.456`, `1 070`→`1.070` | D7 · T1 |
| REESCREVE / SAI | 210–223 | Filete "Fixado · condição A — comparar" — ver Q-C (mesma decisão do Main) | Q3 |
| REESCREVE | 225–230 | Z5 "O que vai acontecer": nasce recolhido; texto do MVP §7.6 (sai "extrapolado", sai "±15–25%") | D9 · T3 |
| REESCREVE | 232–249 | Z6 "O que mexer": nasce recolhido | D9 |
| REESCREVE | 251–264 | Z7 → 7 cartões baixos D7 (20px mono); sai o item `hm` "extrapolado" (L256) | D7 |
| SAI | 266–270 | Bloco "Detalhes e fórmulas" | T4 |
| SAI | 274 | Rodapé "Margem… ±15–25%" | T3 |
| — | `:root` | T7 | T7 |

**Contagem Tablet:** ~15 itens.

### 3.5 `Celular.dc.html` (eco responsivo do Main, 390px)

| Ação | Linha(s) | O quê | Decisão |
|---|---|---|---|
| REESCREVE | 64–80 | Cabeçalho: sai `2 valores manuais` (L77), `extrapolado` (L78); `14:32` ver Q-D | T2 |
| REESCREVE | 82–93 | Blocos recolhidos Material/Ferramenta: sai `.aud`; reescrever a frase L93 (sai "⟲ por dado, e reverter todos" — D2) | T4 · D2 |
| REESCREVE | 96–163 | Ajuste fino: sai as 3 trilhas (L109–157) e marcas; `gap:14px`→16px (L96); controles = `.fbox` simples; entra 4 gavetas D11 recolhidas; fica "Voltar tudo ao valor de partida" | T5·T6·D9·D11 |
| REESCREVE | 168–175 | Alerta: fica aberto; sai ref "ver Detalhes e fórmulas" (L174) | T4 |
| REESCREVE | 178–182 | Z3 "Montado" → `10 R1 Z4 L45` (F-1) | GABARITO §2.2 |
| REESCREVE | 185–209 | Z4 → 2 cartões altos D7 empilhados, `−`/`+` 44px; `4 456`→`4.456`, `1 070`→`1.070` | D7 · T1 |
| REESCREVE / SAI | 211–223 | Filete "Fixado · condição A — comparar" — Q-C | Q3 |
| REESCREVE | 225–230 | Z5 nasce recolhido; texto MVP §7.6 (sai "extrapolado"/"±15–25%") | D9 · T3 |
| REESCREVE | 232–250 | Z6 nasce recolhido | D9 |
| REESCREVE | 252–265 | Z7 → 7 cartões baixos D7; sai item `hm` "extrapolado" (L257) | D7 |
| SAI | 267–270 | Bloco "Detalhes e fórmulas" | T4 |
| SAI | 274 | Rodapé "Margem… ±15–25%" | T3 |
| — | `:root` | T7 | T7 |

**Contagem Celular:** ~15 itens.

### 3.6 `Procedencia.dc.html`

**Deixa de existir** (GABARITO §2.1). Não apagar nesta rodada. Na rodada de execução: `git rm` a folha
e propagar a seção 4.

---

## 4. O que a remoção da folha de procedência causa nas outras cinco

| Efeito | Onde | Ação na execução |
|---|---|---|
| **Contagem de telas: 6 → 5** | `canvas.json` L2–9 (array `artboards`), L33–38 (annotation `procedencia-t3`) | Remover a entrada `Procedencia.dc.html` e a nota `procedencia-t3` (T3 do brief) |
| **Links quebrados** | Main L272/374, Tablet L171/268, Celular L174/269, Estados L83 — todos apontam "Detalhes e fórmulas" | T4 já cobre: some o gatilho, o rodapé e a ref no alerta |
| **Afordância órfã** | classe `.aud` (sublinhado pontilhado) em ~todos os números das 5 folhas — abria a folha de procedência | T4: remover `.aud` da folha de estilo e das ocorrências. Ver **Q-A** |
| **Ordem vertical da tese** | `canvas.json` L16 annotation `tese`: "…resultados úteis, **detalhes**" | Tirar "detalhes" da lista — ordem final: alerta · dois números · o que vai acontecer · o que mexer · resultados úteis |
| **Índice do protótipo** | `LEIA-ME.md` L18 (linha da tabela `Procedencia.dc.html`) e L19 menção "marcas de origem" na descrição de `Estados` | Reescrever as duas linhas |
| **Dados do material (kc1.1, mc) "que produziram o número"** | eram exclusivos da folha de procedência (L58–68) | Já cobertos: ficam visíveis no bloco Material do Main/Vazio (MVP §4.7). Nada a recriar |
| **Fórmulas / "como cada número foi obtido"** | folha de procedência L93–124 | Não recriar na tela — "no código, invisíveis ao operador" (`ESTADO_VARREDURA`). Confirmar em **Q-A** |
| **GABARITO §2.1 / §2.2** | a nota "Folha `Procedencia.dc.html` — deixa de existir" e a lista de proibidos | Edição de documento — pendência para fenix-2a, não desta rodada |

---

## 5. Ordem de edição sugerida

Dependência → desbloqueio → maior impacto → visual → limpeza.

1. **Transversais de folha de estilo** (T5, T6, T7) nas 5 folhas — remover CSS de trilha, snap de tipografia, tokens `--h-*`. Desbloqueia o D7 (precisa de `--h-target`).
2. **`Estados.dc.html`** — é o contrato; §3→D10, §6 (D9), §8 (D2), §9 (D4). As outras folhas copiam daqui.
3. **`Main.dc.html`** — referência do desenho: D7 (Z4 + Z7), D9+D11 (gavetas), procedência (T2/T3/T4), `ap` (D1), material (D2).
4. **`Vazio.dc.html`** — material (D2), enxugar coluna vazia (D9), rodapé.
5. **`Tablet.dc.html`** e **`Celular.dc.html`** — espelhar o Main já decidido.
6. **Re-semear** os 5 `.dc.html` + `canvas.json` em `painel-fenix.html` e republicar na mesma URL.
7. **Deleção da procedência** (`git rm Procedencia.dc.html`) + `canvas.json` + `LEIA-ME.md` — passo isolado, depois que as 5 estiverem fechadas.

---

## 6. Perguntas ao Mestre (não decididas — régua incompleta é problema de fenix-2a)

| # | Pergunta | Recomendação | Por que não decido |
|---|---|---|---|
| **Q-A** | O sublinhado pontilhado `.aud` sai de **todos** os números, e não sobra nenhuma tela de fórmula/detalhe para o operador? | **Sim, sai** — `ESTADO_VARREDURA`: "as fórmulas — no código, invisíveis ao operador" | Remove uma afordância presente em ~toda a tela; o GABARITO não põe isso em D-termo. Duas leituras → produtos diferentes |
| **Q-B** | O texto de 4 partes (o que é / ao aumentar / ao diminuir / equilíbrio) das gavetas D11 de **velocidade de corte (vc)**, **penetração de trabalho (ae)** e **profundidade de corte (ap)** não existe em nenhum documento — só `fz` está escrito (MVP §5.5). De onde vem? | fenix-2a/Mestre fornece o texto, ou autoriza derivar do glossário + fórmulas e validar | Só o Mestre/domínio define o texto que o operador lê; sem ele 3 das 4 gavetas do D11 ficam vazias |
| **Q-C** | O "Fixar este resultado" + "Fixado · condição A — mude um parâmetro para comparar" (Main/Tablet/Celular) é comparação lado a lado (T12), que a Q3 fechou fora do MVP? | **Remover** o snapshot de comparação; manter só o "fixar valor" do §8.2 (fixar rotação/avanço) | A Q3 cobre, mas os dois sentidos de "fixar" são vizinhos; a leitura muda o que se remove |
| **Q-D** | O horário "calculado 14:32" no cabeçalho de contexto fica ou sai? | **Fica** — R4 só proíbe horário no estado Vazio; MVP não trata depois do cálculo | Dado factual de tela; o GABARITO não decide |
| **Q-E** | D8 lido ao pé da letra transforma `kc1.1 1500` → `1.500`, `1800` → `1.800`, e `3000` → `3.000` (erro de digitação em Estados). Os dados de material entram na regra do milhar? | **Sim** — D8/DS §2.8 não abrem exceção; padrão brasileiro | Convenção de engenharia às vezes escreve `kc1.1` sem separador; é chamada do Mestre |
| **Q-F** | No Vazio, o rótulo "(declarado, não calculado)" nos 5 dados de material fica (defende o R4) ou sai (texto supérfluo, D9)? | **Sai o rótulo, ficam os valores** — são entrada, não resultado; o R4 se resolve pela ausência de dígito de *resultado* | Tensão real entre R4 e D9 |
| **Q-G** | Z7 tem 7 cartões (hex·CTF·MRR·L/D·vc real·Pc·Mc) ou 8, incluindo **altura de crista** (a toroidal r1,0 é ponta curva, §7.2)? | **7** por ora; §7.6.1 lacuna 4 deixou "7 ou 8" em aberto como decisão de escopo | Já registrado como lacuna aberta no MVP; decisão de escopo, não de cálculo |

---

## 7. Achados adjacentes (fora do pedido, encontrados de passagem)

Não fazem parte desta correção; fenix-2a decide se entram.

| # | Achado | Camada |
|---|---|---|
| **F-1** | Z3 "Montado" traz o nome por extenso ("Fresa Toroidal Ø10 r1,0 Z4 L45"); o GABARITO §2.2 e o MVP §7.5 pedem o formato compacto `10 R1 Z4 L45` maiúsculo. Incluí a correção nas seções 3.1/3.4/3.5 por ser barata e camada 1 | 1 (vocabulário) |
| **F-2** | `:root` das 6 folhas não copia `--h-target` / `--h-cta` (DS §3 já os traz) — meia cópia, território do achado A13. Coberto por T7 | 1 (§2.4) |
| **F-3** | `Celular.dc.html` L96 usa `gap:14px`, fora da escala de espaço `4·8·12·16·24·32·48` (GABARITO §2.8). Coberto por T6 | 1 (§2.8) |
| **F-4** | O comentário `<!-- item 15 … validação silenciosa com operador -->` (Main L173–174, Celular L102) descreve trabalho de trilha que o D4 tornou obsoleto — some junto com a trilha (T5) | — |

---

## 8. Texto das 4 gavetas de instrução por parâmetro (D11)

**Estado:** conteúdo **aprovado pelo Mestre** (derivação e tom de oficina); formato reprovado na v1
("parágrafo cansativo e longo") e refeito aqui em **quatro linhas curtas, uma por movimento**, com
fragmentos separados por `·` em vez de frase com vírgulas. Lida de relance, com a máquina rodando ao
lado. Derivado dos `canonicos/`, nunca inventado. Nenhum número novo. Descreve, **não instrui**
(`CANONICO_LIMITES_E_ALERTAS.md` §1).

Ordem na tela: as gavetas de **vc / fz / penetração de trabalho (ae)** ficam no bloco Ajuste fino; a
de **profundidade de corte (ap)** fica junto do campo `ap`, no bloco Ferramenta (é entrada, D1).
Todas nascem **recolhidas** (D9); o gatilho mostra o nome do parâmetro e o valor em uso.

**As setas `▲` / `▼` — regra travada, nenhum agente futuro "melhora" isto (decisão do Mestre):**
só a forma, no tom de texto normal. **Sem cor** — nada de verde para subir, vermelho para descer.
Verde e vermelho já são a rampa de estado do painel (normal / crítico); uma seta verde em "aumentar"
diria que aumentar é seguro, e aumentar a velocidade de corte é o caminho mais curto para queimar a
ferramenta. Cor de alarme só funciona se nada mais na tela usar a mesma cor. A direção fica legível
sem cor porque a forma da seta carrega o sentido e o rótulo "aumentar" / "diminuir" está escrito ao
lado (R8: cor nunca é o único portador — aqui não é portador nenhum). Caractere `▲`/`▼` ou SVG
inline; **nunca ícone de fonte externa** (anti-requisito, R11 zero rede).

### 8.1 Avanço por dente (fz) · mm/dente

| Linha | Texto |
|---|---|
| **O que é** | Espessura do cavaco que cada aresta tira por passagem. |
| **▲ aumentar** | Remove mais rápido · mais força · vibra e pode quebrar |
| **▼ diminuir** | Acabamento mais fino · menos esforço · rende menos |
| **Equilíbrio** | Fino demais, a aresta esfrega em vez de cortar — a tela avisa. |

### 8.2 Velocidade de corte (vc) · m/min

| Linha | Texto |
|---|---|
| **O que é** | Velocidade do gume passando pelo material · manda no calor do corte. |
| **▲ aumentar** | Esquenta mais · gume gasta mais rápido · menos vida |
| **▼ diminuir** | Gume dura mais · material gruda no gume · acabamento pior |
| **Equilíbrio** | Cada material tem sua velocidade de partida — a tela avisa se você se afasta demais. |

### 8.3 Penetração de trabalho (ae) · mm

| Linha | Texto |
|---|---|
| **O que é** | Largura do corte pela lateral · define quanto do dente corta de cada vez. |
| **▲ aumentar** | Mais material · mais força e potência · na largura toda, calor preso |
| **▼ diminuir** | Carga menor · cavaco mais fino · pode afinar abaixo do que a conta cobre |
| **Equilíbrio** | Pouca penetração é estratégia, não defeito · a tela mostra a espessura de cavaco. |

### 8.4 Profundidade de corte (ap) · mm

| Linha | Texto |
|---|---|
| **O que é** | Fatia de altura que cada passe tira · você já chega com ela decidida. |
| **▲ aumentar** | Mais material por passe · mais força · entorta a ponta no balanço · marca a peça |
| **▼ diminuir** | Menos força · ponta mais firme · mais passes · demora mais |
| **Equilíbrio** | Cabe até o comprimento de aresta · passar disso deixa passe sem gume. |

*Cortado da v1 por brevidade (Mestre: "corte pela metade"):* a ressalva da fresa toroidal com
`ap < r` (gatilho 10, incerteza do diâmetro efetivo) **saiu do texto da gaveta** — o alerta
continua disparando quando a condição ocorre; só não é pré-explicado aqui.

### 8.5 Origem de cada afirmação (para o Mestre revisar com precisão)

| Gaveta · parte | Afirmação | Fonte canônica |
|---|---|---|
| **fz** · O que é | cavaco que cada aresta retira por passagem | `GLOSSARIO` (fz); `CANONICO_MOTOR_DE_CALCULO.md` §1.1 (hex/hm = o que a aresta vê) |
| fz · Ao aumentar | mais taxa de remoção | `CANONICO_MOTOR_DE_CALCULO.md` §1.4 passos 5–6 (`vf = fz·Z·n`, `Q = ap·ae·vf/1000`) |
| fz · Ao aumentar | risco de vibração / quebra | `CANONICO_VELOCIDADES_E_AVANCOS.md` §1.7 ("fz acima → sobrecarga, deflexão, risco de lascamento") |
| fz · Ao diminuir | acabamento mais fino, menos esforço, menos produtividade | mesma cadeia §1.4; `CANONICO_VELOCIDADES_E_AVANCOS.md` §1.7 |
| fz · Equilíbrio | esfregamento abaixo de um ponto; a tela avisa | mecanismo: `CANONICO_VELOCIDADES_E_AVANCOS.md` §1.5 (`h_min ≈ α·rβ`, `CONSENSO` no mecanismo); alerta que resta: gatilho **1a** (`hm < 0,1 mm`, `CANONICO_MOTOR_DE_CALCULO.md` §1.5; `CANONICO_LIMITES_E_ALERTAS.md` §1.1). **Nota:** o alerta de piso de esfregamento (gatilho 1) foi revogado 30/08 — o mecanismo continua real, o aviso agora é o do limite do modelo |
| **vc** · O que é | velocidade do gume; sai de rotação/diâmetro; manda no calor | `GLOSSARIO` (vc); `CANONICO_MOTOR_DE_CALCULO.md` §1.4 passo 1 (`n = vc·1000/(π·D)`); `CANONICO_VELOCIDADES_E_AVANCOS.md` §1.4 (vc constante por grupo, diâmetro entra só na rotação) |
| vc · Ao aumentar | esquenta, desgaste térmico, vida cai rápido | `CANONICO_LIMITES_E_ALERTAS.md` §1.3 ("Acima: o desgaste é térmico e a vida cai rápido"); `CANONICO_VELOCIDADES_E_AVANCOS.md` §1.7–§1.8; `CANONICO_DEFLEXAO_E_VIDA.md` §1.3 (Taylor). **Sem número** — a % de perda de vida exige o expoente de Taylor, que é lacuna (`CANONICO_DEFLEXAO_E_VIDA.md` §4.3) |
| vc · Ao diminuir | material adere ao gume, acabamento piora, rende menos | `CANONICO_LIMITES_E_ALERTAS.md` §1.3 ("Abaixo: o cavaco adere ao gume (aresta postiça) — acabamento ruim e desgaste irregular"); `CANONICO_VELOCIDADES_E_AVANCOS.md` §1.7 ("Vc abaixo → aresta postiça, corte ineficiente") |
| vc · Equilíbrio | velocidade de partida por material; avisa fora dela | `CANONICO_VELOCIDADES_E_AVANCOS.md` §1.1 ("só ponto de partida condicionado"); `CANONICO_LIMITES_E_ALERTAS.md` §1.3 (gatilho 4: `Vc < 0,6×` ou `> 1,4× Vc_partida`) |
| **ae** · O que é | largura radial do corte; define o arco engajado | `GLOSSARIO` (ae = penetração de trabalho, largura radial); `CANONICO_MOTOR_DE_CALCULO.md` §1.4 passo 2 (`ε = ae/D`, `φmax = arccos(1−2ε)`) |
| ae · Ao aumentar | sobe força e potência | `CANONICO_VELOCIDADES_E_AVANCOS.md` §1.7 ("ae acima → aumenta contato e potência"); `CANONICO_MOTOR_DE_CALCULO.md` §1.4 passos 6–7 |
| ae · Ao aumentar | rasgo cheio: calor preso, recorte de cavaco | `CANONICO_LIMITES_E_ALERTAS.md` §1.2 (`ae ≥ 0,95×D`: "sem saída para o calor e com risco de recorte de cavaco"; fonte Sandvik) |
| ae · Ao diminuir | conservador, mas afina o cavaco abaixo da faixa do modelo | `CANONICO_VELOCIDADES_E_AVANCOS.md` §1.7 ("ae abaixo → conservador… afina o cavaco… abaixo do piso"); afinamento `CANONICO_MOTOR_DE_CALCULO.md` §1.1 (CTF); limite `h < 0,1 mm` §1.5 |
| ae · Equilíbrio | pouca penetração é estratégia; tela mostra hex/CTF; avisa em ae ≥ largura | `CANONICO_LIMITES_E_ALERTAS.md` §5.1 ("5–20% de engajamento é a estratégia recomendada… hex passa a ser resultado visível"); CTF só com `ae < D/2` (MVP §7.2); gatilhos 2 e 3 (MVP §9.2 / `CANONICO_LIMITES_E_ALERTAS.md` §1.2) |
| **ap** · O que é | fatia axial de altura por passe; operador chega com ela decidida | `GLOSSARIO` (ap = profundidade de corte, axial); MVP §4.8; `CANONICO_GEOMETRIA_DE_CORTE.md` §1.1 |
| ap · Ao aumentar | mais força; flete a ponta em balanço; vibração e marca | `CANONICO_VELOCIDADES_E_AVANCOS.md` §1.7 ("ap acima → força, deflexão, potência"); `CANONICO_MOTOR_DE_CALCULO.md` §1.4 (`Q ∝ ap`); `CANONICO_DEFLEXAO_E_VIDA.md` §1.1 (`δ ∝ F`, viga escalonada); `CANONICO_LIMITES_E_ALERTAS.md` §1.4 |
| ap · Ao diminuir | menos força, ponta mais firme, mais passes, demora mais | `CANONICO_VELOCIDADES_E_AVANCOS.md` §1.7 ("ap abaixo → conservador, reduz carga"); nº de passes = consequência aritmética direta, sem número |
| ap · Equilíbrio | teto = comprimento de aresta; acima dele, passe sem gume | teto `min(1,0×D ; comprimento de aresta)` MVP §5.3; `ap > Lc` → alerta crítico MVP §4.6/§9.2. *(toroidal `ap < r` → gatilho 10 / lacuna do `De` — MVP §9.2, `CANONICO_MOTOR_DE_CALCULO.md` §1.2 — cortado do texto da gaveta, alerta segue ativo)* |

**Nenhuma das três gavetas novas ficou sem base** — todas as afirmações têm fonte nos canônicos. A
única ressalva é a nota do `fz` · Equilíbrio (o aviso mudou de alerta, o mecanismo não), já anotada.

---

## 9. Log de execução — 30/08/2026

Ordem: 1 folha por vez, conferência do fenix-2a entre cada uma. Sem commit.

| # | Folha | Estado | Linhas (antes → depois) |
|---|---|---|---|
| 1 | `Main.dc.html` | ✅ aprovada | 390 → 338 |
| 2 | `Vazio.dc.html` | ✅ aprovada — R4 no sentido forte: sem cartão-casca, coluna de leitura só com a chamada | 116 → 128 |
| 3 | `Estados.dc.html` | ✅ aprovada — §3 "marcas de origem" → "check ao calcular (D10)"; §6 e §8 reescritas contra régua revogada; §9 sem nomear as marcas | 227 → 298 |
| 4 | `Tablet.dc.html` | ✅ aprovada — contagem de capacidades = Main | 281 → 307 |
| 5 | `Celular.dc.html` | ✅ aprovada — vocabulário conferido campo a campo; alvo 44/48/56 | 281 → 303 |
| 6 | `Procedencia.dc.html` | ✅ removida com `git rm` | 135 → — |

**Correção nas folhas já aprovadas (fenix-2a autorizou):** a linha de contexto do cabeçalho
`kc1.1 1.500 · mc 0,21 · vc 140` — **símbolo sozinho** (§2.2) — saiu da Main e da Tablet. A Main já
tinha os 5 valores no bloco Material expandido; a Tablet teve o bloco Material expandido para os
mostrar por extenso, como no Celular. No Celular a linha nunca existiu (feito assim de início).

**Varredura de símbolo sozinho nas 5 folhas:** só as duas exceções que o MVP/GABARITO autorizam —
o resumo compacto `10 R1 Z4 L45` (Z3) e os resumos de cabeçalho de bloco recolhido
(`Ø10 · Z4 · L45`, `vc 140 · fz 0,060`). Nenhuma violação nova em rótulo, prosa ou gaveta.
**Um ponto em aberto:** a linha do cabeçalho `Fresa Toroidal Ø10 r1,0 Z4 L45 — metal duro` mistura o
nome por extenso com a sigla de geometria; o MVP §3.2 diz que o cabeçalho traz a ferramenta "por
extenso" e o Z3 traz as siglas. Não mexido — decisão do fenix-2a se apara para
`Fresa Toroidal — inteiriça, metal duro`.

**Efeitos colaterais da remoção da procedência, resolvidos:**

| Efeito | Feito |
|---|---|
| `git rm Procedencia.dc.html` | ✅ registrado no índice |
| `canvas.json` — artboard `Procedencia` | ✅ removido; Estados reposicionado para `x:0` |
| `canvas.json` — annotation `procedencia-t3` (T3 do brief) | ✅ removida |
| `canvas.json` — ordem da tese ("…resultados úteis, **detalhes**") | ✅ "detalhes" tirado; frase de comparação (T12, fora do MVP) trocada por D9 |
| `canvas.json` — annotation `estados-uso` | ✅ reescrita (nomeava marcas de origem, prosa comprimida, "editáveis com caminho de volta") |
| `LEIA-ME.md` — linha da tabela `Procedencia.dc.html` | ✅ removida; nota datada da remoção acrescentada |
| `LEIA-ME.md` — "Estes **sete**" / "os **seis** `.dc.html`" | ✅ → "seis" / "cinco" |
| `LEIA-ME.md` — descrição de `Estados.dc.html` (marcas de origem, prosa comprimida, caminho de volta) | ✅ reescrita |
| `LEIA-ME.md` — regra de vocabulário | ✅ acrescentadas as duas exceções (§2.2 + MVP §2.4) para não gerar achado falso |
| Links/gatilhos apontando para a folha, nas 5 restantes | ✅ nenhum — o `.aud` e o bloco "Detalhes e fórmulas" já tinham saído |
| Contagem "6 folhas" em documento de régua | `GABARITO_PROTOTIPO.md` §1 nota "Folha `Procedencia.dc.html` — deixa de existir. A remoção acontece na fase de correção" está **desatualizada** (a remoção aconteceu) — do fenix-2a, que está editando o gabarito |

**Conferência cruzada entre as 5 folhas (byte a byte por `grep`):** material e ferramenta idênticos;
os 5 dados do material iguais (`1.500` / `0,21` / `170–220 HB` / `P` / `140 m/min`); Z3 `10 R1 Z4 L45`
idêntico nas 3 que o têm; rotação `4.456` / avanço `1.070` idênticos; alerta idêntico (Main/Tablet/
Celular/Estados §1); prosa de Z5 e Z6 idêntica; os 7 cartões de verificação com os mesmos rótulos e
valores nas 3; as 4 gavetas com o mesmo texto nas 3 (fz também na Estados). **Sem divergência.**

**Fora do escopo desta correção, mas sinalizado ao fenix-2a:** os documentos de escopo `E3`
(§ inventário: marcas de editado/extrapolado, mockup "Detalhes e fórmulas", "§4.2 Regras de
procedência"), `E5` (Z6 "Detalhes e fórmulas", "cada indicador abre procedência", marca Editado) e
`E7` ("tem procedência — alcança a fórmula, os valores substituídos e a fonte") **ainda exigem
procedência como requisito de produto** — o commit `2783a6b` não os alcançou. Um auditor que
comparar o protótipo com E3/E5/E7 vai apontar o protótipo como não conforme, e será um achado falso:
a régua (GABARITO) tem precedência e diz que a procedência saiu. A varredura de reconciliação do
fenix-2a precisa chegar nesses três.
