import { memo } from 'react'

import { equipmentList } from '~/assets/stats'
import { MutedCardWithHeader } from '~/component/lib'

import { DraggableEquipment } from './DraggableEquipment'

const EquipmentSelection = memo(() => {
  return (
    <MutedCardWithHeader header="装备" additionalCSS="z-40 mt-2 md:mt-0">
      <div className="grid justify-start grid-cols-8 gap-1 p-2 auto-rows-auto md:grid-cols-7 ">
        {equipmentList.map((item) => (
          <DraggableEquipment equipment={item} key={item.equipId} />
        ))}
      </div>
    </MutedCardWithHeader>
  )
})

export default EquipmentSelection
