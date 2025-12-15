import React from 'react';
import DeviceFrame from './DeviceFrame';
import './CanvasArea.scss';

/**
 * CanvasArea Component
 * The central canvas area where users build their app
 * Contains the device frame and handles canvas-level interactions
 * 
 * Props:
 * - children: Optional content to pass to device frame
 * - className: Additional CSS classes
 */
const CanvasArea = ({ children, className = '', ...props }) => {
  return (
    <div className={`canvas-area ${className}`} {...props}>
      <div className="canvas-area__container">
        <DeviceFrame>
          {children}
        </DeviceFrame>
      </div>
    </div>
  );
};

export default CanvasArea;
