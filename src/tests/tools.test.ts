import {normalizeTextConfigLabel} from '../utils/ts/tools'

describe('Tool utils', () => {
  test('Normalize label', () => {
    const normalizedLabel = normalizeTextConfigLabel('Horizontal Align')

    expect(typeof normalizedLabel).toBe('string')
  })
})
