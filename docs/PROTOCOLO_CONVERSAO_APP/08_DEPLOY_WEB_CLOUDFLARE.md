---
Documento: 08 — Deploy Web via Cloudflare Pages (Vite Edition)
Origem: Refinado por GESTOR
Status: ✅ ATUALIZADO (Foco em SPA Vite)
---

# 08 — Deploy Web via Cloudflare Pages

O ToolOptimizer CNC utiliza o Cloudflare Pages para hospedar a versão Web (PWA) e servir como base para o App Mobile.

---

## 1. Configuração do Build no Cloudflare

Ao conectar o repositório GitHub ao Cloudflare Pages, utilize as seguintes configurações:

| Campo | Valor |
|---|---|
| **Framework preset** | `Vite` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` |

---

## 2. Suporte a Rotas (Single Page Application)

Como o ToolOptimizer utiliza roteamento do lado do cliente (React Router), é obrigatório configurar um redirecionamento para evitar erros 404 ao recarregar páginas como `/mobile`.

### O que fazer:
Crie o arquivo `public/_redirects` com o seguinte conteúdo:
```text
/*    /index.html   200
```
*Isso garante que todas as requisições sejam tratadas pelo index.html do Vite.*

---

## 3. Variáveis de Ambiente (Opcional)

Se o app consumir APIs externas futuramente, configure-as no painel do Cloudflare em **Settings → Environment variables**.

---

## 4. Fluxo de Deploy Contínuo (CI/CD)

1. **Desenvolvimento:** O desenvolvedor faz alterações e testa localmente com `npm run dev`.
2. **Push:** As alterações são enviadas para o GitHub (`git push origin main`).
3. **Build:** O Cloudflare detecta o push e inicia o build automaticamente (~2 minutos).
4. **Live:** O sistema é atualizado em `https://tooloptimizercnc.pages.dev`.

---

## 5. Verificação Pós-Deploy

Execute os seguintes testes após o deploy:
- [ ] Acessar `https://seu-subdominio.pages.dev` e verificar se o Dashboard carrega.
- [ ] Acessar `https://seu-subdominio.pages.dev/mobile` diretamente na barra de endereços (deve carregar sem 404).
- [ ] Verificar se o Service Worker (PWA) está ativo para suporte offline.

---

## ✅ Checklist de conclusão desta etapa

- [ ] Projeto conectado ao GitHub no painel do Cloudflare.
- [ ] Comando de build configurado como `npm run build`.
- [ ] Arquivo `public/_redirects` criado e presente no repositório.
- [ ] Deploy automático validado após um `git push`.
- [ ] (Opcional) Domínio customizado `tooloptimizercnc.com.br` configurado.
- [ ] Commit: `git commit -m "deploy: configure cloudflare pages for vite spa"`
