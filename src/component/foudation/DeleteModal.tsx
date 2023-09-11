import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { Button, CalloutCard } from '~/component/lib'

export default function DeleteModal({
  handleDelete,
}: {
  handleDelete: () => void
}) {
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

  return (
    <div>
      <Button
        type="danger"
        onClick={() => {
          setOpen(true)
        }}>
        删除
      </Button>

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
                    {open && (
                      <div>
                        <DeleteConfirm
                          handleDelete={handleDelete}
                          handleClose={() => setOpen(false)}
                        />
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-50 bg-modalbg"
              />
            </div>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  )
}

const DeleteConfirm = ({
  handleClose,
  handleDelete,
}: {
  handleClose: () => void
  handleDelete: () => void
}) => {
  return (
    <CalloutCard additionalCSS="w-96">
      <div className="p-6">
        <div className="p-4 font-extrabold">确定删除吗?</div>
        <div className="flex justify-end">
          <Button type="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button type="danger" additionalCSS="ml-5" onClick={handleDelete}>
            删吧
          </Button>
        </div>
      </div>
    </CalloutCard>
  )
}
