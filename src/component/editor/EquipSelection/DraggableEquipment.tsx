import { useRef } from 'react'
import { DragSourceMonitor, useDrag } from 'react-dnd'

import useHover from '~/utils/hooks/useHover'

import { DraggingActionType, EquipmentProps, ItemTypes } from '../types'
import EquipmentHoverable from './EquipmentHoverable'

export const DraggableEquipment = ({
  equipment,
}: {
  equipment: EquipmentProps
}) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.ITEM,
      item: {
        type: DraggingActionType.DROP_NEW_EQUIP,
        payload: { droppedEquip: equipment },
      },

      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [equipment]
  )
  const hoverRef = useRef(null)
  const isHovered = useHover(hoverRef)
  return (
    <div className="w-12 p-1 " style={{ opacity }}>
      <div ref={drag} className=" cursor-grab">
        <span ref={hoverRef}>
          <img
            className="transition-all border border-goldBorder hover:scale-110"
            src={equipment.imagePath}
            alt={equipment.name}
            draggable={false}
          />
        </span>
      </div>
      {isHovered && (
        <div className="-translate-x-[14rem] absolute z-50 ">
          <EquipmentHoverable equipment={equipment} />
        </div>
      )}
    </div>
  )
}
