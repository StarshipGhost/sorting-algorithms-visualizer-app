import {twMerge} from 'tailwind-merge'
import type {ClassValueProps, VisualizerDataProps} from '../../utils/types'
import Pointer from './Pointer'
import clsx from 'clsx'

const VisualizerArray = ({visualizerData, animationStyle}: {visualizerData: VisualizerDataProps; animationStyle: ClassValueProps}) => {
  const {A} = visualizerData
  const {
    cellContainerClass: {highlight, processing, processed},
    animationClass: {
      visibility: {show, hidden},
      transition,
    },
  } = animationStyle

  const getCellState = (state: 'slide' | 'highlight' | 'processing' | 'processed' | undefined) => {
    switch (state) {
      case 'highlight':
        return highlight
      case 'processing':
        return processing
      case 'processed':
        return processed
      default:
        return undefined
    }
  }
  return (
    <div className="flex">
      {A.map(({value, elementIndex, position, visible, state}, index) => {
        return (
          <div key={elementIndex} className="text-center space-y-1">
            {visualizerData.low && visualizerData.low.index === index && <Pointer pointer={visualizerData.low} />}
            {visualizerData.high && visualizerData.high.index === index && <Pointer pointer={visualizerData.high} />}
            <div
              className={twMerge(
                `text-neutral-300 size-12 border-t border-b border-l border-solid border-sky-100 ${index === A.length - 1 && 'rounded-r-md border-r'} ${index === 0 && 'rounded-l-md'}`,
                getCellState(state),
                transition,
              )}
            >
              <span
                className={clsx(`text-md font-medium size-full flex justify-center items-center`, transition, visible ? show : hidden)}
                style={{transform: `translateX(${position}px)`}}
              >
                {value}
              </span>
            </div>
            <span className="text-neutral-300">{elementIndex}</span>
          </div>
        )
      })}
    </div>
  )
}

export default VisualizerArray
