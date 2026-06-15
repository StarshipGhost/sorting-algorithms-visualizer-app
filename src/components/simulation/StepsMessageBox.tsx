const StepsMessageBox = ({message}: {message: string}) => {
  return (
    <div className="max-w-lg h-25 mx-auto bg-sky-900/30 p-4 mt-4 mb-8 border border-solid border-sky-900 rounded-sm">
      <div className="border-l-5 border-solid border-sky-500 rounded-sm pl-3">
        <p className="text-sky-100 font-medium">Steps:</p>
        <p className="text-sm text-sky-100">{message}</p>
      </div>
    </div>
  )
}

export default StepsMessageBox
