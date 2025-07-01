import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { avanceActividad } from "../../declarations/ApiDeclarations"
import { Link } from "react-router-dom"
import useApi from "../hooks/useApi"


const ActivitiesCard = ({activ, token}:{activ: avanceActividad, token:string}) => {
  const { actividadCompletado } = useApi()
  return (
    <Box maxW='400px' h='300px' border='2px' borderRadius='10px' borderColor='teal' as={Link} to={`activitie/${activ.actividad.idActividad}`} onClick={()=>actividadCompletado(token, activ.actividad.idActividad)}>
        <VStack justifyContent='center' textAlign='center' p='1em' h='100%'>
            {activ.completado? <Text backgroundColor='green.300' p='.2em' w='120px' borderRadius='10px'>Completado</Text>:<Text backgroundColor='gray.400' p='.2em' borderRadius='10px' w='90px'>Progreso</Text>}
            <Image src={activ.actividad.img} boxSize='150px' borderRadius='10px' />
            <HStack>
              <VStack>
                <Text fontWeight='bold' >{activ.actividad.titulo}</Text>
                <Text textAlign='left'>Description: {activ.actividad.descripcion}</Text>
              </VStack>
              <Text bgColor='teal' maxW='60px' p='1em' borderRadius='50%'>▶️</Text>
            </HStack>
        </VStack>
    </Box>
  )
}

export default ActivitiesCard