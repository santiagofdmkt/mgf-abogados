'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import type { Consulta } from './page';

const AREAS: Record<string, string> = {
  'accidentes-trabajo': 'Accidente de trabajo / ART',
  'accidentes-transito': 'Accidente de tránsito',
  'despidos': 'Despido / laboral',
  'propiedad-horizontal': 'Propiedad horizontal',
  'derecho-salud': 'Derecho a la salud',
  'sucesiones': 'Sucesión / herencia',
  'otro': 'Otro / no estoy seguro',
};

const COLUMNAS = [
  { id: 'nuevo', label: 'Nuevo', color: '#1e40af' },
  { id: 'contactado', label: 'Contactado', color: '#92400e' },
  { id: 'en proceso', label: 'En proceso', color: '#3730a3' },
  { id: 'derivado', label: 'Derivado', color: '#475569' },
];

const prioridadInfo: Record<string, { label: string; bg: string; fg: string }> = {
  'alta': { label: 'Alta', bg: '#fee2e2', fg: '#b91c1c' },
  'media': { label: 'Media', bg: '#fef3c7', fg: '#92400e' },
  'baja': { label: 'Baja', bg: '#f1f5f9', fg: '#64748b' },
};

const prioridadPeso: Record<string, number> = { alta: 3, media: 2, baja: 1 };

function fechaCorta(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' }) +
    ' ' + d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
}

function soloDigitos(s: string | null) {
  return (s || '').replace(/\D/g, '');
}

// Detecta viewport mobile. Arranca en false (desktop) para que el render del
// servidor y el primer render del cliente coincidan (sin warnings de hidratación),
// y se ajusta apenas monta + en cada resize.
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [breakpoint]);
  return isMobile;
}

export default function PanelClient({ consultas }: { consultas: Consulta[] }) {
  const router = useRouter();
  const isMobile = useIsMobile();

  const [desde, setDesde] = useState<string>('');
  const [hasta, setHasta] = useState<string>('');
  const [busqueda, setBusqueda] = useState('');
  const [ordenInterno, setOrdenInterno] = useState<'reciente' | 'antiguo' | 'prioridad'>('reciente');

  const [sel, setSel] = useState<Consulta | null>(null);
  // Columna activa en la vista mobile (pestañas)
  const [colActiva, setColActiva] = useState<string>('nuevo');
  // Estado local de las tarjetas para que el arrastre se vea instantáneo
  const [items, setItems] = useState<Consulta[]>(consultas);

  const cerrarSesion = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  const totales = useMemo(() => ({
    total: items.length,
    nuevo: items.filter((c) => c.estado === 'nuevo').length,
    enJuego: items.filter((c) => ['contactado', 'en proceso'].includes(c.estado)).length,
    derivado: items.filter((c) => c.estado === 'derivado').length,
    alta: items.filter((c) => c.prioridad === 'alta').length,
  }), [items]);

  // Aplica filtros (no el estado, porque el estado define la columna)
  const pasaFiltros = (c: Consulta) => {
    if (desde && new Date(c.creado_en) < new Date(desde)) return false;
    if (hasta) {
      const h = new Date(hasta);
      h.setHours(23, 59, 59, 999);
      if (new Date(c.creado_en) > h) return false;
    }
    if (busqueda) {
      const b = busqueda.toLowerCase();
      const txt = `${c.nombre} ${c.telefono || ''} ${c.email || ''}`.toLowerCase();
      if (!txt.includes(b)) return false;
    }
    return true;
  };

  const ordenar = (arr: Consulta[]) => {
    return [...arr].sort((a, b) => {
      if (ordenInterno === 'prioridad') {
        return (prioridadPeso[b.prioridad] || 0) - (prioridadPeso[a.prioridad] || 0);
      }
      const da = new Date(a.creado_en).getTime();
      const db = new Date(b.creado_en).getTime();
      return ordenInterno === 'reciente' ? db - da : da - db;
    });
  };

  // Tarjetas por columna, ya filtradas y ordenadas
  const porColumna = useMemo(() => {
    const map: Record<string, Consulta[]> = {};
    COLUMNAS.forEach((col) => {
      map[col.id] = ordenar(items.filter((c) => c.estado === col.id && pasaFiltros(c)));
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, desde, hasta, busqueda, ordenInterno]);

  const totalVisible = Object.values(porColumna).reduce((acc, arr) => acc + arr.length, 0);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return; // misma columna, no cambia estado

    const nuevoEstado = destination.droppableId;

    // Actualización optimista: muevo la tarjeta en pantalla ya
    setItems((prev) => prev.map((c) => (c.id === draggableId ? { ...c, estado: nuevoEstado } : c)));

    // Guardo en la base
    try {
      const res = await fetch(`/api/admin/consultas/${draggableId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // Si falla, revierto y refresco
      setItems(consultas);
      alert('No se pudo mover la consulta. Reintentá.');
    }
  };

  const limpiarFiltros = () => {
    setDesde('');
    setHasta('');
    setBusqueda('');
  };

  const onGuardadoModal = (actualizada: Consulta) => {
    setItems((prev) => prev.map((c) => (c.id === actualizada.id ? actualizada : c)));
    setSel(null);
  };

  const colActivaInfo = COLUMNAS.find((c) => c.id === colActiva) || COLUMNAS[0];

  return (
    <main style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      <div
        style={{
          background: '#0f2747',
          padding: isMobile ? '14px 16px' : '16px 24px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 12 : 0,
          justifyContent: 'space-between',
          alignItems: isMobile ? 'stretch' : 'center',
        }}
      >
        <div style={{ color: '#fff', fontFamily: '"Playfair Display", serif', fontSize: isMobile ? 17 : 20, fontWeight: 600 }}>
          MGF Abogados — Panel
        </div>
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <button onClick={() => window.location.reload()} style={{ ...btnGhost, flex: isMobile ? 1 : undefined }}>↻ Actualizar</button>
          <button onClick={cerrarSesion} style={{ ...btnGhost, flex: isMobile ? 1 : undefined }}>Cerrar sesión</button>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: isMobile ? '16px 14px 48px' : '24px 20px 60px' }}>
        {/* Tarjetas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
          <Tarjeta label="Total" valor={totales.total} color="#0f2747" />
          <Tarjeta label="Nuevas" valor={totales.nuevo} color="#1e40af" />
          <Tarjeta label="En gestión" valor={totales.enJuego} color="#3730a3" />
          <Tarjeta label="Derivadas" valor={totales.derivado} color="#475569" />
        </div>

        {/* Filtros */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 14, marginBottom: 18 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <Lbl>Buscar</Lbl>
              <input placeholder="Nombre, teléfono o email…" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} style={inputStyle} />
            </div>

            <div style={{ flex: isMobile ? '1 1 45%' : undefined }}>
              <Lbl>Desde</Lbl>
              <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} style={{ ...selectStyle, width: isMobile ? '100%' : undefined, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: isMobile ? '1 1 45%' : undefined }}>
              <Lbl>Hasta</Lbl>
              <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} style={{ ...selectStyle, width: isMobile ? '100%' : undefined, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: isMobile ? '1 1 100%' : undefined }}>
              <Lbl>Ordenar por</Lbl>
              <select value={ordenInterno} onChange={(e) => setOrdenInterno(e.target.value as 'reciente' | 'antiguo' | 'prioridad')} style={{ ...selectStyle, width: isMobile ? '100%' : undefined, boxSizing: 'border-box' }}>
                <option value="reciente">Más recientes</option>
                <option value="antiguo">Más antiguas</option>
                <option value="prioridad">Prioridad (alta primero)</option>
              </select>
            </div>
            <button onClick={limpiarFiltros} style={{ ...btnGhost, color: '#64748b', border: '1px solid #cbd5e1', background: '#fff', flex: isMobile ? '1 1 100%' : undefined }}>Limpiar</button>
          </div>
        </div>

        {/* Kanban: en desktop tablero con drag & drop, en mobile pestañas + lista */}
        {!isMobile ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLUMNAS.length}, 1fr)`, gap: 14, alignItems: 'start' }}>
              {COLUMNAS.map((col) => (
                <Droppable droppableId={col.id} key={col.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        background: snapshot.isDraggingOver ? '#eef2ff' : '#eef1f5',
                        borderRadius: 12,
                        padding: 10,
                        minHeight: 200,
                        border: '1px solid #e2e8f0',
                        transition: 'background .15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 6px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ width: 9, height: 9, borderRadius: '50%', background: col.color }} />
                          <span style={{ fontSize: 13.5, fontWeight: 700, color: '#0f2747' }}>{col.label}</span>
                        </div>
                        <span style={{ fontSize: 12, color: '#94a3b8', background: '#fff', borderRadius: 99, padding: '1px 9px', border: '1px solid #e2e8f0' }}>
                          {porColumna[col.id].length}
                        </span>
                      </div>

                      {porColumna[col.id].map((c, index) => (
                        <Draggable draggableId={c.id} index={index} key={c.id}>
                          {(prov, snap) => (
                            <div
                              ref={prov.innerRef}
                              {...prov.draggableProps}
                              {...prov.dragHandleProps}
                              onClick={() => setSel(c)}
                              style={{
                                background: '#fff',
                                borderRadius: 10,
                                border: '1px solid #e2e8f0',
                                padding: 12,
                                marginBottom: 9,
                                boxShadow: snap.isDragging ? '0 8px 24px rgba(15,39,71,0.18)' : '0 1px 2px rgba(0,0,0,0.04)',
                                cursor: 'grab',
                                ...prov.draggableProps.style,
                              }}
                            >
                              <CardCuerpo c={c} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {porColumna[col.id].length === 0 && (
                        <div style={{ fontSize: 12, color: '#b6bfca', textAlign: 'center', padding: '16px 0' }}>
                          Sin consultas
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        ) : (
          <div>
            {/* Pestañas de estado */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {COLUMNAS.map((col) => {
                const activo = col.id === colActiva;
                return (
                  <button
                    key={col.id}
                    onClick={() => setColActiva(col.id)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      background: activo ? col.color : '#fff',
                      color: activo ? '#fff' : '#0f2747',
                      border: `1px solid ${activo ? col.color : '#e2e8f0'}`,
                      borderRadius: 10,
                      padding: '9px 4px',
                      fontSize: 11.5,
                      fontWeight: 700,
                      lineHeight: 1.15,
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{col.label}</span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        background: activo ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                        color: activo ? '#fff' : '#64748b',
                        borderRadius: 99,
                        padding: '0 8px',
                        minWidth: 20,
                      }}
                    >
                      {porColumna[col.id].length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Lista de la columna activa */}
            {porColumna[colActiva].length === 0 ? (
              <div style={{ background: '#eef1f5', border: '1px solid #e2e8f0', borderRadius: 12, padding: '30px 0', textAlign: 'center', fontSize: 13, color: '#94a3b8' }}>
                No hay consultas en «{colActivaInfo.label}».
              </div>
            ) : (
              porColumna[colActiva].map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSel(c)}
                  style={{
                    background: '#fff',
                    borderRadius: 12,
                    border: '1px solid #e2e8f0',
                    padding: 14,
                    marginBottom: 10,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                  }}
                >
                  <CardCuerpo c={c} />
                </div>
              ))
            )}
          </div>
        )}

        <div style={{ marginTop: 14, fontSize: 12.5, color: '#94a3b8' }}>
          Mostrando {totalVisible} de {items.length} consultas. {isMobile ? 'Tocá una consulta para ver el detalle y cambiar su estado.' : 'Arrastrá una tarjeta entre columnas para cambiar su estado.'}
        </div>
      </div>

      {sel && <ModalDetalle consulta={sel} onClose={() => setSel(null)} onSaved={onGuardadoModal} />}
    </main>
  );
}

function CardCuerpo({ c }: { c: Consulta }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6, minWidth: 0 }}>
        <strong style={{ color: '#0f2747', fontSize: 13.5, minWidth: 0, overflowWrap: 'anywhere' }}>{c.nombre}</strong>
        <PrioridadBadge prioridad={c.prioridad} />
      </div>
      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4, overflowWrap: 'anywhere' }}>
        {c.area ? (AREAS[c.area] || c.area) : 'Sin área'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6, flexWrap: 'wrap', fontSize: 11.5, color: '#94a3b8' }}>
        <span style={{ overflowWrap: 'anywhere' }}>{c.telefono || '—'}</span>
        <span>{fechaCorta(c.creado_en)}</span>
      </div>
    </>
  );
}

function ModalDetalle({ consulta, onClose, onSaved }: { consulta: Consulta; onClose: () => void; onSaved: (c: Consulta) => void }) {
  const [estado, setEstado] = useState(consulta.estado);
  const [prioridad, setPrioridad] = useState(consulta.prioridad);
  const [nota, setNota] = useState(consulta.nota || '');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  const tel = soloDigitos(consulta.telefono);

  const guardar = async () => {
    setGuardando(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/consultas/${consulta.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado, prioridad, nota }),
      });
      if (!res.ok) throw new Error();
      onSaved({ ...consulta, estado, prioridad, nota });
    } catch {
      setError('No se pudo guardar. Probá de nuevo.');
      setGuardando(false);
    }
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,39,71,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 1000 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}>
        <div style={{ background: 'linear-gradient(135deg, #0f2747, #16345f)', padding: '20px 24px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, fontFamily: '"Playfair Display", serif' }}>{consulta.nombre}</div>
            <div style={{ fontSize: 12.5, color: '#aac3e6', marginTop: 3 }}>{fechaCorta(consulta.creado_en)} · {consulta.area ? (AREAS[consulta.area] || consulta.area) : 'Sin área'}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>

        <div style={{ padding: 24 }}>
          <Seccion titulo="Contacto">
            <Dato label="Teléfono" valor={consulta.telefono || '—'} />
            <Dato label="Email" valor={consulta.email || '—'} />
          </Seccion>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
            {tel && <a href={`https://api.whatsapp.com/send?phone=549${tel}`} target="_blank" rel="noopener noreferrer" style={{ ...btnAccion, background: '#25D366' }}>WhatsApp</a>}
            {tel && <a href={`tel:${consulta.telefono}`} style={{ ...btnAccion, background: '#0f2747' }}>Llamar</a>}
            {consulta.email && <a href={`mailto:${consulta.email}`} style={{ ...btnAccion, background: '#475569' }}>Email</a>}
          </div>

          <Seccion titulo="Detalle de la consulta">
            <div style={{ whiteSpace: 'pre-wrap', fontSize: 13.5, color: '#334155', lineHeight: 1.6, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 14 }}>
              {consulta.mensaje || 'Sin detalle.'}
            </div>
          </Seccion>

          <Seccion titulo="Gestión">
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
              <div style={{ flex: 1, minWidth: 160 }}>
                <Lbl>Estado</Lbl>
                <select value={estado} onChange={(e) => setEstado(e.target.value)} style={{ ...selectStyle, width: '100%', boxSizing: 'border-box' }}>
                  {COLUMNAS.map((col) => <option key={col.id} value={col.id}>{col.label}</option>)}
                </select>
              </div>
              <div style={{ flex: 1, minWidth: 160 }}>
                <Lbl>Prioridad</Lbl>
                <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)} style={{ ...selectStyle, width: '100%', boxSizing: 'border-box' }}>
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>
              </div>
            </div>
            <Lbl>Nota interna</Lbl>
            <textarea value={nota} onChange={(e) => setNota(e.target.value)} rows={3} placeholder="Anotaciones del estudio sobre este caso…"
              style={{ ...inputStyle, resize: 'vertical', minHeight: 70 }} />
          </Seccion>

          {error && <div style={{ fontSize: 13, color: '#b91c1c', marginBottom: 12 }}>{error}</div>}

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button onClick={onClose} style={{ ...btnGhost, color: '#64748b', border: '1px solid #cbd5e1', background: '#fff' }}>Cancelar</button>
            <button onClick={guardar} disabled={guardando} style={{ background: '#0f2747', color: '#fff', border: 'none', borderRadius: 9, padding: '10px 22px', fontSize: 14, fontWeight: 600, cursor: guardando ? 'default' : 'pointer', opacity: guardando ? 0.7 : 1 }}>
              {guardando ? 'Guardando…' : 'Guardar cambios'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const btnGhost: React.CSSProperties = { background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 13px', border: '1px solid #cbd5e1', borderRadius: 9, fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
const selectStyle: React.CSSProperties = { padding: '10px 13px', border: '1px solid #cbd5e1', borderRadius: 9, fontSize: 14, outline: 'none', background: '#fff', cursor: 'pointer' };
const btnAccion: React.CSSProperties = { color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 600, padding: '9px 16px', borderRadius: 8 };

function PrioridadBadge({ prioridad }: { prioridad: string }) {
  const p = prioridadInfo[prioridad] || prioridadInfo['media'];
  return <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 99, background: p.bg, color: p.fg, fontWeight: 600, flexShrink: 0 }}>{p.label}</span>;
}

function Tarjeta({ label, valor, color }: { label: string; valor: number; color: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: '14px 16px' }}>
      <div style={{ fontSize: 24, fontWeight: 700, color }}>{valor}</div>
      <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{label}</div>
    </div>
  );
}

function Lbl({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11.5, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>{children}</div>;
}

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#0f2747', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>{titulo}</div>
      {children}
    </div>
  );
}

function Dato({ label, valor }: { label: string; valor: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #f1f5f9', fontSize: 13.5, gap: 12 }}>
      <span style={{ color: '#64748b', flexShrink: 0 }}>{label}</span>
      <span style={{ color: '#0f2747', fontWeight: 500, overflowWrap: 'anywhere', textAlign: 'right' }}>{valor}</span>
    </div>
  );
}