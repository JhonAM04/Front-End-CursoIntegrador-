import { Button, HStack, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { Paths } from "../../router/Routes"
import { useEffect, useState } from "react"
import { profile } from "../../declarations/ApiDeclarations"
import { toast } from "sonner"
import useApi from "../hooks/useApi"

const NavBar = () => {
  
  const apiAccount = localStorage.getItem('session')
  if (!apiAccount) return

  const session = JSON.parse(apiAccount)

  const [profile, setProfile] = useState<profile>()
  
  

  const { getProfileandAccount  } = useApi()

  const Profile = async() => {
    const perfil = await getProfileandAccount(session.id) 
    setProfile(perfil)
  }


  useEffect(()=>{
    Profile()
  },[])
  
  const navigate = useNavigate()

  const theme = {
    colors : {
      navBar : '#2B8687'
    }
  }

  const cerrarSession = () => {
    localStorage.removeItem('session')
    navigate(Paths.Login)
    toast.success('Cerraste session con exito')
    
  }

  return (
    <>
        <HStack display='flex' alignItems='center' justifyContent='space-between' height='100px' w='100vw' bgColor={theme.colors.navBar} px='5em' position='fixed' top='0' zIndex='999'>
            <HStack>
                <Link to='' >Home</Link>
                <Link to='' >Lessons</Link>
                <Link to='' >Activities</Link>
                <Link to='' >Games</Link>
            </HStack>

            <HStack>
            <Menu>
                <MenuButton as={Button} colorScheme='pink'>
                  {profile?.nombre} {profile?.apellido}
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
        </HStack>
    </>
  )
}

export default NavBar