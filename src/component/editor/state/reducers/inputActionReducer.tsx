import produce from 'immer'

import { EditorStore, ModifyStore } from '~/component/editor/state/store/storeTypes'
import { InputAction, InputActionType } from '~/component/editor/types'

export const inputActionReducer = (state: EditorStore | ModifyStore, action: InputAction) => {
  switch (action.type) {
    case InputActionType.TUTORIAL_TITLE: {
      return produce(state, (draft) => {
        draft.title = action.payload
      })
    }
    case InputActionType.TUTORIAL_COMMENT: {
      return produce(state, (draft) => {
        draft.comment = action.payload
      })
    }
    case InputActionType.TUTORIAL_INTRODUCTION: {
      return produce(state, (draft) => {
        draft.description = action.payload
      })
    }
    default:
      return state
  }
}
