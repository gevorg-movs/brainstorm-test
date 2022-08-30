import React, { FC, useState } from 'react'
import { Typography } from '@mui/material'
import Layout from '../../../components/Layout'
import UserForm from '../UserForm'
import {
   useGetUserQuery,
   useUpdateUserMutation,
} from '../../../store/apis/userApi'
import { useUploadImageMutation } from '../../../store/apis/imageApi'
import useAlert from '../../../hooks/useAlert'
import { useParams } from 'react-router-dom'

const EditUser: FC = () => {
   const { showSuccess, showError } = useAlert()
   const [isLoading, setIsLoading] = useState(false)
   const params = useParams()

   const { data: user, refetch } = useGetUserQuery(params.userId as string)

   const [updateUser] = useUpdateUserMutation()
   const [uploadImage] = useUploadImageMutation()

   const handleAddUser = async (data: any) => {
      setIsLoading(true)

      try {
         if (data.photo instanceof File) {
            const { url } = await uploadImage(data.photo).unwrap()
            data.photo = url
         }

         await updateUser(data).unwrap()

         refetch()

         await showSuccess('User has been updated successfully')
      } catch (e: any) {
         await showError(e.message)
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <Layout>
         <Typography variant='h6' paddingBottom={5}>
            Edit User
         </Typography>

         <UserForm onSubmit={handleAddUser} isLoading={isLoading} user={user} />
      </Layout>
   )
}

export default EditUser
