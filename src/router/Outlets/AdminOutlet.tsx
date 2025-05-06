import { Navigate, Outlet } from "react-router-dom"
import { profile } from "../../declarations/ApiDeclarations"
import { Paths } from "../Routes"

const AdminOutlet = () => {
    const perfil: profile = (JSON.parse(localStorage.getItem('perfil')!))
  return (
    perfil?.rol?.rol == 'admin'? <Outlet/>: <Navigate to={Paths.Home} />
  )
}

export default AdminOutlet