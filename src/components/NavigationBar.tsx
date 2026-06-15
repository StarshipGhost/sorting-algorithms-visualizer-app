import { useState } from "react";

const NavigationBar = () => {
  const [active, setActive] = useState<number>(0);
  return (
    <div className='p-4'>
      <h1 className='text-2xl text-neutral-200 border-b-4 border-sky-900/50 font-medium whitespace-nowrap pb-2'>Sorting Algorithms</h1>
      <ul className='py-4 space-y-2'>
        <li className={ `text-neutral-400 text-xl font-medium px-4 py-2 rounded-md cursor-pointer hover:text-white hover:bg-neutral-800 whitespace-nowrap ${active === 0 && 'text-white bg-sky-600 hover:bg-sky-600/90'}` } onClick={() => setActive(0)}>Bubble Sort</li>
        <li className={ `text-neutral-400 text-xl font-medium px-4 py-2 rounded-md cursor-pointer hover:text-white hover:bg-neutral-800 whitespace-nowrap ${active === 1 && 'text-white bg-sky-600 hover:bg-sky-600/90'}` } onClick={() => setActive(1)}>Insertion Sort</li>
        <li className={ `text-neutral-400 text-xl font-medium px-4 py-2 rounded-md cursor-pointer hover:text-white hover:bg-neutral-800 whitespace-nowrap ${active === 2 && 'text-white bg-sky-600 hover:bg-sky-600/90'}` } onClick={() => setActive(2)}>Selection Sort</li>
        <li className={ `text-neutral-400 text-xl font-medium px-4 py-2 rounded-md cursor-pointer hover:text-white hover:bg-neutral-800 whitespace-nowrap ${active === 3 && 'text-white bg-sky-600 hover:bg-sky-600/90'}` } onClick={() => setActive(3)}>Merge Sort</li>
        <li className={ `text-neutral-400 text-xl font-medium px-4 py-2 rounded-md cursor-pointer hover:text-white hover:bg-neutral-800 whitespace-nowrap ${active === 4 && 'text-white bg-sky-600 hover:bg-sky-600/90'}` } onClick={() => setActive(4)}>Quick Sort</li>
      </ul>
    </div>
  )
}

export default NavigationBar;