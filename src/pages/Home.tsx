import { Box, HStack, Text, VStack } from "@chakra-ui/react"
import bgHome from "../assets/vidHome.mp4"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react"

const Home = () => {

  useEffect(() => {
    AOS.init();
  }, []);
  
  return (
    <>

      <main>

        <VStack w='100%' h='100vh' mt='100px'>

          <Box >

          <video autoPlay loop muted style={{height:'90vh', width: '100vw' ,objectFit:'cover', objectPosition:'center'}}>
            <source src={bgHome} />
          </video>

          </Box>

          <VStack w='100%' h='100%' px='5em'>
            
            <HStack display='flex' justifyContent='space-between' w='100%'>
              <Box data-aos="fade-up-right">
                <Text>Hola</Text>
              </Box>

              <Text>Hola</Text>

            </HStack>

          </VStack>

        </VStack>
      
      </main>
    </>
  )
}

export default Home