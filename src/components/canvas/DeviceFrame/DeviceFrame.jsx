import React from 'react';
import './DeviceFrame.scss';

/**
 * DeviceFrame Component
 * Renders an Android device frame/outline for the canvas
 * Provides visual context for mobile app building
 * 
 * Props:
 * - children: Content to render inside the device frame
 * - className: Additional CSS classes
 */
const DeviceFrame = ({ children, className = '', ...props }) => {
  return (
    <div className={`device-frame ${className}`} {...props}>
      {/* Device notch/status bar area */}
      <div className="device-frame__notch">
        <div className="device-frame__notch-inner" />
      </div>

      {/* Main device screen area */}
      <div className="device-frame__screen">
        {children || (
          <div className="device-frame__placeholder">
            <p>Drag components here to start building</p>
          </div>
        )}
      </div>

      {/* Device bottom indicator (home gesture bar) */}
      <div className="device-frame__bottom-bar" />
    </div>
  );
};

export default DeviceFrame;
