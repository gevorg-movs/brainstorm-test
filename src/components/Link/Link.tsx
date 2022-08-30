import React, { FC } from 'react'
import { Link as RouterLink, LinkProps } from 'react-router-dom'
import styles from './styles'

const Link: FC<LinkProps> = ({ children, ...props }) => {
   return (
      <RouterLink style={{ ...styles.root, ...props.style }} {...props}>
         {children}
      </RouterLink>
   )
}

export default Link
