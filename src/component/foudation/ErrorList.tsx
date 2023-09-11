import { XCircleIcon } from '@heroicons/react/solid'

function ErrorList({ errorList }: { errorList: string[] }) {
  return (
    <div className="p-4 rounded-md bg-red-50 ">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            攻略不符合以下条件
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="pl-5 space-y-1 list-disc">
              {errorList.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ErrorList
