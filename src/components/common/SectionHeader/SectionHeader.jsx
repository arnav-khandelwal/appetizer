import React from 'react';
import './SectionHeader.scss';

/**
 * SectionHeader Component
 * A reusable section header for organizing UI sections
 * 
 * Props:
 * - title: Header title text
 * - subtitle: Optional subtitle text
 * - action: Optional action element (e.g., button)
 * - className: Additional CSS classes
 */
const SectionHeader = ({ 
  title, 
  subtitle, 
  action, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`section-header ${className}`} {...props}>
      <div className="section-header__content">
        <h3 className="section-header__title">{title}</h3>
        {subtitle && (
          <p className="section-header__subtitle">{subtitle}</p>
        )}
      </div>
      {action && (
        <div className="section-header__action">
          {action}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
