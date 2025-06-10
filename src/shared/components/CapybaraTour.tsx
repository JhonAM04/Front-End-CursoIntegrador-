import { Box, Image, Text, VStack } from "@chakra-ui/react"
import { TooltipRenderProps } from "react-joyride"
import capybara from "../../assets/capyTeacher.gif" // ajusta la ruta si es necesario

const CapybaraTour = ({
  step,
  index,
  primaryProps,
  tooltipProps,
  skipProps,
  isLastStep
}: TooltipRenderProps) => {
  return (
    <Box
      position="relative"
      display="flex"
      alignItems="flex-start"
      gap=".2rem"
      zIndex={10000}
    >
      {/* Tooltip burbuja flotante */}
      <Box
        {...tooltipProps}
        bg="white"
        borderRadius="10px"
        boxShadow="lg"
        p="4"
        maxW="400px"
        minW="260px"
      >
        <VStack align="start" spacing="3">
          <Text fontWeight="bold" fontSize="md">
            {step.title ?? `Paso ${index + 1}`}
          </Text>
          <Text>{step.content}</Text>
          <Box display="flex" gap="0.5rem">
            <button {...skipProps}>❌ Skip</button>
            <button {...primaryProps}>
              {isLastStep ? "🎉 Finish" : "Next ▶️"}
            </button>
          </Box>
        </VStack>
      </Box>

      {/* Capybara a la derecha */}
      <Image
        src={capybara}
        alt="capybara"
        boxSize="250px"
      />
    </Box>
  )
}

export default CapybaraTour
