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
  visible: boolean;
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

function toggleNodeVisibility(node : TreeNodeProp | null, id : number) {
    if (!node) return;

    if (node.id === id) {
        node.visible = !node.visible
    }
}

function toggleElementVisiblity(node : TreeNodeProp | null, id : number, index : number) {
    if (!node) return;
    
    if (node.id === id) {
        node.A[index].visible = !node.A[index].visible
    }
}
