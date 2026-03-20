# 03 — Personas e Jornada de Compra: ToolOptimizer CNC

> **Versao:** 1.0 | **Data:** 20/03/2026 | **Autor:** Rafael Eleoterio + Claude
> **Formato:** Otimizado para consumo por LLMs — dados estruturados, sem prosa, alta densidade
> **Depende de:** `01-VISAO-PRODUTO.md` (produto, proposta de valor), `02-ANALISE-COMPETITIVA.md` (mercado, pricing)
> **Alimenta:** `04-ESTRATEGIA-SEO.md`, `06-ESTRATEGIA-CONTEUDO.md`, `07-MODELO-MONETIZACAO.md`, `10-LANDING-PAGE-SPEC.md`

---

## 1. VISAO GERAL DO PUBLICO-ALVO

```yaml
universo_total_br:
  operadores_cnc_estimado: 300.000-500.000
  salario_medio: R$3.089/mes (CLT 44h)
  faixa_etaria_dominante: 22-50 anos
  escolaridade_tipica: tecnico ou superior em manufatura
  contexto_trabalho: industria metalmecanica, moldes, autopecas, aeronautica

segmentacao:
  primarias: [operador_cnc, programador_cam, professor_senai, dono_oficina]
  secundarias: [encarregado_compras, encarregado_chao_fabrica]

comportamento_atual:
  maioria_nao_calcula: true
  usam_parametros_genericos: true
  motivo: falta de conhecimento + sobrecarga + falta de ferramenta acessivel
  fonte_de_parametros_atual:
    - catalogo_fabricante_impresso
    - planilha_interna_desatualizada
    - experiencia_propria
    - colega_mais_experiente
    - nada
```

---

## 2. PERSONAS PRIMARIAS

---

### PERSONA 1 — Carlos, Operador CNC

```yaml
id: P1
nome_ficticio: Carlos
papel: Operador CNC (chao de fabrica)

demografico:
  idade: 28-42 anos
  escolaridade: ensino medio + curso tecnico ou SENAI
  salario: R$2.500-R$4.000/mes
  localizacao: regioes industriais (SP, SC, PR, MG, RS)
  experiencia_cnc: 3-15 anos
  formacao_parametros: nenhuma (aprendeu na pratica)

contexto_trabalho:
  ambiente: chao de fabrica — barulho, lubrante, ritmo intenso
  equipamento: fresadora CNC (ROMI, Mazak, DMG, Haas)
  programacao: feita pelo programador CAM — Carlos opera
  pressao_diaria: tempo de ciclo, qualidade de peca, nao quebrar ferramenta
  acesso_digital: celular proprio (Android), computador compartilhado ou sem acesso
  pausas: almoco + intervalos curtos (10-15 min)

comportamento_atual:
  como_define_parametros:
    - usa o que o programador mandou
    - "ajusta no feeling" com base na experiencia
    - copia de outro programa que ja funcionou
    - usa tabela fixada na maquina (geralmente desatualizada)
  frequencia_calculo_real: raramente ou nunca
  reacao_quebra_ferramenta: "dei mais RPM e quebrou" | "avanco tava errado"

dores_principais:
  - quebra_fresa: custo direto + bronca do encarregado + tempo parado de maquina
  - inseguranca: "nao sei se esses parametros estao certos"
  - falta_referencia: nao tem para quem perguntar quando o programador nao esta
  - ferramentas_diferentes: cada fresa nova, nao sabe se os parametros servem
  - culpabilidade: quando algo da errado, o operador e o primeiro a ser questionado

gatilhos_de_busca:
  - acabou de quebrar uma fresa cara (R$200-800)
  - colega mostrou uma ferramenta no celular
  - levou uma bronca por parametros errados
  - novo material ou ferramenta que nunca usou
  - quer impressionar o encarregado / ser mais autonomo

como_descobre_tooloptimizer:
  - colega mostra no celular durante almoco
  - busca no Google: "calculadora rpm cnc" | "como calcular avanco fresa"
  - YouTube: video tecnico de usinagem
  - grupo WhatsApp de operadores

comportamento_de_adocao:
  velocidade: rapida — usa na mesma hora se funcionar
  criterio_principal: simples + resultado imediato + em portugues
  barreira: qualquer coisa que pareca tecnica demais ou que precise de login
  forma_de_uso: celular | momentos de preparo antes de usinar ou durante almoco
  retencao: alta se resolver o problema na primeira vez

mensagens_que_ressoam:
  - "Parametros certos em 2 segundos — sem conta, sem tabela"
  - "Chega de quebrar fresa por parametro errado"
  - "Funciona no celular, mesmo sem internet"
  - "Em portugues, do jeito que voce fala"

evangelizacao:
  potencial: ALTO — Carlos mostra para 2-5 colegas se funcionar
  como: "olha o app que achei" durante almoco ou pausa
```

---

### PERSONA 2 — Andre, Programador CAM

```yaml
id: P2
nome_ficticio: Andre
papel: Programador CNC / Programador CAM

demografico:
  idade: 25-40 anos
  escolaridade: tecnico em mecanica + tecnologia em manufatura | engenharia mecanica
  salario: R$4.000-R$8.000/mes
  localizacao: centros industriais + home office parcial
  experiencia: 4-12 anos em programacao CAM

contexto_trabalho:
  ambiente: escritorio tecnico ou sala de programacao
  software_cam: Mastercam | Machining Strategist | Fusion360 | EdgeCAM | NX CAM
  responsabilidade: criar programas G-code + definir parametros de corte + estrategia de usinagem
  pressao_diaria: prazo de entrega do programa + qualidade do acabamento + custo de ferramental
  acesso_digital: computador proprio, acesso livre a web

comportamento_atual:
  como_define_parametros:
    - usa valores padrao da biblioteca do software CAM
    - consulta catalogo do fabricante (Sandvik, Kennametal, Walter)
    - usa app do fabricante (CoroPlus, NOVO, Walter GPS)
    - experiencia propria + "o que sempre funcionou"
  problema_real: programa com valores que parecem corretos, mas so descobre o erro na maquina
  conhecimento_de_formulas: sabe que existem (RPM, fz, Vc) mas nao calcula — usa o que o software sugere

dores_principais:
  - parametros_errados_na_maquina: programa aprovado no escritorio, falha na producao
  - dependencia_fabricante: app do fabricante so funciona para as ferramentas daquela marca
  - falta_validacao_seguranca: software CAM nao tem semaforo L/D nem alerta de vibracao
  - retrabalho_caro: peca refugada por acabamento ruim = prejuizo real
  - justificar_parametros: encarregado ou cliente pede explicacao, nao tem dados para mostrar
  - ferramentas_nao_catalogadas: fresa generica ou de segunda linha sem dados do fabricante

gatilhos_de_busca:
  - cliente reclamou de acabamento ou tolerancia
  - ferramentas de novo fornecedor sem catalogo confiavel
  - precisa justificar parametros para engenheiro ou cliente
  - operador ligou dizendo que "esta vibrando muito"
  - projeto novo com material que nunca usinou

como_descobre_tooloptimizer:
  - busca Google tecnica: "calculadora parametros corte cnc" | "L/D ratio fresa vibracao"
  - LinkedIn (post tecnico de usinagem)
  - forum: usinagem.com.br | groups CAM | Reddit r/machining
  - colegas programadores / grupo profissional

comportamento_de_adocao:
  velocidade: media — avalia antes de adotar (compara resultado com o que ja usa)
  criterio_principal: precisao dos calculos + fonte tecnica (Kienzle, norma ISO) + confiabilidade
  diferencial_decisivo: semaforo L/D com bloqueio (nao existe em app de fabricante) + formulas visiveis
  forma_de_uso: computador no escritorio — antes de finalizar programa CAM
  potencial_uso_empresa: pode propor como ferramenta padrao do setor de programacao

mensagens_que_ressoam:
  - "Valida os parametros antes de ir para a maquina — nao depois"
  - "Semaforo L/D: sabe antes do operador se vai vibrar"
  - "Formulas visiveis com os valores reais — da para mostrar para o cliente"
  - "Funciona com qualquer fresa, de qualquer fabricante"
  - "Kienzle para potencia real, nao estimativa grosseira"

evangelizacao:
  potencial: MUITO ALTO — Andre tem autoridade tecnica
  como: propoe como ferramenta padrao para o setor | menciona em reunioes tecnicas | LinkedIn
```

---

### PERSONA 3 — Marcelo, Professor SENAI

```yaml
id: P3
nome_ficticio: Marcelo
papel: Instrutor / Professor Tecnico (SENAI | ETEC | Escola Tecnica Federal)

demografico:
  idade: 32-55 anos
  escolaridade: tecnico + tecnologia ou engenharia + pedagogia/licenciatura
  salario: R$3.500-R$6.500/mes
  localizacao: qualquer cidade com unidade SENAI (500+ unidades no Brasil)
  experiencia_industria: 5-20 anos antes de virar professor

contexto_trabalho:
  ambiente: sala de aula + laboratorio de usinagem
  turmas: cursos tecnicos de mecanica, usinagem, CAD/CAM, automacao
  carga_horaria: 20-40 horas/semana
  pressao_diaria: formar alunos com habilidade real + atender exigencias curriculares
  recursos_atuais: catalogos PDF impressos | planilhas antigas | lousa | maquinas didaticas

comportamento_atual:
  como_ensina_parametros:
    - formula na lousa + exercicio no caderno
    - planilha do Excel para calculo manual
    - catalogo do fabricante parceiro (geralmente 1 ou 2 marcas)
    - "na pratica voce vai aprender a ajustar"
  problema_real: aluno aprende a formula mas nao visualiza o que cada parametro significa
  falta: ferramenta interativa, gratuita, em portugues, que mostre formula + resultado + feedback visual

dores_principais:
  - ensino_abstrato: formula na lousa sem conexao com resultado real
  - falta_ferramenta_didatica: nao tem software gratuito, em PT-BR, para usar em aula
  - licencas_caras: G-Wizard ($216) ou HSMAdvisor sao inviáveis para licenciar para 30 alunos
  - catalogo_limitado: so ensina com ferramentas do fabricante parceiro
  - desatualizacao: catalogo PDF de 2018 com materiais que nao sao mais usados
  - engajamento: aluno nao se engaja com calculo manual repetitivo

gatilhos_de_busca:
  - preparando aula nova de parametros de corte
  - aluno perguntou "tem app para calcular?"
  - parceria com fabricante encerrou (perdeu acesso ao software)
  - congresso SENAI / evento pedagogico com troca de ferramentas
  - busca por "ferramenta didatica CNC gratuita"

como_descobre_tooloptimizer:
  - busca Google: "calculadora parametros corte gratuita" | "app usinagem educativo"
  - grupo de professores SENAI (WhatsApp/Telegram)
  - indicacao de colega instrutor
  - site mestrecnc.com.br (conteudo tecnico educativo)

comportamento_de_adocao:
  velocidade: media-lenta — avalia se e adequado para sala de aula, testa antes de apresentar
  criterio_principal: gratuito + formulas visiveis + em portugues + nao precisa de login para usar
  diferencial_decisivo: "formulas com valores reais substituidos" — e exatamente o que precisa em aula
  forma_de_uso: projetor em sala de aula + alunos com celular/computador proprio
  escala: 1 professor SENAI pode expor 10-30 alunos por turma, 2-4 turmas por ano

mensagens_que_ressoam:
  - "A formula na tela com os valores reais — seus alunos veem o calculo acontecer"
  - "Gratuito, sem login, funciona no celular do aluno"
  - "O semaforo L/D ensina o que o catalogo nunca explicou"
  - "Feito por quem trabalhou 16 anos no chao de fabrica"

evangelizacao:
  potencial: MULTIPLICADOR — Marcelo ensina 30-120 alunos/ano
  como: usa em aula -> alunos levam para o trabalho -> efeito cascata
  parceria_senai: oportunidade de institucionalizar (ferramenta recomendada pela rede)
```

---

### PERSONA 4 — Rogerio, Dono de Oficina

```yaml
id: P4
nome_ficticio: Rogerio
papel: Proprietario de Oficina CNC (microempresario)

demografico:
  idade: 38-55 anos
  escolaridade: tecnico em mecanica | tecnologia | superior incompleto
  faturamento_empresa: R$30.000-R$200.000/mes
  equipe: 2-10 funcionarios (1-5 maquinas CNC)
  localizacao: polos industriais — Sao Paulo, ABC, Campinas, Joinville, Caxias do Sul

contexto_trabalho:
  ambiente: chao de fabrica + escritorio improvisado na mesma sala
  responsabilidade: operacao + comercial + compras + financeiro (cuida de tudo)
  tipo_peca: usinagem sob encomenda (moldes, pecas autopecas, prototipagem)
  pressao_diaria: prazo de entrega + margem de lucro + custo de ferramental + qualidade
  tomada_decisao: rapida e pragmatica — sem burocracia, sem aprovacao de comite

comportamento_atual:
  gestao_de_parametros: delega para o operador mais experiente
  problema: nao tem padrao — cada operador usa o que sabe
  consequencias: quebras variaveis, qualidade inconsistente, custo imprevisivel
  quando_percebe: quando chega a nota fiscal de ferramental no final do mes

dores_principais:
  - custo_ferramental: R$15.000-50.000/ano em quebras — dinheiro saindo do lucro
  - dependencia_de_operador: perde o operador senior e perde o "know-how"
  - imprevisibilidade: nunca sabe quando vai quebrar uma fresa | custo por lote imprevisivel
  - qualidade_inconsistente: peca aceita com um operador, refugada com outro
  - nao_tem_dados: nao consegue cobrar melhoria porque nao tem registro do que acontece
  - novatos: operadores novos nao tem referencia — erram mais no inicio

gatilhos_de_busca:
  - chegou nota fiscal de ferramental com valor alto
  - perdeu um cliente por atraso causado por quebra de ferramenta
  - contratou operador novo que quebrou 3 fresas na primeira semana
  - ouviu de outro dono de oficina sobre reducao de custos
  - busca: "como reduzir quebra de fresa cnc" | "parametros de corte corretos"

como_descobre_tooloptimizer:
  - Google: "reduzir custo ferramental cnc" | "parametros de corte cnc"
  - indicacao de fornecedor de ferramentas (Sandvik rep, distribuidor local)
  - grupo WhatsApp de donos de oficina
  - operador da propria oficina mostrou

comportamento_de_adocao:
  velocidade: rapida se o ROI for claro — Rogerio nao tem tempo para avaliar em excesso
  criterio_principal: gratuito (risco zero) + vai reduzir quebras + facil de implementar
  forma_de_adocao: implementa para todos os operadores | pode virar procedimento interno
  potencial: 1 dono implementa para 2-8 operadores de uma vez

mensagens_que_ressoam:
  - "Fresa de metal duro custa R$200-800. Parametros certos eliminam quebras desnecessarias."
  - "Seu operador novo tera uma referencia — nao vai depender do mais experiente"
  - "Gratis. Sem mensalidade. Funciona offline no chao de fabrica."
  - "Padronize os parametros da sua oficina — independa do operador"

evangelizacao:
  potencial: ALTO — Rogerio tem autoridade sobre a equipe
  como: "agora todo mundo usa isso antes de usinar" — adocao forcada para a equipe
  efeito_rede: conta para outros donos no sindicato ou grupo de WhatsApp
```

---

## 3. PERSONAS SECUNDARIAS

```yaml
P5_encarregado_chao_fabrica:
  papel: Supervisor de producao / lider de equipe
  dor: cobrado por producao + custo ferramental — quer padrao de parametros
  gatilho: diretoria cobrou reducao de custo de ferramental
  uso: adota para equipe como procedimento | exige que operadores consultem antes de usinar
  mensagem: "Da para cobrar boas praticas da equipe quando tem uma referencia"
  potencial: implementa para grupo de 5-20 operadores

P6_encarregado_compras:
  papel: Setor de compras / almoxarifado de ferramentas
  dor: diretoria cobra reducao de gastos — nao tem dado para justificar compras
  gatilho: orcamento anual de ferramental acima do limite
  uso: nao usa o sistema diretamente — beneficia indiretamente quando operadores usam
  mensagem: "Com parametros corretos, cada fresa dura o dobro — e isso aparece no seu relatorio"
  potencial: influencia decisao de compra de ferramentas de qualidade (argumento: menos quebras)
```

---

## 4. MAPA DE JORNADA — Funil AARRR

### 4.1 Etapas por Persona

```yaml
etapa_aquisicao:
  definicao: como descobre o ToolOptimizer
  P1_operador:
    - colega mostra no celular (boca a boca)
    - Google: "calculadora rpm fresa" | "como calcular avanco cnc"
    - YouTube: video de usinagem com link na descricao
    - grupo WhatsApp de operadores
  P2_programador_cam:
    - Google tecnico: "L/D ratio vibracao fresa" | "calculadora kienzle"
    - LinkedIn: post tecnico
    - forum usinagem / Reddit / grupos CAM
    - colega programador
  P3_professor:
    - Google: "calculadora cnc gratuita educativa"
    - grupo professores SENAI
    - mestrecnc.com.br (conteudo tecnico)
  P4_dono_oficina:
    - Google: "reduzir quebra fresa cnc"
    - indicacao de fornecedor ferramentas
    - outro dono de oficina

etapa_ativacao:
  definicao: primeira experiencia — momento em que entende o valor
  P1_operador: calcula parametros de uma fresa real que esta usando — resultado em 2 segundos
  P2_programador_cam: valida L/D de um projeto atual — ve o semaforo funcionar
  P3_professor: testa em sala de aula — alunos veem formula com valores reais
  P4_dono_oficina: calcula RPM de uma operacao que seu operador "sempre ajustou no feeling"

  momento_aha:
    P1: "e isso mesmo, RPM de 8.300 — minha maquina aguenta"
    P2: "L/D 4.2 — amarelo! Era isso que estava vibrando."
    P3: "Os alunos entenderam a formula de primeira olhando o resultado"
    P4: "Meu operador estava rodando a 12.000 RPM quando o certo e 7.200"

etapa_retencao:
  definicao: voltam a usar com frequencia
  P1_operador: usa antes de cada material/ferramenta nova ou toda segunda-feira ao comecar a semana
  P2_programador_cam: consulta antes de finalizar cada programa CAM
  P3_professor: usa em toda aula de parametros de corte
  P4_dono_oficina: define como procedimento obrigatorio para a equipe

  frequencia_esperada:
    P1: 2-5x por semana
    P2: 1-3x por dia (varios programas)
    P3: 2-4x por semana (durante aulas)
    P4: indireta — mede pelo comportamento da equipe

etapa_receita:
  definicao: disposicao a pagar por features PRO (futuro)
  P1_operador: baixa — salario apertado, valoriza gratuidade
  P2_programador_cam: media — pagaria R$19-39/mes por historico em nuvem + export CAM
  P3_professor: baixa individual — alta se institucional (SENAI pode pagar por licenca)
  P4_dono_oficina: alta — pagaria R$49-99/mes por painel de gestao de equipe + relatorio de custos

etapa_referencia:
  definicao: indica ativamente para outros
  P1_operador: ALTO — mostra para 2-5 colegas
  P2_programador_cam: MUITO ALTO — LinkedIn + autoridade tecnica
  P3_professor: MULTIPLICADOR — 30-120 alunos/ano
  P4_dono_oficina: ALTO — grupo de donos de oficina + operadores proprios
```

---

### 4.2 Pontos de Friccao e Mitigacao

```yaml
friccao_P1_operador:
  - "Parece complicado" → interface com 3 campos principais + botao Simular
  - "Precisa de login?" → Nao. Zero login, zero cadastro
  - "Funciona no celular?" → Sim. Web responsiva + versao desktop offline

friccao_P2_programador_cam:
  - "Os calculos sao precisos?" → Kienzle (kc1.1), formulas ISO, safety factor 0.7-0.8
  - "Posso confiar mais do que o app do fabricante?" → brand-agnostic + Kienzle > SpeeDoctor
  - "So tem fresa?" → MVP: fresas de metal duro. Expansao planejada (dashboards separados)

friccao_P3_professor:
  - "Posso usar em sala?" → Sim, gratis, sem login, funciona no projetor
  - "E confiavel para ensinar?" → Formulas com fonte (ISO, Sandvik, Kienzle) + valores reais
  - "Aluno precisa instalar?" → Nao. Web — acessa pelo celular

friccao_P4_dono_oficina:
  - "Como implemento para a equipe?" → Link simples, sem instalacao, sem cadastro
  - "Vai funcionar na maquina deles?" → Funciona em qualquer celular Android com Chrome
  - "E so para fresa?" → Sim no MVP — mais ferramentas no roadmap pos-lancamento
```

---

## 5. INSIGHTS CROSS-PERSONA

```yaml
insight_1_idioma_decisivo:
  observacao: PT-BR e barreira zero para P1 e P3 — ingles elimina esses segmentos
  implicacao: manter interface 100% PT-BR e nao negociavel

insight_2_gratuidade_como_aquisicao:
  observacao: P1, P3 e P4 exigem gratuidade para adocao inicial
  implicacao: versao gratuita completa e prerequisito — nao freemium limitado
  monetizacao: features PRO para P2 e P4 (maior disposicao a pagar)

insight_3_boca_a_boca_dominante:
  observacao: P1 adota por indicacao de colega — nao por anuncio
  implicacao: cada Carlos satisfeito traz 2-5 novos usuarios sem custo de aquisicao
  acao: otimizar para "momentos de compartilhamento" (whatsapp, screenshot, link simples)

insight_4_professor_como_multiplicador:
  observacao: 1 professor SENAI expoe 30-120 alunos/ano ao produto
  implicacao: parceria institucional com SENAI tem ROI de aquisicao muito alto
  acao: criar pagina especifica "Para Educadores" com guia de uso em aula

insight_5_roi_para_dono:
  observacao: P4 toma decisao por ROI — custo vs. economia em ferramental
  implicacao: landing page deve ter calculadora de ROI (ex: "se voce quebra X fresas/mes...")
  mensagem: "Fresa de metal duro custa R$200-800. Parametros certos = menos quebras."

insight_6_validacao_como_valor:
  observacao: P2 (programador CAM) nao precisa de calculadora — precisa de validacao
  implicacao: semaforo L/D + health bars sao o principal diferencial para P2, nao o calculo em si
  mensagem: "Valide antes de ir para a maquina, nao depois"

insight_7_educacao_integrada:
  observacao: formulas com valores reais e um diferencial unico — especialmente para P3
  implicacao: "modo educativo" (mostrar formula expandida) deve ser destacado na landing
```

---

## 6. PROPOSTA DE VALOR POR PERSONA

| Persona | Mensagem Principal | Beneficio Chave | Diferencial Decisivo |
|---------|-------------------|-----------------|---------------------|
| **P1 Operador** | "Parametros certos em 2 segundos — sem conta, sem tabela" | Nao quebra fresa, nao leva bronca | PT-BR + celular + sem login |
| **P2 Programador CAM** | "Valida antes de ir para a maquina, nao depois" | Menos retrabalho, mais credibilidade tecnica | Semaforo L/D + Kienzle + brand-agnostic |
| **P3 Professor SENAI** | "Seus alunos veem a formula funcionando — nao so no quadro" | Engajamento + aprendizado real | Formulas visiveis + gratis + sem login |
| **P4 Dono Oficina** | "Padronize os parametros. Reduza quebras. Independa do operador." | R$15-50k/ano de economia | Gratis + implementa para equipe + ROI claro |

---

## 7. REFERENCIAS

```yaml
docs_internos:
  produto_uvp: 01-VISAO-PRODUTO.md (secao 3, 6)
  mercado_concorrentes: 02-ANALISE-COMPETITIVA.md (secao 3, gaps)
  seo: 04-ESTRATEGIA-SEO.md (keywords por persona)
  conteudo: 06-ESTRATEGIA-CONTEUDO.md (mensagens por etapa funil)
  monetizacao: 07-MODELO-MONETIZACAO.md (willingness to pay por persona)
  landing_page: 10-LANDING-PAGE-SPEC.md (copy por segmento)

fontes_mercado:
  forca_trabalho_cnc: 02-ANALISE-COMPETITIVA.md secao 1 (STIMMMEMS, CAGED, ABIMAQ)
  salario_operador: R$3.089/mes (CAGED 2024)
  custo_ferramental: 01-VISAO-PRODUTO.md secao 1 (R$15.000-50.000/ano)
  senai_unidades: 500+ unidades Brasil (fonte: SENAI Nacional)
```

---

*v1.0 — 20/03/2026. 4 personas primarias + 2 secundarias + jornada AARRR + insights cross-persona. Baseado em experiencia direta do criador (16+ anos chao de fabrica) + dados de mercado de `02-ANALISE-COMPETITIVA.md`.*
