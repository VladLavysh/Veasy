import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import VueKonva from 'vue-konva';

import 'vfonts/Lato.css'
import './style.css'

createApp(App)
  .use(naive)
  .use(VueKonva)
  .mount('#app')

