import { memo } from 'react'

import { EditorStore, ModifyStore } from '~/component/editor/state/store/storeTypes'
import { Button } from '~/component/lib'

import { StageTutorialActionType } from '../types'

const Eraser = () => {
  return (
    <svg className="w-5 h-5" fill="#ededff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M14 19h7v2h-9l-3.998.002-6.487-6.487a1 1 0 0 1 0-1.414L12.12 2.494a1 1 0 0 1 1.415 0l7.778 7.778a1 1 0 0 1 0 1.414L14 19zm1.657-4.485l3.535-3.536-6.364-6.364-3.535 3.536 6.364 6.364z" />
    </svg>
  )
}
const TrashIcon = () => {
  return (
    <svg
      className="w-5 h-5"
      fill="#ededff"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24">
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm-8 5v6h2v-6H9zm4 0v6h2v-6h-2zM9 4v2h6V4H9z" />
    </svg>
  )
}
const BtnGroupWithDivider = memo(
  ({ tutorialIndex, store }: { tutorialIndex: number; store: EditorStore | ModifyStore }) => {
    const dispatch = store.stageTutorialDispatch
    const handleClear = () => {
      dispatch({ type: StageTutorialActionType.CLEAR_TUTORIAL }, tutorialIndex)
    }
    const handleDelete = () => {
      dispatch({ type: StageTutorialActionType.DELETE_TUTORIAL }, tutorialIndex)
    }
    return (
      <div className="relative ">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-lightGray" />
        </div>
        <div className="relative flex justify-center">
          <div className="btn-group">
            <Button type="secondary" onClick={handleClear} name="清除">
              <Eraser />
            </Button>
            <Button type="secondary" onClick={handleDelete} name="删除">
              <TrashIcon />
            </Button>
          </div>
        </div>
      </div>
    )
  }
)

export default BtnGroupWithDivider
