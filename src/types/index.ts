import { Component } from "vue"
import type { UploadFileInfo } from 'naive-ui'

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

export type ActiveTools = {
  name: string,
  id: string,
}

export type ToolConfig = {
  name: string,
  konvaName: string,
  id: string,

  draggable: boolean,
  rotation: number,

  strokeScaleEnabled: Boolean

  x?: number,
  y?: number,
  scaleX?: number,
  scaleY?: number,

  width?: number,
  height?: number,
  radius?: number,
  cornerRadius?: number,

  fill?: string,
  stroke?: string,
  strokeWidth?: number,
  dash?: number[],

  image?: HTMLImageElement,
  text?: string,
  fontFamily?: string,
  fontSize?: number,
  fontStyle?: string,
  fontVariant?: string,
  textDecoration?: string,
  align?: string,
  verticalAlign?: string

  points?: number[],
}

export type ToolShadowConfig = {
  width: number,
  height: number,
  x: number | null,
  y: number | null
  rotation: number,
  fill: '#56e398',
  opacity: 0.5,
  stroke: '#37ba74',
  strokeWidth: 2,
  dash: [15, 2]
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

export type UploadImage = {
  file: UploadFileInfo,
  fileList: UploadFileInfo[]
}

export type responseData = {
  status: boolean,
  output: string
}