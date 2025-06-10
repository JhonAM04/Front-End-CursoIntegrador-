import { Box, Heading, Button, Image, Text } from "@chakra-ui/react";
import { useState } from "react";

const SpeakingCard = ({ word, img }: { word: string; img: string }) => {
  const [status, setStatus] = useState<"idle" | "listening" | "checked">("idle");
  const [feedback, setFeedback] = useState<null | boolean>(null);
  const [spoken, setSpoken] = useState<string>("");

  const normalize = (text: string) =>
    text.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim();

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
      const spokenText = event.results[0][0].transcript;
      const isCorrect = normalize(spokenText) === normalize(word);
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
      borderWidth="3px"
      borderRadius="lg"
      borderColor='teal'
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
        isDisabled={feedback === true} // 🚨 Aquí se desactiva cuando acierta
      >
        {status === "idle" && "🎤 Speak"}
        {status === "checked" && (feedback ? "✅ ¡Well Said!" : "❌ Try Again")}
      </Button>
      {spoken && (
        <Text fontSize="sm" mt={2} color="gray.600">
          You say: <strong>{spoken}</strong>
        </Text>
      )}
    </Box>
  );
};

export default SpeakingCard;
