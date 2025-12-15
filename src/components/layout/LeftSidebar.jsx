import React from 'react';
import SectionHeader from '../common/SectionHeader';
import './LeftSidebar.scss';

/**
 * LeftSidebar Component
 * Component palette for dragging elements onto the canvas
 * Organized by categories: Basic, Layout, Media components
 * 
 * Props:
 * - className: Additional CSS classes
 */
const LeftSidebar = ({ className = '', ...props }) => {
  // Component categories and their items (placeholders)
  const componentCategories = [
    {
      title: 'Basic Components',
      items: ['Button', 'Text', 'Input', 'Checkbox', 'Switch', 'Slider']
    },
    {
      title: 'Layout Components',
      items: ['Container', 'Row', 'Column', 'Card', 'List', 'Grid']
    },
    {
      title: 'Media Components',
      items: ['Image', 'Video', 'Icon', 'Avatar']
    }
  ];

  return (
    <aside className={`left-sidebar ${className}`} {...props}>
      <div className="left-sidebar__header">
        <h2 className="left-sidebar__title">Components</h2>
      </div>

      <div className="left-sidebar__content">
        {componentCategories.map((category, index) => (
          <div key={index} className="left-sidebar__section">
            <SectionHeader title={category.title} />
            
            <div className="left-sidebar__items">
              {category.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex} 
                  className="component-item"
                >
                  <div className="component-item__icon">
                    {item.charAt(0)}
                  </div>
                  <span className="component-item__label">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LeftSidebar;
