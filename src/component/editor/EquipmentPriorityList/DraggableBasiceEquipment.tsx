import { useDrag, useDrop } from 'react-dnd'

import { EquipmentProps, ItemTypes } from '../types'

interface DraggableBasiceEquipmentProps {
  Id: string
  equipment: EquipmentProps
  moveEquipment: (Id: string, to: number) => void
  findEquipment: (Id: string) => { index: number }
}
interface Item {
  Id: string
  originalIndex: number
}
export const DraggableBasiceEquipment = ({
  Id,
  equipment,
  moveEquipment,
  findEquipment,
}: DraggableBasiceEquipmentProps) => {
  const originalIndex = findEquipment(Id).index
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BASICEQUIPMENT,
      item: { Id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { Id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveEquipment(droppedId, originalIndex)
        }
      },
    }),
    [Id, originalIndex, moveEquipment]
  )
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BASICEQUIPMENT,
      hover({ Id: draggedId }: Item) {
        if (draggedId !== Id) {
          const { index: overIndex } = findEquipment(Id)
          moveEquipment(draggedId, overIndex)
        }
      },
    }),
    [findEquipment, moveEquipment]
  )
  const opacity = isDragging ? 0 : 1
  return (
    <div className="w-10 cursor-grab" ref={(node) => drag(drop(node))}>
      <div className="">
        <span>
          <img
            className="border border-goldBorder"
            src={equipment.imagePath}
            alt={equipment.name}
            draggable={false}
          />
        </span>
      </div>
    </div>
  )
}
