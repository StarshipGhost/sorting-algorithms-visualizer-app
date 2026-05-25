const StepsMessageBox = ({message}: {message: string}) => {
  return (
    <div className="max-w-xl mx-auto bg-blue-200/60 p-4 mb-8 border border-solid border-blue-300 rounded-sm">
      <div className="border-l-5 border-solid border-blue-400 rounded-sm pl-3">
        <p className="font-medium">Steps:</p>
        <p className="text-sm text-neutral-700">{message}</p>
      </div>
    </div>
  )
}

export default StepsMessageBox
