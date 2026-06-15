import type {ChangeEvent} from 'react'

const SpeedSlider = ({speed, handleSpeed}: {speed: number; handleSpeed: (e: ChangeEvent<HTMLInputElement>) => void}) => {
  return (
    <div className="row-start-1 col-start-4 col-span-2 justify-self-center self-center accent-sky-500">
      <div className="text-sm text-center  text-sky-100 font-medium">Speed:</div>
      <input type="range" min="500" max="3000" step="50" value={speed} onChange={handleSpeed}></input>
      <div className="text-sm text-center text-sky-100 font-medium">{speed} ms</div>
    </div>
  )
}

export default SpeedSlider
