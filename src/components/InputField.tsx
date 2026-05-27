import type {ChangeEvent} from 'react'

export interface InputProps {
    sizeSelect: {currentSize: number; onSizeChange: (e : ChangeEvent<HTMLSelectElement>) => void}
    customArrayInput: {currentInputValues: string; onInputChange: (e : ChangeEvent<HTMLInputElement>) => void}
    onSubmit: (e : React.SubmitEvent<HTMLFormElement>) => void
    onReset: () => void
}

const InputFields = ({input : {sizeSelect: {currentSize, onSizeChange}, customArrayInput: {currentInputValues, onInputChange}, onSubmit, onReset}}: {input : InputProps}) => {
  const arraySizeOptions = [5, 6, 7, 8, 9, 10]

  return (
    <form className="grid grid-cols-2 gap-y-4 px-4 py-8" onSubmit={onSubmit}>
      <label className="text-neutral-600 font-medium" htmlFor="size"> Array size: </label>
      <select className="text-sm text-neutral-800 bg-neutral-100 border border-solid border-neutral-400 p-1 rounded-sm w-1/4 shadow-sm" id="size" value={currentSize} onChange={onSizeChange} >
        {arraySizeOptions.map((size) => (
          <option key={size} value={size}> {size} </option>
        ))}
      </select>
      <label className="text-neutral-600 font-medium" htmlFor="values"> Array values <span className="text-neutral-400">(optional): </span> </label>
      <input
        className="text-sm py-1 px-2 border border-solid border-neutral-400 focus:outline focus:outline-neutral-600 sm:placeholder:text-xs rounded-sm"
        type="text"
        id="values"
        value={currentInputValues}
        onChange={onInputChange}
        placeholder="Type multiple array values using comma separate"
      ></input>
      <div className="col-start-2 space-x-8 self-center place-content-center">
        <button type="submit" className="text-sm text-white w-16 h-8 bg-blue-500 rounded-sm cursor-pointer hover:bg-blue-500/90"> Run </button>
        <a className="text-md text-blue-500 cursor-pointer hover:underline" onClick={onReset}>Reset</a>
      </div>
    </form>
  )
}

export default InputFields
