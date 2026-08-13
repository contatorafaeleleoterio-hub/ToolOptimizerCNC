# Contrato de Construção (Build Contract) — Gauntlet Loop v2

> **Documento Autoritativo de Domínio para o Construtor (Builder)**  
> **Escopo:** Especificação completa dos 18 tipos de ferramenta, 4 famílias de cálculo, fórmulas 1–28, regras de bloqueio, índice de saúde e tabelas de materiais/roscas.

---

## 1. Mapeamento dos 18 Tipos de Ferramenta em 4 Famílias

| ID Tipo | Nome Comercial | Família | Campos Específicos | $Z$ Padrão | Caso de Borda / Condição |
|---|---|---|---|---|---|
| `fresa_topo` | Fresa de Topo Reto | Fresar | $D, Z, L, ap, ae$ | 4 | Woxén se $ae < D/2$ |
| `fresa_toroidal` | Fresa Toroidal / Raio de Canto | Fresar | $D, r, Z, L, ap, ae$ | 4 | $Def = D - 2r + 2\sqrt{ap(2r - ap)}$ se $ap < r$ |
| `fresa_esferica` | Fresa Esférica (Ball Nose) | Fresar | $D, Z, L, ap, ae$ | 2 | $Def = 2\sqrt{ap(D - ap)}$ se $ap < D/2$ |
| `fresa_chanfrar` | Fresa de Chanfrar | Fresar | $D_{max}, D_{min}, \text{ângulo}, Z, ap$ | 4 | $D_{méd} = (D_{min} + D_{max})/2$ para cálculo |
| `fresa_alto_avanco` | Fresa de Alto Avanço (High-Feed) | Fresar | $D, \kappa, Z, ap, ae$ | 3 | $fz = hm / \sin \kappa$, $ap$ raso (0,5-2 mm) |
| `cabecote_faceador` | Cabeçote Faceador | Fresar | $D, \kappa, Z, ap, ae$ | 5 | $hm = fz \cdot \sin \kappa$, alerta se $ae > 0,8D$ |
| `fresa_pastilhada` | Fresa de Topo c/ Pastilhas | Fresar | $D, Z_{eff}, L, ap, ae$ | 2 | $ap_{max}$ limitado à aresta da pastilha |
| `fresa_disco` | Fresa de Disco / Serra | Fresar | $D, b, Z, ap_{rad}$ | 8 | $ap = b$, $ae = ap_{rad}$ (inversão geométrica) |
| `broca_hss` | Broca Helicoidal HSS / HSS-Co | Furar | $D, \text{ângulo ponta (118°/135°)}, L$ | 2 | Exige pica-pau se $L/D > 3$ |
| `broca_md` | Broca Inteiriça Metal Duro | Furar | $D, \text{ângulo (140°)}, L, \text{refrig interna}$ | 2 | Batimento máximo 0,02 mm |
| `u_drill` | Broca de Insertos (U-Drill) | Furar | $D, L, \text{pressão refrig}$ | 2 | $fn \ge 0,05\sqrt{D}$ (avanço mínimo obrigatório) |
| `broca_centro` | Broca de Centro / Spot Drill | Furar | $D, \text{ângulo (90°/120°)}, h_{ponta}$ | 2 | Ângulo $\ge$ broca subsequente |
| `escareador` | Escareador / Rebaixador | Furar | $D_{maior}, \text{ângulo}, Z, h$ | 3 | $Vc$ reduzido em 50% em relação à broca |
| `alargador` | Alargador (Reamer) | Furar | $D, Z, \text{sobremetal}, L$ | 6 | $Vc \approx 1/3$ da broca, $fn$ 2–3$\times$ maior |
| `macho_corte` | Macho de Corte | Roscar | $\text{Designação (M/MF)}, P, L_{rosca}$ | 3 | $Vf = P \cdot n$ (avanço travado), $\varnothing_{furo} = D - P$ |
| `macho_conformacao` | Macho de Conformação | Roscar | $\text{Designação (M/MF)}, P, L_{rosca}$ | 0 | $\varnothing_{furo} \approx D - P/2$, bloqueia em mat. frágil |
| `fresa_rosca` | Fresa de Rosca (Thread Mill) | Roscar | $D_{rosca}, D_{fresa}, P, Z$ | 3 | $Vf_{centro} = Vf_{perif} \cdot (D_{rosca} - D_{fresa})/D_{rosca}$ |
| `mandril` | Barra / Cabeçote de Mandrilar | Mandrilar | $\varnothing_i, \varnothing_f, L_{barra}, r_\varepsilon$ | 1 | $ap = (\varnothing_f - \varnothing_i)/2$, $L/D > 5$ bloqueia |

---

## 2. Funções Puras por Família de Cálculo

### 2.1 Família FRESAR
```typescript
function computeMilling(input: {
  materialPeca: string;
  materialFerramenta: string; // HSS | HSS_CO | MD | MD_REVESTIDO
  operacao: 'desbaste' | 'semi' | 'acabamento';
  D: number;
  Def?: number;
  Z: number;
  ap: number;
  ae: number;
  L: number;
  kappa?: number;
}): MillingResult;
```
**Saídas:** $n$ (rpm), $Vf$ (mm/min), $Vc_{real}$ (m/min), $hm$ (mm), $Q$ (cm³/min), $Pc$ (kW), $Mc$ (Nm), $L/D$, Nível Semáforo, Alerta Escrito, Índice de Saúde (0–100).

### 2.2 Família FURAR
```typescript
function computeDrilling(input: {
  materialPeca: string;
  materialFerramenta: string;
  tipo: 'broca_hss' | 'broca_md' | 'u_drill' | 'broca_centro' | 'escareador' | 'alargador';
  D: number;
  L: number;
  Z?: number;
}): DrillingResult;
```
**Saídas:** $n$ (rpm), $Vf$ (mm/min), $fn$ (mm/rot), $Lp$ (mm), $t$ (min), $Q$ (cm³/min), $Pc$ (kW), $Mc$ (Nm), Alerta Pica-pau, Nível Semáforo.

### 2.3 Família ROSCAR
```typescript
function computeThreading(input: {
  materialPeca: string;
  materialFerramenta: string;
  tipo: 'macho_corte' | 'macho_conformacao' | 'fresa_rosca';
  designacao: string; // ex: 'M10x1.5'
  D_nominal: number;
  P: number;
  D_fresa?: number;
}): ThreadingResult;
```
**Saídas:** $\varnothing_{furo\_previo}$ (mm), $n$ (rpm), $Vf$ (mm/min - travado em $P \cdot n$), $Mc_{est}$ (Nm), Alerta Furo Prévio / Torque.

### 2.4 Família MANDRILAR
```typescript
function computeBoring(input: {
  materialPeca: string;
  materialFerramenta: string;
  diametroInicial: number;
  diametroFinal: number;
  L_barra: number;
  r_epsi: number;
  fn: number;
}): BoringResult;
```
**Saídas:** $ap = (\varnothing_f - \varnothing_i)/2$, $n$ (rpm no $\varnothing_f$), $Vf$ (mm/min), $Ra$ ($\mu$m), $L/D$, Bloqueio se $L/D > 5$.

---

## 3. Fórmulas de Referência (1 a 28) e Casos de Borda

1. **Rotação ($n$):** $n = \frac{Vc \cdot 1000}{\pi \cdot Dc}$ (rpm) — usando $Dc = Def$ se aplicável.
2. **$Vc$ real:** $Vc = \frac{\pi \cdot Dc \cdot n}{1000}$ (m/min).
3. **$Vc$ corrigido:** $Vc = Vc_{base} \cdot \text{fator\_ferramenta} \cdot \text{fator\_revestimento}$.
4. **Avanço de mesa (Fresas):** $Vf = fz \cdot Z \cdot n$ (mm/min).
5. **Avanço linear (Fura/Mandrila):** $Vf = fn \cdot n$ (mm/min).
6. **Avanço em rosca (Macho):** $Vf = P \cdot n$ (mm/min — travado no passo).
7. **Woxén ($ae < D/2$):** $hm = fz \cdot \sqrt{ae / D} \implies fz_{efetivo} = \frac{hm}{\sqrt{ae/D}}$.
8. **Espessura de cavaco por $\kappa$:** $hm = fz \cdot \sin \kappa \implies fz = \frac{hm}{\sin \kappa}$.
9. **Diâmetro Efetivo (Esférica):** $Def = 2 \sqrt{ap(D - ap)}$ se $ap < D/2$.
10. **Diâmetro Efetivo (Toroidal):** $Def = D - 2r + 2 \sqrt{ap(2r - ap)}$ se $ap < r$.
11. **Taxa de Remoção (Fresamento):** $Q = \frac{ap \cdot ae \cdot Vf}{1000}$ (cm³/min).
12. **Taxa de Remoção (Furação):** $Q = \frac{D \cdot fn \cdot Vc}{4}$ (cm³/min).
13. **Força Específica de Kienzle ($kc$):** $kc = kc1.1 \cdot h^{-mc}$ (N/mm²).
14. **Potência de Corte (Fresamento):** $Pc = \frac{Q \cdot kc}{60000}$ (kW).
15. **Potência de Corte (Furação):** $Pc = \frac{fn \cdot Vc \cdot D \cdot kc}{240 \cdot 10^3}$ (kW).
16. **Potência do Motor:** $P_{motor} = \frac{Pc}{\eta}$ ($\eta = 0,85$).
17. **Torque ($Mc$):** $Mc = \frac{Pc \cdot 30000}{\pi \cdot n} = 9549 \cdot \frac{Pc}{n}$ (Nm).
18. **Ponta da Broca ($Lp$):** $Lp = \frac{D}{2} \cdot \tan(90° - \text{ângulo}/2)$ (mm).
19. **Tempo de Furo ($t$):** $t = \frac{L + Lp}{Vf}$ (min).
20. **Furo Prévio Macho Corte:** $\varnothing = D - P$ (mm).
21. **Furo Prévio Macho Conformação:** $\varnothing \approx D - P/2$ (mm).
22. **Engajamento de Crista (Rosca):** $\varnothing = D - (\%/100) \cdot P \cdot 1,0825$ (mm).
23. **Compensação Fresa de Rosca:** $Vf_{centro} = Vf_{perif} \cdot \frac{D_{rosca} - D_{fresa}}{D_{rosca}}$.
24. **Profundidade Mandrilamento:** $ap = \frac{\varnothing_f - \varnothing_i}{2}$ (mm).
25. **Rugosidade Teórica:** $Ra = \frac{f^2}{8 \cdot r_\varepsilon} \cdot 1000$ ($\mu$m).
26. **Altura de Crista 3D:** $h = \frac{ae^2}{8 \cdot R}$ ($\mu$m).
27. **Relação de Balanço:** $L/D = \frac{\text{balanço}}{\text{diâmetro}}$.
28. **Fator de Segurança (SF):** $Pc_{exibida} = Pc \cdot SF$ e $Mc_{exibido} = Mc \cdot SF$ (aplica-se **apenas** a potência e torque).

---

## 4. Regras de Bloqueio por Família

- **Fresamento:** $L/D \le 3$ (Verde) $\cdot$ $3 < L/D \le 4$ (Amarelo) $\cdot$ $4 < L/D \le 6$ (Vermelho) $\cdot$ $L/D > 6$ (**Bloqueado**).
- **Mandrilamento:** $L/D \le 3$ (Verde) $\cdot$ $3 < L/D \le 4$ (Amarelo) $\cdot$ $4 < L/D \le 5$ (Vermelho) $\cdot$ $L/D > 5$ (**Bloqueado**).
- **Furação:** $L/D > 3$ exige ciclo pica-pau (Aviso) $\cdot$ U-drill exige $fn \ge 0,05\sqrt{D}$ (Alerta de avanço mínimo).
- **Roscamento:** Furo prévio menor que o limite calculado = **Bloqueado** $\cdot$ Torque estimado $> M_{máquina}$ = **Bloqueado**.

---

## 5. Base de Dados de 12 Materiais

| Material | ISO | Dureza | $kc1.1$ (N/mm²) | $mc$ | $Vc$ Desbaste | $Vc$ Semi | $Vc$ Acabamento | Status |
|---|---|---|---|---|---|---|---|---|
| **Aço 1020** | P | 140 HB | 1800 | 0.17 | 180 m/min | 220 m/min | 260 m/min | ✅ Validado |
| **Aço 1045** | P | 190 HB | 2165 | 0.155 | 140 m/min | 180 m/min | 220 m/min | ✅ Validado |
| **Aço Inox 304** | M | 160 HB | 2150 | 0.185 | 90 m/min | 120 m/min | 150 m/min | ✅ Validado |
| **Alumínio 6061-T6** | N | 95 HB | 1200 | 0.75 | 400 m/min | 600 m/min | 800 m/min | ⚠️ Estimado |
| **Aço P20** | P | 300 HB | 2300 | 0.20 | 110 m/min | 140 m/min | 170 m/min | ⚠️ Estimado |
| **Aço 2711** | P | 320 HB | 2500 | 0.20 | 100 m/min | 130 m/min | 160 m/min | ⚠️ Estimado |
| **Aço 8620 (Núcleo)** | P | 200 HB | 2100 | 0.20 | 130 m/min | 160 m/min | 200 m/min | ⚠️ Estimado |
| **Aço 8620 (Cementado)** | H | 60 HRC | 2800 | 0.20 | 50 m/min | 70 m/min | 90 m/min | ⚠️ Estimado |
| **Aço H13 (Tratado)** | H | 50 HRC | 2800 | 0.20 | 60 m/min | 80 m/min | 110 m/min | ⚠️ Estimado |
| **Ferro Fundido GG25** | K | 200 HB | 1150 | 0.20 | 120 m/min | 160 m/min | 200 m/min | ⚠️ Estimado |
| **Ferro Fundido GGG50** | K | 220 HB | 1500 | 0.20 | 100 m/min | 130 m/min | 170 m/min | ⚠️ Estimado |
| **Titânio Ti-6Al-4V** | S | 340 HB | 2800 | 0.22 | 40 m/min | 60 m/min | 80 m/min | ⚠️ Estimado |

### Fatores de Material da Ferramenta:
- **Aço Rápido (HSS):** $0,29$
- **Aço Rápido ao Cobalto (HSS-Co):** $0,37$
- **Metal Duro Inteiriço (MD):** $1,00$ (referência base)
- **Metal Duro Pastilha Revestida:** $1,25$

---

## 6. Tabela Interna de Roscas Métricas (M e MF)

| Rosca | Passo Grosso ($P$) | Furo Corte ($\varnothing$) | Furo Conformação ($\varnothing$) | Passo Fino Disponível |
|---|---|---|---|---|
| **M3** | 0,5 mm | 2,5 mm | 2,75 mm | — |
| **M4** | 0,7 mm | 3,3 mm | 3,65 mm | — |
| **M5** | 0,8 mm | 4,2 mm | 4,60 mm | — |
| **M6** | 1,0 mm | 5,0 mm | 5,50 mm | — |
| **M8** | 1,25 mm | 6,8 mm | 7,40 mm | MF8x1.0 ($\varnothing$ 7,0 mm) |
| **M10** | 1,50 mm | 8,5 mm | 9,25 mm | MF10x1.25 ($\varnothing$ 8,8 mm) |
| **M12** | 1,75 mm | 10,2 mm | 11,10 mm | MF12x1.5 ($\varnothing$ 10,5 mm) |
| **M16** | 2,00 mm | 14,0 mm | 15,00 mm | MF16x1.5 ($\varnothing$ 14,5 mm) |
