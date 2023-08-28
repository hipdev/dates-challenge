import findPairsByTotal from '@/lib/findPairsByTotal'

describe('findNumberPairs', () => {
  it('returns an empty array if no pairs are found', () => {
    const numbers = [1, 2, 3, 4, 5]
    const targetSum = 10
    const result = findPairsByTotal(numbers, targetSum)
    expect(result).toEqual([])
  })

  it('returns an array of number pairs that sum to the target', () => {
    const numbers = [1, 9, 5, 0, 20, -4, 12, 16, 7]
    const targetSum = 12
    const result = findPairsByTotal(numbers, targetSum)

    expect(result).toEqual([
      [12, 0],
      [16, -4],
      [7, 5],
    ])
  })

  it('returns an empty array when given an empty input list', () => {
    const numbers: number[] = []
    const targetSum = 5
    const result = findPairsByTotal(numbers, targetSum)
    expect(result).toEqual([])
  })

  it('returns an empty array when no numbers are provided', () => {
    const numbers: number[] = []
    const targetSum = 0
    const result = findPairsByTotal(numbers, targetSum)
    expect(result).toEqual([])
  })

  it('returns an empty array when target sum is 0', () => {
    const numbers = [1, 2, 3, 4, 5]
    const targetSum = 0
    const result = findPairsByTotal(numbers, targetSum)
    expect(result).toEqual([])
  })

  it('ignores pairs in reverse order', () => {
    const numbers = [1, 2, 3, 4, 5]
    const targetSum = 6
    const result = findPairsByTotal(numbers, targetSum)
    expect(result).toEqual([
      [1, 5],
      [2, 4],
    ])
  })
})
