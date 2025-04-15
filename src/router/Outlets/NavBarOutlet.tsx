import { Outlet } from "react-router-dom"
import NavbarLayout from "../../shared/layouts/NavbarLayout"

const NavBarOutlet = () => {
  return (
    <NavbarLayout>
        <Outlet />
    </NavbarLayout>
  )
}

export default NavBarOutlet