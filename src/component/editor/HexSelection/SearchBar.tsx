import { SearchIcon } from '@heroicons/react/solid'
import { ChangeEvent } from 'react'

export function SearchBar({
  value,
  handleChange,
}: {
  value: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="center">
      <div className="relative mt-1 rounded-md shadow-sm ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </div>

        <input
          value={value}
          onChange={(e) => handleChange(e)}
          name="name"
          id="name"
          className="block w-full p-2 placeholder-gray-500 border-0 pl-9 rounded-2xl bg-sinkIn text-textColor shadow-borderColor placeholder:text-midGray focus:ring-0 sm:text-sm"
          placeholder="名称或描述"
          style={{
            boxShadow:
              'inset -5px -5px 10px hsl(240, 25%, 20%), inset 5px 5px 9px hsl(240, 25%, 11%)',
          }}
        />
      </div>
    </div>
  )
}
export default SearchBar
