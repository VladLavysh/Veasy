import { Component } from "vue"

export type ToolEditItem = {
  _: null,
  configLabel: string,
  optionLabel: keyof ToolConfig,
  isHandler: boolean
}

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
  strokeWidth?: number,
  dash?: number[],

  image?: unknown,
  text?: string,
  fontFamily? : string,
  fontSize?: number,
  fontStyle?: string,
  fontVariant?: string,
  textDecoration?: string,
  align?: string,
  verticalAlign?: string

  points?: number[],
}

export type loginUserData = {
  email: string,
  password: string
}

export type registerUserData = {
  email: string,
  name: string,
  password: string,
  confirmPassword: string
}
