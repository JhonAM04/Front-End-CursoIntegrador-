import { Box, VStack, Text, Radio, RadioGroup, Button } from "@chakra-ui/react"
import { useState } from "react"
import { enunciado } from "../../declarations/ApiDeclarations"

const ReadingTemplate = ({ enun }: { enun: enunciado }) => {
  const [respuestas, setRespuestas] = useState<{ [key: number]: string }>({})
  const [mostrarResultados, setMostrarResultados] = useState(false)
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false)

  const handleChange = (preguntaId: number, valor: string) => {
    setRespuestas((prev) => ({ ...prev, [preguntaId]: valor }))
  }

  const handleSubmit = () => {
    setMostrarResultados(true)
    setBotonDeshabilitado(true)
  }

  return (
    <VStack spacing={6} align="start">
      <Box fontWeight="bold">{enun?.enunciado}</Box>

      {enun?.preguntas.map((q) => {
        const seleccion = respuestas[q.id]
        const opcionCorrecta = q.opciones.find((o) => o.esCorrecta)?.textoOpcion
        const esCorrecta = seleccion === opcionCorrecta

        return (
          <VStack key={q.id} align="start" spacing={3} border="1px solid #ccc" borderRadius="md" p={4} w="100%">
            <Text fontSize="lg">{q.texto}</Text>

            <RadioGroup
              onChange={(val) => handleChange(q.id, val)}
              value={seleccion}
              isDisabled={botonDeshabilitado}
            >
              <VStack align="start">
                {q.opciones.map((opc, index) => (
                  <Radio key={index} value={opc.textoOpcion}>
                    {opc.textoOpcion}
                  </Radio>
                ))}
              </VStack>
            </RadioGroup>

            {mostrarResultados && (
              <Text color={esCorrecta ? "green.500" : "red.500"} fontWeight="bold">
                {esCorrecta ? "✅ Correcto" : `❌ Te confundiste. Respuesta correcta: ${opcionCorrecta}`}
              </Text>
            )}
          </VStack>
        )
      })}

      <Button
        colorScheme="teal"
        onClick={handleSubmit}
        isDisabled={botonDeshabilitado}
        alignSelf="center"
      >
        Enviar respuestas
      </Button>
    </VStack>
  )
}

export default ReadingTemplate
