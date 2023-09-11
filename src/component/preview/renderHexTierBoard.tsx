import { HexProps } from '~/component/editor/types'

import DisplayHexTierBoard from './components/DisplayHexTierBoard'

function renderHexTierBoard(hexTiers: HexProps[][]) {
  return (
    <div className="flex justify-center gap-3 ">
      {hexTiers.map((hexList, index) => {
        const tierName = index === 0 ? '1' : index === 1 ? '2' : '3'
        return <DisplayHexTierBoard hexList={hexList} tierName={tierName} />
      })}
    </div>
  )
}
export default renderHexTierBoard
