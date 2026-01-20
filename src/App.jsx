import { useState, useEffect } from "react";
import { Plus, ChevronLeft, Home, ListTodo, User, CheckCircle2, Timer, Hourglass, ChevronRight, CalendarX, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [activeTab, setActiveTab] = useState("todo");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Apply theme to document
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+N or Cmd+N to open new task
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        setIsFormOpen(true);
      }
      // Escape to close modal
      if (e.key === 'Escape' && isFormOpen) {
        setIsFormOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFormOpen]);

  // Generate week days
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const filteredTodos = todos.filter(todo => {
    if (!todo.dueDate) return true;
    return isSameDay(new Date(todo.dueDate), selectedDate);
  });

  return (
    <div className="app-container" role="main" aria-label="Todo application">
      {/* Header */}
      <header className="app-header">
        <button className="back-btn" aria-label="Go back">
          <ChevronLeft size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={isDarkMode ? "Light mode" : "Dark mode"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="add-task-btn"
            onClick={() => setIsFormOpen(true)}
            aria-label="Add new task (Ctrl+N)"
            title="Add new task (Ctrl+N)"
          >
            <Plus size={18} />
            <span>Add Task</span>
          </button>
        </div>
      </header>

      {/* Date Title */}
      <section className="date-section">
        <h1 className="current-date">
          {format(selectedDate, "MMM d, yyyy")}
          <span>Today</span>
        </h1>
      </section>

      {/* Calendar Strip */}
      <nav className="calendar-strip" aria-label="Week calendar navigation">
        {weekDays.map((day) => (
          <button
            key={day.toString()}
            className={`day-item ${isSameDay(day, selectedDate) ? 'active' : ''}`}
            onClick={() => setSelectedDate(day)}
            aria-label={`Select ${format(day, "EEEE, MMMM d")}`}
            aria-current={isSameDay(day, selectedDate) ? 'date' : undefined}
          >
            <span className="day-name">{format(day, "EEE")}</span>
            <div className="day-number">{format(day, "d")}</div>
          </button>
        ))}
      </nav>

      {/* Task List / Timeline */}
      <main className="tasks-area">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={todo.id}
              className={`task-timeline-item ${!todo.completed && index === 0 ? 'active' : ''}`}
            >
              <div className="timeline-dot"></div>
              <div className={`task-card ${!todo.completed && index === 0 ? 'active' : ''}`}>
                <div className="task-header">
                  <span className="task-title">{todo.text}</span>
                  <span className="task-time">{todo.time || "12.00pm"}</span>
                </div>
                <p className="task-description">
                  {todo.description || "No description provided for this task."}
                </p>
                <div className="task-footer">
                  <div className="status-icon">
                    {todo.completed ? (
                      <CheckCircle2 size={24} color="#4CAF50" fill="#4CAF50" strokeWidth={1} style={{ opacity: 1, color: "white" }} />
                    ) : index === 0 ? (
                      <Timer size={24} color="white" />
                    ) : (
                      <Hourglass size={24} color="#5D5FEF" />
                    )}
                  </div>
                  <button
                    className="task-action-btn"
                    onClick={() => toggleTodo(todo.id)}
                  >
                    <span>{todo.completed ? "Check summary" : "Check process"}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: "center",
              padding: "60px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px"
            }}
          >
            <div style={{
              background: "var(--bg-glass)",
              borderRadius: "50%",
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "8px"
            }}>
              <CalendarX size={40} color="var(--text-muted)" strokeWidth={1.5} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "var(--text-main)" }}>
              No tasks scheduled
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", maxWidth: "280px" }}>
              Click "Add Task" or press <kbd style={{
                background: "var(--bg-glass)",
                padding: "2px 8px",
                borderRadius: "6px",
                fontWeight: "600",
                fontSize: "12px"
              }}>Ctrl+N</kbd> to create your first task for {format(selectedDate, "MMMM d")}!
            </p>
          </motion.div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav" aria-label="Main navigation">
        <button
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
          aria-label="Home"
          aria-current={activeTab === 'home' ? 'page' : undefined}
        >
          <Home size={20} />
          {activeTab === 'home' && <span>Home</span>}
        </button>
        <button
          className={`nav-item ${activeTab === 'todo' ? 'active' : ''}`}
          onClick={() => setActiveTab('todo')}
          aria-label="Todo list"
          aria-current={activeTab === 'todo' ? 'page' : undefined}
        >
          <ListTodo size={20} />
          {activeTab === 'todo' && <span>To-do</span>}
        </button>
        <button
          className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
          aria-label="Profile"
          aria-current={activeTab === 'profile' ? 'page' : undefined}
        >
          <User size={20} />
          {activeTab === 'profile' && <span>Profile</span>}
        </button>
      </nav>

      {/* Add Task Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <TodoForm addTodo={(data) => {
                addTodo({ ...data, dueDate: selectedDate.toISOString() });
                setIsFormOpen(false);
              }} onCancel={() => setIsFormOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
