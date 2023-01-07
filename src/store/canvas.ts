import { defineStore } from 'pinia'
import axios from 'axios'
import { ToolConfig } from '../types/index'

export const useCanvasStore = defineStore('tools', {
  state: () => ({
    tools: [] as ToolConfig[],
    selectedTool: null as ToolConfig | null,
    isAddingAllowed: false as Boolean,
    showGrid: false as Boolean
  }),
  getters: {
    getToolsName(): string[] {
      return this.tools.length > 0
        ? this.tools.map(el => el.name.substring(0, el.name.indexOf('_') + 6))
        : []
    }
  },
  actions: {
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
    changeAddingStatus(isAllowed: Boolean) {
      this.isAddingAllowed = isAllowed
    },
    changeGridStatus(isShow: Boolean) {
      this.showGrid = isShow
    },
    async getSelectedCV() {
      return await axios.get('api/creator/get-selected-cv')
    }
  },
})