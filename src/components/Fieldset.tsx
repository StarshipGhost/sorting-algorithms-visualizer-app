import type {JSX} from 'react'

const Fieldset = ({label, children}: {label: string; children: JSX.Element | JSX.Element[]}) => {
  return (
    <div className="relative border-2 border-solid border-sky-500 rounded-sm border-box p-4">
      <span className="text-sm text-sky-500 font-medium bg-sky-950 px-2 border border-solid border-sky-900 rounded-sm absolute top-0 -translate-y-1/2">{label}</span>
      {children}
    </div>
  )
}

export default Fieldset
