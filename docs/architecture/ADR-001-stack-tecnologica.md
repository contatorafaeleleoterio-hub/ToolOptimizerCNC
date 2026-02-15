# ADR-001: Stack Tecnológica

**Status:** Aceito
**Data:** 15/02/2026
**Autores:** Rafael Eleotério

---

## Contexto

Escolha de stack para calculadora de parâmetros de corte CNC, desktop-first, single-user, sem backend.

Requisitos: cálculos em < 2 segundos, 9 materiais, validação de segurança (semáforo L/D), export PDF/clipboard, dark theme industrial.

## Decisão

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| UI | React | 18.3 |
| Linguagem | TypeScript (strict, zero `any`) | 5.7 |
| Build | Vite | 6.1 |
| State | Zustand | 5.0 |
| CSS | Tailwind CSS v4 (@theme tokens) | 4.0 |
| Routing | react-router-dom | 7.13 |
| Testes | Vitest + Testing Library | 3.0 |
| Storage | localStorage | - |
| Deploy | GitHub Pages (SPA redirect) | - |

## Alternativas Consideradas

- **Electron:** Descartado. Web app puro é suficiente — sem necessidade de acesso ao filesystem ou hardware.
- **Next.js:** Descartado. Sem backend, sem SSR — Vite é mais leve e rápido.
- **Redux:** Descartado. Zustand é mais simples para state local sem middleware complexo.

## Consequências

- Bundle ~96KB gzip (excelente performance)
- Zero dependência de servidor
- 325 testes garantem estabilidade
- Deploy gratuito via GitHub Pages
- Limitação: sem persistência multi-dispositivo (aceitável para MVP)
