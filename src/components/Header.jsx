function Header({ todos }) {
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <header className="header">
      <div className="header-content">
        <h1>My Tasks</h1>
        <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>
      <div className="task-stats">
        <div className="stats-count">{completedCount}/{totalCount}</div>
        <div className="stats-label">Done</div>
      </div>
    </header>
  );
}

export default Header;


