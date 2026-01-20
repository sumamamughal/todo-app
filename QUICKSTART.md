# ⚡ Quick Start Guide

Get your Glassmorphic Todo App running in 60 seconds!

## 🚀 Installation

```bash
# 1. Navigate to the project
cd todo-list

# 2. Install dependencies (only needed once)
npm install

# 3. Start the development server
npm run dev
```

That's it! Your app is running at **http://localhost:5173** 🎉

---

## 🎯 Quick Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Test production build

# Code Quality
npm run lint         # Check code quality
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + N` (or `Cmd + N`) | Create new task |
| `Esc` | Close modal |
| `Tab` | Navigate elements |
| `Enter` | Submit form |

---

## 📱 Using the App

### 1. **Navigate Weeks**
Click on any day in the calendar to view tasks for that date.

### 2. **Add a Task**
- Click the "Add Task" button
- Or press `Ctrl+N` / `Cmd+N`
- Fill in the task details
- Click "Save Task"

### 3. **View Tasks**
Tasks appear in a beautiful timeline view, ordered by time.

### 4. **Complete Tasks**
Click "Check process" to mark tasks as done.

---

## 🎨 Customization

### Change Colors

Edit `src/index.css`:

```css
:root {
  --primary: #5D5FEF;        /* Main purple color */
  --primary-light: #7E7FF4;  /* Light purple */
  --text-main: #1A1C3D;      /* Dark text */
}
```

### Change App Name

Edit `package.json` and `index.html`:
- Update "name" in `package.json`
- Update `<title>` in `index.html`

---

## 📦 Deployment

### Deploy to Vercel (Easiest)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for other platforms.

---

## 🐛 Troubleshooting

### Port Already in Use?

```bash
# Kill process on port 5173
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

### Build Errors?

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tasks Not Saving?

Check browser localStorage is enabled and not full.

---

## 📚 More Information

- [Full Documentation](README.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Production Summary](PRODUCTION-SUMMARY.md)

---

## 🎉 You're Ready!

Start building your task list and stay organized in style! 

**Need help?** Open an issue or check the documentation.

**Happy organizing! 📋✨**
