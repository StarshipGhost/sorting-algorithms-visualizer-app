import type {ChangeEvent} from 'react'
import Play from '../../icons/Play'
import DoubleLeftArrow from '../../icons/DoubleLeftArrow'
import DoubleRightArrow from '../../icons/DoubleRightArrow'
import LeftArrow from '../../icons/LeftArrow'
import Pause from '../../icons/Pause'
import RightArrow from '../../icons/RightArrow'
import SpeedSlider from './SpeedSlider'
import type { NavigationProps } from '../../utils/types'

const NavigationButtons = ({
  simulation: {stepsLength, currentStep, action, speed},
  controls: {onPlay, onPause, onSpeedChange, onReset, onStepBack, onStepForward, onSkipToEnd},
}: NavigationProps) => {
  const baseClass = 'fill-sky-500 w-16 h-10 border border-solid border-sky-600 hover:border-sky-700 rounded-sm cursor-pointer hover:bg-sky-950'
  return (
    <div className="grid grid-rows-2 grid-cols-5 justify-self-center gap-x-3">
      <SpeedSlider speed={speed} handleSpeed={(e: ChangeEvent<HTMLInputElement>) => onSpeedChange(e)} />
      <DoubleLeftArrow baseClass={baseClass} handleReset={onReset} />
      <LeftArrow baseClass={baseClass} handleStepBack={onStepBack} />
      <Play action={action} baseClass={baseClass} handleSimulation={onPlay} />
      <Pause action={action} baseClass={baseClass} handlePause={onPause} />
      <p className="text-sky-100 text-md text-center row-start-2 place-content-center">{`${stepsLength ? currentStep + 1 : currentStep} / ${stepsLength ? stepsLength : 0}`}</p>
      <RightArrow baseClass={baseClass} handleStepForward={onStepForward} />
      <DoubleRightArrow baseClass={baseClass} handleSkipToEnd={onSkipToEnd} />
    </div>
  )
}

export default NavigationButtons
