import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TodoItemContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.itemBg};
  border-radius: 4px;
`;

const TodoText = styled.span`
  flex-grow: 1;
  margin-left: 0.5rem;
  text-decoration: ${({ completed }) => completed ? 'line-through' : 'none'};
  color: ${({ theme, completed }) => completed ? theme.completedText : theme.text};
`;

const DeleteButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.danger};
  cursor: pointer;
  font-size: 1.2rem;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-left: 0.5rem;
`;

const Tag = styled.span`
  font-size: 0.8rem;
  padding: 0.1rem 0.3rem;
  background-color: ${({ theme }) => theme.tagBg};
  color: ${({ theme }) => theme.tagText};
  border-radius: 4px;
`;

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <TodoItemContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <TodoText completed={todo.completed}>{todo.text}</TodoText>
      <TagContainer>
        {todo.tags && todo.tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagContainer>
      <DeleteButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => deleteTodo(todo.id)}
      >
        🗑️
      </DeleteButton>
    </TodoItemContainer>
  );
};

export default TodoItem;