function lon2xyz(R: number, longitude: number, latitude: number) {
  var lon = (longitude * Math.PI) / 180
  var lat = (latitude * Math.PI) / 180
  lon = -lon

  var x = R * Math.cos(lat) * Math.cos(lon)
  var y = R * Math.sin(lat)
  var z = R * Math.cos(lat) * Math.sin(lon)

  return {
    x: x,
    y: y,
    z: z,
  }
}

export { lon2xyz }
