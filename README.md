# Appetizer - Visual Android App Builder

A modern, minimal web-based editor for building Android apps visually - similar in concept to Canva/Wix but for mobile applications.

## 🎨 Design Philosophy

- **Minimal & Classy**: Light grey base with soft navy/blue accents
- **Clean Layout**: Three-panel editor with component palette, canvas, and properties panel
- **Production-Ready**: Refactor-friendly, well-organized code with strict component separation

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The application will be available at `http://localhost:5173/`

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/           # Main layout components
│   │   ├── TopBar.jsx
│   │   ├── LeftSidebar.jsx
│   │   ├── RightSidebar.jsx
│   │   └── EditorLayout.jsx
│   │
│   ├── canvas/           # Canvas and device frame
│   │   ├── CanvasArea.jsx
│   │   └── DeviceFrame.jsx
│   │
│   └── common/           # Reusable components
│       ├── Button.jsx
│       ├── Panel.jsx
│       └── SectionHeader.jsx
│
├── pages/
│   └── EditorPage.jsx    # Main editor page
│
├── styles/
│   ├── variables.scss    # Design tokens & variables
│   └── global.scss       # Global styles
│
├── App.jsx               # Root component
└── main.jsx              # Entry point
```

## 🎯 Features

### Current (UI Layout)

- ✅ Three-panel editor layout
- ✅ Top navigation bar with logo, project name editor, and action buttons
- ✅ Left sidebar with component palette (Basic, Layout, Media components)
- ✅ Center canvas with Android device frame
- ✅ Right sidebar with properties panel (Style, Layout, Actions tabs)
- ✅ Clean, reusable component architecture
- ✅ Modern SCSS styling with design system

### Coming Soon

- Drag-and-drop functionality
- Component state management
- Real-time preview
- Export to Android project
- And more...

## 🛠️ Tech Stack

- **React** - UI library
- **JavaScript** - Programming language (functional components)
- **SCSS** - Styling
- **Vite** - Build tool and dev server

## 🎨 Design System

### Colors

- Base Background: `#f5f6f8`
- Accent Primary: `#4a5f7f` (soft navy)
- Accent Light: `#6b7f9f`
- White: `#ffffff`
- Border: `#e1e4e8`

### Typography

- System font stack
- Font sizes: 12px - 20px
- Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing

- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px

## 📝 Component Guidelines

Each component is designed to be:

- **Independent**: Self-contained with its own styles
- **Reusable**: Generic props for flexibility
- **Future-proof**: Props defined even if not yet used
- **Well-documented**: Comments explaining purpose and usage

## 🤝 Contributing

This is currently a UI layout only. Future contributions will include:

- Drag-and-drop implementation
- State management
- Component builder logic
- Export functionality

## 📄 License

MIT License - feel free to use this project as a starting point for your own visual app builder!

---

Built with ❤️ for modern app development
