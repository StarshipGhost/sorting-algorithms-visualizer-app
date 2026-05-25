import clsx from 'clsx'
import './App.css'
import {buildTree, generateSteps, type TreeNodeProp} from './simulation/mergesort'
import {useEffect, useState} from 'react'

const TreeNodeValues = ({root}: {root: TreeNodeProp}) => {
  return (
    <div className="flex">
      {root.A.map(({value, elementIndex, visible}, index) => {
        const nodeBaseClass = `flex flex-col border-t border-b border-l border-solid border-neutral-600 ${index === 0 && `rounded-l-md`} ${index === root.A.length - 1 && `rounded-r-md border-r`}`
        const nodeSelectClass =
          root.state === 'select'
            ? root.A[index].state === `proccessed`
              ? `text-neutral-600 bg-green-600/60`
              : `text-white bg-green-600/60`
            : `text-neutral-600`

        const nodeProccessedClass = root.A[index].state === 'proccessed' && 'bg-yellow-100'
        const nodeMinSelectClass = root.A[index].state === 'select min' && 'bg-blue-400/20'
        const cellBaseClass = `text-md font-medium size-12 flex justify-center items-center`
        const transitionClass = `transition-opacity duration-400 ${visible ? 'opacity-100' : 'opacity-0'}`

        return (
          <div key={elementIndex} className="flex flex-col items-center gap-1">
            <div className={clsx(nodeBaseClass, nodeSelectClass, nodeProccessedClass, nodeMinSelectClass, 'transition-colors duration-400')}>
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
  const [root, setRoot] = useState<TreeNodeProp | null>(null)
  const [steps, setSteps] = useState<(TreeNodeProp | null)[]>([])
  const [currentSteps, setCurrentSteps] = useState<number>(0)
  // eslint-disable-next-line react-hooks/purity
  const A = Array.from({length: 8}, () => Math.floor(Math.random() * 999) + 1)

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
    <div className="min-w-80 max-w-3xl mx-auto p-8 space-y-8">
      <TreeNode root={steps[currentSteps]} />
    </div>
  )
}

export default App
