import { ChevronRightIcon } from '@heroicons/react/solid'

import { BasicEquipmentListProps } from '~/component/editor/types'
import DisplayBasiceEquipment from '~/component/preview/components/DisplayBasiceEquipment'

function renderEquipPriorityList(equipList: BasicEquipmentListProps[]) {
  return (
    <div className="flex justify-center gap-1 pt-10">
      <span className="flex items-center text-sm ">抢装顺序</span>
      <div className="flex space-x-1 ">
        {equipList.map((item) => (
          <>
            <ChevronRightIcon className="w-3" />
            <DisplayBasiceEquipment equipment={item.basicEquip} key={item.Id} />
          </>
        ))}
      </div>
    </div>
  )
}
export default renderEquipPriorityList
