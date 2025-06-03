import { Box, Text, VStack } from "@chakra-ui/react"
import { activitie } from "../../declarations/ApiDeclarations"
import { Link } from "react-router-dom"


const ActivitiesCard = ({activ}:{activ: activitie}) => {
  return (
    <Box w='400px' h='200px' bgColor='gray.400' borderRadius='10px' as={Link} to={`activitie/${activ.idActividad}`}>
        <VStack justifyContent='center' textAlign='center' p='1em' h='100%'>
            <Text fontWeight='bold'>{activ.titulo}</Text>
            <Text>Description: {activ.descripcion}</Text>
        </VStack>
    </Box>
  )
}

export default ActivitiesCard