import { useEffect, useState } from 'react';
import { Box, Image, Text, VStack } from '@chakra-ui/react';
import capyto from '../../assets/capytoMessages.gif';

const mensajes = [
  'No importa si te equivocas, lo importante es intentarlo otra vez, confio en ti💗',
  '¡Tú puedes con todo! 💪',
  'El conocimiento es poder 🧠',
];

const CapybaraMessages = () => {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice(prev => (prev + 1) % mensajes.length);
    }, 20000); // cada 60000ms = 1 minuto

    return () => clearInterval(intervalo); // limpieza al desmontar
  }, []);

  return (
    <Box w='100%'>
      <VStack alignItems='flex-end'>
        <Text fontSize='lg' fontWeight='semibold' w='280px' transform='translateX(-60%)' bgColor='gray.300' p='.5em' borderRadius='10px'>
          {mensajes[indice]}
        </Text>
        <Image src={capyto} boxSize='200px' />
      </VStack>
    </Box>
  );
};

export default CapybaraMessages;
