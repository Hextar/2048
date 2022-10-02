import { expect, it } from 'vitest'

import {
  colorValidator,
  variantValidator,
  sizeValidator,
  tagValidator
} from './validators'

import { UiVariant, UiColor, UiSize, UiTag } from '~/components/common/types'

it('colorValidator should return true if a correct color is passed', () => {
  expect(colorValidator(UiColor.PRIMARY)).toBe(true)
})

it('colorValidator should return false if a wrong color is passed', () => {
  expect(colorValidator('foo' as UiColor)).toBe(false)
})

it('variantValidator should return true if a correct variant is passed', () => {
  expect(variantValidator(UiVariant.FILLED)).toBe(true)
})

it('variantValidator should return false if a wrong variant is passed', () => {
  expect(variantValidator('foo' as UiVariant)).toBe(false)
})

it('sizeValidator should return true if a correct size is passed', () => {
  expect(sizeValidator(UiSize.SMALL)).toBe(true)
})

it('sizeValidator should return false if a wrong size is passed', () => {
  expect(sizeValidator('foo' as UiSize)).toBe(false)
})

it('tagValidator should return true if a correct tag is passed', () => {
  expect(tagValidator(UiTag.BUTTON)).toBe(true)
})

it('tagValidator should return false if a wrong tag is passed', () => {
  expect(tagValidator('foo' as UiTag)).toBe(false)
})
