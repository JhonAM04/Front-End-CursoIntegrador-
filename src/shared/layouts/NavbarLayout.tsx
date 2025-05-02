import { Box } from "@chakra-ui/react"
import { ReactElement } from "react"
import NavBar from "../components/NavBar"
import UserNav from "../components/UserNav"

const NavbarLayout = ({children} : {
    children : ReactElement
}) => {
  return (
    <>
      {/* Fondo que se mantiene al hacer scroll */}
      <Box
        position="fixed"
        w="100vw"
        h="100vh"
        bgColor='#f2f2f2'
        zIndex={-1}
      />

      {/* Contenido con margen interno */}
      <Box w="100%" minH='100vh' p="1.5em" >
        <NavBar />
        <Box pl="220px">
          <UserNav />
          {children}
        </Box>
      </Box>
    </>
  )
}

export default NavbarLayout