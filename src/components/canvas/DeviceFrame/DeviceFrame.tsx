/**
 * DeviceFrame - Mobile device simulator frame
 * 
 * Wraps the IR canvas renderer in a phone-shaped container.
 * This is EDITOR UI, not part of the app IR.
 * 
 * Responsibilities:
 * - Simulate device dimensions
 * - Render device chrome (frame, notch)
 * - Apply safe area constraints
 * - Ensure fill behavior matches real devices
 */

import React from 'react';
import { DevicePreset } from './devicePresets';
import { SafeArea } from './SafeArea';
import './DeviceFrame.scss';

interface DeviceFrameProps {
  /** Device preset configuration */
  device: DevicePreset;
  
  /** App content to render (the IR renderer) */
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ device, children }) => {
  return (
    <div className="device-frame">
      {/* Device outer shell */}
      <div
        className="device-frame__shell"
        style={{
          width: `${device.width}px`,
          height: `${device.height}px`,
          borderRadius: `${device.borderRadius}px`,
        }}
      >
        {/* Notch (if device has one) */}
        {device.hasNotch && (
          <div className="device-frame__notch" />
        )}

        {/* Device screen */}
        <div
          className="device-frame__screen"
          style={{
            borderRadius: `${device.borderRadius - 4}px`,
          }}
        >
          {/* Safe area wrapper */}
          <SafeArea insets={device.safeArea}>
            {children}
          </SafeArea>
        </div>
      </div>

      {/* Device label */}
      <div className="device-frame__label">
        {device.name} • {device.width}×{device.height}
      </div>
    </div>
  );
};

export default DeviceFrame;
