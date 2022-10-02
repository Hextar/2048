export type Cell = {
  row: number,
  col: number,
  value: number,
}

/**
 * flat a 2d array into a monodimensional array
 * @param gameMatrix, 2d array input
 */
export const flattenMatrix = (gameMatrix: number[][]): Cell[] => {
  if (!gameMatrix) { return [] }
  return gameMatrix
    .reduce((accRow, valueRow, idxRow) => {
      const cols = valueRow
        .reduce((accCol, valueCol, idxCol) => {
          return [...accCol, { row: idxRow, col: idxCol, value: valueCol }]
        }, <Cell[]>[])
      return [...accRow, ...cols]
    }, <Cell[]>[])
}

export const slideMatrixBottom = (
  gameMatrix: number[][],
  rows: number,
  cols: number
): void => {
  if (!gameMatrix) { return }
  for (let idxRow = rows - 1; idxRow >= 0; idxRow--) {
    gameMatrix[idxRow]
      .forEach((c, idxCol) => {
        if (c > 0) {
          gameMatrix[idxRow][idxCol] = 0
          gameMatrix[Math.max(0, idxRow - 1)][idxCol] = c
        }
      })
  }
}

