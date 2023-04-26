import pages from 'app/config/pages'
import { selectToken } from 'cores/reducers/authentication'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router'

const ProtectedRoutes = () => {
  const token = useSelector(selectToken)
  const location = useLocation()

  if (!token) {
    return <Navigate to={`${pages.loginPath}`} state={{ from: location }} replace />
  } 

  return <Outlet />
}

export default ProtectedRoutes


