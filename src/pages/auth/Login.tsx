import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Link, Text } from "@chakra-ui/react"
import { Link as ReactLink } from "react-router-dom"
import bgLogin from "../../assets/login.jpg"
import React from "react"
import { Paths } from "../../router/Routes"
import useApi from "../../shared/hooks/useApi"

const Login = () => {

  const { apiLogin } = useApi()

  const LogearApi = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formulario = e.currentTarget

    if(formulario){
      const data = new FormData(formulario)
      const {login, password} = Object.fromEntries(data.entries()) as {
        [k: string]: string
      }

       await apiLogin(login, password)
    }
  }


  return (
    <>
      <HStack w='100vw' h='100vh' justifyContent='center' bgImage={bgLogin} bgPosition='center' bgRepeat='no-repeat' bgSize='cover' bgColor='#2B8687'>

            <Box as="form" onSubmit={LogearApi} display='flex' flexDirection='column' justifyContent='center' gap='1em' bgColor='whiteAlpha.700' boxShadow='0px 0px 10px 20px rgba(255, 255, 255, 0.26)' w='300px' h='400px' p='1em' borderRadius='10px'>
              <Heading mb='2px'>Login</Heading>
              <FormControl>
                <FormLabel>Usuario: </FormLabel>
                <Input type="email" name="login" focusBorderColor="#2B8687" borderColor='#2B8687' required />
              </FormControl>

              <FormControl>
                <FormLabel>Contraseña</FormLabel>
                <Input type="password" name="password" focusBorderColor="#2B8687" borderColor='#2B8687' required />
              </FormControl>

              <Text>Olvidaste tu contraseña? <Link as={ReactLink} to={Paths.ForgotenPassword} color='blue'>Ingresa Aqui</Link> </Text>
              <Button style={{ backgroundColor : '#2B8687', color : 'white'}} type="submit">Entrar</Button>

            </Box>

        </HStack>
      
    </>
  )
}

export default Login