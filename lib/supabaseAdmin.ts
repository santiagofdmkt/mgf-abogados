import { createClient } from '@supabase/supabase-js'

// Cliente de Supabase SOLO para el servidor.
// Usa la clave secreta (bypassa RLS). NUNCA importar esto en componentes del cliente.
const supabaseUrl = process.env.SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseSecretKey) {
  throw new Error('Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en las variables de entorno')
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey, {
  auth: { persistSession: false },
})