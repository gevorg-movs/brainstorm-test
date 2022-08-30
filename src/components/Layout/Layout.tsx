import React, { FC } from 'react'
import { Box, Grid } from '@mui/material'
import styles from './styles'
import Navbar from './Navbar'
import Header from './Header/Header'

interface LayoutProps {
   children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
   return (
      <Grid container sx={styles.root}>
         <Grid item xs={2}>
            <Navbar />
         </Grid>

         <Grid item xs={10}>
            <Header />

            <Box sx={styles.content}>{children}</Box>
         </Grid>
      </Grid>
   )
}

export default Layout
