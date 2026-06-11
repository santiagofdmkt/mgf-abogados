import CotizadorClient from './CotizadorClient';

export const metadata = {
  title: 'Cotizador de indemnizacion por despido | MGF Abogados',
  description: 'Calcula online y gratis cuanto te corresponde por un despido en Argentina.',
};

export default function CotizadorPage() {
  return (
    <main style={{ background: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      <section style={{ background: 'linear-gradient(135deg, #0f2747, #16345f)', color: '#fff', padding: '56px 20px 44px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, fontWeight: 700, margin: '0 0 14px', lineHeight: 1.2 }}>
            Cotiza tu indemnizacion
          </h1>
          <p style={{ fontSize: 16, color: '#cbd9ec', lineHeight: 1.55, margin: 0 }}>
            Calcula en menos de un minuto, gratis y sin compromiso, cuanto te corresponde por tu despido.
          </p>
        </div>
      </section>
      <div style={{ height: 32 }} />
      <CotizadorClient />
      <div style={{ height: 60 }} />
    </main>
  );
}