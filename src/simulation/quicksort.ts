import type {ClassValueProps, ElementProps, TreeNodeProps, VisualizerProps} from '../utils/types'

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

export function buildQuickSortTree(A: number[]): TreeNodeProps | null {
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
  function buildQuickSortTreeHelper(elements: ElementProps[], root: TreeNodeProps | null, low: number, high: number): TreeNodeProps | null {
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

    root.left = buildQuickSortTreeHelper(elements, root.left, low, pivot - 1)
    root.right = buildQuickSortTreeHelper(elements, root.right, pivot + 1, high)

    return root
  }

  const root = buildQuickSortTreeHelper(elements, null, 0, elements.length - 1)
  generateId(root)

  return root
}

function mutateArray(current: TreeNodeProps | null, id: number, i: number, j: number) {
  if (!current?.visible) return

  const {A} = current.visualizerData

  const i1 = A.findIndex((element) => element.elementIndex === i)
  const i2 = A.findIndex((element) => element.elementIndex === j)
  if (i1 !== -1 && i2 !== -1) swap(A, i1, i2)

  mutateArray(current.left, id, i, j)
  mutateArray(current.right, id, i, j)
}

export function generateQuickSortSteps(A: number[]): VisualizerProps {
  const originalRoot = buildQuickSortTree(A)
  const rootCopy: TreeNodeProps | null = originalRoot
  const generatedSteps: (TreeNodeProps | null)[] = []
  const messages: string[] = ["Here's a visualization of the entire Quicksort process."]
  const QUICKSORT_STYLES: ClassValueProps = {
    cellContainerClass: {highlight: 'text-white bg-green-400/40', processing: 'text-white bg-blue-400/40', processed: 'animate-processed'},
    cellClass: [],
    animationClass: {slide: 'animate-slide', visibility: {show: 'opacity-100', hidden: 'opacity-0'}, transition: 'transition-colors duration-450'},
  }

  const visualizer: VisualizerProps = {
    steps: generatedSteps,
    messages: messages,
    classValues: QUICKSORT_STYLES,
  }

  const saveStep = () => {
    generatedSteps.push(structuredClone(originalRoot))
  }

  function generateQuickSortStepsHelper(current: TreeNodeProps | null) {
    if (!current) return

    const {A, low, high} = current.visualizerData
    current.visible = true

    let i = 0
    let j = A.length - 2

    if (j < i) {
      A[i].state = 'processed'
      messages.push('The current sublist contains a single element which means it is sorted')
      saveStep()
      return
    }

    if (low && high) {
      const end = j + 1
      const mid = Math.floor((i + end) / 2)
      A[mid].state = 'processing'
      saveStep()
      messages.push('Select the pivot')
      mutateArray(originalRoot, current.id, A[mid].elementIndex, A[end].elementIndex)
      A[mid].state = undefined
      A[end].state = 'processing'
      saveStep()
      messages.push('Move the pivot the end.')

      low.visible = true
      high.visible = true
      saveStep()
      messages.push('Partition the subarray.')

      while (i <= j) {
        messages.push('Move the left bound to the right until it reaches a value greater than or equal to the pivot.')
        saveStep()
        while (i <= j && A[i].value < A[end].value) {
          i++
          low.position = Math.min((1 + high.index - low.index) * 48, low.position + 48)
          saveStep()
          messages.push('Step right.')
        }
        if (i < end) {
          A[i].state = 'highlight'
        }
        messages.push('That is as far as we go this round.')
        saveStep()
        messages.push('Move the right bound to the left until it reaches a value lesser than the pivot.')
        saveStep()
        while (i <= j && A[j].value > A[end].value) {
          j--
          high.position = Math.max((low.index - high.index) * 48, high.position - 48)
          saveStep()
          messages.push('Step left.')
        }
        if (i < j) {
          A[j].state = 'highlight'
          messages.push('That is as far as we go this round.')
          saveStep()
          mutateArray(originalRoot, current.id, A[i].elementIndex, A[j].elementIndex)
          saveStep()
          messages.push('Swap the selected values.')
          A[i].state = undefined
          A[j].state = undefined
        } else {
          A[i].state = undefined
          messages.push('Bounds have crossed.')
          saveStep()
          high.visible = false
          saveStep()
          messages.push(
            'When the right bound crosses the left bound, all elements to the left bound are less than the pivot and all elements to the right are greater than or equal to the pivot.',
          )
        }
      }
      mutateArray(originalRoot, current.id, A[i].elementIndex, A[end].elementIndex)
      A[end].state = undefined
      A[i].state = 'processed'
      low.visible = false
      saveStep()
      messages.push('Move the pivot the its final location.')
    }
    generateQuickSortStepsHelper(current.left)
    generateQuickSortStepsHelper(current.right)
  }

  if (originalRoot) originalRoot.visible = true

  saveStep()
  generateQuickSortStepsHelper(rootCopy)

  return visualizer
}
