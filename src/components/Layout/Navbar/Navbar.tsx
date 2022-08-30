import React, { FC } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import MenuList from '@mui/material/MenuList'
import { SupervisedUserCircleRounded, Timeline } from '@mui/icons-material'
import styles from './styles'
import { NavLink } from 'react-router-dom'

const items = [
   {
      path: '/',
      icon: Timeline,
      title: 'Homepage',
      children: [],
   },
   {
      path: '/users',
      icon: SupervisedUserCircleRounded,
      title: 'Users',
      children: [
         {
            path: '/users/add',
            title: 'Add user',
         },
      ],
   },
]

const Navbar: FC = () => {
   const getMenuItemStyles = ({ isActive }: { isActive: boolean }) => {
      let mergedStyles: React.CSSProperties = { ...styles.menuItem }

      if (isActive) {
         mergedStyles = { ...styles.menuItem, ...styles.menuItemActive }
      }

      return mergedStyles
   }

   const getMenuItemContent = (
      { isActive }: { isActive: boolean },
      Icon: any,
      text: string
   ) => {
      const colorStyles = {
         color: isActive ? '#fdfdfd' : '#788195',
      }

      return (
         <>
            <Icon
               style={{
                  ...styles.menuItemIcon,
                  ...colorStyles,
               }}
            />
            <Typography sx={colorStyles}>{text}</Typography>
         </>
      )
   }

   return (
      <>
         <Box sx={styles.header} />
         <Stack sx={styles.root}>
            {items.map(item => (
               <MenuList key={item.path} sx={styles.menuList}>
                  <NavLink
                     to={item.path}
                     style={getMenuItemStyles}
                     children={isActive =>
                        getMenuItemContent(isActive, item.icon, item.title)
                     }
                  />

                  {!!item.children.length && (
                     <Box>
                        {item.children.map(link => (
                           <NavLink
                              key={link.path}
                              to={link.path}
                              style={({ isActive }) => {
                                 return isActive
                                    ? {
                                         ...styles.childItem,
                                         ...styles.menuItemActive,
                                      }
                                    : styles.childItem
                              }}>
                              {link.title}
                           </NavLink>
                        ))}
                     </Box>
                  )}
               </MenuList>
            ))}
         </Stack>
      </>
   )
}

export default Navbar
