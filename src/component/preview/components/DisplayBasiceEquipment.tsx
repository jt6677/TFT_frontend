import { EquipmentProps } from '~/component/editor/types'

interface DisplayBasiceEquipmentProps {
  equipment: EquipmentProps
}

const DisplayBasiceEquipment = ({ equipment }: DisplayBasiceEquipmentProps) => {
  return (
    <div className="w-8">
      <img
        className="border border-goldBorder"
        src={equipment.imagePath}
        alt={equipment.name}
      />
    </div>
  )
}

export default DisplayBasiceEquipment
