import { Image, SimpleGrid, VStack } from "@chakra-ui/react"
import LessonsCard from "../shared/components/LessonsCard"
import { useState, useEffect } from "react"
import { lesson, modules, sessionvar } from "../declarations/ApiDeclarations"
import useApi from "../shared/hooks/useApi"
import ModuleLessonCard from "../shared/components/ModuleLessonCard"
import banner from '../assets/bannerLess.jpeg'


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
      <Image src={banner} borderRadius='10px' w='100%' />

      <VStack gap='2em' mt={10}>
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
