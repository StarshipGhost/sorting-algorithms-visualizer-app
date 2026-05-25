import type {JSX} from 'react'

const Fieldset = ({label, children}: {label: string; children: JSX.Element | JSX.Element[]}) => {
  return (
    <div className="relative border border-solid border-neutral-400 rounded-sm border-box p-4">
      <span className="text-sm text-neutral-700 font-medium bg-neutral-200 px-2 border border-solid border-neutral-100 rounded-sm absolute top-0 -translate-y-1/2">{label}</span>
      {children}
    </div>
  )
}

export default Fieldset
