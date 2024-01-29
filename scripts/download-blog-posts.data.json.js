const fs = require("fs")
const fetch = require("node-fetch")

const isMainnet = process.env.REACT_APP_SCROLL_ENVIRONMENT === "Mainnet"
const POSTS_URL = `https://misc-pages-ghost-relay.vercel.app/api/posts/${isMainnet ? "published" : "preview"}/data.json`

async function fetchPosts() {
  await fetch(POSTS_URL)
    .then(res => res.json())
    .then(json => fs.writeFileSync("./src/pages/blog/data.json", JSON.stringify(json, null, 2)))
}

fetchPosts()
