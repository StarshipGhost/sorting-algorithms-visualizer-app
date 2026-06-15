import { VisualizerArray } from "../../App"
import type { ClassValueProps, TreeNodeProps } from "../../utils/types"

const TreeNode = ({root, animationStyle}: {root: TreeNodeProps | null, animationStyle: ClassValueProps}) => {
  if (!root) return null

  return (
    <div className={`flex flex-col items-center mt-4 transition-opacity duration-400 ${root.visible ? `opacity-100` : `opacity-0`} `}>
      <VisualizerArray visualizerData={root.visualizerData} animationStyle={animationStyle}/>
      <div className={`flex gap-10`}>
        <TreeNode root={root.left ?? null} animationStyle={animationStyle}/>
        <TreeNode root={root.right ?? null} animationStyle={animationStyle}/>
      </div>
    </div>
  )
}

export default TreeNode