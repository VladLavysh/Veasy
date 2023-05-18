import { defineStore } from 'pinia'

export const useToolsStore = defineStore('tools', {
  state: () => ({
    isPanelOpen: false as Boolean,
  }),
  getters: {},
  actions: {
    changePanelStatus(isOpen: Boolean) {
      this.isPanelOpen = isOpen
    }
  },
})