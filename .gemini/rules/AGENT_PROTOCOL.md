# Protocolo de Agentes Gemini

Sempre que um agente for mencionado ou invocado via comando `/`, o Gemini deve seguir estas regras de busca de instruções:

## 1. Busca de SKILLS Externas (Prioridade Máxima)
Instruções de agentes que foram criados ou refinados pelo Claude estão localizadas na pasta de skills do usuário. O Gemini deve ler estes arquivos para obter as diretrizes de execução mais recentes:

- **GESTOR (CEO):** `C:\Users\USUARIO\.claude\skills\gestor\SKILL.md`
- **MARKETING:** `C:\Users\USUARIO\.claude\skills\marketing\SKILL.md`

## 2. Orquestração AIOX
Para agentes técnicos do framework AIOX, as regras de persona e workflow estão em:
- `.gemini/rules/AIOX/agents/`

## 4. Isolamento de Contexto (Multi-Projeto)
Como o comando `/gestor` e as instruções de `SKILL.md` são globais, o Gemini deve seguir rigorosamente estas regras para evitar confusão entre projetos:

- **Verificação de Diretório:** Antes de qualquer ação, o agente deve confirmar o `cwd` (current working directory).
- **Escopo Local:** Toda leitura de `project_status.md`, `package.json` ou `git log` deve ser restrita à raiz do projeto atual.
- **Memória Específica:** Nunca utilize informações de sessões de outros projetos para tomar decisões neste. O GESTOR deve "nascer" em cada projeto lendo apenas os arquivos locais.

---
*Este documento garante que o Gemini e o Claude compartilhem a mesma inteligência operacional e operacionalizem os mesmos agentes.*
