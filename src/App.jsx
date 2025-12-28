import React from 'react';
import EditorPage from './pages/EditorPage/EditorPage';
import HomePage from './pages/HomePage';
import './styles/global.scss';

/**
 * App Component
 * Root application component
 * Renders the main EditorPage
 */
function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/editor';
  if (path === '/' || path === '/index.html') {
    return <HomePage />;
  }
  return <EditorPage />;
}

export default App;
