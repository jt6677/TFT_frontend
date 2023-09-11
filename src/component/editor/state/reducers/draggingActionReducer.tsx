import produce from 'immer'

import { EditorStore, ModifyStore } from '~/component/editor/state/store/storeTypes'
import { DraggingAction, DraggingActionType } from '~/component/editor/types'

export const draggingActionReducer = (
  state: EditorStore | ModifyStore,
  action: DraggingAction,
  destination: number
) => {
  switch (action.type) {
    case DraggingActionType.DROP_NEW_CHAMP:
      return produce(state, (draft) => {
        draft.finalStage.champGroup[destination] = {
          ...action.payload.droppedChamp,
          equiped: [],
          level: 1,
        }
      })

    case DraggingActionType.DROP_NEW_EQUIP:
      // if champ does not exist at index, return early
      if (state.finalStage.champGroup[destination] === null) return state
      // 新装备的raceId和jobId不能和英雄的raceId和jobId或亦有装备相同
      // 英雄只能装备一种专职装备
      if (action.payload.droppedEquip.jobId || action.payload.droppedEquip.raceId) {
        const equipJobId = [
          ...state.finalStage.champGroup[destination]!.equiped.reduce((acc, cur) => {
            if (cur.jobId !== 0) acc.push(cur.jobId)
            return acc
          }, [] as number[]),
        ]
        const equipRaceId = [
          ...state.finalStage.champGroup[destination]!.equiped.reduce((acc, cur) => {
            if (cur.raceId !== 0) acc.push(cur.raceId)
            return acc
          }, [] as number[]),
        ]
        // console.log(equipJobId, equipRaceId)
        if (
          [...state.finalStage.champGroup[destination]!.jobIds, ...equipJobId].includes(
            action.payload.droppedEquip.jobId
          ) ||
          [...state.finalStage.champGroup[destination]!.raceIds, ...equipRaceId].includes(
            action.payload.droppedEquip.raceId
          ) ||
          equipJobId.length > 0 ||
          equipRaceId.length > 0
        ) {
          state.setErrorMSG('新专职装备与英雄或已有装备冲突')
          return state
        }
      }
      return produce(state, (draft) => {
        // 如果装备满三件，则替换第一件
        if (draft.finalStage.champGroup[destination]!.equiped.length === 3) {
          draft.finalStage.champGroup[destination]!.equiped.shift()
        }
        draft.finalStage.champGroup[destination]!.equiped.push(action.payload.droppedEquip)
      })
    case DraggingActionType.MOVE_ONBOARD_CHAMP:
      if (action.payload.origin === destination) return state
      return produce(state, (draft) => {
        draft.finalStage.champGroup[destination] =
          draft.finalStage.champGroup[action.payload.origin]
        draft.finalStage.champGroup[action.payload.origin] = null
      })

    case DraggingActionType.DELETE_ONBOARD_CHAMP:
      return produce(state, (draft) => {
        draft.finalStage.champGroup[action.payload.origin] = null
      })

    case DraggingActionType.CHANGE_CHAMP_LEVEL:
      return produce(state, (draft) => {
        draft.finalStage.champGroup[action.payload.origin]!.level = action.payload.level
      })

    case DraggingActionType.DELETE_CORE_CHAMP:
      return produce(state, (draft) => {
        draft.finalStage.coreChampGroup.splice(action.payload.order, 1)
      })

    case DraggingActionType.DROP_NEW_CORE_CHAMP:
      return produce(state, (draft) => {
        draft.finalStage.coreChampGroup.push(action.payload.droppedChamp)
      })

    case DraggingActionType.DROP_NEW_HEX:
      return produce(state, (draft) => {
        switch (action.payload.tierName) {
          case '1':
            // 如果海克斯满三件，则替换第一件
            if (draft.tier1Hex.length === 3) {
              draft.tier1Hex.shift()
            }
            draft.tier1Hex.push(action.payload.droppedHex)
            break
          case '2':
            if (draft.tier2Hex.length === 3) {
              draft.tier2Hex.shift()
            }
            draft.tier2Hex.push(action.payload.droppedHex)
            break
          case '3':
            if (draft.tier3Hex.length === 3) {
              draft.tier3Hex.shift()
            }
            draft.tier3Hex.push(action.payload.droppedHex)
            break
          default:
            return state
        }
      })
    case DraggingActionType.DELETE_HEX:
      return produce(state, (draft) => {
        switch (action.payload.tierName) {
          case '1':
            // 如果海克斯满三件，则替换第一件
            draft.tier1Hex.splice(action.payload.index, 1)
            break
          case '2':
            draft.tier2Hex.splice(action.payload.index, 1)
            break
          case '3':
            draft.tier3Hex.splice(action.payload.index, 1)
            break
          default:
            return state
        }
      })
    default:
      return state
  }
}
