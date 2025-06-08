import { Box, VStack, Text, Input, Button } from "@chakra-ui/react"
import { useState } from "react"

type ActivityProps = {
  sentenceParts: (string | null)[]
  correctAnswers: string[]
};

const WritingTemplate = ({ sentenceParts, correctAnswers }: ActivityProps) => {
  const [answers, setAnswers] = useState(Array(correctAnswers.length).fill(""))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  };

  const handleSubmit = () => {
    setIsSubmitted(true)
    const count = answers.reduce((acc, ans, idx) => {
      return acc + (ans.trim().toLowerCase() === correctAnswers[idx].trim().toLowerCase() ? 1 : 0)
    }, 0);
    setCorrectCount(count)
  };

  return (
    <Box p="4" maxW="700px" mx="auto">
      <VStack spacing="4" align="start">
        <Text fontSize="lg" flexWrap="wrap">
          {sentenceParts.map((part, idx) => {
            if (part !== null) {
              return <span key={idx}>{part}</span>
            } else {
              const inputIndex = sentenceParts.slice(0, idx).filter((p) => p === null).length
              const isCorrect =
                answers[inputIndex]?.trim().toLowerCase() === correctAnswers[inputIndex]?.trim().toLowerCase()

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
                    isSubmitted
                      ? isCorrect
                        ? "green.400"
                        : "red.400"
                      : "gray.300"
                  }
                  isDisabled={isSubmitted}
                />
              );
            }
          })}
        </Text>

        <Button colorScheme="teal" onClick={handleSubmit} isDisabled={isSubmitted}>
          Check Answers
        </Button>

        {isSubmitted && (
          <Text color={correctCount === correctAnswers.length ? "green.500" : "orange.500"}>
            {correctCount === correctAnswers.length
              ? "Perfect! All answers are correct ✅"
              : `${correctCount} of ${correctAnswers.length} correct. Keep practicing!`}
          </Text>
        )}
      </VStack>
    </Box>
  )
}

export default WritingTemplate
