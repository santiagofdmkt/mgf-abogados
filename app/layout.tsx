import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MGF Abogados | Estudio Jurídico desde 1972',
  description: 'Más de 50 años brindando soluciones legales en accidentes de trabajo, tránsito, despidos, propiedad horizontal, sucesiones y derecho a la salud. Capital Federal y La Plata.',
  keywords: 'abogados Buenos Aires, estudio jurídico, accidentes de trabajo, despidos, sucesiones, propiedad horizontal, derecho a la salud',
  openGraph: {
    title: 'MGF Abogados | Estudio Jurídico desde 1972',
    description: 'Soluciones legales de alta calidad. Capital Federal y La Plata.',
    url: 'https://mgfabogados.com.ar',
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
      <body>{children}</body>
    </html>
  )
}
