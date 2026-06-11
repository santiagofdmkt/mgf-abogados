import Link from 'next/link'

const footerAreas = [
  { slug: 'accidentes-trabajo', title: 'Accidentes de Trabajo' },
  { slug: 'accidentes-transito', title: 'Accidentes de Tránsito' },
  { slug: 'despidos', title: 'Despidos e Indemnizaciones' },
  { slug: 'propiedad-horizontal', title: 'Propiedad Horizontal' },
  { slug: 'derecho-salud', title: 'Derecho a la Salud' },
  { slug: 'sucesiones', title: 'Derecho Sucesorio' },
]

function Icon({ name, size = 16 }: { name: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (name) {
    case 'pin':
      return <svg {...common}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
    case 'phone':
      return <svg {...common}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 14l3 1v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
    case 'instagram':
      return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="17" cy="7" r="1" /></svg>
    case 'facebook':
      return <svg {...common}><path d="M14 8.5h2.5V5.5H14c-2 0-3 1.2-3 3.2V11H9v3h2v6h3v-6h2.3l.4-3H14V9c0-.4.2-.5.6-.5z" /></svg>
    case 'arrow-up':
      return <svg {...common}><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
    default:
      return null
  }
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', padding: '2.5rem 1.5rem' }}>
      <style>{`
        .footer-btn-zoom { transition: filter .2s ease, box-shadow .2s ease, background .2s ease; }
        .footer-btn-zoom:hover { filter: brightness(0.9); box-shadow: var(--shadow-md); }
        .footer-social {
          display: inline-flex; align-items: center; gap: 0.45rem;
          color: rgba(255,255,255,0.55) !important;
          transition: color .2s ease;
        }
        .footer-social:hover { color: var(--blue-electric) !important; }
        .footer-social svg { transition: transform .2s ease; }
        .footer-social:hover svg { transform: translateY(-1px); }
        .footer-scroll-top {
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
          transition: background .2s ease, color .2s ease, border-color .2s ease, transform .2s ease;
        }
        .footer-scroll-top:hover {
          background: var(--blue-electric);
          border-color: var(--blue-electric);
          color: #fff;
        }
        .footer-scroll-top:hover svg { transform: translateY(-2px); }
        .footer-scroll-top svg { transition: transform .2s ease; }
        @media (max-width: 768px) {
          .footer-inner { flex-direction: column !important; align-items: flex-start !important; gap: 1.5rem !important; }
          .footer-links { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 0.6rem 1.5rem !important; }
          .footer-scroll-top { margin-right: 0 !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="footer-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ minWidth: 180 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>MGF ABOGADOS</div>
            <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3, marginBottom: '1rem' }}>
              Martín – Grisi – Franco • Desde 1972
            </div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--blue-electric)', display: 'flex', flexShrink: 0 }}><Icon name="pin" size={15} /></span>
                Lavalle 1546, Piso 8° «F» — CABA
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--blue-electric)', display: 'flex', flexShrink: 0 }}><Icon name="pin" size={15} /></span>
                Calle 8 N° 790, Piso 3° «E» — La Plata
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--blue-electric)', display: 'flex', flexShrink: 0 }}><Icon name="phone" size={15} /></span>
                (011) 4374-1166 / 9177
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.8rem' }}>
              Servicios
            </div>
            <div className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {footerAreas.map((a) => (
                <Link key={a.slug} href={`/areas/${a.slug}`} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
                  {a.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.8rem' }}>
              Consultas
            </div>
            <Link href="/consulta" className="footer-btn-zoom" style={{
              background: 'var(--blue-electric)', color: '#fff',
              padding: '11px 22px', borderRadius: 6,
              fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em',
              textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block',
              marginBottom: '1.2rem',
            }}>
              Iniciar primer consulta →
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', marginTop: '0.2rem' }}>
              <a href="https://instagram.com/mgfabogados" target="_blank" rel="noopener noreferrer" className="footer-social" style={{ fontSize: '0.8rem', textDecoration: 'none' }}>
                <Icon name="instagram" size={16} /> Instagram
              </a>
              <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.2)' }} />
              <a href="https://facebook.com/61553341857581" target="_blank" rel="noopener noreferrer" className="footer-social" style={{ fontSize: '0.8rem', textDecoration: 'none' }}>
                <Icon name="facebook" size={16} /> Facebook
              </a>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)', margin: 0 }}>
            © {new Date().getFullYear()} MGF Abogados. Todos los derechos reservados.
          </p>
          <a href="#top" className="footer-scroll-top" aria-label="Volver arriba" title="Volver arriba" style={{ marginRight: '25%' }}>
            <Icon name="arrow-up" size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}