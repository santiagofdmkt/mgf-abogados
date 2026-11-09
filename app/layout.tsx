import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  // TEMPORAL: volver a https://mgfabogados.com.ar cuando el DNS apunte a Vercel
  metadataBase: new URL('https://mgf-abogados.vercel.app'),
  title: 'MGF Abogados | Estudio Jurídico desde 1972',
  description: 'Más de 50 años de experiencia en accidentes de trabajo, despidos, tránsito, sucesiones y más. Oficinas en CABA y La Plata. Primera consulta sin cargo.',
  openGraph: {
    title: 'MGF Abogados | Estudio Jurídico desde 1972',
    description: 'Estudio jurídico con oficinas en Capital Federal y La Plata. Primera consulta sin cargo.',
    siteName: 'MGF Abogados',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body id="top" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {children}
        <Footer />
      </body>
    </html>
  )
}