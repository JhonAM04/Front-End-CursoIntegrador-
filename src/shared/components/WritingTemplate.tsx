import { Box, VStack, Text, Input, Button } from "@chakra-ui/react"
import { useState } from "react"

type ActivityProps = {
  sentenceParts: (string | null)[] // Usamos null para representar un espacio en blanco
  correctAnswers: string[]
}

const WritingTemplate = ({ sentenceParts, correctAnswers }: ActivityProps) => {
  const [answers, setAnswers] = useState(Array(correctAnswers.length).fill(''))
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
  }
  return (
    <Box p="4" maxW="700px" mx="auto">
      <VStack spacing="4" align="start">
        <Text fontSize="lg">
          {sentenceParts.map((part, idx) => {
            if (part !== null) {
                return <span key={idx}>{part}</span>;
            } else {
                const inputIndex = sentenceParts.slice(0, idx).filter(p => p === null).length;
                return (
                <Input
                    key={idx}
                    display="inline"
                    width="100px"
                    size="sm"
                    mx="1"
                    value={answers[inputIndex]}
                    onChange={(e) => handleChange(inputIndex, e.target.value)}
                    borderColor={
                    isSubmitted && answers[inputIndex] !== correctAnswers[inputIndex]
                        ? 'red.400'
                        : 'gray.300'
                    }
                />
                )
            }
            })}
        </Text>

        <Button colorScheme="teal" onClick={handleSubmit}>
          Check Answers
        </Button>

        {isSubmitted && (
          <Text color="green.500">
            {JSON.stringify(answers) === JSON.stringify(correctAnswers)
              ? 'Perfect!'
              : 'Some answers are incorrect, try again!'}
          </Text>
        )}
      </VStack>
    </Box>
  )
}

export default WritingTemplate