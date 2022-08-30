import React, { FC } from 'react'
import { Stack } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import styles from './styles'

interface SortIconProps {
   order: string
   isActive: boolean
}

const SortIcon: FC<SortIconProps> = ({ order, isActive }) => {
   return (
      <Stack justifyContent='center' sx={styles.root}>
         <FontAwesomeIcon
            icon={faCaretUp}
            style={{
               color: isActive && order === 'asc' ? 'black' : 'silver',
            }}
         />
         <FontAwesomeIcon
            icon={faCaretDown}
            style={{
               color: isActive && order === 'desc' ? 'black' : 'silver',
            }}
         />
      </Stack>
   )
}

export default SortIcon
