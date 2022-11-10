import { defineStore } from 'pinia'
import axios from 'axios'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    isDataTab: true as boolean,
    CVs: []
  }),
  getters: {

  },
  actions: {
    changeActiveTab(isUserData: boolean) {
        if (this.isDataTab === isUserData) {
            return
        }
        this.isDataTab = isUserData
    }
  },
})