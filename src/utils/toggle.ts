let timer: number

export const toggleSection = (event: MouseEvent) => {
  const toggler = event.target! as HTMLElement
  const toolsBar = document.getElementById('toolsBar') as HTMLElement

  toggler.classList.toggle('home__resizer-btn-rotated')
  toolsBar.classList.toggle('tools-bar-wide')

  const resizerBtn = document.querySelector('.home__resizer-btn') as HTMLElement
  resizerBtn.style.top = '50%'
}

export const setButtonPosition = (event: MouseEvent, setDefault: Boolean) => {
  const resizerBtn = document.querySelector('.home__resizer-btn') as HTMLElement

  if (setDefault) {
    resizerBtn.style.top = '50%'
    return
  }

  timer = setTimeout(() => {
    const resizer = event.target! as HTMLElement
  
    if (!resizer.classList.contains('home__resizer')) {
      return
    }
  
    const resizerHeight = resizer.clientHeight
    const buttonPosition = Math.round(100 * event.clientY / resizerHeight)
  
    resizerBtn.style.top = buttonPosition + '%'
  }, 100);
  // TODO: Set timeout if mouse 500 ms on elem
  //let timer = setTimeout(() => {}, 500);
  //clearTimeout(timer);
}
