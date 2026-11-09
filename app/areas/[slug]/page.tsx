import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { areas, type Bloque, type Dato } from '@/lib/areas'

const WHATSAPP = 'https://api.whatsapp.com/send?phone=5491140362772'

// Ancho unico de todo el contenido de la pagina. Para cambiarlo, tocar solo este numero.
const ANCHO = '1150px'

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
    case 'mala-praxis':
      return <Svg size={size}><path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" /></Svg>
    case 'sucesiones':
      return <Svg size={size}><path d="M12 4v16" /><path d="M8 20h8" /><path d="M5 7h14" /><path d="M5 7l-2.5 5a2.8 2.8 0 0 0 5 0z" /><path d="M19 7l-2.5 5a2.8 2.8 0 0 0 5 0z" /></Svg>
    default:
      return <Svg size={size}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 4.9.7c0 1.7-2.4 2.3-2.4 2.3" /><path d="M12 16h.01" /></Svg>
  }
}

// Pictogramas de las secciones visuales (linea fina, heredan el color)
function Pict({ name, size = 24 }: { name: string; size?: number }) {
  switch (name) {
    case 'trabajo':
      return <Svg size={size}><path d="M2 18h20" /><path d="M20 18v-2a8 8 0 0 0-16 0v2" /><path d="M9 7.5V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.5" /></Svg>
    case 'itinere':
      return <Svg size={size}><circle cx="5" cy="19" r="2" /><circle cx="19" cy="7" r="2" /><path d="M7 19h7a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h7" /></Svg>
    case 'enfermedad':
      return <Svg size={size}><path d="M3 12h4l2-5 4 10 2-5h6" /></Svg>
    case 'medico':
      return <Svg size={size}><path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" /></Svg>
    case 'salario':
      return <Svg size={size}><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6.5 9.5h.01M17.5 14.5h.01" /></Svg>
    case 'indemnizacion':
      return <Svg size={size}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></Svg>
    case 'traslado':
      return <Svg size={size}><rect x="3" y="8" width="12" height="8" rx="1" /><path d="M15 11h3l3 3v2h-6" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></Svg>
    default:
      return <Svg size={size}><circle cx="12" cy="12" r="9" /><path d="M12 8v4l2.5 2.5" /></Svg>
  }
}

// Panel unico: cobertura, derechos y preguntas conectados en un solo bloque de franjas de color.
// Solo muestra las franjas que el area tiene definidas (la numeracion se acomoda sola).
// Cada franja puede abrir con una descripcion corta de lo que trata ese segmento.
type BandaPanel = { etiqueta: string; titulo: string; descripcion?: string; datos?: Dato[] }

function Panel({ cubre, corresponde, faq, faqDescripcion }: { cubre?: Bloque<Dato>; corresponde?: Bloque<Dato>; faq: { q: string; a: string }[]; faqDescripcion?: string }) {
  const bandas: BandaPanel[] = []
  if (cubre) bandas.push({ etiqueta: cubre.etiqueta, titulo: cubre.titulo, descripcion: cubre.descripcion, datos: cubre.items })
  if (corresponde) bandas.push({ etiqueta: corresponde.etiqueta, titulo: corresponde.titulo, descripcion: corresponde.descripcion, datos: corresponde.items })
  if (faq.length > 0) bandas.push({ etiqueta: 'Preguntas frecuentes', titulo: 'Dudas habituales', descripcion: faqDescripcion })
  if (bandas.length === 0) return null

  const temas = ['oscuro', 'blanco', 'celeste']

  return (
    <section className="area-section-pad" style={{ padding: '2.5rem 2rem 4rem', background: 'var(--gray-50)' }}>
      <div className="panel-unico" style={{ maxWidth: ANCHO, margin: '0 auto' }}>
        {bandas.map((b, i) => {
          const tema = temas[i % 3]
          const oscuro = tema === 'oscuro'
          const n = b.datos ? b.datos.length : 0
          return (
            <div key={b.titulo} className={`banda banda-${tema}`}>
              <div className="banda-cab">
                <div className="banda-num">{i + 1}</div>
                <div>
                  <div className="label" style={{ marginBottom: '0.35rem', color: oscuro ? '#7EB3FF' : undefined }}>{b.etiqueta}</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)', lineHeight: 1.2, color: oscuro ? '#fff' : 'var(--navy)', fontWeight: 600 }}>
                    {b.titulo}
                  </h2>
                </div>
              </div>

              <div>
                {b.descripcion && (
                  <p className="banda-desc" style={{ color: oscuro ? 'rgba(255,255,255,0.9)' : 'var(--text-soft)' }}>
                    {b.descripcion}
                  </p>
                )}

                {b.datos ? (
                  <div className={`datos-grid datos-${n}`}>
                    {b.datos.map((it) => (
                      <div key={it.titulo} className="dato-card">
                        <div className="dato-ic"><Pict name={it.icono} size={22} /></div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.02rem', fontWeight: 600, color: oscuro ? '#fff' : 'var(--navy)', marginBottom: '0.35rem' }}>
                          {it.titulo}
                        </h3>
                        <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: oscuro ? 'rgba(255,255,255,0.82)' : 'var(--text-soft)' }}>{it.texto}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="faq-lista">
                    {faq.map((f) => (
                      <details key={f.q} className="area-faq faq-item">
                        <summary>
                          <span>{f.q}</span>
                          <span className="faq-mas">＋</span>
                        </summary>
                        <p>{f.a}</p>
                      </details>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
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
        .panel-unico { border-radius: 22px; overflow: hidden; border: 1px solid var(--border); box-shadow: 0 24px 60px rgba(10,22,52,0.18); }
        .banda { position: relative; display: grid; grid-template-columns: 270px 1fr; gap: 3rem; padding: 3rem 2.5rem; }
        .banda-oscuro { background: linear-gradient(150deg, var(--navy) 0%, var(--blue) 100%); }
        .banda-blanco { background: var(--white); }
        .banda-celeste { background: var(--blue-pale); }
        .banda-cab { display: flex; gap: 1rem; align-items: flex-start; }
        .banda-num { width: 44px; height: 44px; border-radius: 50%; flex: none; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 600; font-size: 1.1rem; position: relative; z-index: 2; background: var(--navy); color: #fff; }
        .banda-oscuro .banda-num { background: #fff; color: var(--navy); }
        .banda::before { content: ''; position: absolute; left: calc(2.5rem + 21px); top: 0; bottom: 0; width: 2px; z-index: 1; }
        .banda:first-child::before { top: calc(3rem + 22px); }
        .banda:last-child::before { bottom: auto; height: calc(3rem + 22px); }
        .banda:only-child::before { display: none; }
        .banda-oscuro::before { background: rgba(255,255,255,0.35); }
        .banda-blanco::before, .banda-celeste::before { background: rgba(30,91,184,0.35); }
        .banda-desc { font-size: 0.92rem; line-height: 1.7; margin-bottom: 1.6rem; max-width: 760px; }
        .datos-grid { display: grid; gap: 1rem; align-content: start; }
        .datos-1 { grid-template-columns: 1fr; }
        .datos-2 { grid-template-columns: repeat(2, 1fr); }
        .datos-3 { grid-template-columns: repeat(3, 1fr); }
        .datos-4 { grid-template-columns: repeat(2, 1fr); }
        .datos-5, .datos-6 { grid-template-columns: repeat(3, 1fr); }
        .dato-ic { width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 0.9rem; }
        .banda-oscuro .dato-ic { background: rgba(255,255,255,0.16); color: #fff; }
        .banda-blanco .dato-ic { background: var(--blue-pale); color: var(--blue); }
        .banda-celeste .dato-ic { background: var(--white); color: var(--blue); }
        .dato-card { padding: 1.3rem 1.4rem; border-radius: 14px; border: 1px solid transparent; transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
        .dato-card:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(10,22,52,0.14); }
        .banda-oscuro .dato-card { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.2); }
        .banda-blanco .dato-card { background: var(--gray-50); border-color: var(--border); }
        .banda-celeste .dato-card { background: var(--white); border-color: rgba(30,91,184,0.2); }
        @media (prefers-reduced-motion: reduce) { .dato-card:hover { transform: none; } }
        .faq-lista { display: flex; flex-direction: column; gap: 0.7rem; max-width: 900px; }
        .faq-item { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 1.05rem 1.3rem; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        .faq-item:hover { border-color: var(--blue); }
        .faq-item[open] { border-color: var(--blue); box-shadow: 0 6px 18px rgba(30,91,184,0.12); }
        .faq-item summary { list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 1rem; font-weight: 600; font-size: 0.93rem; color: var(--navy); }
        .faq-mas { color: var(--blue-electric); font-size: 1.4rem; line-height: 1; flex: none; transition: transform 0.2s ease; }
        .faq-item[open] .faq-mas { transform: rotate(45deg); }
        .faq-item p { margin-top: 0.8rem; font-size: 0.88rem; line-height: 1.65; color: var(--text-soft); }
        @media (max-width: 960px) {
          .banda { grid-template-columns: 1fr; gap: 1.6rem; padding: 2.2rem 1.4rem; }
          .banda::before { display: none; }
        }
        @media (max-width: 700px) {
          .datos-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.97)', borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{
          maxWidth: ANCHO, margin: '0 auto', padding: '0 1.5rem',
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
            <Link href={`/consulta?area=${area.slug}`} style={{
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

        <div style={{ position: 'relative', zIndex: 1, maxWidth: ANCHO, margin: '0 auto' }}>
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
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.78)', maxWidth: '620px', marginBottom: area.chips ? '1.2rem' : '0' }}>
            {area.heroDescription}
          </p>
          {area.chips && area.chips.length > 0 && (
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {area.chips.map((c) => (
                <span key={c} style={{
                  background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.22)',
                  color: 'rgba(255,255,255,0.9)', padding: '6px 14px', borderRadius: '999px',
                  fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.02em',
                }}>
                  <span style={{ color: '#7EB3FF', marginRight: '0.45rem' }}>✓</span>{c}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* INTRO DEL AREA: tarjeta unica con intro y equipo, debajo del hero */}
      {area.intro && (
        <section className="area-section-pad" style={{ padding: '3rem 2rem 0', background: 'var(--gray-50)' }}>
          <style>{`
            .intro-card { display: grid; grid-template-columns: 220px 1fr; border-radius: 22px; overflow: hidden; background: var(--white); border: 1px solid var(--border); box-shadow: 0 24px 60px rgba(10,22,52,0.12); }
            @media (max-width: 760px) { .intro-card { grid-template-columns: 1fr; } }
          `}</style>
          <div className="intro-card" style={{ maxWidth: ANCHO, margin: '0 auto' }}>
            <div style={{
              background: 'linear-gradient(150deg, var(--navy) 0%, var(--blue) 100%)',
              padding: '2.2rem 1.5rem', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1rem',
            }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.28)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
              }}>
                <AreaIcon slug={area.slug} size={34} />
              </div>
              <div>
                <div style={{ fontSize: '0.64rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: '#7EB3FF', marginBottom: '0.4rem' }}>
                  Esta área
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.08rem', fontWeight: 600, lineHeight: 1.25, color: '#fff' }}>
                  {area.title}
                </div>
              </div>
            </div>
            <div style={{ padding: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
              <div className="label" style={{ marginBottom: '0.5rem' }}>Qué hacemos por vos</div>
              <div style={{ width: '48px', height: '3px', borderRadius: '2px', background: 'var(--blue-electric)', marginBottom: '1.2rem' }} />
              <p style={{ fontSize: 'clamp(0.9rem, 1.2vw, 0.98rem)', lineHeight: 1.7, color: 'var(--text-soft)' }}>
                {area.intro}
              </p>
              {area.secciones.map((s) => (
                <div key={s.titulo} style={{
                  marginTop: '1.6rem', background: 'var(--blue-pale)', borderRadius: '14px',
                  borderLeft: '4px solid var(--blue-electric)', padding: '1.3rem 1.5rem',
                }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: 'var(--navy)', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {s.titulo}
                  </h2>
                  {s.parrafos.map((p, i) => (
                    <p key={i} style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text-soft)', marginBottom: i < s.parrafos.length - 1 ? '0.6rem' : 0 }}>{p}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PANEL UNICO: cobertura, derechos y preguntas conectados */}
      <Panel cubre={area.cubre} corresponde={area.corresponde} faq={area.faq} faqDescripcion={area.faqDescripcion} />

      {/* BOTONES FINALES: volver, consulta y WhatsApp en una sola fila, con efecto zoom en los 3 botones */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.9rem', flexWrap: 'wrap', padding: '0.5rem 1rem 3.5rem', background: 'var(--gray-50)' }}>
        <style>{`
          .btn-final { transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease; }
          .btn-final:hover { transform: scale(1.07); }
          .btn-final:active { transform: scale(0.98); }
          .btn-final-volver:hover { border-color: var(--navy) !important; }
          .btn-final-primary:hover { box-shadow: 0 14px 34px rgba(10,22,52,0.42) !important; }
          .btn-final-wa:hover { background: var(--navy) !important; color: #fff !important; }
          @media (prefers-reduced-motion: reduce) { .btn-final:hover, .btn-final:active { transform: none; } }
        `}</style>
        <Link href="/" className="btn-final btn-final-volver" style={{
          background: 'var(--white)', color: 'var(--navy)', padding: '16px 30px', borderRadius: '999px',
          border: '1.5px solid var(--border)',
          fontSize: '0.88rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
        }}>
          ← Volver al inicio
        </Link>
        <Link href={`/consulta?area=${area.slug}`} className="btn-final btn-final-primary" style={{
          background: 'var(--blue-electric)', color: '#fff', padding: '16px 38px', borderRadius: '999px',
          border: '1.5px solid var(--blue-electric)',
          fontSize: '0.88rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
          boxShadow: '0 10px 28px rgba(10,22,52,0.32)',
        }}>
          Iniciar primera consulta →
        </Link>
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-final btn-final-wa" style={{
          background: 'var(--white)', color: 'var(--navy)', padding: '16px 38px', borderRadius: '999px',
          border: '1.5px solid var(--navy)',
          fontSize: '0.88rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
        }}>
          WhatsApp
        </a>
      </div>

    </main>
  )
}