import clsx from 'clsx'
import './App.css'
import {buildTree, generateSteps, type TreeNodeProp} from './simulation/mergesort'
import { useEffect, useState } from 'react'

const TreeNodeValues = ({root}: {root: TreeNodeProp}) => {
  return (
    <div className="flex">
      {root.A.map(({value, elementIndex, visible}, index) => {
        const nodeBaseClass = `flex flex-col border-t border-b border-l border-solid border-neutral-600 ${index === 0 && `rounded-l-md`} ${index === root.A.length - 1 && `rounded-r-md border-r`}`
        const nodeActiveClass =
          root.state === 'select'
            ? root.A[index].state === 'proccessed'
              ? 'text-neutral-600 bg-yellow-100'
              : root.A[index].state === 'select min'
                ? 'bg-blue-500'
                : 'text-white bg-green-500/80'
            : ''
        const cellBaseClass = `text-md font-medium text-neutral-600 size-12 flex justify-center items-center`
        const transitionClass = `transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`

        return (
          <div key={elementIndex} className="flex flex-col items-center gap-1">
            <div className={clsx(nodeBaseClass, nodeActiveClass, transitionClass)}>
              <span className={clsx(cellBaseClass, transitionClass)}>{value}</span>
            </div>
            <span>{elementIndex}</span>
          </div>
        )
      })}
    </div>
  )
}

const TreeNode = ({root}: {root: TreeNodeProp | null}) => {
  if (!root) return null

  return (
    <div className={`flex flex-col items-center transition-opacity duration-400 ${root.visible ? `opacity-100` : `opacity-0`} `}>
      <TreeNodeValues root={root} />
      <div className={`flex gap-10 mt-8`}>
        <TreeNode root={root.left ?? null} />
        <TreeNode root={root.right ?? null} />
      </div>
    </div>
  )
}

function App() {
  const [root, setRoot] = useState<TreeNodeProp | null>(null);
  const [steps, setSteps] = useState<(TreeNodeProp | null)[]>([])
  const [currentSteps, setCurrentSteps] = useState<number>(0);
  const A = [987, 171, 446, 258, 574, 101, 13];

  useEffect(() => {
    const builtTree = buildTree(A)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRoot(builtTree)
  }, [])

  useEffect(() => {
    const generatedSteps = generateSteps(root)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSteps(generatedSteps)
  }, [root])

  
  return (
  <div>
    <TreeNode root={steps[currentSteps]} />
    <button className='text-white bg-neutral-800 py-2 px-2' onClick={() => setCurrentSteps(currentSteps + 1)}>click</button>
  </div>
  )

}

export default App
