import Link from 'next/link';
import CotizadorClient from './CotizadorClient';
import { areas } from '@/lib/areas';

export const metadata = {
  title: 'Cotizador de indemnización por despido | MGF Abogados',
  description: 'Calculá online y gratis cuánto te corresponde por un despido en Argentina.',
};

export default function CotizadorPage() {
  // Misma foto que el area de Despidos
  const heroImg = areas.find((a) => a.slug === 'despidos')?.heroImage ?? '';

  return (
    <main style={{ flex: 1, background: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .cot-volver { transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease; }
        .cot-volver:hover { transform: scale(1.06); background: rgba(255,255,255,0.14); border-color: #fff; }
        .cot-volver:active { transform: scale(0.98); }
        .cot-volver-short { display: none; }
        @media (max-width: 480px) { .cot-volver-full { display: none; } .cot-volver-short { display: inline; } }
        @media (prefers-reduced-motion: reduce) { .cot-volver:hover, .cot-volver:active { transform: none; } }
      `}</style>

      {/* TOPPER del cotizador: logo + boton volver al inicio */}
      <nav style={{ background: 'var(--navy)', padding: '16px 24px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <Link href="/" style={{ color: '#fff', fontFamily: 'var(--font-playfair, "Playfair Display", serif)', fontSize: 20, fontWeight: 500, textDecoration: 'none' }}>
            MGF Abogados
          </Link>
          <Link href="/" className="cot-volver" style={{
            color: '#fff', textDecoration: 'none', padding: '8px 18px', borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
          }}>
            <span className="cot-volver-full">← Volver al inicio</span>
            <span className="cot-volver-short">← Inicio</span>
          </Link>
        </div>
      </nav>

      {/* HERO del cotizador */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--navy)', padding: '4.5rem 1.5rem 8rem', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={heroImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(120deg, rgba(10,22,52,0.96) 0%, rgba(10,22,52,0.88) 45%, rgba(30,64,175,0.55) 100%)',
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 22, letterSpacing: '0.04em' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Inicio</Link>
            {' / '}
            <span style={{ color: '#7EB3FF' }}>Cotizador de indemnización</span>
          </div>

          <div style={{
            width: 76, height: 76, borderRadius: '50%', margin: '0 auto 20px',
            background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.28)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          }}>
            <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2.5" width="14" height="19" rx="2" />
              <path d="M8.5 7h7" />
              <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01M8.5 15h.01M12 15h.01M15.5 15h.01M8.5 18h.01M12 18h.01M15.5 18h.01" />
            </svg>
          </div>

          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7EB3FF', marginBottom: 12 }}>
            Derecho Laboral · Cotizador
          </div>
          <h1 style={{
            fontFamily: 'var(--font-playfair, "Playfair Display", serif)', fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 600, lineHeight: 1.12, color: '#fff', margin: '0 0 16px',
          }}>
            Cotizá tu indemnización
          </h1>
          <p style={{ fontSize: 16.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', maxWidth: 620, margin: '0 auto 22px' }}>
            Calculá en menos de un minuto, gratis y sin compromiso, cuánto te corresponde por tu despido.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Gratis y sin compromiso', 'Resultado en menos de un minuto', 'Cálculo orientativo'].map((c) => (
              <span key={c} style={{
                background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.22)',
                color: 'rgba(255,255,255,0.9)', padding: '6px 14px', borderRadius: 999,
                fontSize: 12, fontWeight: 500, letterSpacing: '0.02em',
              }}>
                <span style={{ color: '#7EB3FF', marginRight: 7 }}>✓</span>{c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* El formulario sube y se superpone al hero */}
      <div style={{ marginTop: -80, position: 'relative', zIndex: 2 }}>
        <CotizadorClient />
      </div>
    </main>
  );
}