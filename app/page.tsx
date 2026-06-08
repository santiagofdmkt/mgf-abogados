'use client'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'

const areas = [
  { slug: 'accidentes-trabajo',   title: 'Accidentes de Trabajo',        desc: 'Gestionamos su reclamo ante ART y empleadores. Trabajamos a porcentaje del resultado.',       icon: 'trabajo' },
  { slug: 'accidentes-transito',  title: 'Accidentes de Tránsito',       desc: 'Reclamamos indemnizaciones por lesiones y daños materiales ante aseguradoras y responsables.', icon: 'transito' },
  { slug: 'despidos',             title: 'Despidos e Indemnizaciones',    desc: 'Asesoramos en despidos sin causa, liquidaciones finales, acoso laboral y trabajo en negro.',   icon: 'despidos' },
  { slug: 'propiedad-horizontal', title: 'Propiedad Horizontal',          desc: 'Representamos consorcios, administradores y propietarios en conflictos y cobros de expensas.', icon: 'propiedad' },
  { slug: 'derecho-salud',        title: 'Derecho a la Salud',            desc: 'Amparos contra obras sociales y prepagas para garantizar coberturas, tratamientos y medicamentos.', icon: 'salud' },
  { slug: 'sucesiones',           title: 'Derecho Sucesorio',             desc: 'Tramitamos sucesiones, testamentos y particiones hereditarias con rapidez y precisión.',       icon: 'sucesiones' },
]

const equipo = [
  { nombre: 'Dr. Patricio Martin',      especialidad: 'Derecho Civil y Negociaciones',                  foto: '/equipo/1pato.jpg' },
  { nombre: 'Dr. Hernán F. Grisi',      especialidad: 'Derecho de Seguros Generales',                   foto: '/equipo/2hernan.jpg' },
  { nombre: 'Dr. Adrián Franco',        especialidad: 'Derecho Laboral y Empresarial',                  foto: '/equipo/3adri.jpg' },
  { nombre: 'Dr. Federico Chiesa',      especialidad: 'Propiedad Horizontal y Conjuntos Inmobiliarios', foto: '/equipo/4chiesa.jpg' },
  { nombre: 'Dra. Verónica N. Carrizo', especialidad: 'Derecho a la Salud — UBA',                      foto: '/equipo/5vero.png' },
]

const contactos = [
  { icon: 'pin',   title: 'Capital Federal', info: 'Lavalle 1546, Piso 8° «F»' },
  { icon: 'pin',   title: 'La Plata',        info: 'Calle 8 N° 790, Piso 3° «E»' },
  { icon: 'phone', title: 'Teléfono',        info: '(011) 4374-1166 / 9177' },
  { icon: 'mail',  title: 'Email',           info: 'estudio@mgfabogados.com.ar' },
]

// Wrapper SVG reutilizable
function Svg({ children, size = 22 }: { children: ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  )
}

// Set de iconos del sitio (línea fina, hereda el color del contenedor)
function Icon({ name, size }: { name: string; size?: number }) {
  switch (name) {
    case 'trabajo':
      return <Svg size={size}><path d="M2 18h20" /><path d="M20 18v-2a8 8 0 0 0-16 0v2" /><path d="M9 7.5V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.5" /></Svg>
    case 'transito':
      return <Svg size={size}><path d="M5 11l1.5-4A2 2 0 0 1 8.4 6h7.2a2 2 0 0 1 1.9 1l1.5 4" /><path d="M3 11h18v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><circle cx="7.5" cy="16" r="1.6" /><circle cx="16.5" cy="16" r="1.6" /></Svg>
    case 'despidos':
      return <Svg size={size}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6" /><path d="M9 17h4" /></Svg>
    case 'propiedad':
      return <Svg size={size}><path d="M3 21h18" /><path d="M5 21V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15" /><path d="M13 21V10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11" /><path d="M8 9h2M8 12.5h2M8 16h2M16 13h1.5M16 16.5h1.5" /></Svg>
    case 'salud':
      return <Svg size={size}><path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" /></Svg>
    case 'sucesiones':
      return <Svg size={size}><path d="M12 4v16" /><path d="M8 20h8" /><path d="M5 7h14" /><path d="M5 7l-2.5 5a2.8 2.8 0 0 0 5 0z" /><path d="M19 7l-2.5 5a2.8 2.8 0 0 0 5 0z" /></Svg>
    case 'experiencia':
      return <Svg size={size}><circle cx="12" cy="8" r="5" /><path d="M9 12.5 8 21l4-2.2L16 21l-1-8.5" /></Svg>
    case 'especialista':
      return <Svg size={size}><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /></Svg>
    case 'honorarios':
      return <Svg size={size}><line x1="19" y1="5" x2="5" y2="19" /><circle cx="7" cy="7" r="2.2" /><circle cx="17" cy="17" r="2.2" /></Svg>
    case 'consulta':
      return <Svg size={size}><path d="M21 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" /><path d="M8 9h8M8 13h5" /></Svg>
    case 'pin':
      return <Svg size={size}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></Svg>
    case 'phone':
      return <Svg size={size}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 14l3 1v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></Svg>
    case 'mail':
      return <Svg size={size}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Svg>
    case 'whatsapp':
      return <Svg size={size}><path d="M12 3a9 9 0 0 0-7.7 13.7L3 21l4.5-1.2A9 9 0 1 0 12 3z" /><path d="M8.5 8.7c0 .8.3 1.9 1.3 3.1 1.1 1.4 2.4 2.2 3.3 2.5.8.3 1.5.1 1.9-.4l.3-.5-1.8-1-.7.7c-.9-.4-1.9-1.4-2.3-2.3l.7-.7-1-1.8-.5.3c-.3.2-.5.5-.5 1z" /></Svg>
    default:
      return null
  }
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Mini-formulario de contacto: ahora controlado. Lleva los datos al wizard /consulta por query params.
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', area: '' })

  const consultaHref = () => {
    const p = new URLSearchParams()
    if (form.nombre) p.set('nombre', form.nombre)
    if (form.telefono) p.set('telefono', form.telefono)
    if (form.email) p.set('email', form.email)
    if (form.area) p.set('area', form.area)
    const qs = p.toString()
    return qs ? `/consulta?${qs}` : '/consulta'
  }

  const inputs: { label: string; type: string; placeholder: string; name: 'nombre' | 'telefono' | 'email' }[] = [
    { label: 'Nombre completo', type: 'text', placeholder: 'Juan García', name: 'nombre' },
    { label: 'Teléfono / WhatsApp', type: 'tel', placeholder: '+54 11 ...', name: 'telefono' },
    { label: 'Email', type: 'email', placeholder: 'juan@email.com', name: 'email' },
  ]

  return (
    <main style={{ background: 'var(--white)' }}>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .hero-btns a { display: block !important; text-align: center; }
          .wa-btn { display: none !important; }
          .hero-img-desktop { display: none !important; }
          .hero-img-mobile { display: block !important; }
          .stats-bar-wrap { display: none !important; }
          .stats-mobile-section { display: block !important; }
          .areas-grid { grid-template-columns: 1fr !important; }
          .porque-grid { grid-template-columns: 1fr !important; max-width: 100% !important; }
          .equipo-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .equipo-img { aspect-ratio: 1/1 !important; }
          .contacto-inner { flex-direction: column !important; gap: 2rem !important; }
          .footer-inner { flex-direction: column !important; align-items: flex-start !important; gap: 1.5rem !important; }
          .footer-links { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 0.6rem 1.5rem !important; }
          .section-pad { padding: 3rem 1.2rem !important; }
          .hero-section { padding: 5rem 1.2rem 2rem !important; min-height: auto !important; }
        }
        @media (min-width: 769px) {
          .hamburger { display: none !important; }
          .mobile-menu { display: none !important; }
          .hero-img-desktop { display: block !important; }
          .hero-img-mobile { display: none !important; }
          .stats-mobile-section { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.97)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem',
          height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', cursor: 'pointer' }}>
            <div style={{ width: '4px', height: '36px', background: 'var(--blue)', borderRadius: '3px' }} />
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 600, color: 'var(--navy)', letterSpacing: '0.03em' }}>
                MGF ABOGADOS
              </div>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.16em', color: 'var(--blue-electric)', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                Desde 1972
              </div>
            </div>
          </Link>

          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
            {[{ label: 'Áreas', href: '#areas' }, { label: 'Equipo', href: '#equipo' }, { label: 'Contacto', href: '#contacto' }].map(item => (
              <a key={item.href} href={item.href} style={{
                fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-soft)',
                textDecoration: 'none', letterSpacing: '0.02em',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-soft)')}
              >
                {item.label}
              </a>
            ))}
            <Link href="/consulta" style={{
              background: 'var(--blue)', color: '#fff', padding: '10px 22px',
              borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
            }}>
              Consulta gratuita
            </Link>
          </div>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none', flexDirection: 'column', gap: '5px',
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
            }}
          >
            <span style={{ width: '24px', height: '2px', background: 'var(--navy)', borderRadius: '2px', display: 'block', transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ width: '24px', height: '2px', background: 'var(--navy)', borderRadius: '2px', display: 'block', transition: 'all 0.2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: '24px', height: '2px', background: 'var(--navy)', borderRadius: '2px', display: 'block', transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu" style={{
            background: '#fff', borderTop: '1px solid var(--border)',
            padding: '1rem 1.5rem 1.5rem',
            display: 'flex', flexDirection: 'column', gap: '0.2rem',
          }}>
            {[{ label: 'Áreas', href: '#areas' }, { label: 'Equipo', href: '#equipo' }, { label: 'Contacto', href: '#contacto' }].map(item => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{
                fontSize: '1rem', fontWeight: 500, color: 'var(--navy)',
                textDecoration: 'none', padding: '0.8rem 0',
                borderBottom: '1px solid var(--border)',
              }}>
                {item.label}
              </a>
            ))}
            <Link href="/consulta" onClick={() => setMenuOpen(false)} style={{
              background: 'var(--blue)', color: '#fff', padding: '13px',
              borderRadius: '6px', fontSize: '0.88rem', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
              textAlign: 'center', marginTop: '0.8rem', display: 'block',
            }}>
              Consulta gratuita →
            </Link>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="hero-section" style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 60%, var(--blue) 100%)',
        display: 'flex', alignItems: 'center',
        padding: '6rem 2rem 6rem',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* Imagen desktop derecha */}
        <div className="hero-img-desktop" style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: '45%', overflow: 'hidden', pointerEvents: 'none',
        }}>
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&auto=format&fit=crop&q=80"
            alt="Estudio jurídico"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.28 }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, var(--navy) 0%, transparent 45%)',
          }} />
        </div>

        {/* Imagen mobile fondo traslúcido */}
        <div className="hero-img-mobile" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', display: 'none',
        }}>
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&auto=format&fit=crop&q=80"
            alt="Estudio jurídico"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.07 }}
          />
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '580px' }}>
            <div className="label anim d1" style={{ color: '#7EB3FF', marginBottom: '1.2rem' }}>
              Estudio Jurídico · Buenos Aires · Desde 1972
            </div>
            <h1 className="anim d2" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 6vw, 5rem)',
              fontWeight: 600, lineHeight: 1.1,
              color: '#FFFFFF', marginBottom: '1.2rem',
            }}>
              Más de 50 años<br />
              <em style={{ color: '#7EB3FF', fontStyle: 'italic' }}>resolviendo</em>{' '}
              lo que<br />a otros no les sale.
            </h1>
            <p className="anim d3" style={{
              fontSize: '1rem', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.72)', maxWidth: '480px', marginBottom: '2rem',
            }}>
              Accidentes de trabajo, despidos, sucesiones, propiedad horizontal y derecho a la salud.
              Atendemos en Capital Federal y La Plata.{' '}
              <strong style={{ color: '#fff' }}>Primera consulta sin cargo.</strong>
            </p>
            <div className="anim d4 hero-btns" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <Link href="/consulta" style={{
                background: 'var(--blue-electric)', color: '#fff',
                padding: '14px 32px', borderRadius: '6px',
                fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.06em',
                textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block',
              }}>
                Iniciar consulta gratuita →
              </Link>
              <a className="wa-btn" href="https://api.whatsapp.com/send?phone=5491140362772" target="_blank" rel="noopener noreferrer"
                style={{
                  background: 'rgba(255,255,255,0.12)', color: '#fff',
                  padding: '14px 32px', borderRadius: '6px',
                  fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.06em',
                  textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block',
                  border: '1px solid rgba(255,255,255,0.25)',
                }}>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar — solo desktop */}
        <div className="stats-bar-wrap" style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'rgba(255,255,255,0.07)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem',
            display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center',
          }}>
            {[
              { num: '+50 años', label: 'de trayectoria' },
              { num: '5 abogados', label: 'especializados por área' },
              { num: '2 oficinas', label: 'Cap. Federal y La Plata' },
              { num: 'Sin cargo', label: 'primera consulta' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', fontFamily: "'Inter', sans-serif" }}>{s.num}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats mobile — fuera del hero, sección separada */}
      <div className="stats-mobile-section" style={{
        display: 'none',
        background: 'var(--navy)',
        padding: '1.2rem 1.5rem',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
        }}>
          {[
            { num: '+50 años', label: 'de trayectoria' },
            { num: '5 abogados', label: 'especializados por área' },
            { num: '2 oficinas', label: 'Cap. Federal y La Plata' },
            { num: 'Sin cargo', label: 'primera consulta' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', fontFamily: "'Inter', sans-serif" }}>{s.num}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ÁREAS */}
      <section id="areas" className="section-pad" style={{ padding: '4rem 2rem', background: 'var(--gray-50)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="label" style={{ marginBottom: '0.4rem' }}>Especialidades</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: 'var(--navy)', fontWeight: 600 }}>
                Áreas de práctica
              </h2>
            </div>
            <Link href="/consulta" style={{
              background: 'transparent', color: 'var(--navy)', padding: '9px 20px',
              borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
              border: '2px solid var(--navy)', display: 'inline-block',
            }}>
              Consultar ahora
            </Link>
          </div>

          <div className="areas-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
            {areas.map(area => (
              <Link key={area.slug} href={`/areas/${area.slug}`}
                style={{
                  background: 'var(--white)', padding: '1.5rem',
                  borderRadius: '10px', textDecoration: 'none',
                  border: '1px solid var(--border)',
                  display: 'block', transition: 'all 0.2s ease',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = 'var(--shadow-lg)'
                  el.style.borderColor = 'var(--blue)'
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = 'var(--shadow-sm)'
                  el.style.borderColor = 'var(--border)'
                  el.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  background: 'var(--blue-pale)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'var(--blue)', marginBottom: '0.9rem',
                }}>
                  <Icon name={area.icon} size={22} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.4rem' }}>
                  {area.title}
                </h3>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-soft)', marginBottom: '0.8rem' }}>
                  {area.desc}
                </p>
                <span style={{ fontSize: '0.73rem', fontWeight: 600, color: 'var(--blue-electric)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Consultar →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%)',
        padding: '3.5rem 1.5rem', textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="label" style={{ color: '#7EB3FF', marginBottom: '0.8rem' }}>Primera consulta sin cargo</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', color: '#fff', fontWeight: 600, marginBottom: '0.8rem', lineHeight: 1.2 }}>
            Contanos tu caso.<br />
            <em style={{ color: '#7EB3FF' }}>Te respondemos hoy.</em>
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Completá el formulario guiado y un abogado especializado te contactará a la brevedad.
          </p>
          <Link href="/consulta" style={{
            background: 'var(--blue-electric)', color: '#fff',
            padding: '14px 40px', borderRadius: '8px',
            fontSize: '0.88rem', fontWeight: 700, letterSpacing: '0.06em',
            textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block',
          }}>
            Iniciar consulta gratuita →
          </Link>
        </div>
      </section>

      {/* POR QUÉ */}
      <section className="section-pad" style={{ padding: '4rem 2rem', background: 'var(--white)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="label" style={{ marginBottom: '0.4rem' }}>Nuestra diferencia</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: 'var(--navy)', fontWeight: 600 }}>
              ¿Por qué elegirnos?
            </h2>
          </div>
          <div className="porque-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.2rem', maxWidth: '900px', margin: '0 auto',
          }}>
            {[
              { icon: 'experiencia', title: 'Más de 50 años de experiencia', desc: 'Uno de los estudios con mayor trayectoria en derecho civil y laboral del AMBA. No aprendemos con sus casos.' },
              { icon: 'especialista', title: 'Abogado especializado en su área', desc: 'Cada caso lo atiende el profesional con experiencia específica. Sin rotar archivos entre juniors.' },
              { icon: 'consulta', title: 'Primera consulta gratis', desc: 'Nuestro sistema de gestión nos permite conocer tu caso y darte una devolución online rápida, para recomendarte la mejor opción según tu situación.' },
            ].map(item => (
              <div key={item.title} style={{
                background: 'var(--blue-pale2)', borderRadius: '12px',
                padding: '1.5rem', border: '1px solid var(--blue-pale)', textAlign: 'center',
              }}>
                <div style={{ color: 'var(--blue)', marginBottom: '0.8rem', display: 'flex', justifyContent: 'center' }}>
                  <Icon name={item.icon} size={30} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.81rem', lineHeight: 1.65, color: 'var(--text-soft)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section id="equipo" className="section-pad" style={{ padding: '4rem 2rem', background: 'var(--gray-50)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div className="label" style={{ marginBottom: '0.4rem' }}>El estudio</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: 'var(--navy)', fontWeight: 600 }}>
              Nuestro equipo
            </h2>
          </div>
          <div className="equipo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '1.2rem' }}>
            {equipo.map(ab => (
              <div key={ab.nombre} style={{
                background: 'var(--white)', borderRadius: '12px',
                overflow: 'hidden', border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <div className="equipo-img" style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                  <img src={ab.foto} alt={ab.nombre} style={{
                    width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
                <div style={{ padding: '0.8rem 1rem 1rem', borderTop: '3px solid var(--blue-electric)' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.2rem' }}>
                    {ab.nombre}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {ab.especialidad}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="section-pad" style={{ padding: '4rem 2rem', background: 'var(--white)' }}>
        <div className="contacto-inner" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'stretch' }}>

          {/* Columna info */}
          <div style={{ flex: '1', minWidth: '260px', display: 'flex', flexDirection: 'column' }}>
            <div className="label" style={{ marginBottom: '0.4rem' }}>Contacto</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', color: 'var(--navy)', fontWeight: 600, marginBottom: '0.6rem' }}>
              Estamos para ayudarte
            </h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-soft)', marginBottom: '1.6rem', maxWidth: '420px' }}>
              Escribinos por el medio que prefieras. La primera consulta es sin cargo y te respondemos a la brevedad.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {contactos.map(c => (
                <div key={c.title} style={{
                  display: 'flex', gap: '0.9rem', alignItems: 'center',
                  background: 'var(--gray-50)', border: '1px solid var(--border)',
                  borderRadius: '10px', padding: '0.9rem 1rem',
                }}>
                  <span style={{
                    width: '38px', height: '38px', borderRadius: '9px',
                    background: 'var(--blue-pale)', color: 'var(--blue)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon name={c.icon} size={18} />
                  </span>
                  <div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>{c.title}</div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--navy)', fontWeight: 500 }}>{c.info}</div>
                  </div>
                </div>
              ))}
            </div>

            <a href="https://api.whatsapp.com/send?phone=5491140362772" target="_blank" rel="noopener noreferrer" style={{
              marginTop: '1.2rem', background: '#25D366', color: '#fff',
              padding: '13px 22px', borderRadius: '8px',
              fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.04em', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', alignSelf: 'flex-start',
            }}>
              <Icon name="whatsapp" size={18} /> Escribinos por WhatsApp
            </a>
          </div>

          {/* Columna formulario */}
          <div style={{
            flex: '1', minWidth: '280px', maxWidth: '480px',
            background: 'var(--white)', border: '1px solid var(--border)',
            borderRadius: '14px', padding: '2rem',
            boxShadow: 'var(--shadow-md)',
          }}>
            <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.3rem', fontFamily: "'Playfair Display', serif" }}>
              Dejanos tu consulta
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-soft)', marginBottom: '1.4rem' }}>
              Completá tus datos y seguí con el formulario guiado.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {inputs.map(f => (
                <div key={f.name}>
                  <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-soft)', marginBottom: '4px' }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.name]}
                    onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                    style={{
                      width: '100%', border: '1px solid var(--border)', borderRadius: '8px',
                      padding: '11px 12px', fontSize: '0.9rem', outline: 'none',
                      fontFamily: "'Inter', sans-serif", color: 'var(--text)', background: 'var(--gray-50)',
                    }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-soft)', marginBottom: '4px' }}>
                  Tipo de consulta
                </label>
                <select
                  value={form.area}
                  onChange={e => setForm({ ...form, area: e.target.value })}
                  style={{
                    width: '100%', border: '1px solid var(--border)', borderRadius: '8px',
                    padding: '11px 12px', fontSize: '0.9rem', outline: 'none',
                    fontFamily: "'Inter', sans-serif", color: 'var(--text)', background: 'var(--gray-50)',
                  }}
                >
                  <option value="">Seleccioná un área</option>
                  {areas.map(a => <option key={a.slug} value={a.slug}>{a.title}</option>)}
                </select>
              </div>
              <Link href={consultaHref()} style={{
                background: 'var(--blue)', color: '#fff', padding: '13px',
                textAlign: 'center', textDecoration: 'none', fontSize: '0.82rem',
                letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600,
                marginTop: '0.3rem', display: 'block', borderRadius: '8px',
              }}>
                Continuar consulta →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--navy)', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="footer-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '1.5rem' }}>
            <div style={{ minWidth: '180px' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>MGF ABOGADOS</div>
              <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '3px', marginBottom: '1rem' }}>
                Martín – Grisi – Franco · Desde 1972
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
                {areas.map(a => (
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
              <Link href="/consulta" style={{
                background: 'var(--blue-electric)', color: '#fff',
                padding: '11px 22px', borderRadius: '6px',
                fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em',
                textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block',
                marginBottom: '0.8rem',
              }}>
                Consulta gratuita →
              </Link>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <a href="https://instagram.com/mgfabogados" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>Instagram</a>
                <a href="https://facebook.com/61553341857581" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>Facebook</a>
              </div>
            </div>
          </div>

          <div style={{ paddingTop: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)' }}>
              © {new Date().getFullYear()} MGF Abogados. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

    </main>
  )
}
