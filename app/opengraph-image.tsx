import { ImageResponse } from 'next/og'
import { COLORES, IconoMGF, cargarFuentes } from '@/lib/marca'

export const alt = 'MGF Abogados | Martin · Grisi · Franco | Estudio Jurídico desde 1972'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const fonts = await cargarFuentes()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', position: 'relative',
          background: `linear-gradient(135deg, ${COLORES.navy} 0%, #14397F 60%, ${COLORES.azul} 100%)`,
          fontFamily: 'Inter',
        }}
      >
        {/* Circulos decorativos */}
        <div style={{ position: 'absolute', top: -220, right: -160, width: 640, height: 640, borderRadius: 320, background: 'rgba(255,255,255,0.06)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: -200, left: -140, width: 460, height: 460, borderRadius: 230, background: 'rgba(255,255,255,0.05)', display: 'flex' }} />

        {/* Isotipo grande a la derecha: balanza + M G F */}
        <div style={{ position: 'absolute', right: 80, top: 145, display: 'flex' }}>
          <IconoMGF size={340} />
        </div>
        <div style={{ position: 'absolute', right: 80, bottom: 62, width: 340, justifyContent: 'center', display: 'flex', fontSize: 24, fontWeight: 600, letterSpacing: 2, color: COLORES.celeste }}>
          mgfabogados.com.ar
        </div>

        {/* Columna de texto */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 800, padding: '70px 0 70px 72px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', width: 8, height: 40, borderRadius: 4, background: COLORES.celeste }} />
            <div style={{ display: 'flex', marginLeft: 18, fontSize: 24, fontWeight: 600, letterSpacing: 5, color: COLORES.celeste }}>
              ESTUDIO JURÍDICO · DESDE 1972
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontFamily: 'Playfair Display', fontWeight: 600, fontSize: 100, lineHeight: 1.05, color: '#ffffff' }}>
              MGF Abogados
            </div>
            <div style={{ display: 'flex', width: 90, height: 6, borderRadius: 3, background: COLORES.azulElectrico, marginTop: 24 }} />
            <div style={{ display: 'flex', marginTop: 22, fontSize: 32, fontWeight: 600, letterSpacing: 6, color: '#ffffff' }}>
              MARTIN · GRISI · FRANCO
            </div>
            <div style={{ display: 'flex', maxWidth: 640, marginTop: 20, fontSize: 25, fontWeight: 600, lineHeight: 1.5, color: 'rgba(255,255,255,0.8)' }}>
              Accidentes de trabajo · Accidentes de tránsito · Despidos · Propiedad Horizontal · Mala praxis · Sucesiones
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', padding: '14px 28px', borderRadius: 999, background: COLORES.azulElectrico, fontSize: 26, fontWeight: 600, color: '#ffffff' }}>
              Primera consulta sin cargo
            </div>
            <div style={{ display: 'flex', marginLeft: 24, fontSize: 24, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>
              CABA · La Plata
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}