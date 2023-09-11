import Rating from '@mui/material/Rating'
import { memo, MouseEvent } from 'react'
import { useDrop } from 'react-dnd'

import PolygonShape from '~/component/editor/ChessBoard/PolygonShape'
import useStore from '~/component/editor/state/store/editorStore'

import {
  ChampWithEquipmentAndLevel,
  ItemTypes,
  StageTutorialAction,
  StageTutorialActionType,
} from '../types'

interface TutorialPolygonProps {
  boardIndex: number
  onDrop: (action: any) => void
  handleLevelChange: (action: StageTutorialAction) => void
  droppedChamp: ChampWithEquipmentAndLevel | null
  tutorialIndex: number
}
const TutorialPolygon = memo(
  ({
    boardIndex,
    onDrop,
    droppedChamp,
    handleLevelChange,
    tutorialIndex,
  }: TutorialPolygonProps) => {
    const [{ isOver, canDrop }, drop] = useDrop({
      accept: [ItemTypes.CHAMPION, ItemTypes.ITEM],
      drop: onDrop,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop:
          monitor.canDrop() &&
          (monitor.getItemType() === ItemTypes.CHAMPION ||
            monitor.getItemType() === ItemTypes.ITEM),
        didDrop: monitor.didDrop(),
      }),
    })

    const isActive = isOver && canDrop
    let backgroundColor = 'hsl(240, 25%, 38%)'
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
    const dispatch = useStore((state) => state.stageTutorialDispatch)

    const handleLeftClick = (
      e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
    ) => {
      e.preventDefault()
      if (e.type === 'contextmenu') {
        dispatch(
          {
            type: StageTutorialActionType.DELETE_STAGE_TUTORIAL_CHAMP,
            payload: { destination: boardIndex },
          },
          tutorialIndex
        )
      }
    }
    function renderRating() {
      return (
        <div className="absolute inset-0 z-10 flex items-start justify-center mt-3">
          <Rating
            name="level"
            max={3}
            size="small"
            value={droppedChamp!.level}
            onChange={(event, newValue) => {
              if (newValue === null) return
              handleLevelChange({
                type: StageTutorialActionType.CHANGE_STAGE_TUTORIAL_CHAMP_LEVEL,
                payload: { destination: boardIndex, level: newValue },
              })
            }}
          />
        </div>
      )
    }

    function renderEquiped() {
      return (
        <div className="absolute z-20 flex justify-center w-full">
          {droppedChamp?.equiped.map((equip, index) => (
            <div key={equip.TFTID} className="w-1/3 -translate-y-[30%] ">
              <img
                className="border border-goldBorder md:w-full "
                src={equip.imagePath}
                alt={equip.name}
              />
            </div>
          ))}
        </div>
      )
    }
    function renderTutorialChamp(
      champ: ChampWithEquipmentAndLevel | null,
      color: string
    ) {
      return (
        <>
          {champ === null ? (
            <PolygonShape backgroundColor={color} />
          ) : (
            <div className="relative z-0" onContextMenu={handleLeftClick}>
              <svg className="w-full " viewBox="0 0 84 96">
                <defs>
                  <clipPath id="polygon">
                    <polygon
                      points="184 24 226 -3.16413562e-15 268 24 268 72 226 96 184 72"
                      transform="translate(-184, 0)"
                    />
                  </clipPath>
                </defs>
                <image
                  xlinkHref={champ.url}
                  width="100"
                  height="100"
                  x="-4"
                  y="-2"
                  clipPath="url(#polygon)"
                />
                <path
                  stroke={FindRingColor(champ.level)}
                  strokeWidth="4"
                  fill="none"
                  className="slot-border"
                  d="M186,25.1606451 L186,70.8393549 L226,93.6964978 L266,70.8393549 L266,25.1606451 L226,2.30350221 L186,25.1606451 Z"
                  transform="translate(-184, 0)"
                />
              </svg>
              {renderRating()}
              {champ.equiped.length > 0 && renderEquiped()}
            </div>
          )}
        </>
      )
    }
    return (
      <div ref={drop} className="flex px-1 py-1 m-auto w-[10%]">
        {renderTutorialChamp(droppedChamp, backgroundColor)}
      </div>
    )
  }
)
export default TutorialPolygon
