import { Box, Grid, GridItem } from "@chakra-ui/react"
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
      <Grid
      templateColumns={{ base: "1fr", md: "220px 1fr" }}
      templateRows="auto 1fr"
      minH="100vh"
      p="1.5em"
      gap="1em"
    >
      {/* NavBar a la izquierda */}
      <GridItem
        as="aside"
        rowSpan={2}
        colSpan={{ base: 1, md: 1 }}
        display={{ base: "none", md: "block" }} // Ocultar en mobile si deseas
        overflow="hidden"
      >
        <NavBar />
      </GridItem>

      {/* UserNav arriba a la derecha */}
      <GridItem as="header" colSpan={1}>
        <UserNav />
      </GridItem>

      {/* Contenido principal debajo del UserNav */}
      <GridItem as="main" colSpan={1}>
        {children}
      </GridItem>
    </Grid>
    </>
  )
}

export default NavbarLayout