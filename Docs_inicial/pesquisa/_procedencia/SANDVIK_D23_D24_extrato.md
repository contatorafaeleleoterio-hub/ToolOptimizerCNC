# Extrato verbatim â€” Sandvik Coromant, Metalcutting Technical Guide, secao D (Milling), paginas D 23-D 24

Extraido em 20/08/2026 por pdftotext -layout, do PDF do catalogo (sandvik_5747275_catalog.pdf, 1,0 MB),
baixado do CDN de distribuicao da Sandvik. O site oficial responde com bloqueio de firewall.
A diagramacao em colunas embaralha alguns radicais na conversao; onde isso ocorre esta marcado.

```

                                                                                                                          C

General milling formulas                                                                                  fn

Cutting speed vc =  × Dc × n fz
                                                 1000
(m/min)

Spindle speed                                n = vc × 1000                                                                      D
(rev/min)                                              ×Dc
                                                                                                     zn=8
Table feed (feed speed)                      vf = fz × n ×zn
(mm/min)                                     fz = vf                                                                      E
Feed per tooth
(mm)                                                n ×zn                                            fz r = 90°

Feed per revolution                          fn = vf                                                 hex
(mm/rev)                                            n
                                                                                             Dc
Removal rate                                 Q = ap ×ae ×vf
(cm3)                                                 1000                                       hm                       F

Specific cutting force                       kc = kc1 × h -mc m                                      ae
(N/mm2)

Average chip thickness (mm)                  hm  fz ae
                                                     Dc                                                                   G
(Side and facemilling) when ae/Dc  0.1

Average chip thickness (mm)                  hm =  × Dc × arcsin ( ae sin r ×180 × ae ×fz )
when ae/Dc  0.1
                                                                            Dc

Machining time                               T = lm                                                                       H
                                             c vf
(min)

Net power                                    Pc = 60 ×106 ap ×ae ×vf ×kc × 
(kW)

                                                                                                                   D 23
   Milling

    Formulas for specific milling cutters

    Facemilling cutters, side and facemilling cutters and endmills

     These tools are characterized by having straight cutting edges.

A        ap                                            Max cutting diameter at a                 2 × ap
                                                       specific depth (mm)
                                                                                   De = Dc + tan r

             Dc
             De

B                                                      Feed per tooth (mm/tooth),  fz = hex
                                                       cutter centered
                                                                                       sin r

                                                       Feed per tooth (mm/tooth),  fz = De × hex
                                                       side milling                sin r × De - (De -2 × ae)2   2

C                                                      Max cutting diameter at a   De = Dc +iC2 - (iC - 2ap)2
                                                       specific depth (mm)
      Cutters with round inserts
                                                       Feed per tooth (mm/         fz = iC × hex
D ap                                                   tooth), cutter centered           De - Dc

                                                   Dc  Feed per tooth (mm/tooth),  fz = 2 2 De × iC × hex
                                                   De  side milling                     (De - Dc) × De - (De - 2 × ae)

E                                                      Max cutting diameter at a   De = D 2 3 - (D3 - 2 × ap)2
                                                       specific depth (mm)
F
                                                       Feed per tooth (mm/tooth),  fz = 2 2 D3 × hex
      Ballnose endmills                                side milling                     De - (De - 2 × ae)

G ap

                                           De

H

                                                       Feed per tooth (mm/tooth),  fz = D3 × hex
                                                       cutter centered                       De

   D 24
Calculation of power consumption                                Plunge milling                                     Milling

The example is valid for 0° top rake angle. The power consump-  Pc = 60 x 106 A x vf x Kx                                    A
```
