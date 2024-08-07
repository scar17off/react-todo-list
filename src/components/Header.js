import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.headerBg};
  color: ${({ theme }) => theme.text};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`;

function Header({ toggleTheme, isDarkMode }) {
  return (
    <HeaderContainer
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Todo List</Title>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkMode ? '🌞' : '🌙'}
      </ThemeToggle>
    </HeaderContainer>
  );
}

export default Header;