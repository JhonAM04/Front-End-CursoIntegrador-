import { Box, Heading, HStack, Image, Text, VStack, SimpleGrid, Icon, Tooltip } from "@chakra-ui/react"
import { FaLock } from "react-icons/fa"
import icon1 from '../assets/objeto1_Lessons.png'
import icon2 from '../assets/objeto2_Lessons.png'
import capybara1 from '../assets/capybara1.png'
import capybara2 from '../assets/capi2.png'  
import capybara3 from '../assets/capi3.png' 
import capybara4 from '../assets/capi4.png' 
import capybara5 from '../assets/capi5.png' 

const modules = [
  { name: "Module 1", image: capybara1,color: "green.300", unlocked: true },
  { name: "Module 2", image: capybara2,color: "blue.300", unlocked: false },
  { name: "Module 3", image: capybara3,color: "orange.300", unlocked: false },
  { name: "Module 4", image: capybara4,color: "purple.300", unlocked: false },
  { name: "Module 5", image: capybara5,color: "red.300", unlocked: false }
]

const Lessons = () => {
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

      <SimpleGrid columns={[1, 2, 3]} spacing={8} px={10}>
        {modules.map((mod, idx) => (
          <Tooltip
            key={idx}
            label={!mod.unlocked ? "🔒 Locked until you complete the previous module" : ""}
            hasArrow
            isDisabled={mod.unlocked}
            placement="top"
            bg="gray.700"
            color="white"
          >
            <Box
  bg={mod.color}
  position="relative"
  h="200px"
  borderRadius="15px"
  boxShadow="md"
  cursor={mod.unlocked ? "pointer" : "not-allowed"}
  opacity={mod.unlocked ? 1 : 0.5}
  display="flex"
  alignItems="center"
  justifyContent="center"
  animation={mod.unlocked ? "floatWobble 3s ease-in-out infinite" : "none"}
  _hover={mod.unlocked ? { transform: "scale(1.05)", transition: "0.3s" } : {}}
>
              <Image src={mod.image}  height="100%" objectFit="contain" />
              <Heading
                position="absolute"
                fontSize="xl"
                top="55%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="blackAlpha.900"
                fontWeight="extrabold"
                bg="whiteAlpha.700"
                px="10px"
                borderRadius="10px"
              >
                
              </Heading>

              {!mod.unlocked && (
                <Icon
                  as={FaLock}
                  boxSize={8}
                  color="gray.700"
                  position="absolute"
                  top="10px"
                  right="10px"
                  sx={{ animation: "pulse 1.5s infinite" }}
                />
              )}
            </Box>
          </Tooltip>
        ))}
      </SimpleGrid>
    </>
  )
}

export default Lessons