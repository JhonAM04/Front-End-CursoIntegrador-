import React, { useState } from "react";
import { Box, Button, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react";
import catImg from "../assets/cat.png";
import dogImg from "../assets/dog.png";
import lionImg from "../assets/lion.png";

const animals = [
    { word: "cat", img: catImg },
    { word: "dog", img: dogImg },
    { word: "lion", img: lionImg },
  ];
  


const AnimalCard = ({ word, img }: { word: string; img: string }) => {
    const [status, setStatus] = useState<"idle" | "listening" | "checked">("idle");
    const [feedback, setFeedback] = useState<null | boolean>(null);
    const [spoken, setSpoken] = useState<string>("");
  
    const startRecognition = () => {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Tu navegador no soporta reconocimiento de voz.");
        return;
      }
  
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
  
      setStatus("listening");
      recognition.start();
  
      recognition.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript.toLowerCase();
        const isCorrect = spokenText.includes(word);
        setSpoken(spokenText);
        setFeedback(isCorrect);
        setStatus("checked");
      };
  
      recognition.onerror = () => {
        setStatus("idle");
        alert("Ocurrió un error al escuchar. Intenta de nuevo.");
      };
  
      recognition.onend = () => {
        if (status !== "checked") setStatus("idle");
      };
    };
  
    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        padding={4}
        boxShadow="md"
        textAlign="center"
        w="260px"
        bg="white"
      >
        <Image src={img} alt={word} boxSize="150px" objectFit="contain" mx="auto" />
        <Heading as="h3" size="md" mt={3} textTransform="capitalize">
          {word}
        </Heading>
        <Button
          colorScheme={
            status === "listening"
              ? "yellow"
              : feedback === true
              ? "green"
              : feedback === false
              ? "red"
              : "teal"
          }
          isLoading={status === "listening"}
          onClick={() => {
            setSpoken("");
            setFeedback(null);
            startRecognition();
          }}
          mt={4}
          w="full"
          loadingText="Escuchando..."
        >
          {status === "idle" && "🎤 Hablar"}
          {status === "checked" && (feedback ? "✅ ¡Bien dicho!" : "❌ Intenta otra vez")}
        </Button>
        {spoken && (
          <Text fontSize="sm" mt={2} color="gray.600">
            Dijiste: <strong>{spoken}</strong>
          </Text>
        )}
      </Box>
    );
  };
  
  const SpeakingAnimals = () => {
    return (
      <Box py={8} px={4} maxW="1000px" mx="auto">
        <VStack spacing={4} mb={8}>
          <Heading as="h2" size="lg" textAlign="center">
            🐾 Actividad de Speaking - Animales
          </Heading>
          <Text fontSize="md" color="gray.600" textAlign="center">
            Presiona el botón de cada animal y dilo en voz alta. Por ejemplo: "cat", "dog", "lion".
          </Text>
        </VStack>
        <Stack direction={['column', 'row']} spacing={6} justify="center" wrap="wrap">
          {animals.map((animal) => (
            <AnimalCard key={animal.word} word={animal.word} img={animal.img} />
          ))}
        </Stack>
      </Box>
    );
  };
  
  export default SpeakingAnimals;