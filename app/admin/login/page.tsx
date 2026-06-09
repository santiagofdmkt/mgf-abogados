'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const entrar = async () => {
    if (!password) return;
    setCargando(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Contraseña incorrecta');
      }
    } catch {
      setError('Error de conexión. Probá de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, var(--navy, #0f2747) 0%, var(--navy-light, #16345f) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'var(--font-inter, Inter, sans-serif)',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: '40px 34px',
          width: '100%',
          maxWidth: 380,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
            fontSize: 24,
            fontWeight: 600,
            color: 'var(--navy, #0f2747)',
            marginBottom: 6,
            textAlign: 'center',
          }}
        >
          MGF Abogados
        </div>
        <div style={{ fontSize: 13, color: '#64748b', textAlign: 'center', marginBottom: 28 }}>
          Panel de administración
        </div>

        <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#1e293b', marginBottom: 8 }}>
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') entrar(); }}
          placeholder="Ingresá la contraseña"
          autoFocus
          style={{
            width: '100%',
            fontSize: 14,
            padding: '12px 13px',
            border: '1.5px solid #e2e8f0',
            borderRadius: 10,
            boxSizing: 'border-box',
            outline: 'none',
            marginBottom: 16,
          }}
        />

        {error && (
          <div style={{ fontSize: 13, color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '9px 12px', marginBottom: 16 }}>
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={entrar}
          disabled={cargando}
          style={{
            width: '100%',
            background: 'var(--navy, #0f2747)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            padding: '13px',
            border: 'none',
            borderRadius: 10,
            cursor: cargando ? 'default' : 'pointer',
            opacity: cargando ? 0.7 : 1,
          }}
        >
          {cargando ? 'Entrando…' : 'Entrar'}
        </button>
      </div>
    </main>
  );
}