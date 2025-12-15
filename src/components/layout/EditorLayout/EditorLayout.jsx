import React from 'react';
import TopBar from '../TopBar/TopBar';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import RightSidebar from '../RightSidebar/RightSidebar';
import './EditorLayout.scss';

/**
 * EditorLayout Component
 * Main layout container for the editor
 * Orchestrates TopBar, LeftSidebar, RightSidebar, and Canvas area
 * 
 * Props:
 * - children: Main canvas content
 * - projectName: Current project name
 * - onProjectNameChange: Handler for project name changes
 * - className: Additional CSS classes
 */
const EditorLayout = ({ 
  children, 
  projectName,
  onProjectNameChange,
  className = '',
  ...props 
}) => {
  return (
    <div className={`editor-layout ${className}`} {...props}>
      {/* Top Navigation Bar */}
      <TopBar 
        projectName={projectName}
        onProjectNameChange={onProjectNameChange}
      />

      {/* Main Editor Area */}
      <div className="editor-layout__main">
        {/* Left Sidebar - Component Palette */}
        <LeftSidebar />

        {/* Center Canvas Area */}
        <main className="editor-layout__canvas">
          {children}
        </main>

        {/* Right Sidebar - Properties Panel */}
        <RightSidebar />
      </div>
    </div>
  );
};

export default EditorLayout;
