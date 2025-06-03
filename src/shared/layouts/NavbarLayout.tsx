import { Box, Flex, Show } from "@chakra-ui/react"
import { ReactElement } from "react"
import NavBar from "../components/NavBar"
import UserNav from "../components/UserNav"

const NavbarLayout = ({children} : {
    children : ReactElement
}) => {
  return (
    <>
      <Flex w="100%" minH='100vh' p="1.5em" bgColor='#f2f2f2' >

        <Show above="lg">
          <Box position='relative' h='100vh' mr='220px'>
            <Box position='fixed'>
              <NavBar />
            </Box>
          </Box>
        </Show>

        <Box w='100%'>
          <UserNav />
          {children}
        </Box>
      </Flex>
    </>
  )
}

export default NavbarLayout