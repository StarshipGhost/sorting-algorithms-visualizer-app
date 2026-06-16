import type {ElementProps, TreeNodeProps} from '../utils/types'

function swap(elements: ElementProps[], i: number, j: number) {
  const tempValue = elements[i].value
  elements[i] = {...elements[i], value: elements[j].value}
  elements[j] = {...elements[j], value: tempValue}
}

function partition(A: ElementProps[], low: number, high: number): number {
  const pivot = Math.floor((low + high) / 2)
  swap(A, pivot, high)

  let i = low
  let j = high - 1

  while (i <= j) {
    while (i <= j && A[i].value < A[high].value) {
      i++
    }
    while (i <= j && A[j].value > A[high].value) {
      j--
    }
    if (i < j) {
      swap(A, i, j)
      i++
      j--
    }
  }
  swap(A, i, high)
  return i
}

export function buildTree(A: number[]) {
  const elements = A.map((element, index) => {
    return {value: element, elementIndex: index, translate: 0, visible: true, state: undefined}
  })

  const generateId = (current: TreeNodeProps | null) => {
    let id = 1

    const queue = []
    queue.push(current)

    while (queue.length > 0) {
      const node: TreeNodeProps | null | undefined = queue.shift()
      if (node) {
        node.id = id++
        if (node.left) {
          queue.push(node.left)
        }
        if (node.right) {
          queue.push(node.right)
        }
      }
    }
  }
  function buildTreeHelper(elements: ElementProps[], root: TreeNodeProps | null, low: number, high: number): TreeNodeProps | null {
    if (low > high) return null

    const elementCopy = structuredClone(elements.slice(low, high + 1))
    const pivot = partition(elements, low, high)
    if (!root) {
      root = {
        id: -1,
        visualizerData: {
          A: elementCopy,
          low: {index: low, position: 0, visible: false},
          high: {index: high - 1, position: 0, visible: false},
          pivot: pivot,
        },
        left: null,
        right: null,
        visible: false,
      }
    }

    root.left = buildTreeHelper(elements, root.left, low, pivot - 1)
    root.right = buildTreeHelper(elements, root.right, pivot + 1, high)

    return root
  }

  const root = buildTreeHelper(elements, null, 0, elements.length - 1)
  generateId(root)

  return root
}
