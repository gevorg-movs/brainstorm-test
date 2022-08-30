import React, { FC, useState } from 'react'
import { Typography } from '@mui/material'
import Layout from '../../../components/Layout'
import UserForm from '../UserForm'
import { useAddUserMutation } from '../../../store/apis/userApi'
import { useUploadImageMutation } from '../../../store/apis/imageApi'
import useAlert from '../../../hooks/useAlert'
import { useNavigate } from 'react-router-dom'

const AddUser: FC = () => {
   const navigate = useNavigate()
   const { showSuccess, showError } = useAlert()
   const [isLoading, setIsLoading] = useState(false)

   const [addUser] = useAddUserMutation()
   const [uploadImage] = useUploadImageMutation()

   const handleAddUser = async (data: any) => {
      setIsLoading(true)

      try {
         const { url } = await uploadImage(data.photo).unwrap()
         await addUser({ ...data, photo: url }).unwrap()
         await showSuccess('User has been added successfully')

         navigate('/users')
      } catch (e: any) {
         await showError(e.message)
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <Layout>
         <Typography variant='h6' paddingBottom={5}>
            Add User
         </Typography>

         <UserForm onSubmit={handleAddUser} isLoading={isLoading} />
      </Layout>
   )
}

export default AddUser
