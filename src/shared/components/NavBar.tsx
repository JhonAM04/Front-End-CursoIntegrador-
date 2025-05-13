import { Box, Heading, VStack, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.jpeg"
import { useContext } from "react"
import { UsuarioContext } from "../contexts/UsuarioContext"
import { Paths } from "../../router/Routes"

const NavBar = () => {
  const usuario = useContext(UsuarioContext)

  return (
    <>
      

        <VStack alignItems='flex-start'  gap='1em' p='1em'  height='95vh' w='200px' bgColor='#2b8687' boxShadow='dark-lg' color='white'  position='fixed' zIndex='999' borderRadius='20px' >
            
                <Box display='flex' alignItems='center' justifyContent='center' mb='50px' w='100%'>
                  <Image src={logo} boxSize='120px' />
                </Box>

                <VStack alignItems='flex-start' fontSize='20px' gap='2em' w='100%'>
                {
                  usuario?.profile?.rol?.rol == 'admin'?
                  <>
                    <Box w='100%'>
                      <Heading fontSize='20px' textAlign='center'>Panel Administrativo</Heading>
                    </Box>
                    <Link to={Paths.CrudCuenta} >Crud Cuenta</Link>
                    <Link to={Paths.CrudPerfil} >Crud Perfil</Link>
                  </>
                  :
                  <>
                    <Box w='100%'>
                      <Heading fontSize='20px' textAlign='center'>Menu</Heading>
                    </Box>
                    <Link to={Paths.Home} >Home</Link>
                    <Link to={Paths.Lessons} >Lessons</Link>
                    <Link to={Paths.Activities} >Activities</Link>
                  </>
                }
                </VStack>
        </VStack>

    </>
  )
}

export default NavBar