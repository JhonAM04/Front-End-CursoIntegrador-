import { Box, Heading, VStack, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import logo from "../../assets/logoCole.jpeg"
import { useContext } from "react"
import { UsuarioContext } from "../contexts/UsuarioContext"
import { Paths } from "../../router/Routes"

const NavBar = () => {
  const usuario = useContext(UsuarioContext)

  return (
    <>
      

        <VStack alignItems='flex-start'  gap='1em' p='1em'  height='95vh' w='200px' bgColor='white'  position='fixed' zIndex='999' borderRadius='20px' >
            
                <Box display='flex' alignItems='center' mb='50px' w='100%'>
                  <Image src={logo} boxSize='95px' />
                  <Heading fontSize='1em'>William Shakespare</Heading>
                </Box>

                <VStack alignItems='flex-start' fontSize='20px' gap='2em'>
                {
                  usuario?.profile?.rol?.rol == 'admin'?
                  <>
                    <Heading fontSize='20px' textAlign='center'>Panel Administrativo</Heading>
                    <Link to={Paths.CrudCuenta} >Crud Cuenta</Link>
                    <Link to={Paths.CrudPerfil} >Crud Perfil</Link>
                  </>
                  :
                  <>
                    <Heading fontSize='20px' textAlign='center'>Menu</Heading>
                    <Link to={Paths.Home} >Home</Link>
                    <Link to='' >Lessons</Link>
                    <Link to='' >Activities</Link>
                    <Link to='' >Games</Link>
                  </>
                }
                </VStack>
        </VStack>

    </>
  )
}

export default NavBar