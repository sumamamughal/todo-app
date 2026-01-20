import { useState } from "react";
import PropTypes from "prop-types";

function TodoForm({ addTodo, onCancel }) {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addTodo({
      text,
      description,
      time: time || "12.00pm",
      priority: "medium",
    });

    setText("");
    setDescription("");
    setTime("");
  };

  return (
    <form className="todo-form-new" onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: '700' }}>Create New Task</h2>

      <div className="form-group">
        <label htmlFor="task-title">Task Title</label>
        <input
          id="task-title"
          type="text"
          className="form-input"
          placeholder="e.g. Wireframing"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-description">Description (Optional)</label>
        <textarea
          id="task-description"
          className="form-input"
          placeholder="What needs to be done?"
          style={{ minHeight: '100px', resize: 'none' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-time">Time</label>
        <input
          id="task-time"
          type="text"
          className="form-input"
          placeholder="e.g. 12.00pm"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          type="button"
          className="submit-btn"
          style={{ background: 'var(--btn-cancel-bg)', color: 'var(--btn-cancel-text)', boxShadow: 'none' }}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          Save Task
        </button>
      </div>
    </form>
  );
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default TodoForm;
