import { Box, VStack, HStack, Text, Radio, RadioGroup, Button, Heading, Image } from "@chakra-ui/react"
import { useState } from "react"
import { enunciado } from "../../declarations/ApiDeclarations"
import capytoSucces from '../../assets/capytoSuccessR.gif'
import capytoFailed from '../../assets/capytoFailedR.gif'
import CapybaraMessages from "./CapybaraMessages"

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
    <VStack spacing={6} align="start" w="100%" mx="auto" px={4}>
      <VStack align="flex-start">
        <Heading>📖 Let's Read with Tom!</Heading>
        <Text fontSize="2xl" color="gray.500">Read the story and answer the questions.</Text>
      </VStack>

      <Box fontWeight="bold" bgColor="teal.500" borderRadius="10px" p="2em" color="white">
        {enun?.enunciado}
      </Box>

      {enun?.preguntas.map((q) => {
        const seleccion = respuestas[q.id]
        const opcionCorrecta = q.opciones.find((o) => o.esCorrecta)?.textoOpcion

        return (
          <HStack key={q.id} align="center" spacing={3} border="2px" borderColor="teal" borderRadius="md" p={4} w="100%">
            {mostrarResultados && (
                <Box>
                  {seleccion === opcionCorrecta
                    ? <Image src={capytoSucces} boxSize='150px' />
                    : <Image src={capytoFailed} boxSize='150px' />}
                </Box>
              )}
            <VStack  align="center" spacing={3} w="100%">
              <Text fontSize="lg" fontWeight="bold">{q.texto}</Text>

              <RadioGroup
                onChange={(val) => handleChange(q.id, val)}
                value={seleccion}
                isDisabled={botonDeshabilitado}
              >
                <HStack flexWrap="wrap" justify="center" spacing={4}>
                  {q.opciones.map((opc, index) => {
                    const coloresBase = ['#cca2dc', 'skyblue', 'green.300', 'yellow.300']
                    let bgColor = coloresBase[index % coloresBase.length]

                    // Si se envió, mostrar colores de corrección
                    if (mostrarResultados) {
                      if (opc.esCorrecta) {
                        bgColor = 'green.300'
                      } else if (seleccion === opc.textoOpcion) {
                        bgColor = 'red.300'
                      } else {
                        bgColor = 'gray.200'
                      }
                    }

                    return (
                      <Box key={index} bgColor={bgColor} p="10px" borderRadius="10px" minW="140px" textAlign="center">
                        <Radio value={opc.textoOpcion}>
                          {opc.textoOpcion}
                        </Radio>
                      </Box>
                    )
                  })}
                </HStack>
              </RadioGroup>

              {mostrarResultados && (
                <Text color={seleccion === opcionCorrecta ? "green.500" : "red.500"} fontWeight="bold">
                  {seleccion === opcionCorrecta
                    ? "✅ ¡Respuesta correcta!"
                    : `❌ Te equivocaste. La correcta era: "${opcionCorrecta}"`}
                </Text>
              )}
            </VStack>
          </HStack>
        )
      })}

      <Button colorScheme="teal" onClick={handleSubmit} isDisabled={botonDeshabilitado} alignSelf="center">
        Enviar respuestas
      </Button>
      <CapybaraMessages />
    </VStack>
  )
}

export default ReadingTemplate
