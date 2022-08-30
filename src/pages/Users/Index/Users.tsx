import React, { FC } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { Layout, Link } from '../../../components'
import UsersList from './UsersList'

const Users: FC = () => {
   return (
      <Layout>
         <Stack
            flexDirection='row'
            justifyContent='space-between'
            paddingBottom={5}>
            <Typography variant='h6'>All users</Typography>

            <Button variant='contained'>
               <Link to='/users/add'>New user</Link>
            </Button>
         </Stack>

         <UsersList />
      </Layout>
   )
}

export default Users
