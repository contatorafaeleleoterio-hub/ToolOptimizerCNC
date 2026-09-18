# Etapa 05 — UX Mobile, Hardware Back Button & Suporte In-App

## 1. Nome da Etapa
**UX Mobile, Hardware Back Button & Suporte In-App**

---

## 2. Objetivo da Etapa
Polir a experiência nativa do operador em dispositivos Android, garantindo que interações físicas do sistema operacional — em especial o botão nativo "Voltar" (Hardware Back Button e gestos de borda) — fechem gavetas e modais abertos antes de encerrar o aplicativo, integrando suporte nativo a entalhes de tela (notches), barra de status customizada e canal direto de suporte e feedback técnico via e-mail diretamente da tela de configurações.

---

## 3. Escopo Detalhado
1. **Interceptação Hierárquica do Botão Voltar Nativo:**
   - Integração do plugin `@capacitor/app` para escutar o evento `backButton`;
   - Implementação de máquina de estados de fechamento:
     1. Se a folha de resultados (`MobileResultsSheet`) estiver expandida: recolhe/fecha a folha;
     2. Se o painel de configurações (`SettingsView`) estiver aberto: fecha o painel e retorna à calculadora;
     3. Se a calculadora estiver na raiz sem modais: permite o fechamento/minimização do app pelo Android.
2. **Integração com a Barra de Status (`@capacitor/status-bar`):**
   - Configuração dinâmica da cor da status bar de acordo com o tema:
     - Tema Escuro: `#080C12` (estilo de ícones claros);
     - Tema Claro: `#F4F6F9` (estilo de ícones escuros);
   - Prevenção de sobreposição de elementos do topo (`MobileHeader` e Banner de Anúncios).
3. **Ajuste Fino de Safe Areas e Notches no CSS:**
   - Garantir que `env(safe-area-inset-top)` e `env(safe-area-inset-bottom)` protejam a visualização em aparelhos com ilha dinâmica ou entalhe de câmera;
   - Garantir que a barra fixa inferior (`MobileStickyBar`) nunca seja coberta pela linha de navegação por gestos do Android.
4. **Canal de Suporte e Feedback no Aplicativo:**
   - Inclusão de botão em `SettingsView.tsx`:
     - Título: *"Suporte & Feedback"*
     - Ação: Abrir cliente de e-mail padrão do aparelho direcionado para `tooloptimizercnc@gmail.com`;
     - Assunto e corpo pré-formatados com metadados do aparelho:
       ```
       Para: tooloptimizercnc@gmail.com
       Assunto: [Suporte ToolOptimizer CNC] Relato de Operação
       Corpo:
       --- Informações Técnicas ---
       Versão do App: 2.0.0
       Dispositivo: [Modelo detectado]
       Versão do Android: [Versão do SO]
       ----------------------------
       Descreva sua dúvida, sugestão ou parâmetro observado na máquina:
       ```

---

## 4. Estado Atual Conhecido
- No navegador, a navegação depende de botões na tela; no Android, sem listener, o botão voltar do celular fecha a aplicação instantaneamente;
- Não há botão de contato direto ou suporte integrado na interface do aplicativo;
- O layout mobile foi recentemente auditado com altura de toque de 44px (`--h-target`), necessitando apenas do tratamento de eventos do SO.

---

## 5. Principais Entregáveis
1. Listener de `backButton` em `@capacitor/app` com fechamento hierárquico testado;
2. Ajuste de tema nativo da status bar via `@capacitor/status-bar`;
3. CSS calibrado com proteção para barras de gestos e entalhes de tela;
4. Botão funcional de Suporte Técnico por e-mail em `SettingsView.tsx`.

---

## 6. Dependências Conhecidas
- **Pré-requisitos:** Etapa 02 (Capacitor) e Etapa 04 (Play Billing / Telas atualizadas).
- **Etapas dependentes:** Etapa 06 (Pipeline de Build) e Etapa 08 (Ciclo de Testes Fechados).

---

## 7. Critérios de Conclusão e Aceite
- [ ] Pressionar o botão físico "Voltar" com a folha de resultados aberta recolhe a folha sem fechar o app.
- [ ] Pressionar "Voltar" dentro das Configurações fecha a tela e volta para a calculadora.
- [ ] O toque no botão "Suporte & Feedback" abre o Gmail/cliente do aparelho com `tooloptimizercnc@gmail.com` preenchido.
- [ ] A status bar e a área inferior respeitam as margens do aparelho sem cortes de conteúdo.
- [ ] A suíte de testes de UI mobile (`src/ui/__tests__/mobile.spec.tsx`) permanece 100% verde.

---

## 8. Decisões da Etapa
- **D05-1 (Hierarquia Rígida de Retorno):** Evitar perda acidental de parâmetros de cálculo durante a digitação na máquina mantendo o retorno sempre em camadas.
- **D05-2 (Suporte Simplificado por E-mail):** Utilizar link `mailto:` nativo para evitar a necessidade de SDKs de chat ou plataformas pagas de helpdesk, mantendo a simplicidade operacional.

---

## 9. Pendências da Etapa
- [ ] Testar navegação por gestos em aparelhos Samsung One UI e Xiaomi MIUI/HyperOS;
- [ ] Testar comportamento em orientação horizontal (landscape) se aplicável.
