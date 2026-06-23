import type {TreeNodeProps} from './types'

export const generateId = (current: TreeNodeProps | null) => {
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
