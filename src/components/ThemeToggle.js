import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ToggleButton = styled(motion.button)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  z-index: 1000;
`;

function ThemeToggle({ toggleTheme, isDarkMode }) {
  return (
    <ToggleButton
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isDarkMode ? '🌞' : '🌙'}
    </ToggleButton>
  );
}

export default ThemeToggle;