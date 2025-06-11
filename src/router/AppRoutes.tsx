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
        <Route path={Paths.LoginAdmin} element={<Elements.LoginAdmin/>} />
        <Route path={Paths.ForgotenPassword} element={<Elements.ForgotenPassword/>} />
        <Route path={Paths.PagePassword} element={<Elements.PagePassword/>} />
      </Route>
      
        <Route element={<AuthOutlet />}>
          <Route element={<NavBarOutlet />} >
            <Route path={Paths.Home} element={<Elements.Home/>} />
            <Route path={Paths.ProfileData} element={<Elements.ProfileData/>} />
            <Route path={Paths.Games} element={<Elements.Games/>} />

            <Route path={Paths.Lessons}>
              <Route index element={<Elements.Lessons/>} />
              <Route path="lesson/:id" element={<Elements.Lesson/>} />
            </Route>
            
            <Route path={Paths.Activities}>
              <Route index element={<Elements.Activities/>} />
              <Route path="activitie/:id" element={<Elements.Activitie/>} />
            </Route>


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