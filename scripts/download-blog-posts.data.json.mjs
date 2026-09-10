import fetch from "node-fetch"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const blogAssetsDir = path.join(__dirname, "..", "src", "assets", "blog")

if (!fs.existsSync(blogAssetsDir)) {
  fs.mkdirSync(blogAssetsDir, { recursive: true })
}

const isMainnet = process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Mainnet"

function buildPostURL(hostType) {
  return `https://blog.scroll.cat/api/posts/${isMainnet ? "published" : "preview"}/${hostType}/data.json`
}

const mainFile = path.join(blogAssetsDir, "main.data.json")
const researchFile = path.join(blogAssetsDir, "research.data.json")

// the blog service behind these URLs is no longer running (Zhengqi, 2026-09-09). This
// module is imported by next.config.mjs, so a failed fetch used to take `next dev` and
// `next build` down with it — now it keeps whatever data files are already on disk and
// only complains. SKIP_BLOG_FETCH=1 skips the network round-trip entirely.
async function fetchPosts() {
  if (process.env.SKIP_BLOG_FETCH) {
    console.log("[blog] SKIP_BLOG_FETCH set — keeping the existing data files")
    return
  }
  // node-fetch has no timeout of its own. Behind a proxy (Surge / Clash fake-ip) the TCP
  // connection to the dead host opens but the TLS handshake never completes, and `next dev`
  // sat on this line for good (Zhengqi, 2026-09-10). Five seconds is plenty for a JSON file.
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(new Error("timed out after 5s")), 5000)
  try {
    await Promise.all([
      fetch(buildPostURL("scroll.io"), { signal: controller.signal })
        .then(res => res.json())
        .then(json => fs.writeFileSync(mainFile, JSON.stringify(json, null, 2))),
      fetch(buildPostURL("research.scroll.io"), { signal: controller.signal })
        .then(res => res.json())
        .then(json => fs.writeFileSync(researchFile, JSON.stringify(json, null, 2))),
    ])
  } finally {
    clearTimeout(timer)
  }
}

try {
  await fetchPosts()
} catch (error) {
  console.warn(`[blog] could not refresh blog posts (${error.message}); using the files already in src/assets/blog`)
  for (const file of [mainFile, researchFile]) {
    if (!fs.existsSync(file)) fs.writeFileSync(file, "[]")
  }
}
