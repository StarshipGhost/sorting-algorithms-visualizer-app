import { type ChangeEvent, type SubmitEvent } from "react";

export interface InputProps {
  sizeSelect: {
    currentSize: number;
    onSizeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  };
  customArrayInput: {
    currentInputValues: string;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  onReset: () => void;
}

const InputFields = ({
  lengthRange,
  input: {
    sizeSelect: { currentSize, onSizeChange },
    customArrayInput: { currentInputValues, onInputChange },
    onSubmit,
    onReset,
  },
  active,
}: {
  lengthRange: [number, number] 
  input: InputProps;
  active: boolean;
}) => {
  const [min, max] = lengthRange
  const arraySizeOptions = Array.from({length: (max - min) + 1}, (_e : number, i : number) => min + i)

  return (
    <form className="grid grid-cols-2 gap-y-4 px-4 py-8" onSubmit={onSubmit}>
      <label className="text-sky-500 font-medium" htmlFor="size"> Array size: </label>
      <select className="text-sky-100 text-sm bg-neutral-800 border border-solid border-sky-300 p-1 rounded-sm w-1/4 shadow-sm cursor-pointer" id="size" value={currentSize} onChange={onSizeChange}>
        {arraySizeOptions.map((size) => (
          <option className="select:bg-neutral-800" key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <label className="text-sky-500 font-medium" htmlFor="values"> Array values <span className="text-sky-600">(optional): </span> </label>
      <input
        className="text-sky-100 text-sm bg-neutral-800 py-1 px-2 border border-solid border-sky-300 focus:outline focus:outline-sky-600 sm:placeholder:text-xs placeholder:text-sky-100/80 rounded-sm"
        type="text"
        id="values"
        value={currentInputValues}
        onChange={onInputChange}
        placeholder="Type multiple array values using comma separate"
      ></input>
      <div className="col-start-2 space-x-8 self-center place-content-center">
        <button type="submit" className="text-sm text-white w-16 h-8 bg-sky-800 border border-solid border-sky-700 rounded-sm cursor-pointer hover:bg-sky-900 disabled:opacity-50 disabled:pointer-events-none" disabled={!active} > Run </button>
        <a className="inline-block text-md text-sky-500 cursor-pointer hover:underline" onClick={onReset}> Reset </a>
      </div>
    </form>
  );
};

export default InputFields;
