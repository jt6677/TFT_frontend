import { ChevronRightIcon } from '@heroicons/react/solid'
import { memo } from 'react'
import { useDrop } from 'react-dnd'
import tw, { css, styled } from 'twin.macro'

import useStore from '~/component/editor/state/store/editorStore'
import { DraggingAction, DraggingActionType, HexProps, ItemTypes } from '~/component/editor/types'
import { HexBadge } from '~/component/lib'

import { DraggableHex } from './DraggableHex'

// 1.coreChampBoard needs to be droppable
//     takes CoresChamps as props
// 2. onMouseEnter, show delete button
// 3 onMouseLeave, hide delete button
// 4. onClick, delete core champ

const HexTierBoard = memo(
  ({
    tierName,
    acceptableType,
    hexList,
    dispatch,
  }: {
    tierName: '1' | '2' | '3'
    acceptableType: string
    hexList: HexProps[]
    dispatch: (action: DraggingAction, destination: number) => void
  }) => {
    const handleDrop = (action: any) => {
      dispatch(action, 0)
    }
    const handleDelete = (index: number) => {
      dispatch({ type: DraggingActionType.DELETE_HEX, payload: { tierName, index } }, 0)
    }
    const [{ isOver, canDrop }, drop] = useDrop({
      accept: acceptableType,
      drop: handleDrop,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop() && monitor.getItemType() === acceptableType,
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

    const shadowEffect = css`
      box-shadow: -10px -10px 10px hsl(240, 25%, 11%), 10px 10px 9px hsl(240, 25%, 11%);
    `
    const Badge = styled.div`
      top: -10px;
      right: -10px;
      ${tw`absolute z-10 w-[45px]`};
    `
    return (
      <div css={[tw` rounded-3xl`, shadowEffect]}>
        <div>
          <div
            className="relative fadeoutBorder"
            ref={drop}
            css={[tw`relative  rounded-3xl min-h-[6rem]  text-textColor`, backgroundColor]}>
            <Badge>
              <HexBadge tierName={tierName} />
            </Badge>
            <div className="flex justify-center gap-1 p-2">
              {hexList?.map((hex, index) => (
                <>
                  <DraggableHex hex={hex} key={index} handleDelete={() => handleDelete(index)} />
                  <ChevronRightIcon className="w-4 -translate-y-4 last:hidden" />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export default HexTierBoard
