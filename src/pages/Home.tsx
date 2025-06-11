import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react"
import bgHome from "../assets/vidHome.mp4"
import item1 from "../assets/homeItem1.jpg"
import item2 from "../assets/homeItem2.jpg"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useState } from "react"
import WelcomeVoice from "../shared/components/WelcomeVoice"
import Joyride, { Step } from "react-joyride"
import CapybaraTour from "../shared/components/CapybaraTour"

const Home = () => {
  const [run, setRun] = useState(false)

  const steps: Step[] = [
    {
      target: "#lessons-section",
      content: "Aquí encuentras todas las lecciones para aprender inglés paso a paso 📚",
    },
    {
      target: "#activities-section",
      content: "¡En esta seccion trabajaras las actividades para demostrar tu nivel! ✍️",
    },
    {
      target: "#games-section",
      content: "Aqui encontraras muchos juegos para practicar tu ingles y divertirte al mismo tiempo!!!",
    },
    {
      target: "#profile-section",
      content: "Haz clic en tu nombre para ver o editar tu perfil de usuario 👤",
    },
  ]

  useEffect(() => {
    AOS.init({
      once: true
    })
    // Escucha evento desde el botón
    const listener = () => setRun(true)
    window.addEventListener("start-tutorial", listener)

    return () => window.removeEventListener("start-tutorial", listener)
  }, [])
  
  return (
    <>
        <WelcomeVoice />
        <Joyride
          steps={steps}
          run={run}
          continuous
          scrollToFirstStep
          showSkipButton
          styles={{ options: { zIndex: 10000 } }}
          tooltipComponent={CapybaraTour}
        />
        <VStack  gap='5em' bgColor='#f2f2f2'>

          <Box as="video" autoPlay loop muted height={{md: '90vh'}} borderRadius='20px'  width= '100vw' objectFit='cover' objectPosition='center'>
            <source src={bgHome} />
          </Box>

          <VStack w='100%' h='100%'  gap='200px'>
            
            <HStack display='flex' justifyContent='space-around' gap='2em' alignItems='center' flexWrap='wrap' w='100%'>
              <Box data-aos="fade-right" data-aos-duration="1000" w='700px' textAlign={{base:'center', lg:'left'}}>
                <Heading color='#2B8687'>Objective:</Heading>
                <Text fontSize='25px'>To provide users with a virtual space where they can learn English in a flexible and adaptive way, improving their skills in comprehension, reading, writing and speaking.</Text>
              </Box>
              <Box data-aos="fade-right" data-aos-duration="1000">
                <Image src={item2} maxW={{md: '500px'}} borderRadius='20px' />
              </Box>
            </HStack>

            
              <Box data-aos="zoom-out-down" maxW='1280px' data-aos-duration="2000" textAlign='center'>
                <Text fontSize='4xl' fontWeight='bold' color='#2B8687' textShadow="5px 0px 10px rgba(22, 127, 224, 0.83)">"With each lesson, you get closer to your dreams. Master English and open up a world of opportunities!"</Text>
              </Box>
            

          </VStack>

          <Box data-aos="zoom-in-up" data-aos-duration="1000">
              <Image src={item1} w='100%' borderRadius='20px' />
          </Box>

        </VStack>
    </>
  )
}

export default Home