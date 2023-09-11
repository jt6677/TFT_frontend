import { ChangeEvent } from 'react'

import { EditorStore, ModifyStore } from '~/component/editor/state/store/storeTypes'

import { StageTutorialActionType } from '../types'

function SinkinInput({
  value,
  placeholderText,
  handleChange,
  rows,
}: {
  value: string
  placeholderText?: string
  handleChange: (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => void
  rows?: number
}) {
  const inputFieldOrTextArea = rows ? (
    <textarea
      value={value}
      rows={rows}
      onChange={(e) => handleChange(e)}
      name="name"
      id="name"
      className="block w-full p-2 placeholder-gray-500 border-0 rounded-2xl bg-sinkIn text-textColor shadow-borderColor placeholder:text-darkGray focus:ring-0 sm:text-sm"
      placeholder={`*${placeholderText || ''}`}
      style={{
        boxShadow: 'inset -5px -5px 10px hsl(240, 25%, 20%), inset 5px 5px 9px hsl(240, 25%, 11%)',
      }}
    />
  ) : (
    <input
      value={value}
      onChange={(e) => handleChange(e)}
      name="name"
      id="name"
      className="block w-full p-2 placeholder-gray-500 border-0 rounded-2xl bg-sinkIn text-textColor shadow-borderColor placeholder:text-darkGray focus:ring-0 sm:text-sm"
      placeholder={`*${placeholderText || ''}`}
      style={{
        boxShadow: 'inset -5px -5px 10px hsl(240, 25%, 20%), inset 5px 5px 9px hsl(240, 25%, 11%)',
      }}
    />
  )

  return inputFieldOrTextArea
}
const TutorialInputGroup = ({
  tutorialIndex,
  store,
}: {
  tutorialIndex: number
  store: EditorStore | ModifyStore
}) => {
  const [title, comment] = [
    store.stageTutorial[tutorialIndex].title,
    store.stageTutorial[tutorialIndex].comment,
  ]
  const dispatch = store.stageTutorialDispatch

  const handleTitleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(
      {
        type: StageTutorialActionType.CHANGE_STAGE_TUTORIAL_TITLE,
        payload: { title: e.target.value },
      },
      tutorialIndex
    )
  }
  const handleCommentChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(
      {
        type: StageTutorialActionType.CHANGE_STAGE_TUTORIAL_COMMENT,
        payload: { comment: e.target.value },
      },
      tutorialIndex
    )
  }
  return (
    <>
      <SinkinInput value={title} handleChange={handleTitleChange} placeholderText="阶段" />
      <SinkinInput
        value={comment}
        handleChange={handleCommentChange}
        placeholderText="内容"
        rows={2}
      />
    </>
  )
}
export default TutorialInputGroup
