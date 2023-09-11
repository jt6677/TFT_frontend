export enum DraggingActionType {
  MOVE_ONBOARD_CHAMP = 'MOVE_ONBOARD_CHAMP',
  DROP_NEW_CHAMP = 'DROP_NEW_CHAMP',
  DELETE_ONBOARD_CHAMP = 'DELETE_ONBOARD_CHAMP',
  DROP_NEW_EQUIP = 'DROP_NEW_EQUIP',
  CHANGE_CHAMP_LEVEL = 'CHANGE_CHAMP_LEVEL',
  DELETE_CORE_CHAMP = 'DELETE_CORE_CHAMP',
  DROP_NEW_CORE_CHAMP = 'DROP_NEW_CORE_CHAMP',
  DROP_NEW_HEX = 'DROP_NEW_HEX',
  DELETE_HEX = 'DELETE_HEX',
}

export type DraggingAction =
  | {
      type: DraggingActionType.DROP_NEW_CHAMP
      payload: { droppedChamp: ChampionProps; destination: number }
    }
  | {
      type: DraggingActionType.DROP_NEW_EQUIP
      payload: { droppedEquip: EquipmentProps }
    }
  | {
      type: DraggingActionType.MOVE_ONBOARD_CHAMP
      payload: {
        droppedChamp: ChampWithEquipmentAndLevel
        origin: number
      }
    }
  | {
      type: DraggingActionType.DELETE_ONBOARD_CHAMP
      payload: { origin: number }
    }
  | {
      type: DraggingActionType.CHANGE_CHAMP_LEVEL
      payload: { origin: number; level: number }
    }
  | {
      type: DraggingActionType.DELETE_CORE_CHAMP
      payload: { order: number }
    }
  | {
      type: DraggingActionType.DROP_NEW_CORE_CHAMP
      payload: { droppedChamp: ChampWithEquipmentAndLevel }
    }
  | {
      type: DraggingActionType.DROP_NEW_HEX
      payload: { tierName: '1' | '2' | '3'; droppedHex: HexProps }
    }
  | {
      type: DraggingActionType.DELETE_HEX
      payload: { tierName: '1' | '2' | '3'; index: number }
    }

export enum InputActionType {
  TUTORIAL_TITLE = 'TUTORIAL_TITLE',
  TUTORIAL_COMMENT = 'TUTORIAL_COMMENT',
  TUTORIAL_INTRODUCTION = 'TUTORIAL_INTRODUCTION',
}
export type InputAction =
  | {
      type: InputActionType.TUTORIAL_TITLE
      payload: string
    }
  | {
      type: InputActionType.TUTORIAL_INTRODUCTION
      payload: string
    }
  | {
      type: InputActionType.TUTORIAL_COMMENT
      payload: string
    }

export type StageTutorial = {
  champGroup: (ChampWithEquipmentAndLevel | null)[]
  comment: string
  title: string
  order: number
}
export enum StageTutorialActionType {
  START_STAGE_TUTORIAL = 'START_STAGE_TUTORIAL',
  CHANGE_STAGE_TUTORIAL_COMMENT = 'CHANGE_STAGE_TUTORIAL_COMMENT',
  CHANGE_STAGE_TUTORIAL_TITLE = 'CHANGE_STAGE_TUTORIAL_TITLE',
  DROP_STAGE_TUTORIAL_CHAMP = 'DROP_STAGE_TUTORIAL_CHAMP',
  DELETE_STAGE_TUTORIAL_CHAMP = 'DELETE_STAGE_TUTORIAL_CHAMP',
  CHANGE_STAGE_TUTORIAL_CHAMP_LEVEL = 'CHANGE_STAGE_TUTORIAL_CHAMP_LEVEL',
  DROP_STAGE_TUTORIAL_EQUIP = 'DROP_STAGE_TUTORIAL_EQUIP',
  CLEAR_TUTORIAL = 'CLEAR_TUTORIAL',
  DELETE_TUTORIAL = 'DELETE_TUTORIAL',
}
export type StageTutorialAction =
  | {
      type: StageTutorialActionType.START_STAGE_TUTORIAL
    }
  | {
      type: StageTutorialActionType.CHANGE_STAGE_TUTORIAL_COMMENT
      payload: { comment: string }
    }
  | {
      type: StageTutorialActionType.CHANGE_STAGE_TUTORIAL_TITLE
      payload: { title: string }
    }
  | {
      type: StageTutorialActionType.DROP_STAGE_TUTORIAL_CHAMP
      payload: {
        droppedChamp: ChampWithEquipmentAndLevel
        destination: number
      }
    }
  | {
      type: StageTutorialActionType.DELETE_STAGE_TUTORIAL_CHAMP
      payload: {
        destination: number
      }
    }
  | {
      type: StageTutorialActionType.CHANGE_STAGE_TUTORIAL_CHAMP_LEVEL
      payload: { level: number; destination: number }
    }
  | {
      type: StageTutorialActionType.DROP_STAGE_TUTORIAL_EQUIP
      payload: { droppedEquip: EquipmentProps; destination: number }
    }
  | {
      type: StageTutorialActionType.CLEAR_TUTORIAL
    }
  | {
      type: StageTutorialActionType.DELETE_TUTORIAL
    }

export interface ChampionProps {
  chessId: string
  title: string
  name: string
  raceIds: number[]
  jobIds: number[]
  price: number
  TFTID: string
  url: string
}
export interface ChampWithEquipmentAndLevel extends ChampionProps {
  equiped: EquipmentProps[]
  level: number
}
export interface EquipmentProps {
  equipId: string
  type: string
  name: string
  effect: string
  keywords: string
  formula: string
  imagePath: string
  TFTID: string
  jobId: number
  raceId: number
  proStatus: string
}
export interface BasicEquipmentListProps {
  Id: string
  basicEquip: EquipmentProps
}

export interface JobProps {
  Id: number
  name: string
  introduce: string
  alias: string
  level: Record<string, string>
  imagePath: string
  levelColor: { champCount: number; level: number }[]
}
export interface RaceProps {
  Id: number
  name: string
  introduce: string
  alias: string
  level: Record<string, string>
  imagePath: string
  levelColor: { champCount: number; level: number }[]
}
export interface HexProps {
  id: string
  hexId: string
  type: string
  name: string
  imgUrl: string
  augments: string
  description: string
  createTime: string
}

export enum TFTFilterType {
  JOB = '职业',
  RACE = '特质',
}

export type FilterAction =
  | { type: TFTFilterType.JOB; payload: JobProps[] }
  | { type: TFTFilterType.RACE; payload: RaceProps[] }

export const ItemTypes = {
  CHAMPION: 'champion',
  ITEM: 'item',
  CHAMPIONONBOARD: 'championOnBoard',
  BASICEQUIPMENT: 'basicEquipment',
  TIER1HEX: 'tier1hex',
  TIER2HEX: 'tier2hex',
  TIER3HEX: 'tier3hex',
}
export type Tag = {
  tagName: string
}
