import { Component } from "vue"

export type Tool = {
  name: string,
  konvaName: string,
  id: string,
  x: number,
  y: number
}

export type ToolFromBar = {
  name: string,
  konvaName: string,
  component?: Component
  id?: string,
}

export type ToolConfig = {
  name: string,
  draggable: boolean,

  x?: number,
  y?: number,
  width?: number,
  height?: number,
  radius?: number,
  shadowBlur?: number,
  scaleX?: number,
  scaleY?: number,

  fill?: string,
  stroke?: string,
  dash?: number[],

  points?: number[],
  fillLinearGradientColorStops?: (number|string)[],
  fillLinearGradientStartPoint?: {x: number, y: number},
  fillLinearGradientEndPoint?: {x: number, y: number},

  tension?: number,
  closed?: boolean
}
