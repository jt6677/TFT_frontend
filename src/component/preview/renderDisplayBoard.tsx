import SynergyGroup from '~/component/editor/SynergyGroup'
import { ChampWithEquipmentAndLevel, HexProps } from '~/component/editor/types'
import DisplayBoard from '~/component/preview/components/DisplayBoard'
import renderHexTierBoard from '~/component/preview/renderHexTierBoard'

function renderDisplayBoard(
  originalChampGroup: (ChampWithEquipmentAndLevel | null)[],
  hexTiers: HexProps[][]
) {
  return (
    <div className="center ">
      <div className="flex">
        <SynergyGroup champGroup={originalChampGroup} showText={false} />
      </div>
      <div className="center">
        <DisplayBoard champGroup={originalChampGroup} champSize="16" />
      </div>
      {renderHexTierBoard(hexTiers)}
    </div>
  )
}
export default renderDisplayBoard
