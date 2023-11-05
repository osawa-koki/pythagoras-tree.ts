import React from 'react'
import { createCanvas } from 'canvas'
import drawPythagorasTree from '../src/drawPythagorasTree'

interface Props {
  images: (Rgb[][])[]
}

export default function Canvas (props: Props): React.JSX.Element {
  const { images } = props

  return (
    <>
      <div id='Canvas'>
        <h1>Canvas</h1>
        <div>
          {images.map((cells, i) => (
            <div key={i}>
              <h2>Image {i + 1}</h2>
              <table>
                <tbody>
                  {cells.map((row, j) => (
                    <tr key={j}>
                      {row.map((cell, k) => (
                        <td
                          key={k}
                          style={{
                            width: '1px',
                            height: '1px',
                            backgroundColor: `rgb(${cell.r}, ${cell.g}, ${cell.b})`
                          }}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps (): Promise<{ props: Props }> {
  const images: (Rgb[][])[] = []

  const data = [
    {
      canvasSize: 256,
      colorHueStart: 0,
      colorHueEnd: 360,
      size: 15,
      left: 35,
      bottom: 15,
      baseDegree: 60,
      maxIterations: 10
    },
    {
      canvasSize: 256,
      colorHueStart: 0,
      colorHueEnd: 360,
      size: 15,
      left: 65,
      bottom: 15,
      baseDegree: 30,
      maxIterations: 10
    },
    {
      canvasSize: 256,
      colorHueStart: 0,
      colorHueEnd: 360,
      size: 15,
      left: 50,
      bottom: 15,
      baseDegree: 45,
      maxIterations: 10
    },
    {
      canvasSize: 256,
      colorHueStart: 0,
      colorHueEnd: 360,
      size: 14,
      left: 35,
      bottom: 15,
      baseDegree: 60,
      maxIterations: 15
    },
    {
      canvasSize: 256,
      colorHueStart: 0,
      colorHueEnd: 360,
      size: 13,
      left: 35,
      bottom: 20,
      baseDegree: 60,
      maxIterations: 25
    }
  ]
  data.forEach((props) => {
    const { canvasSize } = props
    const canvas = createCanvas(canvasSize, canvasSize)
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.fillRect(0, 0, canvasSize, canvasSize)

    // @ts-expect-error `node-canvas` does not have some properties.
    drawPythagorasTree(ctx, props)

    const cells: Rgb[][] = []
    for (let i = 0; i < canvasSize; i++) {
      cells[i] = []
      for (let j = 0; j < canvasSize; j++) {
        const data = ctx.getImageData(j, i, 1, 1).data
        cells[i][j] = {
          r: data[0],
          g: data[1],
          b: data[2]
        }
      }
    }
    images.push(cells)
  })

  return {
    props: {
      images
    }
  }
}
