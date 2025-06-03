import { HStack, VStack, Heading, Box } from "@chakra-ui/react"
import { modules } from "../../declarations/ApiDeclarations"

const ModuleLessonCard = ({modulo, children }:{modulo: modules, children: React.ReactNode}) => {
  return (
    <HStack h='fit-content'>
        <VStack padding='15px' >
            <Heading>{modulo.modulo}</Heading>
            <Box w='80vw' h='100%'>
                {children}
            </Box>
        </VStack>
    </HStack>
  )
}

export default ModuleLessonCard