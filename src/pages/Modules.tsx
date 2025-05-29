import { Box, Heading, Text, Image, SimpleGrid, VStack } from "@chakra-ui/react"
import capybara1 from '../assets/capybara1.png'
import capybara2 from '../assets/capi2.png'

import { useEffect, useState } from 'react'
import useApi from "../shared/hooks/useApi" // o la ruta real donde lo tengas


const lecciones = [
  {
    id: 1,
    titulo: "Saludos formales e informales",
    imagen: capybara1
  },
  {
    id: 2,
    titulo: "Presentarse a otros",
    imagen: capybara2
  }
]

const ModuloPage = () => {

    

  return (
    <Box p={8}>
      {/* Animación tipo flotación */}
      <style>
        {`
          @keyframes floatWobble {
            0% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-4px) rotate(-1deg); }
            50% { transform: translateY(0px) rotate(1deg); }
            75% { transform: translateY(4px) rotate(-1deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
        `}
      </style>

      <Heading fontSize="3xl" mb={4} color="red.500">
        Módulo 1: Saludos y presentaciones básicas
      </Heading>

      <Box border="1px solid black" borderRadius="10px" p={4} mb={6} bg="whiteAlpha.800">
        <Text fontSize="lg">
          En este módulo aprenderás a saludar y presentarte en inglés con frases como “Hello!”, “My name is...”, y más.
        </Text>
      </Box>

      <Heading fontSize="2xl" color="red.500" mb={4}>
        LECCIONES
      </Heading>

      <SimpleGrid columns={[1, 2]} spacing={6}>
        {lecciones.map((leccion) => (
          <Box
            key={leccion.id}
            border="2px solid #ddd"
            borderRadius="15px"
            p={6}
            bg="white"
            boxShadow="lg"
            transition="0.3s"
            animation="floatWobble 4s ease-in-out infinite"
            _hover={{ transform: "scale(1.03)" }}
          >
            <VStack spacing={4}>
              <Text fontWeight="bold" fontSize="lg">{leccion.titulo}</Text>
              <Image
                src={leccion.imagen}
                alt={leccion.titulo}
                objectFit="contain"
                height="200px"
                fallbackSrc="https://via.placeholder.com/200"
              />
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ModuloPage
