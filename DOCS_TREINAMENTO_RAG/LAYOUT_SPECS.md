# Layout Specs - Architecture Map

Resumo do layout implementado no V1.

## Header

- botao `Voltar`
- titulo `Arquitetura do Sistema`
- toggles `Visao Geral`, `Modulos`, `Fluxo de Dados`
- visual consistente com as paginas existentes (`bg-surface-dark`, `shadow-glass`, `border-white/5`)

## Level 1

- 8 cards absolutos no canvas
- cada card exibe:
  - nome do grupo
  - subtitulo em portugues
  - total de arquivos
  - total de linhas
- conexoes em SVG com setas
- legenda fixa no canto inferior esquerdo

Grupos atuais:

- `Entry`
- `Pages`
- `Components`
- `Stores`
- `Engine`
- `Hooks`
- `Data`
- `Types`

## Level 2

- painel central expandido com scroll interno
- nodes SVG por arquivo com:
  - barra lateral por categoria
  - nome do arquivo
  - path resumido
  - badge de linhas
- grupos nao ativos viram pills minimizados
- arestas internas aparecem no painel expandido
- tooltip fixa perto do cursor ao passar sobre um node

## Level 3

- overlay acima do mapa
- 16 etapas em layout serpentina
- arestas `data-flow` animadas com `dashFlow`
- ponto cyan em loop continuo via `animateMotion`
- clique fora ou botao `Fechar` fecha o overlay

## Interacoes

- clique em grupo: entra no Level 2
- botoes do header: trocam o nivel
- `Escape`: 3 -> 2 -> 1
- `1`, `2`, `3`: atalho de teclado por nivel
- scroll: zoom entre `0.5x` e `2x`
- drag no fundo: pan do canvas
- duplo clique no fundo: reset de zoom e pan
