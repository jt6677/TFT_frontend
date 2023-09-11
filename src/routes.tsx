import { HomeIcon } from '@heroicons/react/outline'
import { Route, Routes } from 'react-router-dom'

import EditorPage from '~/page/EditorPage'
import TutorialPreviewPage from '~/page/TutorialPreviewPage'
import { NavItem } from '~/types'

import AppShell from './page/AppShell'

const UnauthenticatedNavigation: NavItem[] = [
  { name: '编辑攻略', url: 'editor', icon: HomeIcon, current: false },
]

export const UnauthenticatedTeamCompsTabs = [{ name: '阵容列表', url: 'all' }]

export function UnauthenticatedApp() {
  return (
    <AppShell navigation={UnauthenticatedNavigation}>
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/preview" element={<TutorialPreviewPage />} />
        <Route path="*" element={<EditorPage />} />
      </Routes>
    </AppShell>
  )
}
export function App() {
  return (
    <>
      <UnauthenticatedApp />
    </>
  )
}
