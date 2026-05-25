const Pause = ({baseClass, action, handlePause}: {baseClass: string; action: 'manual' | 'simulation' | 'freeze'; handlePause: () => void}) => {
  return (
    action === 'simulation' && (
      <button className="row-start-1 col-start-3 justify-self-center self-center" onClick={handlePause}>
        <svg className={baseClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
        </svg>
      </button>
    )
  )
}

export default Pause
