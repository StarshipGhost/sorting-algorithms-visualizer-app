import { VisulaizerArray } from "../App"
import type { TreeNodeProps } from "../utils/types"

const TreeNode = ({root}: {root: TreeNodeProps | null}) => {
  if (!root) return null

  return (
    <div className={`flex flex-col items-center mt-4 transition-opacity duration-400 ${root.visible ? `opacity-100` : `opacity-0`} `}>
      <VisulaizerArray visualizerData={root.visualizerData} />
      <div className={`flex gap-10 mt-2`}>
        <TreeNode root={root.left ?? null} />
        <TreeNode root={root.right ?? null} />
      </div>
    </div>
  )
}

export default TreeNode