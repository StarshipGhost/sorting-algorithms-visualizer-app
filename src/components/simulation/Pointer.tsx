import type {PointerProps} from '../utils/types'

const Pointer = ({pointer}: {pointer: PointerProps}) => {
  return (
    pointer.visible && (
      <span
        className={`border-5 border-solid border-transparent border-t-neutral-300 absolute -translate-y-full transition-transform duration-650`}
        style={{transform: `translateX(${pointer.position}px)`}}
      ></span>
    )
  )
}

export default Pointer
