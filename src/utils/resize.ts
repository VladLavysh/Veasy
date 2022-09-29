let isResizing = false
let leftElement: HTMLElement
let rightElement: HTMLElement
let resizer: EventTarget
let startCoord: number

export const startResize = (leftElem: any, rightElem: any, event: MouseEvent) => {
  if (!leftElement || !rightElement || !resizer) {
    leftElement = leftElem.$el
    rightElement = rightElem.$el
    resizer = event.target
  }

  startCoord = event.clientX

  isResizing = true
}

export const resize = (event: MouseEvent) => {
  if (!isResizing) return

  //const coords = event.clientX - startCoord
  //resizer.style.transform = `translateX(${coords}px)`
  console.log('leftElement.style', leftElement.offsetWidth);
  
  const width = leftElement.offsetWidth + (event.clientX - startCoord)
  leftElement.style.width = width + 'px'

  console.log('width', width);
  
  console.log('move', event.clientX);
}

export const endResize = (event: MouseEvent) => {
  console.log('end', event.clientX);

  isResizing = false
}