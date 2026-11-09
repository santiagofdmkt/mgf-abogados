import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Firma con Web Crypto API (compatible con Edge Runtime)
async function firmar(valor: string, secreto: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secreto),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(valor))
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const esApiAdmin = pathname.startsWith('/api/admin')
  const esPaginaAdmin = pathname.startsWith('/admin')

  // Estas rutas tienen que ser públicas: la pantalla de login y los endpoints de login y logout
  const esPublica =
    pathname === '/admin/login' ||
    pathname === '/api/admin/login' ||
    pathname === '/api/admin/logout'

  if ((!esApiAdmin && !esPaginaAdmin) || esPublica) {
    return NextResponse.next()
  }

  const sessionSecret = process.env.ADMIN_SESSION_SECRET
  const cookie = request.cookies.get('mgf_admin')?.value

  let valida = false
  if (cookie && sessionSecret) {
    const [valor, firma] = cookie.split('.')
    if (valor && firma) {
      const esperada = await firmar(valor, sessionSecret)
      if (esperada === firma) valida = true
    }
  }

  if (!valida) {
    // Las llamadas a la API reciben un 401; las páginas se redirigen al login
    if (esApiAdmin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}