# `planos/` — plano de ação, por estado

Regra de trânsito: um plano nasce em `pendentes/`; quando todo passo fecha, muda para `executados/`
inteiro (não se divide o arquivo). Quando o resultado já está absorvido em outro documento e o plano
em si não serve mais de referência de trabalho, ele desce para `../_arquivo/planos/`.

| Pasta | Critério |
|---|---|
| `pendentes/` | Tem passo não executado. É a próxima ação real do projeto. |
| `executados/` | Todo passo fechado, mas ainda vale como referência recente (o quê/por quê de uma decisão de construção). |
