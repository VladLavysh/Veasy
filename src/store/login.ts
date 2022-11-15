import { defineStore } from 'pinia'
import axios, { AxiosPromise } from 'axios'
import { loginUserData, registerUserData, responseData } from '../types/index'

export const useLoginStore = defineStore('login', {
  state: () => ({
  }),
  actions: {
    async logIn(userData: loginUserData): AxiosPromise {
      return await axios.post<responseData>('api/login/sign-in', userData)
    },
    async logOut() {
      return await axios.get('api/login/log-out')
    },
    async createNewUser(userData: registerUserData): AxiosPromise {
      return await axios.post<responseData>('api/login/sign-up', userData)
    }
  },
})