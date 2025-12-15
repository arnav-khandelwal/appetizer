import React from 'react';
import './Button.scss';

/**
 * Button Component
 * A reusable button component with multiple variants
 * 
 * Props:
 * - children: Button content
 * - variant: 'primary' | 'secondary' | 'ghost'
 * - size: 'sm' | 'md' | 'lg'
 * - onClick: Click handler
 * - className: Additional CSS classes
 * - disabled: Disabled state
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '', 
  disabled = false,
  ...props 
}) => {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
