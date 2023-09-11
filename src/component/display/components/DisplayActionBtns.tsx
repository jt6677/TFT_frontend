import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { ImpulseSpinner } from 'react-spinners-kit'

import { Button, InfoButtonSwitchable } from '~/component/lib'
import { useAuth } from '~/context/AuthContext'
import { useSetCollection, useSetLike } from '~/utils/queries'

import HeartBtn from './LikeBtn'
// src / component / preview / components / Header / starAnimation.jsx

const DisplayActionBtns = ({
  isOwner,
  collected = false,
  isLiked = false,
  likeCount,
}: {
  isOwner: boolean
  collected: boolean
  isLiked: boolean
  likeCount: number
}) => {
  const navigate = useNavigate()
  const {
    state: { user },
  } = useAuth()
  const setCollection = useSetCollection()
  const setLike = useSetLike()
  const { tutorialId } = useParams()
  const handleSetCollection = (action: 'add' | 'remove') => {
    if (!user) {
      toast.error('请先登录')
      return
    }
    setCollection.mutate(
      { tutid: tutorialId!, action },
      {
        onSuccess: () => {
          toast.success(action === 'add' ? '收藏成功' : '取消收藏')
        },
      }
    )
  }
  const handleSetLike = (action: 'add' | 'remove') => {
    if (!user) {
      toast.error('请先登录')
      return
    }
    setLike.mutate(
      { tutid: tutorialId!, action },
      {
        onSuccess: () => {
          toast.success(action === 'add' ? '点赞成功' : '取消点赞')
        },
      }
    )
  }

  const { isLoading } = setCollection
  return (
    <div className=" h-14">
      {isLoading ? (
        <div className="pt-8 pr-10 ">
          <ImpulseSpinner size={30} frontColor="rgb(250 204 21)" backColor="#fff" />
        </div>
      ) : (
        <div>
          {isOwner ? (
            <Button
              type="secondary"
              onClick={() => navigate(`/teamcomps/mytutorial/edit/${tutorialId}`)}>
              编辑
            </Button>
          ) : (
            <div className="flex items-end">
              <HeartBtn isLiked={isLiked} onClick={handleSetLike} likeCount={likeCount} />
              {!collected ? (
                <InfoButtonSwitchable
                  disabled={isLoading}
                  additionalCSS="ml-4 font-semibold"
                  onClick={() => handleSetCollection('add')}
                  active={false}>
                  收藏
                </InfoButtonSwitchable>
              ) : (
                <InfoButtonSwitchable
                  disabled={isLoading}
                  additionalCSS="ml-4 font-semibold"
                  onClick={() => handleSetCollection('remove')}
                  active>
                  取消收藏
                </InfoButtonSwitchable>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default DisplayActionBtns
