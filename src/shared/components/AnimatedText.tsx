import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  delayPerLetter?: number;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delayPerLetter = 0.2,
  className = '',
}) => {
  return (
    <div className={className} style={{ display: 'inline-block' }}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * delayPerLetter,
            duration: 0.3,
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

export default AnimatedText;