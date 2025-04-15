import { Navigate, Outlet } from "react-router-dom"
import { Paths } from "../Routes"

const AuthOutlet = () => {
    const session = localStorage.getItem('session')
  return (
    session? <Outlet /> : <Navigate to={Paths.Login} /> 
  )
}

export default AuthOutlet