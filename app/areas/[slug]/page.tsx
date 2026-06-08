import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { areas } from '@/lib/areas'

const WHATSAPP = 'https://api.whatsapp.com/send?phone=5491140362772'

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
    <main style={{ background: 'var(--white)' }}>
      <style>{`
        @media (max-width: 768px) {
          .area-nav-cta-full { display: none !important; }
          .area-section-pad { padding: 3rem 1.2rem !important; }
          .area-hero { padding: 6rem 1.2rem 3rem !important; }
          .area-footer-inner { flex-direction: column !important; align-items: flex-start !important; gap: 1.5rem !important; }
        }
        @media (min-width: 769px) {
          .area-nav-cta-short { display: none !important; }
        }
        details.area-faq summary::-webkit-details-marker { display: none; }
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
            justifyContent: 'center', fontSize: '1.6rem', marginBottom: '1.2rem',
          }}>
            {area.icon}
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
              Iniciar consulta gratuita →
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

      {/* SECCIONES de contenido */}
      {area.secciones.length > 0 && (
        <section className="area-section-pad" style={{ padding: '4rem 2rem', background: 'var(--white)' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {area.secciones.map((s) => (
              <div key={s.titulo}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--navy)', fontWeight: 600, marginBottom: '0.8rem' }}>
                  {s.titulo}
                </h2>
                {s.parrafos.map((p, i) => (
                  <p key={i} style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-soft)', marginBottom: '0.8rem' }}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {area.faq.length > 0 && (
        <section className="area-section-pad" style={{ padding: '4rem 2rem', background: 'var(--gray-50)' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div className="label" style={{ marginBottom: '0.4rem' }}>Preguntas frecuentes</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: 'var(--navy)', fontWeight: 600, marginBottom: '1.8rem' }}>
              Dudas habituales
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {area.faq.map((f) => (
                <details key={f.q} className="area-faq" style={{
                  background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px',
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

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%)', padding: '3.5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="label" style={{ color: '#7EB3FF', marginBottom: '0.8rem' }}>Primera consulta sin cargo</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#fff', fontWeight: 600, marginBottom: '0.8rem', lineHeight: 1.2 }}>
            Contanos tu caso.<br />
            <em style={{ color: '#7EB3FF' }}>Te respondemos hoy.</em>
          </h2>
          <Link href="/consulta" style={{
            background: 'var(--blue-electric)', color: '#fff', padding: '14px 40px', borderRadius: '8px',
            fontSize: '0.88rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block',
          }}>
            Iniciar consulta gratuita →
          </Link>
        </div>
      </section>

      {/* OTRAS ÁREAS */}
      <section className="area-section-pad" style={{ padding: '4rem 2rem', background: 'var(--gray-50)' }}>
        <style>{`
          .otra-card { transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
          .otra-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: var(--blue) !important; }
          .otra-card:hover .otra-arrow { transform: translateX(3px); }
          .otra-arrow { transition: transform 0.2s ease; }
        `}</style>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.8rem' }}>
            <div style={{ width: '3px', height: '22px', background: 'var(--blue)', borderRadius: '2px' }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 600, color: 'var(--navy)' }}>
              Otras áreas de práctica
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {otras.map((o) => (
              <Link key={o.slug} href={`/areas/${o.slug}`} className="otra-card" style={{
                display: 'flex', flexDirection: 'column', gap: '0.7rem',
                background: 'var(--white)', borderRadius: '12px', padding: '1.4rem',
                border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)',
                textDecoration: 'none', height: '100%',
              }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '10px',
                  background: 'var(--blue-pale)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '1.3rem',
                }}>
                  {o.icon}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600, color: 'var(--navy)' }}>
                  {o.title}
                </h3>
                <p style={{ fontSize: '0.83rem', lineHeight: 1.55, color: 'var(--text-soft)', flex: 1 }}>
                  {o.heroDescription}
                </p>
                <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--blue-electric)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  Ver área <span className="otra-arrow">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--navy)', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="area-footer-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '1.5rem' }}>
            <div style={{ minWidth: '180px' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>MGF ABOGADOS</div>
              <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '3px', marginBottom: '1rem' }}>
                Martín – Grisi – Franco · Desde 1972
              </div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                <div>📍 Lavalle 1546, Piso 8° «F» — CABA</div>
                <div>📍 Calle 8 N° 790, Piso 3° «E» — La Plata</div>
                <div>📞 (011) 4374-1166 / 9177</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.8rem' }}>
                Servicios
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {areas.map((a) => (
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
                background: 'var(--blue-electric)', color: '#fff', padding: '11px 22px', borderRadius: '6px',
                fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block',
              }}>
                Consulta gratuita →
              </Link>
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