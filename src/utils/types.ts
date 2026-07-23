import type {ChangeEvent} from 'react'

export interface SortingAlgorithmProps {
  id: number
  introduction: {
    title: string
    description: string
    timeComplexity: {worst: string; average: string; best: string}
  }
  lengthRange: [number, number]
  generateSteps: (A: number[]) => VisualizerProps
}

export interface ElementProps {
  value: number
  elementIndex: number
  translate: number
  visible: boolean
  state?: 'slide' | 'highlight' | 'processing' | 'processed'
}

export interface PointerProps {
  index: number
  position: number
  visible: boolean
}

export interface VisualizerDataProps {
  A: ElementProps[]
  low?: PointerProps
  high?: PointerProps
  pivot?: number
}

export interface TreeNodeProps {
  id: number
  visualizerData: VisualizerDataProps
  left: TreeNodeProps | null
  right: TreeNodeProps | null
  visible: boolean
}

export interface ClassValueProps {
  cellContainerClass: {highlight: string; processing: string; processed: string}
  animationClass: {slide: string; visibility: {show: string; hidden: string}; transition: string}
}

export interface VisualizerProps {
  steps: (TreeNodeProps | null)[]
  messages: string[]
  classValues: ClassValueProps
}

export interface NavigationProps {
  simulation: {
    stepsLength: number
    currentStep: number
    action: 'manual' | 'simulation' | 'freeze'
    speed: number
  }
  controls: {
    onPlay: () => void
    onPause: () => void
    onReset: () => void
    onSpeedChange: (e: ChangeEvent<HTMLInputElement>) => void
    onStepBack: () => void
    onStepForward: () => void
    onSkipToEnd: () => void
  }
  mode: 'manual' | 'simulation'
}
