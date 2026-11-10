import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'MGF Abogados. Soluciones legales de alta calidad. Estudio jurídico desde 1972.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Paleta del sitio (copiada de app/globals.css). Satori no entiende variables CSS, por eso se repite acá.
const NAVY = '#0D2B5E'
const NAVY_LIGHT = '#1A3F82'
const BLUE = '#1565C0'
const ELECTRIC = '#2979FF'
const PALE = '#E8F0FE'
// Tonos propios de esta imagen (celeste de acento del sitio y colores del expediente)
const CELESTE = '#7EB3FF'
const PAPER = '#F6F8FC'
const FOLDER_BACK = '#C7D8F0'
const BAR = '#D3DCEB'
const FONT = 'Playfair Display'

export default async function Image() {
  // Fuente estática .woff guardada en public/fonts (Satori no lee variable fonts ni woff2)
  const fontData = await readFile(join(process.cwd(), 'public/fonts/playfair-display-600.woff'))

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: FONT,
          background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_LIGHT} 58%, ${BLUE} 100%)`,
        }}
      >
        {/* Brillo suave abajo a la derecha */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            backgroundImage: 'radial-gradient(circle at 86% 92%, rgba(41,121,255,0.38) 0%, rgba(41,121,255,0) 55%)',
          }}
        />

        {/* Balanza gigante de fondo: solo contorno, muy tenue */}
        <svg
          width={720}
          height={358}
          viewBox="20 85 472 235"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ position: 'absolute', right: -60, top: 50 }}
        >
          <path d="M96 110 L46 218 M96 110 L146 218 M416 110 L366 218 M416 110 L466 218" />
          <path d="M36 218 H156 A60 36 0 0 1 36 218 Z M356 218 H476 A60 36 0 0 1 356 218 Z" />
          <path d="M96 110 H416" />
          <path d="M256 120 V282" />
          <circle cx="96" cy="110" r="13" />
          <circle cx="416" cy="110" r="13" />
          <circle cx="256" cy="110" r="20" />
          <rect x="196" y="282" width="120" height="16" rx="8" />
        </svg>

        {/* Expediente inclinado con sello */}
        <div
          style={{
            position: 'absolute',
            left: 770,
            top: 235,
            width: 350,
            height: 270,
            display: 'flex',
            transform: 'rotate(-6deg)',
          }}
        >
          {/* Solapa de la carpeta */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: -34,
              width: 140,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 22,
              background: FOLDER_BACK,
              borderRadius: '14px 14px 0 0',
              color: NAVY,
              fontSize: 20,
              letterSpacing: 3,
            }}
          >
            MGF
          </div>
          {/* Fondo de la carpeta */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 350,
              height: 270,
              display: 'flex',
              background: FOLDER_BACK,
              borderRadius: 14,
            }}
          />
          {/* Hoja que asoma por detrás del frente */}
          <div
            style={{
              position: 'absolute',
              left: 170,
              top: -40,
              width: 160,
              height: 200,
              display: 'flex',
              background: '#FFFFFF',
              borderRadius: 10,
              transform: 'rotate(6deg)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
            }}
          />
          {/* Frente de la carpeta */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 30,
              width: 350,
              height: 240,
              display: 'flex',
              flexDirection: 'column',
              padding: '34px 30px',
              background: PAPER,
              borderRadius: 16,
              boxShadow: '0 24px 50px rgba(0,0,0,0.35)',
            }}
          >
            {/* Renglones decorativos (sin texto) */}
            <div style={{ display: 'flex', width: 200, height: 12, borderRadius: 6, background: BAR, marginBottom: 14 }} />
            <div style={{ display: 'flex', width: 150, height: 12, borderRadius: 6, background: BAR, marginBottom: 14 }} />
            <div style={{ display: 'flex', width: 100, height: 12, borderRadius: 6, background: BAR }} />

            {/* Sello: dos anillos y el texto */}
            <div
              style={{
                position: 'absolute',
                right: 24,
                bottom: 20,
                width: 150,
                height: 150,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 75,
                border: `5px solid ${BLUE}`,
                transform: 'rotate(-14deg)',
                opacity: 0.92,
              }}
            >
              <div
                style={{
                  width: 124,
                  height: 124,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 62,
                  border: `2px solid ${BLUE}`,
                  color: BLUE,
                }}
              >
                <div style={{ display: 'flex', fontSize: 20, letterSpacing: 4 }}>DESDE</div>
                <div style={{ display: 'flex', fontSize: 48, lineHeight: 1 }}>1972</div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna izquierda: logo, titular y chip */}
        <div
          style={{
            position: 'absolute',
            left: 64,
            top: 56,
            width: 700,
            height: 518,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo real (SVG de app/icon.svg) + nombre */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                width: 66,
                height: 66,
                borderRadius: 16,
                border: '1.5px solid rgba(255,255,255,0.35)',
                overflow: 'hidden',
              }}
            >
              <svg width={63} height={63} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#0F2A5E" />
                    <stop offset="1" stopColor="#1E5BB8" />
                  </linearGradient>
                </defs>
                <rect width="512" height="512" rx="112" fill="url(#g)" />
                <path d="M96 110 L46 218 M96 110 L146 218 M416 110 L366 218 M416 110 L466 218" fill="none" stroke="#7EB3FF" strokeWidth="7" strokeLinecap="round" />
                <path d="M36 218 H156 A60 36 0 0 1 36 218 Z M356 218 H476 A60 36 0 0 1 356 218 Z" fill="#fff" />
                <path d="M96 110 H416" stroke="#fff" strokeWidth="16" strokeLinecap="round" />
                <circle cx="96" cy="110" r="13" fill="#fff" />
                <circle cx="416" cy="110" r="13" fill="#fff" />
                <path d="M256 120 V282" stroke="#fff" strokeWidth="16" />
                <circle cx="256" cy="110" r="20" fill="#fff" />
                <rect x="196" y="282" width="120" height="16" rx="8" fill="#fff" />
                <path d="M87 322 H425" stroke="#7EB3FF" strokeWidth="5" />
                <polygon fill="#fff" points="87,436 87,346 111,346 141,391 171,346 195,346 195,436 175,436 175,370 141,421 107,370 107,436" />
                <path d="M303 372 A38 38 0 1 0 314 393 H280" fill="none" stroke="#fff" strokeWidth="20" />
                <rect x="361" y="346" width="20" height="90" fill="#fff" />
                <rect x="361" y="346" width="68" height="20" fill="#fff" />
                <rect x="361" y="382" width="52" height="20" fill="#fff" />
              </svg>
            </div>
            <div style={{ display: 'flex', marginLeft: 18, fontSize: 40, color: '#FFFFFF' }}>MGF Abogados</div>
          </div>

          {/* Titular: dos líneas, con el acento en "alta calidad" */}
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 70, lineHeight: 1.12, letterSpacing: -1, color: '#FFFFFF' }}>
            <div style={{ display: 'flex' }}>Soluciones legales</div>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', marginRight: 18 }}>de</div>
              <div style={{ display: 'flex', color: CELESTE }}>alta calidad</div>
            </div>
          </div>

          {/* Chip */}
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              padding: '12px 28px',
              borderRadius: 999,
              background: PALE,
              color: NAVY,
              fontSize: 26,
            }}
          >
            Primer consulta gratis
          </div>
        </div>

        {/* Dirección */}
        <div style={{ position: 'absolute', right: 64, bottom: 56, display: 'flex', fontSize: 28, color: 'rgba(255,255,255,0.72)' }}>
          mgfabogados.com.ar
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: FONT, data: fontData, weight: 600, style: 'normal' }],
    }
  )
}