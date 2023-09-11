import { ReactNode } from 'react'

import { ChampWithEquipmentAndLevel } from '~/component/editor/types'
import CoreChampBadgeRow from '~/component/preview/components/CoreChampBadgeRow'
import DisplayPolygon from '~/component/preview/components/DisplayPolygon'

function renderChampRowWithCoreChamps(
  coreChampGroup: ChampWithEquipmentAndLevel[],
  regularChampGroup: (ChampWithEquipmentAndLevel | null)[]
) {
  return (
    <div className="flex box-inner ">
      {coreChampGroup.reduce((acc, champ) => {
        if (champ) {
          acc.push(
            <div className="relative">
              <div className="absolute z-10 w-[25px] -top-[12px] ">
                <CoreChampBadgeRow />
              </div>
              <DisplayPolygon champ={champ} showName champSize="14" />
            </div>
          )
        }
        return acc
      }, [] as ReactNode[])}
      {regularChampGroup.reduce((acc, champ) => {
        if (champ) {
          acc.push(<DisplayPolygon champ={champ} showName champSize="14" />)
        }
        return acc
      }, [] as ReactNode[])}
    </div>
  )
}

export default renderChampRowWithCoreChamps
