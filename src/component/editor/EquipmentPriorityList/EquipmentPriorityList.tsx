import update from 'immutability-helper'
import { useCallback, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'
import shallow from 'zustand/shallow'

import { basicEquipment } from '~/assets/stats'
import useEditorStore from '~/component/editor/state/store/editorStore'

import { BasicEquipmentListProps, EquipmentProps, ItemTypes } from '../types'
import { DraggableBasiceEquipment } from './DraggableBasiceEquipment'

const EquipmentPriorityList = () => {
  const [champGroup, setEquipPriorityList] = useEditorStore(
    (state) => [state.finalStage.champGroup, state.setEquipPriorityList],
    shallow
  )
  const [equipList, setEquipList] = useState([] as BasicEquipmentListProps[])
  // equipPriorityList
  useEffect(() => {
    setEquipList(
      champGroup
        .reduce((acc, cur) => {
          if (cur) acc.push(...cur.equiped)
          return acc
        }, [] as EquipmentProps[])
        .reduce((acc, cur) => {
          cur.formula
            .split(',')
            .forEach((Id) => acc.push(...basicEquipment.filter((x) => x.equipId === Id)))
          return acc
        }, [] as EquipmentProps[])
        .slice(0, 15)
        .reduce((acc, cur) => {
          acc.push({ Id: uuidv4(), basicEquip: cur })
          return acc
        }, [] as BasicEquipmentListProps[])
    )
  }, [champGroup])

  useEffect(() => {
    setEquipPriorityList(equipList)
  }, [equipList])
  // // equipPriorityList

  // const setEquipPriorityList = useStore((state) => state.setEquipPriorityList)
  const findEquipment = useCallback(
    (Id: string) => {
      const equip = equipList.filter((c) => c.Id === Id)[0]
      return {
        equip,
        index: equipList.indexOf(equip),
      }
    },
    [equipList]
  )

  const moveEquipment = useCallback(
    (Id: string, atIndex: number) => {
      const { equip, index } = findEquipment(Id)
      setEquipList(
        update(equipList, {
          $splice: [
            [index, 1],
            [atIndex, 0, equip],
          ],
        })
      )
    },
    [findEquipment, equipList, setEquipList]
  )
  const [, drop] = useDrop(() => ({ accept: ItemTypes.BASICEQUIPMENT }))
  const renderEquipmentList = () => {
    return (
      <div className="flex flex-col space-x-2 " ref={drop}>
        <div className="flex space-x-1">
          {equipList.map((item) => (
            <DraggableBasiceEquipment
              Id={item.Id}
              equipment={item.basicEquip}
              key={item.Id}
              findEquipment={findEquipment}
              moveEquipment={moveEquipment}
            />
          ))}
        </div>
        <div className="pt-2 text-sm text-center text-midGray">
          布置好棋盘后，再拖拽改变抢装顺序
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col w-full overflow-hidden " ref={drop}>
      <div className="relative h-full ">
        <div className="grid h-full overflow-auto place-content-center ">
          {equipList.length > 0 && renderEquipmentList()}
        </div>
      </div>
    </div>
  )
}

export default EquipmentPriorityList
