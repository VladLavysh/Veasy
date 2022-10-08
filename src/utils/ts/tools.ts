// TODO: REFACTORING COMPONENTS TO LAZY LOAD!
import { TextSelection, Image, Checkbox, Barrier, ChevronRight, CircleDash } from '@vicons/carbon'


export const toolsBarItems = [
  { name: 'Text input', konvaName: 'v-text', component: TextSelection },
  // ALL FIELDS BELOW ARE TEXT !!!
  //{ name: 'Code', konvaName: '', component: Code },
  //{ name: 'List', konvaName: '', component: List },
  //{ name: 'Link', konvaName: '', component: Link },
  { name: 'Container', konvaName: 'v-rect', component: Checkbox },
  { name: 'Circle', konvaName: 'v-circle', component: CircleDash },
  { name: 'Image', konvaName: 'v-image', component: Image },
  { name: 'Barrier', konvaName: 'v-line', component: Barrier },
  { name: 'Arrow', konvaName: 'v-path', component: ChevronRight },
]
