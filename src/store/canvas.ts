import { defineStore } from 'pinia'
import { Tool, ToolConfig } from '../types/index'

export const useCanvasStore = defineStore('tools', {
  state: () => ({
    tools: [] as ToolConfig[],
    selectedTool: null as ToolConfig,
    isAddingAllowed: false as Boolean
  }),
  getters: {
  },
  actions: {
    addNewTool(newTool: ToolConfig) {
      this.tools.push(newTool)
    },
    setSelectedTool(toolName: string) {
      if (!toolName || this.selectedTool.name === toolName) {
        //this.selectedTool = toolName
        return
      }

      this.selectedTool = this.tools.find(el => el.name === toolName)
      console.log('Selected tool', this.selectedTool);
    },
    changeAddingStatus(isAllowed: Boolean) {
      this.isAddingAllowed = isAllowed
    }
  },
})