import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import Signin from '~/component/foudation/Signin'
import Signup from '~/component/foudation/Signup'
import { Button } from '~/component/lib'

export default function SignInModal({ btnName = '登录' }: { btnName?: string }) {
  const [open, setOpen] = useState<'' | 'signin' | 'signup'>('')

  const handleEscape = (evt: globalThis.KeyboardEvent) => {
    if (evt.key === 'Escape') setOpen('')
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
          setOpen('signin')
        }}
        additionalCSS="font-semibold">
        {btnName}
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
                className="fixed inset-0 z-10 h-40 top-[20%] center ">
                <motion.div layout>
                  <AnimatePresence exitBeforeEnter>
                    {open === 'signin' && <Signin key="signin" setOpen={setOpen} />}
                    {open === 'signup' && <Signup key="signup" setOpen={setOpen} />}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setOpen('')}
                className="fixed inset-0 bg-modalbg"
              />
            </div>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  )
}
