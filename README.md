# Funil: 50 Modelos de Roupinhas Pet em Crochê

Página de vendas modelada na de Mochilas (`funis/mochilas-croche`), que por sua vez é cópia da de
miçanga: mesmo CSS, mesmo JS, mesma ordem de seções. Muda a paleta (caramelo, chocolate, creme,
tirada da capa), a copy e as imagens.

    node servidor.cjs     # http://localhost:4270
    node _montar.cjs      # remonta o index (legível)
    bash build.sh         # remonta e minifica (produção)
    node conferir.cjs     # ids, carrosséis, imagens, checkouts, TROCAR

## Como o index é gerado: NÃO editar o index.html à mão

- `_montar.cjs` lê o CSS e o JS de `../brincos-micanga/index.html`, troca a paleta e junta com
  `_corpo.html` (texto das seções) e `_utmify.html` (rastreio, no head).
- Amostras, prints de prova, depoimentos e bônus saem das listas no `_montar.cjs`.

## Imagens (todas reais, do entregável v2, Downloads/Roupas PET Croche/Entregável)

- `assets/hero*.webp`: capa + página 1 dos modelos 21 e 38, montada em HTML no Chrome (sem IA).
  Fonte: `entregaveis/roupa-pet-croche/landing/hero-montagem.html`.
- `assets/amostras` (560x792) e `amostras-sm` (320x452): página 1 dos modelos
  01, 21, 38, 15, 34, 47, 28, 25, 40, 44, 09, 49 (m01..m12, nessa ordem).
- `assets/receita/p1|p2` (760, 440 e full 1055): as 2 páginas do Modelo 01 Casaquinho Chocolate.

## Oferta (decisão do Heitor, 06/11/2026): plano único

- **R$ 17,90**, um card só ("de R$ 47" riscado, "Economize R$ 29,10", barra "62% de desconto"):
  https://pay.wiapy.com/rGR1KgkIvQL (botão `#btn-plano`, vai direto para o checkout).
- Sem plano Completo, sem popup de upsell (o bloco do popup é cortado do JS da micanga no
  `_montar.cjs`) e sem bônus.
- **Saída (back redirect): R$ 9,90**, https://pay.wiapy.com/CPhtAr-n3--1. Vai na página promo,
  que ainda não existe: o redirect fica desligado (`const link = 'TROCAR-DOMINIO/promo'`). Ao
  criar a promo, pôr a URL dela no `link` do `_montar.cjs` e remontar.
- Testado (06/11): o clique em `#btn-plano` não é interceptado, marca a guarda do back redirect e
  abre o checkout já com as UTMs anexadas pela UTMify.

## Falta

- **Prova de mercado**: 6 slots de print (TROCAR-PROVA-1..6) e 4 itens da lista
  (TROCAR-MERCADO-1..4) + nota com fonte e data. R$ 20 de linha e "R$ 100 ou mais" são os
  números do Heitor (roteiros dos criativos).
- **Depoimentos**: 6 slots (TROCAR-DEPOIMENTO-1..6), mesmo tamanho da mochila (560x1059).
- **Rastreio**: pixel UTMify TROCAR-PIXEL-UTMIFY (não carrega enquanto tiver TROCAR); pixel da
  Meta comentado; CashFlow não incluído. O script de UTMs da UTMify já está ligado.
- **Bônus**: seção escondida (`<section class="bonus" hidden>`). O produto não tem bônus.
- Página promo (R$ 9,90), rodapé (e-mail e CNPJ), deploy.
