# Checklist de Deploy - Sistema Mestre CNC

## Fase 1: Preparação do Código

### Build e Qualidade

- [ ] **Build local funciona**
  ```bash
  npm run build
  # Deve completar sem erros
  ```

- [ ] **TypeScript sem erros**
  ```bash
  npx tsc --noEmit
  # Zero erros
  ```

- [ ] **Lint passa**
  ```bash
  npm run lint
  # Sem warnings críticos
  ```

- [ ] **Preview local funciona**
  ```bash
  npm run preview
  # Abrir http://localhost:4173 e testar
  ```

### Código Limpo

- [ ] **Console.logs removidos**
  - Verificar código fonte
  - Remover debuggers temporários
  - Manter apenas logs essenciais

- [ ] **Comentários TODOs revisados**
  - Remover TODOs resolvidos
  - Documentar TODOs pendentes importantes

- [ ] **Imports não utilizados removidos**
  - ESLint detecta automaticamente
  - Limpar imports órfãos

- [ ] **Dependências limpas**
  ```bash
  npm prune
  # Remove dependências não usadas
  ```

### Arquivos de Configuração

- [ ] **.env.example atualizado**
  - Todas as variáveis documentadas
  - Valores de exemplo preenchidos
  - Sem valores sensíveis

- [ ] **.gitignore completo**
  ```
  node_modules/
  dist/
  .env
  .env.local
  ```

- [ ] **package.json correto**
  - Scripts de build configurados
  - Versão atualizada
  - Dependências corretas

- [ ] **README.md atualizado**
  - Instruções de instalação
  - Como rodar desenvolvimento
  - Como fazer build

## Fase 2: Configuração Vercel

### Conta e Projeto

- [ ] **Conta Vercel criada**
  - Preferencialmente conectada ao GitHub
  - Email verificado

- [ ] **Repositório conectado**
  - GitHub, GitLab ou Bitbucket
  - Vercel tem acesso ao repositório

- [ ] **Projeto importado**
  - Framework detectado (Vite)
  - Build command: `npm run build`
  - Output directory: `dist`

### Variáveis de Ambiente

- [ ] **Variáveis de produção configuradas**
  - VITE_APP_NAME
  - VITE_APP_VERSION
  - Outras necessárias

- [ ] **Scopes corretos**
  - Production: variáveis de produção
  - Preview: variáveis de teste
  - Development: variáveis locais

- [ ] **Sem valores sensíveis expostos**
  - API keys em variáveis de ambiente
  - Nunca commitar valores reais

### Build Settings

- [ ] **Node version especificada**
  - Recomendado: Node 18 LTS
  - Especificar em package.json:
    ```json
    "engines": {
      "node": ">=18.0.0"
    }
    ```

- [ ] **Build command correto**
  - Default: `npm run build`
  - Customizar se necessário

- [ ] **Output directory correto**
  - Default Vite: `dist`
  - Verificar vite.config.ts

## Fase 3: Primeiro Deploy

### Deploy de Teste

- [ ] **Push para repositório**
  ```bash
  git push origin main
  ```

- [ ] **Vercel inicia build automático**
  - Verificar no Dashboard
  - Aguardar conclusão

- [ ] **Build completa com sucesso**
  - Status: Ready
  - Sem erros de build

- [ ] **URL temporária gerada**
  - Ex: projeto.vercel.app
  - Salvar URL para testes

### Testes Funcionais

- [ ] **Aplicação carrega**
  - Abrir URL do Vercel
  - Página inicial exibe

- [ ] **Navegação funciona**
  - Testar todas as rotas
  - Verificar links

- [ ] **Cálculos funcionam**
  - Testar calculadora principal
  - Verificar resultados
  - Validar alertas

- [ ] **Responsividade OK**
  - Testar em mobile
  - Testar em tablet
  - Testar em desktop

- [ ] **Performance aceitável**
  - Tempo de carregamento < 3s
  - Interações responsivas
  - Sem travamentos

### Testes de Compatibilidade

- [ ] **Chrome (última versão)**
  - Funcionalidade completa
  - Sem erros no console

- [ ] **Firefox (última versão)**
  - Funcionalidade completa
  - Sem erros no console

- [ ] **Safari (se disponível)**
  - Funcionalidade completa
  - Testar em Mac/iOS

- [ ] **Edge (última versão)**
  - Funcionalidade completa
  - Compatibilidade Windows

## Fase 4: Domínio Próprio (Opcional)

### Configuração DNS

- [ ] **Domínio registrado**
  - Ex: mestrecnc.com
  - Acesso ao painel DNS

- [ ] **Domínio adicionado no Vercel**
  - Settings → Domains
  - Add Domain

- [ ] **DNS configurado**
  ```
  CNAME www → cname.vercel-dns.com
  A @ → 76.76.21.21
  ```

- [ ] **Propagação DNS completa**
  - Verificar: nslookup mestrecnc.com
  - Pode levar até 48h

- [ ] **SSL configurado**
  - Vercel configura automaticamente
  - Verificar HTTPS funciona

### Subdomínio de Teste

- [ ] **Branch staging criada**
  ```bash
  git checkout -b staging
  git push origin staging
  ```

- [ ] **Subdomínio configurado**
  - teste.mestrecnc.com
  - CNAME teste → cname.vercel-dns.com

- [ ] **Deploy automático staging**
  - Push para staging → deploy em teste.mestrecnc.com

## Fase 5: Otimizações

### Performance

- [ ] **Bundle size analisado**
  ```bash
  npm run build
  # Verificar tamanho de dist/
  ```

- [ ] **Code splitting configurado**
  - Chunks para React, UI libs
  - Lazy loading de rotas

- [ ] **Assets otimizados**
  - Imagens comprimidas
  - Fonts otimizadas

- [ ] **Lighthouse score > 90**
  - Performance > 90
  - Accessibility > 90
  - Best Practices > 90
  - SEO > 90

### Monitoramento

- [ ] **Vercel Analytics habilitado**
  - Settings → Analytics
  - Enable Web Analytics

- [ ] **Speed Insights instalado (opcional)**
  ```bash
  npm install @vercel/speed-insights
  ```

- [ ] **Error tracking configurado (futuro)**
  - Sentry, LogRocket ou similar
  - Apenas quando necessário

### SEO Básico

- [ ] **Meta tags configuradas**
  ```html
  <title>Sistema Mestre CNC - Calculadora de Parâmetros</title>
  <meta name="description" content="..." />
  ```

- [ ] **Favicon presente**
  - public/favicon.ico
  - Múltiplos tamanhos

- [ ] **robots.txt configurado**
  ```
  User-agent: *
  Allow: /
  ```

- [ ] **sitemap.xml criado (futuro)**
  - Quando tiver múltiplas páginas

## Fase 6: Documentação

### Documentação Interna

- [ ] **README atualizado com deploy**
  - Instruções de deploy
  - URLs de produção/teste
  - Variáveis de ambiente necessárias

- [ ] **Processo de deploy documentado**
  - Workflow git (branches)
  - Como fazer rollback
  - Contatos de suporte

- [ ] **Troubleshooting documentado**
  - Problemas comuns
  - Soluções conhecidas

### Acesso e Permissões

- [ ] **Credenciais documentadas**
  - Acesso Vercel (guardar com segurança)
  - Acesso DNS (registrador)
  - Acesso GitHub

- [ ] **Team access configurado**
  - Adicionar colaboradores se necessário
  - Definir permissões

## Fase 7: Pós-Deploy

### Validação Final

- [ ] **Domínio produção acessível**
  - https://mestrecnc.com funciona
  - SSL válido (cadeado verde)

- [ ] **Subdomínio teste acessível**
  - https://teste.mestrecnc.com funciona
  - Isolado de produção

- [ ] **Deploy automático funcionando**
  - Push para main → deploy produção
  - Push para staging → deploy teste

### Monitoramento Inicial

- [ ] **Verificar Analytics (primeiras 24h)**
  - Pageviews registrando
  - Sem erros 404
  - Bounce rate aceitável

- [ ] **Verificar logs de erro**
  - Vercel Dashboard → Logs
  - Sem erros críticos

- [ ] **Uptime verificado**
  - Site acessível continuamente
  - Sem downtime

### Backup e Segurança

- [ ] **Repositório Git atualizado**
  - Todo código em produção está committado
  - Tags de versão criadas

- [ ] **Backup de configurações**
  - Variáveis de ambiente salvas (seguro)
  - Configurações DNS documentadas

## Workflow de Deploy (Referência)

### Deploy de Feature Nova

```bash
# 1. Criar branch
git checkout -b feature/nova-calculadora

# 2. Desenvolver e testar
npm run dev

# 3. Build local
npm run build
npm run preview

# 4. Commit e push
git add .
git commit -m "feat: Nova calculadora"
git push origin feature/nova-calculadora

# 5. Vercel gera preview automático
# URL: feature-nova-calculadora-xxx.vercel.app

# 6. Testar preview, criar PR para staging

# 7. Merge para staging → teste.mestrecnc.com

# 8. Validar em teste, criar PR para main

# 9. Merge para main → mestrecnc.com
```

### Rollback Rápido

```bash
# Via Vercel Dashboard
# Deployments → Anterior → Promote to Production

# Via Git
git revert HEAD
git push origin main
# Vercel redeploy automático
```

## Status do Deploy

**Atualizar após cada fase:**

| Fase | Status | Data | Notas |
|------|--------|------|-------|
| 1. Preparação Código | ⏳ | - | - |
| 2. Config Vercel | ⏳ | - | - |
| 3. Primeiro Deploy | ⏳ | - | - |
| 4. Domínio Próprio | ⏳ | - | - |
| 5. Otimizações | ⏳ | - | - |
| 6. Documentação | ⏳ | - | - |
| 7. Pós-Deploy | ⏳ | - | - |

**Legenda:**
- ⏳ Pendente
- 🔄 Em Progresso  
- ✅ Concluído
- ⚠️ Bloqueado

---

**Última Atualização:** 09/01/2025 - Rafael Mestre
