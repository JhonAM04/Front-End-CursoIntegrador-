import { Box, Heading, HStack, VStack } from "@chakra-ui/react"
import { modules } from "../../declarations/ApiDeclarations"


const ModuleCard = ({modulo, children }:{modulo: modules, children: React.ReactNode}) => {
  return (
    <HStack h='fit-content'>
        <VStack padding='15px' gap='60px'>
            <Heading>{modulo.modulo}</Heading>
            <Box display='flex' justifyContent='space-between' w='70%' flexWrap='wrap' gap='1em'>
                {children}
            </Box>
        </VStack>
    </HStack>
  )
}

export default ModuleCard