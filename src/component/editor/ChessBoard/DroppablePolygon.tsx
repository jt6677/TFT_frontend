import Rating from '@mui/material/Rating'
import { FC, MouseEvent, ReactNode } from 'react'
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd'

import PolygonShape from '~/component/editor/ChessBoard/PolygonShape'

import {
  ChampWithEquipmentAndLevel,
  DraggingActionType,
  ItemTypes,
} from '../types'

export interface DroppablePolygonProps {
  boardIndex: number
  onDrop: (action: any) => void
  droppedChamp: ChampWithEquipmentAndLevel
}

const DroppablePolygon: FC<DroppablePolygonProps> = ({
  boardIndex,
  onDrop,
  droppedChamp,
}: DroppablePolygonProps) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.CHAMPIONONBOARD, ItemTypes.CHAMPION, ItemTypes.ITEM],
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop:
        monitor.canDrop() &&
        (monitor.getItemType() === ItemTypes.CHAMPION ||
          monitor.getItemType() === ItemTypes.CHAMPIONONBOARD ||
          monitor.getItemType() === ItemTypes.ITEM),
      didDrop: monitor.didDrop(),
    }),
  })
  const handleLeftClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault()
    if (e.type === 'contextmenu') {
      onDrop({
        type: DraggingActionType.DELETE_ONBOARD_CHAMP,
        payload: { origin: boardIndex },
      })
    }
  }
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.CHAMPIONONBOARD,
      item: {
        type: DraggingActionType.MOVE_ONBOARD_CHAMP,
        payload: { droppedChamp, origin: boardIndex },
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
      end: (_, monitor) => {
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          onDrop({
            type: DraggingActionType.DELETE_ONBOARD_CHAMP,
            payload: { origin: boardIndex },
          })
        }
      },
    }),

    [droppedChamp, boardIndex]
  )

  const isActive = isOver && canDrop
  let backgroundColor = 'hsl(240, 25%, 36%)'

  if (isActive) {
    backgroundColor = 'rgba(19, 170, 82, 1)'
  } else if (canDrop) {
    backgroundColor = 'rgba(255, 211, 78, 0.85)'
  }

  const FindRingColor = (level: number) => {
    if (level === 1) return '#A5A5C9'
    if (level === 2) return '#59c7d4'
    if (level === 3) return '#eb8153'
  }

  function renderRating() {
    return (
      <div className="absolute inset-0 z-10 flex items-start justify-center mt-4">
        <Rating
          name="level"
          max={3}
          size="small"
          value={droppedChamp.level}
          onChange={(event, newValue) => {
            if (newValue === null) return
            onDrop({
              type: DraggingActionType.CHANGE_CHAMP_LEVEL,
              payload: { origin: boardIndex, level: newValue },
            })
          }}
        />
      </div>
    )
  }
  function renderEquiped() {
    return (
      <div className="absolute z-40 flex justify-center w-full -translate-y-8">
        {droppedChamp.equiped.map((equip, index) => (
          <div key={`${equip.TFTID}-${index}`}>
            <img
              className="w-4 h-4 border border-goldBorder md:h-6 md:w-6 "
              src={equip.imagePath}
              alt={equip.name}
            />
          </div>
        ))}
      </div>
    )
  }

  function renderChampOnBoard(): ReactNode {
    return (
      <div
        ref={drag}
        className="relative z-0 cursor-grab"
        role="button"
        onContextMenu={(e) => handleLeftClick(e)}>
        <svg width="100%" viewBox="0 0 84 96">
          <defs>
            <clipPath id="polygon">
              <polygon
                points="184 24 226 -3.16413562e-15 268 24 268 72 226 96 184 72"
                transform="translate(-184, 0)"
              />
            </clipPath>
          </defs>
          <image
            xlinkHref={droppedChamp.url}
            width="100"
            height="100"
            x="-4"
            y="-2"
            clipPath="url(#polygon)"
          />
          <path
            stroke={FindRingColor(droppedChamp.level)}
            strokeWidth="4"
            fill="none"
            d="M186,25.1606451 L186,70.8393549 L226,93.6964978 L266,70.8393549 L266,25.1606451 L226,2.30350221 L186,25.1606451 Z"
            transform="translate(-184, 0)"
          />
        </svg>
        {renderRating()}
        {droppedChamp.equiped.length > 0 && renderEquiped()}
      </div>
    )
  }
  return (
    <div ref={drop} className="flex w-full ">
      {droppedChamp?.url ? (
        renderChampOnBoard()
      ) : (
        <PolygonShape backgroundColor={backgroundColor} />
      )}
    </div>
  )
}
export default DroppablePolygon
