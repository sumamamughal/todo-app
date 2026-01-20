# 📋 Glassmorphic Todo App

A **premium, production-ready** todo list application featuring a stunning glassmorphic UI design, smooth animations, and intuitive task management. Built with modern web technologies for an exceptional user experience.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB.svg)

## ✨ Features

- 🎨 **Premium Glassmorphic Design** - Modern, translucent UI with backdrop blur effects
- 📅 **Interactive Calendar** - Weekly calendar view with smooth date selection
- ⏱️ **Task Timeline** - Visual timeline showing task progression throughout the day
- 🎭 **Smooth Animations** - Powered by Framer Motion for fluid, premium interactions
- ⌨️ **Keyboard Shortcuts** - Power user features (Ctrl+N for new task, Esc to close)
- ♿ **Accessibility First** - Full ARIA support and keyboard navigation
- 💾 **Local Storage** - Automatic data persistence across sessions
- 📱 **Responsive Design** - Optimized for desktop and mobile devices
- 🎯 **SEO Optimized** - Complete meta tags for social sharing

## 🚀 Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Animations**: Framer Motion 12.25.0
- **Icons**: Lucide React 0.562.0
- **Date Handling**: date-fns 4.1.0
- **Styling**: Vanilla CSS with CSS Variables
- **Typography**: Google Fonts (Outfit)

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/glassmorphic-todo-app.git
   cd glassmorphic-todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   Navigate to http://localhost:5173
   ```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## ⌨️ Keyboard Shortcuts

- `Ctrl + N` (or `Cmd + N` on Mac) - Open new task dialog
- `Esc` - Close modal/dialog
- `Tab` - Navigate through interactive elements
- `Enter` - Submit forms

## 🎨 Design Features

### Glassmorphic UI
- Translucent backgrounds with `backdrop-filter: blur()`
- Layered depth with subtle shadows
- Premium color palette with HSL-based colors
- Smooth gradients and transitions

### Micro-interactions
- Hover effects on interactive elements
- Active state animations
- Smooth page transitions
- Floating timeline dots

### Typography
- Modern font family (Outfit from Google Fonts)
- Carefully crafted font sizes and weights
- Optimal line heights for readability

## 📱 Responsive Design

The app is fully responsive and adapts to different screen sizes:

- **Desktop**: Full-featured experience with hover states
- **Tablet**: Optimized touch targets
- **Mobile**: Full-screen layout with touch-friendly controls

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus visible states
- Screen reader friendly

## 🔧 Configuration

### Customizing Colors

Edit the CSS variables in `src/index.css`:

```css
:root {
  --primary: #5D5FEF;
  --primary-light: #7E7FF4;
  --bg-app: #F5F7FF;
  --text-main: #1A1C3D;
  --text-muted: #8E92B2;
  /* ... more variables */
}
```

### Local Storage

Tasks are automatically saved to `localStorage` under the key `"todos"`. Clear browser storage to reset the app.

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

1. Update `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/your-repo-name/',
     plugins: [react()],
   })
   ```

2. Build and deploy:
   ```bash
   npm run build
   gh-pages -d dist
   ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

**Made with ❤️ for productivity enthusiasts**
