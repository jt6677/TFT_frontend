import classNames from 'classnames'
import { memo, useEffect, useRef, useState } from 'react'

import { NumTotalLevelToColorNames } from '~/assets/stats'
import { SynergyProp } from '~/component/mis'
import useHover from '~/utils/hooks/useHover'

import SynergyHoverable from './SynergyHoverable'

const SynergyBlock = memo(
  ({
    synergyProp,
    showText = true,
  }: {
    synergyProp: SynergyProp
    showText?: boolean
  }) => {
    // totalLevel => colorNames => colorNamesCSS[levelReached-1]
    const hoverRef = useRef(null)
    const isHovered = useHover(hoverRef)

    const gradientname =
      NumTotalLevelToColorNames[synergyProp.totalLevel as 1 | 2 | 3 | 4][
        synergyProp.levelReached - 1
      ]

    const PolygonBadge = () => {
      switch (gradientname) {
        case 'bronze':
          return (
            <defs>
              <linearGradient id={gradientname} x1="1" y1="1" x2="0">
                <stop stopColor="#772f1a" />
                <stop offset=".74" stopColor="#f2a65a" />
              </linearGradient>
            </defs>
          )

        case 'silver':
          return (
            <defs>
              <linearGradient id={gradientname} x1="1" y1="1" x2="0">
                <stop stopColor="#bdd4e7" />
                <stop offset=".74" stopColor="#8693ab" />
              </linearGradient>
            </defs>
          )
        case 'gold':
          return (
            <defs>
              <linearGradient id={gradientname} x1="1" y1="1" x2="0">
                <stop stopColor="#CD7F32" />
                <stop offset=".74" stopColor="#fbd72b" />
              </linearGradient>
            </defs>
          )
        case 'chromatic':
          return (
            <defs>
              <linearGradient
                id={gradientname}
                x1="103.96%"
                y1="95.28%"
                x2="-3.96%"
                y2="4.72%">
                <stop stopColor="#7d93f2" />
                <stop offset=".13" stopColor="#9489f5" />
                <stop offset=".23" stopColor="#c099fa" />
                <stop offset=".31" stopColor="#e1a5fd" />
                <stop offset=".38" stopColor="#b7aaf9" />
                <stop offset=".44" stopColor="#aec5f4" />
                <stop offset=".49" stopColor="#aee6ef" />
                <stop offset=".55" stopColor="#b7f1cf" />
                <stop offset=".61" stopColor="#cff2c0" />
                <stop offset=".68" stopColor="#f3f1c8" />
                <stop offset=".76" stopColor="#efdeae" />
                <stop offset=".86" stopColor="#edc397" />
                <stop offset="1" stopColor="#e99f7c" />
              </linearGradient>
            </defs>
          )
        default:
          break
      }
    }

    function renderSynergyPolygon() {
      return (
        <div className="flex ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-14"
            viewBox="183 0 131 97">
            {PolygonBadge()}

            <path
              d="m186 25.1606 0 45.6788 40 22.8571 26-13.6965 57 0 0-63-57 0-26-14.6965-40 22.6965z"
              fill={`url(#${gradientname})`}
              stroke="#ededff"
              strokeWidth="6"
            />
          </svg>
          <img
            src={synergyProp.imagePath}
            alt={synergyProp.name}
            className="absolute z-10 w-8 h-8 translate-x-[1px] translate-y-[5px] invert"
            draggable="false"
          />
          <div className="absolute text-xl font-extrabold text-bgColor translate-x-[35px] translate-y-[7px]">
            {synergyProp.champsCount}
          </div>
        </div>
      )
    }
    function renderSynergyInfo() {
      return (
        <div className="md:absolute md:col-span-2 md:translate-x-[100px] text-sm md:text-base md:font-semibold">
          <div>{synergyProp.name}</div>
          <div>
            {synergyProp.level.map((l, index) => {
              return (
                <span
                  className={classNames({
                    'text-gray-500': !(index < synergyProp.levelReached),
                  })}
                  key={l.champCount}>
                  {index !== 0 ? ' /' : ''}
                  {` ${l.champCount}`}
                </span>
              )
            })}
          </div>
        </div>
      )
    }
    return (
      <div className="relative ">
        <div
          ref={hoverRef}
          className="relative items-center w-full h-full p-2 md:grid rounded-xl text-textColor">
          {renderSynergyPolygon()}
          {showText && renderSynergyInfo()}
        </div>

        {isHovered && (
          <div className="absolute z-50 ">
            <SynergyHoverable synergy={synergyProp} />
          </div>
        )}
      </div>
    )
  }
)

export default SynergyBlock
