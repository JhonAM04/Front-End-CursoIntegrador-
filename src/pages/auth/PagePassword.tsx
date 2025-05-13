import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import useApi from "../../shared/hooks/useApi"
import { VStack, Box, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react"
import bgFpass from '../../assets/correo.jpg'


const PagePassword =()=>{

    const location = useLocation();

    // Crear un objeto URLSearchParams a partir de la query string
    const queryParams = new URLSearchParams(location.search);

    // Obtener el token
    const token = queryParams.get('token'); 

    const {updatePassword} = useApi()

    const funcion = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formulario= e.currentTarget

        if(formulario){
            const data = new FormData(formulario)
            const {newpassword} = Object.fromEntries(data.entries()) as {
              [k: string]: string
            }
      
             await updatePassword(token!,newpassword)
          }

    }

    useEffect(()=>{
        console.log(token)
    },[])


    return(
        

        <VStack w='100vw' h='100vh' bgImage={bgFpass} bgPosition='center' bgRepeat='no-repeat' bgSize='cover' >

      <Box as="form" onSubmit={funcion} w='300px' height='100%'  display='flex' flexDirection='column' justifyContent='center' alignContent='center' alignItems='center' gap='1em'>
          <Heading color='white' textAlign='center'>Password Recovery ✏️</Heading>
          <FormControl >
              <FormLabel color='white'>Ingresa tu nueva Contraseña:</FormLabel>
              <Input type="text" name="newpassword" color='white' focusBorderColor="#2B8687" borderColor='#2B8687' required/>
          </FormControl>

          <Button type="submit">Enviar</Button>
      </Box>
    </VStack>
        
        
        
        
    )
}
export default PagePassword