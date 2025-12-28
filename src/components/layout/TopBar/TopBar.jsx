import React from 'react';
import Button from '../../common/Button/Button';
import './TopBar.scss';

/**
 * TopBar Component
 * Fixed navigation bar at the top of the editor
 * Contains logo, project name, and action buttons
 * 
 * Props:
 * - projectName: Name of current project
 * - onProjectNameChange: Handler for project name edit
 * - className: Additional CSS classes
 */
const TopBar = ({ 
  projectName = 'Untitled Project', 
  onProjectNameChange, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`topbar ${className}`} {...props}>
      {/* Left: Logo/Brand */}
      <div className="topbar__left">
        <a className="topbar__logo" href="/" aria-label="Go to Home">
          <div className="topbar__logo-icon">A</div>
          <span className="topbar__brand">Appetizer</span>
        </a>
      </div>

      {/* Center: Project Name */}
      <div className="topbar__center">
        <input
          type="text"
          className="topbar__project-name"
          value={projectName}
          onChange={(e) => onProjectNameChange?.(e.target.value)}
          placeholder="Project Name"
        />
      </div>

      {/* Right: Actions */}
      <div className="topbar__right">
        <Button variant="ghost" size="sm">
          Preview
        </Button>
        <Button variant="secondary" size="sm">
          Export
        </Button>
        <Button variant="primary" size="sm">
          Account
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
