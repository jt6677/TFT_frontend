import { memo } from 'react'

import { EditorStore, ModifyStore } from '~/component/editor/state/store/storeTypes'
import {
  DraggingActionType,
  StageTutorialAction,
  StageTutorialActionType,
} from '~/component/editor/types'

import TutorialPolygon from './TutorialPolygon'

const ChampRow = memo(
  ({ tutorialIndex, store }: { tutorialIndex: number; store: EditorStore | ModifyStore }) => {
    const stage = store.stageTutorial[tutorialIndex]
    const dispatch = store.stageTutorialDispatch
    const handleDrop = (index: number, item: any) => {
      if (item.type === DraggingActionType.DROP_NEW_CHAMP) {
        dispatch(
          {
            type: StageTutorialActionType.DROP_STAGE_TUTORIAL_CHAMP,
            payload: {
              destination: index,
              droppedChamp: item.payload.droppedChamp,
            },
          },
          tutorialIndex
        )
      }
      if (item.type === DraggingActionType.DROP_NEW_EQUIP) {
        dispatch(
          {
            type: StageTutorialActionType.DROP_STAGE_TUTORIAL_EQUIP,
            payload: {
              destination: index,
              droppedEquip: item.payload.droppedEquip,
            },
          },
          tutorialIndex
        )
      }
    }
    const handleLevelChange = (action: StageTutorialAction) => {
      dispatch(action, tutorialIndex)
    }

    return (
      <div className="flex">
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <TutorialPolygon
              tutorialIndex={tutorialIndex}
              boardIndex={index}
              onDrop={(item) => handleDrop(index, item)}
              handleLevelChange={(action) => handleLevelChange(action)}
              droppedChamp={stage.champGroup[index]}
              key={index}
            />
          ))}
      </div>
    )
  }
)

export default ChampRow
