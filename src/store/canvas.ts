import { defineStore } from 'pinia'
import axios from 'axios'
import { ToolConfig, ActiveTools, CanvasSettings } from '../types/index'
import { Transformer } from 'konva/lib/shapes/Transformer'

export const useCanvasStore = defineStore('canvas', {
  state: () => ({
    canvasSettings: {
      name: 'Canvas name',
      backgroundColor: '#F5F5F5FF',
      gridStatus: 'default',
      width: 800,
      height: 1120
    } as CanvasSettings,
    tools: [] as ToolConfig[],
    selectedTool: null as ToolConfig | null,
    transformer: null as Transformer | null,
    isAddingAllowed: false as Boolean,
    showShapeShadow: false as Boolean,
    showGrid: false as Boolean,
  }),
  getters: {
    getActiveTools(): ActiveTools[] {
      if (!this.tools.length) return []

      return this.tools.map(el => ({
        id: el.id,
        name: el.name.substring(0, el.name.indexOf('_') + 6),
      }))
    }
  },
  actions: {
    updateCanvasSettings(newSettings: { name: string, backgroundColor: string }) {
      this.canvasSettings = Object.assign(this.canvasSettings, newSettings)
    },
    updateToolsList(newTools: ToolConfig[]) {
      this.tools = newTools
    },
    addNewTool(newTool: ToolConfig) {
      this.tools.push(newTool)
    },
    setSelectedTool(toolName: string | null) {
      if (!toolName) {
        this.selectedTool = null
        return
      }
      if (this.selectedTool?.name === toolName) {
        return
      }

      this.selectedTool = this.tools.find(el => el.name === toolName) || null
    },
    setTransformer(transformer: Transformer) {
      this.transformer = transformer
    },
    //setShapeShadow(shape: Shape) {
    //  this.shapeShadow = shape
    //},
    changeAddingStatus(isAllowed: Boolean) {
      this.isAddingAllowed = isAllowed
    },
    changeGridStatus(isShow: Boolean) {
      this.showGrid = isShow
    },
    changeShadowStatus(isShow: Boolean) {
      this.showShapeShadow = isShow
    },
    async getSelectedCV() {
      return await axios.get('api/creator/get-selected-cv')
    }
  },
})