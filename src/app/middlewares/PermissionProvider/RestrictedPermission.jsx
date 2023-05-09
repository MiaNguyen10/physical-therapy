import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'

import AccessDenied from 'app/pages/AccessDenied'
import PermissionContext from './PermissionContext'

const RestrictedPermission = ({ permission, children }) => {
  const { isAllowedTo } = useContext(PermissionContext)
  const role = JSON.parse(localStorage.getItem('authentication'))

  if (isAllowedTo(role.role, permission)) {
    if (children) {
      return <>{children}</>
    }

    return <Outlet />
  }

  return children ? null : <AccessDenied />
}

export default RestrictedPermission

