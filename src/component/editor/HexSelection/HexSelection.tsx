import { memo, useEffect, useState } from 'react'
import shallow from 'zustand/shallow'

import { hexArr } from '~/assets/stats'
import useEditorStore from '~/component/editor/state/store/editorStore'
import { HexProps, ItemTypes } from '~/component/editor/types'
import { MutedCardWithHeader } from '~/component/lib'

import { DraggableHex } from './DraggableHex'
import HexTierBoard from './HexTierBoard'
import SearchBar from './SearchBar'

const FilteredHexSelections = memo(({ hexList }: { hexList: HexProps[] }) => {
  return (
    <>
      {hexList.length ? (
        <div className="relative grid grid-cols-7 gap-1 p-3 mt-2 md:grid-cols-10">
          {hexList.map((item, index) => (
            <DraggableHex hex={item} key={index} />
          ))}
        </div>
      ) : (
        <h1 className="p-6 font-bold">没有符合条件的海克斯</h1>
      )}
    </>
  )
})

const HexSelection = () => {
  const [dispatch, tier1, tier2, tier3] = useEditorStore(
    (state) => [state.draggingDispatch, state.tier1Hex, state.tier2Hex, state.tier3Hex],
    shallow
  )
  const [tabs, setTabs] = useState({
    names: ['一级海克斯', '二级海克斯', '三级海克斯', '所有'],
    selected: 3,
  })
  const [hexList, setHexList] = useState<HexProps[]>([])
  const [query, setQuery] = useState('')
  useEffect(() => {
    if (tabs.selected === 3) {
      setHexList([...hexArr[0], ...hexArr[1], ...hexArr[2]])
    } else {
      setHexList(hexArr[tabs.selected])
    }
  }, [tabs.selected])
  // const
  const filteredHex =
    query === ''
      ? hexList
      : hexList.filter((item) => {
          return item.name.includes(query) || item.description.includes(query)
        })

  const handleClickTabs = (index: number) => {
    setTabs({ ...tabs, selected: index })
  }
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div className="grid grid-cols-7 gap-3 pt-4 pb-36">
      <div className="col-span-5 ">
        <MutedCardWithHeader header={Tab(tabs, handleClickTabs)} additionalCSS="col-span-2 ">
          <div className="h-10 pt-2 w-34">
            <SearchBar value={query} handleChange={handleQueryChange} />
          </div>
          <FilteredHexSelections hexList={filteredHex} />
        </MutedCardWithHeader>
      </div>
      <div className="flex flex-col col-span-2 gap-3">
        <HexTierBoard
          tierName="1"
          hexList={tier1}
          acceptableType={ItemTypes.TIER1HEX}
          dispatch={dispatch}
        />
        <HexTierBoard
          tierName="2"
          hexList={tier2}
          acceptableType={ItemTypes.TIER2HEX}
          dispatch={dispatch}
        />
        <HexTierBoard
          tierName="3"
          hexList={tier3}
          acceptableType={ItemTypes.TIER3HEX}
          dispatch={dispatch}
        />
      </div>
    </div>
  )
}

export function Tab(
  tabs: { names: string[]; selected: number },
  handleClick: (index: number) => void
) {
  // @ts-ignore
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <div className="sm:block">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-8" aria-label="Tabs">
          {tabs.names.map((name, index) => (
            <button
              type="button"
              key={name}
              onClick={() => handleClick(index)}
              className={classNames(
                tabs.selected === index
                  ? 'border-blue-400 text-primaryColor'
                  : 'border-transparent text-textColor hover:text-lightGray hover:border-blue-400',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              )}>
              {name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
export default HexSelection
