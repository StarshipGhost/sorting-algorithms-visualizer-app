const LeftArrow = ({baseClass, handleStepBack, mode}: {baseClass: string; handleStepBack: () => void; mode: 'manual' | 'simulation'}) => {
  return (
    <button
      className={`row-start-2 justify-self-center self-center disabled:brightness-50 disabled:cursor-not-allowed disabled:pointer-events-none`}
      onClick={handleStepBack}
      disabled={mode === 'simulation'}
    >
      <svg className={baseClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
      </svg>
    </button>
  )
}

export default LeftArrow
