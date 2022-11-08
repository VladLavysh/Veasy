import { Tool, ToolConfig } from '../types';
import {shapeConfig, addToCanvas, handleTransformEnd, handleStageMouseDown} from '../utils/ts/canvas'

describe('Tool config', () => {
  let tool: Tool
  let toolConfig: ToolConfig

  test('Type is correct object', () => {
    tool = {
      name: "Circle_123",
      konvaName: 'Circle',
      id: '1-2csadas-12_22',
      x: 10,
      y: 10,
    }
    toolConfig = shapeConfig(tool)

    expect(toolConfig && typeof toolConfig === 'object').toBe(true)
  })

  test('Have default values', () => {
    const defaultValues = ['name', 'konvaName', 'id', 'draggable', 'rotation']
    const haveDefaultValues = defaultValues.every(val => val in toolConfig)

    expect(haveDefaultValues).toBe(true)
  })
})

// describe('Add new tool', () => {
//   let tool: Tool
//   let toolConfig: ToolConfig
// })
