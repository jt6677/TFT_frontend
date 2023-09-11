import { memo, useLayoutEffect, useState } from 'react'

import { colorNamesCSS, NumTotalLevelToColorNames } from '~/assets/stats'
import { CardWithFooter } from '~/component/lib'
import { SynergyProp } from '~/component/mis'

const SynergyHoverable = memo(({ synergy }: { synergy: SynergyProp }) => {
  const { introduce, totalLevel, levelStats } = synergy
  const [levelColorArr, setLevelColorArr] = useState<string[]>([])
  useLayoutEffect(() => {
    const colorArr = NumTotalLevelToColorNames[totalLevel as 1 | 2 | 3 | 4] || [
      'bronze',
    ]

    const arr = colorArr.reduce((prev, curr) => {
      prev.push(colorNamesCSS[curr])
      return prev
    }, [] as string[])
    setLevelColorArr(arr)
  }, [synergy])

  const stats = Object.values(levelStats)
  const keys = Object.keys(levelStats)

  const footer = levelColorArr.length > 1 && (
    <div className="grid gap-3 m-2 ">
      {levelColorArr.map((color, index) => (
        <p key={`${color}-${index}`}>
          <span
            className="inline-block h-8 w-8 rounded-full p-[4px] text-center font-bold text-bgColor"
            style={{ background: `${color}` }}>
            {keys[index]}
          </span>
          <span className="text-sm"> {stats[index]}</span>
        </p>
      ))}
    </div>
  )
  const body = <div className="m-2">{introduce}</div>

  return (
    <div className="w-[18rem] text-textColor">
      <CardWithFooter footer={footer} body={body} />
    </div>
  )
})
export default SynergyHoverable
