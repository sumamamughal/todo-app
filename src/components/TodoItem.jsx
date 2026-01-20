import { Trash2, CheckCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className={`todo-item-card ${todo.completed ? "completed" : ""}`}>
      <div
        className={`checkbox-custom ${todo.completed ? "checked" : ""}`}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.completed && <CheckCircle size={12} color="white" />}
      </div>

      <div className="todo-content" onClick={() => toggleTodo(todo.id)}>
        <p className="todo-text">{todo.text}</p>
        <div className="todo-meta">
          <span className="priority-badge">{todo.priority}</span>
          <span className="category-tag">{todo.category}</span>
          <span className="time-ago">
            {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="action-btn"
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
          }}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;


