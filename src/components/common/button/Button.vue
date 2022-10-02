<script setup lang="ts">
import { computed, PropType, useAttrs, useSlots } from 'vue'

import {
  colorValidator,
  sizeValidator,
  tagValidator,
  variantValidator,
} from '~/components/common/validators'
import { UiColor, UiSize, UiTag, UiVariant } from '~/components/common/types';

import { getIconPosition } from './useIconPosition'

// PROPS
const props = defineProps({
  primary: { type: Boolean, default: false },
  color: { type: String as PropType<UiColor | string | null>, default: 'white', validator: colorValidator },
  variant: { type: String as PropType<UiVariant | string | null>, default: 'outline', validator: variantValidator },
  size: { type: String as PropType<UiSize | string | null>, default: 'medium', validator: sizeValidator },
  tag: { type: String as PropType<UiTag | string | null>, default: 'button', validator: tagValidator },
  fullWidth: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  tooltip: { type: String, default: undefined },
})

// USE
const attrs = useAttrs()
const slots = useSlots()

// COMPUTED
const padding = computed((): number => {
  const { class: className } = attrs
  const c = `${className}`
  if (c.includes('pa-') || c.includes('px-'))
    return -1

  else if (props.size === UiSize.SMALL)
    return 4

  return 8
})

const fontSize = computed((): string => {
  if (props.size === UiSize.SMALL)
    return 'text-sm'

  else if (props.size === UiSize.MEDIUM)
    return 'text-md'

  return 'text-xl'
})

const hasPrefix = computed((): boolean => !!slots['prefix-icon'])

const hasSuffix = computed((): boolean => !!slots['suffix-icon'])

const iconPosition = computed((): string =>
  getIconPosition(hasPrefix.value, hasSuffix.value),
)
</script>

<template>
  <Tooltip :disabled="!tooltip" :full-width="fullWidth">
    <template #trigger>
      <component :is="props.tag" class="button flex items-center justify-center rounded-md" :class="{
        [`px-${padding}`]: padding > 0,
        [`button--size--${props.size}`]: true,
        [`button--full-width`]: fullWidth,
        [`button--color--${props.color}`]: true,
        [`button--variant--${props.variant}`]: true,
        [`button--icon--${iconPosition}`]: true,
      }" :disabled="!!props.disabled || undefined" v-bind="$attrs">
        <span v-if="hasPrefix" class="button__slot">
          <slot name="prefix-icon" />
        </span>
        <span class="button__label font-body" :class="`button__label--icon--${iconPosition} ${fontSize}`">
          <slot />
        </span>
        <span v-if="hasSuffix" class="button__slot">
          <slot name="suffix-icon" />
        </span>
      </component>
    </template>
    <span>{{ tooltip }}</span>
  </Tooltip>
</template>

<style lang="scss" scoped>
@import './assets/style/index.scss';

.button {
  position: relative;
  transition: background-color 250ms ease;

  &--full-width {
    width: 100%
  }

  &.button--size {
    @each $key in map-keys($sizes) {
      $size: map-get($sizes, $key);
      $height: map-get($size, 'height');

      &--#{'' + $key} {
        &.button {
          $height: map-get($size, 'height');
          $icon: map-get($size, 'slot-icon');
          $shortcut: map-get($size, 'slot-shortcut');
          $m: map-get($size, 'margin');

          &--icon {
            .button__label {
              @include row--center;
              height: $height;
              text-align: center;

              &--left {
                margin-left: $m;
              }

              &--right {
                margin-right: $m;
              }

              &--both {
                margin: 0 $m;
              }

              &--none {
                margin: 0;
              }
            }
          }

          .button__slot {
            @include row--center;

            // used to override a svg/shortcut size
            :deep(svg) {
              height: $icon;
              width: $icon;
            }
          }
        }
      }
    }
  }
}
</style>
