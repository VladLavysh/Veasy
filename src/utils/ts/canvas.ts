import { Tool, ToolConfig } from "../../types"
import { useCanvasStore } from '../../store/canvas'
import { ToolFromBar } from '../../types'
import { ref } from 'vue'

export const konvaConfig = {
  width: 800,
  height: 1120
}

export const shapeConfig = (tool: Tool): ToolConfig | null => {
  const defaultConfig: ToolConfig = {
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
  const canvasStore = useCanvasStore()

  if (!canvasStore.isAddingAllowed) {
    return
  }

  const canvas = document.querySelector('.canvas-section__canvas') as HTMLDivElement
  const canvasSection = document.querySelector('.canvas-section') as HTMLDivElement

  canvasStore.addNewTool({
    name,
    konvaName,
    id: id!.toString(),
    x: Math.round(e.pageX - canvas.offsetLeft + canvasSection.scrollLeft),
    y: Math.round(e.pageY - canvas.offsetTop + canvasSection.scrollTop)
  })

  canvasStore.changeAddingStatus(false)
}

// Shape transformer functions (3)
// https://codesandbox.io/s/github/konvajs/site/tree/master/vue-demos/transformer?from-embed=&file=/src/App.vue
const updateTransformer = () => {
  // here we need to manually attach or detach Transformer node
  const transformerNode = this.$refs.transformer.getNode();
  const stage = transformerNode.getStage();
  const { selectedShapeName } = this;

  const selectedNode = stage.findOne('.' + selectedShapeName);
  // do nothing if selected node is already attached
  if (selectedNode === transformerNode.node()) {
    return;
  }

  if (selectedNode) {
    // attach to another node
    transformerNode.nodes([selectedNode]);
  } else {
    // remove transformer
    transformerNode.nodes([]);
  }
}

export const handleTransformEnd = () => {
  // shape is transformed, let us save new attrs back to the node
  // find element in our state
  const rect = this.rectangles.find(
    (r) => r.name === this.selectedShapeName
  );
  // update the state
  rect.x = e.target.x();
  rect.y = e.target.y();
  rect.rotation = e.target.rotation();
  rect.scaleX = e.target.scaleX();
  rect.scaleY = e.target.scaleY();

  // change fill
  rect.fill = Konva.Util.getRandomColor();
}

export const handleStageMouseDown = () => {
  // clicked on stage - clear selection
  if (e.target === e.target.getStage()) {
    this.selectedShapeName = '';
    this.updateTransformer();
    return;
  }

  // clicked on transformer - do nothing
  const clickedOnTransformer =
    e.target.getParent().className === 'Transformer';
  if (clickedOnTransformer) {
    return;
  }

  // find clicked rect by its name
  const name = e.target.name();
  const rect = this.rectangles.find((r) => r.name === name);
  if (rect) {
    this.selectedShapeName = name;
  } else {
    this.selectedShapeName = '';
  }
  updateTransformer();
}
