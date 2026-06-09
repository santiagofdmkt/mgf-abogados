import Link from 'next/link'

export default function CtaCotizador() {
  return (
    <section className="section-pad" style={{ padding: '4rem 2rem', background: 'var(--white)' }}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 60%, var(--blue) 100%)',
          borderRadius: '16px',
          padding: '3rem 2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ flex: '1 1 340px' }}>
          <div className="label" style={{ color: '#7EB3FF', marginBottom: '0.7rem' }}>
            Herramienta gratuita
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: '#fff', fontWeight: 600, lineHeight: 1.2, marginBottom: '0.7rem' }}>
            ¿Te despidieron? Calculá cuánto te corresponde
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, margin: 0, maxWidth: '460px' }}>
            Usá nuestro cotizador de indemnización. En menos de un minuto tenés una estimación de tu liquidación por despido, sin compromiso.
          </p>
        </div>
        <Link href="/cotizador" className="btn-zoom" style={{
          background: 'var(--blue-electric)', color: '#fff',
          padding: '15px 32px', borderRadius: '8px',
          fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.06em',
          textTransform: 'uppercase', textDecoration: 'none',
          display: 'inline-block', whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          Cotizá tu indemnización →
        </Link>
      </div>
    </section>
  )
}