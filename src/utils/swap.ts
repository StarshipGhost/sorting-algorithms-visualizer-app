import type {ElementProps} from './types'

export function swap(elements: ElementProps[], i: number, j: number) {
  const tempValue = elements[i].value
  elements[i] = {...elements[i], value: elements[j].value}
  elements[j] = {...elements[j], value: tempValue}
}
