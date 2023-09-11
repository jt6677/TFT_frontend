import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import shallow from 'zustand/shallow'

import useEditorStore from '~/component/editor/state/store/editorStore'
import DeleteModal from '~/component/foudation/DeleteModal'
import { Button } from '~/component/lib'

export const ActionBtns = ({
  isPublished,
  handleEdit,
}: {
  isPublished?: boolean
  handleEdit?: (action: 'unpublish' | 'publish' | 'delete' | 'modify') => void
}) => {
  const [
    tag,
    title,
    description,
    comment,
    validationError,
    setValidationError,
    finalStage,
    clearStore,
  ] = useEditorStore(
    (state) => [
      state.tag,
      state.title,
      state.description,
      state.comment,
      state.validationError,
      state.setValidationError,
      state.finalStage,
      state.clearStore,
    ],
    shallow
  )
  const navigate = useNavigate()
  const TutorialValidation = () => {
    const errorList = []
    if (tag === '') {
      errorList.push('没有选择攻略类型')
    }
    if (title === '') {
      errorList.push('标题是空的')
    }
    if (description === '') {
      errorList.push('简介是空的')
    }
    if (comment === '') {
      errorList.push('内容是空的')
    }
    const champGroupEmptyCount = finalStage.champGroup.reduce((acc, champ) => {
      let count = acc
      if (champ === null) {
        count += 1
      }
      return count
    }, 0)
    if (champGroupEmptyCount === 28) {
      errorList.push('棋盘上没有英雄')
    }
    if (finalStage.coreChampGroup.length === 0) {
      errorList.push('没有加入主C英雄')
    }
    return errorList
  }
  useEffect(() => {
    if (validationError.length > 0) {
      setTimeout(() => {
        setValidationError([])
      }, 3000)
    }
  }, [validationError])

  const hanlePreview = () => {
    const errorList = TutorialValidation()
    if (errorList.length > 0) {
      setValidationError(errorList)
    } else {
      navigate('/preview')
    }
  }

  if (handleEdit) {
    return (
      <div className="flex gap-2">
        <DeleteModal handleDelete={() => handleEdit('delete')} />
        {isPublished === true ? (
          <Button
            type="warning"
            onClick={() => {
              const errorList = TutorialValidation()
              if (errorList.length > 0) {
                setValidationError(errorList)
              } else {
                handleEdit('unpublish')
              }
            }}>
            设成不公开
          </Button>
        ) : (
          <Button
            type="warning"
            onClick={() => {
              const errorList = TutorialValidation()
              if (errorList.length > 0) {
                setValidationError(errorList)
              } else {
                handleEdit('publish')
              }
            }}>
            设成公开
          </Button>
        )}
        <Button
          type="primary"
          onClick={() => {
            const errorList = TutorialValidation()
            if (errorList.length > 0) {
              setValidationError(errorList)
            } else {
              handleEdit('modify')
            }
          }}>
          {isPublished ? '发布' : '保存'}
        </Button>
      </div>
    )
  }

  return (
    <div>
      <Button type="secondary" onClick={clearStore}>
        清除
      </Button>
      <Button type="primary" additionalCSS="ml-3" onClick={hanlePreview}>
        <span className="p-1 font-bold">&nbsp;&nbsp;预览&nbsp;&nbsp;</span>
      </Button>
    </div>
  )
}
