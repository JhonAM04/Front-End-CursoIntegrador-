import { Box, Heading, HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import icon1 from '../assets/objeto1_Lessons.png'
import icon2 from '../assets/objeto2_Lessons.png'
import LessonsCard from "../shared/components/LessonsCard"
import { useState, useEffect } from "react"
import { lesson, modules, sessionvar } from "../declarations/ApiDeclarations"
import useApi from "../shared/hooks/useApi"
import ModuleLessonCard from "../shared/components/ModuleLessonCard"

const Lessons = () => {
  const { getModules, getLessons } = useApi()
  const [modulos, setModulos] = useState<Array<modules>>()
  const [lecciones, setLecciones] = useState<Array<lesson>>()

  const session: sessionvar = JSON.parse(localStorage.getItem('session')!)

  const getInfo = async () => {
    const response = await getModules(session.token)
    setModulos(response)
    const response2 = await getLessons(session.token)
    setLecciones(response2)
  }

  useEffect(() => {
    getInfo()
  }, [])

  // Paleta de colores por módulo
  const colorPalette = ['teal.100', 'cyan.100', 'orange.100', 'pink.100', 'purple.100', 'yellow.100']
  const moduleColors: { [key: number]: string } = {}

  modulos?.forEach((mod, index) => {
    moduleColors[mod.idModulo] = colorPalette[index % colorPalette.length]
  })

  return (
    <>
      <Box bgGradient='linear(to-t, blue.500, teal.500 80%)' h='300px' p='2em' borderRadius='10px' mb={10}>
        <HStack justifyContent='space-evenly' alignItems='center'>
          <Image src={icon1} boxSize='200px' />
          <VStack w='fit-content' textAlign='center' gap='2em'>
            <Heading fontSize='25px' maxW='700px'>
              WELCOME TO THE WILLIAM SHACKESPEARE SCHOOL VIRTUAL ENGLISH CLASSROOM!!!
            </Heading>
            <Text maxW='510px' fontSize='18px'>
              Here you will find interactive resources, personalized exercises, reading materials, and tools to support you in your English learning
            </Text>
          </VStack>
          <Image src={icon2} boxSize='200px' />
        </HStack>
      </Box>

      <VStack gap='2em'>
        {
          modulos?.map(mod => (
            <ModuleLessonCard key={mod.idModulo} modulo={mod} >
              {lecciones?.filter(lecc => lecc.modulo.idModulo === mod.idModulo).map(leccion => (
                <SimpleGrid key={leccion.idLeccion} minChildWidth="sm" rowGap='100px'>
                  <LessonsCard
                    key={leccion.idLeccion}
                    less={leccion}
                    color={moduleColors[mod.idModulo]} // Color por módulo
                  />
                </SimpleGrid>
              ))}
            </ModuleLessonCard>
          ))
        }
      </VStack>
    </>
  )
}

export default Lessons
