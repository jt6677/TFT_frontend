import axios from 'axios'

import { IProfile } from '~/types'

const apiClient = (() => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-type': 'application/json',
    },
  })
})()

export function getProfile(username: string) {
  return apiClient.get<IProfile>(`profiles/${username}`)
}

export default apiClient
