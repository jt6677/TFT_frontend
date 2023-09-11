import { memo } from 'react'
import { useDrop } from 'react-dnd'
import tw, { css, styled } from 'twin.macro'

import { CoreChampBadge } from '~/component/lib'

import { ChampWithEquipmentAndLevel, ItemTypes } from '../types'
import CoreChamp from './CoreChampBlock'

// 1.coreChampBoard needs to be droppable
//     takes CoresChamps as props
// 2. onMouseEnter, show delete button
// 3 onMouseLeave, hide delete button
// 4. onClick, delete core champ

interface CoreChampGroupProps {
  onDrop: (action: any) => void
  handleDeleteCoreChamp: (index: number) => void
  champs: ChampWithEquipmentAndLevel[]
}

const CoreChampGroup = memo(({ champs, onDrop, handleDeleteCoreChamp }: CoreChampGroupProps) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.CHAMPIONONBOARD],
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop() && monitor.getItemType() === ItemTypes.CHAMPIONONBOARD,
      didDrop: monitor.didDrop(),
    }),
  })
  const isActive = isOver && canDrop
  let backgroundColor = css`
    ${tw`bg-callout`}
  `
  if (isActive) {
    backgroundColor = css`
      background-image: radial-gradient(
        circle farthest-corner at -1% 57.5%,
        rgba(19, 170, 82, 1) 0%,
        rgba(0, 102, 43, 1) 90%
      );
    `
  } else if (canDrop) {
    backgroundColor = css`
      background-image: radial-gradient(
        circle farthest-corner at 50.1% 52.3%,
        rgba(255, 211, 78, 0.85) 58.2%,
        rgba(255, 230, 68, 0.8) 90.1%
      );
    `
  }

  const Badge = styled.div`
    top: -28px;
    right: -18px;
    ${tw`absolute z-10 w-[50px]`};
  `
  const shadowEffect = css`
    box-shadow: -10px -10px 10px hsl(240, 25%, 11%), 10px 10px 9px hsl(240, 25%, 11%);
  `

  return (
    <div css={[tw` rounded-3xl`, shadowEffect]}>
      <div
        className="fadeoutBorder"
        ref={drop}
        css={[tw`relative  rounded-3xl min-h-[6rem]  text-textColor`, backgroundColor]}>
        <Badge>
          <CoreChampBadge />
        </Badge>
        {champs?.map((champ, index) => (
          <CoreChamp
            champ={champ}
            key={`${champ.TFTID}-${index}`}
            handleDeleteCoreChamp={() => {
              handleDeleteCoreChamp(index)
            }}
          />
        ))}
        {champs.length < 3 && <div className="pt-8 center ">棋盘英雄拖拽至此</div>}
      </div>
    </div>
  )
})

export default CoreChampGroup
