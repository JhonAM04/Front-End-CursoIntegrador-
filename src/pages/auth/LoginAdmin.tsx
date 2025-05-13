import { HStack, Box, Heading, FormControl, FormLabel, Input, Button, Image } from "@chakra-ui/react"
import { useContext } from "react"
import { UsuarioContext } from "../../shared/contexts/UsuarioContext"
import object1 from "../../assets/objectAdmin.mp4"
import logo from "../../assets/icono.jpg"


const LoginAdmin = () => {
  const usuario = useContext(UsuarioContext)

  const LogearApi = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formulario = e.currentTarget

    if(formulario){
      const data = new FormData(formulario)
      const {login, password} = Object.fromEntries(data.entries()) as {
        [k: string]: string
      }

       await usuario?.Login(login, password)
    }
  }


  return (
    <>
      <HStack w='100vw' h='100vh' justifyContent='space-evenly' bgPosition='center' bgRepeat='no-repeat' bgSize='cover' bgColor='white'>
            <video autoPlay loop muted height='860px' width='860px'>
              <source src={object1} />
            </video>
            <Box as="form" onSubmit={LogearApi} display='flex' flexDirection='column' justifyContent='center' gap='1em' bgColor='whiteAlpha.700' boxShadow='0px 0px 10px 20px rgba(255, 255, 255, 0.26)' w='300px' h='500px' p='1em' borderRadius='10px' mr='100px'>
              <Box display='flex' justifyContent='center'>
                <Image src={logo} boxSize='150px' />
              </Box>
              <Box display='flex' justifyContent='center'>
                <Heading mb='2px'>Login Admin</Heading>
              </Box>
              <FormControl>
                <FormLabel>Usuario: </FormLabel>
                <Input type="email" name="login" focusBorderColor="#2B8687" borderColor='#2B8687' required />
              </FormControl>

              <FormControl>
                <FormLabel>Contraseña</FormLabel>
                <Input type="password" name="password" focusBorderColor="#2B8687" borderColor='#2B8687' required />
              </FormControl>

              <Button style={{ backgroundColor : '#2B8687', color : 'white'}} type="submit">Entrar</Button>

            </Box>

        </HStack>
      
    </>
  )
}

export default LoginAdmin