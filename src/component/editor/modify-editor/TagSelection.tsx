import cn from 'classnames'
import { useEffect, useState } from 'react'
import shallow from 'zustand/shallow'

import useModifyStore from '~/component/editor/state/store/modifyStore'
import { tagList } from '~/utils/queries'

const TagSelection = () => {
  const [tag, setTag] = useModifyStore(
    (state) => [state.tag, state.setTag],
    shallow
  )
  const [tagSelected, setTagSelected] = useState<number | undefined>(
    tagList.findIndex((t) => t.tagName === tag)
  )
  const handleClickTags = (index: number) => {
    setTagSelected(index)

    if (tagSelected !== undefined) {
      setTag(tagList[index].tagName)
    }
  }
  useEffect(() => {
    if (tag) {
      setTagSelected(tagList.findIndex((t) => t.tagName === tag))
    }
  }, [tag])

  return (
    <div className="flex items-center">
      <div className="font-semibold text-center text-textColor">
        攻略类型(必选):
      </div>
      <div className="pl-4 btn-group">
        {tagList.map((tag, index) => (
          <button
            type="button"
            onClick={() => handleClickTags(index)}
            className={cn(
              'btn btn-deluxe btn-sm btn-deluxe-switchable ',
              { active: tagSelected === index },
              { 'btn-light': index === 0 },
              { 'btn-info': index === 1 },
              { 'btn-danger': index === 2 }
            )}>
            <span className="btn-deluxe-edge" />
            <span className="text-sm btn-deluxe-front">{tag.tagName}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
export default TagSelection
