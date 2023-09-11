import { motion } from 'framer-motion'

import { EditorStore, ModifyStore } from '~/component/editor/state/store/storeTypes'

import BtnGroupWithDivider from './BtnGroupWithDivider'
import ChampRow from './ChampRow'
import TutorialInputGroup from './TutorialInputs'

const StageTutorialDisplay = ({
  tutorialIndex,
  store,
}: {
  tutorialIndex: number
  store: EditorStore | ModifyStore
}) => {
  return (
    <motion.div
      style={{ overflow: 'hidden' }}
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      transition={{ duration: 0.2 }}
      key={tutorialIndex}>
      <div className="flex flex-col gap-1 pb-2 md:grid md:grid-cols-2 md:grid-rows-4 md:gap-0 ">
        <div className="flex flex-col justify-between gap-0 md:col-span-1 md:row-span-3 ">
          <ChampRow store={store} tutorialIndex={tutorialIndex} />
        </div>
        <div className="flex flex-col gap-2 md:col-span-1 md:row-span-4 md:pl-3">
          <TutorialInputGroup store={store} tutorialIndex={tutorialIndex} />
        </div>
      </div>
      <BtnGroupWithDivider store={store} tutorialIndex={tutorialIndex} />
    </motion.div>
  )
}

export default StageTutorialDisplay
