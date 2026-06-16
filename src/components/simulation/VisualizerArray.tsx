import {twMerge} from 'tailwind-merge'
import type {ClassValueProps, ElementProps, VisualizerDataProps} from '../../utils/types'
import Pointer from './Pointer'
import clsx from 'clsx'
import {useEffect, useRef, useState} from 'react'

const VisualizerArray = ({visualizerData, animationStyle}: {visualizerData: VisualizerDataProps; animationStyle: ClassValueProps}) => {
  const {A} = visualizerData
  const {
    cellContainerClass: { highlight, processing, processed},
    animationClass: {
      slide,
      visibility: {show, hidden},
      transition,
    },
  } = animationStyle

  function findSwappedIndices(prev: ElementProps[], next: ElementProps[]): [number, number] | null {
    const changed = prev.reduce<number[]>((acc, el, i) => {
      if (el.value !== next[i].value) acc.push(i)
      return acc
    }, [])

    if (changed.length === 2) return [changed[0], changed[1]]
    return null
  }

  const [displayElements, setDisplayElements] = useState(A)
  const prevRef = useRef<ElementProps[]>(A)

  useEffect(() => {
    const prev = prevRef.current
    const next = A
    const swapped = findSwappedIndices(prev, next)

    if (swapped) {
      const [a, b] = swapped
      const offsetA = (b - a) * 48

      setDisplayElements(
        prev.map((el, i) => {
          if (i === a) return {...el, translate: offsetA, state: 'slide'}
          if (i === b) return {...el, translate: -offsetA, state: 'slide'}
          return el
        }),
      )

      const id = setTimeout(() => {
        setDisplayElements(next)
        prevRef.current = next
      }, 450)

      return () => clearTimeout(id)
    } else {
      setDisplayElements(next)
      prevRef.current = next
    }
  }, [A])

  const getCellState = (state: 'slide' | 'highlight' | 'processing' | 'processed' | undefined) => {
    switch (state) {
      case 'slide': 
        return slide
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
      {displayElements.map(({value, elementIndex, position, visible, state}, index) => {
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
