# APP-3 — Store Listing Assets & Textos
Data: 21/04/2026

---

## Ícone

- **Arquivo:** `public/icon-512.png` ✅ (já existe)
- **Tamanho Play Store:** 512×512 PNG

## Feature Graphic

- **Arquivo:** `public/feature-graphic.svg` ✅ (criado nesta sessão)
- **Tamanho Play Store:** 1024×500 PNG
- **Converter SVG → PNG antes de upload:**
  ```bash
  # Opção 1 — Chrome headless
  # Opção 2 — Inkscape CLI: inkscape --export-type=png --export-width=1024 feature-graphic.svg
  # Opção 3 — Online: svgtopng.com / cloudconvert.com
  ```

## Screenshots

- **Pasta:** `docs/screenshots/` (criada via Playwright — APP-3)
- **Tamanho requerido:** 1080×1920 px (portrait Android)
- **Mínimo Play Store:** 2 screenshots | **Recomendado:** 4–8
- **Telas a capturar:**
  1. `01-calculadora.png` — tela principal com resultado simulado
  2. `02-hmi-visor.png` — HMI Visor (interface mobile)
  3. `03-resultados.png` — aba Resultados com gauges
  4. `04-historico.png` — página de histórico
  5. `05-favoritos.png` — página de favoritos

---

## Descrição Curta (80 chars max)

```
Calcule parâmetros CNC em menos de 2 segundos
```
*(46 chars — dentro do limite)*

---

## Descrição Longa (PT-BR)

```
ToolOptimizer CNC — A calculadora profissional para operadores e programadores de fresamento CNC.

🔧 CALCULE EM SEGUNDOS
Digite o material, a ferramenta e as condições de corte. O app calcula RPM, Avanço, Potência, Torque e MRR instantaneamente — com validação de segurança visual (semáforo verde/amarelo/vermelho).

📐 MODELO DE KIENZLE
Utiliza o modelo de Kienzle para cálculo preciso da força específica de corte (kc), o padrão técnico usado em ambientes industriais.

⚡ FEITO PARA O CHÃO DE FÁBRICA
Interface HMI Visor de alto contraste, legível sob qualquer iluminação. Feedback visual imediato. Funciona offline — sem internet, sem login, sem assinatura.

✅ O QUE VOCÊ PODE CALCULAR
• RPM por velocidade de corte (Vc) e diâmetro
• Avanço por dente (fz) e avanço total (F mm/min)
• Potência e torque estimados
• Taxa de remoção de material (MRR)
• Relação L/D com alerta de vibração
• Fator de correção de entrada de corte (CTF)

💾 SALVE E REUTILIZE
Crie e salve ferramentas personalizadas. Favorite simulações para acessar rapidamente. Histórico completo com feedback de resultado real.

🆓 COMPLETAMENTE GRATUITO
Sem anúncios. Sem cadastro. Sem assinatura. Dados salvos localmente no seu dispositivo.

Desenvolvido por um profissional com 17+ anos de experiência em usinagem de moldes de injeção.
```

---

## Categoria e Classificação

| Campo | Valor |
|-------|-------|
| Categoria | Ferramentas (Tools) |
| Classificação etária | Everyone (PEGI 3 / ESRB Everyone) |
| Contém anúncios | Não |
| Compras no app | Não |
| Acesso à internet | Sim (necessário para carregar o app) |

---

## Privacy Policy

- **URL:** `https://tooloptimizercnc.com.br/privacidade`
- **Rota React:** `/privacidade` ✅ (criada nesta sessão)
- **Arquivo:** `src/pages/privacy-policy-page.tsx` ✅

---

## Checklist APP-3

- [x] Ícone 512×512 (`public/icon-512.png`)
- [x] Feature graphic SVG (`public/feature-graphic.svg`)
- [x] Descrição curta (46 chars)
- [x] Descrição longa PT-BR
- [x] Privacy Policy página (`/privacidade`)
- [x] Categoria + classificação definidos
- [ ] Screenshots 1080×1920 (via Playwright — ver abaixo)
- [ ] Converter feature-graphic.svg → PNG 1024×500
- [ ] APP-4: criar listing no Play Console + submeter

---

## Próximo — APP-4

1. Gerar APK Release assinado (keystore)
2. Criar listing no Google Play Console
3. Upload: ícone + feature graphic + screenshots
4. Copiar descrições desta página
5. Linkar privacy policy
6. Submit para revisão (~3-7 dias úteis)
