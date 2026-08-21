import { supabaseConfigured } from './lib/supabase.js'
import { getSession, bootstrapPlayer, savePlayerState, signInWithPassword, signUp, signOut, subscribeToAuth } from './lib/player-api.js'

const root = document.querySelector('#root')

root.innerHTML = `
  <main class="shell">
    <section class="hero" aria-labelledby="title">
      <p class="eyebrow">PROJECT GARUDA · WEB GAME</p>
      <h1 id="title">VIKRANTA</h1>
      <p class="tagline">Valor is the Root of Victory.</p>
      <p id="status" class="status">Checking backend configuration…</p>
      <div id="player" class="player" hidden></div>
      <form id="auth" class="auth" hidden>
        <input id="email" type="email" autocomplete="email" placeholder="Email" required />
        <input id="password" type="password" autocomplete="current-password" placeholder="Password" minlength="6" required />
        <input id="displayName" type="text" autocomplete="nickname" placeholder="Display name (for new account)" />
        <div class="actions">
          <button type="submit" data-mode="signin">Sign in</button>
          <button type="button" id="signup">Create account</button>
        </div>
      </form>
      <button id="logout" hidden>Sign out</button>
    </section>
  </main>
`

const status = document.querySelector('#status')
const player = document.querySelector('#player')
const auth = document.querySelector('#auth')
const logout = document.querySelector('#logout')
const signupButton = document.querySelector('#signup')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const displayName = document.querySelector('#displayName')

function setStatus(message) {
  status.textContent = message
}

function renderPlayer(data) {
  player.hidden = false
  player.innerHTML = `
    <strong>Cloud save connected</strong>
    <span>Level ${data.playerState?.level ?? 1} · XP ${data.playerState?.xp ?? 0} · Gold ${data.playerState?.gold ?? 0}</span>
    <span>Save version ${data.playerState?.save_version ?? 1}</span>
  `
  auth.hidden = true
  logout.hidden = false
}

async function loadPlayer() {
  try {
    const session = await getSession()
    if (!session) {
      auth.hidden = false
      logout.hidden = true
      setStatus('Backend connected. Sign in or create your VIKRANTA account.')
      return
    }
    const data = await bootstrapPlayer()
    renderPlayer(data)
    setStatus(`Welcome back. Cloud player state loaded for ${session.user.email}.`)
  } catch (error) {
    setStatus(error.message || 'Unable to connect to the VIKRANTA backend.')
  }
}

auth.addEventListener('submit', async (event) => {
  event.preventDefault()
  try {
    await signInWithPassword(email.value.trim(), password.value)
    await loadPlayer()
  } catch (error) {
    setStatus(error.message || 'Sign-in failed.')
  }
})

signupButton.addEventListener('click', async () => {
  try {
    const data = await signUp(email.value.trim(), password.value, displayName.value.trim())
    setStatus(data.session ? 'Account created. Loading player…' : 'Account created. Check your email if confirmation is required.')
    if (data.session) await loadPlayer()
  } catch (error) {
    setStatus(error.message || 'Account creation failed.')
  }
})

logout.addEventListener('click', async () => {
  try {
    await signOut()
    player.hidden = true
    logout.hidden = true
    auth.hidden = false
    setStatus('Signed out. Your cloud save remains stored securely.')
  } catch (error) {
    setStatus(error.message || 'Sign-out failed.')
  }
})

if (!supabaseConfigured) {
  setStatus('Web foundation is online. Backend connection requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the deployment environment.')
  auth.hidden = true
} else {
  subscribeToAuth((_event, session) => {
    if (session) loadPlayer()
  })
  loadPlayer()
}

const style = document.createElement('style')
style.textContent = `
  :root { font-family: Inter, system-ui, sans-serif; color: #f4f1ea; background: #090b10; }
  * { box-sizing: border-box; }
  body { margin: 0; min-width: 320px; min-height: 100vh; }
  .shell { min-height: 100vh; display: grid; place-items: center; padding: 32px; }
  .hero { width: min(760px, 100%); padding: 48px; border: 1px solid #2b303b; border-radius: 24px; background: #11151d; box-shadow: 0 24px 80px rgba(0,0,0,.35); }
  .eyebrow { margin: 0 0 16px; font-size: 12px; letter-spacing: .18em; opacity: .7; }
  h1 { margin: 0; font-size: clamp(48px, 12vw, 108px); line-height: .9; letter-spacing: -.04em; }
  .tagline { font-size: clamp(20px, 4vw, 32px); margin: 24px 0 12px; }
  .status { max-width: 620px; margin: 0 0 24px; line-height: 1.7; opacity: .72; }
  .auth { display: grid; gap: 12px; max-width: 460px; }
  input, button { font: inherit; border-radius: 10px; padding: 12px 14px; }
  input { border: 1px solid #343a46; background: #0c0f15; color: inherit; }
  button { border: 1px solid #454c59; background: #e9e2d0; color: #11151d; cursor: pointer; }
  .actions { display: flex; gap: 10px; flex-wrap: wrap; }
  .player { display: grid; gap: 6px; padding: 18px; margin-bottom: 16px; border: 1px solid #343a46; border-radius: 14px; background: #0c0f15; }
  .player span { opacity: .72; }
  @media (max-width: 600px) { .hero { padding: 32px 24px; } }
`
document.head.append(style)
