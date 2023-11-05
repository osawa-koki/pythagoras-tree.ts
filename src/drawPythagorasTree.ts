export interface Props {
  canvasSize: number
  colorHueStart: number
  colorHueEnd: number
  size: number
  left: number
  bottom: number
  baseDegree: number
  maxIterations: number
}

export default function Draw (ctx: CanvasRenderingContext2D, props: Props): void {
  const {
    canvasSize,
    colorHueStart,
    colorHueEnd,
    size,
    left,
    bottom,
    baseDegree,
    maxIterations
  } = props

  const boxSize = canvasSize * size / 100
  const leftSize = canvasSize * left / 100
  const bottomSize = canvasSize * bottom / 100

  ctx.clearRect(0, 0, canvasSize, canvasSize)
  ctx.fillStyle = `hsl(${colorHueStart}, 100%, 50%)`
  ctx.fillRect(
    leftSize - boxSize / 2,
    canvasSize - bottomSize - boxSize,
    boxSize,
    boxSize
  )
  function getLeftPoints (x: number, y: number, size: number, degree: number): Coord[] {
    return [
      { x, y },
      {
        x: x + Math.cos((degree + baseDegree) * Math.PI / 180) * size,
        y: y - Math.sin((degree + baseDegree) * Math.PI / 180) * size
      },
      {
        x: x + Math.cos((degree + baseDegree + 45) * Math.PI / 180) * size * Math.sqrt(2),
        y: y - Math.sin((degree + baseDegree + 45) * Math.PI / 180) * size * Math.sqrt(2)
      },
      {
        x: x + Math.cos((degree + baseDegree + 90) * Math.PI / 180) * size,
        y: y - Math.sin((degree + baseDegree + 90) * Math.PI / 180) * size
      }
    ] as Coord[]
  }
  function getRightPoints (x: number, y: number, size: number, degree: number): Coord[] {
    return [
      { x, y },
      {
        x: x + Math.cos((degree + baseDegree) * Math.PI / 180) * size,
        y: y - Math.sin((degree + baseDegree) * Math.PI / 180) * size
      },
      {
        x: x + Math.cos((degree + baseDegree + 45) * Math.PI / 180) * size * Math.sqrt(2),
        y: y - Math.sin((degree + baseDegree + 45) * Math.PI / 180) * size * Math.sqrt(2)
      },
      {
        x: x + Math.cos((degree + baseDegree + 90) * Math.PI / 180) * size,
        y: y - Math.sin((degree + baseDegree + 90) * Math.PI / 180) * size
      }
    ] as Coord[]
  }
  function recDraw (p1: Coord, p2: Coord, size: number, degree: number, n: number, i: number): void {
    if (n === 0) return
    (() => { // 左側
      const smalledSize = Math.cos(baseDegree * Math.PI / 180) * size
      const pointsLeft = getLeftPoints(p1.x, p1.y, smalledSize, degree)
      ctx.fillStyle = `hsl(${(colorHueEnd / (maxIterations + 1) * i + colorHueStart) % 360}, 100%, 50%)`
      ctx.beginPath()
      ctx.moveTo(pointsLeft[0].x, pointsLeft[0].y)
      ctx.lineTo(pointsLeft[1].x, pointsLeft[1].y)
      ctx.lineTo(pointsLeft[2].x, pointsLeft[2].y)
      ctx.lineTo(pointsLeft[3].x, pointsLeft[3].y)
      ctx.fill()
      recDraw(
        { x: pointsLeft[3].x, y: pointsLeft[3].y },
        { x: pointsLeft[2].x, y: pointsLeft[2].y },
        smalledSize,
        degree + baseDegree,
        n - 1,
        i + 1
      )
    })();
    (() => { // 右側
      const smalledSize = Math.sin(baseDegree * Math.PI / 180) * size
      const pointsRight = getRightPoints(p2.x, p2.y, smalledSize, degree)
      ctx.fillStyle = `hsl(${(colorHueEnd / (maxIterations + 1) * i + colorHueStart) % 360}, 100%, 50%)`
      ctx.beginPath()
      ctx.moveTo(pointsRight[0].x, pointsRight[0].y)
      ctx.lineTo(pointsRight[1].x, pointsRight[1].y)
      ctx.lineTo(pointsRight[2].x, pointsRight[2].y)
      ctx.lineTo(pointsRight[3].x, pointsRight[3].y)
      ctx.fill()
      recDraw(
        { x: pointsRight[2].x, y: pointsRight[2].y },
        { x: pointsRight[1].x, y: pointsRight[1].y },
        smalledSize,
        degree - (90 - baseDegree),
        n - 1,
        i + 1
      )
    })()
  }
  recDraw(
    {
      x: leftSize - boxSize / 2,
      y: canvasSize - bottomSize - boxSize
    },
    {
      x: leftSize - boxSize / 2 + boxSize,
      y: canvasSize - bottomSize - boxSize
    },
    boxSize,
    0,
    maxIterations - 1,
    1
  )
}
