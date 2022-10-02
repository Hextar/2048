import { ref } from "vue"

import { useScoreStore } from '~/composables/store/useScoreStore'
import { useSettingsStore } from '~/composables/store/useSettingsStore'
import { Cell, flattenMatrix, slideMatrixBottom } from '~/utils/matrix'

export enum GAME_VALUES {
  'OBSTACLE' = -1,
  'EMPTY' = 0,
  'VAL_2' = 2,
  'VAL_4' = 4,
  'VAL_8' = 8,
  'VAL_16' = 16,
  'VAL_32' = 32,
  'VAL_64' = 64,
  'VAL_128' = 128,
  'VAL_256' = 256,
  'VAL_512' = 512,
  'VAL_1024' = 1024,
  'VAL_2048' = 2048,
}

const VALID_DIRECTIONS = ['UP', 'RIGHT', 'DOWN', 'LEFT']

export const useGame = () => {
  const { setScore } = useScoreStore()
  const { rows, cols } = useSettingsStore()

  // we keep the status of the current game in
  // the following 2d number array
  const gameMatrix = ref<number[][]>([[]])

  // we keep a copy of the flattened game matrix
  // as that's used to calculate the gameMaxValue,
  // gameScore and emptyCells, therefore for every game
  // turn we're flattening the map once instead of
  // multiple times
  const flatGameMatrix = ref<Cell[]>([])

  /**
   * game board number of rows
   */
  const gameRows = computed<number>(() => rows)

  /**
   * game board number of cols
   */
  const gameCols = computed<number>(() => cols)

  /**
   * max values within the game board
   */
  const gameMaxValue = computed<number>(() =>
    Math.max.apply(Math, flatGameMatrix.value
      .map(({ value }) => value))
  )

  /**
   * sum of all values within the game board
   */
  const gameScore = computed<number>(() =>
    flatGameMatrix.value
      .reduce((acc, { value }) => acc += value, 0)
  )

  /**
   * all empty cells. mostly used to decide where
   * to spwan new filled cells
   */
  const emptyCells = computed<Cell[]>(() =>
    flatGameMatrix.value
      .filter(({ value }) => value === 0)
  )

  /**
   * all filled cells
   */
  const filledCells = computed<Cell[]>(() =>
    // we're not using the flatGameMatrix support ref here
    // to avoid the Cell component being recreated, therefore
    // just playing the appear animation instead of the slide
    flattenMatrix(gameMatrix.value)
       .filter(({ value }) => value > 0)
   )

  /**
   * retrieve a cell value using 2d coords
   * @param row, row index of the game matrix
   * @param col, col index of the game matrix
   */
  const cellValue = (row = 0, col = 0): string => {
    const value = (gameMatrix.value || [[]])[row][col]
    return value > 0 ? `${value}` : ''
  }

  /**
   * get a random new number.
   * bigger numbers have a small chance of appearing within the game matrix
   * and you cannot get a number greater than the max value within the game matrixc
   */
  const newNumber = (): number => {
    var extraction = Math.random() * 100
    if (extraction < 60 || gameMaxValue.value < GAME_VALUES.VAL_4) {
      return GAME_VALUES.VAL_2
    } else if (extraction < 90 || gameMaxValue.value < GAME_VALUES.VAL_8) {
      return GAME_VALUES.VAL_4
    } else if (extraction < 98 || gameMaxValue.value < GAME_VALUES.VAL_16) {
      return GAME_VALUES.VAL_8
    } else {
      return GAME_VALUES.VAL_16
    }
  }

  /**
   * Add a random number to the game matrix
   */
  const addRandomNumber = (): void => {
    if (!gameMatrix.value) { return }

    // get random empty cell
    const randomCell = emptyCells.value
      [Math.floor((Math.random() * emptyCells.value.length))]
      
    // add random value to that cell
    const _ = newNumber()
    gameMatrix.value[randomCell.row][randomCell.col] = _
  }

  /**
   * reset the game matrix to a 0 filled 2d array
   */
  const resetGameMatrix = (): void => {
    gameMatrix.value = Array(rows).fill(GAME_VALUES.EMPTY)
      .map(()=> Array(cols).fill(GAME_VALUES.EMPTY))
  }

  /**
   * start the game, resetting the game matrix,
   * adding 2 new numbers (can only be 2s at this moment)
   */
  const startGame = (): void => {
    resetGameMatrix()
    addRandomNumber()
    nextTick(() => addRandomNumber())
  }

  /**
   * execute a move for the current turn
   * @param direction, UP | RIGHT | DOWN | LEFT decided by the user
   * using a keyboard stroke
   * @param initial 
   */
  const slide = (direction: 'UP' | 'RIGHT' | 'DOWN' | 'LEFT') => {
    if (!gameScore.value) { return }
    if (!direction || !VALID_DIRECTIONS.includes(direction)) { return }
    slideMatrixBottom(gameMatrix.value, gameRows.value, gameCols.value)
    setScore(gameScore.value)
  }

  // every time the game matrix the flat game matrix and 
  // the game store are updated
  watch(() => gameMatrix.value, (val: number[][]) => {
    if (!val) { flatGameMatrix.value = [] }
    flatGameMatrix.value = flattenMatrix(val)
    setScore(gameScore.value)
  }, { deep: true })

  // until the game doesn't starts the user
  // is shown an empty game board
  onBeforeMount(() => {
    resetGameMatrix()
  })

  return {
    gameMatrix,
    gameRows,
    gameCols,
    filledCells,
    cellValue,
    startGame,
    slide,
  }
}