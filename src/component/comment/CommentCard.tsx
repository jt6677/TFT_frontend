import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import TimeAgo from 'timeago-react'

import CommentInput from '~/component/comment/CommentInput'
import { Avatar } from '~/component/lib'
// import { useArticles } from '~/context/ArticlesContext'
// import { ArticleAction, ArticleActionType } from '~/reducers/article'
import { IComment } from '~/types'

export interface CommentCardProps {
  children?: React.ReactNode
  comment: IComment
  parentId: string
  userId?: string
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  children,
  userId,
  parentId,
  ...otherProps
}: CommentCardProps) => {
  const [toggleReply, setToggleReply] = useState(false)
  const renderNested = (nestedChildren: any) => <div className="ml-8">{nestedChildren}</div>

  const handleDelete = async () => {}
  return (
    <div {...otherProps}>
      <div className="flex space-x-2 text-sm text-gray-500">
        <div className="flex-none py-2">
          <Avatar
            size={8}
            profileImage={comment.commenterImage}
            profileName={comment.commenterName}
          />
        </div>
        <div className="flex-1 py-[3px] text-gray-500 ">
          <div className="flex items-center">
            <h3 className="font-semibold text-goldBorder">{comment.commenterName}</h3>
            <p className="ml-2 text-xs">
              <TimeAgo datetime={comment.dateUpdated} className="text-xs" locale="zh_CN" />
            </p>
          </div>
          <div className="my-1 text-base text-textColor max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {comment.body}
            </ReactMarkdown>
          </div>

          <button
            className="text-sm text-gray-400 hover:text-gray-300"
            onClick={() => setToggleReply(!toggleReply)}>
            回复
          </button>
          {/* {(isAuthor || userId === comment.author.user_id) && (
            <Button
              type="secondary"
              additioanlCSS="ml-2"
              isSmall
              onClick={() => handleDelete()}>
              <TrashIcon className="h-3" />
            </Button>
          )} */}
          <AnimatePresence>
            {toggleReply && (
              <motion.div
                style={{ overflow: 'hidden' }}
                initial={{ opacity: 0, height: 0 }}
                exit={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}>
                <div className="pt-2">
                  <CommentInput
                    setToggleReply={setToggleReply}
                    tutorialId={comment.tutorialId}
                    parentId={parentId}
                    rows={1}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {children ? renderNested(children) : null}
    </div>
  )
}

export default CommentCard
