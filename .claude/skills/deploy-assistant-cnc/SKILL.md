---
name: deploy-assistant-cnc
description: Preparar e validar deploy do app CNC em Vercel/Netlify — verificação pré-deploy, build, domínio e troubleshooting.
---

# Deploy Assistant CNC

Prepara e guia deploy em plataformas serverless (Vercel/Netlify). Nota: a produção atual do ToolOptimizer roda em Cloudflare Workers (`wrangler deploy` / GitHub Actions no push main) — esta skill cobre deploys Vercel/Netlify quando solicitados.

## Princípios
Zero downtime (preview antes de produção, rollback rápido) · automatizado (git push → deploy, sem passos manuais) · otimizado (build mínimo, Core Web Vitals) · monitorado (analytics, logs de erro, uptime).

## Workflow
1. **Verificar prontidão (sempre primeiro):** `python3 scripts/pre_deploy_check.py --path <projeto>` — checa package.json/scripts, TypeScript sem erros, build local, .gitignore, estrutura. Se houver problemas: listar, sugerir correções específicas e NÃO prosseguir até resolver.
2. **Consultar referências:** `references/vercel-guide.md` (guia completo) e `references/deploy-checklist.md` (checklist detalhado).
3. **Preparar arquivos.** Obrigatórios: `package.json` (scripts de build), `vite.config.ts`, `tsconfig.json`, `.gitignore`, `.env.example`. Recomendados: `vercel.json`, `README.md`, `.nvmrc`.
4. **Configurar build (Vercel):** framework Vite · build `npm run build` · output `dist` · install `npm install`. Variáveis `VITE_*` no painel da plataforma.
5. **Deploy:** primeira vez — conectar repo GitHub, importar no Vercel, configurar env vars; depois — `git push origin main` (deploy automático). Testar build local antes: `npm run build && npm run preview`.
6. **Validar pós-deploy:** site carrega · HTTPS/SSL ok · cálculos funcionam · responsivo mobile/desktop · Lighthouse > 90 · console sem erros.

## Recursos
- `references/vercel-guide.md` — guia completo Vercel (domínio, troubleshooting)
- `references/deploy-checklist.md` — checklist detalhado
- `scripts/pre_deploy_check.py` — verificação automática pré-deploy
