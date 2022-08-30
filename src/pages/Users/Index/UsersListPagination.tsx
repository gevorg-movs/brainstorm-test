import React, { FC } from 'react'
import styles from './styles'
import { Pagination, PaginationItem, Stack, Typography } from '@mui/material'

interface UsersListPaginationProps {
   pages: number
   totalCount: number
   onChange: (page: number) => void
}

const UsersListPagination: FC<UsersListPaginationProps> = ({
   pages,
   totalCount,
   onChange,
}) => {
   return (
      <Stack sx={styles.paginationContainer}>
         <Stack
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'>
            <Stack>
               <Typography marginBottom={2}>Changer</Typography>

               <Pagination
                  shape='rounded'
                  count={pages}
                  color='primary'
                  renderItem={item => (
                     <PaginationItem style={styles.paginationItem} {...item} />
                  )}
                  onChange={(e, page) => onChange(page)}
               />
            </Stack>

            <Stack flexDirection='row'>
               <Typography flexDirection='row'>
                  Total count of users:
               </Typography>
               <Typography fontWeight='bold'>{totalCount}</Typography>
            </Stack>
         </Stack>
      </Stack>
   )
}

export default UsersListPagination
