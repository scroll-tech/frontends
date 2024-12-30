import fs from "node:fs"
import fetch from "node-fetch"
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

async function fetchPosts() {
  await Promise.all([
    fetch(buildPostURL("scroll.io"))
      .then(res => res.json())
      .then(json => fs.writeFileSync("./src/assets/blog/main.data.json", JSON.stringify(json, null, 2))),
    fetch(buildPostURL("research.scroll.io"))
      .then(res => res.json())
      .then(json => fs.writeFileSync("./src/assets/blog/research.data.json", JSON.stringify(json, null, 2))),
  ])
}

fetchPosts()
