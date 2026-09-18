# Centro de Planejamento de Lançamento Comercial — ToolOptimizer CNC

Bem-vindo ao diretório central de governança, planejamento, documentação e acompanhamento do lançamento do **ToolOptimizer CNC** na **Google Play Store**, com arquitetura 100% offline-first e modelo de monetização híbrido (Google AdMob + Google Play Billing R$ 6,90).

---

## 1. Finalidade deste Diretório

Este diretório funciona como o **centro de comando e planejamento permanente** do produto. Seu propósito é garantir a rastreabilidade total de todas as fases de engenharia, governança jurídica, conformidade com a Google Play Store e operação contínua, permitindo que o proprietário do produto e desenvolvedores compreendam com clareza:
- Em que ponto o projeto se encontra;
- O que já foi concluído e homologado;
- Quais são os bloqueadores reais e como mitigá-los;
- O que deve ser executado em seguida;
- Quais regras e decisões técnicas orientam cada etapa.

---

## 2. Documentos Estratégicos Centrais

1. **[PLAN_REVISION.md](PLAN_REVISION.md):**  
   Relatório executivo da auditoria do **Escopo 2**. Contém a análise profunda de lacunas nas 14 áreas, o veredito técnico descartando a necessidade de backend/painel próprio, a matriz de riscos e os bloqueadores regulatórios (como o teste fechado de 14 dias com 12 testadores).

2. **[00_MASTER_PLAN.md](00_MASTER_PLAN.md):**  
   O Plano Mestre de Lançamento Comercial do Produto. Consolida o objetivo geral, o estado do sistema, a classificação de todas as demandas (bloqueador, obrigatório, necessário, recomendado), o diagrama de dependências e o roadmap oficial em 10 etapas.

3. **[MONETIZATION_RESEARCH.md](MONETIZATION_RESEARCH.md):**  
   Estudo aprofundado de viabilidade econômica e técnica da monetização: AdMob vs. AdSense em WebViews, Google Play Billing sem login do usuário e ancoragem do preço definitivo de R$ 6,90.

---

## 3. As 10 Etapas do Roadmap

| Etapa | Nome | Foco Principal | Status |
|:---:|---|---|:---:|
| **[01](01-etapa/README.md)** | Governança, Landing Page, Privacidade & `app-ads.txt` | URLs públicas, LGPD/GDPR, `app-ads.txt` e Disclaimer CNC | **PENDENTE** |
| **[02](02-etapa/README.md)** | Reintegração do Wrapper Android (Capacitor 7) | Capacitor 7, Target SDK 35, Gradle moderno, ícones e splash | **PENDENTE** |
| **[03](03-etapa/README.md)** | Google AdMob & UMP (SDK Nativo & Consentimento) | SDK nativo GMA, UMP (LGPD), banner adaptativo no topo | **PENDENTE** |
| **[04](04-etapa/README.md)** | Google Play Billing (Compra Única R$ 6,90 Offline) | SKU `remove_ads`, validação sem login e cache offline | **PENDENTE** |
| **[05](05-etapa/README.md)** | UX Mobile, Hardware Back Button & Suporte In-App | Retorno nativo hierárquico, Safe Areas e botão de suporte | **PENDENTE** |
| **[06](06-etapa/README.md)** | Pipeline de Build Release, Keystore & GitHub Actions | Keystore protegida, pipeline CI/CD gerando `.aab` assinado | **PENDENTE** |
| **[07](07-etapa/README.md)** | Configuração Completa de Consoles (Play & AdMob) | Ficha de loja, ASO, Merchant Account, IARC e Data Safety | **PENDENTE** |
| **[08](08-etapa/README.md)** | Ciclo de Testes Fechados (14 Dias / 12 Testadores) | Cumprimento da regra temporal obrigatória do Google Play | **PENDENTE** |
| **[09](09-etapa/README.md)** | Troca para IDs de Produção & Publicação Final | IDs oficiais AdMob, `.aab` de produção e publicação na loja | **PENDENTE** |
| **[10](10-etapa/README.md)** | Operação, Monitoramento & Suporte Contínuo | Android Vitals, gestão financeira e updates sem perda de dados | **PENDENTE** |

---

## 4. Fluxo de Execução

$$\text{00\_MASTER\_PLAN.md} \longrightarrow \text{Selecionar Etapa Ativa} \longrightarrow \text{Executar Escopo} \longrightarrow \text{Validar Quality Gate} \longrightarrow \text{Atualizar Documentação} \longrightarrow \text{Avançar}$$

> [!IMPORTANT]
> **Integridade de Engenharia:** Qualquer código ou configuração adicionada deve manter os 120 testes automatizados da aplicação passando com 100% de sucesso (`npm run check` verde).
