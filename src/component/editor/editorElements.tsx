import { AnimatePresence, motion } from 'framer-motion'
import { ChangeEvent } from 'react'
import shallow from 'zustand/shallow'

import useEditorStore from '~/component/editor/state/store/editorStore'
import { InputActionType } from '~/component/editor/types'
import { Button, SinkinInputField, TextInputWithTitle } from '~/component/lib'

import AddVideoModal from '../foudation/AddVideoModal'

export const FinalStageInputGroup = () => {
  const [inputDispatch, title, comment, description, video, setVideo] = useEditorStore(
    (state) => [
      state.inputDispatch,
      state.title,
      state.comment,
      state.description,
      state.video,
      state.setVideo,
    ],
    shallow
  )
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    type: InputActionType
  ) => {
    inputDispatch({ type, payload: e.target.value })
  }
  return (
    <fieldset className="mt-4 ">
      <div className="grid gap-4 md:flex md:-space-x-px ">
        <div className="flex-1 min-w-0 md:w-1/2 ">
          <TextInputWithTitle
            label="标题"
            type={InputActionType.TUTORIAL_TITLE}
            value={title}
            handleChange={handleChange}
          />
        </div>
        <div className="flex-1 min-w-0 pl-2 ">
          <TextInputWithTitle
            label="简介"
            type={InputActionType.TUTORIAL_INTRODUCTION}
            value={description}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className="pt-4">
        <TextInputWithTitle
          label="内容"
          rows={4}
          type={InputActionType.TUTORIAL_COMMENT}
          value={comment}
          handleChange={handleChange}
        />
      </div>
      <div className="pt-4 pl-2 ">
        {video ? (
          <AnimatePresence>
            <motion.div
              className="flex justify-between "
              style={{ overflow: 'hidden' }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}>
              <div className="w-3/4">
                <SinkinInputField value={video} />
              </div>
              <div className="pt-2 pl-2">
                <Button type="secondary" onClick={() => setVideo('')}>
                  清除视频
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            style={{ overflow: 'hidden' }}
            initial={{ opacity: 0.8, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.1 }}>
            <AddVideoModal setVideo={setVideo} />
          </motion.div>
        )}
      </div>
    </fieldset>
  )
}
