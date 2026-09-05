"use client"

import dynamic from "next/dynamic"

// WebGL + CSS3D; must not render on the server. Server components import this wrapper
// instead of calling next/dynamic themselves.
const ModelGlobeLazy = dynamic(() => import("./index"), { ssr: false })

export default ModelGlobeLazy
