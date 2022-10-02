<script setup lang='ts'>
import { vOnClickOutside } from '@vueuse/components'

// PROPS
const props = defineProps({
  separatorIdx: { default: -1, type: Number },
})

// VARIABLES
const menuWrapper = ref<HTMLDivElement>()

// ON MOUNTED
onMounted((): void => setSeperator())

const setSeperator = (): void => {
  if (props.separatorIdx === -1) { return }

  const childs = Array.from((menuWrapper.value as any).children)
  const seperatorElement = document.createElement('div')
  seperatorElement.classList.add('list--seperator')
  childs.splice(props.separatorIdx, 0, seperatorElement)
  childs.forEach(c => { (menuWrapper.value as any).appendChild(c) })
}
</script>

<template>
  <div ref="menuWrapper" class="popup-menu absolute pa-1 w[fit-content] h-auto cursor-pointer rounded-md"
    v-on-click-outside="(e: Event) => $emit('click:outside', e)">
    <div class="popup-menu__wrapper">
      <slot />
    </div>
  </div>
</template>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="scss">
.list--seperator {
  display: inline-block;
  width: calc(100% + 8px);
  height: 1px;
  background: transparent;
  margin: 4px 0px 4px -4px;
}
</style>

<style lang='scss' scoped>
.popup-menu {
  display: block;
  border-radius: 4px;
  background: rgba(0, 0, 0, .75);

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto-fit, min-content);
    grid-row-gap: 2px;

    padding: 4px;
  }
}
</style>
