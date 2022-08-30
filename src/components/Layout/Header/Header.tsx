import React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { QuestionAnswerRounded, Search } from '@mui/icons-material'
import styles from './styles'

const Header = () => {
   return (
      <Box sx={styles.root}>
         <Box>
            <IconButton size='large'>
               <Search />
            </IconButton>
            <IconButton size='large' color='inherit'>
               <Badge badgeContent={4} color='warning'>
                  <MailIcon />
               </Badge>
            </IconButton>
            <IconButton size='large' color='inherit'>
               <Badge badgeContent={4} color='primary'>
                  <NotificationsIcon />
               </Badge>
            </IconButton>
            <IconButton size='large' color='inherit'>
               <Badge badgeContent={4} color='secondary'>
                  <QuestionAnswerRounded />
               </Badge>
            </IconButton>
            <IconButton size='large' color='inherit'>
               <Badge
                  sx={styles.userIconBadge}
                  color='success'
                  overlap='circular'
                  badgeContent=' '
                  anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'right',
                  }}
                  variant='dot'
               />
            </IconButton>
         </Box>
      </Box>
   )
}

export default Header
