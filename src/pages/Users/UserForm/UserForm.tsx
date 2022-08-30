import React, { FC, useEffect } from 'react'
import {
   Button,
   Grid,
   InputLabel,
   Stack,
   TextField,
   Typography,
} from '@mui/material'
import { Image } from '@mui/icons-material'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { IUser } from '../../../types/user'
import styles from './styles'

interface UserFormProps {
   isLoading: boolean
   onSubmit: (user: any) => void
   user?: IUser
}

const UserForm: FC<UserFormProps> = ({ onSubmit, user, isLoading }) => {
   const validationSchema = yup.object({
      name: yup.string().required(),
      email: yup.string().required(),
      location: yup.string().required(),
      photo: yup.mixed().required(),
   })

   const initialValues = {
      name: '',
      email: '',
      location: '',
      photo: null as unknown as File,
      ...user,
   }

   useEffect(() => {
      setValues({ ...values, ...user })
   }, [user])

   const onFormSubmit = async (user: any) => {
      onSubmit(user)
   }

   const {
      values,
      errors,
      touched,
      handleSubmit,
      handleChange,
      setFieldValue,
      setValues,
   } = useFormik({
      initialValues,
      validationSchema,
      onSubmit: onFormSubmit,
      validateOnChange: false,
      validateOnBlur: false,
   })

   return (
      <form onSubmit={handleSubmit}>
         <Grid container>
            <Grid item lg={4}>
               <Stack marginBottom={2}>
                  <InputLabel>Username</InputLabel>
                  <TextField
                     name='name'
                     placeholder='Name'
                     value={values.name}
                     onChange={handleChange}
                     error={touched.name && Boolean(errors.name)}
                  />
                  {errors.name && (
                     <Typography color='indianred'>{errors.name}</Typography>
                  )}
               </Stack>

               <Stack marginBottom={2}>
                  <Stack flexDirection='row'>
                     <input
                        accept='image/*'
                        style={{ display: 'none' }}
                        id='user-photo-input'
                        multiple
                        type='file'
                        onChange={e =>
                           setFieldValue('photo', e.target.files?.[0])
                        }
                     />
                     <label htmlFor='user-photo-input'>
                        <Button
                           size='large'
                           variant='outlined'
                           component='span'>
                           <Image />{' '}
                           <Typography marginLeft={1}>Photo</Typography>
                        </Button>
                     </label>

                     {!!user?.photo && (
                        <img style={styles.photo} src={user.photo} alt='' />
                     )}
                  </Stack>

                  {errors.photo && (
                     <Typography color='indianred'>{errors.photo}</Typography>
                  )}
               </Stack>

               <Stack marginBottom={2}>
                  <InputLabel>Email</InputLabel>
                  <TextField
                     name='email'
                     type='text'
                     placeholder='Email'
                     value={values.email}
                     onChange={handleChange}
                     error={touched.email && Boolean(errors.email)}
                  />
                  {errors.email && (
                     <Typography color='indianred'>{errors.email}</Typography>
                  )}
               </Stack>

               <Stack marginBottom={2}>
                  <InputLabel>Location</InputLabel>
                  <TextField
                     name='location'
                     type='location'
                     placeholder='Location'
                     value={values.location}
                     onChange={handleChange}
                     error={touched.location && Boolean(errors.location)}
                  />
                  {errors.location && (
                     <Typography color='indianred'>
                        {errors.location}
                     </Typography>
                  )}
               </Stack>
            </Grid>
         </Grid>

         <Button disabled={isLoading} variant='contained' type='submit'>
            {isLoading ? 'Loading...' : 'Save'}
         </Button>
      </form>
   )
}

export default UserForm
