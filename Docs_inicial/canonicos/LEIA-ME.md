# Canônicos — a fonte única de verdade do Fenix

Esta pasta guarda os documentos que **valem como especificação**. Tudo que estiver aqui pode ser lido diretamente por quem for escrever código, sem precisar consultar mais nada.

**Os seis primeiros são de fresamento e se declaram assim**; o sétimo (04/09/2026) cobre as três
famílias que eles não cobrem e declara precedência sobre elas. Canônico novo entra na tabela abaixo.

O resto da pasta `Docs_inicial/` é função (`escopo/`), corte de produto (`mvp/`), processo e proveniência (`pesquisa/`) ou construção (`construcao/`). Aqui é o número, com fonte.

---

## Os canônicos

| Documento | Assunto | Origem | Estado |
|---|---|---|---|
| `CANONICO_GEOMETRIA_DE_CORTE.md` | profundidade axial, engajamento radial, faixa de diâmetro | pesquisa R1 | ✅ |
| `CANONICO_MOTOR_DE_CALCULO.md` | afinamento de cavaco, força específica, potência, torque | pesquisa R2 | ✅ |
| `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` | tipos, substratos, revestimentos, granularidade do catálogo | pesquisa R3 | ✅ |
| `CANONICO_VELOCIDADES_E_AVANCOS.md` | tabelas por material e diâmetro, janela de tolerância | pesquisa R4 | ✅ |
| `CANONICO_LIMITES_E_ALERTAS.md` | alertas, bloqueios, camadas de severidade | pesquisa R5 | ✅ |
| `CANONICO_DEFLEXAO_E_VIDA.md` | rigidez, deflexão, vida da ferramenta | pesquisa R6 | ✅ |
| `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` | furação, roscamento e mandrilamento: espessura de cavaco, avanço, velocidade, torque, potência, MRR | pesquisa R8 | ✅ |
| `CANONICO_ANGULOS_PONTA_BROCAS_HSS.md` | ângulos de ponta (σ) para brocas HSS por material, dureza e diâmetro | dados técnicos (07/09/2026) | ✅ |
| `CANONICO_VELOCIDADES_CORTE_SAE_1045.md` | faixas de velocidade de corte (vc) para aço SAE/AISI 1045 (torneamento, fresamento, furação, mandrilamento) | dados técnicos (07/09/2026) — sem fonte bibliográfica | ✅ |

---

## Modelo

```markdown
# Canônico — [Assunto]

**Status:** fonte única de verdade sobre [assunto].
**Precedência:** este documento vence [o que substitui] em qualquer divergência.
**Origem:** rodada de pesquisa R{n}, retorno de [data].
**Regra:** No Invention — nenhuma fórmula, constante de cálculo ou limiar derivado de constante física entra sem fonte citada.

## 1. Regras e fórmulas
[cada regra com: enunciado · fórmula com variáveis nomeadas · condição de validade · fonte · confiança]

## 2. Constantes e tabelas
[cada linha com fonte e confiança próprias — nunca confiança por tabela inteira]

## 3. O que foi decidido pelo Mestre
[decisões de produto que não vêm de fonte externa, com data]

## 4. Lacunas declaradas
[o que continua sem base, e o que seria preciso para fechar]

## 5. Consequências
[o que esta decisão implica para o comportamento do sistema, com número]
```

---

## As quatro obrigações de um canônico

1. **Declara precedência.** Diz o que substitui e que vence em caso de divergência. Documento que não declara precedência recria o problema que esta etapa existe para resolver.
2. **Toda constante e todo limiar derivado de constante física vêm com fonte.** Número de cálculo sem procedência não entra. Esta é a régua dos canônicos; fora deles — decisão de escopo, nome, vocabulário, limiar de julgamento de produto — ela não se aplica (decisão do Mestre, 01/09/2026).
3. **Prefere a fórmula à constante.** Onde o valor depende de outra grandeza, entrega a regra que o gera. Constante redonda é dívida técnica: sobrevive à mudança de contexto sem ninguém perceber que deixou de valer.
4. **Declara o que não sabe.** Lacuna registrada é resultado.

---

## O que um canônico nunca faz

- **Não cita arquivo, módulo, componente, tela ou nome interno de projeto nenhum.** Descreve a regra, não onde ela mora.
- **Não propõe implementação.** É especificação funcional: o que o sistema deve calcular e por quê, nunca como.
- **Não herda decisão por inércia.** Se um valor vem do sistema anterior, ele entra por ter passado pela auditoria ou pela pesquisa — nunca por já existir.
