import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'

import AccessDenied from 'app/pages/AccessDenied'
import PermissionContext from './PermissionContext'
import { useSelector } from 'react-redux'
import { selectState } from 'cores/reducers/authentication'

const RestrictedPermission = ({ permission, children }) => {
  const { isAllowedTo } = useContext(PermissionContext)
  const auth = useSelector(selectState)

  if (isAllowedTo(auth.role, permission)) {
    if (children) {
      return <>{children}</>
    }

    return <Outlet />
  }

  return children ? null : <AccessDenied />
}

export default RestrictedPermission

