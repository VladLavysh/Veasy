import { defineStore } from 'pinia'
import { Tool } from '../types/index'

export const useCanvasStore = defineStore('tools', {
  state: () => ({
    tools: [] as Tool[],
    isAddingAllowed: false as Boolean
  }),
  getters: {
  },
  actions: {
    addNewTool(newTool: Tool) {
      this.tools.push(newTool)
    },
    changeAddingStatus(isAllowed: Boolean) {
      this.isAddingAllowed = isAllowed
    }
  },
})