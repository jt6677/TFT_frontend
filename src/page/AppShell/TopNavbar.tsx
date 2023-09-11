import { MenuAlt2Icon } from '@heroicons/react/outline'
import { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'

const TopNavbar = ({ setSidebarOpen }: { setSidebarOpen: Dispatch<SetStateAction<boolean>> }) => {
  // const {
  //   state: { user },
  //   dispatch,
  //   signOut,
  // } = useAuth()
  const navigate = useNavigate()
  const handleSignout = () => {
    // signOut()
    // dispatch({ type: AuthActionType.SIGNOUT })
    // navigate('/')
  }
  return (
    <div className="sticky top-0 z-50 flex flex-shrink-0 h-12 shadow bg-sinkIn">
      <button
        type="button"
        className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primaryColor md:hidden"
        onClick={() => setSidebarOpen(true)}>
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
      </button>
      <div className="flex justify-between flex-1 w-full px-4">
        <div className="flex flex-1" />

        <div className="flex items-center ml-4 md:ml-6">
          {/* Profile dropdown */}
          {/* {user ? UserDropdown() : <SignInModal />} */}
        </div>
      </div>
    </div>
  )
}
export default TopNavbar
