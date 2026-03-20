# 11 — Materiais de Marketing: ToolOptimizer CNC

> **Versao:** 1.0 | **Data:** 20/03/2026 | **Autor:** Rafael Eleoterio + Claude
> **Formato:** Otimizado para consumo por LLMs — templates prontos, alta densidade, copy final
> **Depende de:** `01-VISAO-PRODUTO.md` (UVP, diferenciais), `03-PERSONAS-E-JORNADA.md` (personas, mensagens), `06-ESTRATEGIA-CONTEUDO.md` (tom, canais), `07-MODELO-MONETIZACAO.md` (pricing PRO), `08-PLANO-LANCAMENTO.md` (fases, ondas), `10-LANDING-PAGE-SPEC.md` (copy, CTAs)
> **Alimenta:** `00-INDICE-MASTER.md` (resumo), execucao direta de lancamento

---

## 1. VISAO GERAL

```yaml
objetivo: templates prontos para execucao imediata de marketing — copiar, adaptar e publicar
conteudo:
  - emails_lancamento: 4 templates (soft launch, comunidade, SENAI, PRO)
  - posts_linkedin: 8 templates (lancamento, tecnico, carrossel, enquete, storytelling, professor, ROI, roadmap)
  - descricoes_youtube: 3 templates (tutorial, diagnostico, bastidor)
  - mensagens_whatsapp: 4 templates (rede pessoal, grupo operadores, grupo donos, grupo professores)
  - pitch_30s: 3 versoes (generico, tecnico, investidor)
  - one_pager_parceria: spec completa para PDF (SENAI, distribuidores)
  - assinatura_email: template padrao
  - bio_perfis: LinkedIn, YouTube, Instagram

principios:
  - copy_final_pt_br: pronto para usar — nao rascunho
  - dados_reais: numeros do sistema v0.7.0 (824 testes, 9 materiais, etc.)
  - tom: tecnico-pratico, linguagem de chao de fabrica, sem hype
  - personalizacao: marcadores [NOME], [CARGO], [CONTEXTO] onde necessario
  - cta_padrao: tooloptimizercnc.com.br (sem UTM nos templates — adicionar por canal)
```

---

## 2. EMAILS DE LANCAMENTO

---

### 2.1 Email — Soft Launch (Onda 1: Rede Pessoal)

```yaml
ref: Doc 08 §3 onda_1_rede_pessoal
destinatario: contato direto de Rafael (colega, ex-colega, profissional CNC)
canal: WhatsApp DM ou email direto
objetivo: feedback qualitativo honesto

assunto: "Criei uma calculadora CNC — quero tua opiniao"

corpo: |
  [NOME], beleza?

  Lembra que eu comentei sobre aquele projeto de calculadora de parametros de corte?
  Ficou pronto e ja esta no ar: tooloptimizercnc.com.br

  E gratis, em portugues, funciona offline e tem semaforo de seguranca L/D
  (aquela relacao comprimento/diametro que ninguem olha e depois a fresa vibra).

  Calcula RPM, avanco, potencia e torque em 2 segundos — so selecionar material,
  ferramenta e operacao e clicar "Simular".

  Estou buscando feedback de quem trabalha na maquina de verdade.
  Se puder testar e me dizer o que achou, ajuda muito:
  - O resultado bate com o que voce usaria?
  - Faltou algum material ou ferramenta?
  - O que ficou confuso?

  Abraco,
  Rafael

  tooloptimizercnc.com.br

notas:
  - tom: pessoal, direto, sem formalidade
  - NAO usar linguagem de marketing
  - pedir feedback especifico (3 perguntas)
  - ref: Doc 08 §3 onda_1 perguntas_chave
```

---

### 2.2 Email — Comunidade Expandida (Onda 2)

```yaml
ref: Doc 08 §3 onda_2_comunidade_expandida
destinatario: grupo WhatsApp de usinagem, forum, comunidade online
canal: mensagem em grupo ou post em forum
objetivo: adocao inicial + boca a boca

corpo: |
  Pessoal, criei uma calculadora de parametros de corte CNC e quero compartilhar
  com voces.

  O que faz:
  - Calcula RPM, avanco, potencia e torque em 2 segundos
  - Semaforo de seguranca L/D (verde/amarelo/vermelho/bloqueado)
  - Chip thinning automatico quando ae < 50% do diametro
  - 9 materiais (aco 1020, 1045, inox 304, aluminio 6061, P20, H13...)
  - 3 fresas de metal duro (topo reto, toroidal, esferica)

  O que NAO faz:
  - NAO precisa de login
  - NAO precisa de internet (funciona offline)
  - NAO cobra nada — 100% gratis

  Sou fresador e programador CNC ha 16 anos. Fiz isso porque nenhuma
  calculadora gratuita tem semaforo L/D, portugues e Kienzle juntos.

  tooloptimizercnc.com.br

  Feedback e muito bem-vindo — se algo estiver errado ou faltando, me avisa.

notas:
  - tom: util, genuino, sem hype
  - listar features E limitacoes (transparencia gera confianca)
  - 1 mensagem por grupo, NUNCA repetir
  - responder TODAS as duvidas
  - ref: Doc 08 §3 onda_2, Doc 08 §9 regra_ouro
```

---

### 2.3 Email — Contato SENAI (Professores)

```yaml
ref: Doc 08 §3 onda_3 contato_senai, Doc 08 §7 fase_1_professor_individual
destinatario: instrutor/professor SENAI, ETEC, escola tecnica
canal: email formal ou LinkedIn DM
objetivo: adocao em sala de aula

assunto: "Ferramenta didatica gratuita para aulas de parametros de corte CNC"

corpo: |
  Professor [NOME],

  Meu nome e Rafael Eleoterio, fresador e programador CNC ha mais de 16 anos
  no setor de moldes para injecao de plastico.

  Desenvolvi o ToolOptimizer CNC — uma calculadora gratuita de parametros de
  corte projetada para uso em sala de aula e no chao de fabrica.

  Por que pode ser util nas suas aulas:

  - Mostra as formulas com os valores reais substituidos (RPM = Vc x 1000 / pi x D,
    com os numeros do exercicio aparecendo na tela)
  - Semaforo L/D: classifica a relacao comprimento/diametro em 4 niveis visuais
    (conceito que catalogos nunca explicam)
  - 100% gratuito, sem login, funciona no celular do aluno
  - Interface em portugues brasileiro
  - Formulas baseadas em normas ISO e modelo de Kienzle

  O sistema ja esta no ar: tooloptimizercnc.com.br

  Posso preparar um guia rapido de como usar em aula, se tiver interesse.
  Tambem estou aberto a apresentar em video-chamada para sua turma.

  Atenciosamente,
  Rafael Eleoterio
  Fresador/Programador CNC | Criador do ToolOptimizer CNC
  tooloptimizercnc.com.br | mestrecnc.com.br

notas:
  - tom: formal-respeitoso, sem intimidade
  - destacar valor EDUCATIVO (formulas visiveis), nao comercial
  - oferecer material de apoio + disponibilidade
  - NAO mencionar plano PRO ou monetizacao
  - ref: Doc 03 §2 persona_3 mensagens_que_ressoam
```

---

### 2.4 Email — Lancamento PRO (Futuro: Fase 3)

```yaml
ref: Doc 07 §3 estrategia_lancamento, Doc 08 §5 comunicacao_lancamento_pro
destinatario: usuarios cadastrados (login Google/email)
canal: email transacional (Resend)
objetivo: conversao trial → PRO

sequencia_4_emails:

  email_1_anuncio:
    assunto: "ToolOptimizer PRO chegou — 14 dias gratis para voce"
    corpo: |
      [NOME], voce ja fez [X] simulacoes no ToolOptimizer. Agora tem uma versao
      PRO com recursos extras para quem usa no dia a dia.

      O que tem no PRO:
      - Historico salvo na nuvem (acesse de qualquer dispositivo)
      - Relatorio PDF com logo da sua empresa
      - 50+ materiais pre-cadastrados (titanio, Inconel, D2, cobre...)
      - Multiplos perfis de maquina (RPM, potencia, torque por maquina)
      - Comparador lado a lado (2-3 simulacoes)

      Teste gratis por 14 dias — sem compromisso, cancela quando quiser.

      [BOTAO: Ativar PRO Gratis por 14 Dias]

      Tudo que voce ja usa continua gratis. O PRO e para quem quer ir alem.

      Rafael
    timing: dia do lancamento PRO

  email_2_features:
    assunto: "3 recursos PRO que vao mudar como voce trabalha"
    corpo: |
      [NOME], quero destacar 3 recursos do PRO que fizemos pensando em
      profissionais como voce:

      1. HISTORICO NA NUVEM
      Todas as simulacoes salvas — acesse do escritorio, do chao de fabrica
      ou de casa. Sem perder dados quando trocar de dispositivo.

      2. RELATORIO PDF
      Exporte o resultado da simulacao como PDF profissional — com logo da
      sua empresa, parametros detalhados e semaforo L/D. Perfeito para
      mostrar para o cliente ou encarregado.

      3. 50+ MATERIAIS
      Titanio Ti6Al4V, Inconel 718, D2, A2, cobre, latao, nylon, PEEK...
      Tudo com dados de Kienzle validados.

      Seu trial de 14 dias esta ativo — [X] dias restantes.

      [BOTAO: Acessar ToolOptimizer PRO]
    timing: dia 3 do trial

  email_3_urgencia:
    assunto: "Desconto Fundador PRO: 40% — so para os 100 primeiros"
    corpo: |
      [NOME], como voce esta entre os primeiros usuarios do ToolOptimizer,
      criamos um desconto exclusivo: Fundador PRO.

      40% de desconto em qualquer plano — valido enquanto manter a assinatura:

      - Mensal: de R$19,90 por R$11,94/mes
      - Anual: de R$149,90 por R$89,94/ano (melhor custo-beneficio)
      - Vitalicio: de R$349,90 por R$209,94 (pague uma vez, use para sempre)

      Apenas 100 vagas com esse desconto. [X] ja foram preenchidas.

      [BOTAO: Garantir Desconto Fundador]

      Prefere PIX? O desconto vale para qualquer forma de pagamento.
    timing: dia 7 do trial

  email_4_lembrete:
    assunto: "Seu trial PRO termina em 3 dias"
    corpo: |
      [NOME], seu acesso PRO gratuito termina em 3 dias.

      Se o PRO fez diferenca no seu trabalho, garanta o desconto Fundador
      (40% off) antes que as [X] vagas restantes acabem.

      Plano anual: R$89,94/ano = R$7,50/mes
      (menos que o preco de 1 fresa de metal duro)

      Se nao fez sentido para voce, sem problema — a versao gratuita
      continua completa e sem limitacao.

      [BOTAO: Assinar PRO com 40% Off]

      Rafael
    timing: dia 11 do trial (3 dias antes do fim)

notas:
  - tom: direto, respeitoso, sem pressao excessiva
  - sempre reforcar que FREE continua completo
  - PIX como opcao explicita (ref Doc 07 §4 metodos_pagamento)
  - [X] = variaveis dinamicas preenchidas pelo sistema
  - ref: Doc 07 §3 desconto_early_adopter
```

---

## 3. POSTS LINKEDIN

---

### 3.1 Post — Lancamento (Storytelling)

```yaml
ref: Doc 06 §3.2 semana_1 linkedin_1, Doc 06 §7 bastidor_storytelling
tipo: bastidor_storytelling
persona_alvo: todos
pilar: bastidores
timing: primeiro post do soft launch

texto: |
  Trabalhei 16 anos como fresador e programador CNC no setor de moldes.

  Nesse tempo vi centenas de fresas quebradas por parametros errados.
  Operadores usando valores genericos. Programadores que nao calculam.
  Ninguem consultando tabela com engenharia.

  A conta e simples:
  → Fresa de metal duro: R$200-800
  → Oficina que quebra 2-3 por semana: R$15.000-50.000/ano
  → So em ferramental desperdicado

  Procurei uma calculadora que resolvesse isso.
  Nenhuma era gratuita, em portugues, com semaforo de seguranca e offline ao mesmo tempo.

  Entao criei o ToolOptimizer CNC.

  Calcula RPM, avanco, potencia e torque em 2 segundos.
  Semaforo L/D que bloqueia operacoes perigosas.
  Formulas com os valores reais na tela.
  100% gratis. Sem login. Funciona offline.

  Esta no ar: tooloptimizercnc.com.br

  Se voce trabalha com usinagem CNC, testa e me diz o que achou.
  Feedback de quem trabalha na maquina e o que mais importa.

  #usinagem #cnc #fresamento #parametrosdecorte #engenhariamecanica

imagem: screenshot do dashboard com resultado de simulacao
notas:
  - link no PRIMEIRO COMENTARIO (LinkedIn penaliza link no corpo)
  - responder todos os comentarios nas primeiras 2h
  - ref: Doc 06 §7 melhores_praticas
```

---

### 3.2 Post — Insight Tecnico (L/D)

```yaml
ref: Doc 06 §3.2 semana_3 linkedin_1
tipo: insight_tecnico
persona_alvo: P2 (programador CAM), P1 (operador)
pilar: educacao_tecnica

texto: |
  L/D > 4?
  Sua fresa esta vibrando.

  L/D > 6?
  Desista. Nao vai funcionar.

  A relacao comprimento/diametro (L/D) e o indicador mais ignorado
  na usinagem CNC. Nenhuma calculadora gratuita alerta sobre isso.

  O ToolOptimizer classifica automaticamente em 4 niveis:

  🟢 L/D ≤ 3 → Seguro
  🟡 L/D 3-4 → Atencao — risco de vibracao
  🔴 L/D 4-6 → Critico — reduzir parametros
  🔒 L/D > 6 → BLOQUEADO — operacao impedida

  Da proxima vez que a fresa vibrar, olhe o L/D antes de mudar o RPM.

  Teste com seus parametros (gratis, sem login):
  Link no primeiro comentario 👇

  #usinagem #cnc #fresamento #parametrosdecorte #chaodefabrica

imagem: screenshot ou diagrama do semaforo L/D (4 estados)
notas:
  - emojis dos circulos coloridos sao excecao aceita (representam o semaforo)
  - link tooloptimizercnc.com.br no primeiro comentario
```

---

### 3.3 Post — Carrossel (5 Erros)

```yaml
ref: Doc 06 §3.2 semana_2 linkedin_1
tipo: carrossel
persona_alvo: P1 (operador), P4 (dono oficina)
pilar: problemas_reais

slides:
  slide_1_capa:
    titulo: "5 erros que quebram fresas de metal duro"
    subtitulo: "E como evitar cada um"
    visual: fundo escuro (#0F1419), texto grande, icone fresa

  slide_2:
    numero: "01"
    titulo: "RPM alto demais"
    texto: "Vc acima do recomendado para o material. A fresa superaquece e perde o revestimento. Resultado: quebra em minutos."
    solucao: "Calcule o RPM correto: RPM = Vc x 1000 / (pi x D)"

  slide_3:
    numero: "02"
    titulo: "Avanco por dente (fz) errado"
    texto: "fz muito alto = sobrecarga. fz muito baixo = fricao e calor. Os dois quebram."
    solucao: "Use fz recomendado para o par material + ferramenta."

  slide_4:
    numero: "03"
    titulo: "Ignorar a relacao L/D"
    texto: "Fresa comprida demais para o diametro = vibracao. L/D > 6 e receita para quebra."
    solucao: "O ToolOptimizer bloqueia automaticamente quando L/D > 6."

  slide_5:
    numero: "04"
    titulo: "Passe lateral raso sem chip thinning"
    texto: "Quando ae < 50% do diametro, o cavaco fica fino demais. Gera calor e desgaste prematuro."
    solucao: "O chip thinning factor (CTF) corrige o fz automaticamente."

  slide_6:
    numero: "05"
    titulo: "Repetir parametros de outro material"
    texto: "Aluminio e aco inox tem Vc completamente diferentes. Usar o mesmo parametro quebra a fresa ou arruina a peca."
    solucao: "Cada material tem faixas proprias de Vc e fz."

  slide_7_cta:
    titulo: "Evite os 5 erros em 2 segundos"
    texto: "O ToolOptimizer calcula parametros seguros com semaforo L/D e chip thinning automatico. Gratis, em portugues, offline."
    cta: "tooloptimizercnc.com.br"
    visual: screenshot do dashboard

design_carrossel:
  dimensao: 1080x1350px (formato retrato LinkedIn)
  fundo: #0F1419 (escuro)
  titulo_cor: #FFFFFF
  numero_cor: #00D9FF (cyan)
  solucao_cor: #2ecc71 (verde)
  fonte_titulo: bold, 28-32px
  fonte_texto: regular, 18-20px
```

---

### 3.4 Post — Enquete

```yaml
ref: Doc 06 §3.2 semana_2 linkedin_2
tipo: enquete
persona_alvo: P1, P2
pilar: educacao_tecnica
objetivo: engajamento + coleta de dados informais

texto: |
  Pergunta real para quem trabalha com usinagem CNC:

  Voce calcula parametros de corte (RPM, avanco) antes de usinar?

opcoes:
  a: "Sempre calculo"
  b: "As vezes (material novo)"
  c: "Nunca — uso valores padrao"
  d: "Uso o que o programador mandou"

comentario_pos_enquete: |
  Se voce marcou (c) ou (d), nao se preocupe — a maioria faz isso.
  E justamente por isso que criei o ToolOptimizer CNC.
  Calcula parametros seguros em 2 segundos: tooloptimizercnc.com.br

notas:
  - enquetes geram 2-3x mais engajamento que posts normais
  - comentario com CTA APOS as respostas comecarem (nao no post original)
```

---

### 3.5 Post — Para Professores

```yaml
ref: Doc 06 §3.3 semana_6 linkedin_1
tipo: insight_tecnico
persona_alvo: P3 (professor SENAI/ETEC)
pilar: educacao_tecnica

texto: |
  Para professores de usinagem CNC:

  Voce pode usar o ToolOptimizer na sua proxima aula de parametros de corte.

  O que seus alunos vao ver:
  → A formula do RPM com os valores reais substituidos
  → O semaforo L/D explicando quando a fresa vai vibrar
  → O efeito do chip thinning no avanco real
  → Health bars mostrando se os parametros estao seguros

  O que voce NAO precisa:
  → Login (zero cadastro)
  → Internet (funciona offline)
  → Licenca (100% gratis)
  → Instalacao (funciona no celular do aluno)

  Foi feito por quem trabalhou 16 anos no chao de fabrica.
  E projetado para quem ensina a proxima geracao de fresadores.

  tooloptimizercnc.com.br
  Link no primeiro comentario.

  #usinagem #cnc #senai #educacaoprofissional #parametrosdecorte

notas:
  - tom: respeitoso com a profissao docente
  - foco no valor educativo, nao comercial
  - listar o que NAO precisa (remove objecoes)
```

---

### 3.6 Post — ROI Dono de Oficina

```yaml
ref: Doc 06 §3.2 semana_4 linkedin_1, Doc 03 §2 persona_4
tipo: insight_tecnico
persona_alvo: P4 (dono oficina)
pilar: problemas_reais

texto: |
  Conta rapida para donos de oficina CNC:

  1 fresa de metal duro: R$200-800
  2 quebras por semana: R$400-1.600/semana
  52 semanas: R$20.800-83.200/ano

  So em ferramental desperdicado por parametros errados.

  Agora imagina se cada operador consultasse uma referencia
  antes de ligar a maquina.

  O ToolOptimizer CNC calcula RPM, avanco e potencia em 2 segundos.
  Semaforo de seguranca bloqueia operacoes perigosas (L/D > 6).

  Custo: R$0
  Login: nenhum
  Implementacao: manda o link para a equipe

  tooloptimizercnc.com.br

  Se 1 fresa deixar de quebrar por mes, ja pagou
  (so que nao tem nada para pagar).

  #usinagem #cnc #ferramentaria #custosindustriais #chaodefabrica

notas:
  - foco em dinheiro (P4 pensa em ROI)
  - numeros reais do Doc 01 §1 e Doc 03 §2 persona_4
  - humor sutil no final (nao tem nada para pagar) — gera compartilhamento
```

---

### 3.7 Post — Roadmap

```yaml
ref: Doc 06 §3.4 semana_12 linkedin_2
tipo: bastidor_storytelling
persona_alvo: P2, P4
pilar: bastidores

texto: |
  O ToolOptimizer CNC hoje: fresas de metal duro (topo reto, toroidal, esferica).
  9 materiais. 3 operacoes. Semaforo L/D. Kienzle. Chip thinning.

  O que vem depois:

  → Dashboard para cabecotes com pastilhas de metal duro
  → Dashboard para brocas
  → Login opcional (historico na nuvem)
  → Banco de dados colaborativo (parametros que funcionam vs. que nao)
  → Integracao com softwares CAM
  → App mobile nativo

  O fresamento com fresas de metal duro e o comeco.
  O objetivo e ser a referencia em parametros de corte CNC no Brasil.

  Se voce quer acompanhar ou sugerir o que construir primeiro:
  tooloptimizercnc.com.br (link no comentario)

  #usinagem #cnc #fresamento #roadmap #engenhariamecanica

notas:
  - mostra visao de futuro (retencao + confianca)
  - pedir sugestoes = engajamento real
  - ref: Doc 01 §9 visao_de_futuro
```

---

### 3.8 Post — Dica Rapida

```yaml
ref: Doc 06 §3.2 semana_4 linkedin_2
tipo: dica_rapida
persona_alvo: P1, P2
pilar: educacao_tecnica

texto: |
  Dica rapida de usinagem:

  Chip thinning — quando ae < 50% do diametro,
  o cavaco fica mais fino do que voce pensa.

  O fz real e menor que o fz programado.
  Resultado: calor excessivo + desgaste prematuro.

  Correcao: CTF = 1/sqrt(1-(1-2ae/D)^2)

  O ToolOptimizer aplica isso automaticamente.
  Voce ajusta ae e o fz corrigido aparece na hora.

  tooloptimizercnc.com.br

  #usinagem #cnc #fresamento #parametrosdecorte

notas:
  - posts curtos (< 800 chars) tem bom alcance
  - formula mostrada = credibilidade tecnica para P2
  - link no comentario
```

---

## 4. DESCRICOES YOUTUBE

---

### 4.1 Video Tutorial — Demonstracao

```yaml
ref: Doc 06 §6 tipo tutorial_demonstracao
exemplo_titulo: "RPM para fresamento CNC — como calcular em 2 segundos"

descricao: |
  🔗 Calcule agora (gratis): https://tooloptimizercnc.com.br
  📝 Artigo completo: https://mestrecnc.com.br/[SLUG-ARTIGO]

  Neste video voce vai aprender:
  - Como calcular RPM para fresamento CNC usando a formula ISO
  - A diferenca entre Vc (velocidade de corte) e RPM
  - Como o ToolOptimizer CNC calcula tudo em 2 segundos
  - O que e o semaforo L/D e por que ele importa

  O ToolOptimizer CNC e uma calculadora gratuita de parametros de corte
  para fresamento com fresas de metal duro. Calcula RPM, avanco, potencia,
  torque e MRR com validacao automatica de seguranca.

  100% gratis | Sem login | Em portugues | Funciona offline

  —

  SOBRE O CANAL:
  MestreCNC e um canal de conteudo tecnico sobre usinagem CNC, criado por
  Rafael Eleoterio (fresador e programador CNC ha 16+ anos).

  —

  LINKS UTEIS:
  → Calculadora: https://tooloptimizercnc.com.br
  → Blog tecnico: https://mestrecnc.com.br
  → LinkedIn: [URL-LINKEDIN-RAFAEL]

  #parametrosdecorte #cnc #fresamento #usinagem #calculadoracnc #rpm

tags:
  - parametros de corte
  - cnc
  - fresamento
  - usinagem
  - calculadora cnc
  - rpm fresa
  - como calcular rpm
  - velocidade de corte
  - avanco por dente
  - tooloptimizer

notas:
  - link da calculadora nos 3 primeiros links (YouTube mostra acima do "mostrar mais")
  - keywords no titulo e nas primeiras 2 linhas da descricao
  - tags = keywords de cauda longa
```

---

### 4.2 Video Diagnostico — Problema Real

```yaml
ref: Doc 06 §6 tipo diagnostico_problema
exemplo_titulo: "Fresa vibrando? Pode ser L/D — veja como diagnosticar em 10 segundos"

descricao: |
  🔗 Teste com seus parametros: https://tooloptimizercnc.com.br
  📝 Artigo: https://mestrecnc.com.br/[SLUG-ARTIGO]

  Sua fresa esta vibrando na maquina? Antes de mexer no RPM ou trocar
  a ferramenta, verifique a relacao L/D (comprimento/diametro).

  Neste video:
  - O que e a relacao L/D e por que causa vibracao
  - Como diagnosticar em 10 segundos usando o ToolOptimizer
  - Os 4 niveis do semaforo: verde, amarelo, vermelho e bloqueado
  - O que fazer quando L/D esta alto demais

  L/D > 6 = o ToolOptimizer BLOQUEIA a operacao. Nenhuma outra
  calculadora gratuita faz isso.

  —

  LINKS:
  → Calculadora: https://tooloptimizercnc.com.br
  → Blog: https://mestrecnc.com.br
  → LinkedIn: [URL-LINKEDIN-RAFAEL]

  #fresa #vibracao #cnc #usinagem #fresamento #LD #parametrosdecorte

tags:
  - fresa vibrando
  - vibracao cnc
  - relacao L/D
  - fresa quebrando
  - parametros de corte
  - diagnostico cnc
  - semaforo seguranca
```

---

### 4.3 Video Bastidor

```yaml
ref: Doc 06 §6 tipo bastidor
exemplo_titulo: "Tour completo do ToolOptimizer CNC — todas as funcionalidades em 5 minutos"

descricao: |
  🔗 Acesse gratis: https://tooloptimizercnc.com.br

  Tour completo de todas as funcionalidades do ToolOptimizer CNC — a calculadora
  gratuita de parametros de corte para fresamento com fresas de metal duro.

  O que voce vai ver:
  00:00 - Intro
  00:15 - Selecao de material (9 materiais editaveis)
  00:45 - Selecao de ferramenta (3 tipos, 6 diametros)
  01:15 - Configuracao de operacao (desbaste/semi/acabamento)
  01:45 - Simulacao (RPM, avanco, potencia, torque, MRR)
  02:30 - Semaforo L/D (4 niveis + bloqueio)
  03:00 - Ajuste fino (sliders + health bars + gauges)
  03:45 - Historico e exportacao
  04:15 - Configuracoes (limites de maquina, safety factor)
  04:45 - Conclusao

  824 testes automatizados. Zero erros TypeScript. Formulas ISO + Kienzle.
  Gratis, sem login, funciona offline, em portugues.

  —

  LINKS:
  → Calculadora: https://tooloptimizercnc.com.br
  → Blog: https://mestrecnc.com.br

  #tooloptimizer #cnc #usinagem #fresamento #calculadoracnc

tags:
  - tooloptimizer cnc
  - calculadora cnc
  - parametros de corte
  - tour completo
  - funcionalidades
  - usinagem gratis
```

---

## 5. MENSAGENS WHATSAPP

---

### 5.1 WhatsApp — Rede Pessoal (DM)

```yaml
ref: Doc 08 §3 onda_1 mensagem_tipo

texto: |
  E ai [NOME], beleza?

  Lembra que eu tava fazendo aquele projeto de calculadora CNC?
  Ficou pronto: tooloptimizercnc.com.br

  Calcula RPM, avanco e potencia em 2 segundos.
  Tem semaforo de seguranca L/D (bloqueia quando vai vibrar).
  Gratis, sem login, funciona offline.

  Testa ai e me diz o que achou — quero feedback de quem ta na maquina.

notas:
  - maximo 5-6 linhas (WhatsApp = leitura rapida)
  - tom informal entre colegas
  - pedir feedback especifico
```

---

### 5.2 WhatsApp — Grupo de Operadores

```yaml
ref: Doc 08 §9 grupos_existentes operadores_cnc

texto: |
  Pessoal, fiz uma calculadora de parametros de corte CNC — gratis,
  em portugues, funciona offline.

  Calcula RPM, avanco, potencia com semaforo de seguranca L/D
  (verde/amarelo/vermelho/bloqueado).

  9 materiais, 3 tipos de fresa, chip thinning automatico.
  Sem login, sem propaganda.

  tooloptimizercnc.com.br

  Quem testar e quiser dar feedback, manda aqui.

notas:
  - 1 mensagem por grupo, NUNCA repetir
  - responder TODAS as duvidas no grupo
  - ref: Doc 08 §9 regra: nao fazer spam
```

---

### 5.3 WhatsApp — Grupo de Donos de Oficina

```yaml
ref: Doc 08 §9 grupos_existentes donos_oficina

texto: |
  Galera, compartilhando uma ferramenta que criei:
  Calculadora de parametros de corte CNC — gratis.

  Seu operador consulta antes de usinar, calcula RPM e avanco certos,
  semaforo de seguranca avisa quando vai vibrar.

  Menos fresa quebrada = menos dinheiro jogado fora.

  tooloptimizercnc.com.br
  (sem login, funciona offline, em portugues)

notas:
  - foco em ROI/economia (lingua do P4)
  - curto e direto
```

---

### 5.4 WhatsApp — Grupo de Professores

```yaml
ref: Doc 08 §9 grupos_existentes professores_senai

texto: |
  Professores, boa tarde.

  Criei uma calculadora de parametros de corte CNC pensada para uso em aula.
  Mostra as formulas com os valores reais substituidos na tela.

  - 100% gratis, sem login
  - Funciona no celular do aluno
  - Semaforo L/D visual (4 niveis)
  - Portugues brasileiro

  Sou fresador e programador CNC ha 16 anos.
  tooloptimizercnc.com.br

  Se alguem tiver interesse, posso preparar um guia de como usar em aula.

notas:
  - tom respeitoso (contexto profissional docente)
  - oferecer material de apoio
  - NAO usar linguagem de vendas
```

---

## 6. PITCH DE 30 SEGUNDOS

---

### 6.1 Pitch Generico (Networking, Eventos, Conversas)

```yaml
ref: Doc 08 §4 eventos, Doc 01 §2 solucao
contexto: conversa informal em feira, evento, almoco

texto: |
  O ToolOptimizer CNC e uma calculadora de parametros de corte para fresamento.
  Voce seleciona o material, a ferramenta e a operacao — em 2 segundos tem
  RPM, avanco e potencia calculados com seguranca.

  Tem um semaforo L/D que avisa quando a fresa vai vibrar ou quebrar.
  E gratis, em portugues e funciona offline.

  tooloptimizercnc.com.br

duracao: ~20 segundos
notas:
  - memorizar as 3 frases principais
  - adaptar conforme contexto ("voce trabalha com CNC?")
```

---

### 6.2 Pitch Tecnico (Para Programador CAM ou Engenheiro)

```yaml
ref: Doc 03 §2 persona_2 mensagens_que_ressoam
contexto: conversa com profissional tecnico

texto: |
  O ToolOptimizer calcula parametros de corte para fresas de metal duro
  usando Kienzle para forca de corte — nao estimativa grosseira.

  Tem semaforo L/D com bloqueio automatico em L/D > 6 e chip thinning
  quando ae e menor que 50% do diametro. Mostra as formulas com os
  valores reais substituidos.

  E gratuito, agnóstico de fabricante e funciona offline.
  tooloptimizercnc.com.br

duracao: ~25 segundos
notas:
  - mencionar Kienzle e L/D (credibilidade tecnica)
  - "agnóstico de fabricante" = diferencial vs. apps Sandvik/Kennametal
```

---

### 6.3 Pitch Investidor / Parceiro (Futuro)

```yaml
ref: Doc 01 §3 UVP, Doc 07 §5 projecoes
contexto: conversa com potencial investidor, parceiro ou mentor

texto: |
  O ToolOptimizer CNC e uma calculadora de parametros de corte para
  usinagem — a primeira gratuita, em portugues, com validacao de
  seguranca automatica.

  O mercado brasileiro tem 300 a 500 mil operadores CNC, e a maioria
  nao calcula parametros. Isso gera 15 a 50 mil reais por ano em
  ferramental desperdicado por oficina.

  Temos 824 testes automatizados, deploy em Cloudflare, e o produto
  ja esta live em tooloptimizercnc.com.br. O modelo e freemium — gratis
  completo no lancamento, com plano PRO a partir de R$19,90/mes.

duracao: ~30 segundos
notas:
  - dados de mercado (Doc 02, Doc 03)
  - metricas de qualidade do produto
  - modelo de negocio em 1 frase
  - NAO usar ate ter metricas de tracao reais
```

---

## 7. ONE-PAGER PARA PARCERIAS

---

### 7.1 One-Pager SENAI / Escolas Tecnicas

```yaml
ref: Doc 08 §7 fase_2_validacao_educativa, Doc 08 §7 fase_3_institucional
formato: PDF 1 pagina, A4, design profissional escuro
objetivo: apresentar ToolOptimizer para coordenacao pedagogica SENAI/ETEC

spec:

  cabecalho:
    logo: ToolOptimizer CNC (logo oficial)
    titulo: "Ferramenta Didatica Gratuita para Ensino de Parametros de Corte CNC"
    subtitulo: "tooloptimizercnc.com.br"

  secao_1_problema:
    titulo: "O Desafio"
    texto: |
      Alunos de cursos tecnicos de usinagem aprendem formulas de parametros de corte
      no quadro, mas nao visualizam o impacto de cada variavel no resultado final.
      Catalogos PDF estao defasados. Softwares comerciais custam centenas de dolares
      por licenca. Nao existe ferramenta didatica gratuita em portugues.

  secao_2_solucao:
    titulo: "A Solucao"
    texto: |
      O ToolOptimizer CNC e um sistema web que calcula RPM, avanco, potencia e torque
      para fresamento CNC em 2 segundos, mostrando as formulas com os valores reais
      substituidos na tela — perfeito para uso em sala de aula.
    destaques:
      - "Formulas ISO + Kienzle com valores reais visiveis"
      - "Semaforo L/D: ensina estabilidade da ferramenta visualmente"
      - "100% gratuito, sem login, sem instalacao"
      - "Funciona no celular do aluno (offline)"
      - "Interface em portugues brasileiro"

  secao_3_numeros:
    titulo: "Em Numeros"
    items:
      - "824 testes automatizados (zero falhas)"
      - "9 materiais pre-cadastrados (editaveis pelo usuario)"
      - "3 tipos de fresa de metal duro"
      - "27 combinacoes material x operacao validadas"
      - "Formulas: ISO 3685 (RPM), Kienzle (forca de corte), Sandvik (CTF)"

  secao_4_como_usar_em_aula:
    titulo: "Como Usar em Aula"
    passos:
      - "Acesse tooloptimizercnc.com.br no projetor ou celular"
      - "Selecione material, ferramenta e operacao do exercicio"
      - "Clique Simular — alunos veem formula + resultado + semaforo"
      - "Use os sliders de ajuste fino para explorar variacoes"
    nota: "Guia completo de uso em sala disponivel sob demanda"

  secao_5_sobre:
    titulo: "Sobre o Criador"
    texto: |
      Rafael Eleoterio — fresador e programador CNC ha 16+ anos no setor de moldes
      para injecao de plastico. Desenvolveu o ToolOptimizer a partir da observacao
      de que a maioria dos profissionais nao calcula parametros de corte, gerando
      quebras e desperdicio.

  rodape:
    contato: "[EMAIL-RAFAEL]"
    site: "tooloptimizercnc.com.br"
    blog: "mestrecnc.com.br"
    nota: "Apresentacao disponivel por video-chamada"

design:
  fundo: #0F1419 (dark) ou #FFFFFF (light — para impressao)
  cor_primaria: #00D9FF
  cor_secundaria: #2ecc71
  fonte: Inter (titulos) + JetBrains Mono (numeros)
  logo_posicao: topo esquerdo
  qr_code: topo direito (link para tooloptimizercnc.com.br)
```

---

### 7.2 One-Pager Distribuidores de Ferramentas

```yaml
ref: Doc 08 §4 parcerias_fase_2 distribuidores_ferramentas
formato: PDF 1 pagina, A4
objetivo: convencer distribuidores a recomendar ToolOptimizer para clientes

spec:

  cabecalho:
    logo: ToolOptimizer CNC
    titulo: "Seus clientes quebrando menos ferramentas = mais satisfacao, menos devolucao"
    subtitulo: "Ferramenta gratuita de parametros de corte CNC"

  secao_1_problema:
    titulo: "O Problema dos Seus Clientes"
    texto: |
      A maioria dos operadores e oficinas CNC usa parametros genericos.
      Resultado: ferramentas quebrando antes do tempo, desgaste prematuro,
      clientes insatisfeitos que culpam a qualidade da ferramenta.
    dado: "Custo medio de ferramental desperdicado: R$15.000-50.000/ano por oficina"

  secao_2_solucao:
    titulo: "Como o ToolOptimizer Ajuda"
    texto: |
      O ToolOptimizer CNC calcula parametros de corte seguros em 2 segundos.
      Quando seus clientes usam parametros corretos, as ferramentas duram mais,
      quebram menos e o cliente fica satisfeito — independente do fabricante.
    destaques:
      - "Agnóstico de fabricante — funciona com qualquer fresa de metal duro"
      - "Semaforo L/D previne vibracao e quebra"
      - "Gratuito — nao concorre com seu produto, complementa"

  secao_3_proposta:
    titulo: "Proposta"
    texto: |
      Recomende o ToolOptimizer para seus clientes como ferramenta complementar.
      Flyer digital com QR code disponivel para distribuicao.
    beneficios_distribuidor:
      - "Menos reclamacoes sobre 'ferramenta de baixa qualidade'"
      - "Diferencial no atendimento (valor agregado sem custo)"
      - "Clientes usam parametros corretos = vida util real da ferramenta"

  rodape:
    contato: "[EMAIL-RAFAEL]"
    site: "tooloptimizercnc.com.br"
    qr_code: link direto

design:
  versao: light (para impressao — distribuidores imprimem)
  fundo: #FFFFFF
  cor_primaria: #00D9FF
  titulo_cor: #1A202C
  fonte: Inter
```

---

## 8. ASSINATURA DE EMAIL

```yaml
formato: HTML inline (compativel com Gmail, Outlook)

assinatura: |
  —
  Rafael Eleoterio
  Fresador & Programador CNC | Criador do ToolOptimizer CNC
  🌐 tooloptimizercnc.com.br | 📝 mestrecnc.com.br
  "A ciencia da usinagem, simplificada."

variante_formal: |
  —
  Rafael Eleoterio
  CNC Programmer & Developer
  ToolOptimizer CNC — Calculadora de Parametros de Corte
  tooloptimizercnc.com.br | mestrecnc.com.br

notas:
  - usar variante informal para contatos de usinagem (P1, P2, P4)
  - usar variante formal para SENAI, institucional, parceiros
  - nao usar logo (peso de imagem em email = problema)
```

---

## 9. BIO PARA PERFIS

---

### 9.1 LinkedIn — Rafael Eleoterio

```yaml
ref: Doc 08 §2 workstream_2 perfil_linkedin

headline: "Fresador & Programador CNC | 16+ anos | Criador do ToolOptimizer CNC — calculadora gratuita de parametros de corte"

sobre: |
  Fresador e programador CNC ha mais de 16 anos no setor de moldes para
  injecao de plastico.

  Depois de ver centenas de fresas quebradas por parametros errados — e
  nenhuma ferramenta gratuita, em portugues, com validacao de seguranca —
  criei o ToolOptimizer CNC.

  O que faz:
  → Calcula RPM, avanco, potencia e torque em 2 segundos
  → Semaforo L/D (4 niveis + bloqueio automatico)
  → Chip thinning automatico
  → Modelo de Kienzle para forca de corte real
  → 100% gratis, sem login, offline, em portugues

  824 testes automatizados. Zero erros. Deploy em Cloudflare.

  Acesse: tooloptimizercnc.com.br
  Blog tecnico: mestrecnc.com.br

  O sistema recomenda, o operador decide.

notas:
  - headline: keyword "CNC" + autoridade (16+ anos) + produto
  - sobre: storytelling curto + features + numeros + links
  - banner: screenshot do dashboard ToolOptimizer (1584x396px)
```

---

### 9.2 YouTube — Canal MestreCNC

```yaml
ref: Doc 06 §6

nome_canal: "MestreCNC"

descricao: |
  Conteudo tecnico sobre usinagem CNC — parametros de corte, fresamento,
  diagnostico de problemas e otimizacao de processos.

  Criado por Rafael Eleoterio, fresador e programador CNC ha 16+ anos.

  Calculadora gratuita: tooloptimizercnc.com.br
  Blog tecnico: mestrecnc.com.br

  Novos videos a cada 2 semanas.

banner: screenshot do ToolOptimizer + texto "MestreCNC" + cores neon (#00D9FF, #39FF14)
avatar: logo ToolOptimizer ou logo MestreCNC
```

---

### 9.3 Instagram — MestreCNC

```yaml
nome: "mestrecnc"

bio: |
  Usinagem CNC na pratica
  Parametros de corte | Fresamento | Diagnostico
  16+ anos de chao de fabrica
  Calculadora gratis 👇

link_bio: tooloptimizercnc.com.br (ou Linktree com tooloptimizer + mestrecnc + youtube)

notas:
  - bio curta (150 chars max no Instagram)
  - link unico na bio — usar Linktree se precisar de multiplos
  - destaques fixos: "Calculadora", "Formulas", "L/D", "Dicas"
```

---

## 10. FLYER DIGITAL (QR CODE)

```yaml
ref: Doc 08 §4 eventos, Doc 08 §4 distribuidores_ferramentas
formato: PNG ou PDF, tamanho cartao de visita (85x55mm) ou A6 (105x148mm)
objetivo: distribuir em feiras, eventos, visitas a oficinas

frente:
  logo: ToolOptimizer CNC
  headline: "Parametros de corte CNC seguros em 2 segundos"
  sub: "Gratis | Portugues | Offline"
  qr_code: tooloptimizercnc.com.br?utm_source=flyer&utm_medium=qr
  visual: screenshot compacto do dashboard

verso:
  features:
    - "RPM, Avanco, Potencia, Torque, MRR"
    - "Semaforo de seguranca L/D (4 niveis)"
    - "Chip thinning automatico"
    - "9 materiais editaveis"
    - "824 testes validados"
  site: tooloptimizercnc.com.br
  contato: mestrecnc.com.br

design:
  fundo: #0F1419 (dark)
  texto: #FFFFFF
  destaque: #00D9FF
  qr_cor: #FFFFFF sobre fundo escuro
```

---

## 11. GUIA "COMO USAR EM AULA" (PDF 2-3 PAGINAS)

```yaml
ref: Doc 08 §3 onda_3 material_apoio, Doc 08 §7 fase_1 material_apoio
formato: PDF, 2-3 paginas, A4
objetivo: guia passo a passo para professores SENAI/ETEC usarem em sala

pagina_1:
  titulo: "Como usar o ToolOptimizer CNC em aula de parametros de corte"
  intro: |
    Este guia mostra como usar o ToolOptimizer CNC como ferramenta didatica
    em aulas de parametros de corte para fresamento. O sistema e gratuito,
    nao requer login e funciona no celular do aluno.

  requisitos:
    - "Acesso a internet (primeiro carregamento) ou modo offline"
    - "Projetor (para demonstracao coletiva) ou celular individual"
    - "URL: tooloptimizercnc.com.br"

  passo_a_passo:
    passo_1:
      titulo: "Abra o sistema"
      descricao: "Acesse tooloptimizercnc.com.br. Nao precisa de login ou cadastro."
    passo_2:
      titulo: "Selecione o material do exercicio"
      descricao: "Ex: Aco 1045. O sistema carrega automaticamente os dados de Kienzle (kc1.1, mc) e faixas de Vc."
    passo_3:
      titulo: "Selecione a ferramenta"
      descricao: "Ex: Topo Reto, diametro 10mm, 4 dentes. Mostre aos alunos como o diametro afeta o RPM."
    passo_4:
      titulo: "Defina a operacao"
      descricao: "Desbaste, Semi-acabamento ou Acabamento. Mostre como os parametros mudam entre operacoes."
    passo_5:
      titulo: "Clique Simular"
      descricao: "O sistema calcula RPM, avanco, potencia, torque e MRR. A formula aparece com os valores reais substituidos."
    passo_6:
      titulo: "Explore o semaforo L/D"
      descricao: "Mude o comprimento da ferramenta e mostre como o semaforo muda de verde para amarelo, vermelho e bloqueado."
    passo_7:
      titulo: "Use os sliders de ajuste fino"
      descricao: "Mova Vc, fz, ae ou ap e mostre como cada parametro afeta o resultado em tempo real."

pagina_2:
  titulo: "Exercicios Sugeridos"
  exercicios:
    exercicio_1:
      titulo: "Calculo basico de RPM"
      enunciado: "Calcule o RPM para uma fresa de topo reto D=10mm em Aco 1045 (desbaste). Compare com o calculo manual."
      objetivo_didatico: "Entender a formula RPM = Vc x 1000 / (pi x D)"
    exercicio_2:
      titulo: "Efeito do diametro no RPM"
      enunciado: "Calcule RPM para o mesmo material com D=6mm, D=10mm e D=20mm. O que acontece?"
      objetivo_didatico: "Relacao inversamente proporcional entre D e RPM"
    exercicio_3:
      titulo: "Semaforo L/D"
      enunciado: "Use uma fresa D=6mm e varie o comprimento: L=12mm, L=24mm, L=36mm, L=42mm. Observe o semaforo."
      objetivo_didatico: "Entender estabilidade da ferramenta vs. relacao L/D"
    exercicio_4:
      titulo: "Chip thinning"
      enunciado: "Configure ae = 5mm (D=10mm, 50%) e depois ae = 2mm (20%). Observe o CTF e o fz corrigido."
      objetivo_didatico: "Entender por que ae raso exige correcao de avanco"
    exercicio_5:
      titulo: "Comparacao de materiais"
      enunciado: "Calcule parametros para Aluminio 6061-T6 e Aco Inox 304 com a mesma ferramenta. Compare RPM e avanco."
      objetivo_didatico: "Entender como o material define a faixa de Vc e fz"

pagina_3:
  titulo: "Informacoes Complementares"

  formulas_cobertas:
    - "RPM = (Vc x 1000) / (pi x D) — ISO 3685"
    - "Avanco (F) = fz x Z x RPM"
    - "Forca de corte = kc1.1 x h^(1-mc) x b — Modelo de Kienzle"
    - "Potencia = Fc x Vc / (60000 x n)"
    - "CTF = 1/sqrt(1-(1-2ae/D)^2) — Sandvik"

  sobre_o_sistema:
    testes: "824 automatizados, 0 falhas"
    materiais: "9 pre-cadastrados + adicionar livremente"
    ferramentas: "3 tipos de fresa de metal duro (topo reto, toroidal, esferica)"
    principio: "O sistema recomenda, o operador decide"

  contato:
    criador: "Rafael Eleoterio — fresador/programador CNC ha 16+ anos"
    site: "tooloptimizercnc.com.br"
    blog: "mestrecnc.com.br"
    email: "[EMAIL-RAFAEL]"
    disponibilidade: "Apresentacao por video-chamada disponivel sob demanda"
```

---

## 12. MENSAGEM PARA INFLUENCIADORES

```yaml
ref: Doc 08 §8 abordagem_contato

template_youtube: |
  [NOME], acompanho seu canal e admiro o conteudo sobre [TOPICO_ESPECIFICO].

  Sou fresador e programador CNC ha 16 anos e criei o ToolOptimizer CNC —
  uma calculadora gratuita de parametros de corte com semaforo de seguranca L/D
  e formulas educativas (mostra o calculo com os valores reais na tela).

  Acho que seu publico ia curtir conhecer. Se quiser, posso te mandar um acesso
  para testar antes e tirar duvidas.

  tooloptimizercnc.com.br

  Abraco,
  Rafael

template_linkedin: |
  [NOME], vi seu post sobre [TOPICO_ESPECIFICO] e achei muito relevante.

  Trabalhei 16 anos no chao de fabrica e criei o ToolOptimizer CNC — calculadora
  gratuita de parametros de corte com semaforo L/D e formulas educativas.
  Em portugues, offline, sem login.

  Sem compromisso: tooloptimizercnc.com.br

  Se fizer sentido, fico a disposicao para trocar ideia ou fazer uma demonstracao.

  Abraco,
  Rafael

notas:
  - SEMPRE personalizar [TOPICO_ESPECIFICO] com conteudo real do influenciador
  - NUNCA pedir promocao direta — oferecer valor primeiro
  - tom: colega de profissao, nao vendedor
  - ref: Doc 08 §8 principio "valor primeiro"
```

---

## 13. MENSAGEM PARA DISTRIBUIDORES DE FERRAMENTAS

```yaml
ref: Doc 08 §4 distribuidores_ferramentas

template: |
  [NOME], boa tarde.

  Sou Rafael Eleoterio, fresador e programador CNC ha 16 anos no setor de moldes.

  Criei o ToolOptimizer CNC — uma calculadora gratuita de parametros de corte
  para fresamento com fresas de metal duro. O sistema calcula RPM, avanco e
  potencia em 2 segundos e tem semaforo de seguranca L/D.

  Funciona com qualquer ferramenta, de qualquer fabricante.

  A ideia e simples: quando o cliente usa parametros corretos, a ferramenta
  dura mais, quebra menos e o cliente fica satisfeito. Menos reclamacao de
  "ferramenta de baixa qualidade" para voce.

  Posso enviar um flyer digital com QR code para distribuir aos seus clientes,
  se tiver interesse.

  tooloptimizercnc.com.br

  Atenciosamente,
  Rafael Eleoterio

notas:
  - tom: profissional, proposta de valor clara
  - "agnóstico de fabricante" = nao concorre com o distribuidor
  - oferecer material pronto (flyer QR code)
```

---

## 14. COPY PARA OG:IMAGE (WHATSAPP/LINKEDIN PREVIEW)

```yaml
ref: Doc 10 §6 open_graph, Doc 08 §2 og_tags_validados

og_title: "ToolOptimizer CNC — Parametros de Corte Seguros em 2 Segundos"
og_description: "Calculadora CNC gratis com semaforo L/D, Kienzle e ajuste fino visual. Em portugues, offline."

og_image_spec:
  dimensao: 1200x630px
  conteudo:
    - logo ToolOptimizer (topo esquerdo)
    - headline: "Parametros de corte CNC seguros em 2 segundos"
    - sub: "Gratis | Portugues | Offline | Semaforo L/D"
    - screenshot compacto do dashboard (direita)
  fundo: #0F1419
  texto: #FFFFFF
  destaque: #00D9FF
  formato: PNG

teste_obrigatorio: colar tooloptimizercnc.com.br no WhatsApp e verificar preview
ref: Doc 10 §9 og_preview_whatsapp
```

---

## 15. CHECKLIST DE MATERIAIS PRE-LANCAMENTO

```yaml
ref: Doc 08 §2 checklist_go_no_go

obrigatorio_antes_de_divulgar:
  - [ ] og:image criada e testada (WhatsApp + LinkedIn preview)
  - [ ] LinkedIn Rafael otimizado (headline, banner, sobre)
  - [ ] Canal YouTube criado (MestreCNC) com branding
  - [ ] 2+ artigos publicados em mestrecnc.com.br
  - [ ] Assinatura de email configurada
  - [ ] UTM tracking definido por canal
  - [ ] Mensagem soft launch (§2.1) pronta e personalizada para 10-20 contatos
  - [ ] Mensagem grupo operadores (§5.2) pronta

recomendado:
  - [ ] 1+ video YouTube publicado
  - [ ] Carrossel "5 erros" pronto (§3.3)
  - [ ] One-pager SENAI pronto (§7.1)
  - [ ] Guia "Como usar em aula" pronto (§11)
  - [ ] Flyer digital com QR code pronto (§10)
  - [ ] Bio Instagram configurada (§9.3)
  - [ ] 5+ contatos SENAI mapeados

pos_lancamento:
  - [ ] Primeira enquete LinkedIn publicada (§3.4) — semana 2
  - [ ] Post storytelling lancamento publicado (§3.1) — dia 1
  - [ ] 10+ feedbacks qualitativos coletados (onda 1)
  - [ ] Mensagens comunidade enviadas (onda 2) — semana 3-4
```

---

## 16. REFERENCIAS

```yaml
docs_internos:
  produto_uvp: 01-VISAO-PRODUTO.md (§2 solucao, §3 UVP, §4 features, §11 origem)
  concorrentes: 02-ANALISE-COMPETITIVA.md (§5.2 matriz diferenciais)
  personas_mensagens: 03-PERSONAS-E-JORNADA.md (§2 mensagens_que_ressoam, §6 proposta por persona)
  seo: 04-ESTRATEGIA-SEO.md (§3 keywords)
  google_ads: 05-PLANO-GOOGLE-ADS.md (mensagens por grupo)
  conteudo_canais: 06-ESTRATEGIA-CONTEUDO.md (§2 pilares, §3 calendario, §7 linkedin, §8 whatsapp)
  monetizacao: 07-MODELO-MONETIZACAO.md (§3 pricing PRO, §3 trial, §3 desconto_early_adopter)
  lancamento: 08-PLANO-LANCAMENTO.md (§2 pre-lancamento, §3 ondas, §7 SENAI, §8 influenciadores, §9 WhatsApp)
  metricas: 09-METRICAS-E-KPIs.md (§2 AARRR)
  landing_page: 10-LANDING-PAGE-SPEC.md (§3 blocos, §4 copy, §6 og tags)

dados_produto:
  url: tooloptimizercnc.com.br
  blog: mestrecnc.com.br
  estado: v0.7.0 | 824 testes | deploy LIVE | CF Web Analytics ativo
  diferenciais:
    - semaforo L/D (4 niveis + bloqueio)
    - Kienzle (kc1.1) para forca de corte real
    - chip thinning automatico
    - formulas educativas com valores reais
    - gratis, sem login, offline, PT-BR
    - 824 testes, zero erros TypeScript
    - sliders ajuste fino + health bars + gauges
```

---

*v1.0 — 20/03/2026. Templates prontos de marketing: 4 emails (soft launch, comunidade, SENAI, PRO), 8 posts LinkedIn (storytelling, tecnico, carrossel, enquete, professor, ROI, roadmap, dica), 3 descricoes YouTube, 4 mensagens WhatsApp, 3 pitches 30s, 2 one-pagers (SENAI + distribuidores), guia de aula (3 paginas), flyer QR code, bios, assinatura email, og:image spec, checklist pre-lancamento. Baseado em dados reais de Docs 01-10 e estado v0.7.0.*
