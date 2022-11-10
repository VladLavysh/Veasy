import { TextSelection, Image, Checkbox, Barrier, ChevronRight, CircleDash, TextItalic, TextBold, TextStrikethrough, TextUnderline, AlignHorizontalLeft, AlignHorizontalCenter, AlignHorizontalRight, AlignVerticalTop, AlignVerticalCenter, AlignVerticalBottom} from '@vicons/carbon'
import { readonly, markRaw } from 'vue'
import { ToolConfig } from '../../types'

// ----- Tools bar ----- //
export const toolsBarItems = readonly([
  { name: 'Text input', konvaName: 'v-text', component: markRaw(TextSelection) },
  // ALL FIELDS BELOW ARE TYPE OF TEXT !!!
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

export const textConfig = readonly([
  {
    label: 'Font family',
    options: [
      {label: 'Arial', value: 'arial'},
      {label: 'Serif', value: 'serif'},
      {label: 'Cursive', value: 'cursive'},
      {label: 'Fantasy', value: 'fantasy'},
      {label: 'Monospace', value: 'monospace'},
    ]
  },
  {
    label: 'Font style',
    options: [
      {label: 'bold', value: markRaw(TextBold)},
      {label: 'italic', value: markRaw(TextItalic)}
    ]
  },
  {
    label: 'Text decoration',
    options: [
      {label: 'line-through', value: markRaw(TextStrikethrough)},
      {label: 'underline', value: markRaw(TextUnderline)}
    ]
  },
  {
    label: 'Horizontal align',
    options: [
      {label: 'left', value: markRaw(AlignHorizontalLeft)},
      {label: 'center', value: markRaw(AlignHorizontalCenter)},
      {label: 'right', value: markRaw(AlignHorizontalRight)}
    ]
  },
  {
    label: 'Vertical align',
    options: [
      {label: 'top', value: markRaw(AlignVerticalTop)},
      {label: 'center', value: markRaw(AlignVerticalCenter)},
      {label: 'bottom', value: markRaw(AlignVerticalBottom)}
    ]
  }
])

export const normalizeTextConfigLabel = (label: string): keyof ToolConfig => {
  const splittedLabel = label.toLowerCase().split(' ')

  if (label === 'Horizontal align') {
    return splittedLabel[1].toString() as keyof ToolConfig
  }  

  const lastWord = splittedLabel[1].slice(0, 1).toUpperCase() +
                   splittedLabel[1].slice(1, splittedLabel[1].length)

  return splittedLabel[0] + lastWord as keyof ToolConfig
}

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
