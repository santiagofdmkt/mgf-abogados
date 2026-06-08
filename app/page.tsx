'use client'
import Link from 'next/link'

const areas = [
  { slug: 'accidentes-trabajo',   title: 'Accidentes de Trabajo',        desc: 'Gestionamos su reclamo ante ART y empleadores. Trabajamos a porcentaje del resultado.',       icon: '🦺' },
  { slug: 'accidentes-transito',  title: 'Accidentes de Tránsito',       desc: 'Reclamamos indemnizaciones por lesiones y daños materiales ante aseguradoras y responsables.', icon: '🚗' },
  { slug: 'despidos',             title: 'Despidos e Indemnizaciones',    desc: 'Asesoramos en despidos sin causa, liquidaciones finales, acoso laboral y trabajo en negro.',   icon: '📄' },
  { slug: 'propiedad-horizontal', title: 'Propiedad Horizontal',          desc: 'Representamos consorcios, administradores y propietarios en conflictos y cobros de expensas.', icon: '🏢' },
  { slug: 'derecho-salud',        title: 'Derecho a la Salud',            desc: 'Amparos contra obras sociales y prepagas para garantizar coberturas, tratamientos y medicamentos.', icon: '⚕️' },
  { slug: 'sucesiones',           title: 'Derecho Sucesorio',             desc: 'Tramitamos sucesiones, testamentos y particiones hereditarias con rapidez y precisión.',       icon: '📜' },
]

const equipo = [
  { nombre: 'Dr. Patricio Martin',      especialidad: 'Derecho Civil y Negociaciones',                      foto: '/equipo/1pato.jpg' },
  { nombre: 'Dr. Hernán F. Grisi',      especialidad: 'Derecho de Seguros Generales',                       foto: '/equipo/2hernan.jpg' },
  { nombre: 'Dr. Adrián Franco',        especialidad: 'Derecho Laboral y Empresarial',                      foto: '/equipo/3adri.jpg' },
  { nombre: 'Dr. Federico Chiesa',      especialidad: 'Propiedad Horizontal y Conjuntos Inmobiliarios',     foto: '/equipo/4chiesa.jpg' },
  { nombre: 'Dra. Verónica N. Carrizo', especialidad: 'Derecho a la Salud — UBA',                          foto: '/equipo/5vero.png' },
]

const btn = {
  primary: {
    background: 'var(--blue)',
    color: '#fff',
    padding: '13px 32px',
    borderRadius: '6px',
    fontSize: '0.82rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    textDecoration: 'none',
    display: 'inline-block',
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
  },
  outline: {
    background: 'transparent',
    color: 'var(--navy)',
    padding: '13px 32px',
    borderRadius: '6px',
    fontSize: '0.82rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    textDecoration: 'none',
    display: 'inline-block',
    border: '2px solid var(--navy)',
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
  },
}

export default function Home() {
  return (
    <main style={{ background: 'var(--white)' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.97)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto', padding: '0 2rem',
          height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '4px', height: '36px', background: 'var(--blue)', borderRadius: '3px' }} />
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 600, color: 'var(--navy)', letterSpacing: '0.03em' }}>
                MGF ABOGADOS
              </div>
              <div style={{ fontSize: '0.58rem', letterSpacing: '0.16em', color: 'var(--blue-electric)', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                Desde 1972
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
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
            <Link href="/consulta" style={btn.primary}>
              Consulta gratuita
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 60%, var(--blue) 100%)',
        display: 'flex', alignItems: 'center',
        padding: '6rem 2rem 4rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* decorative circle */}
        <div style={{
          position: 'absolute', right: '-120px', top: '50%', transform: 'translateY(-50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'rgba(41,121,255,0.12)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: '60px', top: '50%', transform: 'translateY(-50%)',
          width: '320px', height: '320px', borderRadius: '50%',
          background: 'rgba(41,121,255,0.08)', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ maxWidth: '680px' }}>
            <div className="label anim d1" style={{ color: '#7EB3FF', marginBottom: '1.5rem' }}>
              Estudio Jurídico · Buenos Aires · Desde 1972
            </div>

            <h1 className="anim d2" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.6rem, 6vw, 5rem)',
              fontWeight: 600, lineHeight: 1.1,
              color: '#FFFFFF', marginBottom: '1.5rem',
            }}>
              Más de 50 años<br />
              <em style={{ color: '#7EB3FF', fontStyle: 'italic' }}>resolviendo</em>{' '}
              lo que<br />a otros no les sale.
            </h1>

            <p className="anim d3" style={{
              fontSize: '1.05rem', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.72)', maxWidth: '520px', marginBottom: '2.5rem',
            }}>
              Accidentes de trabajo, despidos, sucesiones, propiedad horizontal y derecho a la salud.
              Atendemos en Capital Federal y La Plata. <strong style={{ color: '#fff' }}>Primera consulta sin cargo.</strong>
            </p>

            <div className="anim d4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/consulta" style={{
                background: 'var(--blue-electric)', color: '#fff',
                padding: '15px 38px', borderRadius: '6px',
                fontSize: '0.88rem', fontWeight: 600, letterSpacing: '0.06em',
                textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block',
              }}>
                Iniciar consulta gratuita →
              </Link>
              <a href="https://api.whatsapp.com/send?phone=5491140362772" target="_blank" rel="noopener noreferrer"
                style={{
                  background: 'rgba(255,255,255,0.12)', color: '#fff',
                  padding: '15px 38px', borderRadius: '6px',
                  fontSize: '0.88rem', fontWeight: 500, letterSpacing: '0.06em',
                  textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block',
                  border: '1px solid rgba(255,255,255,0.25)',
                }}>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'rgba(255,255,255,0.07)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            maxWidth: '1200px', margin: '0 auto', padding: '1.2rem 2rem',
            display: 'flex', gap: '3rem', flexWrap: 'wrap',
          }}>
            {[
              { num: '+50 años', label: 'de trayectoria' },
              { num: '5 abogados', label: 'especializados por área' },
              { num: '2 oficinas', label: 'Capital Federal y La Plata' },
              { num: 'Sin cargo', label: 'primera consulta' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', fontFamily: "'Inter', sans-serif" }}>{s.num}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÁREAS */}
      <section id="areas" style={{ padding: '5rem 2rem', background: 'var(--gray-50)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="label" style={{ marginBottom: '0.5rem' }}>Especialidades</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--navy)', fontWeight: 600 }}>
                Áreas de práctica
              </h2>
            </div>
            <Link href="/consulta" style={{ ...btn.outline, fontSize: '0.75rem', padding: '10px 24px' }}>
              Consultar ahora
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.2rem' }}>
            {areas.map(area => (
              <Link key={area.slug} href={`/areas/${area.slug}`}
                style={{
                  background: 'var(--white)', padding: '1.8rem',
                  borderRadius: '10px', textDecoration: 'none',
                  border: '1px solid var(--border)',
                  display: 'block', transition: 'all 0.2s ease',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = 'var(--shadow-lg)'
                  el.style.borderColor = 'var(--blue)'
                  el.style.transform = 'translateY(-3px)'
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
                  justifyContent: 'center', fontSize: '1.3rem', marginBottom: '1rem',
                }}>
                  {area.icon}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                  {area.title}
                </h3>
                <p style={{ fontSize: '0.83rem', lineHeight: 1.65, color: 'var(--text-soft)', marginBottom: '1rem' }}>
                  {area.desc}
                </p>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--blue-electric)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Consultar →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ */}
      <section style={{ padding: '5rem 2rem', background: 'var(--white)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="label" style={{ marginBottom: '0.5rem' }}>Nuestra diferencia</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--navy)', fontWeight: 600 }}>
              ¿Por qué elegirnos?
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🏆', title: 'Más de 50 años de experiencia', desc: 'Uno de los estudios con mayor trayectoria en derecho civil y laboral del AMBA. No aprendemos con sus casos.' },
              { icon: '👤', title: 'Abogado especializado en su área', desc: 'Cada caso lo atiende el profesional con experiencia específica. Sin rotar archivos entre juniors.' },
              { icon: '💼', title: 'Honorarios a resultado', desc: 'En la mayoría de los casos trabajamos a porcentaje del resultado obtenido. Si no ganamos, usted no paga.' },
            ].map(item => (
              <div key={item.title} style={{
                background: 'var(--blue-pale2)', borderRadius: '12px',
                padding: '2rem', border: '1px solid var(--blue-pale)',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.6rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.83rem', lineHeight: 1.7, color: 'var(--text-soft)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section id="equipo" style={{ padding: '5rem 2rem', background: 'var(--gray-50)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <div className="label" style={{ marginBottom: '0.5rem' }}>El estudio</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--navy)', fontWeight: 600 }}>
              Nuestro equipo
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '1.5rem' }}>
            {equipo.map(ab => (
              <div key={ab.nombre} style={{
                background: 'var(--white)', borderRadius: '12px',
                overflow: 'hidden', border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                  <img src={ab.foto} alt={ab.nombre} style={{
                    width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
                <div style={{ padding: '1rem 1rem 1.2rem', borderTop: '3px solid var(--blue-electric)' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.3rem' }}>
                    {ab.nombre}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {ab.especialidad}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%)',
        padding: '5rem 2rem', textAlign: 'center',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div className="label" style={{ color: '#7EB3FF', marginBottom: '1rem' }}>Primera consulta sin cargo</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', fontWeight: 600, marginBottom: '1rem', lineHeight: 1.2 }}>
            Contanos tu caso.<br />
            <em style={{ color: '#7EB3FF' }}>Te respondemos hoy.</em>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Completá el formulario guiado por tipo de caso y uno de nuestros abogados especializados te contactará a la brevedad.
          </p>
          <Link href="/consulta" style={{
            background: 'var(--blue-electric)', color: '#fff',
            padding: '16px 48px', borderRadius: '8px',
            fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.06em',
            textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block',
          }}>
            Iniciar consulta gratuita →
          </Link>
        </div>
      </section>

      {/* CONTACTO + FORM */}
      <section id="contacto" style={{ padding: '5rem 2rem', background: 'var(--white)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '4rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1', minWidth: '260px' }}>
            <div className="label" style={{ marginBottom: '0.5rem' }}>Consulta rápida</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: 'var(--navy)', fontWeight: 600, marginBottom: '1.5rem' }}>
              Escribinos ahora
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { icon: '📍', title: 'Capital Federal', info: 'Lavalle 1546, Piso 8° «F»' },
                { icon: '📍', title: 'La Plata', info: 'Calle 8 N° 790, Piso 3° «E»' },
                { icon: '📞', title: 'Teléfono', info: '(011) 4374-1166 / 9177' },
                { icon: '✉️', title: 'Email', info: 'estudio@mgfabogados.com.ar' },
              ].map(c => (
                <div key={c.title} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1rem', marginTop: '2px' }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--navy)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>{c.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-soft)' }}>{c.info}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            flex: '1', minWidth: '300px', maxWidth: '480px',
            background: 'var(--white)', border: '1px solid var(--border)',
            borderRadius: '12px', padding: '2.5rem',
            boxShadow: 'var(--shadow-md)',
          }}>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '1.5rem', fontFamily: "'Playfair Display', serif" }}>
              Dejanos tu consulta
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Nombre completo', type: 'text', placeholder: 'Juan García' },
                { label: 'Teléfono / WhatsApp', type: 'tel', placeholder: '+54 11 ...' },
                { label: 'Email', type: 'email', placeholder: 'juan@email.com' },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-soft)', marginBottom: '5px' }}>
                    {f.label}
                  </label>
                  <input type={f.type} placeholder={f.placeholder} style={{
                    width: '100%', border: '1px solid var(--border)', borderRadius: '6px',
                    padding: '10px 14px', fontSize: '0.9rem', outline: 'none',
                    fontFamily: "'Inter', sans-serif", color: 'var(--text)',
                    background: 'var(--gray-50)',
                  }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-soft)', marginBottom: '5px' }}>
                  Tipo de consulta
                </label>
                <select style={{
                  width: '100%', border: '1px solid var(--border)', borderRadius: '6px',
                  padding: '10px 14px', fontSize: '0.9rem', outline: 'none',
                  fontFamily: "'Inter', sans-serif", color: 'var(--text)',
                  background: 'var(--gray-50)',
                }}>
                  <option value="">Seleccioná un área</option>
                  {areas.map(a => <option key={a.slug} value={a.slug}>{a.title}</option>)}
                </select>
              </div>
              <Link href="/consulta" style={{
                background: 'var(--blue)', color: '#fff', padding: '13px',
                textAlign: 'center', textDecoration: 'none', fontSize: '0.82rem',
                letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600,
                marginTop: '0.5rem', display: 'block', borderRadius: '6px',
              }}>
                Enviar consulta →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--navy)', padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>MGF ABOGADOS</div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '2px' }}>Martín – Grisi – Franco · Desde 1972</div>
          </div>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {areas.map(a => (
              <Link key={a.slug} href={`/areas/${a.slug}`} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                {a.title}
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1.2rem' }}>
            <a href="https://instagram.com/mgfabogados" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>Instagram</a>
            <a href="https://facebook.com/61553341857581" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>Facebook</a>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '1.5rem auto 0', paddingTop: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>© {new Date().getFullYear()} MGF Abogados. Todos los derechos reservados.</p>
        </div>
      </footer>

    </main>
  )
}
