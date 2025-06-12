import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { activitie } from "../../declarations/ApiDeclarations"
import { Link } from "react-router-dom"


const ActivitiesCard = ({activ}:{activ: activitie}) => {
  return (
    <Box w='400px' h='300px' border='2px' borderRadius='10px' borderColor='teal' as={Link} to={`activitie/${activ.idActividad}`}>
        <VStack justifyContent='center' textAlign='center' p='1em' h='100%'>
            <Image src={activ.img} boxSize='150px' borderRadius='10px' />
            <HStack>
              <VStack>
                <Text fontWeight='bold' >{activ.titulo}</Text>
                <Text textAlign='left'>Description: {activ.descripcion}</Text>
              </VStack>
              <Text bgColor='teal' maxW='60px' p='1em' borderRadius='50%'>▶️</Text>
            </HStack>
        </VStack>
    </Box>
  )
}

export default ActivitiesCard