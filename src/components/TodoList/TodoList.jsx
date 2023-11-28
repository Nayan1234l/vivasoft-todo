import { useState, useEffect } from 'react';
import { TodoProvider } from '../../contexts';
import { TodoForm } from './TodoForm';
import { TodoItem } from './TodoItem';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
        <div className='bg-gradient-to-br from-purple-500 to-indigo-500 min-h-screen py-8'>
          <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
            <h2 className='text-3xl font-bold text-center mb-8 mt-2'>
              Lots of work
            </h2>
            <div className='mb-4'>
              <TodoForm />
            </div>
            <div className='flex flex-wrap gap-y-3'>
              {todos.map((todo) => (
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        
        </div>
      </TodoProvider>
    </>
  );
}

export default TodoList;
