'use client';

import { useState } from 'react';
import Link from 'next/link';

type Item = { label: string; monto: number };
type Resultado = {
  items: Item[];
  total: number;
  enPrueba: boolean;
  antiguedadTexto: string;
  warnings: string[];
};

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(Math.round(n));

const tipoLabel: Record<string, string> = {
  sin_causa: 'Despido sin causa',
  con_causa: 'Despido con causa',
  renuncia: 'Renuncia',
  mutuo_acuerdo: 'Acuerdo de desvinculación',
};

export default function CotizadorClient() {
  const [ingreso, setIngreso] = useState('');
  const [egreso, setEgreso] = useState('');
  const [remuneracion, setRemuneracion] = useState('');
  const [tipo, setTipo] = useState('sin_causa');
  const [preaviso, setPreaviso] = useState('no');
  const [vacGozadas, setVacGozadas] = useState('0');
  const [registrado, setRegistrado] = useState('si');
  const [errores, setErrores] = useState('');
  const [resultado, setResultado] = useState<Resultado | null>(null);

  // Lead
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [errorLead, setErrorLead] = useState('');

  const calcular = () => {
    setErrores('');
    setEnviado(false);
    if (!ingreso || !egreso || !remuneracion) {
      setErrores('Completá fecha de ingreso, fecha de egreso y tu mejor remuneración.');
      return;
    }
    const ini = new Date(ingreso + 'T00:00:00');
    const fin = new Date(egreso + 'T00:00:00');
    const rem = parseFloat(remuneracion);
    if (isNaN(rem) || rem <= 0) {
      setErrores('Ingresá una remuneración válida.');
      return;
    }
    if (fin <= ini) {
      setErrores('La fecha de egreso debe ser posterior a la de ingreso.');
      return;
    }

    const MS = 86400000;
    const dias = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / MS);

    // Antigüedad
    let anios = fin.getFullYear() - ini.getFullYear();
    let meses = fin.getMonth() - ini.getMonth();
    let d = fin.getDate() - ini.getDate();
    if (d < 0) {
      meses -= 1;
      d += new Date(fin.getFullYear(), fin.getMonth(), 0).getDate();
    }
    if (meses < 0) {
      anios -= 1;
      meses += 12;
    }
    const aniosCompletos = Math.max(0, anios);
    const mesesAntig = aniosCompletos * 12 + meses;
    const enPrueba = mesesAntig < 6;
    const fraccion = meses + d / 30;
    const aniosComputables = aniosCompletos + (fraccion > 3 ? 1 : 0);

    const vacGoz = parseFloat(vacGozadas) || 0;
    const anio = fin.getFullYear();
    const mes = fin.getMonth();
    const diaEgreso = fin.getDate();
    const diasMes = new Date(anio, mes + 1, 0).getDate();

    // Liquidación final (siempre)
    const sueldoDiasTrabajados = (rem / diasMes) * diaEgreso;

    // SAC proporcional del semestre
    const semIni = mes < 6 ? new Date(anio, 0, 1) : new Date(anio, 6, 1);
    const semFin = mes < 6 ? new Date(anio, 5, 30) : new Date(anio, 11, 31);
    const inicioSem = ini > semIni ? ini : semIni;
    const diasSem = dias(semIni, semFin) + 1;
    const diasTrabSem = dias(inicioSem, fin) + 1;
    const sacProp = (rem / 2) * (diasTrabSem / diasSem);

    // Vacaciones proporcionales no gozadas
    const diasVac = aniosCompletos < 5 ? 14 : aniosCompletos < 10 ? 21 : aniosCompletos < 20 ? 28 : 35;
    const anioIni = new Date(anio, 0, 1);
    const inicioAnio = ini > anioIni ? ini : anioIni;
    const diasAnioTrab = dias(inicioAnio, fin) + 1;
    const vacProp = diasVac * (diasAnioTrab / 365);
    const diasVacACobrar = Math.max(0, vacProp - vacGoz);
    const vacMonto = (rem / 25) * diasVacACobrar;
    const sacVac = vacMonto / 12;

    const items: Item[] = [];
    const warnings: string[] = [];

    if (tipo === 'sin_causa') {
      if (enPrueba) {
        warnings.push(
          'Según las fechas, la relación está dentro del período de prueba (menos de 6 meses). En ese caso no corresponde indemnización por antigüedad ni preaviso. Aun así te corresponde la liquidación final.'
        );
      } else {
        const computables = Math.max(1, aniosComputables);
        items.push({
          label: `Indemnización por antigüedad (Art. 245) · ${computables} ${computables === 1 ? 'sueldo' : 'sueldos'}`,
          monto: rem * computables,
        });

        if (preaviso === 'no') {
          const mesesPre = aniosCompletos > 5 ? 2 : 1;
          const pre = rem * mesesPre;
          items.push({ label: `Preaviso (${mesesPre} ${mesesPre === 1 ? 'mes' : 'meses'})`, monto: pre });
          items.push({ label: 'SAC sobre preaviso', monto: pre / 12 });
        }

        const diasRestantes = diasMes - diaEgreso;
        if (diasRestantes > 0) {
          const integr = (rem / diasMes) * diasRestantes;
          items.push({ label: `Integración mes de despido (${diasRestantes} días)`, monto: integr });
          items.push({ label: 'SAC sobre integración', monto: integr / 12 });
        }
      }
    } else if (tipo === 'renuncia') {
      warnings.push('En una renuncia no corresponde indemnización por antigüedad, preaviso ni integración. Te mostramos solo la liquidación final.');
    } else if (tipo === 'con_causa') {
      warnings.push('En un despido con causa no corresponde indemnización. Si considerás que la causa es injustificada, podés reclamarla: te conviene consultar con el estudio.');
    } else if (tipo === 'mutuo_acuerdo') {
      warnings.push('En un acuerdo de desvinculación (Art. 241) el monto se negocia entre las partes. Te mostramos la liquidación final como referencia; consultá para definir una propuesta.');
    }

    // Liquidación final (siempre)
    items.push({ label: `Días trabajados del mes (${diaEgreso} días)`, monto: sueldoDiasTrabajados });
    items.push({ label: 'SAC proporcional (aguinaldo)', monto: sacProp });
    if (diasVacACobrar > 0) {
      items.push({ label: `Vacaciones no gozadas (${diasVacACobrar.toFixed(1)} días)`, monto: vacMonto });
      items.push({ label: 'SAC sobre vacaciones', monto: sacVac });
    }

    if (registrado === 'no') {
      warnings.push(
        'Marcaste que no estabas registrado o estabas mal registrado. En ese caso pueden corresponder agravantes y multas que aumentan bastante el monto. Este cálculo NO los incluye: tu indemnización real podría ser mayor. Conviene que un abogado revise tu caso.'
      );
    }

    const total = items.reduce((a, i) => a + i.monto, 0);
    const antiguedadTexto =
      `${aniosCompletos} ${aniosCompletos === 1 ? 'año' : 'años'}` +
      (meses > 0 ? ` y ${meses} ${meses === 1 ? 'mes' : 'meses'}` : '');

    setResultado({ items, total, enPrueba: tipo === 'sin_causa' && enPrueba, antiguedadTexto, warnings });
  };

  const enviarLead = async () => {
    if (!nombre || (!telefono && !email)) {
      setErrorLead('Dejanos tu nombre y al menos un teléfono o email.');
      return;
    }
    setEnviando(true);
    setErrorLead('');
    const resumen = resultado
      ? `Cotización orientativa de indemnización.\n` +
        `Ingreso: ${ingreso} · Egreso: ${egreso} · Antigüedad: ${resultado.antiguedadTexto}.\n` +
        `Mejor remuneración: ${fmt(parseFloat(remuneracion))}.\n` +
        `Tipo: ${tipoLabel[tipo]} · Preaviso: ${preaviso === 'si' ? 'sí' : 'no'} · Registrado: ${registrado === 'si' ? 'sí' : 'no'}.\n` +
        `Total estimado: ${fmt(resultado.total)}.\n(Solicita asesoramiento para confirmar el monto.)`
      : 'Solicita asesoramiento por indemnización (cotizador).';
    try {
      const res = await fetch('/api/consulta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, telefono, email, area: 'despidos', mensaje: resumen }),
      });
      if (!res.ok) throw new Error();
      setEnviado(true);
    } catch {
      setErrorLead('No se pudo enviar. Probá de nuevo o escribinos por WhatsApp.');
      setEnviando(false);
    }
  };

  return (
    <section style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px 70px' }}>
      {/* Formulario */}
      <div style={card}>
        <h2 style={tituloCard}>Tus datos</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <div>
            <Lbl>Fecha de ingreso</Lbl>
            <input type="date" value={ingreso} onChange={(e) => setIngreso(e.target.value)} style={input} />
          </div>
          <div>
            <Lbl>Fecha de egreso</Lbl>
            <input type="date" value={egreso} onChange={(e) => setEgreso(e.target.value)} style={input} />
          </div>
          <div>
            <Lbl>Mejor remuneración bruta mensual</Lbl>
            <input
              type="number"
              inputMode="numeric"
              placeholder="Ej: 1200000"
              value={remuneracion}
              onChange={(e) => setRemuneracion(e.target.value)}
              style={input}
            />
          </div>
          <div>
            <Lbl>Tipo de desvinculación</Lbl>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={input}>
              <option value="sin_causa">Despido sin causa</option>
              <option value="con_causa">Despido con causa</option>
              <option value="renuncia">Renuncia</option>
              <option value="mutuo_acuerdo">Acuerdo de desvinculación</option>
            </select>
          </div>
          <div>
            <Lbl>¿Te dieron preaviso?</Lbl>
            <Toggle valor={preaviso} setValor={setPreaviso} opciones={[{ v: 'si', t: 'Sí' }, { v: 'no', t: 'No' }]} />
          </div>
          <div>
            <Lbl>Días de vacaciones ya tomados este año</Lbl>
            <input
              type="number"
              inputMode="numeric"
              value={vacGozadas}
              onChange={(e) => setVacGozadas(e.target.value)}
              style={input}
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <Lbl>¿Estabas registrado correctamente (en blanco)?</Lbl>
            <Toggle valor={registrado} setValor={setRegistrado} opciones={[{ v: 'si', t: 'Sí' }, { v: 'no', t: 'No / no estoy seguro' }]} />
          </div>
        </div>

        {errores && <div style={{ color: '#b91c1c', fontSize: 13.5, marginTop: 14 }}>{errores}</div>}

        <button onClick={calcular} style={btnPrimario}>Calcular indemnización</button>
      </div>

      {/* Resultado */}
      {resultado && (
        <div style={{ ...card, marginTop: 20 }}>
          <h2 style={tituloCard}>Estimación</h2>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
            Antigüedad calculada: <strong style={{ color: '#0f2747' }}>{resultado.antiguedadTexto}</strong>
          </div>

          {resultado.items.map((it, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
                padding: '11px 0',
                borderBottom: '1px solid #f1f5f9',
                fontSize: 14,
              }}
            >
              <span style={{ color: '#475569' }}>{it.label}</span>
              <span style={{ color: '#0f2747', fontWeight: 600, whiteSpace: 'nowrap' }}>{fmt(it.monto)}</span>
            </div>
          ))}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 18,
              padding: '16px 18px',
              background: '#0f2747',
              borderRadius: 12,
              color: '#fff',
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600 }}>Total estimado</span>
            <span style={{ fontSize: 24, fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>{fmt(resultado.total)}</span>
          </div>

          {resultado.warnings.map((w, i) => (
            <div
              key={i}
              style={{
                marginTop: 14,
                background: '#fef3c7',
                border: '1px solid #fcd34d',
                borderRadius: 10,
                padding: '12px 14px',
                fontSize: 13,
                color: '#92400e',
                lineHeight: 1.5,
              }}
            >
              {w}
            </div>
          ))}

          <div style={{ marginTop: 16, fontSize: 12, color: '#94a3b8', lineHeight: 1.55 }}>
            Esta es una <strong>estimación orientativa</strong> calculada según la Ley de Contrato de Trabajo (Ley 20.744) y sus
            reformas vigentes. No contempla el tope por convenio colectivo, agravantes ni particularidades de tu caso, y no constituye
            asesoramiento legal. El monto definitivo puede variar.
          </div>
        </div>
      )}

      {/* Lead */}
      {resultado && (
        <div style={{ ...card, marginTop: 20 }}>
          {enviado ? (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#0f2747', fontFamily: '"Playfair Display", serif', marginBottom: 8 }}>
                ¡Listo! Recibimos tu consulta
              </div>
              <div style={{ fontSize: 14, color: '#475569' }}>
                Un abogado del estudio se va a contactar con vos para revisar tu caso y confirmar el monto.
              </div>
            </div>
          ) : (
            <>
              <h2 style={tituloCard}>¿Querés el cálculo exacto?</h2>
              <p style={{ fontSize: 14, color: '#475569', marginTop: -6, marginBottom: 18, lineHeight: 1.55 }}>
                Dejanos tus datos y un abogado revisa tu caso sin cargo. Te decimos cuánto te corresponde realmente.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                <div>
                  <Lbl>Nombre</Lbl>
                  <input value={nombre} onChange={(e) => setNombre(e.target.value)} style={input} />
                </div>
                <div>
                  <Lbl>Teléfono / WhatsApp</Lbl>
                  <input value={telefono} onChange={(e) => setTelefono(e.target.value)} style={input} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <Lbl>Email</Lbl>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
                </div>
              </div>
              {errorLead && <div style={{ color: '#b91c1c', fontSize: 13.5, marginTop: 14 }}>{errorLead}</div>}
              <button onClick={enviarLead} disabled={enviando} style={{ ...btnPrimario, opacity: enviando ? 0.7 : 1 }}>
                {enviando ? 'Enviando…' : 'Quiero que revisen mi caso'}
              </button>
            </>
          )}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Link href="/" style={{ fontSize: 13.5, color: '#64748b', textDecoration: 'none' }}>← Volver al inicio</Link>
      </div>
    </section>
  );
}

function Toggle({ valor, setValor, opciones }: { valor: string; setValor: (v: string) => void; opciones: { v: string; t: string }[] }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {opciones.map((o) => {
        const activo = o.v === valor;
        return (
          <button
            key={o.v}
            onClick={() => setValor(o.v)}
            style={{
              flex: 1,
              padding: '10px 8px',
              borderRadius: 9,
              border: `1px solid ${activo ? '#0f2747' : '#cbd5e1'}`,
              background: activo ? '#0f2747' : '#fff',
              color: activo ? '#fff' : '#475569',
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {o.t}
          </button>
        );
      })}
    </div>
  );
}

function Lbl({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11.5, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 7 }}>
      {children}
    </div>
  );
}

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: 16,
  padding: 24,
  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
};

const tituloCard: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  color: '#0f2747',
  fontFamily: '"Playfair Display", serif',
  margin: '0 0 18px',
};

const input: React.CSSProperties = {
  width: '100%',
  padding: '11px 13px',
  border: '1px solid #cbd5e1',
  borderRadius: 9,
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  background: '#fff',
};

const btnPrimario: React.CSSProperties = {
  width: '100%',
  marginTop: 20,
  background: '#0f2747',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '14px',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
};