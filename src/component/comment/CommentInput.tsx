import { useFormik } from 'formik'

// import { useState } from 'react'
import { Avatar, Button } from '~/component/lib'
import { useAuth } from '~/context/AuthContext'
import { usePostComment } from '~/utils/queries'

interface CommentInputProps {
  tutorialId: string
  parentId?: string
  rows?: number
  setToggleReply?: (arg0: boolean) => void
}

export default function CommentInput({
  tutorialId,
  parentId = '',
  rows = 3,

  setToggleReply = () => {},
}: CommentInputProps) {
  const {
    state: { user },
  } = useAuth()
  const postComment = usePostComment()
  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: ({ body }, { resetForm }) => {
      postComment.mutate(
        { tutorialId, body, parentId },
        {
          onSuccess: () => {
            setToggleReply(false)
            resetForm()
          },
        }
      )
    },
  })

  return (
    <div className="flex items-start w-full space-x-2 ">
      <div className="flex-shrink-0">
        <Avatar
          size={10}
          profileImage={user?.image || ''}
          profileName={user?.username || ''}
          showBorder
        />
      </div>
      <div className="flex-1 min-w-0">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="comment" className="sr-only">
            Add your comment
          </label>
          <textarea
            id="body"
            name="body"
            value={formik.values.body}
            rows={rows}
            onChange={formik.handleChange}
            className="block w-full px-4 pt-3 placeholder-gray-500 border-0 resize-none rounded-2xl bg-sinkIn text-textColor shadow-borderColor focus:ring-0 sm:text-sm"
            placeholder="评论"
            style={{
              boxShadow:
                'inset -5px -5px 10px hsl(240, 25%, 20%), inset 5px 5px 9px hsl(240, 25%, 11%)',
            }}
          />
          <div className="flex justify-end pt-2 pr-2">
            {formik.values.body ? (
              <Button isSmall type="primary" isFormSubmit>
                <span className="text-sm">发送</span>
              </Button>
            ) : (
              <Button isSmall type="secondary" disabled isFormSubmit>
                <span className="text-sm">发送</span>
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
