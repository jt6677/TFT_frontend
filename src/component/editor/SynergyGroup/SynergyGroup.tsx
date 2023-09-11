import { memo, useLayoutEffect, useState } from 'react'

import { ChampWithEquipmentAndLevel } from '~/component/editor/types'
import { FindSynergy, SynergyProp } from '~/component/mis'

import SynergyBlock from './SynergyBlock'

const SynergyGroup = memo(
  ({
    champGroup,
    showText = true,
    isExpandView = false,
  }: {
    champGroup: (ChampWithEquipmentAndLevel | null)[]
    showText?: boolean
    isExpandView?: boolean
  }) => {
    const [synergyResult, setSynergyResult] = useState<SynergyProp[]>([])
    useLayoutEffect(() => {
      setSynergyResult(FindSynergy(champGroup))
    }, [champGroup])
    if (synergyResult.length > 0 && isExpandView) {
      return (
        <div className="flex ">
          <div>
            {synergyResult.slice(0, 3).map((item, index) => (
              <SynergyBlock synergyProp={item} key={`${item.Id}-${index}`} showText={showText} />
            ))}
          </div>
          <div>
            {synergyResult.slice(3).map((item, index) => (
              <SynergyBlock synergyProp={item} key={`${item.Id}-${index}`} showText={showText} />
            ))}
          </div>
        </div>
      )
    }
    if (synergyResult.length > 0) {
      return (
        <>
          {synergyResult.map((item, index) => (
            <SynergyBlock synergyProp={item} key={`${item.Id}-${index}`} showText={showText} />
          ))}
        </>
      )
    }
    return null
  }
)

export default SynergyGroup
