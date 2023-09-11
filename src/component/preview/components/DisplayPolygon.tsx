import Rating from '@mui/material/Rating'
import { FC, ReactNode } from 'react'

import PolygonShape from '~/component/editor/ChessBoard/PolygonShape'
import { ChampWithEquipmentAndLevel } from '~/component/editor/types'

export interface DisplayPolygonProps {
  champ: ChampWithEquipmentAndLevel
  showName?: boolean
  champSize?: string
}

const DisplayPolygon: FC<DisplayPolygonProps> = ({
  champ,
  champSize = '20',
  showName = false,
}: DisplayPolygonProps) => {
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
          value={champ.level}
          readOnly
        />
      </div>
    )
  }
  function renderEquiped() {
    return (
      <div className="absolute z-40 flex justify-center w-full -translate-y-5">
        {champ.equiped.map((equip, index) => (
          <div key={`${equip.TFTID}-${index}`}>
            <img
              className="w-3 h-3 border border-goldBorder md:h-[1.3rem] md:w-[1.3rem] "
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
      <div className="relative z-0 ">
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
            d="M186,25.1606451 L186,70.8393549 L226,93.6964978 L266,70.8393549 L266,25.1606451 L226,2.30350221 L186,25.1606451 Z"
            transform="translate(-184, 0)"
          />
        </svg>
        {renderRating()}
        {champ.equiped.length > 0 && renderEquiped()}
        {showName && (
          <span className="flex justify-center text-xs font-semibold">
            {champ.name}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`flex pl-1 w-${champSize}`} draggable={false}>
      {champ?.url ? (
        renderChampOnBoard()
      ) : (
        <PolygonShape backgroundColor="hsl(240, 25%, 38%)" />
      )}
    </div>
  )
}
export default DisplayPolygon
