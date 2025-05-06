import { Route, Routes } from "react-router-dom"
import { Elements, Paths } from "./Routes"
import AuthOutlet from "./Outlets/AuthOutlet"
import NavBarOutlet from "./Outlets/NavBarOutlet"
import ProtectLogin from "./Outlets/ProtectLogin"
import AdminOutlet from "./Outlets/AdminOutlet"

const AppRoutes = () => {
  return (
    <Routes>

      <Route element={<ProtectLogin />} >
        <Route path={Paths.Login} element={<Elements.Login/>} />
        <Route path={Paths.ForgotenPassword} element={<Elements.ForgotenPassword/>} />
      </Route>
      
        <Route element={<AuthOutlet />}>
          <Route element={<NavBarOutlet />} >
            <Route path={Paths.Home} element={<Elements.Home/>} />
            <Route path={Paths.ProfileData} element={<Elements.ProfileData/>} />
            <Route element={<AdminOutlet/>}>
              <Route path={Paths.CrudCuenta} element={<Elements.CrudCuenta/>} />
              <Route path={Paths.CrudPerfil}>
                <Route index element={<Elements.CrudPerfil />} />
                <Route path="perfil/:id" element={<Elements.EditarPerfil />} />
              </Route>
            </Route>
          </Route>
      </Route>

        <Route path="*" element={<Elements.Error404 />} />
    </Routes>
  )
}

export default AppRoutes