import clsx from 'clsx'
import './App.css'
import {buildTree, generateSteps, type TreeNodeProp} from './simulation/mergesort'
import {useEffect, useState, type ChangeEvent} from 'react'
import Fieldset from './components/Fieldset'
import NavigationButtons, {type NavigationProps} from './components/NavigationButtons'
import StepsMessageBox from './components/StepsMessageBox'

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
    <div className={`flex flex-col items-center mt-4 transition-opacity duration-400 ${root.visible ? `opacity-100` : `opacity-0`} `}>
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
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [messages, setMessages] = useState<string[]>([])
  const [action, setAction] = useState<'simulation' | 'manual' | 'freeze'>('manual')
  const [speed, setSpeed] = useState<number>(500)
  const A = [4, 3, 2, 1];

  useEffect(() => {
    if (A.length) {
      const builtTree = buildTree(A)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRoot(builtTree)
    }
  }, [])

  useEffect(() => {
    if (root) {
      const {steps, messages} = generateSteps(root)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSteps(steps)
      setMessages(messages)
    }
  }, [root])

  useEffect(() => {
    if (action === 'simulation' && currentStep < steps.length - 1) {
      setTimeout(() => {
        const current = currentStep
        setCurrentStep(current + 1)
      }, speed)
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAction('freeze')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep])

  const handleStepBack = () => {
    if (currentStep > 0) {
      setAction('manual')
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setAction('manual')
      setCurrentStep(currentStep + 1)
    }
  }

  const handleReset = () => {
    setAction('manual')
    setCurrentStep(0)
  }

  const handleSkipToEnd = () => {
    setAction('manual')
    setCurrentStep(steps.length - 1)
  }

  const handlePlay = () => {
    if (currentStep < steps.length - 1) {
      setAction('simulation')
      setCurrentStep(currentStep + 1)
    }
  }

  const handleSpeed = (e: ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(e.currentTarget.value))
  }

  const controls: NavigationProps['controls'] = {
    onPlay: handlePlay,
    onPause: () => setAction('manual'),
    onReset: handleReset,
    onSpeedChange: handleSpeed,
    onStepBack: handleStepBack,
    onStepForward: handleStepForward,
    onSkipToEnd: handleSkipToEnd,
  }


  return (
    <div className="min-w-80 max-w-3xl mx-auto p-8 space-y-8 ">
      <Fieldset label="VISUALIZE">
        <TreeNode root={steps[currentStep]} />
        <StepsMessageBox message={messages[currentStep]} />
        <NavigationButtons simulation={{stepsLength: steps.length, currentStep, action, speed}} controls={controls} />
      </Fieldset>
    </div>
  )
}

export default App
