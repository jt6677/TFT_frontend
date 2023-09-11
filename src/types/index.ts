import {
  BasicEquipmentListProps,
  ChampWithEquipmentAndLevel,
  HexProps,
  StageTutorial,
} from '~/component/editor/types'

export interface IProfile {
  user_id: string
  username: string
  bio: string
  image: string
  profileURL: string
  // following: boolean
}
export interface IUser {
  user_id: string
  username: string
  bio: string
  roles: string[]
  email: string
  image: string
}
export type TutorialResp = {
  tutorialId: string
  authorName: string
  version: string
  dateCreated: string
  dateUpdated: string
  slug: string
  tag: string
  title: string
  description: string
  published: boolean
  collected: boolean
  liked: boolean
  likeCount: number
  content: string
  authorImage: string
}

export type Tutorial = {
  tutorialId: string
  authorName: string
  version: string
  dateCreated: string
  dateUpdated: string
  slug: string
  tag: string
  title: string
  description: string
  published: boolean
  collected: boolean
  liked: boolean
  likeCount: number
  authorImage: string
  content: {
    video: string
    comment: string
    champBoard: (ChampWithEquipmentAndLevel | null)[]
    champRow: {
      coreChamps: ChampWithEquipmentAndLevel[]
      champGroup: (ChampWithEquipmentAndLevel | null)[]
    }
    equipPriorityList: BasicEquipmentListProps[]
    hexTiers: HexProps[][]
    stageTutorial: StageTutorial[]
  }
}
export type NavItem = {
  name: string
  url: string
  icon: (props: JSX.Element) => JSX.Element
  current: boolean
}
export type UserNavItem = {
  name: string
  url: string
}

export interface IError {
  error: string
}
export interface IComment {
  commentId: string
  commenterId: string
  commenterName: string
  commenterImage: string
  tutorialId: string
  parentId: string
  body: string
  dateUpdated: string
}
