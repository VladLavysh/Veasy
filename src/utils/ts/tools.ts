// TODO: REFACTORING COMPONENTS TO LAZY LOAD!
import { TextSelection, Image, Checkbox, Barrier, ChevronRight, CircleDash } from '@vicons/carbon'
import { readonly, markRaw } from 'vue'

// ----- Tools bar ----- //
export const toolsBarItems = readonly([
  { name: 'Text input', konvaName: 'v-text', component: markRaw(TextSelection) },
  // ALL FIELDS BELOW ARE TEXT !!!
  //{ name: 'Code', konvaName: '', component: Code },
  //{ name: 'List', konvaName: '', component: List },
  //{ name: 'Link', konvaName: '', component: Link },
  { name: 'Container', konvaName: 'v-rect', component: markRaw(Checkbox) },
  { name: 'Circle', konvaName: 'v-circle', component: markRaw(CircleDash) },
  { name: 'Image', konvaName: 'v-image', component: markRaw(Image) },
  { name: 'Barrier', konvaName: 'v-line', component: markRaw(Barrier) },
  { name: 'Arrow', konvaName: 'v-path', component: markRaw(ChevronRight) },
])

// ----- Tool editor ----- //
export const borderTypes = readonly([
  {
    label: 'solid',
    value: [0, 0]
  },
  {
    label: 'dashed',
    value: [5, 5]
  }
])

//export const customSelectLabel = (option: SelectOption): VNodeChild => {
//  return [
//    h(
//      NIcon,
//      {
//        style: {
//          verticalAlign: '-0.15em',
//          marginRight: '4px'
//        }
//      },
//      {
//        default: () => h('Unlocked')
//      }
//    ),
//    option.label as string
//  ]
//}
