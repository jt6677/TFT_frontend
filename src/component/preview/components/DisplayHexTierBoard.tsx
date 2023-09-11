import { ChevronRightIcon } from '@heroicons/react/solid'
import { memo } from 'react'
import tw, { styled } from 'twin.macro'

import { HexProps } from '~/component/editor/types'
import { HexBadge } from '~/component/lib'

import HexCircleWithHoverable from './HexCircleWithHoverable'

const DisplayHexTierBoard = memo(
  ({
    tierName,
    hexList,
  }: {
    tierName: '1' | '2' | '3'
    hexList: HexProps[]
  }) => {
    const Badge = styled.div`
      top: -6px;
      right: -10px;
      ${tw`absolute z-10 w-[50px]`};
    `
    return (
      <div className="rounded-3xl ">
        <div className="relative  text-textColor min-w-[14.5rem] min-h-[6rem] bg-callout rounded-3xl">
          <Badge>
            <HexBadge tierName={tierName} />
          </Badge>
          <div className="flex justify-center gap-[2px] p-2">
            {hexList?.map((hex, index) => (
              <>
                <HexCircleWithHoverable hex={hex} key={index} />
                <ChevronRightIcon className="w-3 -translate-y-4 last:hidden" />
              </>
            ))}
          </div>
        </div>
      </div>
    )
  }
)

export default DisplayHexTierBoard
