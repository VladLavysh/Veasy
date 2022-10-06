import { Tool } from "../../types"

export const configKonva = {
  width: 800,
  height: 1120
}

export const shapeConfig = (tool: Tool) => {
  switch (tool.konvaName) {
    case 'v-circle':
      return {
        x: tool.x,
        y: tool.y,
        radius: 50,
        fill: 'green'
      }
    case 'v-rect':
      return {
        x: 20,
        y: 50,
        width: 100,
        height: 100,
        fill: 'red',
        shadowBlur: 10
      }
    case 'v-line':
      return {
        x: 20,
        y: 200,
        points: [0, 0, 100, 0, 100, 100],
        tension: 0.5,
        closed: true,
        stroke: 'black',
        fillLinearGradientStartPoint: { x: -50, y: -50 },
        fillLinearGradientEndPoint: { x: 50, y: 50 },
        fillLinearGradientColorStops: [0, 'red', 1, 'yellow']
      }
    default:null
      break;
  }
}
