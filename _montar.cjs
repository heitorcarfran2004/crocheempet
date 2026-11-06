// Monta o index.html das Roupinhas Pet a partir da pagina de micanga (mesmo CSS, mesmo JS,
// mesma estrutura), do mesmo jeito que funis/mochilas-croche/_montar.cjs, + o corpo proprio
// em _corpo.html. Rodar de novo sobrescreve o index.
//   node funis/roupa-pet-croche/_montar.cjs
const fs = require('fs');
const path = require('path');
const AQUI = __dirname;
const base = fs.readFileSync(path.join(AQUI, '..', 'brincos-micanga', 'index.html'), 'utf8').replace(/\r/g, '');
let corpo = fs.readFileSync(path.join(AQUI, '_corpo.html'), 'utf8').replace(/\r/g, '');

// ---------- head: CSS da micanga com a paleta da apostila pet (caramelo, chocolate, creme) ----------
let css = base.slice(base.indexOf('<style>'), base.indexOf('</style>') + 8);
const PALETA = [
  ['--coral:#E5446E', '--coral:#C0612B'], ['--coral-esc:#C32E56', '--coral-esc:#9C4A1D'],
  ['--coral-nevoa:#FDEFF3', '--coral-nevoa:#FBEEE4'],
  ['--turq:#12707C', '--turq:#6B3A1F'], ['--turq-esc:#0B5158', '--turq-esc:#4A2814'],
  ['--turq-claro:#1E97A4', '--turq-claro:#8E5530'],
  ['--mostarda:#F0A81E', '--mostarda:#E8A33A'], ['--mostarda-claro:#FFF3DA', '--mostarda-claro:#FDF1DC'],
  ['--tinta:#233039', '--tinta:#33251C'], ['--cinza:#5F7079', '--cinza:#6E6158'],
  ['--creme:#FDF9F4', '--creme:#FCF6EE'], ['--borda:#EFE6DC', '--borda:#F0E3D4'],
  // textos claros das secoes escuras: de turquesa para bege/caramelo claro
  [/#7EC6CE/g, '#F2C49B'], [/#9EE0E8/g, '#F7D3B0'], [/#B6D6DA/g, '#E9D2BE'], [/#8FB3B8/g, '#C9A68A'],
  [/#8FBCC2/g, '#D1AE92'], [/#D6EBEE/g, '#F6E7DA'], [/#0A464C/g, '#3A1F0F'], [/#E4F4F6/g, '#F7ECE2'],
  [/rgba\(18,112,124,/g, 'rgba(74,40,20,'], [/rgba\(11,81,88,/g, 'rgba(74,40,20,'],
  [/rgba\(229,68,110,/g, 'rgba(192,97,43,'],
];
PALETA.forEach(([de, para]) => { css = typeof de === 'string' ? css.split(de).join(para) : css.replace(de, para); });
css = css.replace('</style>', `
  .nota-mercado{margin:16px auto 0;max-width:620px;font-size:12.5px;color:var(--cinza);line-height:1.5}
  /* ---------- O QUE VAI RECEBER · as 2 paginas da receita ---------- */
  /* ordem da pagina: amostras (branco) > receber (creme) > desejo (branco) > vale (creme).
     Na micanga era o contrario, por isso os dois fundos sao invertidos aqui (igual mochila). */
  .receber{background:var(--creme)}
  .desejo{background:#fff}
  .etapas{display:grid;gap:clamp(16px,2.2vw,22px);max-width:940px;margin:40px auto 0}
  .etapa{display:grid;grid-template-columns:clamp(128px,34%,320px) 1fr;column-gap:clamp(16px,3.4vw,40px);
    grid-template-areas:"img topo" "img corpo";grid-template-rows:1fr 1fr;align-items:center;background:#fff;border:1px solid var(--borda);border-radius:20px;
    padding:clamp(14px,2.4vw,24px);box-shadow:0 10px 28px rgba(74,40,20,.07)}
  .etapa-topo{grid-area:topo;align-self:end}
  .etapa-corpo{grid-area:corpo;align-self:start}
  .etapa-img{grid-area:img;position:relative;display:block;width:100%;padding:0;border:none;background:#fff;
    border-radius:10px;overflow:hidden;cursor:zoom-in;line-height:0;
    box-shadow:0 12px 28px rgba(74,40,20,.18);transition:transform .18s,box-shadow .18s}
  .etapa-img:hover{transform:translateY(-3px) rotate(-.6deg);box-shadow:0 18px 36px rgba(74,40,20,.24)}
  .etapa-img img{width:100%;height:auto}
  .lupa{position:absolute;right:8px;bottom:8px;width:30px;height:30px;border-radius:50%;
    background:rgba(255,255,255,.94);color:var(--turq);font-size:16px;line-height:30px;text-align:center;
    box-shadow:0 3px 10px rgba(0,0,0,.14)}
  .etapa-num{display:inline-block;background:var(--turq);color:#fff;font-size:11.5px;font-weight:800;
    letter-spacing:1.2px;text-transform:uppercase;padding:6px 12px;border-radius:100px}
  .etapa h3{font-size:clamp(20px,2.6vw,27px);color:var(--tinta);margin:12px 0 8px;line-height:1.2}
  .etapa p{font-size:clamp(15px,1.7vw,17px);color:#4A3A30;font-weight:500;line-height:1.55}
  .etapa-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:16px}
  .etapa-tags li{list-style:none;background:var(--creme);border:1px solid var(--borda);color:var(--coral-esc);
    font-size:12.5px;font-weight:600;padding:5px 11px;border-radius:100px}
  @media(max-width:760px){
    .etapa{grid-template-columns:1fr;grid-template-areas:"topo" "img" "corpo";grid-template-rows:auto;
      row-gap:14px;text-align:center;padding:20px 16px 22px}
    .etapa-topo,.etapa-corpo{align-self:auto}
    .etapa-img{width:min(85%,325px);margin:0 auto}
    .etapa h3{margin:10px 0 0}
    .etapa-tags{justify-content:center}
  }
  @media(max-width:600px){
    .etapa{border-radius:16px}
    .etapa h3{font-size:21px}
    .etapa p{font-size:15px;line-height:1.5}
    .etapa-tags li{font-size:12px;padding:5px 10px}
  }

  /* visualizador: a pagina inteira na tela, rolavel se for maior que ela */
  .zoom[hidden]{display:none}
  .zoom{position:fixed;inset:0;z-index:100;background:rgba(40,22,12,.9);overflow:auto;
    display:flex;justify-content:center;align-items:flex-start;padding:56px 12px 24px;cursor:zoom-out}
  .zoom img{width:min(100%,900px);height:auto;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
  .zoom-x{position:fixed;top:10px;right:12px;width:42px;height:42px;border-radius:50%;border:none;
    background:#fff;color:var(--tinta);font-size:28px;line-height:1;cursor:pointer;font-family:inherit}

  /* plano unico: um card so, centralizado */
  .planos.um{grid-template-columns:1fr;max-width:540px;margin-left:auto;margin-right:auto}

  /* ---------- PLACEHOLDERS (prova que o Heitor ainda vai mandar) ----------
     Mesmo tamanho das imagens que entram no lugar: print 520x794, depoimento 560x1059. */
  .ph{display:flex;align-items:center;justify-content:center;text-align:center;padding:18px;
    background:repeating-linear-gradient(45deg,#FFF8EF,#FFF8EF 12px,#F8EADB 12px,#F8EADB 24px);
    border:2px dashed var(--coral);border-radius:12px;color:var(--coral-esc);font-weight:700;font-size:15px;line-height:1.4}
  .ph-prova{width:100%;aspect-ratio:520/794}
  .ph-dep{width:100%;aspect-ratio:560/1059;border-radius:18px}
  .trocar{background:#FFF3DA;border:1px dashed var(--mostarda);padding:0 6px;border-radius:4px;color:#9C4A1D;font-weight:700}
</style>`);

const HEAD = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>50 Modelos de Roupinhas Pet em Crochê Para Fazer em Casa</title>
<meta name="description" content="Receitas com gráfico, passo a passo fotografado e tabela de medidas para crochetar roupinhas que não se acham em pet shop, para cachorro e gato pequeno.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style"
      href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" media="print" onload="this.media='all'"
      href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600;700;800&display=swap">
<noscript><link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600;700;800&display=swap"></noscript>
<link rel="preload" as="image" href="assets/hero-420.webp"
      imagesrcset="assets/hero-420.webp 420w, assets/hero-700.webp 700w, assets/hero.webp 1100w"
      imagesizes="(max-width:820px) 85vw, 42vw" fetchpriority="high">

${fs.readFileSync(path.join(AQUI, '_utmify.html'), 'utf8').replace(/\r/g, '').trim()}

<!-- ============================================================
     CHECKOUTS (Wiapy) — decisao do Heitor em 06/11/2026: UM plano so.
       R$ 17,90  plano unico (front)              https://pay.wiapy.com/rGR1KgkIvQL
       R$ 9,90   oferta de saida (back redirect)  https://pay.wiapy.com/CPhtAr-n3--1
     O checkout de R$ 9,90 entra na pagina promo, que AINDA NAO EXISTE: por isso o back
     redirect abaixo continua desligado (link com TROCAR). Ao criar a promo, por a URL dela
     em 'link' (ex.: https://<dominio>/promo) e o redirect liga sozinho.
     Sem plano Completo e sem popup de upsell (o JS do popup e cortado mais abaixo).
     ============================================================ -->

<!-- back redirect: quem tenta sair vai para a oferta de saida -->
<script>
  // ALTERE O LINK PARA A PÁGINA QUE QUISER MOSTRAR QUANDO O USUÁRIO TENTAR SAIR.
  // Enquanto tiver TROCAR no link, o back redirect fica DESLIGADO (a promo ainda não existe).
  const link = 'TROCAR-DOMINIO/promo';

  // Guarda (mesma da micanga e da mochila): quem clicou num botão de checkout não é
  // jogado na oferta de saída.
  window.__indoParaCheckout = false;

  function setBackRedirect(url) {
    let urlBackRedirect = url;
    urlBackRedirect = urlBackRedirect =
      urlBackRedirect.trim() +
      (urlBackRedirect.indexOf('?') > 0 ? '&' : '?') +
      document.location.search.replace('?', '').toString();

    history.pushState({}, '', location.href);
    history.pushState({}, '', location.href);
    history.pushState({}, '', location.href);

    window.addEventListener('popstate', () => {
      console.log('onpopstate', urlBackRedirect);
      if (window.__indoParaCheckout) return;
      setTimeout(() => {
        location.href = urlBackRedirect;
      }, 1);
    });
  }

  if (link.indexOf('TROCAR') < 0) setBackRedirect(link);

  document.addEventListener('DOMContentLoaded', function () {
    // Com plano unico e sem popup, TODO botao .checkout desarma o back redirect ao ser clicado.
    // Os links de checkout são marcados pela classe .checkout, e não pelo domínio
    // do gateway (pay.wiapy.com): assim trocar de gateway não desarma esta guarda.
    document.querySelectorAll('a.checkout').forEach(function (a) {
      a.addEventListener('click', function () { window.__indoParaCheckout = true; });
    });
    // âncoras internas por scroll programático — não mexem no histórico
    document.querySelectorAll('.ir-oferta').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        var alvo = document.getElementById('oferta');
        if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  });
</script>

`;

// ---------- blocos repetidos ----------
// Pagina 1 (ficha + grafico) REAL de 12 modelos do entregavel v2 (Downloads/Roupas PET Croche/
// Entregável/Modelos N5b). m01..m12 = modelos 01, 21, 38, 15, 34, 47, 28, 25, 40, 44, 09, 49.
const AMOSTRAS = [
  'Casaquinho Chocolate', 'Vestido Azul de Babados', 'Fantasia de Abelhinha', 'Colete Granny',
  'Capa de Natal', 'Touca de Gatinho', 'Ponchito Andino', 'Vestido Girassol', 'Moletom Dinossauro',
  'Bandana Leque', 'Suéter Nórdico', 'Chapéu de Bruxa',
];
const fig = (n, alt, oculto) => `      <figure${oculto ? ' aria-hidden="true"' : ''}><img src="assets/amostras/${n}.webp" srcset="assets/amostras-sm/${n}.webp 320w, assets/amostras/${n}.webp 560w" sizes="(max-width:600px) 240px, 312px" alt="${oculto ? '' : 'Página da receita ' + alt}" width="560" height="792" loading="lazy" decoding="async"></figure>`;
const am = AMOSTRAS.map((a, i) => fig('m' + String(i + 1).padStart(2, '0'), a, false))
  .concat(AMOSTRAS.map((a, i) => fig('m' + String(i + 1).padStart(2, '0'), a, true))).join('\n');

// PROVA DE MERCADO: prints de anuncios reais (preco + vendidos) que o Heitor ainda vai mandar.
// Ate la, slots com placeholder no mesmo tamanho (520x794). Para trocar: por o webp em
// assets/provas/venda-0N.webp (+ provas-sm 340w) e mudar o item da lista para ['venda-0N', 'alt'].
// 06/11: 7 prints de anuncios (Shopee/Mercado Livre) mandados pelo Heitor (Downloads/Design sem nome),
// inteiros em 9:16 (520x924), sem corte.
const PROVAS = [
  ["venda-01", "Vestido de crochê pet vendido por R$ 91,53, mais de 3 mil vendidos"],
  ["venda-02", "Roupinha pet de crochê sob medida por R$ 109,25, 330 vendidos"],
  ["venda-03", "Roupinha para gato em tricô listrada por R$ 127,26, 773 vendidos"],
  ["venda-04", "Fantasia de abelha em crochê para pets por R$ 110,16, 8 mil vendidos"],
  ["venda-05", "Vestido de crochê para cachorro e gato por R$ 82,00, 115 vendidos"],
  ["venda-06", "Roupinha de crochê para pets por R$ 78,99, mais de mil vendidos"],
  ["venda-07", "Kit 2 roupas pet de crochê por R$ 97,89, mil vendidos"],
];
const pv = (p, i, oculto) => p
  ? `      <figure${oculto ? ' aria-hidden="true"' : ''}><img src="assets/provas/${p[0]}.webp" srcset="assets/provas-sm/${p[0]}.webp 340w, assets/provas/${p[0]}.webp 520w" sizes="(max-width:600px) 288px, 360px" alt="${oculto ? '' : p[1]}" width="520" height="924" loading="lazy" decoding="async"></figure>`
  : `      <figure${oculto ? ' aria-hidden="true"' : ''}><div class="ph ph-prova">[print de anúncio ${i + 1} — Heitor envia]<br>TROCAR-PROVA-${i + 1}</div></figure>`;
const provas = PROVAS.map((p, i) => pv(p, i, false)).concat(PROVAS.map((p, i) => pv(p, i, true))).join('\n');

// DEPOIMENTOS: 6 slots, mesmo layout da mochila (prints de conversa 560x1059). Sem material
// real ainda: placeholder. Para trocar: assets/depoimentos/dep-0N.webp (+ depoimentos-sm 340w).
const DEPS = [1, 2, 3, 4, 5, 6].map(i => null);
const deps = DEPS.map((d, i) => d
  ? `        <figure class="dep-slide"><img src="assets/depoimentos/${d}.webp" srcset="assets/depoimentos-sm/${d}.webp 340w, assets/depoimentos/${d}.webp 560w" sizes="(max-width:600px) 300px, 410px" alt="Conversa de uma aluna mostrando a roupinha que fez com o material" width="560" height="1059" loading="lazy" decoding="async"></figure>`
  : `        <figure class="dep-slide"><div class="ph ph-dep">[depoimento ${i + 1} — Heitor envia]<br>TROCAR-DEPOIMENTO-${i + 1}</div></figure>`).join('\n');

// BONUS: o produto pet NAO tem bonus prontos. A secao fica escondida (hidden) no _corpo.html
// e a lista vazia. Se um dia existir bonus, preencher como na mochila e tirar o hidden.
const BONUS = [];
const bonus = BONUS.map(() => '').join('\n');
const listaBonus = '';

corpo = corpo.replace('@@AMOSTRAS@@', am).replace('@@PROVAS@@', provas)
  .replace('@@BONUS@@', bonus).replace('@@DEPS@@', deps).replace('@@LISTA_BONUS@@', listaBonus);

// ---------- scripts do fim: identicos aos da micanga ----------
let js = base.slice(base.lastIndexOf('<script>'), base.lastIndexOf('</script>') + 9);
// plano unico: corta o bloco do popup de upsell (do comentario dele ate o da contagem regressiva)
const iPop = js.indexOf('  // Popup de upsell'), fPop = js.indexOf('  // contagem regressiva');
if (iPop < 0 || fPop < iPop) throw new Error('nao achei o bloco do popup no JS da micanga');
js = js.slice(0, iPop) + js.slice(fPop);

// visualizador das paginas da receita (igual mochila). Nao mexe no historico.
const ZOOM = `<script>
  (function () {
    var caixa = document.getElementById('zoom');
    if (!caixa) return;
    var img = caixa.querySelector('img');
    var ultimo = null;
    function abrir(botao) {
      ultimo = botao;
      img.src = botao.getAttribute('data-full');
      img.alt = botao.querySelector('img').alt;
      caixa.hidden = false;
      caixa.scrollTop = 0;
      document.body.style.overflow = 'hidden';
      caixa.querySelector('.zoom-x').focus();
    }
    function fechar() {
      caixa.hidden = true;
      document.body.style.overflow = '';
      if (ultimo) ultimo.focus();
    }
    document.querySelectorAll('.etapa-img').forEach(function (b) {
      b.addEventListener('click', function () { abrir(b); });
    });
    caixa.addEventListener('click', fechar);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !caixa.hidden) fechar();
    });
  })();
</script>`;

const html = HEAD + css + '\n</head>\n' + corpo + '\n' + js + '\n' + ZOOM + '\n\n</body>\n</html>\n';
fs.writeFileSync(path.join(AQUI, 'index.html'), html, 'utf8');
console.log('index.html: ' + html.length + ' bytes');
