import Delaunator from "./delaunator"
import { pointInPolygon } from "./pointInPolygon"

function delaunay(pointsArr: string | any[], polygon: any) {
  var indexArr = (Delaunator.from(pointsArr) as any).triangles

  var usefulIndexArr: any = []

  for (var i = 0; i < indexArr.length; i += 3) {
    var p1 = pointsArr[indexArr[i]]
    var p2 = pointsArr[indexArr[i + 1]]
    var p3 = pointsArr[indexArr[i + 2]]

    var triangleCentroid = [(p1[0] + p2[0] + p3[0]) / 3, (p1[1] + p2[1] + p3[1]) / 3]
    if (pointInPolygon(triangleCentroid, polygon)) {
      usefulIndexArr.push(indexArr[i + 2], indexArr[i + 1], indexArr[i])
    }
  }
  return usefulIndexArr
}
export { delaunay }
