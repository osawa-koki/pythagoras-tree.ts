export default function getLeftPoints (x: number, y: number, size: number, angle: number, degree: number): Coord[] {
  const points: Coord[] = []
  points[0] = { x, y }
  points[1] = {
    x: x + Math.cos((angle + degree) * Math.PI / 180.0) * size,
    y: y - Math.sin((angle + degree) * Math.PI / 180.0) * size
  }
  points[2] = {
    x: x + Math.cos((angle + degree + 45) * Math.PI / 180.0) * size * Math.sqrt(2),
    y: y - Math.sin((angle + degree + 45) * Math.PI / 180.0) * size * Math.sqrt(2)
  }
  points[3] = {
    x: x + Math.cos((angle + degree + 90) * Math.PI / 180.0) * size,
    y: y - Math.sin((angle + degree + 90) * Math.PI / 180.0) * size
  }
  return points
}
