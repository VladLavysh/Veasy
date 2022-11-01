import { Tool, ToolConfig } from '../types';
import {shapeConfig, addToCanvas, handleTransformEnd, handleStageMouseDown} from '../utils/ts/canvas'

describe('Canvas functions', () => {
  let tool: Tool
  let toolConfig: ToolConfig

  beforeAll(() => {
    tool = {
      name: "Circle_123",
      konvaName: 'Circle',
      id: '1-2csadas-12_22',
      x: 10,
      y: 10,
    }
  });
  
  test('Shape config', () => {
    expect(shapeConfig(tool)).toMatchObject(toolConfig);

    //expect(shapeConfig)
    //  .toHaveBeenCalledWith(
    //    expect.objectContaining({
    //      name: expect.any(String),
    //      konvaName: expect.any(String),
    //      id: expect.any(String),
    //      x: expect.any(Number),
    //      y: expect.any(Number),
    //    }),
    //  )
      //.
  })

  afterAll(() => {
    tool = {
      name: '',
      konvaName: '',
      id: '',
      x: 0,
      y: 0,
    }
  });
})
