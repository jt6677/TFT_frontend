import { FC, memo } from 'react'

import { ChampWithEquipmentAndLevel } from '../types'
import DroppablePolygon from './DroppablePolygon'

interface BoardProps {
  onDrop: (index: number, item: any) => void
  champGroup: Array<null | ChampWithEquipmentAndLevel>
}

const DroppableBoard: FC<BoardProps> = memo(({ onDrop, champGroup }: BoardProps) => {
  function renderSinglePolygon(index: number, droppedChamp: any) {
    return (
      <DroppablePolygon
        boardIndex={index}
        onDrop={(item) => onDrop(index, item)}
        droppedChamp={droppedChamp}
        key={index}
      />
    )
  }

  const ploygons = []
  for (let i = 0; i < 28; i += 1) {
    ploygons.push(renderSinglePolygon(i, champGroup[i]))
  }
  return (
    <div className="px-2">
      <div className="flex gap-3 pr-[6.5%]">{ploygons.slice(0, 7)}</div>
      <div className="flex -translate-y-2 gap-3 pl-[6.5%]">{ploygons.slice(7, 14)}</div>
      <div className="flex -translate-y-4 gap-3 pr-[6.5%]">{ploygons.slice(14, 21)}</div>
      <div className="flex -translate-y-6 gap-3 pl-[6.5%] ">{ploygons.slice(21, 28)}</div>
    </div>
  )
})

export default DroppableBoard
