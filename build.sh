#!/usr/bin/env bash
# Gera o index.html pronto para produção.
#   bash build.sh
#
# 1. monta a página legível (_montar.cjs) — a promo ainda não existe neste funil
# 2. minifica (nunca editar o index à mão: rode este script de novo)
# 3. acrescenta decoding="async" nas imagens lazy que não têm
#
# O que NÃO muda: texto, CSS, imagens, links de checkout, UTMify e back redirect. A
# minificação só tira espaço e comentário; o JS passa pelo terser sem renomear nada
# global, então o script da UTMify e o do back redirect continuam idênticos no efeito.
set -eu
cd "$(dirname "$0")"
node _montar.cjs


for f in index.html; do
  npx -y html-minifier-terser@7.2.0 \
    --collapse-whitespace --conservative-collapse \
    --remove-comments --minify-css true \
    --minify-js '{"mangle":{"toplevel":false},"compress":{"passes":1}}' \
    --remove-redundant-attributes --remove-script-type-attributes \
    -o "$f.min" "$f"
  node -e "
    const fs=require('fs');let h=fs.readFileSync('$f.min','utf8');
    h=h.replace(/<img(?![^>]*decoding=)([^>]*loading=\"lazy\"[^>]*)>/g,'<img decoding=\"async\"\$1>');
    fs.writeFileSync('$f',h);fs.unlinkSync('$f.min');"
  echo "$f: $(wc -c < "$f") bytes"
done
