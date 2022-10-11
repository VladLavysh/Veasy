import { Component } from "vue"

export type Tool = {
  name: String,
  konvaName: String,
  id: String,
  x: number,
  y: number
}

export type ToolFromBar = {
  name: String,
  konvaName: String,
  component?: Component
  id?: String,
}

export type ToolConfig = {
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
