import { Box } from "@chakra-ui/react"
import { ReactElement } from "react"
import NavBar from "../components/NavBar"

const NavbarLayout = ({children} : {
    children : ReactElement
}) => {
  return (
    <>
      <Box h='100vh'>
        <NavBar />
        {children}
      </Box>
    </>
  )
}

export default NavbarLayout