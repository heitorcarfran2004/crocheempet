// Conferência da página das Roupinhas Pet: ids que os scripts procuram, carrosséis, imagens
// que faltam, checkouts, placeholders e marcações TROCAR.
//   node conferir.cjs
const fs = require('fs');
const path = require('path');
const pasta = __dirname;
const s = fs.readFileSync(path.join(pasta, 'index.html'), 'utf8');

const ids = ['modelos', 'provas', 'deps', 'deps-dots', 'zoom', 'oferta', 'btn-plano', 'relogio'];
const faltam = ids.filter((i) => !s.includes('id="' + i + '"'));
console.log('ids dos scripts:', faltam.length ? 'FALTAM ' + faltam.join(', ') : 'todos presentes');
for (const t of ['modelos', 'provas']) {
  const bloco = s.slice(s.indexOf('id="' + t + '"'));
  const n = (bloco.slice(0, bloco.indexOf('</div>\n\n')).match(/<figure/g) || []).length;
  console.log('carrossel ' + t + ': ' + n / 2 + ' itens (x2 para o loop)');
}
console.log('depoimentos (slides):', (s.match(/class="dep-slide"/g) || []).length);
console.log('placeholders de prova/depoimento:', (s.match(/class="ph /g) || []).length);
const ck = [...s.matchAll(/<a[^>]*class="[^"]*checkout[^"]*"[^>]*>/g)].map((m) => (m[0].match(/href="([^"]+)"/) || [])[1]);
console.log('botões de checkout:', ck.length, ck.map((h) => /^https:\/\/pay\.wiapy\.com\//.test(h) ? 'ok' : h + ' <- PLACEHOLDER').join(' | '));
const refs = [...s.matchAll(/(?:src|href|data-full)="([^"]+\.(?:webp|png|jpg))"/g)].map((m) => m[1])
  .concat([...s.matchAll(/(assets\/[^\s"]+\.webp)/g)].map((m) => m[1]));
const unicas = [...new Set(refs)];
const sem = unicas.filter((f) => !fs.existsSync(path.join(pasta, f)));
console.log('imagens citadas:', unicas.length, '| não existem:', sem.length);
sem.forEach((f) => console.log('   falta', f));
const trocar = [...s.matchAll(/TROCAR[\w-]*/g)].map((m) => m[0]);
console.log('marcações TROCAR:', [...new Set(trocar)].join(', ') || 'nenhuma');
const texto = s.replace(/<!--[\s\S]*?-->/g, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '')
  .replace(/<section class="bonus" hidden>[\s\S]*?<\/section>/, '');
const proibidas = ['upsell', 'coleção completa', '25,90', '99,90', 'mochila', 'miçanga', 'brinco', 'ferragem', 'shopee', 'bônus 1', '5 bônus'];
const achou = proibidas.filter((w) => texto.toLowerCase().includes(w));
console.log('sobras da mochila/miçanga no texto visível:', achou.length ? achou.join(', ') : 'nenhuma');
console.log('back redirect:', /const link = '[^']*TROCAR/.test(s) ? 'DESLIGADO (link TROCAR)' : 'ligado',
  '| seção de bônus:', s.includes('<section class="bonus" hidden>') ? 'escondida' : 'VISÍVEL');
