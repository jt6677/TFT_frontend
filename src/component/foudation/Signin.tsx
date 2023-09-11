import { LockClosedIcon, UserCircleIcon } from '@heroicons/react/solid'
import Alert from '@mui/material/Alert'
import { AxiosError } from 'axios'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import * as Yup from 'yup'

import { CalloutCard, LogoWithSlogan } from '~/component/lib'
import { useAuth } from '~/context/AuthContext'
import { AuthActionType } from '~/reducers/auth'
import { IError } from '~/types'

const Signin = ({ setOpen }: { setOpen: (action: 'signup') => void }) => {
  const [loading, setLoading] = useState(false)

  const [isSuccess, setIsSuccess] = useState<string | null>()
  const [isError, setIsError] = useState<string | null>()
  const [redirectOnLogin, setRedirectOnLogin] = useState(false)
  const { dispatch, signIn: SigninAction } = useAuth()

  const handleSubmit = async ({ username, password }: { username: string; password: string }) => {
    setIsError(null)
    setLoading(true)
    try {
      const data = await SigninAction(username, password)
      if (data) {
        // console.log(data)
        setIsSuccess('Successfully Signed In')
        setTimeout(() => {
          setRedirectOnLogin(true)
          dispatch({ type: AuthActionType.LOAD_USER, user: data })
        }, 700)
      }
    } catch (error) {
      const err = error as AxiosError<IError>
      if (err.response) {
        setIsError('Failed to Sign In, Please try again')
        setTimeout(() => {
          setIsError(null)
        }, 1200)
      }
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().min(5, '账号不够长').required('必需嘚'),
      password: Yup.string().min(5, '不够长').required('必需嘚'),
    }),
    onSubmit: ({ username, password }) => {
      handleSubmit({ username, password })
    },
  })

  return (
    <>
      {redirectOnLogin && <Navigate to="/" />}
      <motion.div
        initial={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2 } }}>
        <CalloutCard additionalCSS="w-96">
          <LogoWithSlogan />
          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="p-4 sm:px-10">
              <form className="space-y-2" onSubmit={formik.handleSubmit}>
                <div>
                  <div className="relative mt-1 rounded-md shadow-sm ">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <UserCircleIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      autoComplete="new-password"
                      type="text"
                      autoFocus
                      className="block w-full p-4 placeholder-gray-500 border-0 pl-11 rounded-2xl bg-sinkIn text-textColor shadow-borderColor placeholder:text-midGray focus:ring-0 sm:text-sm"
                      placeholder="账号"
                      style={{
                        boxShadow:
                          'inset -5px -5px 10px hsl(240, 25%, 20%), inset 5px 5px 9px hsl(240, 25%, 11%)',
                      }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                    />
                  </div>
                  {formik.touched.username && formik.errors.username ? (
                    <div className="absolute text-sm text-red-600">{formik.errors.username}</div>
                  ) : null}
                </div>
                <div>
                  <div className="relative mt-6 rounded-md shadow-sm ">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                      <LockClosedIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      className="block w-full p-4 placeholder-gray-500 border-0 pl-11 rounded-2xl bg-sinkIn text-textColor shadow-borderColor placeholder:text-midGray focus:ring-0 sm:text-sm"
                      placeholder="密码"
                      style={{
                        boxShadow:
                          'inset -5px -5px 10px hsl(240, 25%, 20%), inset 5px 5px 9px hsl(240, 25%, 11%)',
                      }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="absolute text-sm text-red-600">{formik.errors.password}</div>
                  ) : null}
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full btn btn-deluxe btn-primary">
                    <span className="btn-deluxe-edge" />
                    <span className=" btn-deluxe-front">
                      <div className="flex justify-center">
                        <span className="p-1 text-xl font-semibold">登录</span>
                      </div>
                    </span>
                  </button>

                  {isSuccess && (
                    <Alert severity="success" className="mt-2">
                      {isSuccess}
                    </Alert>
                  )}
                  {isError && (
                    <Alert severity="error" className="mt-2">
                      {isError}
                    </Alert>
                  )}
                </div>
              </form>

              <p className="py-4 text-sm text-gray-600 ">
                <button
                  type="button"
                  onClick={() => setOpen('signup')}
                  className="font-medium text-brightGold hover:text-goldBorder">
                  注册新账号
                </button>
              </p>
            </div>
          </div>
        </CalloutCard>
      </motion.div>
    </>
  )
}

export default Signin
