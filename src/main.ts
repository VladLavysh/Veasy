import { createApp } from 'vue'
import naive from 'naive-ui'
import App from './App.vue'

import 'vfonts/Lato.css'
import './style.css'

createApp(App)
  .use(naive)
  .mount('#app')

