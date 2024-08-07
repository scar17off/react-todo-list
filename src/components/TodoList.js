import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';

const TodoListContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TodoForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
`;

const Button = styled(motion.button)`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SearchInput = styled(Input)`
  margin-bottom: 1rem;
`;

function TodoList({ todos, setTodos }) {
  const [newTodo, setNewTodo] = useState('');
  const [newGroup, setNewGroup] = useState('');
  const [newTags, setNewTags] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        group: newGroup || 'Uncategorized',
        tags: newTags.split(',').map(tag => tag.trim()).filter(Boolean),
      };
      setTodos([...todos, todo]);
      setNewTodo('');
      setNewGroup('');
      setNewTags('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const groups = ['All', ...new Set(todos.map(todo => todo.group))];

  const filteredTodos = todos
    .filter(todo => selectedGroup === 'All' || todo.group === selectedGroup)
    .filter(todo =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <TodoListContainer>
      <TodoForm onSubmit={addTodo}>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
        />
        <Input
          type="text"
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          placeholder="Group (optional)"
        />
        <Input
          type="text"
          value={newTags}
          onChange={(e) => setNewTags(e.target.value)}
          placeholder="Tags (comma-separated)"
        />
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
        >
          Add
        </Button>
      </TodoForm>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos or tags..."
      />
      <Select
        value={selectedGroup}
        onChange={(e) => setSelectedGroup(e.target.value)}
      >
        {groups.map(group => (
          <option key={group} value={group}>{group}</option>
        ))}
      </Select>
      <AnimatePresence>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </AnimatePresence>
    </TodoListContainer>
  );
}

export default TodoList;