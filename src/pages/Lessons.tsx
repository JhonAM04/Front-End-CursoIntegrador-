import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react"
import icon1 from '../assets/objeto1_Lessons.png'
import icon2 from '../assets/objeto2_Lessons.png'

const Lessons = () => {
  return (
    <>
        <Box bgGradient='linear(to-t, blue.500, teal.500 80%)' h='300px' p='2em' borderRadius='10px'>
            <HStack justifyContent='space-evenly' alignItems='center'>
                <Image src={icon1} boxSize='200px' />
                <VStack w='fit-content' textAlign='center' gap='2em'>
                    <Heading fontSize='25px' maxW='700px'>
                        WELCOME TO THE WILLIAM SHACKESPEARE SCHOOL VIRTUAL ENGLISH CLASSROOM!!!
                    </Heading>
                    <Text maxW='510px' fontSize='18px'>
                        Here you will find interactive resources, personalized excercises, reading materials, and tools to support you in your English learning
                    </Text>
                </VStack>
                <Image src={icon2} boxSize='200px' />
            </HStack>
        </Box>
    </>
  )
}

export default Lessons