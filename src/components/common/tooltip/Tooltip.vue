<script setup lang="ts">
import { PropType, ref } from 'vue'

import { Popper } from 'vue-use-popperjs'

import { useViewport } from '~/composables/useViewport'

export type TooltipPosition =
  | 'top-start' | 'top' | 'top-end'
  | 'right-start' | 'right' | 'right-end'
  | 'bottom-start' | 'bottom' | 'bottom-end'
  | 'left-start' | 'left' | 'left-end'

export type TooltipTrigger =
  | 'hover'
  | 'focus'
  | 'click-to-open';

export type TooltipDelay = {
  show?: number,
  hide?: number
}

// PROPS
const props = defineProps({
  trigger: { type: String as PropType<TooltipTrigger>, default: 'hover' },
  placement: { type: String as PropType<TooltipPosition>, default: 'bottom' },
  delay: { type: Object as PropType<TooltipDelay>, default: { show: 150, hide: 150 } },
  disabled: { type: Boolean, default: false },
  nudgeTop: { type: Number, default: 0 },
  nudgeRight: { type: Number, default: 0 },
  light: { type: Boolean, default: false },
  forceShow: { type: Boolean, default: false },
  classname: { type: String, default: '' },
  fullWidth: { type: Boolean, default: false },
})

// VARIABLES
const useTransition = ref(true);
const modifiers = [
  {
    name: 'offset',
    options: {
      offset: [0 - props.nudgeRight, 8 - props.nudgeTop],
    },
  },
  {
    name: 'flip',
    options: {
      enabled: false,
    },
  },
  {
    name: 'preventOverflow',
    options: {
      enabled: false,
      escapeWithReference: true,
      boundariesElement: 'viewport'
    }
  }
];

// COMPUTED
const { isMobile } = useViewport()

const trigger = computed((): TooltipTrigger => isMobile.value ? 'click-to-open' : props.trigger)
const delay = computed((): TooltipDelay => isMobile.value ? { show: 0, hide: 0 } : props.delay)

const width = computed((): string => props.fullWidth ? '100%' : 'fit-content')
</script>

<template>
  <Popper :reference-props="{ id: 'trigger', class: props.classname }" :popper-props="{ id: 'tooltip' }"
    :trigger="trigger" :disabled="props.disabled" :transition-props="useTransition ? { name: 'fade' } : undefined"
    :placement="props.placement" :modifiers="modifiers" :delay-on-mouseover="delay.show" :delay-on-mouseout="delay.hide"
    :force-show="props.forceShow" v-bind="$attrs">
    <template #reference>
      <span class="flex justify-center items-center">
        <slot name="trigger"></slot>
      </span>
    </template>
    <span class="tooltip__content pa-2 bg-black-700 text-base rounded" :class="{
      'bg-white-100 text-black-700': light,
      'bg-black-700 text-white-100': !light
    }">
      <slot />
      <div id="arrow" data-popper-arrow />
    </span>
  </Popper>
</template>

<style lang="scss">
#trigger {
  max-width: v-bind(width);
  width: v-bind(width);
}
</style>

<style lang="scss" scoped>
$arrowSize: 5px;

.tooltip {
  &__content {
    position: relative;
    display: flex;

    &::after {
      content: '';
      position: absolute;
      z-index: inherit;
    }

    &--top::after {
      top: -#{$arrowSize};
      left: calc(50% - #{$arrowSize / 1.25});
      width: 0;
      height: 0;
      border-left: $arrowSize solid transparent;
      border-right: $arrowSize solid transparent;
      border-bottom: $arrowSize solid #0F0F0F;
    }

    &--down::after {
      top: -#{$arrowSize};
      left: calc(50% - #{$arrowSize / 2});
      width: 0;
      height: 0;
      border-left: $arrowSize solid transparent;
      border-right: $arrowSize solid transparent;
      border-top: $arrowSize solid #0F0F0F;
    }

    &--right::after {
      width: 0;
      height: 0;
      border-top: $arrowSize solid transparent;
      border-bottom: $arrowSize solid transparent;
      border-left: $arrowSize solid 0F0F0F;
    }

    &--left::after {
      width: 0;
      height: 0;
      border-top: $arrowSize solid transparent;
      border-bottom: $arrowSize solid transparent;
      border-right: $arrowSize solid 0F0F0F;
    }
  }
}
</style>

