import Konva from 'konva';
import { Tool, ToolConfig } from "../../types"
import { useCanvasStore } from '../../store/canvas'
import { ToolFromBar } from '../../types'
import { ref } from 'vue'

const canvasStore = useCanvasStore()

export const konvaConfig = {
  width: 800,
  height: 1120
}

export const shapeConfig = (tool: Tool): ToolConfig | null => {
  const defaultConfig: ToolConfig = {
    name: tool.name,
    draggable: true,

    x: tool.x - 40, // 40 - half of width/height (to center tool)
    y: tool.y - 40,
    //width: 80,
    //height: 80,

    stroke: '#bebebe',
    dash: [5, 5],
  }

  switch (tool.konvaName) {
    case 'v-circle':
      return Object.assign(defaultConfig, {
        x: tool.x,
        y: tool.y,
        radius: 40,
      })

    case 'v-rect':
      return Object.assign(defaultConfig, {
        width: 80,
        height: 80,
      })

    case 'v-line':
      delete defaultConfig.x
      delete defaultConfig.y

      return Object.assign(defaultConfig, {
        points: [tool.x - 100, tool.y, tool.x + 300, tool.y],
      })

    case 'v-path':
      delete defaultConfig.dash
      delete defaultConfig.stroke

      return Object.assign(defaultConfig, {
        scaleX: 3,
        scaleY: 1.5,
        data: 'M18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z',
        fill: '#bebebe'
      })

    case 'v-text':
      delete defaultConfig.dash
      delete defaultConfig.stroke

      return Object.assign(defaultConfig, {
        width: 80,
        height: 80,
        text: 'Type some text here',
        fontSize: 20,
      })

    case 'v-image':
      return Object.assign(defaultConfig, {
        width: 80,
        height: 80,
      })

    default: return null
  }
}

export const addToCanvas = (e: MouseEvent, {name, konvaName, id}: ToolFromBar) => {
  if (!canvasStore.isAddingAllowed) {
    return
  }

  const canvas = document.querySelector('.canvas-section__canvas') as HTMLDivElement
  const canvasSection = document.querySelector('.canvas-section') as HTMLDivElement

  canvasStore.addNewTool({
    name: `${name}_${id!.toString()}`,
    konvaName,
    id: id!.toString(),
    x: Math.round(e.pageX - canvas.offsetLeft + canvasSection.scrollLeft),
    y: Math.round(e.pageY - canvas.offsetTop + canvasSection.scrollTop)
  })

  canvasStore.changeAddingStatus(false)
}

// Shape transformer functions (3)
let selectedShapeName: string
let stagetTransformer: any

// https://codesandbox.io/s/github/konvajs/site/tree/master/vue-demos/transformer?from-embed=&file=/src/App.vue
const updateTransformer = () => {
  const transformerNode = stagetTransformer.getNode()
  const stage = transformerNode.getStage()
  const selectedNode = stage.findOne('.' + selectedShapeName)

  if (selectedNode === transformerNode.node()) {
    return;
  }

  transformerNode.nodes(selectedNode ? [selectedNode] : [])
}

export const handleTransformEnd = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const shape = canvasStore.tools.find(r => r.name === selectedShapeName)

  if (!shape) return

  shape.x = target.x()
  shape.y = target.y()
  shape.rotation = target.rotation()
  shape.scaleX = target.scaleX()
  shape.scaleY = target.scaleY()

  shape.fill = Konva.Util.getRandomColor()
}

export const handleStageMouseDown = (e: MouseEvent, transformer: any) => {
  stagetTransformer = transformer
  const target = e.target as HTMLElement

  if (target === target.getStage()) {
    selectedShapeName = ''
    updateTransformer()
    return
  }

  const clickedOnTransformer = target.getParent().className === 'Transformer'
  if (clickedOnTransformer) {
    return
  }

  const name = target.name()
  const shape = canvasStore.tools.find(r => r.name === name)

  selectedShapeName = shape ? name : ''

  updateTransformer()
}
