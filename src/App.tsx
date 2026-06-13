import clsx from 'clsx'
import './App.css'
import {buildTree, generateSteps, type ClassValueProps, type TreeNodeProp} from './simulation/mergesort'
import {Activity, useEffect, useRef, useState, type ChangeEvent} from 'react'
import Fieldset from './components/Fieldset'
import NavigationButtons, {type NavigationProps} from './components/NavigationButtons'
import StepsMessageBox from './components/StepsMessageBox'
import InputFields, {type InputProps} from './components/InputField'
import Introduction from './components/Introduction'

const MergeSortArray = ({root, classValue}: {root: TreeNodeProp; classValue: ClassValueProps}) => {
  const {
    cellContainerClass: {highlight, processing, processed},
    cellClass,
    animationClass: {show, hidden, transition},
  } = classValue
  return (
    <div className="flex">
      {root.A.map(({value, elementIndex, visible, state}, index) => {
        const firstCellBorderClass = index === 0 && `rounded-l-md`
        const lastCellBorderClass = index === root.A.length - 1 && `rounded-r-md border-r`
        const cellContainerClass = `flex flex-col border-t border-b border-l border-solid border-neutral-600 ${firstCellBorderClass} ${lastCellBorderClass}`
        const cellBaseClass = `text-md font-medium size-12 flex justify-center items-center`

        const visibilityClass = visible ? show : hidden
        const highlightClass = state === 'highlight' && highlight
        const processingClass = state === 'processing' && processing
        const processedClass = state === 'processed' && processed

        return (
          <div key={elementIndex} className="text-neutral-600 text-center space-y-1">
            <div className={clsx(cellContainerClass, highlightClass, processingClass, processedClass, transition)}>
              <span className={clsx(cellBaseClass, cellClass, transition, visibilityClass)}>{value}</span>
            </div>
            <span>{elementIndex}</span>
          </div>
        )
      })}
    </div>
  )
}

const TreeNode = ({root, classValue}: {root: TreeNodeProp | null; classValue: ClassValueProps}) => {
  if (!root) return null

  return (
    <div className={`flex flex-col items-center mt-4 transition-opacity duration-400 ${root.visible ? `opacity-100` : `opacity-0`} `}>
      <MergeSortArray root={root} classValue={classValue} />
      <div className={`flex gap-10 mt-2`}>
        <TreeNode root={root.left ?? null} classValue={classValue} />
        <TreeNode root={root.right ?? null} classValue={classValue} />
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
  const [arraySize, setArraySize] = useState<number>(5)
  const [inputA, setInputA] = useState<string>('')
  const [A, setA] = useState<number[]>([])

  const defaultClass = {
    cellContainerClass: {highlight: '', processing: '', processed: ''},
    cellClass: [],
    animationClass: {slide: '', show: '', hidden: '', transition: ''},
  }
  const [classValue, setClassValue] = useState<ClassValueProps>(defaultClass)

  const fieldsetRef = useRef<HTMLDivElement | null>(null)
  const scrollView = () => {
    const fieldsets = fieldsetRef.current
    if (fieldsets) {
      const visualizeFieldset = fieldsets.querySelectorAll('main > div')[2]
      visualizeFieldset.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
  }

  console.log(steps)
  useEffect(() => {
    if (A.length) {
      const builtTree = buildTree(A)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRoot(builtTree)
    }
  }, [A])

  useEffect(() => {
    if (root) {
      const {steps, messages, classValues} = generateSteps(root)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setClassValue(classValues)
      setSteps(steps)
      setMessages(messages)
    }
  }, [root])

  useEffect(() => {
    if (A.length) {
      setTimeout(() => {
        scrollView()
      }, 10)
    }
  }, [A, fieldsetRef])

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

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const regex: RegExp = /[a-zA-Z\W]/
    let submittedArray

    setCurrentStep(0)
    if (inputA.trim().length) {
      submittedArray = inputA
        .split(regex)
        .filter((c) => c.length)
        .map((n) => parseInt(n))
      const outOfBoundNumber = submittedArray.find((element) => element > 999)
      if (submittedArray.length < 5 || submittedArray.length > 8 || outOfBoundNumber) {
        window.alert('Please enter 5 to 8 positive integers between 0 and 999')
        return
      }
    } else {
      submittedArray = Array.from({length: arraySize}, () => Math.floor(Math.random() * 999) + 1)
    }
    setA(submittedArray)
  }

  const handleResetInput = () => {
    setA([])
    setInputA('')
    setRoot(null)
    setCurrentStep(0)
    setSteps([])
  }

  const input: InputProps = {
    sizeSelect: {currentSize: arraySize, onSizeChange: (e: ChangeEvent<HTMLSelectElement>) => setArraySize(parseInt(e.currentTarget.value))},
    customArrayInput: {currentInputValues: inputA, onInputChange: (e: ChangeEvent<HTMLInputElement>) => setInputA(e.currentTarget.value)},
    onSubmit: handleSubmit,
    onReset: handleResetInput,
  }

  return (
    <main ref={fieldsetRef} className="min-w-80 max-w-5xl mx-auto p-8 space-y-8">
      <Introduction />
      <Fieldset label="INPUT">
        <InputFields input={input} />
      </Fieldset>
      <Activity mode={A.length ? 'visible' : 'hidden'}>
        <Fieldset label="VISUALIZE">
          <TreeNode root={steps[currentStep]} classValue={classValue} />
          <StepsMessageBox message={messages[currentStep]} />
          <NavigationButtons simulation={{stepsLength: steps.length, currentStep, action, speed}} controls={controls} />
        </Fieldset>
      </Activity>
    </main>
  )
}

export default App
