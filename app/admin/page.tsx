import { supabaseAdmin } from '@/lib/supabaseAdmin';
import PanelClient from './PanelClient';

export const dynamic = 'force-dynamic'; // siempre datos frescos, no cachear

export type Consulta = {
  id: string;
  creado_en: string;
  nombre: string;
  telefono: string | null;
  email: string | null;
  area: string | null;
  mensaje: string | null;
  estado: string;
  prioridad: string;
};

export default async function AdminPage() {
  const { data, error } = await supabaseAdmin
    .from('consultas')
    .select('*')
    .order('creado_en', { ascending: false });

  if (error) {
    return (
      <main style={{ padding: 40, fontFamily: 'Inter, sans-serif' }}>
        <h1 style={{ color: '#b91c1c' }}>Error al cargar las consultas</h1>
        <p style={{ color: '#64748b' }}>{error.message}</p>
      </main>
    );
  }

  return <PanelClient consultas={(data as Consulta[]) || []} />;
}