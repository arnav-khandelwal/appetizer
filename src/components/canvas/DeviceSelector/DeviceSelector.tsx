/**
 * DeviceSelector - Floating UI for switching device presets
 * 
 * Allows users to preview their app on different device sizes.
 * Device selection is EDITOR STATE, not persisted to IR.
 * 
 * This component floats at the top-right of the canvas.
 */

import React from 'react';
import { DevicePreset, DEVICE_PRESETS } from '../DeviceFrame/devicePresets';
import './DeviceSelector.scss';

interface DeviceSelectorProps {
  /** Currently selected device */
  selectedDevice: DevicePreset;
  
  /** Callback when device is changed */
  onDeviceChange: (device: DevicePreset) => void;
}

export const DeviceSelector: React.FC<DeviceSelectorProps> = ({
  selectedDevice,
  onDeviceChange,
}) => {
  return (
    <div className="device-selector">
      <select
        className="device-selector__dropdown"
        value={selectedDevice.id}
        onChange={(e) => {
          const device = DEVICE_PRESETS.find(d => d.id === e.target.value);
          if (device) {
            onDeviceChange(device);
          }
        }}
        aria-label="Select device preset"
      >
        {DEVICE_PRESETS.map((device) => (
          <option key={device.id} value={device.id}>
            {device.name} ({device.width}×{device.height})
          </option>
        ))}
      </select>
    </div>
  );
};
