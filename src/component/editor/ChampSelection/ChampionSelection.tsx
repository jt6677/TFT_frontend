import { memo, useEffect, useState } from 'react'
import { DragSourceMonitor, useDrag } from 'react-dnd'

import { champListData as originalChampList, jobs, races } from '~/assets/stats'
import {
  ChampionProps,
  DraggingActionType,
  ItemTypes,
  TFTFilterType,
} from '~/component/editor/types'
import { ChampCircle, MutedCardWithHeader, SinkInButton } from '~/component/lib'
import Filter from '~/component/mis/filter'

export const DraggableChamp = ({ champ }: { champ: ChampionProps }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.CHAMPION,
      item: {
        type: DraggingActionType.DROP_NEW_CHAMP,
        payload: { droppedChamp: champ },
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [champ]
  )

  return (
    <div
      className="relative grid pt-2 transition-all cursor-grab place-content-center hover:scale-110"
      style={{ opacity }}
      ref={drag}>
      <ChampCircle champ={champ} />
      <p className="text-sm text-center text-textColor">{champ.name.slice(0, 4)}</p>
    </div>
  )
}

const ChampionSelectionBoard = memo(({ champList }: { champList: ChampionProps[] }) => {
  return (
    <>
      {champList.length ? (
        <div className="relative grid grid-cols-7 gap-1 p-2 md:grid-cols-10">
          {champList.map((champ) => (
            <DraggableChamp champ={champ} key={champ.chessId} />
          ))}
        </div>
      ) : (
        <h1 className="p-6 font-bold">没有符合条件的英雄</h1>
      )}
    </>
  )
})

const ChampionSelection = () => {
  const [champList, setChampList] = useState(originalChampList)
  const [jobFilter, setJobFilter] = useState<number | null>(null)
  const [raceFilter, setRaceFilter] = useState<number | null>(null)
  const handleFilter = (filterType: TFTFilterType, filterId: number | null) => {
    if (filterType === TFTFilterType.JOB) {
      setJobFilter(filterId)
    }
    if (filterType === TFTFilterType.RACE) {
      setRaceFilter(filterId)
    }
  }
  useEffect(() => {
    if (jobFilter && raceFilter)
      setChampList(
        originalChampList.filter(
          (champ) => champ.jobIds.includes(jobFilter) && champ.raceIds.includes(raceFilter)
        )
      )
    if (jobFilter && !raceFilter)
      setChampList(originalChampList.filter((champ) => champ.jobIds.includes(jobFilter)))
    if (!jobFilter && raceFilter)
      setChampList(originalChampList.filter((champ) => champ.raceIds.includes(raceFilter)))
    if (!jobFilter && !raceFilter) setChampList(originalChampList)
  }, [jobFilter, raceFilter])
  const header = (
    <div className="grid h-12 text-lg font-semibold g place-content-center ">
      <div className="flex gap-4">
        <Filter
          data={{ type: TFTFilterType.JOB, payload: jobs }}
          handleFilter={handleFilter}
          isCleared={jobFilter === null}
        />
        <Filter
          data={{ type: TFTFilterType.RACE, payload: races }}
          handleFilter={handleFilter}
          isCleared={raceFilter === null}
        />

        <SinkInButton
          onClick={() => {
            setJobFilter(null)
            setRaceFilter(null)
          }}>
          清除
        </SinkInButton>
      </div>
    </div>
  )
  return (
    <MutedCardWithHeader header={header} additionalCSS="col-span-2 ">
      <ChampionSelectionBoard champList={champList} />
    </MutedCardWithHeader>
  )
}
export default ChampionSelection
