const fs = require("fs")
const fetch = require("node-fetch")

const isMainnet = process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Mainnet"
const POSTS_URL = `https://blog.scroll.cat/api/posts/${isMainnet ? "published" : "preview"}/data.json`

async function fetchPosts() {
  await fetch(POSTS_URL, { headers: { Origin: "https://scroll.io" } })
    .then(res => res.json())
    .then(json => fs.writeFileSync("./src/app/blog/[blogId]/data.json", JSON.stringify(json, null, 2)))
}

fetchPosts()
