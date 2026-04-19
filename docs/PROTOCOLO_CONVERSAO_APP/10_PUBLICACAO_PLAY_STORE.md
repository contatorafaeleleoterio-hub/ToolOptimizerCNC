---
Documento: 10 — Publicação na Google Play Store (Capacitor Edition)
Origem: Refinado por GESTOR
Status: ✅ ATUALIZADO (Foco em Produção Profissional)
---

# 10 — Publicação na Google Play Store

Este documento guia a transição do build de teste (APK) para a versão oficial de produção (.aab) na Google Play Store.

---

## 1. Preparação Técnica (Android App Bundle)

Diferente do APK de debug, a Play Store exige um arquivo assinado digitalmente (Keystore).

### 1.1 Gerar Keystore de Produção
*Ação manual (uma única vez):*
```bash
keytool -genkey -v -keystore tooloptimizer-release.keystore -alias tooloptimizer-alias -keyalg RSA -keysize 2048 -validity 10000
```
**⚠️ IMPORTANTE:** Guarde a senha e o arquivo `.keystore` em local seguro. Perder a chave significa perder o acesso para atualizar o app na loja.

### 1.2 Configurar GitHub Secrets
Para que o GitHub Actions gere o arquivo de produção automaticamente, adicione estes segredos no repositório (Settings -> Secrets -> Actions):
- `ANDROID_KEYSTORE_BASE64`: O conteúdo do arquivo `.keystore` em base64.
- `ANDROID_KEYSTORE_PASSWORD`: A senha definida na criação.
- `ANDROID_KEY_ALIAS`: O alias definido (ex: `tooloptimizer-alias`).
- `ANDROID_KEY_PASSWORD`: A senha da chave (geralmente a mesma da keystore).

---

## 2. Store Listing (Ficha Técnica Industrial)

O ToolOptimizer CNC deve ser apresentado como uma ferramenta de alta precisão.

### Textos Sugeridos:
- **Título (30 chars):** ToolOptimizer CNC
- **Descrição Curta (80 chars):** Otimize cálculos de corte CNC e prolongue a vida útil de suas ferramentas.
- **Descrição Longa:** Ferramenta indispensável para programadores e operadores CNC. Calcule Velocidade de Corte (Vc), Avanço por Dente (fz), RPM e Potência de corte com precisão cirúrgica. Baseado em algoritmos de usinagem avançados, o ToolOptimizer ajuda a evitar quebras e maximiza a produtividade no pé da máquina.

---

## 3. Screenshots e Identidade Visual

A Play Store exige:
- **Ícone:** 512x512 pixels (PNG sem transparência).
- **Screenshots:** Mínimo de 2 capturas em resolução 1080x1920 (Visor HMI, Sliders de Cálculo e Favoritos).
- **Banner:** 1024x500 pixels (Logo com fundo contrastante).

---

## 4. Política de Privacidade (Obrigatória)

A Google exige uma URL pública. Utilize o Cloudflare Pages (Doc 08):
- **URL:** `https://tooloptimizercnc.com.br/privacidade`
- **Conteúdo:** Deve informar que o app não coleta dados pessoais sensíveis e que os cálculos são realizados localmente no dispositivo.

---

## 5. Fluxo de Submissão

1.  **Build de Produção:** O GitHub gera o arquivo `app-release.aab`.
2.  **Play Console:** Crie um novo app, selecione "Produção" e faça o upload do `.aab`.
3.  **Configuração de Versão:** Defina as notas da versão (ex: "Lançamento inicial v1.0.0").
4.  **Revisão:** A Google levará de 24h a 72h para revisar e publicar o app.

---

## ✅ Checklist de conclusão desta etapa

- [ ] Keystore de produção gerada e guardada com segurança.
- [ ] Segredos configurados no GitHub Actions.
- [ ] Screenshots capturadas e otimizadas.
- [ ] Política de Privacidade publicada e link funcional.
- [ ] App Bundle (.aab) enviado para o Google Play Console.
- [ ] Status no Play Console: "Em análise".
- [ ] Commit: `git commit -m "docs: finalize play store publication guide"`
