import './App.css'
import { buildTree, type TreeNodeProp } from './simulation/mergesort'

const TreeNode = ({root}: {root: TreeNodeProp | null}) => {
  if (!root) return null

  return (
    <div className="flex flex-col items-center">
      <div className='border border-solid border-neutral-600 p-4 rounded-md'>{`[${root.A.join(', ')}]`}</div>
      <div className={`flex gap-8 mt-8`} >
        <TreeNode root={root.left ?? null} />
        <TreeNode root={root.right ?? null} />
      </div>
    </div>
  )
}

function App() {
  const A = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return <TreeNode root={buildTree(A)}/>
}

export default App
