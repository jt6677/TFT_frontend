import { useCallback, useEffect, useState } from 'react'
import shallow from 'zustand/shallow'

import Board from '~/component/editor/ChessBoard'
import CoreChampGroup from '~/component/editor/CoreChampGroup'
import EquipmentPriorityList from '~/component/editor/EquipmentPriorityList'
import useModifyStore from '~/component/editor/state/store/modifyStore'
import SynergyGroup from '~/component/editor/SynergyGroup'
import { DraggingAction, DraggingActionType } from '~/component/editor/types'
import { ErrorMSG } from '~/component/lib'

function MainBoard() {
  const [displayError, setDisplayError] = useState(false)

  const [champGroup, coreChampGroup, draggingDispatch, errorMSG, setErrorMSG] =
    useModifyStore(
      (state) => [
        state.finalStage.champGroup,
        state.finalStage.coreChampGroup,
        state.draggingDispatch,
        state.errorMSG,
        state.setErrorMSG,
      ],
      shallow
    )

  useEffect(() => {
    if (errorMSG) {
      setDisplayError(true)
      setTimeout(() => {
        setDisplayError(false)
      }, 1500)
      setTimeout(() => {
        setErrorMSG('')
      }, 2000)
    }
  }, [errorMSG])

  const handleDeleteCoreChamp = useCallback(
    (order: number) => {
      draggingDispatch(
        {
          type: DraggingActionType.DELETE_CORE_CHAMP,
          payload: { order },
        },
        0
      )
    },
    [draggingDispatch]
  )

  const handleDrop = useCallback(
    (destination: number, action: DraggingAction) => {
      draggingDispatch(action, destination)
    },
    [draggingDispatch]
  )
  const handleCoreChampDrop = (action: DraggingAction) => {
    // ONBOARD_CHAMP movement is MOVE_ONBOARD_CHAMP for within the board AND to CoreChamp board
    if (action.type === DraggingActionType.MOVE_ONBOARD_CHAMP) {
      draggingDispatch(
        {
          type: DraggingActionType.DROP_NEW_CORE_CHAMP,
          payload: {
            droppedChamp: action.payload.droppedChamp,
          },
        },
        0
      )
    }
  }
  return (
    <div className="flex flex-col gap-2 text-white md:grid md:grid-cols-5 pt-9 ">
      <div className="order-first col-span-1 ">
        <div className="flex gap-2 md:grid ">
          <SynergyGroup champGroup={champGroup} />
        </div>
      </div>
      <div className="order-last col-span-3 ">
        <div className="grid col-span-3 grid-col-8">
          <Board onDrop={handleDrop} champGroup={champGroup} />
          <EquipmentPriorityList />
          <ErrorMSG isShown={!displayError} errorMSG={errorMSG} />
        </div>
      </div>
      <div className="max-w-[15rem] md:order-last">
        <CoreChampGroup
          onDrop={handleCoreChampDrop}
          champs={coreChampGroup}
          handleDeleteCoreChamp={handleDeleteCoreChamp}
        />
      </div>
    </div>
  )
}
export default MainBoard
