import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import PermissionContext from './PermissionContext'
import { AccessDenied } from 'app/pages'
import { selectState } from 'cores/reducers/authentication'

const RestrictedPermission = ({ permission, children }) => {
  const { isAllowedTo } = useContext(PermissionContext)
  const currentState = useSelector(selectState)

  if (isAllowedTo(currentState.teir, permission)) {
    if (children) {
      return <>{children}</>
    }

    return <Outlet />
  }

  return children ? null : <AccessDenied />
}

export default RestrictedPermission

