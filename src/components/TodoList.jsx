import TodoItem from "./TodoItem";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutList, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function TodoList({ todos, toggleTodo, deleteTodo, reorderTodos }) {
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderTodos(result.source.index, result.destination.index);
  };

  return (
    <div className="todo-list-container">
      <div className="controls-bar">
        <div className="filter-tabs">
          {["all", "active", "completed"].map((f) => (
            <div
              key={f}
              className={`filter-tab ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </div>
          ))}
        </div>
      </div>

      <div className="todo-list-wrapper">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <LayoutList size={48} className="empty-state-icon" />
            <p>No tasks found for this filter.</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <ul
                  className="todo-list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <AnimatePresence mode="popLayout">
                    {filteredTodos.map((todo, index) => (
                      <Draggable
                        key={todo.id}
                        draggableId={todo.id}
                        index={index}
                        isDragDisabled={filter !== "all"}
                      >
                        {(provided, snapshot) => (
                          <motion.div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              scale: snapshot.isDragging ? 1.02 : 1,
                              boxShadow: snapshot.isDragging
                                ? "0 20px 25px -5px rgba(0, 0, 0, 0.2)"
                                : "none"
                            }}
                            exit={{ opacity: 0, x: -20 }}
                            layout
                            className="draggable-item"
                          >
                            <div {...provided.dragHandleProps} className="drag-handle">
                              <TodoItem
                                todo={todo}
                                toggleTodo={toggleTodo}
                                deleteTodo={deleteTodo}
                              />
                            </div>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                  </AnimatePresence>
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}

export default TodoList;


