import { memo, useRef } from 'react'

import HexHoverable from '~/component/editor/HexSelection/HexHoverable'
import { HexProps } from '~/component/editor/types'
import useHover from '~/utils/hooks/useHover'

const HexCircleWithHoverable = memo(({ hex }: { hex: HexProps }) => {
  const hoverRef = useRef(null)
  const isHovered = useHover(hoverRef)
  const HexCircle = ({ hex }: { hex: HexProps }) => {
    return (
      <div className="z-10 overflow-hidden border-2 rounded-full w-11 h-11 bg-callout border-goldBorder">
        <img
          src={hex.imgUrl}
          alt={hex.name}
          className="w-full h-full scale-110 rounded-full "
          draggable={false}
        />
      </div>
    )
  }
  return (
    <div className="relative">
      <div ref={hoverRef}>
        <div role="button">
          <HexCircle hex={hex} />
          <span className="w-12 pt-1 text-xs center text-textColor">
            {hex.name}
          </span>
        </div>
      </div>
      {isHovered && (
        <div className="absolute z-50 -translate-x-32">
          <HexHoverable hex={hex} />
        </div>
      )}
    </div>
  )
})
export default HexCircleWithHoverable
