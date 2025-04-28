import { ChakraProvider } from "@chakra-ui/react"
import { Toaster } from "sonner"
import AppRoutes from "./router/AppRoutes"

const App = () => {
  return (
    <ChakraProvider>
      <Toaster richColors />
          <AppRoutes />
    </ChakraProvider>
  )
}

export default App