# Etapa 04 — Ajustes de UX Industrial e Hardware Back Button

## 1. Nome da Etapa
**Ajustes de UX Industrial e Hardware Back Button**

---

## 2. Objetivo da Etapa
Polir a experiência nativa do aplicativo em dispositivos Android, garantindo que interações físicas do sistema operacional — em especial o botão nativo "Voltar" (Hardware Back Button / gesto de retorno) — funcionem de forma natural e previsível, fechando modais e gavetas abertas antes de encerrar o aplicativo, além de adaptar a interface a diferentes tamanhos de tela, entalhes (notches) e barras de status do sistema.

---

## 3. Escopo Preliminar
- Instalação e integração do plugin `@capacitor/app` para gerenciamento de eventos do ciclo de vida e navegação do Android;
- Implementação de interceptador global de retorno nativo (`App.addListener('backButton', ...)`):
  - Se a folha de resultados (`MobileResultsSheet`) estiver aberta, o toque no botão voltar apenas recolhe a folha;
  - Se o painel de configurações (`SettingsView`) estiver visível, o retorno leva o operador de volta para a calculadora;
  - Se a aplicação estiver na tela inicial sem modais ativos, o retorno confirma a saída do aplicativo;
- Configuração do plugin `@capacitor/status-bar` para calibrar a cor da barra de status de acordo com o tema ativo (`#080C12` no modo escuro e `#F4F6F9` no modo claro);
- Ajuste e validação de áreas seguras (*safe-area-inset-top* e *safe-area-inset-bottom*) no CSS para evitar que entalhes de câmeras ou barras de navegação virtuais cubram inputs ou a `MobileStickyBar`.

---

## 4. Estado Atual Conhecido
- No navegador web, a navegação depende puramente de controles visuais em tela;
- Se executado como app híbrido sem tratamento de `backButton`, qualquer toque no botão voltar do Android fecha o aplicativo imediatamente, fazendo o operador perder o contexto do cálculo em andamento;
- O layout mobile foi recentemente saneado e otimizado com touch targets de 44px (`--h-target`), mas ainda não possui listeners de eventos nativos do Android.

---

## 5. Principais Entregáveis já Identificados
1. Listener de `backButton` em `@capacitor/app` integrado ao estado do `CalculatorContext` ou casca mobile;
2. Comportamento hierárquico de retorno: fecha modal $\rightarrow$ fecha configurações $\rightarrow$ sai do app;
3. Integração com `@capacitor/status-bar` harmonizada com os tokens de cores do Design System;
4. CSS calibrado com `env(safe-area-inset-*)` em dispositivos modernos com notch.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 02 (Capacitor configurado).
- **Etapas dependentes:** Etapa 05 (Pipeline de Build) e Etapa 07 (Testes Fechados).

---

## 7. Critérios de Conclusão Preliminares
- [ ] Pressionar "voltar" no Android com a `MobileResultsSheet` aberta fecha o painel de resultados e mantém a calculadora aberta.
- [ ] Pressionar "voltar" dentro de `SettingsView` retorna para a tela principal de cálculo.
- [ ] A barra de status do Android adota as cores corretas do tema sem sobrepor elementos do `MobileHeader`.
- [ ] A `MobileStickyBar` inferior não é cortada por barras de navegação por gestos do Android.
- [ ] A suíte de testes de UI mobile (`src/ui/__tests__/mobile.spec.tsx`) continua 100% aprovada.

---

## 8. Decisões da Etapa
- **Decisão D04-1 (Prioridade de Fechamento de Modais):** O botão voltar deve sempre priorizar o fechamento da camada visual mais superior antes de permitir a saída do aplicativo, reduzindo fechamentos acidentais durante a operação.
- *Demais decisões:* Pendente de refinamento na abertura da etapa.

---

## 9. Pendências da Etapa
- [ ] Avaliar necessidade de prompt de confirmação ("Deseja sair do ToolOptimizer?") ao tentar fechar o app na tela inicial;
- [ ] Validar comportamento em telas pequenas de 5 polegadas e formatos ultrawide (20:9 e 21:9);
- [ ] *Demais pendências:* Pendente de refinamento ao iniciar a execução da Etapa 04.
