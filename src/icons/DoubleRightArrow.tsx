const DoubleRightArrow = ({baseClass, handleSkipToEnd}: {baseClass: string; handleSkipToEnd: () => void}) => {
  return (
    <button className="row-start-2 justify-self-center self-center" onClick={handleSkipToEnd}>
      <svg className={baseClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z" />
      </svg>
    </button>
  )
}

export default DoubleRightArrow
