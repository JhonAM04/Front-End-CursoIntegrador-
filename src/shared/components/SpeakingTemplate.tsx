import { Box, Heading, HStack, SimpleGrid, Text, VStack, Image } from "@chakra-ui/react"
import SpeakingCard from "./SpeakingCard"
import { speaking } from "../../declarations/ApiDeclarations"
import capyto from '../../assets/capytoSpeaking.gif'
import dialogoCapyto from '../../assets/dialogoSpeaking.png'
import CapybaraMessages from "./CapybaraMessages"

const SpeakingTemplate = ({ speak }: { speak: Array<speaking> }) => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center" 
      py={8} 
      px={4} 
      maxW="1200px" 
      mx="auto"
    >
      {/* Título + Capyto */}
      <HStack 
        w="100%" 
        justifyContent="space-between" 
        alignItems="flex-start" 
        mb={10}
        flexWrap="wrap"
      >
        <VStack align="flex-start" spacing={4} >
          <Heading size="2xl" maxW="400px">
            🔊 Let's Speak with Capyto!
          </Heading>
          <Text fontSize="3xl" color="gray.600">
            Say the sentence and practice speak
          </Text>
        </VStack>

        <Box position="relative" mt={[4, 0]}>
          <Image 
            src={dialogoCapyto} 
            boxSize="180px" 
            position="absolute" 
            top="-60px" 
            left="-120px" 
            zIndex={1} 
          />
          <Image 
            src={capyto} 
            boxSize="250px" 
            zIndex={0}
          />
        </Box>
      </HStack>

      {/* Tarjetas de práctica */}
      <SimpleGrid 
        columns={{ base: 1, sm: 2, md: 3 }} 
        spacing={6} 
        w="100%" 
        justifyContent="center"
      >
        {speak?.map((s) => (
          <SpeakingCard key={s.idSpeaking} word={s.respuesta} img={s.img} />
        ))}
      </SimpleGrid>
      <CapybaraMessages />
    </Box>
  )
}

export default SpeakingTemplate
