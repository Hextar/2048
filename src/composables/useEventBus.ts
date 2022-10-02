import { ref } from "vue"

const bus = ref(new Map())

export enum EVENT_BUS_MESSAGES {
  NEW_GAME = 0
}

export const useEventBus = () => {
  const evenBustEmit = (event, ...args) => {
    bus.value.set(event, args);
  }

  return {
    evenBustEmit,
    bus
  }
}