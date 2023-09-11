import { memo } from 'react'

import ChampionSelection from '~/component/editor/ChampSelection'

import EquipmentSelection from './EquipSelection'

const SelectionGroup = memo(() => {
  return (
    <div className="flex flex-col gap-1 mt-4 md:grid md:grid-cols-3">
      <ChampionSelection />
      <EquipmentSelection />
    </div>
  )
})
export default SelectionGroup
