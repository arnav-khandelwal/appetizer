/**
 * Device Preset System
 * 
 * Defines mobile device specifications for canvas simulation.
 * These are EDITOR properties, NOT part of the IR.
 */

export interface DevicePreset {
  /** Unique identifier */
  id: string;
  
  /** Display name */
  name: string;
  
  /** Device screen width in pixels */
  width: number;
  
  /** Device screen height in pixels */
  height: number;
  
  /** Border radius for rounded corners */
  borderRadius: number;
  
  /** Safe area insets (like Flutter's SafeArea) */
  safeArea: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  
  /** Whether device has a notch */
  hasNotch?: boolean;
  
  /** Device category for grouping */
  category?: 'android' | 'ios';
}

/**
 * Predefined device presets
 */
export const DEVICE_PRESETS: DevicePreset[] = [
  {
    id: 'android-small',
    name: 'Android Small',
    width: 360,
    height: 640,
    borderRadius: 20,
    safeArea: {
      top: 24,
      bottom: 16,
      left: 0,
      right: 0,
    },
    hasNotch: false,
    category: 'android',
  },
  {
    id: 'android-medium',
    name: 'Android Medium',
    width: 360,
    height: 780,
    borderRadius: 24,
    safeArea: {
      top: 24,
      bottom: 16,
      left: 0,
      right: 0,
    },
    hasNotch: false,
    category: 'android',
  },
  {
    id: 'android-large',
    name: 'Android Large',
    width: 412,
    height: 915,
    borderRadius: 28,
    safeArea: {
      top: 32,
      bottom: 20,
      left: 0,
      right: 0,
    },
    hasNotch: false,
    category: 'android',
  },
  {
    id: 'iphone-standard',
    name: 'iPhone Standard',
    width: 375,
    height: 812,
    borderRadius: 40,
    safeArea: {
      top: 44,
      bottom: 34,
      left: 0,
      right: 0,
    },
    hasNotch: true,
    category: 'ios',
  },
  {
    id: 'iphone-large',
    name: 'iPhone Large',
    width: 414,
    height: 896,
    borderRadius: 42,
    safeArea: {
      top: 44,
      bottom: 34,
      left: 0,
      right: 0,
    },
    hasNotch: true,
    category: 'ios',
  },
];

/**
 * Default device preset
 */
export const DEFAULT_DEVICE = DEVICE_PRESETS[1]; // Android Medium
