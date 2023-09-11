import { TrashIcon } from '@heroicons/react/solid'
import Rating from '@mui/material/Rating'
import { memo, useRef } from 'react'

import { ChampCircle } from '~/component/lib'
import useHover from '~/utils/hooks/useHover'

import { ChampWithEquipmentAndLevel } from '../types'

const CoreChamp = memo(
  ({
    champ,
    handleDeleteCoreChamp,
  }: {
    champ: ChampWithEquipmentAndLevel
    handleDeleteCoreChamp: () => void
  }) => {
    const hoverRef = useRef(null)
    const isHovered = useHover(hoverRef)
    // console.log('corChamp')
    return (
      <div className="relative py-4 " ref={hoverRef}>
        {isHovered && (
          <div className="absolute z-30 flex w-full h-full text-xl ">
            <button className="m-auto" type="button" onClick={handleDeleteCoreChamp}>
              <TrashIcon className="-translate-y-4 h-9 w-9 text-textColor" />
            </button>
          </div>
        )}
        <div className={`grid grid-cols-5 ${isHovered ? 'blur-sm' : ''}`}>
          <div className="col-span-2 ">
            <div className="flex flex-col ">
              <div className="center">
                <ChampCircle champ={champ} />
              </div>
              <h1 className="font-bold text-yellow-300 center">{champ.name}</h1>
            </div>
          </div>
          {/* name and items */}
          <div className="col-span-3 ">
            <div className="flex flex-col justify-between w-full ">
              <div className="flex justify-center pb-2 ">
                <Rating name="level" max={3} size="large" value={champ.level} readOnly />
              </div>
              <div className="flex justify-center">
                {champ.equiped.length > 0 &&
                  champ.equiped.map((equip, index) => (
                    <div key={`${equip.TFTID}-${index}`} className="w-auto ">
                      <img
                        className="w-8 border border-goldBorder"
                        src={equip.imagePath}
                        alt={equip.name}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
export default CoreChamp
