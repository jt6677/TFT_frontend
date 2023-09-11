import cn from 'classnames'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { MouseEvent, useEffect, useState } from 'react'
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading'

import { Button, CalloutCard } from '~/component/lib'

export default function UploadModal({
  setImages,
}: {
  setImages: (imageList: ImageListType) => void
}) {
  const [localImages, setLocalImages] = useState<ImageType[]>([])
  const [open, setOpen] = useState(false)

  const handleEscape = (evt: globalThis.KeyboardEvent) => {
    if (evt.key === 'Escape') setOpen(false)
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => handleEscape(e))

    return () => {
      // Detach listener when component unmounts
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const onChange = (imageList: ImageListType) => {
    // data for submit
    setLocalImages(imageList as never[])
    // console.log(images)
  }
  const handleConfirm = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    setImages(localImages)
    setOpen(false)
  }
  const handleCancel = () => {
    setLocalImages([])
    setImages([])
    setOpen(false)
  }
  const UploadProfileImg = () => {
    return (
      <CalloutCard additionalCSS="w-[300px] ">
        <ImageUploading multiple value={localImages} onChange={onChange} maxNumber={1}>
          {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
            <div className="p-2">
              <div
                className={cn(
                  'flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md',
                  { 'border-green-500': isDragging }
                )}
                {...dragProps}>
                {imageList.length === 0 && (
                  <div className="space-y-1 text-center ">
                    <svg
                      className="w-12 h-12 mx-auto text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative p-2 font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <button type="button" onClick={onImageUpload}>
                            选择照片
                          </button>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="flex items-center pl-1 text-lg text-gray-400 ">或拖拽至此</p>
                      </div>
                      <p className="pt-1 text-xs text-gray-300">(JPG,小于2MB)</p>
                    </div>
                  </div>
                )}
                {imageList.map((image, index) => (
                  <div key={index} className="center">
                    <img src={image.dataURL} alt="" width="100" />
                    <div className="w-12 pt-1 mx-auto">
                      <Button type="danger" isSmall onClick={() => onImageRemove(index)}>
                        <span className="text-sm">移除</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ImageUploading>
        <div className="flex justify-end gap-4 pb-2 pr-3">
          <Button type="secondary" onClick={() => handleCancel()}>
            取消
          </Button>
          {localImages.length > 0 && <Button onClick={(e) => handleConfirm(e)}>确定</Button>}
        </div>
      </CalloutCard>
    )
  }

  return (
    <div>
      <div className="pl-2">
        <Button
          type="warning"
          isSmall
          onClick={() => {
            setOpen(true)
          }}>
          <div className="text-sm">修改头像</div>
        </Button>
      </div>

      <AnimateSharedLayout>
        <AnimatePresence>
          {open && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                exit={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 }}
                className="fixed inset-0 z-[999] h-40 top-[20%] center ">
                <motion.div layout>
                  <AnimatePresence exitBeforeEnter>
                    <UploadProfileImg />
                  </AnimatePresence>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-[99] bg-modalbg"
              />
            </div>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  )
}
