export default function AdminPage() {
  return (
    <main style={{ padding: 40, fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: 24, color: '#0f2747' }}>Panel admin — prueba</h1>
      <p style={{ color: '#64748b' }}>Si ves esto, la protección funcionó: estás logueado. ✅</p>
      <form action="/api/admin/logout" method="post" style={{ marginTop: 20 }}>
        <button type="submit" style={{ padding: '10px 18px', background: '#0f2747', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          Cerrar sesión
        </button>
      </form>
    </main>
  );
}