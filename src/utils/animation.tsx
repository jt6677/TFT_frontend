import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'

export const AnimateMount = ({
  children,
  duration = 0.2,
}: {
  children: ReactNode
  duration?: number
}) => {
  return (
    <AnimatePresence>
      <motion.div
        style={{ overflow: 'hidden' }}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration }}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// export const AnimateUnMount = ({
//   children,
//   duration = 0.2,
// }: {
//   children: ReactNode
//   duration?: number
// }) => {
//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0, height: 0 }}
//         animate={{ opacity: 1, height: 'auto' }}
//         exit={{ opacity: 0, height: 0 }}
//         transition={{ duration }}>
//         {children}
//       </motion.div>
//     </AnimatePresence>
//   )
// }
