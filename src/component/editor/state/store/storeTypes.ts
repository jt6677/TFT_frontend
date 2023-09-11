import {
  BasicEquipmentListProps,
  ChampWithEquipmentAndLevel,
  DraggingAction,
  HexProps,
  InputAction,
  StageTutorial,
  StageTutorialAction,
} from '~/component/editor/types'

export interface EditorStore {
  finalStage: {
    champGroup: (ChampWithEquipmentAndLevel | null)[]
    coreChampGroup: ChampWithEquipmentAndLevel[]
  }
  tag: string
  title: string
  description: string
  comment: string
  video: string
  tier1Hex: HexProps[]
  tier2Hex: HexProps[]
  tier3Hex: HexProps[]
  equipPriorityList: BasicEquipmentListProps[]
  stageTutorial: StageTutorial[]
  errorMSG: string
  validationError: string[]
  setEquipPriorityList: (equipList: BasicEquipmentListProps[]) => void
  clearStore: () => void
  setErrorMSG: (msg: string) => void
  setTag: (tag: string) => void
  setVideo: (video: string) => void
  setValidationError: (errorList: string[]) => void
  draggingDispatch: (action: DraggingAction, destination: number) => void
  stageTutorialDispatch: (action: StageTutorialAction, destination: number) => void
  inputDispatch: (action: InputAction) => void
}
export interface ModifyStore extends EditorStore {
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
  }) => void
}
