import { Box, Button, FormControl, FormLabel, Heading, Input, VStack } from "@chakra-ui/react"
import bgFpass from '../../assets/correo.jpg'
import { Link } from "react-router-dom"
import { Paths } from "../../router/Routes"
import useApi from "../../shared/hooks/useApi"

const ForgotenPassword = () => {

  const { getEmail } = useApi()

  const RecuperarContraseña = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formulario = e.currentTarget
    const data = new FormData(formulario)
    const { email } = Object.fromEntries(data.entries()) as {
      [k: string]: string
    }
    
    await getEmail(email, formulario)

  }

  return (
    <VStack w='100vw' h='100vh' bgImage={bgFpass} bgPosition='center' bgRepeat='no-repeat' bgSize='cover' >
      <Box position='absolute' left='0'>
        <Link to={Paths.Login}>Volver</Link>
      </Box>

      <Box as="form" onSubmit={RecuperarContraseña} w='300px' height='100%'  display='flex' flexDirection='column' justifyContent='center' alignContent='center' alignItems='center' gap='1em'>
          <Heading color='white' textAlign='center'>Password Recovery ✏️</Heading>
          <FormControl >
              <FormLabel color='white'>Ingresa tu correo electronico:</FormLabel>
              <Input type="email" name="email" color='white' focusBorderColor="#2B8687" borderColor='#2B8687' required/>
          </FormControl>

          <Button type="submit">Enviar</Button>
      </Box>
    </VStack>
  )
}

export default ForgotenPassword