import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Paperclip, X } from "lucide-react";

function TodoForm({ addTodo, updateTodo, initialTodo, onCancel }) {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [attachmentName, setAttachmentName] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (initialTodo) {
      setText(initialTodo.text || "");
      setDescription(initialTodo.description || "");
      setTime(initialTodo.time || "");
      setAttachmentName(initialTodo.attachment || "");
    }
  }, [initialTodo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
      setAttachmentName(file.name);
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    setAttachmentName("");
    // Reset the file input
    const fileInput = document.getElementById("task-attachment");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const todoData = {
      text,
      description,
      time: time || "12.00pm",
      priority: "medium",
      attachment: attachment ? attachment.name : attachmentName || null,
    };

    if (initialTodo) {
      // Update existing todo
      updateTodo(initialTodo.id, todoData);
    } else {
      // Add new todo
      addTodo(todoData);
    }

    setText("");
    setDescription("");
    setTime("");
    setAttachment(null);
    setAttachmentName("");
  };

  return (
    <form className="todo-form-new" onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: '700' }}>{initialTodo ? 'Edit Task' : 'Create New Task'}</h2>

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

      <div className="form-group">
        <label htmlFor="task-attachment">Attachment (Optional)</label>
        <div style={{ position: 'relative' }}>
          <input
            id="task-attachment"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
          <label
            htmlFor="task-attachment"
            className="attachment-button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 18px',
              borderRadius: '14px',
              border: '1px solid var(--input-border)',
              cursor: 'pointer',
              background: 'var(--bg-card)',
              color: 'var(--text-muted)',
              fontSize: '14px',
              transition: 'border-color 0.2s'
            }}
          >
            <Paperclip size={18} />
            <span>{attachment ? attachment.name : (attachmentName || "Choose file...")}</span>
          </label>
          {(attachment || attachmentName) && (
            <button
              type="button"
              onClick={removeAttachment}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--error)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>
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
  addTodo: PropTypes.func,
  updateTodo: PropTypes.func,
  initialTodo: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
};

export default TodoForm;
