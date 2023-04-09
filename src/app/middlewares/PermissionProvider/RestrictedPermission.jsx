import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import AccessDenied from 'app/pages/AccessDenied'
import { getUserRole, selectState } from 'cores/reducers/authentication'
import PermissionContext from './PermissionContext'
import { getRole } from 'cores/thunk/auth'

const RestrictedPermission = ({ permission, children }) => {
  const { isAllowedTo } = useContext(PermissionContext)
  const currentState = useSelector(selectState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRole(currentState.UserId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let currentRole = useSelector(getUserRole);

  if (isAllowedTo(currentRole.name, permission)) {
    if (children) {
      return <>{children}</>
    }

    return <Outlet />
  }

  return children ? null : <AccessDenied />
}

export default RestrictedPermission

