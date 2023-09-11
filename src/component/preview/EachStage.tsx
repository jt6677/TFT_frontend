import { ReactNode } from 'react'

import SynergyGroup from '~/component/editor/SynergyGroup'
import { ChampWithEquipmentAndLevel } from '~/component/editor/types'
import DisplayPolygon from '~/component/preview/components/DisplayPolygon'

const EachStage = ({
  stage,
}: {
  stage: {
    champGroup: (ChampWithEquipmentAndLevel | null)[]
    comment: string
    title: string
  }
}) => {
  return (
    <div className="p-2">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-2 border-t border-brightGold" />
        </div>
        <div className="relative flex ">
          <span className="pr-2 font-semibold text-brightGold bg-muted">
            <span>{stage.title}</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col break-words ">
        <p className="break-words text-[14px]">{stage.comment}</p>
        <div className="flex flex-col ">
          <div className="flex">
            <SynergyGroup champGroup={stage.champGroup} showText={false} />
          </div>
          <div className="flex gap-2 ">
            {stage.champGroup.reduce((acc, champ, index) => {
              if (champ) {
                acc.push(<DisplayPolygon champ={champ} key={index} showName champSize="14" />)
              }
              return acc
            }, [] as ReactNode[])}
          </div>
        </div>
      </div>
    </div>
  )
}
export default EachStage
