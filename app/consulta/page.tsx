'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Question = {
  id: string;
  t: string;
  type: 'radio' | 'multi';
  o: string[];
};

type Area = {
  label: string;
  icon: string;
  q: Question[];
};

const areas: Record<string, Area> = {
  'accidentes-trabajo': {
    label: 'Accidente de trabajo / ART',
    icon: 'trabajo',
    q: [
      { id: 'cuando', t: '¿Cuándo ocurrió el accidente?', type: 'radio', o: ['Hace menos de 1 mes', 'Entre 1 y 6 meses', '6 meses a 2 años', 'Más de 2 años'] },
      { id: 'relacion', t: '¿Trabajás en relación de dependencia (en blanco)?', type: 'radio', o: ['Sí', 'No', 'Parcialmente / no estoy seguro'] },
      { id: 'denuncia', t: '¿Denunciaste el accidente a la ART?', type: 'radio', o: ['Sí', 'No', 'No sé qué es la ART'] },
      { id: 'secuela', t: '¿Te quedaron secuelas o incapacidad?', type: 'radio', o: ['Sí', 'No', 'Todavía en evaluación'] },
      { id: 'licencia', t: '¿Estás actualmente de licencia médica?', type: 'radio', o: ['Sí', 'No'] },
    ],
  },
  'accidentes-transito': {
    label: 'Accidente de tránsito',
    icon: 'transito',
    q: [
      { id: 'cuando', t: '¿Cuándo ocurrió el accidente?', type: 'radio', o: ['Hace menos de 1 mes', 'Entre 1 y 6 meses', '6 meses a 2 años', 'Más de 2 años'] },
      { id: 'rol', t: '¿Qué rol tenías?', type: 'radio', o: ['Conductor', 'Acompañante', 'Peatón', 'Ciclista / motociclista'] },
      { id: 'lesiones', t: '¿Hubo lesiones?', type: 'radio', o: ['Sí, lesiones a mí', 'Sí, a terceros', 'Solo daños materiales'] },
      { id: 'policial', t: '¿Se hizo la denuncia policial?', type: 'radio', o: ['Sí', 'No', 'No sé'] },
      { id: 'seguro', t: '¿El vehículo responsable tenía seguro?', type: 'radio', o: ['Sí', 'No', 'No sé'] },
    ],
  },
  'despidos': {
    label: 'Despido / problema laboral',
    icon: 'despidos',
    q: [
      { id: 'que', t: '¿Qué pasó?', type: 'radio', o: ['Me despidieron', 'Me obligaron a renunciar', 'Me suspendieron', 'No me pagan / me deben sueldos'] },
      { id: 'registro', t: '¿Estabas registrado (en blanco)?', type: 'radio', o: ['Sí, todo en blanco', 'No, en negro', 'Parcialmente (mal registrado)'] },
      { id: 'antiguedad', t: '¿Hace cuánto trabajabas ahí?', type: 'radio', o: ['Menos de 3 meses', '3 meses a 1 año', '1 a 5 años', 'Más de 5 años'] },
      { id: 'liquidacion', t: '¿Te pagaron la liquidación / indemnización?', type: 'radio', o: ['Sí', 'No', 'Solo una parte'] },
      { id: 'fecha', t: '¿Cuándo fue el despido?', type: 'radio', o: ['Hace menos de 1 mes', '1 a 2 meses', 'Más de 2 meses', 'Todavía no pasó / en curso'] },
    ],
  },
  'propiedad-horizontal': {
    label: 'Propiedad horizontal / consorcio',
    icon: 'propiedad',
    q: [
      { id: 'rol', t: '¿Cuál es tu rol?', type: 'radio', o: ['Propietario', 'Inquilino', 'Administrador', 'Miembro del consejo'] },
      { id: 'conflicto', t: '¿Cuál es el conflicto?', type: 'radio', o: ['Expensas / deudas', 'Administración', 'Obras o daños', 'Convivencia / ruidos', 'Asambleas / reglamento', 'Otro'] },
      { id: 'juicio', t: '¿Hay un reclamo o juicio ya iniciado?', type: 'radio', o: ['Sí', 'No', 'No sé'] },
    ],
  },
  'derecho-salud': {
    label: 'Derecho a la salud / amparo',
    icon: 'salud',
    q: [
      { id: 'cobertura', t: '¿Qué cobertura tenés?', type: 'radio', o: ['Obra social', 'Prepaga', 'PAMI', 'No tengo cobertura'] },
      { id: 'rechazo', t: '¿Qué te rechazaron o demoran?', type: 'radio', o: ['Medicación', 'Cirugía / prestación', 'Discapacidad', 'Tratamiento prolongado', 'Afiliación / aumento'] },
      { id: 'orden', t: '¿Tenés indicación médica u orden del profesional?', type: 'radio', o: ['Sí', 'No', 'La estoy gestionando'] },
      { id: 'urgente', t: '¿Es una situación urgente?', type: 'radio', o: ['Sí, muy urgente', 'Algo urgente', 'No es urgente'] },
    ],
  },
  'sucesiones': {
    label: 'Sucesión / herencia',
    icon: 'sucesiones',
    q: [
      { id: 'fallecio', t: '¿La persona ya falleció?', type: 'radio', o: ['Sí', 'No, es para planificar'] },
      { id: 'testamento', t: '¿Hay testamento?', type: 'radio', o: ['Sí', 'No', 'No sé'] },
      { id: 'herederos', t: '¿Cuántos herederos hay aprox.?', type: 'radio', o: ['1', '2 o 3', '4 o más', 'No sé'] },
      { id: 'bienes', t: '¿Qué bienes hay? (podés elegir varios)', type: 'multi', o: ['Inmuebles', 'Vehículos', 'Cuentas / dinero', 'Empresa / acciones', 'Otros'] },
      { id: 'tramite', t: '¿Se inició algún trámite?', type: 'radio', o: ['Sí', 'No', 'No sé'] },
    ],
  },
  'otro': {
    label: 'Otro / no estoy seguro',
    icon: 'otro',
    q: [],
  },
};

const order = [
  'accidentes-trabajo',
  'accidentes-transito',
  'despidos',
  'propiedad-horizontal',
  'derecho-salud',
  'sucesiones',
  'otro',
];

type ContactField = {
  id: string;
  t: string;
  type: 'text' | 'tel' | 'radio';
  ph?: string;
  o?: string[];
};

const contactFields: ContactField[] = [
  { id: 'nombre', t: 'Nombre y apellido', type: 'text', ph: 'Ej: Juan Pérez' },
  { id: 'telefono', t: 'Teléfono / WhatsApp', type: 'tel', ph: 'Ej: 1123456789' },
  { id: 'email', t: 'Email', type: 'text', ph: 'tu@email.com' },
  { id: 'localidad', t: 'Localidad', type: 'text', ph: 'Ej: CABA, La Plata…' },
  { id: 'horario', t: '¿Cuándo preferís que te contactemos?', type: 'radio', o: ['Mañana', 'Tarde', 'Indistinto'] },
  { id: 'medio', t: '¿Por qué medio?', type: 'radio', o: ['WhatsApp', 'Llamada', 'Email'] },
];

const steps = ['Tipo de consulta', 'Tu caso', 'Tus datos', 'Resumen'];

function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'trabajo':
      return (
        <svg {...common}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case 'transito':
      return (
        <svg {...common}>
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      );
    case 'despidos':
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="17" y1="8" x2="22" y2="13" />
          <line x1="22" y1="8" x2="17" y2="13" />
        </svg>
      );
    case 'propiedad':
      return (
        <svg {...common}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
        </svg>
      );
    case 'salud':
      return (
        <svg {...common}>
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      );
    case 'sucesiones':
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case 'otro':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case 'check':
      return (
        <svg {...common} strokeWidth={3}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case 'chevron':
      return (
        <svg {...common}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
      );
    case 'arrow':
      return (
        <svg {...common}>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      );
    default:
      return null;
  }
}

const styles = `
  .mgf-card {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: 0 8px 30px rgba(15, 39, 71, 0.10);
  }
  .mgf-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }
  @media (min-width: 540px) {
    .mgf-grid { grid-template-columns: 1fr 1fr; }
  }

  /* Tarjetas de área (paso 1) */
  .mgf-area {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    text-align: left;
    font-size: 14px;
    padding: 14px 15px;
    border: 1.5px solid var(--border);
    background: #fff;
    border-radius: 13px;
    color: var(--ink, #1e293b);
    cursor: pointer;
    transition: background .16s ease, border-color .16s ease, transform .16s ease, box-shadow .16s ease;
  }
  .mgf-area:hover {
    background: var(--blue-pale);
    border-color: var(--blue);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(30, 91, 184, 0.14);
  }
  .mgf-area[data-on="true"] {
    background: var(--blue-pale);
    border-color: var(--blue);
    box-shadow: inset 0 0 0 1px var(--blue);
  }
  .mgf-ico {
    width: 38px; height: 38px;
    border-radius: 10px;
    background: var(--navy);
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    flex: none;
    transition: background .16s ease;
  }
  .mgf-area:hover .mgf-ico,
  .mgf-area[data-on="true"] .mgf-ico { background: var(--blue); }
  .mgf-label { font-weight: 500; line-height: 1.3; }
  .mgf-chev {
    margin-left: auto;
    color: #94a3b8;
    flex: none;
    display: flex;
    transition: color .16s ease, transform .16s ease;
  }
  .mgf-area:hover .mgf-chev { color: var(--blue); transform: translateX(3px); }
  .mgf-area[data-on="true"] .mgf-chev { color: var(--blue); }

  /* Opciones de respuesta (pasos 2 y 3) */
  .mgf-opt {
    display: flex;
    align-items: center;
    gap: 11px;
    width: 100%;
    text-align: left;
    margin-bottom: 9px;
    padding: 12px 14px;
    border-radius: 11px;
    border: 1.5px solid var(--border);
    background: #fff;
    color: var(--ink, #1e293b);
    font-size: 14px;
    cursor: pointer;
    transition: background .16s ease, border-color .16s ease;
  }
  .mgf-opt:hover { background: var(--blue-pale); border-color: var(--blue); }
  .mgf-opt[data-on="true"] { background: var(--blue-pale); border-color: var(--blue); }
  .mgf-radio {
    width: 19px; height: 19px;
    border-radius: 50%;
    border: 2px solid #cbd5e1;
    background: #fff;
    flex: none;
    display: flex; align-items: center; justify-content: center;
    color: #fff;
    transition: background .16s ease, border-color .16s ease;
  }
  .mgf-radio.box { border-radius: 6px; }
  .mgf-opt:hover .mgf-radio { border-color: var(--blue); }
  .mgf-opt[data-on="true"] .mgf-radio { border-color: var(--blue); background: var(--blue); }

  /* Inputs */
  .mgf-input {
    width: 100%;
    font-family: inherit;
    font-size: 14px;
    padding: 12px 13px;
    border: 1.5px solid var(--border);
    border-radius: 11px;
    box-sizing: border-box;
    color: var(--ink, #1e293b);
    background: #fff;
    transition: border-color .16s ease, box-shadow .16s ease;
  }
  .mgf-input:hover { border-color: #cbd5e1; }
  .mgf-input:focus { outline: none; border-color: var(--blue); box-shadow: 0 0 0 3px var(--blue-pale); }
  .mgf-textarea { resize: vertical; }
  .mgf-hint { font-size: 12px; color: #94a3b8; margin-top: 5px; }

  /* Botones de navegación */
  .mgf-back {
    font-size: 14px;
    padding: 11px 18px;
    border: 1.5px solid var(--border);
    background: #fff;
    border-radius: 10px;
    color: #64748b;
    cursor: pointer;
    transition: background .16s ease, border-color .16s ease, color .16s ease;
  }
  .mgf-back:hover { background: var(--gray-50); border-color: #cbd5e1; color: var(--navy); }
  .mgf-next {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    padding: 12px 24px;
    border: none;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    transition: filter .16s ease, transform .1s ease, box-shadow .16s ease;
  }
  .mgf-next:hover { filter: brightness(1.08); box-shadow: 0 6px 16px rgba(15, 39, 71, 0.22); }
  .mgf-next:active { transform: scale(.98); }
  .mgf-next:disabled { opacity: 0.7; cursor: default; }
  .mgf-shake { outline: 2px solid var(--blue); outline-offset: 2px; }

  .mgf-chip {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    color: var(--blue);
    background: var(--blue-pale);
    padding: 6px 12px;
    border-radius: 99px;
    margin-bottom: 18px;
    font-weight: 500;
  }

  .mgf-success-ico {
    width: 64px; height: 64px;
    border-radius: 50%;
    background: #dcfce7;
    color: #16a34a;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 18px;
  }
`;

function ConsultaInner() {
  const sp = useSearchParams();

  const paramArea = sp.get('area');
  const initialArea = paramArea && areas[paramArea] ? paramArea : null;

  const [step, setStep] = useState<number>(initialArea === null ? 1 : 2);
  const [area, setArea] = useState<string | null>(initialArea);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [detalle, setDetalle] = useState('');
  const [contact, setContact] = useState<Record<string, string>>(() => {
    const c: Record<string, string> = {};
    const n = sp.get('nombre');
    const t = sp.get('telefono');
    const e = sp.get('email');
    if (n) c.nombre = n;
    if (t) c.telefono = t;
    if (e) c.email = e;
    return c;
  });
  const [shake, setShake] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false); // NUEVO: éxito → muestra pantalla de confirmación
  const [errorEnvio, setErrorEnvio] = useState(false); // NUEVO: si el guardado falló

  const selectArea = (k: string) => {
    setArea(k);
    setStep(2);
  };

  const selectRadio = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const toggleMulti = (id: string, value: string) => {
    setAnswers((prev) => {
      const arr = Array.isArray(prev[id]) ? [...(prev[id] as string[])] : [];
      const i = arr.indexOf(value);
      if (i > -1) arr.splice(i, 1);
      else arr.push(value);
      return { ...prev, [id]: arr };
    });
  };

  // NUEVO: validación del teléfono — exactamente 10 dígitos
  const telefonoValido = () => {
    const t = (contact.telefono || '').replace(/\D/g, '');
    return t.length === 10;
  };

  const isValid = () => {
    if (step === 1) return !!area;
    if (step === 3) return !!contact.nombre && telefonoValido();
    return true;
  };

  // Resumen en texto plano para guardar en la columna "mensaje"
  const buildResumen = () => {
    const L: string[] = [];
    L.push('Tema: ' + (area && areas[area] ? areas[area].label : '-'));
    if (area && areas[area]) {
      areas[area].q.forEach((q) => {
        let v = answers[q.id];
        if (Array.isArray(v)) v = v.join(', ');
        if (v) L.push(q.t + ' ' + v);
      });
    }
    if (detalle) L.push('Detalle: ' + detalle);
    contactFields.forEach((f) => {
      if (f.id === 'nombre' || f.id === 'telefono' || f.id === 'email') return;
      if (contact[f.id]) L.push(f.t + ': ' + contact[f.id]);
    });
    return L.join('\n');
  };

  // MODIFICADO: ahora solo guarda en Supabase. Ya NO abre WhatsApp.
  const enviarConsulta = async () => {
    setEnviando(true);
    setErrorEnvio(false);
    try {
      const res = await fetch('/api/consulta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: contact.nombre || '',
          telefono: contact.telefono || '',
          email: contact.email || '',
          area: area || '',
          mensaje: buildResumen(),
        }),
      });
      if (!res.ok) throw new Error('Respuesta no OK del servidor');
      setEnviado(true); // éxito → pantalla de confirmación
    } catch (err) {
      console.error('No se pudo guardar la consulta:', err);
      setErrorEnvio(true); // muestra mensaje de error, deja reintentar
    } finally {
      setEnviando(false);
    }
  };

  const goNext = async () => {
    if (!isValid()) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    if (step === 4) {
      await enviarConsulta();
      return;
    }
    setStep(step + 1);
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const RadioRow = ({
    opt,
    selected,
    multi,
    onClick,
  }: {
    opt: string;
    selected: boolean;
    multi?: boolean;
    onClick: () => void;
  }) => (
    <button type="button" onClick={onClick} className="mgf-opt" data-on={selected ? 'true' : 'false'}>
      <span className={multi ? 'mgf-radio box' : 'mgf-radio'}>
        {selected && <Icon name="check" size={11} />}
      </span>
      <span>{opt}</span>
    </button>
  );

  // NUEVO: handler del teléfono — solo números, máximo 10
  const onTelefonoChange = (value: string) => {
    const soloDigitos = value.replace(/\D/g, '').slice(0, 10);
    setContact((prev) => ({ ...prev, telefono: soloDigitos }));
  };

  return (
    <main style={{ background: 'var(--gray-50)', minHeight: '100vh', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>
      <style>{styles}</style>

      <nav style={{ background: 'var(--navy)', padding: '16px 24px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <Link href="/" style={{ color: '#fff', fontFamily: 'var(--font-playfair, "Playfair Display", serif)', fontSize: 20, fontWeight: 500, textDecoration: 'none', cursor: 'pointer' }}>
            MGF Abogados
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 16px 64px' }}>
        <div className="mgf-card">

          {/* PANTALLA DE ÉXITO */}
          {enviado ? (
            <div style={{ padding: '48px 30px', textAlign: 'center' }}>
              <div className="mgf-success-ico">
                <Icon name="check" size={32} />
              </div>
              <div style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)', fontSize: 24, fontWeight: 500, color: 'var(--navy)', marginBottom: 10 }}>
                ¡Consulta enviada!
              </div>
              <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, maxWidth: 380, margin: '0 auto 26px' }}>
                Recibimos tu consulta. Un abogado del estudio va a revisarla y te va a contactar a la brevedad por el medio que elegiste. La primera consulta es sin cargo.
              </div>
              <Link href="/" className="mgf-next" style={{ background: 'var(--navy)', textDecoration: 'none', display: 'inline-flex' }}>
                Volver al inicio
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <div style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light, #16345f) 100%)', padding: '26px 26px 22px', color: '#fff' }}>
                <div style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)', fontSize: 24, fontWeight: 500, lineHeight: 1.2 }}>
                  Iniciá tu consulta
                </div>
                <div style={{ fontSize: 13.5, color: '#aac3e6', marginTop: 5 }}>
                  Contanos tu caso. Es confidencial y la primera consulta es gratis.
                </div>
                <div style={{ marginTop: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#aac3e6', marginBottom: 8, letterSpacing: '0.02em' }}>
                    <span>Paso {step} de 4</span>
                    <span style={{ fontWeight: 500 }}>{steps[step - 1]}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {steps.map((s, i) => (
                      <div
                        key={s}
                        style={{
                          flex: 1,
                          height: 5,
                          borderRadius: 99,
                          background: i < step ? 'var(--blue-electric)' : 'rgba(255,255,255,0.16)',
                          transition: 'background .3s ease',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '26px', minHeight: 250 }}>
                {step === 1 && (
                  <>
                    <div style={{ fontSize: 15.5, fontWeight: 500, marginBottom: 4, color: 'var(--ink, #1e293b)' }}>¿Con qué necesitás ayuda?</div>
                    <div style={{ fontSize: 13, color: '#64748b', marginBottom: 18 }}>Elegí el tema más cercano a tu situación.</div>
                    <div className="mgf-grid">
                      {order.map((k) => {
                        const a = areas[k];
                        return (
                          <button key={k} type="button" onClick={() => selectArea(k)} className="mgf-area" data-on={area === k ? 'true' : 'false'}>
                            <span className="mgf-ico">
                              <Icon name={a.icon} size={19} />
                            </span>
                            <span className="mgf-label">{a.label}</span>
                            <span className="mgf-chev">
                              <Icon name="chevron" size={17} />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {step === 2 && area && (
                  <>
                    <div className="mgf-chip">
                      <Icon name={areas[area].icon} size={14} />
                      {areas[area].label}
                    </div>
                    {areas[area].q.map((q) => (
                      <div key={q.id} style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 10, color: 'var(--ink, #1e293b)' }}>{q.t}</div>
                        {q.o.map((o) => (
                          <RadioRow
                            key={o}
                            opt={o}
                            multi={q.type === 'multi'}
                            selected={q.type === 'multi' ? Array.isArray(answers[q.id]) && (answers[q.id] as string[]).indexOf(o) > -1 : answers[q.id] === o}
                            onClick={() => (q.type === 'multi' ? toggleMulti(q.id, o) : selectRadio(q.id, o))}
                          />
                        ))}
                      </div>
                    ))}
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 10, color: 'var(--ink, #1e293b)' }}>
                        Contanos en tus palabras qué pasó <span style={{ color: '#64748b', fontWeight: 400 }}>(opcional)</span>
                      </div>
                      <textarea
                        className="mgf-input mgf-textarea"
                        rows={3}
                        value={detalle}
                        onChange={(e) => setDetalle(e.target.value)}
                        placeholder="Cuanto más detalle, mejor podemos ayudarte."
                      />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div style={{ fontSize: 15.5, fontWeight: 500, marginBottom: 18, color: 'var(--ink, #1e293b)' }}>¿Cómo te contactamos?</div>
                    {contactFields.map((f) => (
                      <div key={f.id} style={{ marginBottom: 18 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 9, color: 'var(--ink, #1e293b)' }}>{f.t}</div>
                        {f.type === 'tel' ? (
                          <>
                            <input
                              className="mgf-input"
                              type="tel"
                              inputMode="numeric"
                              value={contact[f.id] || ''}
                              onChange={(e) => onTelefonoChange(e.target.value)}
                              placeholder={f.ph}
                            />
                            <div className="mgf-hint">
                              {(contact.telefono || '').length}/10 dígitos — código de área + número, sin 0 ni 15 (ej: 1123456789)
                            </div>
                          </>
                        ) : f.type === 'text' ? (
                          <input
                            className="mgf-input"
                            value={contact[f.id] || ''}
                            onChange={(e) => setContact((prev) => ({ ...prev, [f.id]: e.target.value }))}
                            placeholder={f.ph}
                          />
                        ) : (
                          f.o!.map((o) => (
                            <RadioRow key={o} opt={o} selected={contact[f.id] === o} onClick={() => setContact((prev) => ({ ...prev, [f.id]: o }))} />
                          ))
                        )}
                      </div>
                    ))}
                  </>
                )}

                {step === 4 && (
                  <>
                    <div style={{ fontSize: 15.5, fontWeight: 500, marginBottom: 6, color: 'var(--ink, #1e293b)' }}>Revisá tu consulta</div>
                    <div style={{ fontSize: 13, color: '#64748b', marginBottom: 18 }}>Si está todo bien, enviá la consulta y el estudio te contactará.</div>
                    <div style={{ background: 'var(--gray-50)', border: '1px solid var(--border)', borderRadius: 12, padding: '8px 16px' }}>
                      <SummaryRow label="Tema" value={area && areas[area] ? areas[area].label : '-'} strong />
                      {area &&
                        areas[area].q.map((q) => {
                          let v = answers[q.id];
                          if (Array.isArray(v)) v = v.join(', ');
                          return v ? <SummaryRow key={q.id} label={q.t} value={v as string} /> : null;
                        })}
                      {detalle ? <SummaryRow label="Detalle" value={detalle} /> : null}
                      {contactFields.map((f) => (contact[f.id] ? <SummaryRow key={f.id} label={f.t} value={contact[f.id]} strong /> : null))}
                    </div>
                    {errorEnvio && (
                      <div style={{ marginTop: 14, padding: '11px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, fontSize: 13, color: '#b91c1c' }}>
                        Hubo un problema al enviar la consulta. Revisá tu conexión y volvé a intentar.
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              {step !== 1 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '18px 26px', borderTop: '1px solid var(--border)', background: 'var(--gray-50)' }}>
                  <button type="button" onClick={goBack} className="mgf-back" disabled={enviando}>
                    Atrás
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={enviando}
                    className={shake ? 'mgf-next mgf-shake' : 'mgf-next'}
                    style={{ background: 'var(--navy)' }}
                  >
                    {step === 4 ? (
                      enviando ? 'Enviando…' : <>Enviar consulta <Icon name="arrow" size={16} /></>
                    ) : (
                      <>Continuar <Icon name="arrow" size={16} /></>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ color: '#64748b', fontSize: 13 }}>{label}</span>
      <span style={{ fontSize: 13, color: 'var(--ink, #1e293b)', textAlign: 'right', fontWeight: strong ? 500 : 400 }}>{value}</span>
    </div>
  );
}

export default function ConsultaPage() {
  return (
    <Suspense fallback={null}>
      <ConsultaInner />
    </Suspense>
  );
}