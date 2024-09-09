import * as THREE from "three"
// @ts-ignore
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils.js"

import { delaunay } from "./delaunay"
import { gridPoint } from "./gridPoint"
import { lon2xyz } from "./math"

function countryMesh(R: number, polygonArr: any[]) {
  var geometryArr: any[] = []
  polygonArr.forEach(obj => {
    var polygon = obj[0]

    var pointsArr = gridPoint(polygon)

    var trianglesIndexArr = delaunay(pointsArr, polygon)

    var spherePointsArr: Iterable<number> | any[] | any = []
    pointsArr.forEach((item, i) => {
      var pos = lon2xyz(R, item[0], item[1])
      spherePointsArr.push(pos.x, pos.y, pos.z)
    })
    var geometry = new THREE.BufferGeometry()

    geometry.index = new THREE.BufferAttribute(new Uint16Array(trianglesIndexArr), 1)

    geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(spherePointsArr), 3)
    geometryArr.push(geometry)
  })

  var newGeometry: any = null
  if (geometryArr.length === 1) {
    newGeometry = geometryArr[0]
  } else {
    newGeometry = BufferGeometryUtils.mergeBufferGeometries(geometryArr)
  }
  newGeometry.computeVertexNormals()
  // MeshLambertMaterial   MeshBasicMaterial
  var material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  })
  var mesh = new THREE.Mesh(newGeometry, material)
  return mesh
}
export { countryMesh }
