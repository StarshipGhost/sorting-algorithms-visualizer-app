export interface ElementProp {
  value: number
  elementIndex: number
  visible: boolean
  state?: 'highlight' | 'processing' | 'processed'
}

export interface TreeNodeProp {
  id: number
  A: ElementProp[]
  left: TreeNodeProp | null
  right: TreeNodeProp | null
  visible: boolean
}

export interface ClassValueProps {
  cellContainerClass : {highlight : string, processing : string, processed : string},
  cellClass : string[];
  animationClass : {slide: string, show : string, hidden : string, transition : string}
}

export interface VisualizerProp {
  steps: (TreeNodeProp | null)[]
  messages: string[]
  classValues: ClassValueProps;
}

export function buildTree(A: number[]): TreeNodeProp {
  const elements: ElementProp[] = A.map((value, index) => {
    return {value: value, elementIndex: index, visible: true}
  })
  const root: TreeNodeProp = {id: -1, A: elements, left: null, right: null, visible: true}

  const generateId = (root: TreeNodeProp | null) => {
    const queue: (TreeNodeProp | null)[] = [root]
    let id = 1

    while (queue.length > 0) {
      const node: TreeNodeProp | null | undefined = queue.shift()
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
  const visible = 'opacity-100'
  const hidden = 'opacity-0';
  const transitionClass = `transition-[colors, opacity] duration-[400ms,400ms]`

  const highlight = 'text-white bg-green-600/60'
  const processed = 'bg-yellow-100 text-neutral-600'
  const processing = 'bg-blue-400/20 text-neutral-600'

  const rootCopy: TreeNodeProp | null = root
  const generatedSteps: (TreeNodeProp | null)[] = []
  const messages: string[] = ['']
  const visualizer: VisualizerProp = {steps: generatedSteps, messages: messages, classValues : {cellContainerClass : {highlight : highlight, processing : processing, processed : processed}, cellClass: [], animationClass: {slide: '', show : visible, hidden: hidden, transition: transitionClass}}}

  const saveStep = () => {
    generatedSteps.push(structuredClone(root))
  }

  const select = (node: TreeNodeProp) => {
    if (node.left && node.right) {
      node.A.forEach(n => n.state = 'highlight');
      messages.push('Select the entire array')
    } else {
      node.A.forEach(n => n.state = 'processed');
      messages.push('An array of length 1 cannot be split, ready for merge')
    }
    saveStep()
    node.A.forEach(n => n.state = undefined);
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
    child.A[index].state = 'processing'
    saveStep()
  }
  const addSelectedToMergedArray = (node: TreeNodeProp, child: TreeNodeProp, index: number, mergedIndex: number) => {
    messages.push('Add the selected value to the sorted array')
    child.A[index].state = undefined
    toggleElementVisibility(child, child.id, index)
    node.A[mergedIndex].state = 'processing'
    toggleElementVisibility(node, node.id, mergedIndex)
    saveStep()
  }

  const merge = (node: TreeNodeProp, child: TreeNodeProp, index: number, mergedIndex: number) => {
    selectMin(child, index)
    addSelectedToMergedArray(node, child, index, mergedIndex)
    node.A[mergedIndex].state = 'processed'
  }

  function generateStepsHelper(current: TreeNodeProp | null) {
    if (!current) return

    select(current)
    split(current)

    generateStepsHelper(current.left)
    generateStepsHelper(current.right)

    if (current.left && current.right) {
      if (current.left.A.length === 1 ) current.left.A[0].state = 'highlight' 
      if (current.right.A.length === 1) current.right.A[0].state = 'highlight'  
        
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

  return visualizer
}
