import * as THREE from "three"
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js"

import { lon2xyz } from "./countryMesh/math"

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load("/imgs/community/pin.svg")

const geometry = new THREE.PlaneGeometry(1, 1)

function createPointMesh(R: number, lon: number, lat: number): THREE.Mesh {
  const material = new THREE.MeshBasicMaterial({
    color: 0x22ffcc,
    map: texture,
    transparent: true,
    depthWrite: false,
  })

  const mesh = new THREE.Mesh(geometry, material)
  const coord = lon2xyz(R * 1.001, lon, lat)
  const size = R * 0.07
  mesh.scale.set(size, size, size)
  mesh.position.set(coord.x, coord.y + 6, coord.z)

  const coordVec3 = new THREE.Vector3(coord.x, coord.y, coord.z).normalize()
  const meshNormal = new THREE.Vector3(0, 0, 1)
  mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3)

  return mesh
}

function createImg(param: { src: string; style: Partial<CSSStyleDeclaration> }): CSS2DObject {
  const img = document.createElement("img")
  img.src = param.src

  Object.assign(img.style, param.style)

  return new CSS2DObject(img)
}

function createPointLabel(R: number, lon: number, lat: number): CSS2DObject {
  const coord = lon2xyz(R * 1.001, lon, lat)

  const img = createImg({
    src: "/imgs/community/pin.svg",
    style: {
      height: "20px",
      position: "relative",
      pointerEvents: "auto",
    },
  })

  img.position.set(coord.x, coord.y, coord.z)

  return img
}

export { createPointMesh, createPointLabel }
