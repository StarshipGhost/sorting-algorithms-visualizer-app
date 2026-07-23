const DoubleRightArrow = ({baseClass, handleSkipToEnd, mode}: {baseClass: string; handleSkipToEnd: () => void; mode: 'manual' | 'simulation'}) => {
  return (
    <button
      className={`row-start-2 justify-self-center self-center disabled:brightness-50 disabled:cursor-not-allowed disabled:pointer-events-none`}
      onClick={handleSkipToEnd}
      disabled={mode === 'simulation'}
    >
      <svg className={baseClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z" />
      </svg>
    </button>
  )
}

export default DoubleRightArrow
