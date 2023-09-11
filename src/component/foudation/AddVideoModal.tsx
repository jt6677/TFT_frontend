import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Button, CalloutCard } from '~/component/lib'

export default function AddVideoModal({ setVideo }: { setVideo: (value: string) => void }) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')

  const handleEscape = (evt: globalThis.KeyboardEvent) => {
    if (evt.key === 'Escape') setOpen(false)
  }

  function isValidURL(val: string) {
    const regex = /(http(s)?:\/\/.)?(www\.)bilibili\.com\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
    return regex.test(val)
  }

  // www.bilibili.com/video/BV1z34y1a74T?spm_id_from=333.851.b_7265636f6d6d656e64.2
  const handleAddVideo = () => {
    if (isValidURL(url)) {
      setVideo(url)
      setOpen(false)
    } else {
      toast.error('请添加B站的视频', { duration: 800 })
    }
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
        type="warning"
        onClick={() => {
          setOpen(true)
        }}>
        添加B站视频
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
                        <CalloutCard additionalCSS="w-96">
                          <div className="p-6">
                            <div className="p-4 font-extrabold">添加B站视频</div>
                            <div className="relative rounded-md shadow-sm ">
                              <input
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                name="name"
                                id="name"
                                className="block w-full px-4 pt-5 pb-3 text-sm placeholder-gray-500 rounded-2xl bg-sinkIn text-textColor shadow-borderColor "
                                placeholder="bilibili.com/video/BV..."
                                style={{
                                  boxShadow:
                                    'inset -5px -5px 10px hsl(240, 25%, 20%), inset 5px 5px 9px hsl(240, 25%, 11%)',
                                }}
                              />
                            </div>
                            <div className="flex justify-end pt-3">
                              <Button type="secondary" onClick={() => setOpen(false)}>
                                取消
                              </Button>
                              <Button type="primary" additionalCSS="ml-5" onClick={handleAddVideo}>
                                添加
                              </Button>
                            </div>
                          </div>
                        </CalloutCard>
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
