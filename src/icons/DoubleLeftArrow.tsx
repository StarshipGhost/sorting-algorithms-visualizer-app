const DoubleLeftArrow = ({baseClass, handleReset}: {baseClass: string; handleReset: () => void}) => {
  return (
    <button className="row-start-2 justify-self-center self-center" onClick={handleReset}>
      <svg className={baseClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
      </svg>
    </button>
  )
}

export default DoubleLeftArrow
