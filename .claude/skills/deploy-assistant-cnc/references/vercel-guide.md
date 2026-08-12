# Deploy no Vercel - Sistema Mestre CNC

## Visão Geral

**Plataforma:** Vercel (recomendado) ou Netlify (alternativa)

**Stack:** React + Vite + TypeScript

**Estratégia:** 
- **Produção:** Domínio próprio (ex: mestrecnc.com)
- **Teste:** Subdomínio (ex: teste.mestrecnc.com)
- **Preview:** Branches automáticos (Vercel)

## Por que Vercel?

### Vantagens

1. **Integração nativa com Vite** - Zero configuração
2. **Deploy automático** - Push para GitHub → Deploy instantâneo
3. **Preview deployments** - Cada branch/PR gera URL de preview
4. **Analytics gratuito** - Métricas de performance incluídas
5. **Edge Network global** - CDN automático, latência baixa
6. **SSL gratuito** - HTTPS automático
7. **Domínios customizados** - Fácil configurar domínio próprio

### Limitações (Hobby/Free)

- 100 GB bandwidth/mês (suficiente para MVP)
- Deploy ilimitados
- 1 projeto comercial permitido
- Sem limites de build time

## Pré-requisitos

### 1. Código Preparado

**Estrutura necessária:**
```
sistema-mestre-cnc/
├── package.json          # Scripts de build configurados
├── vite.config.ts        # Configuração Vite
├── tsconfig.json         # TypeScript configurado
├── .env.example          # Template de variáveis
├── .gitignore            # Arquivos ignorados
└── vercel.json           # Configuração Vercel (opcional)
```

**Scripts no package.json:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

### 2. Repositório Git

**GitHub, GitLab ou Bitbucket**

Vercel integra nativamente com os 3. Recomendado: GitHub

**Estrutura de branches:**
```
main           → Produção (mestrecnc.com)
staging        → Teste (teste.mestrecnc.com)
feature/*      → Preview automático (URLs temporárias)
```

### 3. Conta Vercel

1. Acessar [vercel.com](https://vercel.com)
2. Criar conta (recomendado: conectar com GitHub)
3. Plano Hobby (gratuito) é suficiente para começar

## Configuração Inicial

### Passo 1: Preparar Repositório

**Criar .gitignore (se não existir):**
```
# Dependências
node_modules/

# Build
dist/
build/

# Env
.env
.env.local
.env.*.local

# Editor
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

**Criar .env.example:**
```
# App Info
VITE_APP_NAME=Sistema Mestre CNC
VITE_APP_VERSION=1.0.0

# Features
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=false

# API (futuro)
# VITE_API_URL=https://api.mestrecnc.com
```

**Commitar e pushar:**
```bash
git add .
git commit -m "chore: Preparar para deploy Vercel"
git push origin main
```

### Passo 2: Conectar Vercel ao Repositório

**Via Dashboard Vercel:**

1. Login em [vercel.com](https://vercel.com)
2. Clicar "Add New Project"
3. Selecionar repositório GitHub
4. Importar projeto

**Via CLI (alternativa):**
```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer deploy
cd sistema-mestre-cnc
vercel

# Seguir prompts interativos
```

### Passo 3: Configurar Build

**Vercel detecta automaticamente:**
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Se precisar customizar, criar vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install"
}
```

### Passo 4: Configurar Variáveis de Ambiente

**No Dashboard Vercel:**

1. Settings → Environment Variables
2. Adicionar variáveis:

```
VITE_APP_NAME = Sistema Mestre CNC
VITE_APP_VERSION = 1.0.0
VITE_ENABLE_ANALYTICS = false
```

**Scopes disponíveis:**
- Production
- Preview
- Development

**Exemplo de uso no código:**
```typescript
// vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_ENABLE_ANALYTICS: string;
}

// App.tsx
const appName = import.meta.env.VITE_APP_NAME;
const version = import.meta.env.VITE_APP_VERSION;
```

## Deploy de Produção

### Primeira Deploy

**Automático (recomendado):**
1. Push para `main` branch
2. Vercel detecta e inicia build
3. Build completa → Deploy em URL temporária
4. Vercel gera URL: `sistema-mestre-cnc.vercel.app`

**Manual via CLI:**
```bash
vercel --prod
```

### Configurar Domínio Próprio

**Se você tem domínio (ex: mestrecnc.com):**

1. **No Vercel Dashboard:**
   - Project Settings → Domains
   - Add Domain: `mestrecnc.com`

2. **Configurar DNS (no registrador do domínio):**
   
   **Opção A - Apontar para Vercel (recomendado):**
   ```
   Tipo: CNAME
   Host: www
   Value: cname.vercel-dns.com
   
   Tipo: A
   Host: @
   Value: 76.76.21.21
   ```

   **Opção B - Usar Vercel Nameservers:**
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

3. **Aguardar propagação DNS** (até 48h, geralmente ~1h)

4. **Vercel configura SSL automaticamente** (Let's Encrypt)

### Subdomínio de Teste

**Configurar staging:**

1. Criar branch `staging`
2. No Vercel: Settings → Git
3. Branch: `staging` → Environment: `Preview`
4. Adicionar domínio: `teste.mestrecnc.com`
5. Configurar DNS:
   ```
   Tipo: CNAME
   Host: teste
   Value: cname.vercel-dns.com
   ```

**Workflow:**
```
feature/nova-funcao → PR para staging → teste.mestrecnc.com
staging → PR para main → mestrecnc.com
```

## Otimizações de Build

### Vite Config (vite.config.ts)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Aliases para imports limpos
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@types': path.resolve(__dirname, './src/types')
    }
  },
  
  // Otimizações de build
  build: {
    // Chunk splitting para melhor cache
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-alert-dialog'], // Se usar
          'calculations': ['./src/lib/calculations']
        }
      }
    },
    
    // Source maps apenas em dev
    sourcemap: false,
    
    // Minificação
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log em produção
        drop_debugger: true
      }
    }
  },
  
  // Preview server (testar build local)
  preview: {
    port: 4173,
    strictPort: true
  }
});
```

### TypeScript Config

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    /* Paths */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@lib/*": ["./src/lib/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Otimização de Assets

**Imagens:**
- Usar WebP quando possível
- Comprimir antes de commitar
- Lazy load para imagens abaixo da dobra

**Fonts:**
- Hospedar localmente ou usar CDN
- Preload de fonts críticas

**CSS:**
- Tailwind com purge habilitado (padrão no build)
- Remove CSS não utilizado automaticamente

## Monitoramento e Analytics

### Vercel Analytics (Gratuito)

**Habilitar:**
1. Project Settings → Analytics
2. Enable Web Analytics

**Métricas disponíveis:**
- Page views
- Unique visitors
- Top pages
- Referrers
- Devices/Browsers

### Speed Insights (Opcional)

**Core Web Vitals:**
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

**Instalar:**
```bash
npm install @vercel/speed-insights
```

**Usar:**
```typescript
// main.tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <SpeedInsights />
  </React.StrictMode>
);
```

## CI/CD com GitHub Actions (Opcional)

**Se quiser testes antes de deploy:**

`.github/workflows/test.yml`:
```yaml
name: Test

on:
  pull_request:
    branches: [main, staging]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Lint
        run: npm run lint
        
      - name: Build
        run: npm run build
```

## Troubleshooting

### Build Falha

**Erro: TypeScript errors**
```bash
# Local: rodar build e verificar erros
npm run build

# Verificar tipos
npx tsc --noEmit
```

**Erro: Missing dependencies**
```bash
# Verificar package.json
npm install

# Limpar cache
rm -rf node_modules package-lock.json
npm install
```

**Erro: Out of memory**
```json
// package.json - aumentar limite
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' vite build"
  }
}
```

### Deploy Lento

**Build otimizado:**
- Verificar tamanho de node_modules
- Usar cache de dependências
- Remover dependências não utilizadas

**Análise de bundle:**
```bash
npm install -D rollup-plugin-visualizer

# vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ]
});
```

### Preview não atualiza

**Forçar rebuild:**
1. Vercel Dashboard → Deployments
2. Encontrar deployment
3. Redeploy

**Limpar cache:**
```bash
vercel --force
```

## Checklist Pré-Deploy

**Antes de fazer primeiro deploy:**

- [ ] `npm run build` funciona localmente
- [ ] Sem erros TypeScript (`npx tsc --noEmit`)
- [ ] Sem console.log desnecessários
- [ ] .env.example atualizado
- [ ] README.md com instruções
- [ ] package.json com scripts corretos
- [ ] .gitignore inclui node_modules, dist, .env
- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] Domínio configurado (se aplicável)
- [ ] SSL verificado (HTTPS funcionando)

## Workflow Recomendado

### Desenvolvimento

```bash
# 1. Criar feature branch
git checkout -b feature/nova-calculadora

# 2. Desenvolver
npm run dev

# 3. Testar build
npm run build
npm run preview

# 4. Commit e push
git add .
git commit -m "feat: Adicionar calculadora X"
git push origin feature/nova-calculadora
```

### Preview

```bash
# 5. Criar PR para staging
# Vercel gera URL automática: feature-nova-calculadora-xxx.vercel.app

# 6. Testar preview
# Validar funcionalidade na URL de preview

# 7. Merge para staging
# Deploy automático em teste.mestrecnc.com
```

### Produção

```bash
# 8. Criar PR staging → main
# Revisar mudanças

# 9. Merge para main
# Deploy automático em mestrecnc.com

# 10. Verificar produção
# Testar funcionalidades críticas
```

## Rollback (Desfazer Deploy)

**Se algo der errado em produção:**

1. **Via Dashboard:**
   - Deployments → Encontrar deployment anterior
   - Três pontos (⋮) → Promote to Production

2. **Via CLI:**
   ```bash
   vercel rollback
   ```

3. **Via Git (reverter commit):**
   ```bash
   git revert HEAD
   git push origin main
   # Vercel faz deploy automático do revert
   ```

## Custos

### Vercel Hobby (Gratuito)

- **Deploy:** Ilimitados
- **Bandwidth:** 100 GB/mês
- **Build time:** Ilimitado
- **Concurrent builds:** 1
- **Domínios:** Ilimitados
- **SSL:** Incluído
- **Analytics:** Básico incluído

**Suficiente para:**
- MVP
- Teste com usuários reais
- Primeiros meses de operação

### Upgrade para Pro ($20/mês)

**Quando precisar:**
- Mais de 100 GB bandwidth/mês
- Builds concorrentes (múltiplos devs)
- Analytics avançado
- Password protection
- Suporte prioritário

## Próximos Passos

**Depois do primeiro deploy:**

1. **Configurar domínio próprio**
2. **Setup branch staging para testes**
3. **Habilitar Analytics**
4. **Configurar GitHub Actions (testes)**
5. **Monitorar Core Web Vitals**
6. **Documentar processo de deploy**

---

**Última Atualização:** 09/01/2025 - Rafael Mestre
