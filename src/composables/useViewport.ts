import { computed, onMounted, onUnmounted, readonly, ref } from 'vue'

export enum VIEWPORT {
  MOBILE = 640,
  TABLET = 768,
  DESKTOP = 1024,
  LARGE_DESKTOP = 1440,
}

export const useViewport = () => {
  // VARIABLES
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  // COMPUTED
  const isMobile = computed<boolean>(() => width.value <= VIEWPORT.MOBILE)
  const isTablet = computed<boolean>(() => width.value > VIEWPORT.MOBILE && width.value <= VIEWPORT.TABLET)
  const isDesktop = computed<boolean>(() => width.value > VIEWPORT.TABLET && width.value <= VIEWPORT.DESKTOP)
  const isLargeDesktop = computed<boolean>(() => width.value > VIEWPORT.DESKTOP)

  const aboveMobile = computed<boolean>(() => width.value > VIEWPORT.MOBILE)
  const aboveTablet = computed<boolean>(() => width.value > VIEWPORT.TABLET)
  const aboveDesktop = computed<boolean>(() => width.value > VIEWPORT.DESKTOP)

  const belowTablet = computed<boolean>(() => width.value <= VIEWPORT.TABLET)
  const belowDesktop = computed<boolean>(() => width.value <= VIEWPORT.DESKTOP)
  const belowLargeDesktop = computed<boolean>(() => width.value <= VIEWPORT.LARGE_DESKTOP)

  // METHODS
  const handleResize = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  // ON MOUNTED
  onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  })

  // ON UNMOUNTED
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    width: readonly(width),
    height: readonly(height),
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    aboveMobile,
    aboveTablet,
    aboveDesktop,
    belowTablet,
    belowDesktop,
    belowLargeDesktop,
  }
}
