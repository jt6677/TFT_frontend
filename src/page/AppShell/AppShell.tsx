import { ReactNode, useState } from 'react'

import { NavItem } from '~/types'

import MobileSidebar from './MobileSidebar'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'

const AppShell = ({ children, navigation }: { children: ReactNode; navigation: NavItem[] }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
      />
      <div className="hidden md:flex md:w-52 md:flex-col md:fixed md:inset-y-0">
        <Sidebar navigation={navigation} />
      </div>
      <div className="flex flex-col md:pl-52">
        <TopNavbar setSidebarOpen={setSidebarOpen} />
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-5xl px-4 mx-auto sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </>
  )
}
export default AppShell
