---
name: cnc-parameters-validator
description: Validar fórmulas e parâmetros de usinagem CNC (RPM, Vc, fz, ap, ae) contra normas e catálogos, com alertas de segurança. Usar SEMPRE antes de implementar qualquer cálculo.
---

# CNC Parameters Validator

Valida parâmetros de usinagem contra normas técnicas, catálogos de fabricantes e limites de segurança. Padrões de código: skill `cnc-standards`.

## Procedimento (obrigatório antes de implementar qualquer cálculo)
1. **Fórmula:** verificar em `references/formulas_validated.md`. Não existe lá → solicitar fonte ao Rafael. NUNCA inventar fórmula.
2. **Limites:** consultar `references/safety_limits.md` para o material/máquina/operação específicos.
3. **Testar com caso de catálogo** (valor conhecido, ex.: Vc=(π×D×n)/1000 com D=10mm, n=6366 → 200 m/min, Sandvik p.142).
4. **Citar fonte** (fabricante/norma, ano, página) — sem exceção. Hierarquia de confiabilidade: normas ISO/ANSI/DIN → fabricantes (Sandvik, Kennametal, Iscar, Mitsubishi) → handbooks → fabricantes de máquinas (Haas, DMG MORI, Mazak).
5. Para validar vários parâmetros de uma vez ou gerar alertas estruturados para a UI: `scripts/validate_params.py` (`CNCValidator`, `MachineType`, `Material` — `validate_complete_operation(params)`).

## Formatos de resposta (obrigatórios)
Validação OK:
```
✅ FÓRMULA VALIDADA
Fórmula: [equação]
Fonte: [fabricante/norma, ano, página]
Aplicação: [quando usar]
Limites: [min/max seguros]
Validação: [teste com valor conhecido]
```
Problema:
```
⚠️ PROBLEMA IDENTIFICADO
Parâmetro: [qual] | Valor fornecido: [X] | Limite seguro: [Y]
Problema: [descrição]
Fonte: [referência]
Recomendação: [ação]
```

## Sistema de alertas
**🔴 CRÍTICO — bloquear operação:** RPM > limite físico da máquina · potência > 95% da nominal · temperatura calculada > 1000 °C · parâmetros fora de qualquer faixa conhecida · risco imediato de quebra/fogo/sobrecarga.
```
🔴 ALERTA CRÍTICO - OPERAÇÃO BLOQUEADA
Parâmetro: [X] | Valor: [Y] | Limite máximo: [Z]
Fonte: [ref]
⛔ Risco: [qual] | 📋 Ação: [o que fazer]
```
**🟡 AVISO — verificação recomendada:** potência 80–95% · RPM > 8000 em máquina convencional · profundidade > 1.0×D sem confirmação de rigidez · fz fora do ideal.
```
🟡 AVISO - VERIFICAÇÃO RECOMENDADA
Parâmetro: [X] | Valor: [Y] | Fonte: [ref]
⚠️ Recomendação: [ação] | ✅ Operação possível com atenção
```
**🔵 SUGESTÃO — otimização:** parâmetros muito conservadores, combinação não otimizada, ciclo desnecessariamente longo.
```
🔵 SUGESTÃO - OTIMIZAÇÃO DISPONÍVEL
Situação: [atual] | Range típico: [faixa] | Fonte: [ref]
💡 Otimização: [proposta] | 📈 Ganho: [estimativa]
```

## Casos especiais (sempre alertar)
- **Titânio (Ti-6Al-4V):** Vc > 120 m/min → 🔴 risco de fogo · refrigeração < 20 L/min → 🔴. Sempre alertar sobre segurança.
- **Inconel/superligas:** sem dados validados — pedir confirmação ao Rafael e sugerir consulta a fabricantes especializados.
- **Hard milling (HRC > 45):** exige CBN/cerâmica; validar rigidez da máquina.
- **HSM:** confirmar que a máquina é classificada HSM e tem aceleração adequada.

## Manutenção
Atualização trimestral de `references/formulas_validated.md` e `safety_limits.md` (novos catálogos, revisões de norma, correções) — registrar data de revisão e fonte; testar o script Python se afetado. Toda fórmula mantém data de validação e fonte primária.

## Recursos
- `references/formulas_validated.md` — fórmulas validadas com fontes
- `references/safety_limits.md` — limites por material/máquina
- `scripts/validate_params.py` — validador programático
