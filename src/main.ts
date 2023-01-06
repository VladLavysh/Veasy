import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import naive from 'naive-ui'
import VueKonva from 'vue-konva';

import 'vfonts/Lato.css'
import './style.css'

// New Vue store
const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(naive)
  .use(VueKonva)
  .mount('#app')
