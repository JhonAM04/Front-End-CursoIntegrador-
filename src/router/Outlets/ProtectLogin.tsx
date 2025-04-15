import { Navigate, Outlet, } from "react-router-dom"
import { Paths } from "../Routes"

const ProtectLogin = () => {
    const session = localStorage.getItem('session')
  return (
    session ? <Navigate to={Paths.Home} /> : <Outlet /> 
  )
}

export default ProtectLogin