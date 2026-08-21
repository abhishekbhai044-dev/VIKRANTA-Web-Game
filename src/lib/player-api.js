import { requireSupabase } from './supabase.js'

export async function getSession() {
  const client = requireSupabase()
  const { data, error } = await client.auth.getSession()
  if (error) throw error
  return data.session
}

export async function signInWithPassword(email, password) {
  const client = requireSupabase()
  const { data, error } = await client.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signUp(email, password, displayName = '') {
  const client = requireSupabase()
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } },
  })
  if (error) throw error
  return data
}

export async function signOut() {
  const client = requireSupabase()
  const { error } = await client.auth.signOut()
  if (error) throw error
}

export async function bootstrapPlayer() {
  const client = requireSupabase()
  const { data, error } = await client.functions.invoke('player-bootstrap')
  if (error) throw error
  return data
}

export async function savePlayerState({ expectedSaveVersion, currentZone, state }) {
  const client = requireSupabase()
  const { data, error } = await client.functions.invoke('save-player-state', {
    body: { expectedSaveVersion, currentZone, state },
  })
  if (error) throw error
  return data
}

export function subscribeToAuth(callback) {
  const client = requireSupabase()
  return client.auth.onAuthStateChange(callback)
}
