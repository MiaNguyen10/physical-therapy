import pages from 'app/config/pages'
import { selectState } from 'cores/reducers/authentication'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router'

const ProtectedRoutes = ({children}) => {
  const currentState = useSelector(selectState)
  const location = useLocation()

  if (!currentState.access_token) {
    return <Navigate to={`${pages.loginPath}`} state={{ from: location }} replace />
  } 

  return {children}
}

export default ProtectedRoutes

