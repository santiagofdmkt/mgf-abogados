import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { areas } from '@/lib/areas'

const WHATSAPP = 'https://api.whatsapp.com/send?phone=5491140362772'

// Wrapper SVG reutilizable (mismo set que la home)
function Svg({ children, size = 22 }: { children: ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  )
}

// Íconos de línea fina (idénticos a la home), mapeados por slug
function AreaIcon({ slug, size }: { slug: string; size?: number }) {
  switch (slug) {
    case 'accidentes-trabajo':
      return <Svg size={size}><path d="M2 18h20" /><path d="M20 18v-2a8 8 0 0 0-16 0v2" /><path d="M9 7.5V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.5" /></Svg>
    case 'accidentes-transito':
      return <Svg size={size}><path d="M5 11l1.5-4A2 2 0 0 1 8.4 6h7.2a2 2 0 0 1 1.9 1l1.5 4" /><path d="M3 11h18v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><circle cx="7.5" cy="16" r="1.6" /><circle cx="16.5" cy="16" r="1.6" /></Svg>
    case 'despidos':
      return <Svg size={size}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6" /><path d="M9 17h4" /></Svg>
    case 'propiedad-horizontal':
      return <Svg size={size}><path d="M3 21h18" /><path d="M5 21V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15" /><path d="M13 21V10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11" /><path d="M8 9h2M8 12.5h2M8 16h2M16 13h1.5M16 16.5h1.5" /></Svg>
    case 'derecho-salud':
      return <Svg size={size}><path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" /></Svg>
    case 'sucesiones':
      return <Svg size={size}><path d="M12 4v16" /><path d="M8 20h8" /><path d="M5 7h14" /><path d="M5 7l-2.5 5a2.8 2.8 0 0 0 5 0z" /><path d="M19 7l-2.5 5a2.8 2.8 0 0 0 5 0z" /></Svg>
    default:
      return <Svg size={size}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 4.9.7c0 1.7-2.4 2.3-2.4 2.3" /><path d="M12 16h.01" /></Svg>
  }
}

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const area = areas.find((a) => a.slug === slug)
  if (!area) return { title: 'Área no encontrada | MGF Abogados' }
  return { title: area.metaTitle, description: area.metaDescription }
}

export default async function AreaPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const area = areas.find((a) => a.slug === slug)
  if (!area) notFound()

  const otras = areas.filter((a) => a.slug !== area.slug)

  return (
    <main id="top" style={{ background: 'var(--white)', scrollBehavior: 'smooth' }}>
      <style>{`
        html { scroll-behavior: smooth; }
        @media (max-width: 768px) {
          .area-nav-cta-full { display: none !important; }
          .area-section-pad { padding: 3rem 1.2rem !important; }
          .area-hero { padding: 6rem 1.2rem 3rem !important; }
        }
        @media (min-width: 769px) {
          .area-nav-cta-short { display: none !important; }
        }
        details.area-faq summary::-webkit-details-marker { display: none; }
        .otra-card { transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
        .otra-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); border-color: var(--blue) !important; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.97)', borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem',
          height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '4px', height: '36px', background: 'var(--blue)', borderRadius: '3px' }} />
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 600, color: 'var(--navy)', letterSpacing: '0.03em' }}>
                MGF ABOGADOS
              </div>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.16em', color: 'var(--blue-electric)', textTransform: 'uppercase', fontWeight: 600 }}>
                Desde 1972
              </div>
            </div>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
            <Link href="/#areas" style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-soft)', textDecoration: 'none' }}>
              ← Áreas
            </Link>
            <Link href="/consulta" style={{
              background: 'var(--blue)', color: '#fff', padding: '10px 22px', borderRadius: '6px',
              fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
            }}>
              <span className="area-nav-cta-full">Consulta gratuita</span>
              <span className="area-nav-cta-short">Consultar</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO con imagen */}
      <section className="area-hero" style={{
        position: 'relative', overflow: 'hidden',
        padding: '8rem 2rem 4rem', background: 'var(--navy)',
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={area.heroImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(120deg, rgba(10,22,52,0.96) 0%, rgba(10,22,52,0.88) 45%, rgba(30,64,175,0.55) 100%)',
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', marginBottom: '1.5rem', letterSpacing: '0.04em' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Inicio</Link>
            {' / '}
            <Link href="/#areas" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Áreas</Link>
            {' / '}
            <span style={{ color: '#7EB3FF' }}>{area.title}</span>
          </div>

          <div style={{
            width: '52px', height: '52px', borderRadius: '12px',
            background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#fff', marginBottom: '1.2rem',
          }}>
            <AreaIcon slug={area.slug} size={26} />
          </div>

          <div className="label" style={{ color: '#7EB3FF', marginBottom: '0.8rem' }}>{area.heroLabel}</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 600, lineHeight: 1.12, color: '#fff', marginBottom: '1.2rem',
          }}>
            {area.title}
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.78)', maxWidth: '620px', marginBottom: '2rem' }}>
            {area.heroDescription}
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <Link href="/consulta" style={{
              background: 'var(--blue-electric)', color: '#fff', padding: '14px 32px', borderRadius: '6px',
              fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
            }}>
              Iniciar primer consulta →
            </Link>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
              background: 'rgba(255,255,255,0.14)', color: '#fff', padding: '14px 32px', borderRadius: '6px',
              fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.28)',
            }}>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* INTRODUCCIÓN / SECCIONES — fondo gris + tarjeta blanca, texto algo mas chico */}
      {area.secciones.length > 0 && (
        <section className="area-section-pad" style={{ padding: '4rem 2rem', background: 'var(--gray-50)' }}>
          <div style={{
            maxWidth: '800px', margin: '0 auto',
            background: 'var(--white)', border: '1px solid var(--border)',
            borderRadius: '16px', padding: 'clamp(1.8rem, 4vw, 3rem)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex', flexDirection: 'column', gap: '1.8rem',
          }}>
            {area.secciones.map((s) => (
              <div key={s.titulo}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.25rem, 2.6vw, 1.7rem)', color: 'var(--navy)', fontWeight: 600, marginBottom: '0.7rem' }}>
                  {s.titulo}
                </h2>
                {s.parrafos.map((p, i) => (
                  <p key={i} style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--text-soft)', marginBottom: '0.7rem' }}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ — fondo blanco con acordeones grises, para contrastar con la intro gris */}
      {area.faq.length > 0 && (
        <section className="area-section-pad" style={{ padding: '4rem 2rem', background: 'var(--white)', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div className="label" style={{ marginBottom: '0.4rem' }}>Preguntas frecuentes</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: 'var(--navy)', fontWeight: 600, marginBottom: '1.8rem' }}>
              Dudas habituales
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {area.faq.map((f) => (
                <details key={f.q} className="area-faq" style={{
                  background: 'var(--gray-50)', border: '1px solid var(--border)', borderRadius: '10px',
                  padding: '1rem 1.3rem', boxShadow: 'var(--shadow-sm)',
                }}>
                  <summary style={{
                    cursor: 'pointer', listStyle: 'none', fontWeight: 600, fontSize: '0.95rem',
                    color: 'var(--navy)', display: 'flex', justifyContent: 'space-between', gap: '1rem',
                  }}>
                    {f.q}
                    <span style={{ color: 'var(--blue-electric)' }}>＋</span>
                  </summary>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-soft)', marginTop: '0.8rem' }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OTRAS ÁREAS — sobre gris con imagen translucida de fondo */}
      <section className="area-section-pad" style={{ position: 'relative', overflow: 'hidden', padding: '4rem 2rem', background: 'var(--gray-50)', borderTop: '1px solid var(--border)' }}>
        {/* Capa de imagen translucida */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={area.heroImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.22 }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(247,248,250,0.55) 0%, rgba(247,248,250,0.72) 100%)',
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ marginBottom: '1.8rem' }}>
            <div className="label" style={{ marginBottom: '0.4rem' }}>Más especialidades</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--navy)' }}>
              Otras áreas de práctica
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {otras.map((o) => (
              <Link key={o.slug} href={`/areas/${o.slug}`} className="otra-card" style={{
                display: 'flex', alignItems: 'center', gap: '0.9rem',
                background: 'var(--white)', borderRadius: '12px', padding: '1.2rem 1.3rem',
                border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)',
                textDecoration: 'none',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '11px',
                  background: 'var(--blue-pale)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'var(--blue)', flexShrink: 0,
                }}>
                  <AreaIcon slug={o.slug} size={22} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.25 }}>
                  {o.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}