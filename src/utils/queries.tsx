import axios from 'axios'
import _ from 'lodash'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { IComment, IUser, Tutorial, TutorialResp } from '~/types'
import apiClient from '~/utils/apiClient'

export function useAllTutorials(tabName: string) {
  return useQuery(
    ['tutorials', tabName] as const,
    async ({ queryKey }) => {
      const data: TutorialResp[] = await apiClient
        .get(`tutorial/${queryKey[1]}`)
        .then((resp) => resp.data)
      const arr = data.map((item) => ({ ...item, content: JSON.parse(item.content) } as Tutorial))
      return _.orderBy(arr, [(obj) => new Date(obj.dateUpdated)], ['desc'])
    },
    {
      staleTime: 30 * 1000,
    }
  )
}
// export function useTagList() {
//   return useQuery(
//     'tags',
//     async () => {
//       const data: Tag[] = await apiClient
//         .get(`v1/tutorial/tags`)
//         .then((resp) => resp.data)
//       return data
//     },
//     {
//       staleTime: Infinity,
//     }
//   )
// }
export const tagList = [{ tagName: '存钱慢D' }, { tagName: '稳定运营' }, { tagName: '快速上8' }]

export function useTutorial(tutorialId: string) {
  const queryClient = useQueryClient()
  return useQuery(
    ['tutorials', tutorialId] as const,
    async ({ queryKey }) => {
      const response = await apiClient.get(`tutorial/display/${queryKey[1]}`)
      return {
        ...response.data,
        content: JSON.parse(response.data.content),
      } as Tutorial
    },
    {
      staleTime: 30 * 1000,
      initialData: () => {
        const cachedResult: Tutorial[] | undefined = queryClient.getQueryData(['tutorials'])
        if (cachedResult) {
          return cachedResult.find((item) => item.tutorialId === tutorialId)
        }
      },
    }
  )
}

export function useCreateTutorial() {
  const queryClient = useQueryClient()
  return useMutation(
    ({
      data,
      action,
    }: {
      data: { title: string; tag: string; description: string; content: string }
      action: 'publish' | 'draft'
    }) => {
      return apiClient.post(`tutorial/create/${action}`, data).then((res) => res.data)
      // .then((res) => delay(4000).then(() => res.data))
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('tutorials')
      },
    }
  )
}

export function useModifyTutorial() {
  const queryClient = useQueryClient()
  return useMutation(
    ({
      tutorialId,
      action,
      data,
    }: {
      tutorialId: string
      action: 'unpublish' | 'publish' | 'delete' | 'modify'
      data?: { title: string; description: string; content: string }
    }) => {
      if (data) {
        return apiClient.post(`tutorial/${tutorialId}/${action}`, data).then((res) => res.data)
      }
      return apiClient.post(`tutorial/${tutorialId}/${action}`).then((res) => res.data)
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('tutorials')
      },
    }
  )
}
export function useSetCollection() {
  const queryClient = useQueryClient()
  return useMutation(
    ({ tutid, action }: { tutid: string; action: 'add' | 'remove' }) => {
      return apiClient.post(`tutorial/collection/${tutid}/${action}`).then((res) => res.data)
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('tutorials')
      },
    }
  )
}
export function useUpdateUser() {
  function updateUser(data: {
    image?: string
    bio?: string
    oldPassword?: string
    newPassword?: string
    passwordConfirm?: string
  }): Promise<IUser> {
    return apiClient.post(`update`, data).then((res) => res.data)
  }
  return useMutation(
    ({
      data,
    }: {
      data: {
        image?: string
        bio?: string
        oldPassword?: string
        newPassword?: string
        passwordConfirm?: string
      }
    }) => {
      return updateUser(data)
    }
  )
}
export function useSetLike() {
  const queryClient = useQueryClient()
  return useMutation(
    ({ tutid, action }: { tutid: string; action: 'add' | 'remove' }) => {
      return apiClient.post(`tutorial/like/${tutid}/${action}`).then((res) => res.data)
      // .then((res) => delay(4000).then(() => res.data))
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('tutorials')
      },
    }
  )
}
export function useFetchComments(tutorialId: string) {
  function fetchComments(tutId: string): Promise<IComment[]> {
    return apiClient.get<IComment[]>(`/comments/${tutId}/get`).then((resp) => resp.data)
  }
  return useQuery(['tutorialComments', tutorialId], () => fetchComments(tutorialId), {
    staleTime: 20 * 1000,
  })
}

export function usePostComment() {
  const queryClient = useQueryClient()
  function postComment(tutorialId: string, body: string, parentId: string): Promise<IComment> {
    return apiClient
      .post<IComment>(`/comments/${tutorialId}/create`, {
        body,
        parentId,
      })
      .then((response) => response.data)
  }
  return useMutation(
    ({ tutorialId, body, parentId }: { tutorialId: string; body: string; parentId: string }) => {
      console.log(tutorialId, body, parentId)
      return postComment(tutorialId, body, parentId)
    },
    {
      onSuccess: ({ tutorialId }) =>
        queryClient.invalidateQueries(['tutorialComments', tutorialId]),
    }
  )
}
export function useUploadImage() {
  function uploadImage(data: string): Promise<ImgbbResp> {
    const body = new FormData()
    body.set('key', 'b48571dbe662142100e28966b6113e5c')
    body.append('image', data)
    return axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((resp) => resp.data as ImgbbResp)
  }
  return useMutation(({ data }: { data: string }) => {
    return uploadImage(data)
  })
}
type ImgbbResp = {
  data: {
    id: string
    title: string
    url_viewer: string
    url: string
    display_url: string
    width: string
    height: string
    size: number
    time: string
    expiration: string
    image: {
      filename: string
      name: string
      mime: string
      extension: string
      url: string
    }
    thumb: {
      filename: string
      name: string
      mime: string
      extension: string
      url: string
    }
    delete_url: string
  }
  success: boolean
  status: number
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// type Group = {
//   id: string
// }
// function fetchGroups(): Promise<Group[]> {
//   return axios.get('groups').then((response) => response.data)
// }

// // ✅ data will be `Group[] | undefined` here

// function useGroups() {
//   return useQuery('groups', fetchGroups)
// }

// ✅ data will be `number | undefined` here

// function useGroupCount() {
//   return useQuery('groups', fetchGroups, {
//     select: (groups) => groups.length,
//   })
// }
// const groups = useGroups()
// const showError = () => {
//   if (groups.error instanceof Error) {
//     return <div>An error occurred: {groups.error.message}</div>
//   }
//   if (groups.isSuccess) {
//     // ✅ groupsQuery.data will now be `Group[]`
//     console.log(groups.data)
//   }
// }
// const addComment = useMutation((newComment: string) =>
//   axios.post(`/posts/comments`, newComment)
// )
// addComment.mutate('asd')
