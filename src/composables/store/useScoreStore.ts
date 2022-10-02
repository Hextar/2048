import { defineStore } from 'pinia'

export const useScoreStore = defineStore('score', {
  state: () => ({
    score: 0,
    maxScore: 0,
  }),
  actions: {
    setScore (val: number) {
      this.score = val
      this.maxScore = Math.max(this.maxScore, val)
    },
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, paths: ['maxScore'] },
    ],
  }
})