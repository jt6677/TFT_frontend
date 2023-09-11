import { PlusSmIcon } from '@heroicons/react/solid'
import { motion } from 'framer-motion'
import shallow from 'zustand/shallow'

import useModifyStore from '~/component/editor/state/store/modifyStore'
import { StageTutorialActionType } from '~/component/editor/types'

function AddTutorial() {
  const [stageTutorialDispatch] = useModifyStore((state) => [state.stageTutorialDispatch], shallow)
  return (
    <motion.div
      style={{ overflow: 'hidden' }}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-mutedColor" />
        </div>
        <div className="relative flex justify-center">
          <button
            type="button"
            className="btn btn-deluxe btn-info"
            onClick={() =>
              stageTutorialDispatch(
                {
                  type: StageTutorialActionType.START_STAGE_TUTORIAL,
                },
                0
              )
            }>
            <span className=" btn-deluxe-front text-textColor">
              <div className="flex items-centers">
                <PlusSmIcon className="h-7 w-7" aria-hidden="true" />
                <span className="m-auto font-semibold ">过渡阶段</span>
              </div>
            </span>
            <span className="btn-deluxe-edge" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
function AddStage() {
  const [stageTutorial] = useModifyStore((state) => [state.stageTutorial], shallow)
  return (
    <>
      {stageTutorial.length < 4 && (
        <div className="pb-2">
          <AddTutorial />
        </div>
      )}
    </>
  )
}
export default AddStage
