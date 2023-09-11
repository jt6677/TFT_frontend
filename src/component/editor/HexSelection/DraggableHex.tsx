import { memo, MouseEvent, useRef } from 'react'
import { DragSourceMonitor, useDrag } from 'react-dnd'

import { DraggingActionType, HexProps, ItemTypes } from '~/component/editor/types'
import useHover from '~/utils/hooks/useHover'

import HexHoverable from './HexHoverable'

export const DraggableHex = memo(
  ({ hex, handleDelete }: { hex: HexProps; handleDelete?: () => void }) => {
    const hoverRef = useRef(null)
    const isHovered = useHover(hoverRef)

    const FindHexTier = (hexTier: string) => {
      switch (hexTier) {
        case '1':
          return ItemTypes.TIER1HEX
        case '2':
          return ItemTypes.TIER2HEX
        case '3':
          return ItemTypes.TIER3HEX

        default:
          return ItemTypes.TIER3HEX
      }
    }

    const HexCircle = ({ hex }: { hex: HexProps }) => {
      return (
        <div className="z-10 overflow-hidden border-2 rounded-full w-11 h-11 bg-callout border-goldBorder">
          <img
            src={hex.imgUrl}
            alt={hex.name}
            className="w-full h-full rounded-full pointer-events-none"
            draggable={false}
          />
        </div>
      )
    }
    const [{ opacity }, drag] = useDrag(
      () => ({
        type: FindHexTier(hex.type),
        item: {
          type: DraggingActionType.DROP_NEW_HEX,
          payload: { droppedHex: hex, tierName: hex.type },
        },
        collect: (monitor: DragSourceMonitor) => ({
          opacity: monitor.isDragging() ? 0.4 : 1,
        }),
      }),
      [hex]
    )
    const handleLeftClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      e.preventDefault()
      if (handleDelete && e.type === 'contextmenu') {
        handleDelete()
        //   console.log('Clicked mother fucker')
      }
    }
    return (
      <div className="relative group ">
        <div
          className="hover:scale-110"
          role="button"
          ref={drag}
          style={{ opacity }}
          onContextMenu={(e) => handleLeftClick(e)}>
          <div ref={hoverRef} className="relative">
            <HexCircle hex={hex} />
          </div>
          <span className="w-12 pt-1 text-xs center text-textColor">{hex.name}</span>
        </div>
        {isHovered && (
          <div className="absolute z-50 hidden -translate-x-24 group-hover:inline ">
            <HexHoverable hex={hex} />
          </div>
        )}
      </div>
    )
  }
)
