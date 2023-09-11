import _ from 'lodash'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import VideoDisplayCard from '~/component/display/components/VideoDisplayCard'
import useStore from '~/component/editor/state/store/editorStore'
import { MutedCardWithHeader } from '~/component/lib'
import PreviewActionBtns from '~/component/preview/components/PreviewActionBtns'
import EachStage from '~/component/preview/EachStage'
import renderChampRowWithCoreChamps from '~/component/preview/renderChampRowWithCoreChamps'
import renderDisplayBoard from '~/component/preview/renderDisplayBoard'
import renderEquipPriorityList from '~/component/preview/renderEquipPriorityList'
import TableOfContents from '~/component/preview/TableofContents'
import TutorialHeader from '~/component/preview/TutorialHeader'
import { useAuth } from '~/context/AuthContext'
import { useCreateTutorial } from '~/utils/queries'

const TutorialPreviewPage = () => {
  const {
    state: { user },
  } = useAuth()
  const [
    champBoard,
    coreChamps,
    tag,
    video,
    title,
    comment,
    description,
    equipPriorityList,
    stageTutorial,
    hex1,
    hex2,
    hex3,
    clearStore,
  ] = useStore((state) => [
    state.finalStage.champGroup,
    state.finalStage.coreChampGroup,
    state.tag,
    state.video,
    state.title,
    state.comment,
    state.description,
    state.equipPriorityList,
    state.stageTutorial,
    state.tier1Hex,
    state.tier2Hex,
    state.tier3Hex,
    state.clearStore,
  ])

  const champGroup = _.cloneDeep(useStore((state) => state.finalStage.champGroup))
  // 重组champGroup，把coreChamps放在前面
  // 在champGroup中找到coreChamps的位置, 并改成null
  // 如果coreChamps不存在，则不改变champGroup
  coreChamps
    .reduce((acc, cur) => {
      acc.push(_.findIndex(champGroup, cur))
      return acc
    }, [] as number[])
    .forEach((index) => {
      champGroup[index] = null
    })

  const hexTiers = [[...hex1], [...hex2], [...hex3]]

  const navigate = useNavigate()
  const mutation = useCreateTutorial()
  const handlePublish = async (action: 'publish' | 'draft') => {
    if (user) {
      const data = {
        title,
        tag,
        description,
        content: JSON.stringify({
          video,
          comment,
          champBoard,
          champRow: { coreChamps, champGroup },
          equipPriorityList,
          hexTiers,
          stageTutorial,
        }),
      }
      mutation.mutate(
        { data, action },
        {
          onSuccess: () => {
            toast.success(`${action === 'publish' ? '发布' : '保存'}成功`)
            navigate('/teamcomps/mytutorial')
            clearStore()
          },
          onError: (err) => {
            toast.error(`${action === 'publish' ? '发布' : '保存'}失败：请重试`)
          },
        }
      )
    } else {
      toast.error('请先登录', { duration: 800 })
    }
  }
  return (
    <div className="flex flex-col bg-bgColor h-[150vh] " draggable={false}>
      <div className="ml-auto">
        <PreviewActionBtns
          handleSave={() => handlePublish('draft')}
          handlePublish={() => handlePublish('publish')}
          isLoading={mutation.isLoading}
        />
      </div>
      <div className="mt-4 pointer-events-none">
        <TutorialHeader
          version="版本待加入"
          tag={tag}
          title={title}
          author={user ? user.username : '未登录'}
          authorImage={user ? user.image : ''}
          TFTID={coreChamps[0].TFTID}
        />
      </div>
      <div className="flex gap-2 pt-3 ">
        <div className="w-[80%]  space-y-4  min-w-[775px]">
          {video && <VideoDisplayCard url={video} />}
          <MutedCardWithHeader additionalCSS="p-2 md:w-full ">
            <h1 id="内容" className="sr-only scroll-mt-9">
              关键内容
            </h1>
            <p className="p-4 text-[14px] ">{comment}</p>
            {renderChampRowWithCoreChamps(coreChamps, champGroup)}
            {renderEquipPriorityList(equipPriorityList)}
          </MutedCardWithHeader>

          <MutedCardWithHeader additionalCSS="p-2 ">
            <h1 className="sr-only scroll-mt-5" id="棋盘">
              棋盘
            </h1>
            {renderDisplayBoard(champBoard, hexTiers)}
          </MutedCardWithHeader>
          <MutedCardWithHeader additionalCSS="p-2 space-y-3">
            <h1 className="sr-only scroll-mt-5" id="前期过渡">
              前期过渡
            </h1>
            {stageTutorial.map((stage, index) => (
              <EachStage stage={stage} key={index} />
            ))}
          </MutedCardWithHeader>
        </div>
        <div className="hidden lg:flex bg-bgColor">
          <TableOfContents />
        </div>
      </div>
    </div>
  )
}
export default TutorialPreviewPage
