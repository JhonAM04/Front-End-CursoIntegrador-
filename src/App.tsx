import { ChakraProvider } from "@chakra-ui/react"
import { Toaster } from "sonner"
import AppRoutes from "./router/AppRoutes"
import { UsuarioProvider } from "./shared/contexts/UsuarioContext"

const App = () => {
  return (
    <ChakraProvider>
      <Toaster richColors />
      <UsuarioProvider>
          <AppRoutes />
      </UsuarioProvider>
    </ChakraProvider>
  )
}

export default App