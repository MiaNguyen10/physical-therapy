import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from '../Header/Navbar'

const Layout = () => {
  return (
    <>
        <Navbar />
        <Box>
            <Outlet />
        </Box>
    </>
  )
}

export default Layout