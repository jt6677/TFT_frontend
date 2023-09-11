import {
  LockClosedIcon,
  MailIcon,
  UserCircleIcon,
} from '@heroicons/react/solid'
import cn from 'classnames'
import { useFormik } from 'formik'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { MouseEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

import { Button, CalloutCard } from '~/component/lib'
import { useAuth } from '~/context/AuthContext'
import { AuthActionType } from '~/reducers/auth'
import { useUpdateUser } from '~/utils/queries'

export default function ChangePasswdModal() {
  const [open, setOpen] = useState(false)

  const handleEscape = (evt: globalThis.KeyboardEvent) => {
    if (evt.key === 'Escape') setOpen(false)
  }
  const updateUser = useUpdateUser()
  useEffect(() => {
    document.addEventListener('keydown', (e) => handleEscape(e))

    return () => {
      // Detach listener when component unmounts
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const { dispatch } = useAuth()
  const handleCancel = () => {
    setOpen(false)
  }
  const ChangePassword = () => {
    const formik = useFormik({
      initialValues: {
        oldPassword: '',
        newPassword: '',
        passwordConfirm: '',
      },
      validationSchema: Yup.object({
        oldPassword: Yup.string().min(5, '不够长哦').required('必需嘚'),
        newPassword: Yup.string().min(5, '不够长哦').required('必需嘚'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('newPassword'), null], '两次密码不一致')
          .notOneOf([Yup.ref('oldPassword'), null], '不能和旧密码一样'),
      }),
      onSubmit: ({ oldPassword, newPassword, passwordConfirm }) => {
        // handleSubmit({ username, email, password, password_confirm })

        updateUser.mutate(
          {
            data: {
              oldPassword,
              newPassword,
              passwordConfirm,
            },
          },
          {
            onSuccess: () => {
              dispatch({ type: AuthActionType.SIGNOUT })
              toast.success('密码修改成功，请重新登录')
            },
          }
        )
      },
    })
    return (
      <CalloutCard additionalCSS="w-[300px] ">
        <div className="pt-2 text-center">
          <div className="text-xl font-bold ">修改密码</div>
          <div className="text-gray-400 ">输入当前密码和新密码</div>
        </div>
        <form className="px-2 space-y-2" onSubmit={formik.handleSubmit}>
          <div>
            <div className="relative mt-6 rounded-md shadow-sm ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                <LockClosedIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="oldPassword"
                name="oldPassword"
                type="password"
                className="block w-full p-4 placeholder-gray-500 border-0 pl-11 rounded-2xl bg-sinkIn text-textColor shadow-borderColor placeholder:text-midGray focus:ring-0 sm:text-sm"
                placeholder="当前密码"
                style={{
                  boxShadow:
                    'inset -5px -5px 10px hsl(240, 25%, 20%), inset 5px 5px 9px hsl(240, 25%, 11%)',
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.oldPassword}
                autoComplete="new-password"
              />
            </div>
            {formik.touched.oldPassword && formik.errors.oldPassword ? (
              <div className="absolute text-sm text-red-600">
                {formik.errors.oldPassword}
              </div>
            ) : null}
          </div>
          <div>
            <div className="relative mt-6 rounded-md shadow-sm ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                <LockClosedIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                className="block w-full p-4 placeholder-gray-500 border-0 pl-11 rounded-2xl bg-sinkIn text-textColor shadow-borderColor placeholder:text-midGray focus:ring-0 sm:text-sm"
                placeholder="新密码"
                style={{
                  boxShadow:
                    'inset -5px -5px 10px hsl(240, 25%, 20%), inset 5px 5px 9px hsl(240, 25%, 11%)',
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                autoComplete="new-password"
              />
            </div>
            {formik.touched.oldPassword && formik.errors.oldPassword ? (
              <div className="absolute text-sm text-red-600">
                {formik.errors.oldPassword}
              </div>
            ) : null}
          </div>
          <div>
            <div className="relative mt-6 rounded-md shadow-sm ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                <LockClosedIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                className="block w-full p-4 placeholder-gray-500 border-0 pl-11 rounded-2xl bg-sinkIn text-textColor shadow-borderColor placeholder:text-midGray focus:ring-0 sm:text-sm"
                placeholder="重复新密码"
                style={{
                  boxShadow:
                    'inset -5px -5px 10px hsl(240, 25%, 20%), inset 5px 5px 9px hsl(240, 25%, 11%)',
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
              />
            </div>
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
              <div className="absolute text-sm text-red-600">
                {formik.errors.passwordConfirm}
              </div>
            ) : null}
          </div>
          <div className="pt-4">
            {/* <button type="submit" className="w-full btn btn-deluxe btn-primary">
              <span className="btn-deluxe-edge" />
              <span className=" btn-deluxe-front">
                <div className="flex justify-center">
                  <span className="p-1 text-xl font-semibold">注册</span>
                </div>
              </span>
            </button> */}
            <div className="flex justify-end gap-4 pb-2 pr-3">
              <Button type="secondary" onClick={() => handleCancel()}>
                取消
              </Button>

              <Button isFormSubmit>确定</Button>
            </div>
          </div>
        </form>
      </CalloutCard>
    )
  }

  return (
    <div>
      <div className="pl-2">
        <Button
          type="danger"
          isSmall
          onClick={() => {
            setOpen(true)
          }}>
          <div className="text-sm">修改密码</div>
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
                    <ChangePassword />
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
