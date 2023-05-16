import { useIdle } from "react-use"

let LOADED = false
let FETCHING = false

type ManifestFiles = {
  [key: string]: string
}

function loadAllStaticAssets() {
  if (LOADED) return
  if (FETCHING) return
  FETCHING = true
  fetch("/asset-manifest.json")
    .then(res => res.json())
    .then(manifest =>
      Object.values(manifest.files as ManifestFiles).map(url => {
        if (typeof url === "string" && !url.endsWith(".map")) {
          return fetch(url)
        }
        return Promise.resolve()
      }),
    )
    .then(Promise.all)
    .then(() => {
      LOADED = true
      FETCHING = false
    })
    .catch(err => {
      FETCHING = false
      console.warn("failed to fetch all assets in asset-manifest.json", err)
    })
}

const useLoadAllStaticAssetsOnIdle = (ms?: number) => {
  // default to 1 minute
  const isIdle = useIdle(ms || 60e3)

  if (isIdle) loadAllStaticAssets()

  return
}

export default useLoadAllStaticAssetsOnIdle
