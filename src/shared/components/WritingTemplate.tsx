import { Box, VStack, Text, Input, Button, Wrap, WrapItem, HStack, Heading, Image } from "@chakra-ui/react"
import { useState, useMemo } from "react"
import capytoReading from '../../assets/readcapy.png'
import CapybaraMessages from "./CapybaraMessages"

type ActivityProps = {
  sentenceParts: (string | null)[]
  correctAnswers: string[]
}

const WritingTemplate = ({ sentenceParts, correctAnswers }: ActivityProps) => {
  const [answers, setAnswers] = useState(Array(correctAnswers.length).fill(""))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    const count = answers.reduce((acc, ans, idx) => {
      return acc + (ans.trim().toLowerCase() === correctAnswers[idx].trim().toLowerCase() ? 1 : 0)
    }, 0)
    setCorrectCount(count)
  }

  // ✅ Desordena las palabras solo una vez
  const shuffledAnswers = useMemo(() => {
    return [...correctAnswers].sort(() => Math.random() - 0.5)
  }, [correctAnswers])

  return (
    <Box display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center" 
      py={8} 
      px={4} 
      maxW="1200px" 
      mx="auto">
        <VStack spacing={6} align="start">
          <HStack w='100%' justifyContent='space-around' alignItems='center'>
            <VStack align='flex-start'>
              <Heading size='2xl' maxW='400px'>✍️ Let's Writing with Capyto!</Heading>
              <Text fontSize="2xl" color="gray.600" maxW='450px'>Help Capyto finish his story! Write the correct words in the blanks</Text>
            </VStack>
            <Image src={capytoReading} w='500px' h='300px' />
          </HStack>

          {/* 🧠 Banco de palabras desordenado (pero fijo) */}
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' w='100%'>
            <Text fontWeight="bold" mb={2} fontSize='xl'>Use these words:</Text>
            <Wrap>
              {shuffledAnswers.map((word, idx) => (
                <WrapItem key={idx}>
                    <Text fontSize='lg' border='2px' p='.5em' borderRadius='10px'>{word}</Text>
                </WrapItem>
              ))}
            </Wrap>
          </Box>

          {/* ✍️ Oración con espacios en blanco */}
          <Text fontSize="lg" flexWrap="wrap">
            {sentenceParts.map((part, idx) => {
              if (part !== null) {
                return <span key={idx}>{part}</span>
              } else {
                const inputIndex = sentenceParts.slice(0, idx).filter((p) => p === null).length
                const isCorrect =
                  answers[inputIndex]?.trim().toLowerCase() === correctAnswers[inputIndex]?.trim().toLowerCase()

                return (
                  <Box as="span" key={idx} display="inline-block" minW="100px" mx={1} verticalAlign="middle" >
                    <Input
                      value={answers[inputIndex]}
                      onChange={(e) => handleChange(inputIndex, e.target.value)}
                      size="sm"
                      isDisabled={isSubmitted}
                      borderColor={
                        isSubmitted
                          ? isCorrect
                            ? "green.400"
                            : "red.400"
                          : "teal"
                      }
                      borderRadius='8px'
                    />
                  </Box>
                )
              }
            })}
          </Text>

          {/* 📤 Botón para enviar respuestas */}
          <Button colorScheme="teal" onClick={handleSubmit} isDisabled={isSubmitted}>
            Check Answers
          </Button>

          {/* 📊 Resultado final */}
          {isSubmitted && (
            <Text color={correctCount === correctAnswers.length ? "green.500" : "orange.500"}>
              {correctCount === correctAnswers.length
                ? "Perfect! All answers are correct ✅"
                : `${correctCount} of ${correctAnswers.length} correct. Keep practicing!`}
            </Text>
          )}
        </VStack>
        <CapybaraMessages />
    </Box>
  )
}

export default WritingTemplate
