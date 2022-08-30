import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { buildBaseQuery } from './baseQuery'
import { IUser } from '../../types/user'

export const imageApi = createApi({
   reducerPath: 'imageApi',
   keepUnusedDataFor: 0,
   baseQuery: buildBaseQuery('images'),
   endpoints: builder => ({
      uploadImage: builder.mutation<{ url: string }, File>({
         query: file => {
            const formData = new FormData()

            formData.append('file', file)

            return {
               url: '/',
               method: 'POST',
               body: formData,
            }
         },
      }),
   }),
})

export const { useUploadImageMutation } = imageApi

export default imageApi
