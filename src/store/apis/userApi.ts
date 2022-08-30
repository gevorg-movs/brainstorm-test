import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { buildBaseQuery } from './baseQuery'
import { IUser } from '../../types/user'

export const userApi = createApi({
   reducerPath: 'userApi',
   keepUnusedDataFor: 0,
   baseQuery: buildBaseQuery('users'),
   endpoints: builder => ({
      getUsers: builder.query<
         {
            data: IUser[]
            totalCount: number
         },
         any
      >({
         query: params => ({
            url: '',
            params,
         }),
         transformResponse(apiResponse, meta) {
            return {
               data: apiResponse as IUser[],
               totalCount: Number(meta?.response?.headers.get('X-Total-Count')),
            }
         },
      }),

      getUser: builder.query<IUser, string | number>({
         query: userId => ({
            url: `/${userId}`,
         }),
      }),

      updateUser: builder.mutation<any, Partial<IUser>>({
         query: user => ({
            url: `/${user.id}`,
            method: 'PATCH',
            body: user,
         }),
      }),

      addUser: builder.mutation<IUser, IUser>({
         query: draftUser => ({
            url: '/',
            method: 'POST',
            body: draftUser,
         }),
      }),

      deleteUser: builder.mutation<any, number>({
         query: userId => ({
            url: `/${userId}`,
            method: 'DELETE',
         }),
      }),
   }),
})

export const {
   useGetUsersQuery,
   useGetUserQuery,
   useAddUserMutation,
   useUpdateUserMutation,
   useDeleteUserMutation,
} = userApi

export default userApi
