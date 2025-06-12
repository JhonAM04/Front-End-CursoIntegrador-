
import { Box, HStack, VStack, Image, Text, Heading } from '@chakra-ui/react'
import { games } from '../../declarations/ApiDeclarations'
import { Link } from 'react-router-dom'

const GamesCard = ({juegos}:{juegos:games}) => {
  return (
    <Box w='400px' h='300px' border='2px' borderRadius='10px' borderColor='teal' as={Link} to={`game/${juegos.idGames}`}>
        <VStack justifyContent='center' textAlign='center' p='1em' h='100%'>
            <Heading fontWeight='bold' >{juegos.titulo}</Heading>
            <Image src={juegos.img} boxSize='150px' borderRadius='10px' />
            <HStack>
              <Text textAlign='left'>Description: {juegos.descripcion}</Text>
              <Text bgColor='teal' maxW='60px' p='1em' borderRadius='50%'>▶️</Text>
            </HStack>
        </VStack>
    </Box>
  )
}

export default GamesCard