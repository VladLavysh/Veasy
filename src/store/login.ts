import { defineStore } from 'pinia'
import axios from 'axios'
import { loginUserData, registerUserData } from '../types/index'

export const useLoginStore = defineStore('login', {
  state: () => ({
  }),
  actions: {
    async logIn(userData: loginUserData) {
      return await axios.post<loginUserData>('api/login/sign-in', userData)
    },
    async createNewUser(userData: registerUserData) {
      return await axios.post<registerUserData>('api/login/sign-up', userData)
    }
  },
})