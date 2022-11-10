import { defineStore } from 'pinia'
import axios from 'axios'
import { loginUserData, registerUserData } from '../types/index'

export const useLoginStore = defineStore('login', {
  state: () => ({
  }),
  actions: {
    logIn(userData: loginUserData) {
        console.log('Login', userData);
    },
    createNewUser(userData: registerUserData) {
        console.log('Create new user', userData);
    }
  },
})