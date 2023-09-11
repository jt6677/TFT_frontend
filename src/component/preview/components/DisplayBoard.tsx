import { FC, memo } from 'react'

import { ChampWithEquipmentAndLevel } from '~/component/editor/types'

import DisplayPolygon from './DisplayPolygon'

interface BoardProps {
  champGroup: Array<null | ChampWithEquipmentAndLevel>
  champSize?: string
}

const DisplayBoard: FC<BoardProps> = memo(
  ({ champGroup, champSize }: BoardProps) => {
    function renderSinglePolygon(index: number, droppedChamp: any) {
      return (
        <DisplayPolygon
          champ={droppedChamp}
          key={index}
          showName={false}
          champSize={champSize}
        />
      )
    }

    const ploygons = []
    for (let i = 0; i < 28; i += 1) {
      ploygons.push(renderSinglePolygon(i, champGroup[i]))
    }
    return (
      <div className="px-2">
        <div className="flex gap-4 pr-[6.5%]">{ploygons.slice(0, 7)}</div>
        <div className="flex -translate-y-1 gap-4 pl-[6.5%]">
          {ploygons.slice(7, 14)}
        </div>
        <div className="flex -translate-y-2 gap-4 pr-[6.5%]">
          {ploygons.slice(14, 21)}
        </div>
        <div className="flex -translate-y-3 gap-4 pl-[6.5%] ">
          {ploygons.slice(21, 28)}
        </div>
      </div>
    )
  }
)

export default DisplayBoard
