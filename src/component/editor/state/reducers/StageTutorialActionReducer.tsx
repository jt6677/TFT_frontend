import produce from 'immer'

import { EditorStore, ModifyStore } from '~/component/editor/state/store/storeTypes'
import { StageTutorialAction, StageTutorialActionType } from '~/component/editor/types'

export const StageTutorialActionReducer = (
  state: EditorStore | ModifyStore,
  action: StageTutorialAction,
  order: number
) => {
  switch (action.type) {
    case StageTutorialActionType.START_STAGE_TUTORIAL:
      return produce(state, (draft) => {
        draft.stageTutorial.push({
          champGroup: Array(10)
            .fill(null)
            .map(() => null),
          comment: '',
          title: '',
          order: draft.stageTutorial.length,
        })
      })

    case StageTutorialActionType.CHANGE_STAGE_TUTORIAL_COMMENT:
      return produce(state, (draft) => {
        draft.stageTutorial[order].comment = action.payload.comment
      })
    case StageTutorialActionType.CHANGE_STAGE_TUTORIAL_TITLE:
      return produce(state, (draft) => {
        draft.stageTutorial[order].title = action.payload.title
      })

    case StageTutorialActionType.DROP_STAGE_TUTORIAL_CHAMP:
      return produce(state, (draft) => {
        draft.stageTutorial[order].champGroup[action.payload.destination] = {
          ...action.payload.droppedChamp,
          equiped: [],
          level: 1,
        }
      })
    case StageTutorialActionType.DELETE_STAGE_TUTORIAL_CHAMP:
      return produce(state, (draft) => {
        draft.stageTutorial[order].champGroup[action.payload.destination] = null
      })

    case StageTutorialActionType.CHANGE_STAGE_TUTORIAL_CHAMP_LEVEL:
      return produce(state, (draft) => {
        draft.stageTutorial[order].champGroup[action.payload.destination]!.level =
          action.payload.level
      })

    case StageTutorialActionType.DROP_STAGE_TUTORIAL_EQUIP:
      if (state.stageTutorial[order].champGroup[action.payload.destination] === null) return state
      return produce(state, (draft) => {
        if (
          draft.stageTutorial[order].champGroup[action.payload.destination]!.equiped.length === 3
        ) {
          draft.stageTutorial[order].champGroup[action.payload.destination]!.equiped.shift()
        }
        draft.stageTutorial[order].champGroup[action.payload.destination]!.equiped.push(
          action.payload.droppedEquip
        )
      })

    case StageTutorialActionType.CLEAR_TUTORIAL:
      return produce(state, (draft) => {
        if (draft.stageTutorial[order]) {
          draft.stageTutorial[order].champGroup = Array(10)
            .fill(null)
            .map(() => null)
          draft.stageTutorial[order].comment = ''
          draft.stageTutorial[order].title = ''
        }
      })

    case StageTutorialActionType.DELETE_TUTORIAL:
      return produce(state, (draft) => {
        draft.stageTutorial.splice(order /* the index */, 1)
      })

    default:
      return state
  }
}
