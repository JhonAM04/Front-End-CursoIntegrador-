import { Button, HStack, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react"
import { Paths } from "../../router/Routes"
import { useContext } from "react"
import { UsuarioContext } from "../contexts/UsuarioContext"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const UserNav = () => {

    const usuario = useContext(UsuarioContext)
    const navigate = useNavigate()

    const cerrarSession = () => {
        localStorage.removeItem('session')
        localStorage.removeItem('perfil')
        navigate(Paths.Login)
        toast.success('Cerraste session con exito')
        
      }

  return (
    <HStack justifyContent='right' alignItems='center' w='100%' mb='1em'>
        <Menu>
                <MenuButton as={Button} colorScheme='pink'>
                  {usuario?.profile?.nombre} {usuario?.profile?.apellido}
                </MenuButton>
                <MenuList>
                  <MenuGroup title='Profile'>
                    <MenuItem as={Link} to={Paths.ProfileData}>My Account</MenuItem>
                    <MenuItem>Logros </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem onClick={cerrarSession} >Log out</MenuItem>
                  </MenuGroup>
                </MenuList>
        </Menu>
    </HStack>
  )
}

export default UserNav