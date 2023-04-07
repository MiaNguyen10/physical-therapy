import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import AccessDenied from 'app/pages/AccessDenied'
import { selectState } from 'cores/reducers/authentication'
import PermissionContext from './PermissionContext'

const RestrictedPermission = ({ permission, children }) => {
  const { isAllowedTo } = useContext(PermissionContext)
  const currentState = useSelector(selectState)

  if (isAllowedTo(currentState.token_type, permission)) {
    if (children) {
      return <>{children}</>
    }

    return <Outlet />
  }

  return children ? null : <AccessDenied />
}

export default RestrictedPermission

