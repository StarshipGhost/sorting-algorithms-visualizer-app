export interface TreeNodeProp {
  A: number[]
  left: TreeNodeProp | null
  right: TreeNodeProp | null
}

export function buildTree(A: number[]): TreeNodeProp {
  const root: TreeNodeProp = {A: A, left: null, right: null}

  function buildTreeHelper(A: number[], root: TreeNodeProp): TreeNodeProp | null {
    if (A.length <= 1) {
      return null
    }

    const middle = Math.floor(A.length / 2)
    const left = A.slice(0, middle)
    const right = A.slice(middle)

    root.left = { A: structuredClone(left), left: null, right: null}
    buildTreeHelper(left, root.left)
    root.right = {A: structuredClone(right), left: null, right: null}
    buildTreeHelper(right, root.right)

    return root
  }

  buildTreeHelper(A, root)

  return root
}
