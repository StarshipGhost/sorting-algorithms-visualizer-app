export interface ElementProp {
  value: number
  elementIndex: number
  visible: boolean
  state?: 'select min' | 'proccessed'
}

export interface TreeNodeProp {
  id: number
  A: ElementProp[]
  left: TreeNodeProp | null
  right: TreeNodeProp | null
  visible: boolean
  state?: 'select'
}

export function buildTree(A: number[]): TreeNodeProp {
  const elements: ElementProp[] = A.map((value, index) => {
    return {value: value, elementIndex: index, visible: true}
  })
  const root: TreeNodeProp = {id: -1, A: elements, left: null, right: null, visible: true}

  const generateId = (root: TreeNodeProp | null) => {
    const queue: (TreeNodeProp | null)[] = [root]
    let counter = 1

    while (queue.length > 0) {
      const node: TreeNodeProp | null | undefined = queue.shift()
      if (node) {
        node.id = counter++
        if (node.left) {
          queue.push(node.left)
        }
        if (node.right) {
          queue.push(node.right)
        }
      }
    }
  }

  function buildTreeHelper(A: ElementProp[], root: TreeNodeProp): TreeNodeProp | null {
    if (A.length <= 1) {
      return null
    }

    const middle = Math.floor(A.length / 2)
    const left = A.slice(0, middle)
    const right = A.slice(middle)

    root.left = {id: -1, A: structuredClone(left), left: null, right: null, visible: false}
    buildTreeHelper(left, root.left)
    root.right = {id: -1, A: structuredClone(right), left: null, right: null, visible: false}
    buildTreeHelper(right, root.right)

    return root
  }

  buildTreeHelper(elements, root)
  generateId(root)

  return root
}

function toggleNodeVisibility(node: TreeNodeProp | null, id: number) {
  if (!node) return

  if (node.id === id) {
    node.visible = !node.visible
  }
}

function toggleElementVisibility(node: TreeNodeProp | null, id: number, index: number) {
  if (!node) return

  if (node.id === id) {
    node.A[index].visible = !node.A[index].visible
  }
}

function sort(A: ElementProp[]) {
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

export function generateSteps(root: TreeNodeProp | null) {
  const rootCopy: TreeNodeProp | null = root
  const generatedSteps: (TreeNodeProp | null)[] = []
  const messages: string[] = ['']

  const saveStep = () => {
    generatedSteps.push(structuredClone(root))
  }

  const select = (node: TreeNodeProp) => {
    node.state = 'select'
    if (node.left && node.right) {
      messages.push('Select the entire array')
    } else {
      messages.push('An array of length 1 cannot be split, ready for merge')
    }
    saveStep()
    node.state = undefined
  }

  const split = (node: TreeNodeProp) => {
    if (node.left && node.right) {
      messages.push('Split the array as evenly as possible')
      toggleNodeVisibility(node.left, node.left.id)
      toggleNodeVisibility(node.right, node.right.id)
      saveStep()
    }
  }

  const selectMin = (child: TreeNodeProp, index: number) => {
    child.state = undefined
    child.A[index].state = 'select min'
    saveStep()
  }
  const addSelectedToMergedArray = (node: TreeNodeProp, child: TreeNodeProp, index: number, mergedIndex: number) => {
    messages.push('Add the selected value to the sorted array')
    child.A[index].state = undefined
    toggleElementVisibility(child, child.id, index)
    node.A[mergedIndex].state = 'select min'
    toggleElementVisibility(node, node.id, mergedIndex)
    saveStep()
  }

  const merge = (node: TreeNodeProp, child: TreeNodeProp, index: number, mergedIndex: number) => {
    selectMin(child, index)
    addSelectedToMergedArray(node, child, index, mergedIndex)
    node.A[mergedIndex].state = 'proccessed'
  }

  function generateStepsHelper(current: TreeNodeProp | null) {
    if (!current) return

    select(current)
    split(current)

    generateStepsHelper(current.left)
    generateStepsHelper(current.right)

    if (current.left && current.right) {
      current.left.state = 'select'
      current.right.state = 'select'
      current.A.forEach((_e, index) => toggleElementVisibility(current, current.id, index))
      messages.push('Merge selected arrays back together in sorted order')
      saveStep()

      sort(current.A)
      let leftNodePointer = 0
      let rightNodePointer = 0
      let finalArrayPointer = 0
      if (current.left.A.length > 1 || current.right.A.length > 1) {
        messages.push('Select the smallest value from the front of each list (excluding values already in the sorted array)')
        saveStep()
      }
      while (leftNodePointer < current.left.A.length && rightNodePointer < current.right.A.length) {
        messages.push('Select the minimum of the two values')
        if (current.left.A[leftNodePointer].value < current.right.A[rightNodePointer].value) {
          merge(current, current.left, leftNodePointer, finalArrayPointer)
          leftNodePointer++
        } else {
          merge(current, current.right, rightNodePointer, finalArrayPointer)
          rightNodePointer++
        }
        finalArrayPointer++
      }

      while (leftNodePointer < current.left.A.length) {
        messages.push('When one list becomes empty, copy all values from the remaining array into the sorted array')
        merge(current, current.left, leftNodePointer, finalArrayPointer)
        leftNodePointer++
        finalArrayPointer++
      }
      while (rightNodePointer < current.right.A.length) {
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

  return generatedSteps
}