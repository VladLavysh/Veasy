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
  konvaName: string,
  id: string,

  draggable: boolean,
  rotation: number,

  x?: number,
  y?: number,
  scaleX?: number,
  scaleY?: number,

  width?: number,
  height?: number,
  radius?: number,

  fill?: string,
  stroke?: string,
  dash?: number[],

  points?: number[],
}
