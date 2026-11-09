// lib/marca.tsx
// Identidad visual de MGF Abogados (Martin · Grisi · Franco). Los tres socios con el mismo peso.
// Isotipo: balanza de la justicia + monograma M G F (mismo tamaño y trazo para las tres letras).
// Para cambiar colores o formas, tocá SOLO este archivo (y app/icon.svg, que es el favicon estatico).

export const COLORES = {
  navy: '#0F2A5E',
  azul: '#1E5BB8',
  azulElectrico: '#2979FF',
  celeste: '#7EB3FF',
}

// Balanza de la justicia (grilla de 512)
const BALANZA =
  `<g stroke="${COLORES.celeste}" stroke-width="5" stroke-linecap="round" fill="none"><path d="M96 110 L46 218 M96 110 L146 218 M416 110 L366 218 M416 110 L466 218"/></g>` +
  '<path d="M36 218 H156 A60 36 0 0 1 36 218 Z" fill="#fff"/>' +
  '<path d="M356 218 H476 A60 36 0 0 1 356 218 Z" fill="#fff"/>' +
  '<path d="M96 110 H416" stroke="#fff" stroke-width="14" stroke-linecap="round"/>' +
  '<circle cx="96" cy="110" r="11" fill="#fff"/><circle cx="416" cy="110" r="11" fill="#fff"/>' +
  '<path d="M256 120 V282" stroke="#fff" stroke-width="14" stroke-linecap="round"/>' +
  '<circle cx="256" cy="110" r="18" fill="#fff"/>' +
  '<rect x="196" y="282" width="120" height="14" rx="7" fill="#fff"/>'

// Monograma M G F: tres letras de la misma altura y el mismo trazo, ninguna destaca
const LETRAS =
  `<path d="M87 316 H425" stroke="${COLORES.celeste}" stroke-width="4" stroke-linecap="round"/>` +
  '<polygon fill="#fff" points="87,424 87,334 109,334 139,379 169,334 191,334 191,424 173,424 173,354 139,405 105,354 105,424"/>' +
  '<path d="M301.5 358.5 A36 36 0 1 0 312 379 H278" fill="none" stroke="#fff" stroke-width="18"/>' +
  '<rect x="361" y="334" width="18" height="90" fill="#fff"/><rect x="361" y="334" width="64" height="18" fill="#fff"/><rect x="361" y="370" width="50" height="18" fill="#fff"/>'

// Isotipo completo: cuadrado azul con balanza + M G F. "radio" = redondeo de esquinas (0 = cuadrado).
export function isotipoSvg(radio = 112) {
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    `<stop offset="0" stop-color="${COLORES.navy}"/><stop offset="1" stop-color="${COLORES.azul}"/>` +
    '</linearGradient></defs>' +
    `<rect width="512" height="512" rx="${radio}" fill="url(#g)"/>` +
    BALANZA +
    LETRAS +
    '</svg>'
  )
}

// Solo el dibujo (balanza + M G F), sin fondo, recortado justo. Para ponerlo sobre fondos propios.
export function arteSvg() {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="28 84 456 348">' + BALANZA + LETRAS + '</svg>'
}

// El isotipo como imagen, para usarlo dentro de las imagenes que genera Next (ImageResponse)
export function IconoMGF({ size = 512, radio = 112 }: { size?: number; radio?: number }) {
  const src = 'data:image/svg+xml;utf8,' + encodeURIComponent(isotipoSvg(radio))
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} width={size} height={size} alt="" />
}

// Solo el dibujo sin fondo, como imagen. El alto se calcula solo (proporcion 456 x 348).
export function ArteMGF({ width = 456 }: { width?: number }) {
  const src = 'data:image/svg+xml;utf8,' + encodeURIComponent(arteSvg())
  const height = Math.round((width * 348) / 456)
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} width={width} height={height} alt="" />
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