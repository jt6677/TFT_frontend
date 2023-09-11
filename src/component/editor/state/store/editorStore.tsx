import create from 'zustand'
import { persist } from 'zustand/middleware'

import {
  BasicEquipmentListProps,
  DraggingAction,
  InputAction,
  StageTutorialAction,
} from '~/component/editor/types'

import { draggingActionReducer } from '../reducers/draggingActionReducer'
import { inputActionReducer } from '../reducers/inputActionReducer'
import { StageTutorialActionReducer } from '../reducers/StageTutorialActionReducer'
import { EditorStore } from './storeTypes'

const useEditorStore = create<EditorStore>(
  persist(
    (set): EditorStore => ({
      finalStage: {
        champGroup: Array(28)
          .fill(null)
          .map(() => null),
        coreChampGroup: [],
      },
      tag: '',
      title: '',
      description: '',
      comment: '',
      video: '',
      tier1Hex: [],
      tier2Hex: [],
      tier3Hex: [],
      equipPriorityList: [],
      stageTutorial: [],
      errorMSG: '',
      validationError: [],
      setEquipPriorityList: (equipListWithID: BasicEquipmentListProps[]) =>
        set({ equipPriorityList: equipListWithID }),
      clearStore: () =>
        set({
          finalStage: {
            champGroup: Array(28)
              .fill(null)
              .map(() => null),
            coreChampGroup: [],
          },
          tag: '',
          title: '',
          video: '',
          description: '',
          comment: '',
          tier1Hex: [],
          tier2Hex: [],
          tier3Hex: [],
          equipPriorityList: [],
          stageTutorial: [],
          errorMSG: '',
          validationError: [],
        }),
      setErrorMSG: (msg: string) => {
        set(() => ({ errorMSG: msg }))
      },
      setTag: (tag: string) => {
        set(() => ({ tag }))
      },
      setVideo: (video: string) => {
        set(() => ({ video }))
      },
      setValidationError: (errorList: string[]) => {
        set(() => ({ validationError: errorList }))
      },
      draggingDispatch: (action: DraggingAction, destination: number) =>
        set((state) => draggingActionReducer(state, action, destination)),
      stageTutorialDispatch: (action: StageTutorialAction, order: number) =>
        set((state) => StageTutorialActionReducer(state, action, order)),
      inputDispatch: (action: InputAction) => set((state) => inputActionReducer(state, action)),
    }),
    { name: 'persistedState' }
  )
)
export default useEditorStore
