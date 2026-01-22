import { useEffect, useState, useCallback } from "react";

export const useTodos = () => {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load todos from localStorage:", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (e) {
      console.error("Failed to save todos to localStorage:", e);
      // Could show user notification here in production
    }
  }, [todos]);

  const addTodo = (todoData) => {
    const newTodo = {
      id: Date.now().toString(),
      text: todoData.text,
      description: todoData.description || "",
      time: todoData.time || "12.00pm",
      completed: false,
      priority: todoData.priority || "medium",
      category: todoData.category || "General",
      dueDate: todoData.dueDate || null,
      attachment: todoData.attachment || null,
      notes: [],
      createdAt: new Date().toISOString(),
      completedAt: null,
      order: todos.length,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          const isCompleting = !todo.completed;
          return {
            ...todo,
            completed: isCompleting,
            completedAt: isCompleting ? new Date().toISOString() : null,
          };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, updates) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          // Ensure notes array exists
          const updatedTodo = { ...todo, ...updates };
          if (!updatedTodo.notes) {
            updatedTodo.notes = [];
          }
          return updatedTodo;
        }
        return todo;
      })
    );
  };

  const reorderTodos = (startIndex, endIndex) => {
    setTodos((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  return { todos, addTodo, toggleTodo, deleteTodo, updateTodo, reorderTodos };
};

