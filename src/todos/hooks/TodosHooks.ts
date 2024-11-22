import { useContext } from 'react';
import { TodosContext } from '../context';

export const useTodos = () => useContext(TodosContext);
