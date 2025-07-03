import { Box, Button, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { avanceActividad } from "../../declarations/ApiDeclarations"
import { Link } from "react-router-dom"
import useApi from "../hooks/useApi"
import readingbg from '../../assets/readingModal.gif'
import speakingbg from '../../assets/speakingModal.gif'
import writtingbg from '../../assets/writingModal.gif'




const ActivitiesCard = ({activ, token}:{activ: avanceActividad, token:string}) => {
  const { actividadCompletado } = useApi()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box maxW='400px' h='300px' border='2px' borderRadius='10px' borderColor='teal' onClick={onOpen} cursor="pointer">
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
        <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
        <ModalOverlay />
        <ModalContent backgroundImage={
          activ.actividad.tipo == 2 ? readingbg  : activ.actividad.tipo == 3 ? speakingbg: writtingbg
        }
        h='400px'
        bgSize='cover'
        bgPosition='center'>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='green' as={Link} to={`activitie/${activ.actividad.idActividad}`} onClick={()=>actividadCompletado(token, activ.actividad.idActividad)}>Go!</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ActivitiesCard