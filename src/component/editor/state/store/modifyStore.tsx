import create from 'zustand'

import { ModifyStore } from '~/component/editor/state/store/storeTypes'
import {
  BasicEquipmentListProps,
  ChampWithEquipmentAndLevel,
  DraggingAction,
  HexProps,
  InputAction,
  StageTutorial,
  StageTutorialAction,
} from '~/component/editor/types'

import { draggingActionReducer } from '../reducers/draggingActionReducer'
import { inputActionReducer } from '../reducers/inputActionReducer'
import { StageTutorialActionReducer } from '../reducers/StageTutorialActionReducer'

const useModifyStore = create<ModifyStore>(
  (set): ModifyStore => ({
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
        video: '',
        title: '',
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
    setTag: (tag: string) => {
      set(() => ({ tag }))
    },
    setVideo: (video: string) => {
      set(() => ({ video }))
    },
    setInitialStore: ({
      champGroup,
      coreChampGroup,
      tag,
      video,
      title,
      comment,
      description,
      equipPriorityList,
      stageTutorial,
      tier1Hex,
      tier2Hex,
      tier3Hex,
    }: {
      champGroup: (ChampWithEquipmentAndLevel | null)[]
      coreChampGroup: ChampWithEquipmentAndLevel[]
      title: string
      description: string
      comment: string
      tag: string
      video: string
      equipPriorityList: BasicEquipmentListProps[]
      stageTutorial: StageTutorial[]
      tier1Hex: HexProps[]
      tier2Hex: HexProps[]
      tier3Hex: HexProps[]
    }) =>
      set({
        finalStage: { champGroup, coreChampGroup },
        title,
        tag,
        video,
        description,
        comment,
        equipPriorityList,
        stageTutorial,
        tier1Hex,
        tier2Hex,
        tier3Hex,
      }),
    setErrorMSG: (msg: string) => {
      set(() => ({ errorMSG: msg }))
    },
    setValidationError: (errorList: string[]) => {
      set(() => ({ validationError: errorList }))
    },
    draggingDispatch: (action: DraggingAction, destination: number) =>
      set((state) => draggingActionReducer(state, action, destination)),
    stageTutorialDispatch: (action: StageTutorialAction, order: number) =>
      set((state) => StageTutorialActionReducer(state, action, order)),
    inputDispatch: (action: InputAction) => set((state) => inputActionReducer(state, action)),
  })
)
export default useModifyStore
