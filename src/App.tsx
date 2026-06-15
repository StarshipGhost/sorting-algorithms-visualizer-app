import './App.css'
import {buildTree, generateSteps} from './simulation/mergesort'
import { useEffect, useRef, useState, type ChangeEvent} from 'react'
import Fieldset from './components/Fieldset'
import NavigationButtons from './components/simulation/NavigationButtons'
import StepsMessageBox from './components/simulation/StepsMessageBox'
import InputFields, {type InputProps} from './components/InputField'
import Introduction from './components/Introduction'
import TreeNode from './components/simulation/TreeNode'
import type {ClassValueProps, NavigationProps, TreeNodeProps} from './utils/types'
import NavigationBar from './components/NavigationBar'

function App() {
  const [root, setRoot] = useState<TreeNodeProps | null>(null)
  const [steps, setSteps] = useState<(TreeNodeProps | null)[]>([])
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [messages, setMessages] = useState<string[]>([])
  const [action, setAction] = useState<'simulation' | 'manual' | 'freeze'>('manual')
  const [speed, setSpeed] = useState<number>(500)
  const [arraySize, setArraySize] = useState<number>(5)
  const [inputA, setInputA] = useState<string>('')
  const [A, setA] = useState<number[]>([])
  const [classValues, setClassValues] = useState<ClassValueProps>({
    cellContainerClass: {highlight: '', processing: '', processed: ''},
    cellClass: [],
    animationClass: {slide: '', visibility: {show: '', hidden: ''}, transition: ''},
  })

  const fieldsetRef = useRef<HTMLDivElement | null>(null)
  const scrollView = () => {
    const fieldsets = fieldsetRef.current
    if (fieldsets) {
      const visualizeFieldset = fieldsets.querySelectorAll('main > div > div')[2]
      visualizeFieldset.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
  }

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
      setSteps(steps)
      setMessages(messages)
      setClassValues(classValues);
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
    <main ref={fieldsetRef} className="absolute size-full grid grid-cols-5 pl-4 py-4">
      <NavigationBar/>
      <div className='max-h-screen px-8 py-4 col-span-4 space-y-8 overflow-auto'>
        <Introduction />
        <Fieldset label="INPUT">
          <InputFields input={input} />
        </Fieldset>
        <Fieldset label="VISUALIZE">
          <TreeNode root={steps[currentStep]} animationStyle={classValues}/>
          <StepsMessageBox message={messages[currentStep]} />
          <NavigationButtons simulation={{stepsLength: steps.length, currentStep, action, speed}} controls={controls} />
        </Fieldset>
      </div>
    </main>
  )
}

export default App
