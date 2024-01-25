const fs = require("fs")
const { SitemapStream, streamToPromise } = require("sitemap")
const { Readable } = require("stream")

const links = JSON.parse(fs.readFileSync("sitemap.json", "utf8"))

// Create a stream to write to
const stream = new SitemapStream({ hostname: "https://scroll.io" })

// Return a promise that resolves with your XML string
streamToPromise(Readable.from(links).pipe(stream))
  .then(data => fs.writeFileSync("../public/sitemap.xml", data))
  .catch(error => console.error("Error generating sitemap:", error))
