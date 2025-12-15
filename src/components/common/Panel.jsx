import React from 'react';
import './Panel.scss';

/**
 * Panel Component
 * A reusable panel/container component with consistent styling
 * 
 * Props:
 * - children: Panel content
 * - className: Additional CSS classes
 * - padding: 'none' | 'sm' | 'md' | 'lg'
 * - noBorder: Remove border
 * - noShadow: Remove shadow
 */
const Panel = ({ 
  children, 
  className = '', 
  padding = 'md',
  noBorder = false,
  noShadow = false,
  ...props 
}) => {
  const panelClasses = [
    'panel',
    `panel--padding-${padding}`,
    noBorder ? 'panel--no-border' : '',
    noShadow ? 'panel--no-shadow' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={panelClasses} {...props}>
      {children}
    </div>
  );
};

export default Panel;
