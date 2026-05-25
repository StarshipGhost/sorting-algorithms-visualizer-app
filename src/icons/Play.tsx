const Play = ({baseClass, action, handleSimulation}: {baseClass: string; action: 'manual' | 'simulation' | 'freeze'; handleSimulation: () => void}) => {
  return (
    action !== 'simulation' && (
      <button className="row-start-1 col-start-3 justify-self-center self-center" onClick={handleSimulation}>
        <svg className={baseClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
        </svg>
      </button>
    )
  )
}

export default Play
