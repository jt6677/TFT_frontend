import { AnimatePresence, motion } from 'framer-motion'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import shallow from 'zustand/shallow'

import { ActionBtns } from '~/component/editor/ActionBtns'
import AddStage from '~/component/editor/AddStage'
import { FinalStageInputGroup } from '~/component/editor/editorElements'
import HexSelection from '~/component/editor/HexSelection'
import MainBoard from '~/component/editor/MainBoard'
import SelectionGroup from '~/component/editor/SelectionGroup'
import StageTutorialEditor from '~/component/editor/StageTutorialEditor'
import useEditorStore from '~/component/editor/state/store/editorStore'
import TagSelection from '~/component/editor/TagSelection'
import ErrorList from '~/component/foudation/ErrorList'

const EditorPage = () => {
  const errorList = useEditorStore((state) => state.validationError, shallow)

  return (
    <div className="flex flex-col">
      <div className="grid place-content-end">
        <ActionBtns />
      </div>
      <div className="pl-4">
        <TagSelection />
      </div>
      <AnimatePresence>
        {errorList.length > 0 && (
          <motion.div
            style={{ overflow: 'hidden' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}>
            <div className="flex justify-center">
              <div className="pt-4 w-[40%] ">
                <ErrorList errorList={errorList} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <FinalStageInputGroup />
      <div className="grid space-y-2 auto-rows-max">
        <DndProvider backend={HTML5Backend}>
          <MainBoard />
          <SelectionGroup />
          <StageTutorialEditor />
          <AddStage />
          <HexSelection />
        </DndProvider>
      </div>
    </div>
  )
}

export default EditorPage
