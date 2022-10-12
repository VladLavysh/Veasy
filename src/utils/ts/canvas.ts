import { Tool, ToolConfig } from "../../types"
import { useCanvasStore } from '../../store/canvas'
import { ToolFromBar } from '../../types'

const canvasStore = useCanvasStore()

export const konvaConfig = {
  width: 800,
  height: 1120
}

export const shapeConfig = ({name, konvaName, id, x, y}: Tool): ToolConfig => {
  const defaultConfig: ToolConfig = {
    name,
    konvaName,
    id,
    x,
    y,

    rotation: 0,
    scaleX: 1,
    scaleY: 1,

    draggable: true,

    stroke: '#bebebe',
    dash: [5, 5],
  }

  switch (konvaName) {
    case 'v-circle':
      return Object.assign(defaultConfig, {
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
        points: [x - 100, y, x + 300, y],
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
      delete defaultConfig.scaleY
      delete defaultConfig.scaleX

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

    default: return defaultConfig
  }
}

export const addToCanvas = (e: MouseEvent, {name, konvaName, id}: ToolFromBar) => {
  if (!canvasStore.isAddingAllowed) {
    return
  }

  const canvas = document.querySelector('.canvas-section__canvas') as HTMLDivElement
  const canvasSection = document.querySelector('.canvas-section') as HTMLDivElement

  const baseToolConfig = {
    name: `${name}_${id!.toString()}`,
    konvaName,
    id: id!.toString(),
    x: Math.round(e.pageX - canvas.offsetLeft + canvasSection.scrollLeft),
    y: Math.round(e.pageY - canvas.offsetTop + canvasSection.scrollTop)
  }

  canvasStore.addNewTool(shapeConfig(baseToolConfig))

  canvasStore.changeAddingStatus(false)
}

// Shape transformer functions (3)
// Source: https://codesandbox.io/s/github/konvajs/site/tree/master/vue-demos/transformer?from-embed=&file=/src/App.vue
let selectedShapeName: string
let stageTransformer: any

const updateTransformer = () => {
  const transformerNode = stageTransformer.getNode()
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
}

export const handleStageMouseDown = (e: MouseEvent, transformer: any) => {
  stageTransformer = transformer
  const target = e.target as HTMLElement

  if (target === target.getStage()) {
    selectedShapeName = ''
    canvasStore.setSelectedTool('')

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

  canvasStore.setSelectedTool(selectedShapeName || null)

  updateTransformer()
}
