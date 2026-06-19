import {twMerge} from 'tailwind-merge'
import type {SortingAlgorithmProps} from '../utils/types'

const NavigationBar = ({
  algorithms,
  currentId,
  onIdChange,
  mode
}: {
  algorithms: SortingAlgorithmProps[]
  currentId: number
  onIdChange: (id: number) => void
  mode: 'simulation' | 'manual' | 'freeze'
}) => {
  return (
    <div className="p-4">
      <h1 className="text-xl text-neutral-200 border-b-4 border-sky-900/50 whitespace-nowrap pb-2">Sorting Algorithms</h1>
      <ul className="py-4 space-y-2">
        {algorithms.map(({id, introduction: {title}}) => (
          <li
            key={title}
            className={twMerge(`text-neutral-400 text-md font-medium px-4 py-2 rounded-sm cursor-pointer hover:text-white hover:bg-neutral-800 whitespace-nowrap`, `${currentId === id && 'text-white bg-sky-600 hover:bg-sky-600/90'}`, `${mode === 'simulation' && 'brightness-50 pointer-events-none cursor-default'}`)}
            onClick={() => onIdChange(id)}
            aria-disabled={mode === 'simulation'}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NavigationBar
