import React, { ChangeEvent, useState } from 'react'
import {
   Box,
   Checkbox,
   CircularProgress,
   IconButton,
   Paper,
   Stack,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import useAlert from '../../../hooks/useAlert'
import {
   useDeleteUserMutation,
   useGetUsersQuery,
   useUpdateUserMutation,
} from '../../../store/apis/userApi'
import { SortIcon, Switch } from '../../../components'
import { Delete, Edit } from '@mui/icons-material'
import styles from './styles'
import UsersListPagination from './UsersListPagination'

const UsersList = () => {
   const { showSuccess, showError, showWarning } = useAlert()

   const [selectedUsers, setSelectedUsers] = useState<number[]>([])
   const [params, setParams] = useState({
      _page: 1,
      _limit: 15,
      _sort: 'id',
      _order: 'asc',
   })

   const { data: users, refetch: refetchUsers } = useGetUsersQuery(params)
   const [updateUser] = useUpdateUserMutation()
   const [deleteUser] = useDeleteUserMutation()

   const handlePageChange = (_page: number) => {
      setParams({ ...params, _page })
   }

   const handeSortByField = (_sort: string) => {
      setParams({
         ...params,
         _sort,
         _order: params._order === 'asc' ? 'desc' : 'asc',
      })
   }

   const handleDeleteUser = async (userId: number) => {
      const { isConfirmed } = await showWarning(
         `The user with the id ${userId} will be deleted`
      )

      if (!isConfirmed) {
         return
      }

      try {
         await deleteUser(userId).unwrap()
         refetchUsers()
         await showSuccess('User has been successfully deleted')
      } catch (error) {
         await showError('Error')
      }
   }

   const handleUserStatusChange = async (userId: number, isActive: boolean) => {
      try {
         await updateUser({
            id: userId,
            disabled: isActive,
         }).unwrap()
         await showSuccess('User status has been successfully updated')
      } catch (e) {
         await showError('Error')
      }
   }

   const handleSelectAllUser = (
      event: ChangeEvent<HTMLInputElement>,
      checked: boolean
   ) => {
      if (checked && users?.data) {
         setSelectedUsers(users.data.map(user => user.id))
      } else {
         setSelectedUsers([])
      }
   }

   const handleSelectUser = (
      event: ChangeEvent<HTMLInputElement>,
      userId: number,
      checked: boolean
   ) => {
      if (checked) {
         setSelectedUsers([...selectedUsers, userId])
      } else {
         setSelectedUsers(selectedUsers.filter(id => id !== userId))
      }
   }

   return (
      <>
         {!users?.data.length ? (
            <Box sx={styles.loadingContainer}>
               <CircularProgress size={100} />
            </Box>
         ) : (
            <TableContainer component={Paper}>
               <Table>
                  <TableHead sx={styles.tableHeader}>
                     <TableRow>
                        <TableCell>
                           <Checkbox
                              onChange={handleSelectAllUser}
                              checked={
                                 selectedUsers.length === users.data.length
                              }
                           />
                        </TableCell>
                        <TableCell>
                           <Stack
                              sx={styles.tableHeaderCell}
                              flexDirection='row'
                              alignItems='center'
                              onClick={() => handeSortByField('photo')}>
                              <Typography sx={styles.tableHeaderCellText}>
                                 Photo
                              </Typography>
                              <SortIcon
                                 isActive={params._sort === 'photo'}
                                 order={params._order}
                              />
                           </Stack>
                        </TableCell>
                        <TableCell>
                           <Stack
                              sx={styles.tableHeaderCell}
                              flexDirection='row'
                              alignItems='center'
                              onClick={() => handeSortByField('name')}>
                              <Typography sx={styles.tableHeaderCellText}>
                                 Name
                              </Typography>
                              <SortIcon
                                 isActive={params._sort === 'name'}
                                 order={params._order}
                              />
                           </Stack>
                        </TableCell>
                        <TableCell>
                           <Stack
                              sx={styles.tableHeaderCell}
                              flexDirection='row'
                              alignItems='center'
                              onClick={() => handeSortByField('location')}>
                              <Typography sx={styles.tableHeaderCellText}>
                                 Location
                              </Typography>
                              <SortIcon
                                 isActive={params._sort === 'location'}
                                 order={params._order}
                              />
                           </Stack>
                        </TableCell>
                        <TableCell>
                           <Stack
                              sx={styles.tableHeaderCell}
                              flexDirection='row'
                              alignItems='center'
                              onClick={() =>
                                 handeSortByField('registeredDate')
                              }>
                              <Typography sx={styles.tableHeaderCellText}>
                                 Registered Date
                              </Typography>
                              <SortIcon
                                 isActive={params._sort === 'registeredDate'}
                                 order={params._order}
                              />
                           </Stack>
                        </TableCell>
                        <TableCell>
                           <Stack
                              sx={styles.tableHeaderCell}
                              flexDirection='row'
                              alignItems='center'
                              onClick={() =>
                                 handeSortByField('lastActiveDate')
                              }>
                              <Typography sx={styles.tableHeaderCellText}>
                                 Last Active Date
                              </Typography>
                              <SortIcon
                                 isActive={params._sort === 'lastActiveDate'}
                                 order={params._order}
                              />
                           </Stack>
                        </TableCell>
                        <TableCell>
                           <Typography sx={styles.tableHeaderCellText}>
                              Actions
                           </Typography>
                        </TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {users?.data.map(user => (
                        <TableRow key={user.id} sx={styles.tableRow}>
                           <TableCell>
                              <Checkbox
                                 onChange={(e, checked) =>
                                    handleSelectUser(e, user.id, checked)
                                 }
                                 checked={selectedUsers.includes(user.id)}
                              />
                           </TableCell>
                           <TableCell>
                              <img
                                 style={styles.photo}
                                 src={user.photo}
                                 alt={user.name}
                              />
                           </TableCell>
                           <TableCell align='left' sx={styles.tableRowCell}>
                              {user.name}
                           </TableCell>
                           <TableCell align='left' sx={styles.tableRowCell}>
                              {user.location}
                           </TableCell>
                           <TableCell align='left' sx={styles.tableRowCell}>
                              {user.registeredDate}
                           </TableCell>
                           <TableCell align='left' sx={styles.tableRowCell}>
                              {user.lastActiveDate}
                           </TableCell>
                           <TableCell align='left'>
                              <Switch
                                 defaultChecked={!user.disabled}
                                 onChange={(e, checked) =>
                                    handleUserStatusChange(user.id, !checked)
                                 }
                              />

                              <Link to={`/users/${user.id}/edit`}>
                                 <IconButton color='primary'>
                                    <Edit />
                                 </IconButton>
                              </Link>
                              <IconButton
                                 color='error'
                                 onClick={() => handleDeleteUser(user.id)}>
                                 <Delete />
                              </IconButton>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         )}

         {users?.totalCount && (
            <UsersListPagination
               totalCount={users.totalCount}
               onChange={handlePageChange}
               pages={Math.ceil(users.totalCount / params._limit)}
            />
         )}
      </>
   )
}

export default UsersList
