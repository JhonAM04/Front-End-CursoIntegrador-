import { Box, Heading, VStack, Image, Button } from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"
import logo from "../../assets/logo.jpeg"
import { useContext, useEffect, useState } from "react"
import { UsuarioContext } from "../contexts/UsuarioContext"
import { Paths } from "../../router/Routes"
import mascota from "../../assets/capibara.gif"

const NavBar = () => {
  const usuario = useContext(UsuarioContext)


  const location = useLocation()
  const [showTutorialBtn, setShowTutorialBtn] = useState(false)

  useEffect(() => {
    // Mostrar el botón solo si estamos en la ruta "/"
    setShowTutorialBtn(location.pathname === "/home")
  }, [location])



  return (
    <>
      

        <VStack alignItems='flex-start'  gap='1em' p='1em'  height='95vh' w='200px' bgColor='#2b8687' boxShadow='dark-lg' color='white' borderRadius='20px' >
            
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
                    <Link to={Paths.Home} > 🏠 Home</Link>
                    <Link to={Paths.Lessons} id="lessons-section" > 📚 Lessons</Link>
                    <Link to={Paths.Activities} id="activities-section" > ✍️ Activities</Link>
                  </>
                }
                </VStack>

                <Image src={mascota} boxSize='150px' mt='180px' />
                {showTutorialBtn && (
                  <Box w='100%' display='flex' justifyContent='center'>
                    <Button
                      id="start-tutorial-btn"
                      colorScheme="teal"
                      size="sm"
                      onClick={() => {
                        // Guarda en localStorage que ya se usó
                        const event = new CustomEvent("start-tutorial")
                        window.dispatchEvent(event)
                        setShowTutorialBtn(false) // Oculta el botón sin recargar
                      }}
                    >
                      🎉 Start the tutorial
                    </Button>
                  </Box>
                )}
        </VStack>

    </>
  )
}

export default NavBar