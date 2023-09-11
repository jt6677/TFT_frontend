import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'

import { IComment } from '~/types'

import CommentCard from './CommentCard'

interface CommentsProps {
  comments: IComment[]
}
export default function Comments({ comments }: CommentsProps) {
  const { rootComments, childrenComments } = comments.reduce(
    (result, item) => {
      if (item.parentId === '') {
        result.rootComments.push(item)
      } else {
        result.childrenComments.push(item)
      }
      return result
    },
    { rootComments: [] as IComment[], childrenComments: [] as IComment[] }
  )
  // sort by dateUpdated
  childrenComments.sort((a, b) => {
    return new Date(a.dateUpdated).getTime() - new Date(b.dateUpdated).getTime()
  })
  return (
    <div>
      {rootComments.map((comment) => (
        <CommentSection
          parentId={comment.parentId || comment.commentId}
          comment={comment}
          key={comment.commentId}
          childrenComments={childrenComments}
        />
      ))}
    </div>
  )
}

const CommentSection = ({
  parentId,
  comment,
  childrenComments,
}: {
  parentId: string
  comment: IComment
  childrenComments: IComment[]
}) => {
  const [showChildren, setShowChildren] = useState(false)
  const commentRef = useRef(null)
  // @ts-ignore
  const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth' })
  const childCommentsFn = () => childrenComments.filter((c) => c.parentId === comment.commentId)

  const nextChildrenComments = childCommentsFn()
  const renderChildrenComment = () => {
    if (nextChildrenComments.length > 3 && !showChildren) {
      return (
        <a
          role="button"
          key={`#${comment.commentId}`}
          className="flex items-center pl-2 "
          onClick={() => {
            setShowChildren(true)
            scrollToRef(commentRef)
          }}>
          <ChevronDownIcon className="w-5 text-blue-400 " />
          <div className="text-sm font-semibold text-blue-400">
            {`查看${nextChildrenComments.length}个回复`}
          </div>
        </a>
      )
    }
    if (nextChildrenComments.length > 3 && showChildren) {
      return (
        <motion.div
          initial={{ opacity: 0.3, height: 0 }}
          exit={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}>
          <div
            role="button"
            className="flex items-center pl-2 "
            onClick={() => setShowChildren(false)}>
            <ChevronUpIcon className="w-5 text-blue-400 " />
            <div className="text-sm font-semibold text-blue-400">
              {`收起${nextChildrenComments.length}个回复`}
            </div>
          </div>
          {nextChildrenComments.map((c) => (
            <CommentSection
              parentId={parentId}
              key={c.commentId}
              comment={c}
              childrenComments={childrenComments}
            />
          ))}
        </motion.div>
      )
    }
    return (
      <div>
        {childCommentsFn().map((c) => (
          <CommentSection
            parentId={parentId}
            key={c.commentId}
            comment={c}
            childrenComments={childrenComments}
          />
        ))}
      </div>
    )
  }

  return (
    <CommentCard comment={comment} parentId={parentId}>
      <AnimatePresence>
        <div ref={commentRef} className="scroll-m-32">
          {renderChildrenComment()}
        </div>
      </AnimatePresence>
    </CommentCard>
  )
}
