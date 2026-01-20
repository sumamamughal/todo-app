# Contributing to Glassmorphic Todo App

First off, thank you for considering contributing to Glassmorphic Todo App! It's people like you that make this project such a great tool.

## 🤝 Code of Conduct

This project and everyone participating in it is governed by a Code of Conduct. By participating, you are expected to uphold this code. Please be respectful and constructive in your interactions.

## 🎯 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples** to demonstrate the steps.
* **Describe the behavior you observed** after following the steps.
* **Explain which behavior you expected** to see instead and why.
* **Include screenshots and animated GIFs** if possible.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description** of the suggested enhancement.
* **Provide specific examples** to demonstrate the steps.
* **Describe the current behavior** and **explain which behavior you expected** to see instead.
* **Explain why this enhancement would be useful** to most users.

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the JavaScript/React styleguide
* Include thoughtful commit messages
* Include screenshots and animated GIFs in your pull request whenever possible
* End all files with a newline
* Avoid platform-dependent code

## 🏗️ Development Process

1. **Fork the repo** and create your branch from `main`.
2. **Install dependencies**: `npm install`
3. **Make your changes** in a new git branch
4. **Follow the coding style** of the project
5. **Test your changes** locally
6. **Commit your changes** using a descriptive commit message
7. **Push your branch** to GitHub
8. **Submit a pull request**

### Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/glassmorphic-todo-app.git

# Navigate to the directory
cd glassmorphic-todo-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Branch Naming Convention

* `feature/` - New features
* `fix/` - Bug fixes
* `docs/` - Documentation updates
* `style/` - Code style changes (formatting, etc.)
* `refactor/` - Code refactoring
* `test/` - Adding or updating tests
* `chore/` - Maintenance tasks

Examples:
* `feature/dark-mode`
* `fix/calendar-date-bug`
* `docs/update-readme`

## 💅 Styleguide

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

Examples:
```
feat: Add dark mode toggle
fix: Resolve calendar date selection issue
docs: Update installation instructions
style: Format code with Prettier
refactor: Simplify todo state management
test: Add tests for useTodos hook
chore: Update dependencies
```

### JavaScript/React Styleguide

* Use functional components with hooks
* Use arrow functions for component definitions when appropriate
* Use PropTypes for all props
* Use descriptive variable names
* Add comments for complex logic
* Keep components small and focused
* Use CSS modules or styled-components for styling
* Follow accessibility best practices (ARIA labels, semantic HTML)

Example:
```javascript
import { useState } from 'react';
import PropTypes from 'prop-types';

function MyComponent({ title, onAction }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onAction: PropTypes.func,
};

export default MyComponent;
```

### CSS Styleguide

* Use CSS custom properties (variables) for theming
* Follow BEM naming convention or component-based naming
* Mobile-first responsive design
* Use semantic class names
* Avoid inline styles unless necessary for dynamic values

Example:
```css
/* Good */
.button-primary {
  background: var(--primary);
  color: white;
  padding: 12px 24px;
}

/* Avoid */
.btn-1 {
  background: #5D5FEF;
}
```

## 🧪 Testing

* Write tests for new features
* Update tests when modifying existing features
* Ensure all tests pass before submitting PR
* Aim for good test coverage

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## 📦 Release Process

Maintainers will handle releases. Version numbers follow [Semantic Versioning](https://semver.org/):

* MAJOR version for incompatible API changes
* MINOR version for new functionality in a backwards compatible manner  
* PATCH version for backwards compatible bug fixes

## 📝 Documentation

* Update the README.md if you change functionality
* Comment your code where necessary
* Update the CHANGELOG.md with your changes

## ❓ Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## 🙏 Thank You!

Your contributions to open source, large or small, make projects like this possible. Thank you for taking the time to contribute.
