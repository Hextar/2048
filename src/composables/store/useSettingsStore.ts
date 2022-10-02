import { defineStore } from 'pinia'

const MIN_ROWS = 2
const MAX_ROWS = 6
const MIN_COLS = 2
const MAX_COLS = 6
const MAX_OBSTACLES = 4

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    rows: 4,
    cols: 4,
    obstacles: 0,
  }),
  actions: {
    setRow (val: number) {
      this.rows = Math.max(MIN_ROWS, Math.min(val, MAX_ROWS))
    },
    setCol (val: number) {
      this.rows = Math.max(MIN_COLS, Math.min(val, MAX_COLS))
    },
    setObstacles (val: number) {
      this.rows = Math.min(val, MAX_OBSTACLES)
    },
  },
})