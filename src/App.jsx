import { useState, useEffect } from "react";
import { Plus, ChevronLeft, Home, ListTodo, User, CheckCircle2, Timer, Hourglass, ChevronRight, CalendarX, Moon, Sun, Edit2, Trash2, Paperclip, TrendingUp, Target, Award, Settings, Bell, Shield, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [activeTab, setActiveTab] = useState("todo");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingTodo, setEditingTodo] = useState(null);
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

  // Calculate stats for Home page
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
  const todayTodos = todos.filter(todo => {
    if (!todo.dueDate) return false;
    return isSameDay(new Date(todo.dueDate), new Date());
  }).length;

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

      {/* Date Title - Only show for Todo tab */}
      <AnimatePresence>
        {activeTab === 'todo' && (
          <motion.div
            key="date-section"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.4
            }}
          >
            <section className="date-section">
              <h1 className="current-date">
                {format(selectedDate, "MMM d, yyyy")}
                <span>Today</span>
              </h1>
            </section>

            {/* Calendar Strip */}
            <nav className="calendar-strip" aria-label="Week calendar navigation">
              {weekDays.map((day, index) => (
                <motion.button
                  key={day.toString()}
                  className={`day-item ${isSameDay(day, selectedDate) ? 'active' : ''}`}
                  onClick={() => setSelectedDate(day)}
                  aria-label={`Select ${format(day, "EEEE, MMMM d")}`}
                  aria-current={isSameDay(day, selectedDate) ? 'date' : undefined}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.1 + (index * 0.03),
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="day-name">{format(day, "EEE")}</span>
                  <div className="day-number">{format(day, "d")}</div>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className={`tasks-area ${activeTab === 'todo' ? 'tasks-area-todo' : ''}`}>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.95 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4
              }}
              style={{ padding: '20px 0' }}
            >
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: 'var(--text-main)' }}>
                Dashboard
              </h2>

              {/* Stats Cards */}
              <motion.div 
                style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <motion.div 
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: 'var(--shadow-card)',
                    border: '1px solid var(--glass-border)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>Total Tasks</span>
                    <ListTodo size={20} color="var(--primary)" />
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--text-main)' }}>{totalTodos}</div>
                </motion.div>

                <motion.div 
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <motion.div 
                    style={{
                      background: 'var(--bg-card)',
                      borderRadius: '16px',
                      padding: '16px',
                      boxShadow: 'var(--shadow-card)',
                      border: '1px solid var(--glass-border)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <CheckCircle2 size={18} color="#4CAF50" />
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Completed</span>
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#4CAF50' }}>{completedTodos}</div>
                  </motion.div>

                  <motion.div 
                    style={{
                      background: 'var(--bg-card)',
                      borderRadius: '16px',
                      padding: '16px',
                      boxShadow: 'var(--shadow-card)',
                      border: '1px solid var(--glass-border)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Timer size={18} color="#FF9800" />
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Pending</span>
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#FF9800' }}>{pendingTodos}</div>
                  </motion.div>
                </motion.div>

                <motion.div 
                  style={{
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 8px 24px rgba(93, 95, 239, 0.25)',
                    color: 'white'
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35, type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '14px', opacity: 0.9, fontWeight: '500' }}>Completion Rate</span>
                    <TrendingUp size={20} />
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>{completionRate}%</div>
                  <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>
                    {completedTodos} of {totalTodos} tasks done
                  </div>
                </motion.div>

                <motion.div 
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: 'var(--shadow-card)',
                    border: '1px solid var(--glass-border)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <CalendarX size={18} color="var(--primary)" />
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Today's Tasks</span>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)' }}>{todayTodos}</div>
                </motion.div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.3 }}
              >
                <motion.h3 
                  style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-main)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                >
                  Recent Tasks
                </motion.h3>
                {todos.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {todos.slice(0, 5).map((todo, index) => (
                      <motion.div
                        key={todo.id}
                        style={{
                          background: 'var(--bg-card)',
                          borderRadius: '12px',
                          padding: '14px',
                          boxShadow: 'var(--shadow-card)',
                          border: '1px solid var(--glass-border)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 0.55 + (index * 0.05), 
                          type: "spring", 
                          stiffness: 200, 
                          damping: 20 
                        }}
                      >
                        {todo.completed ? (
                          <CheckCircle2 size={20} color="#4CAF50" fill="#4CAF50" />
                        ) : (
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: '2px solid var(--text-muted)'
                          }} />
                        )}
                        <span style={{
                          flex: 1,
                          fontSize: '14px',
                          color: todo.completed ? 'var(--text-muted)' : 'var(--text-main)',
                          textDecoration: todo.completed ? 'line-through' : 'none'
                        }}>
                          {todo.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    style={{
                      textAlign: 'center',
                      padding: '40px 20px',
                      color: 'var(--text-muted)',
                      fontSize: '14px'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    No tasks yet. Create your first task!
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'todo' && (
            <motion.div
              key="todo"
              initial={{ opacity: 0, x: 0, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 0, scale: 0.98 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4
              }}
            >
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

                {/* Attachment Display */}
                {todo.attachment && (
                  <div
                    className="task-attachment"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 14px',
                      background: todo.completed || index === 0 ? 'rgba(255, 255, 255, 0.15)' : 'var(--bg-glass)',
                      borderRadius: '12px',
                      fontSize: '13px',
                      marginTop: '8px',
                      color: todo.completed || index === 0 ? 'rgba(255, 255, 255, 0.9)' : 'var(--primary)',
                      border: todo.completed || index === 0 ? 'none' : '1px solid var(--primary)'
                    }}
                  >
                    <Paperclip size={16} />
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {todo.attachment}
                    </span>
                  </div>
                )}

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

                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <button
                      className="task-icon-btn"
                      onClick={() => {
                        setEditingTodo(todo);
                        setIsFormOpen(true);
                      }}
                      title="Edit task"
                      aria-label="Edit task"
                    >
                            <Edit2 size={14} />
                    </button>
                    <button
                      className="task-icon-btn"
                            onClick={() => deleteTodo(todo.id)}
                      title="Delete task"
                      aria-label="Delete task"
                    >
                            <Trash2 size={14} />
                    </button>
                    <button
                      className="task-action-btn"
                      onClick={() => toggleTodo(todo.id)}
                    >
                      <span>{todo.completed ? "Check summary" : "Check process"}</span>
                            <ChevronRight size={12} />
                    </button>
                  </div>
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
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4
              }}
              style={{ padding: '20px 0' }}
            >
              <motion.h2 
                style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: 'var(--text-main)' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
              >
                Profile & Settings
              </motion.h2>

              {/* Profile Section */}
              <motion.div 
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid var(--glass-border)',
                  marginBottom: '24px',
                  textAlign: 'center'
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'white',
                  fontSize: '32px',
                  fontWeight: '700'
                }}>
                  {totalTodos > 0 ? String(totalTodos).charAt(0) : 'U'}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-main)' }}>
                  User Profile
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                  {totalTodos} total tasks • {completedTodos} completed
                </p>
              </motion.div>

              {/* Settings Options */}
              <motion.div 
                style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <motion.button
                  onClick={toggleTheme}
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: 'var(--shadow-card)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left'
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 20 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isDarkMode ? <Sun size={20} color="var(--primary)" /> : <Moon size={20} color="var(--primary)" />}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '4px' }}>
                      Theme
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                    </div>
                  </div>
                  <ChevronRight size={18} color="var(--text-muted)" />
                </motion.button>

                <motion.div 
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: 'var(--shadow-card)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                >
                  <Bell size={20} color="var(--primary)" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '4px' }}>
                      Notifications
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Manage your notification preferences
                    </div>
                  </div>
                  <ChevronRight size={18} color="var(--text-muted)" />
                </motion.div>

                <motion.div 
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: 'var(--shadow-card)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, type: "spring", stiffness: 200, damping: 20 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                >
                  <Shield size={20} color="var(--primary)" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '4px' }}>
                      Privacy & Security
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Your data is stored locally
                    </div>
                  </div>
                  <ChevronRight size={18} color="var(--text-muted)" />
                </motion.div>

                <motion.div 
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: 'var(--shadow-card)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                >
                  <HelpCircle size={20} color="var(--primary)" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '4px' }}>
                      Help & Support
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Get help and learn more
                    </div>
                  </div>
                  <ChevronRight size={18} color="var(--text-muted)" />
                </motion.div>

                <motion.div 
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: 'var(--shadow-card)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45, type: "spring", stiffness: 200, damping: 20 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                >
                  <Settings size={20} color="var(--primary)" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '4px' }}>
                      App Settings
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Customize your experience
                    </div>
                  </div>
                  <ChevronRight size={18} color="var(--text-muted)" />
                </motion.div>
              </motion.div>

              {/* App Info */}
              <motion.div 
                style={{
                  marginTop: '32px',
                  padding: '16px',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '12px'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <p>Todo App v1.0.0</p>
                <p style={{ marginTop: '4px' }}>Built with React & Vite</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
            onClick={() => {
              setIsFormOpen(false);
              setEditingTodo(null);
            }}
          >
            <motion.div
              className="modal-content"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <TodoForm
                initialTodo={editingTodo}
                addTodo={(data) => {
                  addTodo({ ...data, dueDate: selectedDate.toISOString() });
                  setIsFormOpen(false);
                  setEditingTodo(null);
                }}
                updateTodo={(id, data) => {
                  updateTodo(id, data);
                  setIsFormOpen(false);
                  setEditingTodo(null);
                }}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingTodo(null);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
    </div>
  );
}

export default App;
