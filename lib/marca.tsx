// lib/marca.tsx
// Identidad visual de MGF Abogados. Para cambiar colores o el isotipo, tocá SOLO este archivo
// (y app/icon.svg, que es la copia estática del isotipo para el favicon).

export const COLORES = {
  navy: '#0F2A5E',
  azul: '#1E5BB8',
  azulElectrico: '#2979FF',
  celeste: '#7EB3FF',
}

// Isotipo: monograma "M" geometrico sobre cuadrado azul, con linea de acento debajo.
// "radio" es el redondeo de las esquinas (en una grilla de 512). 0 = cuadrado puro.
export function isotipoSvg(radio = 112) {
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    `<stop offset="0" stop-color="${COLORES.navy}"/><stop offset="1" stop-color="${COLORES.azul}"/>` +
    '</linearGradient></defs>' +
    `<rect width="512" height="512" rx="${radio}" fill="url(#g)"/>` +
    '<polygon points="130,336 130,128 188,128 256,232 324,128 382,128 382,336 330,336 330,187 256,300 182,187 182,336" fill="#ffffff"/>' +
    `<rect x="130" y="376" width="252" height="14" rx="7" fill="${COLORES.celeste}"/>` +
    '</svg>'
  )
}

// El isotipo como imagen, para usarlo dentro de las imagenes que genera Next (ImageResponse)
export function IconoMGF({ size = 512, radio = 112 }: { size?: number; radio?: number }) {
  const src = 'data:image/svg+xml;utf8,' + encodeURIComponent(isotipoSvg(radio))
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} width={size} height={size} alt="" />
}

// Caracteres que usan las imagenes (se bajan solo esos de Google Fonts)
const TEXTO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÁÉÍÓÚáéíóúñÑ0123456789 ·.,:-/&'

async function googleFont(familia: string, texto: string) {
  const url = `https://fonts.googleapis.com/css2?family=${familia}&text=${encodeURIComponent(texto)}`
  const css = await (await fetch(url)).text()
  const recurso = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)
  if (!recurso) throw new Error('No se pudo leer la fuente ' + familia)
  const res = await fetch(recurso[1])
  if (res.status !== 200) throw new Error('No se pudo bajar la fuente ' + familia)
  return res.arrayBuffer()
}

// Playfair Display (titulos) e Inter (textos chicos). Si no hay internet, devuelve undefined
// y las imagenes se generan igual con la fuente por defecto.
export async function cargarFuentes() {
  try {
    const [playfair, inter] = await Promise.all([
      googleFont('Playfair+Display:wght@600', TEXTO),
      googleFont('Inter:wght@600', TEXTO),
    ])
    return [
      { name: 'Playfair Display', data: playfair, weight: 600 as const, style: 'normal' as const },
      { name: 'Inter', data: inter, weight: 600 as const, style: 'normal' as const },
    ]
  } catch {
    return undefined
  }
}