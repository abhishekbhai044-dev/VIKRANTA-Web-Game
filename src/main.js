const root = document.querySelector('#root')

root.innerHTML = `
  <main class="shell">
    <section class="hero" aria-labelledby="title">
      <p class="eyebrow">PROJECT GARUDA · WEB GAME</p>
      <h1 id="title">VIKRANTA</h1>
      <p class="tagline">Valor is the Root of Victory.</p>
      <p class="status">Web foundation online. Backend integration follows the server-authoritative architecture.</p>
    </section>
  </main>
`

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
  .status { max-width: 620px; margin: 0; line-height: 1.7; opacity: .72; }
  @media (max-width: 600px) { .hero { padding: 32px 24px; } }
`

document.head.append(style)
