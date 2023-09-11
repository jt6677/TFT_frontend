import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment, useEffect, useState } from 'react'

import { FilterAction, TFTFilterType } from '~/component/editor/types'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
interface FilterProps {
  data: FilterAction
  isCleared: boolean
  handleFilter: (filterType: TFTFilterType, filterId: number | null) => void
}
export default function Filter({ data, handleFilter, isCleared }: FilterProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const handleClick = (
    dataType: TFTFilterType,
    selectedItem: { Id: number; Name: string } | null
  ) => {
    if (selectedItem) {
      setSelected(selectedItem.Name)
      handleFilter(dataType, selectedItem.Id)
    } else {
      setSelected(null)
      handleFilter(dataType, null)
    }
  }
  useEffect(() => {
    if (isCleared) setSelected(null)
  }, [isCleared])
  return (
    <Menu as="div" className="relative z-30 inline-block text-left ">
      <div>
        {/* @ts-ignore */}
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-semibold border border-gray-300 shadow-sm rounded-xl bg-sinkIn text-textColor hover:bg-lightGray hover:text-darkeGray focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2 focus:ring-offset-gray-100">
          {selected || `所有${data.type}`}
          <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </Menu.Button>
      </div>
      {/* @ts-ignore */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        {/* @ts-ignore */}
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right divide-y divide-gray-100 shadow-lg rounded-xl bg-textColor ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {/* @ts-ignore */}
            <Menu.Item>
              {({ active }) => (
                <button
                  // href="#"
                  onClick={() => handleClick(data.type, null)}
                  type="button"
                  // role="button"
                  className={classNames(
                    active
                      ? 'rounded-xl bg-lightGray text-gray-900 '
                      : 'text-gray-700',
                    'group flex w-full items-center px-4 py-2 text-sm'
                  )}>
                  所有{data.type}
                </button>
              )}
            </Menu.Item>
            {data.payload.map((item) => (
              <Menu.Item key={item.Id}>
                {({ active }) => (
                  <button
                    // href="#"
                    onClick={() =>
                      handleClick(data.type, { Id: item.Id, Name: item.name })
                    }
                    type="button"
                    // role="button"
                    className={classNames(
                      active
                        ? 'bg-lightGray text-gray-900 rounded-xl'
                        : 'text-gray-700',
                      'group flex w-full items-center px-4 py-2 text-sm'
                    )}>
                    <img
                      src={item.imagePath}
                      className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                      alt="asd"
                    />
                    {item.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
