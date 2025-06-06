import { Box, Heading, Text } from '@chakra-ui/react'
import { lesson } from '../../declarations/ApiDeclarations'
import {Link} from 'react-router-dom'


const LessonsCard = ({less, color}:{less: lesson, color: string}) => {
  return (
    <>
        <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
            @keyframes floatWobble {
                0% { transform: translateY(0px) rotate(0deg); }
                25% { transform: translateY(-4px) rotate(-1deg); }
                50% { transform: translateY(0px) rotate(1deg); }
                75% { transform: translateY(4px) rotate(-1deg); }
                100% { transform: translateY(0px) rotate(0deg); }
                }
        `}
        </style>

                    <Box
                        h="200px"
                        
                        borderRadius="15px"
                        boxShadow="md"
                        display="flex"
                        flexDirection='column'
                        alignItems="center"
                        justifyContent="center"
                        textAlign='center'
                        gap='1em'
                        padding='10px'
                        animation={"floatWobble 3s ease-in-out infinite"}
                        as={Link}
                        to={`lesson/${less.idLeccion}`}
                        bg={color}
                        mb='20px'
                        >
                                <Text>TYPE: {less.tipo}</Text>
                                <Heading fontSize="xl" color="blackAlpha.900" fontWeight="extrabold" bg="whiteAlpha.700" px="10px" borderRadius="10px">
                                  {less.titulo}  
                                </Heading>
                                <Text>{less.descripcion}</Text>
                    </Box>    
    </>
  )
}

export default LessonsCard