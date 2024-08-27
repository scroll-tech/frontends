import { createRoot } from "react-dom/client"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js"

import Tag from "./Tag"
import { countryLine } from "./line"
import { createPointLabel, createPointMesh } from "./pointMesh"

const MAX_SIZE = 700
let rendererWidth = Math.min(window.innerWidth, MAX_SIZE)
let rendererHeight = rendererWidth
let moveLeft = 0
let moveTop = 0

let labelPos, labelTitle: CSS2DObject | null

const R = 110
const scene = new THREE.Scene()
const earth = new THREE.Group()
const cityslabels = new THREE.Group()
let chooseMesh: THREE.Mesh | null = null

let renderer = initRenderer()
let labelRenderer = initLabelRenderer(rendererWidth, rendererHeight, moveTop, moveLeft)
let camera = initCamera(rendererWidth, rendererHeight)
initScene()
initControls()
render()

function initRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(rendererWidth, rendererHeight)
  renderer.setClearColor(0xfef8f4, 1)
  return renderer
}

function initLabelRenderer(width: number, height: number, top: number, left: number) {
  const labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(width, height)
  labelRenderer.domElement.style.position = "absolute"
  labelRenderer.domElement.style.top = `${top - 16}px`
  labelRenderer.domElement.style.left = `${left}px`
  setTimeout(() => {
    const labelElement = document.querySelector("#community-container")
    if (!labelElement) return
    labelElement.insertBefore(labelRenderer.domElement, labelElement.firstChild)
  }, 1000)
  return labelRenderer
}

function initCamera(width: number, height: number) {
  const k = width / height
  const s = 120
  const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
  camera.position.set(300, 185, -200)
  camera.lookAt(0, 0, 0)
  return camera
}

function initScene() {
  scene.add(earth)
  scene.add(cityslabels)

  const ambient = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambient)

  earth.add(createSphereMesh(R))
  earth.add(countryLine(R * 1.001))
  ;(window as any).tours = createTorus()
  // earth.add(createTorus());
  earth.add((window as any).tours)
}

function initControls() {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.autoRotate = false
  controls.autoRotateSpeed = 0
  controls.enableZoom = false

  controls.addEventListener("change", () => {
    resetSelection()
  })
}

function resetSelection() {
  // chooseMesh?.material?.color.set(0xffffff);
  // earth.clear();
  ;(chooseMesh?.material as THREE.MeshBasicMaterial)?.color.set(0xffffff)
  if (labelTitle) {
    earth.remove(labelTitle)
    labelTitle = null
  }
}

function createSphereMesh(r: number) {
  const geometry = new THREE.SphereGeometry(r, 40, 40)
  const material = new THREE.MeshLambertMaterial({ color: 0xedcca2 })
  return new THREE.Mesh(geometry, material)
}

function createTorus() {
  const torusGeometry = new THREE.TorusGeometry(R + 0.2, 0.2, 16, 100)
  const torusMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })
  return new THREE.Mesh(torusGeometry, torusMaterial)
}

function render() {
  requestAnimationFrame(render)
  labelRenderer.render(scene, camera)
  renderer.render(scene, camera)
  ;(window as any).tours.lookAt(camera.position)
}

function getDirection(x: number, y: number, width: number, height: number) {
  if (window.innerWidth < 900) {
    // Screen width is less than 900px, return upper or lower part
    const centerY = height / 2
    if (y < centerY) {
      return "down"
    } else {
      return "up"
    }
  } else {
    // Screen width is 900px or greater, return left or right side
    const centerX = width / 2
    if (x < centerX) {
      return "right"
    } else {
      return "left"
    }
  }
}

async function chooseLabel(chooseLabel: any, event: any) {
  resetSelection()

  labelPos = new THREE.Vector3(chooseLabel.position.x, chooseLabel.position.y - 12, chooseLabel.position.z)

  const canvas = window.document.querySelector("canvas")!
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const direction = getDirection(x, y, rendererWidth, rendererWidth)

  labelTitle = await createTag({
    data: chooseLabel,
    direction,
  })

  if (labelTitle) {
    earth.add(labelTitle)
    setPosition(labelTitle, labelPos)
  } else {
    console.error("Failed to create labelTitle. It is null.")
  }

  chooseMesh = getObjectByName(earth, chooseLabel?.name)
  if (chooseMesh) {
    ;(chooseMesh.material as THREE.MeshBasicMaterial).color.set(0xd2fcf6)
  }
}

function getObjectByName(root: THREE.Object3D, name: string): THREE.Mesh | null {
  if (root.name === name && root instanceof THREE.Mesh) {
    return root
  }
  for (const child of root.children) {
    const found = getObjectByName(child, name)
    if (found) return found
  }
  return null
}

function createTag({ data, direction }: any): Promise<CSS2DObject | null> {
  return new Promise(resolve => {
    const container = document.createElement("div")
    document.body.appendChild(container)

    const root = createRoot(container)
    root.render(
      <Tag
        data={data}
        direction={direction}
        onTagReady={obj => {
          resolve(obj)
          setTimeout(() => {
            root.unmount()
            try {
              document.body.removeChild(container)
            } catch (error) {
              console.error("Failed to remove child node:", error)
            }
          }, 0)
        }}
      />,
    )
  })
}

function setPosition(label: CSS2DObject, position: THREE.Vector3) {
  label.position.copy(position)
}

function initCityLabels(citydatas: any[]) {
  citydatas.forEach(obj => {
    const mesh: any = createPointMesh(R, obj.longitude, obj.latitude)
    const label = createPointLabel(R, obj.longitude, obj.latitude)
    mesh.linkLabel = label
    cityslabels.add(label)
    cityslabels.add(mesh)

    mesh.name = obj.name
    mesh.visible = false
    mesh.eventName = obj.text
    mesh.cover = obj.pictures
    mesh.city = obj.city
    mesh.eventInfo = obj

    label.element.addEventListener("click", e => chooseLabel(mesh, e))
  })

  function checkVisibility() {
    cityslabels.traverse(item => {
      if ((item as any).linkLabel) isObjectVisible(item, camera)
    })

    requestAnimationFrame(checkVisibility)
  }

  checkVisibility()
}

function isObjectVisible(object: any, camera: THREE.Camera) {
  const distance = calculateDistance(object.position, camera.position)
  object.linkLabel.element.style.opacity = distance > 400 ? 0 : 1
}

function calculateDistance(pointA: THREE.Vector3, pointB: THREE.Vector3) {
  return pointA.distanceTo(pointB)
}

function resizeRender(width: number, height: number, left: number, top: number) {
  labelRenderer.setSize(width, height)
  renderer.setSize(width, height)

  labelRenderer.domElement.style.top = `${top - 10}px`
  labelRenderer.domElement.style.left = `${left}px`
  labelRenderer.domElement.style.overflow = "visible"
}

export { renderer, resizeRender, initCityLabels, initLabelRenderer }
