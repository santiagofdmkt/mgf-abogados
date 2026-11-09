import { ImageResponse } from 'next/og'
import { COLORES, IconoMGF, cargarFuentes } from '@/lib/marca'

// Imagenes de marca descargables:
//   /brand/google -> logo cuadrado 720x720 para Google Business Profile
//   /brand/logo   -> logo horizontal con fondo transparente
//   /brand/icono  -> isotipo cuadrado 512x512
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ asset: string }> }
) {
  const { asset } = await params
  const fonts = await cargarFuentes()

  if (asset === 'google') {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: `linear-gradient(155deg, ${COLORES.navy} 0%, ${COLORES.azul} 100%)`,
          }}
        >
          <div style={{ display: 'flex', fontFamily: 'Playfair Display', fontWeight: 600, fontSize: 210, lineHeight: 1, letterSpacing: 6, color: '#ffffff' }}>
            MGF
          </div>
          <div style={{ display: 'flex', width: 300, height: 8, borderRadius: 4, background: COLORES.celeste, marginTop: 22 }} />
          <div style={{ display: 'flex', fontFamily: 'Inter', fontWeight: 600, fontSize: 48, letterSpacing: 18, color: COLORES.celeste, marginTop: 26 }}>
            ABOGADOS
          </div>
          <div style={{ display: 'flex', fontFamily: 'Inter', fontWeight: 600, fontSize: 24, letterSpacing: 8, color: 'rgba(255,255,255,0.7)', marginTop: 22 }}>
            DESDE 1972
          </div>
        </div>
      ),
      { width: 720, height: 720, fonts }
    )
  }

  if (asset === 'logo') {
    return new ImageResponse(
      (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', padding: '0 40px' }}>
          <IconoMGF size={280} />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 50 }}>
            <div style={{ display: 'flex', fontFamily: 'Playfair Display', fontWeight: 600, fontSize: 130, lineHeight: 1.05, letterSpacing: 4, color: COLORES.navy }}>
              MGF ABOGADOS
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 14 }}>
              <div style={{ display: 'flex', width: 90, height: 6, borderRadius: 3, background: COLORES.azulElectrico }} />
              <div style={{ display: 'flex', marginLeft: 22, fontFamily: 'Inter', fontWeight: 600, fontSize: 40, letterSpacing: 14, color: COLORES.azul }}>
                DESDE 1972
              </div>
            </div>
          </div>
        </div>
      ),
      { width: 1700, height: 420, fonts }
    )
  }

  if (asset === 'icono') {
    return new ImageResponse(
      (
        <div style={{ width: '100%', height: '100%', display: 'flex' }}>
          <IconoMGF size={512} radio={0} />
        </div>
      ),
      { width: 512, height: 512 }
    )
  }

  return new Response('No encontrado', { status: 404 })
}