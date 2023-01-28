import jsPDF from "jspdf"
import { Tool, ToolConfig } from "../../types"
import { useCanvasStore } from '../../store/canvas'
import { ToolFromBar, TransformerData } from '../../types'
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
  //boundBoxFunc: (oldBox: any, newBox: any) => {
  //  const box = getClientRect(newBox)
  //  const isOut =
  //    box.x < 0 ||
  //    box.y < 0 ||
  //    box.x + box.width > konvaConfig.width ||
  //    box.y + box.height > konvaConfig.height

  //    return isOut ? oldBox : newBox
  //}
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
    dash: [0, 0],
  }

  switch (konvaName) {
    case 'v-rect':
      return Object.assign(defaultConfig, {
        width: 80,
        height: 80,
        cornerRadius: 0,
        fill: '#FFFFFFFF',
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
        verticalAlign: 'top',
        fill: '#000000'
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

// TODO: validate shadow and shape coords (x, y)
export const validateShadowCoords = (transformerData: TransformerData): { x: number, y: number } => {
  const { x, y, width, height, rotation } = transformerData

  // Rotated rectangle
  //const angle = rotation * (Math.PI / 180);
  //const newHeight = Math.abs(height * Math.cos(angle) + width * Math.sin(angle));
  //const newWidth = Math.abs(height * Math.sin(angle) + width * Math.cos(angle));

  //if (hei)

  let xCoord = Math.round(x / 20) * 20
  let yCoord = Math.round(y / 20) * 20

  //if (x < 0) xCoord = 0
  //if (y < 0) yCoord = 0

  //if (x > konvaConfig.width - width) xCoord = konvaConfig.width - width
  //if (y > konvaConfig.height - height) yCoord = konvaConfig.height - height

  return { x: xCoord, y: yCoord }
}

export const handleStageMouseDown = (event: MouseEvent | string) => {
  const canvasStore = useCanvasStore()
  stageTransformer = canvasStore.transformer?.getNode()

  const targetName = typeof event === 'object'
    ? getTargetName(event.target as unknown as Shape | Stage)
    : event

  if (!targetName || targetName === selectedShapeName) return

  const shape = canvasStore.tools.find(r => r.name === targetName)

  stageTransformer.attrs.resizeEnabled = shape?.konvaName !== 'v-text'
  //stageTransformer.attrs.rotateEnabled = shape?.konvaName !== 'v-rect'

  selectedShapeName = shape ? targetName : ''

  canvasStore.setSelectedTool(selectedShapeName || null)

  updateTransformer()
}

export const handleTransformEnd = (e: MouseEvent, x: number | null, y: number | null) => {
  const canvasStore = useCanvasStore()

  const target = e.target as unknown as Shape
  const shape = canvasStore.tools.find(r => r.name === selectedShapeName)

  if (!shape) return

  shape.x = x ?? target.x()
  shape.y = y ?? target.y()
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

// -------------------------------------------
const getTotalBox = (box) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  //boxes.forEach((box) => {
    minX = Math.min(minX, box.x);
    minY = Math.min(minY, box.y);
    maxX = Math.max(maxX, box.x + box.width);
    maxY = Math.max(maxY, box.y + box.height);
  //});
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

const getCorner = (pivotX, pivotY, diffX, diffY, angle) => {
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);

  /// find angle from pivot to corner
  angle += Math.atan2(diffY, diffX);

  /// get new x and y and round it off to integer
  const x = pivotX + distance * Math.cos(angle);
  const y = pivotY + distance * Math.sin(angle);

  return { x: x, y: y };
}

function getClientRect (rotatedBox) {
  const { x, y, width, height } = rotatedBox;
  const rad = rotatedBox.rotation;

  const p1 = getCorner(x, y, 0, 0, rad);
  const p2 = getCorner(x, y, width, 0, rad);
  const p3 = getCorner(x, y, width, height, rad);
  const p4 = getCorner(x, y, 0, height, rad);

  const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
  const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
  const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
  const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

export const checkAvaliableDragPlace = (node) => {
  //const node = findShape(selectedShapeName)
  //const canvasStore = useCanvasStore()
  //const shapeShadow = canvasStore.shapeShadow?.getNode()
  const selectedNode = node ? node : findShape(selectedShapeName)
  const box = getTotalBox(selectedNode.getClientRect());

  const absPos = selectedNode.getAbsolutePosition();
  const offsetX = box.x - absPos.x;
  const offsetY = box.y - absPos.y;

  let isValid = true

  const newAbsPos = { ...absPos };
  if (box.x < 0) {
    newAbsPos.x = -offsetX;
    isValid = false
  }
  if (box.y < 0) {
    newAbsPos.y = -offsetY;
    isValid = false

  }
  if (box.x + box.width > konvaConfig.width) {
    newAbsPos.x = konvaConfig.width - box.width - offsetX;
    isValid = false

  }
  if (box.y + box.height > konvaConfig.height) {
    newAbsPos.y = konvaConfig.height - box.height - offsetY;
    isValid = false
  }

  console.log('isValid', isValid);
  

  selectedNode.setAbsolutePosition(newAbsPos);
}
// -------------------------------------------