import { AnimatePresence, motion } from 'framer-motion'
import _ from 'lodash'
import { useLayoutEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import shallow from 'zustand/shallow'

import HexSelection from '~/component/editor/HexSelection'
import { ActionBtns } from '~/component/editor/modify-editor/ActionBtns'
import AddStage from '~/component/editor/modify-editor/AddStage'
import { FinalStageInputGroup } from '~/component/editor/modify-editor/editorElements'
import MainBoard from '~/component/editor/modify-editor/MainBoard'
import StageTutorialEditor from '~/component/editor/modify-editor/StageTutorialEditor'
import TagSelection from '~/component/editor/modify-editor/TagSelection'
import SelectionGroup from '~/component/editor/SelectionGroup'
import useModifyStore from '~/component/editor/state/store/modifyStore'
import ErrorList from '~/component/foudation/ErrorList'
import { Tutorial } from '~/types'
import { useModifyTutorial, useTutorial } from '~/utils/queries'

const ModifyPage = () => {
  const { tutorialId } = useParams() as { tutorialId: string }
  const { data } = useTutorial(tutorialId)

  const [
    setInitialStore,
    finalStage,
    title,
    description,
    tag,
    comment,
    video,
    equipPriorityList,
    tier1Hex,
    tier2Hex,
    tier3Hex,
    stageTutorial,
  ] = useModifyStore(
    (state) => [
      state.setInitialStore,
      state.finalStage,
      state.title,
      state.description,
      state.tag,
      state.comment,
      state.video,
      state.equipPriorityList,
      state.tier1Hex,
      state.tier2Hex,
      state.tier3Hex,
      state.stageTutorial,
    ],
    shallow
  )
  const errorList = useModifyStore((state) => state.validationError)
  const isPublished = data?.published
  useLayoutEffect(() => {
    if (data) {
      const {
        tag,
        title,
        description,
        content: {
          champRow: { coreChamps, champGroup },
          video,
          comment,
          champBoard,
          equipPriorityList,
          stageTutorial,
          hexTiers,
        },
      } = data as Tutorial

      setInitialStore({
        champGroup: champBoard,
        coreChampGroup: coreChamps,
        tag,
        video,
        title,
        description,
        comment,
        equipPriorityList,
        stageTutorial,
        tier1Hex: hexTiers[0],
        tier2Hex: hexTiers[1],
        tier3Hex: hexTiers[2],
      })
    }
  }, [data])

  const navigate = useNavigate()
  const mutation = useModifyTutorial()

  const handleEdit = async (action: 'unpublish' | 'publish' | 'delete' | 'modify') => {
    if (action === 'modify') {
      const champGroup = _.cloneDeep(finalStage.champGroup)

      // 重组champGroup，把coreChamps放在前面
      // 在champGroup中找到coreChamps的位置, 并改成null
      // 如果coreChamps不存在，则不改变champGroup
      const coreChamps = finalStage.coreChampGroup
      coreChamps
        .reduce((acc, cur) => {
          acc.push(_.findIndex(champGroup, cur))
          return acc
        }, [] as number[])
        .forEach((index) => {
          champGroup[index] = null
        })
      const modified = {
        title,
        description,
        tag,
        content: JSON.stringify({
          comment,
          video,
          champBoard: finalStage.champGroup,
          champRow: {
            coreChamps,
            champGroup,
          },
          equipPriorityList,
          hexTiers: [[...tier1Hex], [...tier2Hex], [...tier3Hex]],
          stageTutorial,
        }),
      }

      mutation.mutate(
        { tutorialId, action, data: modified },
        {
          onSuccess: () => {
            toast.success('保存成功')
            navigate(`/teamcomps/display/${tutorialId}`)
            // clearStore()
          },
        }
      )
    } else {
      mutation.mutate(
        { tutorialId, action },
        {
          onSuccess: () => {
            switch (action) {
              case 'unpublish':
                toast.success('已设为不公开')
                navigate(`/teamcomps/display/${tutorialId}`)
                break
              case 'publish':
                toast.success('已设为公开')
                navigate(`/teamcomps/display/${tutorialId}`)
                break
              case 'delete':
                toast.success('删除成功')
                navigate('/teamcomps/mytutorial')
                break

              default:
                break
            }
            // clearStore()
          },
        }
      )
    }
  }

  return (
    <div className="flex flex-col">
      <div className="grid place-content-end">
        <ActionBtns handleEdit={handleEdit} isPublished={isPublished} />
      </div>
      <div className="pl-4">
        <TagSelection />
      </div>
      <AnimatePresence>
        {errorList.length > 0 && (
          <motion.div
            style={{ overflow: 'hidden' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}>
            <div className="flex justify-center">
              <div className="pt-4 w-[40%] ">
                <ErrorList errorList={errorList} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <FinalStageInputGroup />
      <div className="grid space-y-2 auto-rows-max">
        <DndProvider backend={HTML5Backend}>
          <MainBoard />
          <SelectionGroup />
          <StageTutorialEditor />
          <AddStage />
          <HexSelection />
        </DndProvider>
      </div>
    </div>
  )
}

export default ModifyPage
