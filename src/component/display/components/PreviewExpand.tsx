import SynergyGroup from '~/component/editor/SynergyGroup'
import { ChampWithEquipmentAndLevel } from '~/component/editor/types'
import DisplayBoard from '~/component/preview/components/DisplayBoard'

const PreviewExpand = ({
  originalChampGroup,
}: {
  originalChampGroup: (ChampWithEquipmentAndLevel | null)[]
}) => {
  return (
    <div className="flex pt-4 ">
      <SynergyGroup champGroup={originalChampGroup} showText={false} isExpandView />

      <DisplayBoard champGroup={originalChampGroup} champSize="16" />
    </div>
  )
}
export default PreviewExpand
