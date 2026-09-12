// Builds public/landing.html — the site's front page — from Glen's design file.
//
// design/landing.html is his file, byte for byte; nothing in it is edited by hand. This
// script fills in what his prototype leaves as placeholders (the legal links, the white
// paper, the waitlist endpoint) and adds what a real page needs in <head> (description,
// Open Graph, icons, analytics). next.config.mjs rewrites "/" to the output before any
// app route is considered. Runs from `predev` and `prebuild`; the output is not committed.
//
// When Glen sends a new version: replace design/landing.html, run `yarn build:landing`,
// and this script will fail loudly if one of its anchors no longer matches his markup.
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const source = path.join(root, "design", "landing.html")
const output = path.join(root, "public", "landing.html")

let html = fs.readFileSync(source, "utf8")

const once = (label, from, to) => {
  const n = html.split(from).length - 1
  if (n !== 1) throw new Error(`[landing] ${label}: expected exactly one match, found ${n}:\n  ${from}`)
  html = html.replace(from, to)
}

const link = fs.readFileSync(path.join(root, "src", "constants", "link.ts"), "utf8")
const constant = name => {
  const m = link.match(new RegExp(`export const ${name} = "([^"]+)"`))
  if (!m) throw new Error(`[landing] ${name} not found in src/constants/link.ts`)
  return m[1]
}

// ---- links his prototype leaves as "#" or guesses -------------------------------------
once("privacy policy link", '<a href="#">Privacy policy</a>', '<a href="/privacy-policy">Privacy policy</a>')
once("app privacy policy link", '<a href="#">App privacy policy</a>', '<a href="/app-privacy-policy">App privacy policy</a>')
once("terms link", '<a href="#">Terms of service</a>', '<a href="/terms-of-service">Terms of service</a>')
once("white paper link", 'href="/scroll-whitepaper.pdf"', 'href="/files/whitepaper.pdf"')

// ---- the Compass button on the Compass API panel: his file points it at his own Compass
// prototype (index.html, 2026-09-11); here it opens the Compass site ----
const compassUrl = constant("COMPASS_API_URL")
once(
  "compass api → compass site",
  '<a class="btn" href="index.html" data-roll>Compass</a>',
  `<a class="btn" href="${compassUrl}" target="_blank" rel="noopener" data-roll>Compass</a>`,
)

// ---- the connect chain on the Compass API panel: the shadow under its cards was clipped
// (Glen's screenshot, 2026-09-11 21:25). Cause: the iframe's demo <body> has min-height:100vh
// plus 24px padding with the default content-box sizing, so it is 48px taller and wider than
// the iframe and the centred SVG sits 24px too far down and right. border-box keeps the body
// the size of the iframe; the 24px padding then gives the drop-shadow its room. His viewBox
// and the graphic's scale are untouched. The strings are HTML-escaped (srcdoc attribute). ----
once(
  "connect chain body sizing",
  "body {\n    margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px;\n    background: transparent;   /* the component paints no background of its own */\n    font-family: ui-sans-serif, -apple-system, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif;\n  }",
  "body {\n    margin: 0; min-height: 100vh; box-sizing: border-box; display: grid; place-items: center; padding: 24px;\n    background: transparent;   /* the component paints no background of its own */\n    font-family: ui-sans-serif, -apple-system, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif;\n  }",
)

// ---- the product titles in the rail and the panel heads: Zhengqi 2026-09-12 asked for
// "Compass API" and "AI Hardware" in bold — next to the active, ink-coloured "Compass" the
// two faint serif names read thin. Instrument Serif has no bold cut, and the browser's
// synthetic bold smears it, so this thickens the letters the way his own file does for
// .display and .section-title: a hairline stroke in the text colour. 0.7px at 22–24px is
// the semibold weight (0.5 barely showed, 0.9 went clumsy); all three names get it so the
// rail stays one voice, the panel heads on phones likewise. ----
once(
  "rail names heavier",
  ".rail__name{\n  font-family:var(--serif);font-size:1.375rem;font-weight:400;",
  ".rail__name{\n  font-family:var(--serif);font-size:1.375rem;font-weight:400;-webkit-text-stroke:.7px currentColor;",
)
once(
  "panel names heavier",
  ".panel__name{font-family:var(--serif);font-size:1.5rem;font-weight:400}",
  ".panel__name{font-family:var(--serif);font-size:1.5rem;font-weight:400;-webkit-text-stroke:.7px currentColor}",
)

// ---- the waitlist form: his submitEmail only pretends; this posts to Loops ------------
const formId = constant("LOOPS_FORM_ID")
const listId = constant("LOOPS_MAILING_LIST_ID")

const fnStart = html.indexOf("function submitEmail(){")
const fnEnd = html.indexOf("\n}\n", fnStart)
if (fnStart < 0 || fnEnd < 0) throw new Error("[landing] submitEmail() not found")
const submit = `async function submitEmail(){
  // filled in by scripts/build-landing.mjs: the same Loops form the /sign-up card posts to
  const email = emailIn.value.trim();
  const ok = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(email);
  if (!ok){ emailErr.textContent = 'Enter a valid email address.'; emailErr.hidden = false; emailIn.focus(); return; }
  emailErr.hidden = true;
  if (joinBtn.dataset.busy) return;
  joinBtn.dataset.busy = '1';
  try {
    const res = await fetch('https://app.loops.so/api/newsletter-form/${formId}', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: ['email=' + encodeURIComponent(email), 'userGroup=' + encodeURIComponent('Compass Waitlist'), 'mailingLists=' + encodeURIComponent('${listId}')].join('&'),
    });
    const data = res.status === 429 ? { success: false, message: 'Too many attempts \\u2014 please try again in a minute.' } : await res.json();
    if (!data.success){ emailErr.textContent = data.message || 'Something went wrong \\u2014 please try again.'; emailErr.hidden = false; return; }
    joinBtn.hidden = true;
    emailIn.closest('.field').hidden = true;
    joinDone.hidden = false;
  } catch (e) {
    emailErr.textContent = 'Network error \\u2014 please try again.'; emailErr.hidden = false;
  } finally {
    delete joinBtn.dataset.busy;
  }
}`
html = html.slice(0, fnStart) + submit + html.slice(fnEnd + 2)

// ---- <head>: what the Next metadata used to add for "/" ------------------------------
const site = (process.env.NEXT_PUBLIC_FRONTENDS_URL || "https://scroll.io").replace(/\/$/, "")
// his sub-head, read from the file so it follows his copy (Zhengqi 2026-09-11: the old
// "Native zkEVM Layer 2 for Ethereum" no longer describes the page)
const subhead = html.match(/<p class="lede lede--type" id="heroLede">([^<]+)<\/p>/)?.[1]?.trim()
if (!subhead) throw new Error("[landing] hero sub-head not found for the meta description")
const description = subhead.replace(/"/g, "&quot;")
const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "Scroll"
const head = [
  `<meta name="description" content="${description}">`,
  `<link rel="canonical" href="${site}/">`,
  `<meta property="og:type" content="website">`,
  `<meta property="og:site_name" content="Scroll">`,
  `<meta property="og:title" content="${title}">`,
  `<meta property="og:description" content="${description}">`,
  `<meta property="og:url" content="${site}/">`,
  `<meta property="og:image" content="${site}/og_scroll.png">`,
  `<meta name="twitter:card" content="summary_large_image">`,
  `<meta name="twitter:title" content="${title}">`,
  `<meta name="twitter:description" content="${description}">`,
  `<meta name="twitter:image" content="${site}/og_scroll.png">`,
  `<link rel="icon" href="/favicon.ico" sizes="any">`,
  `<link rel="apple-touch-icon" href="/logo.png">`,
  `<link rel="manifest" href="/manifest.json">`,
]
const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
if (process.env.NODE_ENV === "production" && gaId) {
  head.push(
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>`,
    `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');</script>`,
  )
}
if (process.env.VERCEL) head.push(`<script defer src="/_vercel/speed-insights/script.js"></script>`)
once("head", "</head>", `${head.map(l => `  ${l}`).join("\n")}\n</head>`)

// ---- provenance, so nobody edits the output by hand -----------------------------------
html = html.replace(
  /^<!doctype html>\s*/i,
  `<!doctype html>\n<!-- Generated from design/landing.html by scripts/build-landing.mjs — edit those, not this file. -->\n`,
)

fs.writeFileSync(output, html)
console.log(
  `[landing] wrote public/landing.html (${(html.length / 1024).toFixed(0)} KB) from design/landing.html${gaId && process.env.NODE_ENV === "production" ? " with GA" : ""}`,
)
