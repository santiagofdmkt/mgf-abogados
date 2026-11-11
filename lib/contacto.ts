// Datos de contacto del estudio. Se cambian ACA y valen para toda la web.
export const EMAIL_DESTINO = 'estudio@mgfabogados.com.ar'

// Formato internacional, sin + ni espacios: 54 + 9 + codigo de area + numero (sin 0 ni 15).
// Provisorio: 11 4193-0928
export const WHATSAPP_NUMERO = '5491141930928'

// Arma el link de WhatsApp con un texto ya escrito.
export function waLink(texto: string = 'Hola, quisiera hacer una consulta.'): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`
}