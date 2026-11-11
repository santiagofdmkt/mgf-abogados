'use client'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import CtaCotizador from '@/components/CtaCotizador'
import { areas as areasData } from '@/lib/areas'
import { waLink } from '@/lib/contacto'

const areas = [
  { slug: 'accidentes-trabajo',   title: 'Accidentes de Trabajo',        desc: 'Gestionamos su reclamo ante la ART por accidentes laborales, in itínere y enfermedades profesionales.', icon: 'trabajo' },
  { slug: 'accidentes-transito',  title: 'Accidentes de Tránsito',       desc: 'Reclamamos indemnizaciones por lesiones y daños materiales ante aseguradoras y responsables.', icon: 'transito' },
  { slug: 'despidos',             title: 'Despidos e Indemnizaciones',    desc: 'Asesoramos en despidos sin causa, liquidaciones finales, acoso laboral y trabajo en negro.',   icon: 'despidos' },
  { slug: 'propiedad-horizontal', title: 'Propiedad Horizontal',          desc: 'Representamos consorcios, administradores y propietarios en conflictos y cobros de expensas.', icon: 'propiedad' },
  { slug: 'mala-praxis',          title: 'Mala praxis',                   desc: 'Reclamos por errores médicos, diagnósticos tardíos y fallas en la atención de clínicas, hospitales y profesionales.', icon: 'salud' },
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

// Imagen del hero (se usa en desktop y mobile). Cambiala acá una sola vez.
const HERO_IMG = 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&auto=format&fit=crop&q=80'

// Wrapper SVG reutilizable. strokeWidth opcional: 1.8 por defecto, más fino donde se pida.
function Svg({ children, size = 22, strokeWidth = 1.8 }: { children: ReactNode; size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  )
}

// Set de iconos del sitio (línea fina, hereda el color del contenedor)
function Icon({ name, size, strokeWidth }: { name: string; size?: number; strokeWidth?: number }) {
  switch (name) {
    case 'trabajo':
      return <Svg size={size} strokeWidth={strokeWidth}><path d="M2 18h20" /><path d="M20 18v-2a8 8 0 0 0-16 0v2" /><path d="M9 7.5V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.5" /></Svg>
    case 'transito':
      return <Svg size={size} strokeWidth={strokeWidth}><path d="M5 11l1.5-4A2 2 0 0 1 8.4 6h7.2a2 2 0 0 1 1.9 1l1.5 4" /><path d="M3 11h18v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><circle cx="7.5" cy="16" r="1.6" /><circle cx="16.5" cy="16" r="1.6" /></Svg>
    case 'despidos':
      return <Svg size={size} strokeWidth={strokeWidth}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6" /><path d="M9 17h4" /></Svg>
    case 'propiedad':
      return <Svg size={size} strokeWidth={strokeWidth}><path d="M3 21h18" /><path d="M5 21V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15" /><path d="M13 21V10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11" /><path d="M8 9h2M8 12.5h2M8 16h2M16 13h1.5M16 16.5h1.5" /></Svg>
    case 'salud':
      return <Svg size={size} strokeWidth={strokeWidth}><path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" /></Svg>
    case 'sucesiones':
      return <Svg size={size} strokeWidth={strokeWidth}><path d="M12 4v16" /><path d="M8 20h8" /><path d="M5 7h14" /><path d="M5 7l-2.5 5a2.8 2.8 0 0 0 5 0z" /><path d="M19 7l-2.5 5a2.8 2.8 0 0 0 5 0z" /></Svg>
    case 'experiencia':
      return <Svg size={size} strokeWidth={strokeWidth}><circle cx="12" cy="8" r="5" /><path d="M9 12.5 8 21l4-2.2L16 21l-1-8.5" /></Svg>
    case 'especialista':
      return <Svg size={size} strokeWidth={strokeWidth}><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /></Svg>
    case 'honorarios':
      return <Svg size={size} strokeWidth={strokeWidth}><line x1="19" y1="5" x2="5" y2="19" /><circle cx="7" cy="7" r="2.2" /><circle cx="17" cy="17" r="2.2" /></Svg>
    case 'consulta':
      return <Svg size={size} strokeWidth={strokeWidth}><path d="M21 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" /><path d="M8 9h8M8 13h5" /></Svg>
    case 'pin':
      return <Svg size={size} strokeWidth={strokeWidth}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></Svg>
    case 'phone':
      return <Svg size={size} strokeWidth={strokeWidth}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 14l3 1v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></Svg>
    case 'mail':
      return <Svg size={size} strokeWidth={strokeWidth}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Svg>
    case 'whatsapp':
      return <Svg size={size} strokeWidth={strokeWidth}><path d="M12 3a9 9 0 0 0-7.7 13.7L3 21l4.5-1.2A9 9 0 1 0 12 3z" /><path d="M8.5 8.7c0 .8.3 1.9 1.3 3.1 1.1 1.4 2.4 2.2 3.3 2.5.8.3 1.5.1 1.9-.4l.3-.5-1.8-1-.7.7c-.9-.4-1.9-1.4-2.3-2.3l.7-.7-1-1.8-.5.3c-.3.2-.5.5-.5 1z" /></Svg>
    case 'instagram':
      return <Svg size={size} strokeWidth={strokeWidth}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="17" cy="7" r="1" /></Svg>
    case 'facebook':
      return <Svg size={size} strokeWidth={strokeWidth}><path d="M14 8.5h2.5V5.5H14c-2 0-3 1.2-3 3.2V11H9v3h2v6h3v-6h2.3l.4-3H14V9c0-.4.2-.5.6-.5z" /></Svg>
    default:
      return null
  }
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Mini-formulario de contacto: ahora controlado. Lleva los datos al wizard /consulta por query params.
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', area: '', mensaje: '' })

  const consultaHref = () => {
    const p = new URLSearchParams()
    if (form.nombre) p.set('nombre', form.nombre)
    if (form.telefono) p.set('telefono', form.telefono)
    if (form.email) p.set('email', form.email)
    if (form.area) p.set('area', form.area)
    if (form.mensaje) p.set('mensaje', form.mensaje)
    const qs = p.toString()
    return qs ? `/consulta?${qs}` : '/consulta'
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const inputs: { label: string; type: string; placeholder: string; name: 'nombre' | 'telefono' | 'email' }[] = [
    { label: 'Nombre completo', type: 'text', placeholder: 'Juan García', name: 'nombre' },
    { label: 'Teléfono / WhatsApp', type: 'tel', placeholder: '+54 11 ...', name: 'telefono' },
    { label: 'Email', type: 'email', placeholder: 'juan@email.com', name: 'email' },
  ]

  return (
    <main style={{ background: 'var(--white)' }}>

      <style>{`
        .hero-title { text-wrap: balance; }
        .btn-zoom { transition: filter 0.2s ease, box-shadow 0.2s ease, background 0.2s ease; }
        .btn-zoom:hover { filter: brightness(0.9); box-shadow: var(--shadow-md); }

        /* Cards de Áreas con imagen de fondo traslúcida */
        .area-card { position: relative; overflow: hidden; }
        .area-card-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .area-card-bg img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          opacity: 0.20; transition: opacity 0.3s ease;
        }
        .area-card:hover .area-card-bg img { opacity: 0.32; }
        .area-card-bg::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.62) 100%);
        }
        .area-card-content { position: relative; z-index: 1; }

        /* Link "Consultar" editorial: Playfair italic, sin mayúsculas, con flecha que se separa al hover */
        .area-consultar {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--blue);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: gap 0.25s ease, color 0.25s ease;
        }
        .area-card:hover .area-consultar {
          gap: 0.6rem;
          color: var(--blue-electric);
        }

        /* Cards "¿Por qué elegirnos?": fondo blanco, borde sutil, hover con borde azul */
        .porque-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          box-shadow: var(--shadow-sm);
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }
        .porque-card:hover {
          border-color: var(--blue);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

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
          .equipo-center { grid-column: 1 / -1 !important; max-width: 50% !important; margin: 0 auto !important; }
          .equipo-img { aspect-ratio: 1/1 !important; }
          .contacto-inner { flex-direction: column !important; gap: 2rem !important; }
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
          <Link href="/" onClick={scrollToTop} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', cursor: 'pointer' }}>
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
            <Link href="/consulta" className="btn-zoom" style={{
              background: 'var(--blue)', color: '#fff', padding: '10px 22px',
              borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
            }}>
              Consultá online
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
              Consultá online →
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
            src={HERO_IMG}
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
            src={HERO_IMG}
            alt="Estudio jurídico"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.07 }}
          />
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '620px' }}>
            <div className="label anim d1" style={{ color: '#7EB3FF', marginBottom: '1.2rem' }}>
              Estudio Jurídico • Buenos Aires • Desde 1972
            </div>
            <h1 className="anim d2 hero-title" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.9rem, 4.4vw, 3.7rem)',
              fontWeight: 600, lineHeight: 1.15,
              color: '#FFFFFF', marginBottom: '1.2rem',
            }}>
              Más de 50 años brindando{' '}
              <em style={{ color: '#7EB3FF', fontStyle: 'italic' }}>soluciones legales</em>{' '}
              de alta calidad
            </h1>
            <p className="anim d3" style={{
              fontSize: '1rem', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.72)', maxWidth: '480px', marginBottom: '2rem',
            }}>
              Accidentes de trabajo, despidos, sucesiones, propiedad horizontal y mala praxis.
              Atendemos en Capital Federal y La Plata.{' '}
              <strong style={{ color: '#fff' }}>Primera consulta sin cargo.</strong>
            </p>
            <div className="anim d4 hero-btns" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <Link href="/consulta" className="btn-zoom" style={{
                background: 'var(--blue-electric)', color: '#fff',
                padding: '14px 32px', borderRadius: '6px',
                fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.06em',
                textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block',
              }}>
                Iniciar primera consulta →
              </Link>
              <a className="wa-btn btn-zoom" href={waLink()} target="_blank" rel="noopener noreferrer"
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
      <section id="areas" className="section-pad" style={{ padding: '3.5rem 2rem', background: 'var(--gray-50)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="label" style={{ marginBottom: '0.4rem' }}>Especialidades</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: 'var(--navy)', fontWeight: 600 }}>
                Áreas de práctica
              </h2>
            </div>
            <Link href="/consulta" className="btn-zoom" style={{
              background: 'transparent', color: 'var(--navy)', padding: '9px 20px',
              borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
              border: '2px solid var(--navy)', display: 'inline-block',
            }}>
              Consultar ahora
            </Link>
          </div>

          <div className="areas-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
            {areas.map(area => {
              const heroImage = areasData.find(a => a.slug === area.slug)?.heroImage
              return (
                <Link key={area.slug} href={`/areas/${area.slug}`} className="area-card"
                  style={{
                    background: 'rgba(148, 163, 184, 0.08)', padding: '1.5rem',
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
                  {heroImage && (
                    <div className="area-card-bg" aria-hidden="true">
                      <img src={heroImage} alt="" />
                    </div>
                  )}

                  <div className="area-card-content">
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '10px',
                      background: 'var(--blue-pale)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: 'var(--blue)', marginBottom: '0.9rem',
                    }}>
                      <Icon name={area.icon} size={22} strokeWidth={1.3} />
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.4rem' }}>
                      {area.title}
                    </h3>
                    <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: 'var(--text-soft)', marginBottom: '0.8rem' }}>
                      {area.desc}
                    </p>
                    <span className="area-consultar">Consultar <span aria-hidden="true">→</span></span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <CtaCotizador />

      {/* POR QUÉ */}
      <section className="section-pad" style={{ padding: '3.5rem 2rem', background: 'var(--gray-50)' }}>
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
              { icon: 'especialista', title: 'Abogado especializado en su área', desc: 'Cada caso lo atiende el profesional con experiencia específica. Sin rotar archivos, con foco en la resolución.' },
              { icon: 'consulta', title: 'Primera consulta gratis', desc: 'Nuestro sistema de gestión nos permite conocer tu caso y darte una primera devolución online y rápida, brindándote la mejor opción según tu situación.' },
            ].map(item => (
              <div key={item.title} className="porque-card">
                <div style={{ color: 'var(--blue)', marginBottom: '0.8rem', display: 'flex', justifyContent: 'center' }}>
                  <Icon name={item.icon} size={30} strokeWidth={1.3} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.81rem', lineHeight: 1.7, color: 'var(--text-soft)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section id="equipo" className="section-pad" style={{ padding: '2.75rem 2rem', background: '#f1f5f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="label" style={{ marginBottom: '0.4rem' }}>El estudio</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: 'var(--navy)', fontWeight: 600 }}>
              Nuestro equipo
            </h2>
          </div>
          <div className="equipo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '1.2rem' }}>
            {equipo.map((ab, i) => (
              <div key={ab.nombre} className={i === 2 ? 'equipo-card equipo-center' : 'equipo-card'} style={{
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

      {/* CTA BANNER — reubicado: después de Equipo, antes de Contacto */}
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
          <Link href="/consulta" className="btn-zoom" style={{
            background: 'var(--blue-electric)', color: '#fff',
            padding: '14px 40px', borderRadius: '8px',
            fontSize: '0.88rem', fontWeight: 700, letterSpacing: '0.06em',
            textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block',
          }}>
            Iniciar primera consulta →
          </Link>
        </div>
      </section>

      {/* CONTACTO: panel unico con info a la izquierda y formulario a la derecha */}
      <section id="contacto" className="section-pad" style={{ padding: '4rem 2rem', background: 'var(--gray-50)' }}>
        <style>{`
          .ct-panel { display: grid; grid-template-columns: 1fr 1.1fr; max-width: 1100px; margin: 0 auto; border-radius: 24px; overflow: hidden; background: var(--white); border: 1px solid var(--border); box-shadow: 0 28px 70px rgba(10,22,52,0.20); }
          .ct-info { position: relative; overflow: hidden; background: linear-gradient(155deg, var(--navy) 0%, var(--blue) 100%); padding: 2.8rem 2.4rem; display: flex; flex-direction: column; }
          .ct-info::before { content: ''; position: absolute; width: 320px; height: 320px; border-radius: 50%; right: -120px; top: -120px; background: rgba(255,255,255,0.07); }
          .ct-info::after { content: ''; position: absolute; width: 220px; height: 220px; border-radius: 50%; left: -90px; bottom: -90px; background: rgba(255,255,255,0.06); }
          .ct-info > * { position: relative; z-index: 1; }
          .ct-item { display: flex; gap: 1rem; align-items: center; padding: 0.95rem 0; border-top: 1px solid rgba(255,255,255,0.16); }
          .ct-item:last-child { border-bottom: 1px solid rgba(255,255,255,0.16); }
          .ct-ico { width: 44px; height: 44px; border-radius: 50%; flex: none; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.25); color: #fff; }
          .ct-form { padding: 2.8rem 2.4rem; }
          .ct-label { display: block; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-soft); margin-bottom: 6px; }
          .ct-input { width: 100%; border: 1.5px solid var(--border); border-radius: 12px; padding: 12px 14px; font-size: 0.92rem; outline: none; font-family: 'Inter', sans-serif; color: var(--text); background: var(--gray-50); transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease; }
          .ct-input:hover { border-color: #cbd5e1; }
          .ct-input:focus { border-color: var(--blue); background: var(--white); box-shadow: 0 0 0 4px var(--blue-pale); }
          .ct-wa, .ct-send { transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease; }
          .ct-wa:hover, .ct-send:hover { transform: scale(1.04); filter: brightness(1.05); }
          .ct-send:hover { box-shadow: 0 14px 30px rgba(10,22,52,0.32); }
          .ct-wa:active, .ct-send:active { transform: scale(0.98); }
          @media (max-width: 860px) { .ct-panel { grid-template-columns: 1fr; } .ct-info, .ct-form { padding: 2rem 1.4rem; } }
          @media (prefers-reduced-motion: reduce) { .ct-wa:hover, .ct-send:hover { transform: none; } }
        `}</style>

        <div className="ct-panel">

          {/* Mitad izquierda: info de contacto */}
          <div className="ct-info">
            <div className="label" style={{ color: '#7EB3FF', marginBottom: '0.5rem' }}>Contacto</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.7rem, 3vw, 2.1rem)', color: '#fff', fontWeight: 600, lineHeight: 1.15, marginBottom: '0.8rem' }}>
              Estamos para ayudarte
            </h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.82)', marginBottom: '1.8rem', maxWidth: '420px' }}>
              Escribinos por el medio que prefieras. La primera consulta es sin cargo y te respondemos en el día.
            </p>

            <div>
              {contactos.map(c => (
                <div key={c.title} className="ct-item">
                  <span className="ct-ico">
                    <Icon name={c.icon} size={20} strokeWidth={1.5} />
                  </span>
                  <div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#7EB3FF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>{c.title}</div>
                    <div style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 500 }}>{c.info}</div>
                  </div>
                </div>
              ))}
            </div>

            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="ct-wa" style={{
              marginTop: '1.6rem', background: '#25D366', color: '#fff',
              padding: '14px 26px', borderRadius: '999px',
              fontSize: '0.88rem', fontWeight: 600, letterSpacing: '0.04em', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', alignSelf: 'flex-start',
              boxShadow: '0 10px 24px rgba(0,0,0,0.25)',
            }}>
              <Icon name="whatsapp" size={18} /> Escribinos por WhatsApp
            </a>
          </div>

          {/* Mitad derecha: formulario */}
          <div className="ct-form">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
              <span style={{
                width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
                background: 'var(--blue-pale)', color: 'var(--blue)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="consulta" size={22} strokeWidth={1.5} />
              </span>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.15 }}>
                Dejanos tu consulta
              </div>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-soft)', marginBottom: '1.6rem', lineHeight: 1.6 }}>
              Completá tus datos y seguí con el formulario guiado.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {inputs.map(f => (
                <div key={f.name}>
                  <label className="ct-label">{f.label}</label>
                  <input
                    className="ct-input"
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.name]}
                    onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                  />
                </div>
              ))}
              <div>
                <label className="ct-label">Tipo de consulta</label>
                <select
                  className="ct-input"
                  value={form.area}
                  onChange={e => setForm({ ...form, area: e.target.value })}
                >
                  <option value="">Seleccioná un área</option>
                  {areas.map(a => <option key={a.slug} value={a.slug}>{a.title}</option>)}
                  <option value="otro">Otro / no estoy seguro</option>
                </select>
              </div>
              <div>
                <label className="ct-label">
                  Contanos brevemente tu caso <span style={{ textTransform: 'none', fontWeight: 400, color: 'var(--text-muted)' }}>(opcional)</span>
                </label>
                <textarea
                  className="ct-input"
                  value={form.mensaje}
                  onChange={e => setForm({ ...form, mensaje: e.target.value })}
                  placeholder="Escribí acá un breve resumen de tu situación..."
                  rows={4}
                  style={{ resize: 'vertical', minHeight: '96px' }}
                />
              </div>
              <Link href={consultaHref()} className="ct-send" style={{
                background: 'linear-gradient(135deg, var(--blue) 0%, var(--blue-electric) 100%)', color: '#fff', padding: '15px',
                textAlign: 'center', textDecoration: 'none', fontSize: '0.85rem',
                letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600,
                marginTop: '0.4rem', display: 'block', borderRadius: '999px',
                boxShadow: '0 10px 24px rgba(30,91,184,0.30)',
              }}>
                Enviar consulta →
              </Link>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                Es confidencial. Usamos tus datos solo para responder tu consulta.
              </p>
            </div>
          </div>
        </div>
      </section>
     
    </main>
  )
}