import jsPDF from "jspdf"
import { Tool, ToolConfig } from "../../types"
import { useCanvasStore } from '../../store/canvas'
import { ToolFromBar } from '../../types'
import { Shape } from "konva/lib/Shape"
import { Stage } from "konva/lib/Stage"
import { Text } from "konva/lib/shapes/Text"

// ----- Konfigs -----
export const konvaConfig = {
  width: 800,
  height: 1120
}
export const canvasBackgroundConfig = {
  name: 'canvas-background',
  x: 0,
  y: 0,
  width: konvaConfig.width,
  height: konvaConfig.height,

  draggable: false,
  listening: false
}

export const transformerConfig = {
  ignoreStroke: true,
  //centeredScaling: true,
  resizeEnabled: true,
  rotationSnaps: [0, 90, 180, 270],

  anchorStroke: '#66727d',
  anchorFill: '#ffffff',
  anchorSize: 8,
  borderStroke: '#66727d',
}

export const shapeConfig = ({ name, konvaName, id, x, y }: Tool): ToolConfig => {
  const defaultConfig: ToolConfig = {
    name,
    konvaName,
    id,
    x: x - 40, // 40 - half of default tool width/height
    y: y - 40,

    rotation: 0,
    scaleX: 1,
    scaleY: 1,

    draggable: true,
    strokeScaleEnabled: false,

    stroke: '#BFBEBEFF',
    strokeWidth: 2,
    dash: [5, 5],
  }

  switch (konvaName) {
    case 'v-circle':
      return Object.assign(defaultConfig, {
        // coords without padding (40)
        x,
        y,
        radius: 40,
        fill: '#FFFFFFFF'
      })

    case 'v-rect':
      return Object.assign(defaultConfig, {
        width: 80,
        height: 80,
        fill: '#FFFFFFFF'
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
        text: 'Type some text here',
        fontSize: 20,
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontVariant: 'normal',
        textDecoration: 'empty string',
        align: 'left',
        verticalAlign: 'top'
      })

    case 'v-image':
      const image = new window.Image()
      image.src = '../../../image_set.svg'

      //await image.onload
      return Object.assign(defaultConfig, {
        width: 80,
        height: 80,
        image
      })

    default: return defaultConfig
  }
}

// ----- Konva transformer methods -----
// Source: https://codesandbox.io/s/github/konvajs/site/tree/master/vue-demos/transformer?from-embed=&file=/src/App.vue
let selectedShapeName: string
let stageTransformer: any

const findShape = (name: string) => {
  if (!stageTransformer) return

  const stage = stageTransformer.getStage()

  return stage.findOne('.' + name)
}

const updateTransformer = () => {
  const selectedNode = findShape(selectedShapeName)

  if (selectedNode === stageTransformer.node()) {
    return;
  }

  stageTransformer.nodes(selectedNode ? [selectedNode] : [])
}

const getTargetName = (target: Shape | Stage) => {
  const canvasStore = useCanvasStore()

  if (!target || target === target.getStage()) {
    selectedShapeName = ''
    canvasStore.setSelectedTool('')

    updateTransformer()
    return
  }

  if (target.getParent().className === 'Transformer') {
    return
  }

  return target.name()
}

export const handleStageMouseDown = (event: MouseEvent | string) => {
  const canvasStore = useCanvasStore()
  const transformer = canvasStore.transformer

  stageTransformer = transformer?.getNode()

  const targetName = typeof event === 'object'
    ? getTargetName(event.target as unknown as Shape | Stage)
    : event

  if (!targetName) return

  const shape = canvasStore.tools.find(r => r.name === targetName)

  stageTransformer.attrs.resizeEnabled = shape?.konvaName !== 'v-text'

  selectedShapeName = shape ? targetName : ''

  canvasStore.setSelectedTool(selectedShapeName || null)

  updateTransformer()
}

export const handleTransformEnd = (e: MouseEvent) => {
  const canvasStore = useCanvasStore()

  const target = e.target as unknown as Shape
  const shape = canvasStore.tools.find(r => r.name === selectedShapeName)

  if (!shape) return

  shape.x = target.x()
  shape.y = target.y()
  shape.rotation = target.rotation()
  shape.scaleX = target.scaleX()
  shape.scaleY = target.scaleY()
}

// ----- Kanvas methods -----
export const addToCanvas = (e: MouseEvent, { name, konvaName, id }: ToolFromBar) => {
  const canvasStore = useCanvasStore()

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

  const config = shapeConfig(baseToolConfig)

  canvasStore.addNewTool(config)

  canvasStore.changeAddingStatus(false)
  canvasStore.changeGridStatus(false)
}

export const removeFromCanvas = (toolId: string) => {
  const canvasStore = useCanvasStore()

  canvasStore.tools = canvasStore.tools.filter(tool => tool.id !== toolId)
  canvasStore.setSelectedTool(null)

  stageTransformer.nodes([])
}

// ----- Canvas save/export methods -----
export const downloadCanvas = (stageElem: Stage, fileName: string, fileType: string) => {
  const stage = stageElem.getStage()
  const canvasStore = useCanvasStore()

  const pdf = new jsPDF('p', 'px', [konvaConfig.width, konvaConfig.height])
  pdf.setTextColor('#000000')

  console.log('fileType', fileType);
  if (fileType === 'pdf') {

    //  TODO: ----- Add support for text -----
    // stage.find('Text').forEach((text: any) => {
    //   const textArrts = text.attrs

    //   const size = textArrts.fontSize / 0.75 // convert pixels to points
    //   pdf.setFontSize(size)

    //   pdf.text(textArrts.text.trim(), textArrts.x, textArrts.y, {
    //     align: textArrts.align as "left" | "center" | "right" | "justify" | undefined,
    //     baseline: textArrts.verticalAlign as "top" | "bottom" | "middle" | undefined,
    //     angle: -textArrts.rotation,
    //   })

    //   // Delete konva shape node
    //   // text.destroy()
    // })

    pdf.addImage(
      stage.toDataURL({ pixelRatio: 2 }),
      0,
      0,
      konvaConfig.width,
      konvaConfig.height
    )

    pdf.save(`${fileName}.${fileType}`);
  } else { // png, jpeg

    const dataUrl = stage.toDataURL({
      mimeType: `image/${fileType}`,
      x: 0,
      y: 0,
      width: konvaConfig.width,
      height: konvaConfig.height,
      pixelRatio: 2
    });

    downloadURI(dataUrl, `${fileName}.${fileType}`);
  }

  if (canvasStore.selectedTool) {
    canvasStore.setSelectedTool(null)
    stageTransformer?.nodes([])
  }
}

function downloadURI(uri: string, name: string) {
  const link = document.createElement('a')
  link.download = name
  link.href = uri

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  link.remove()
}

export const saveCanvas = () => {
  console.log('Saving canvas to db...');
}
