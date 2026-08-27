import * as THREE from "three"

import { countryMesh } from "./countryMesh/index"
import { lon2xyz } from "./countryMesh/math"

function countryLine(R: number) {
  var loader = new THREE.FileLoader()
  loader.setResponseType("json")
  var group: any = new THREE.Group()
  group.meshArr = []

  var allPointArr: any[] = []

  loader.load("/files/world.json", function (data: any) {
    data?.features.forEach(function (country: { geometry: { type: string; coordinates: any[] }; properties: { name: string } }) {
      if (country.geometry.type === "Polygon") {
        country.geometry.coordinates = [country.geometry.coordinates]
      }

      country.geometry.coordinates.forEach((polygon: any[][][]) => {
        var pointArr: any[] = []
        polygon[0].forEach((elem: any[]) => {
          var coord = lon2xyz(R, elem[0], elem[1])
          pointArr.push(coord.x, coord.y, coord.z)
        })

        allPointArr.push(pointArr[0], pointArr[1], pointArr[2])
        for (let i = 3; i < pointArr.length; i += 3) {
          allPointArr.push(pointArr[i], pointArr[i + 1], pointArr[i + 2], pointArr[i], pointArr[i + 1], pointArr[i + 2])
        }
        allPointArr.push(pointArr[0], pointArr[1], pointArr[2])
      })
      var mesh = countryMesh(R * 1.0, country.geometry.coordinates)
      group.add(mesh)
      group.meshArr.push(mesh)
      mesh.name = country.properties.name
    })
    let lineMesh = line(allPointArr)
    lineMesh.name = "line"
    group.add(lineMesh)
  })
  return group
}

function line(pointArr: any[] | Iterable<number>) {
  var geometry = new THREE.BufferGeometry()

  var vertices = new Float32Array(pointArr)

  var attribue = new THREE.BufferAttribute(vertices, 3)

  geometry.attributes.position = attribue

  var material = new THREE.LineBasicMaterial({
    color: 0x000000,
  })

  var line = new THREE.LineSegments(geometry, material)

  return line
}

export { countryLine }
