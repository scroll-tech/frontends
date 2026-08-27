import { pointInPolygon } from "./pointInPolygon"

function gridPoint(polygon: any[][]) {
  var lonArr: any[] = []
  var latArr: any[] = []
  polygon.forEach((elem: any[]) => {
    lonArr.push(elem[0])
    latArr.push(elem[1])
  })

  var [lonMin, lonMax] = minMax(lonArr)
  var [latMin, latMax] = minMax(latArr)

  var gap = 3
  var row = Math.ceil((lonMax - lonMin) / gap)
  var column = Math.ceil((latMax - latMin) / gap)
  var rectPointsArr: any = []
  for (var i = 0; i < row + 1; i++) {
    for (var j = 0; j < column + 1; j++) {
      rectPointsArr.push([lonMin + i * gap, latMin + j * gap])
    }
  }

  var polygonPointsArr: number[][] = []
  rectPointsArr.forEach(function (coord) {
    if (pointInPolygon(coord, polygon)) {
      polygonPointsArr.push(coord)
    }
  })

  return [...polygon, ...polygonPointsArr]
}

function minMax(arr: any[]) {
  arr.sort(compareNum)

  return [Math.floor(arr[0]), Math.ceil(arr[arr.length - 1])]
}

function compareNum(num1: number, num2: number) {
  if (num1 < num2) {
    return -1
  } else if (num1 > num2) {
    return 1
  } else {
    return 0
  }
}

export { gridPoint }
