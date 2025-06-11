import { Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react"
import { modules } from "../../declarations/ApiDeclarations"


const ModuleCard = ({modulo, children }:{modulo: modules, children: React.ReactNode}) => {
  return (
    <HStack h='fit-content'>
        <VStack padding='15px' gap='60px'>
            <Heading>{modulo.modulo}</Heading>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }}  spacing={6} w="100%" justifyContent="center">
                {children}
              </SimpleGrid>
        </VStack>
    </HStack>
  )
}

export default ModuleCard