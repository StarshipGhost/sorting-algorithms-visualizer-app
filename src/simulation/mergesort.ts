import type {ElementProps, TreeNodeProps, VisualizerProps} from '../utils/types'

export function buildTree(A: number[]): TreeNodeProps {
  const elements: ElementProps[] = A.map((value, index) => {
    return {value: value, elementIndex: index, position: 0, visible: true}
  })
  const root: TreeNodeProps = {id: -1, visualizerData: {A: elements}, left: null, right: null, visible: true}

  const generateId = (root: TreeNodeProps | null) => {
    const queue: (TreeNodeProps | null)[] = [root]
    let id = 1

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

  function buildTreeHelper(A: ElementProps[], root: TreeNodeProps): TreeNodeProps | null {
    if (A.length <= 1) {
      return null
    }

    const middle = Math.floor(A.length / 2)
    const left = A.slice(0, middle)
    const right = A.slice(middle)

    root.left = {id: -1, visualizerData: {A: structuredClone(left)}, left: null, right: null, visible: false}
    buildTreeHelper(left, root.left)
    root.right = {
      id: -1,
      visualizerData: {A: structuredClone(right)},
      left: null,
      right: null,
      visible: false,
    }
    buildTreeHelper(right, root.right)

    return root
  }

  buildTreeHelper(elements, root)
  generateId(root)

  return root
}

function toggleNodeVisibility(node: TreeNodeProps | null, id: number) {
  if (!node) return

  if (node.id === id) {
    node.visible = !node.visible
  }
}

function toggleElementVisibility(node: TreeNodeProps | null, id: number, index: number) {
  if (!node) return

  if (node.id === id) {
    node.visualizerData.A[index].visible = !node.visualizerData.A[index].visible
  }
}

function sort(A: ElementProps[]) {
  function swap(i: number, j: number) {
    const temp = A[i].value
    A[i].value = A[j].value
    A[j].value = temp
  }

  for (let i = 1; i < A.length; i++) {
    for (let j = i; j > 0; j--) {
      if (A[j - 1].value > A[j].value) {
        swap(j - 1, j)
      }
    }
  }
}

export function generateSteps(root: TreeNodeProps | null) {
  const rootCopy: TreeNodeProps | null = root
  const generatedSteps: (TreeNodeProps | null)[] = []
  const messages: string[] = ['']
  const visualizer: VisualizerProps = {
    steps: generatedSteps,
    messages: messages,
  }

  const saveStep = () => {
    generatedSteps.push(structuredClone(root))
  }

  const select = (node: TreeNodeProps) => {
    if (node.left && node.right) {
      node.visualizerData.A.forEach((n) => (n.state = 'highlight'))
      messages.push('Select the entire array')
    } else {
      node.visualizerData.A.forEach((n) => (n.state = 'processed'))
      messages.push('An array of length 1 cannot be split, ready for merge')
    }
    saveStep()
    node.visualizerData.A.forEach((n) => (n.state = undefined))
  }

  const split = (node: TreeNodeProps) => {
    if (node.left && node.right) {
      messages.push('Split the array as evenly as possible')
      toggleNodeVisibility(node.left, node.left.id)
      toggleNodeVisibility(node.right, node.right.id)
      saveStep()
    }
  }

  const selectMin = (child: TreeNodeProps, index: number) => {
    child.visualizerData.A[index].state = 'processing'
    saveStep()
  }
  const addSelectedToMergedArray = (node: TreeNodeProps, child: TreeNodeProps, index: number, mergedIndex: number) => {
    messages.push('Add the selected value to the sorted array')
    child.visualizerData.A[index].state = undefined
    toggleElementVisibility(child, child.id, index)
    node.visualizerData.A[mergedIndex].state = 'processing'
    toggleElementVisibility(node, node.id, mergedIndex)
    saveStep()
  }

  const merge = (node: TreeNodeProps, child: TreeNodeProps, index: number, mergedIndex: number) => {
    selectMin(child, index)
    addSelectedToMergedArray(node, child, index, mergedIndex)
    node.visualizerData.A[mergedIndex].state = 'processed'
  }

  function generateStepsHelper(current: TreeNodeProps | null) {
    if (!current) return

    select(current)
    split(current)

    generateStepsHelper(current.left)
    generateStepsHelper(current.right)

    if (current.left && current.right) {
      if (current.left.visualizerData.A.length === 1) current.left.visualizerData.A[0].state = 'highlight'
      if (current.right.visualizerData.A.length === 1) current.right.visualizerData.A[0].state = 'highlight'

      current.visualizerData.A.forEach((_e, index) => toggleElementVisibility(current, current.id, index))
      messages.push('Merge selected arrays back together in sorted order')
      saveStep()

      sort(current.visualizerData.A)
      let leftNodePointer = 0
      let rightNodePointer = 0
      let finalArrayPointer = 0
      if (current.left.visualizerData.A.length > 1 || current.right.visualizerData.A.length > 1) {
        messages.push('Select the smallest value from the front of each list (excluding values already in the sorted array)')
        saveStep()
      }
      while (leftNodePointer < current.left.visualizerData.A.length && rightNodePointer < current.right.visualizerData.A.length) {
        messages.push('Select the minimum of the two values')
        if (current.left.visualizerData.A[leftNodePointer].value < current.right.visualizerData.A[rightNodePointer].value) {
          merge(current, current.left, leftNodePointer, finalArrayPointer)
          leftNodePointer++
        } else {
          merge(current, current.right, rightNodePointer, finalArrayPointer)
          rightNodePointer++
        }
        finalArrayPointer++
      }

      while (leftNodePointer < current.left.visualizerData.A.length) {
        messages.push('When one list becomes empty, copy all values from the remaining array into the sorted array')
        merge(current, current.left, leftNodePointer, finalArrayPointer)
        leftNodePointer++
        finalArrayPointer++
      }
      while (rightNodePointer < current.right.visualizerData.A.length) {
        messages.push('When one list becomes empty, copy all values from the remaining array into the sorted array')
        merge(current, current.right, rightNodePointer, finalArrayPointer)
        rightNodePointer++
        finalArrayPointer++
      }

      toggleNodeVisibility(current.left, current.left.id)
      toggleNodeVisibility(current.right, current.right.id)
      messages.push('Finished merging')
      saveStep()
    }
  }

  saveStep()
  generateStepsHelper(rootCopy)

  return visualizer
}
