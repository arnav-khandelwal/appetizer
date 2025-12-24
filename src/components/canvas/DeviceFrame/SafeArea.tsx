/**
 * SafeArea - Simulates mobile safe area insets
 * 
 * Provides padding to prevent content from overlapping:
 * - Notch
 * - Status bar
 * - Gesture area
 * - Rounded corners
 * 
 * Similar to Flutter's SafeArea widget.
 */

import React from 'react';

interface SafeAreaProps {
  /** Safe area insets */
  insets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  
  /** Children to render inside safe area */
  children: React.ReactNode;
}

export const SafeArea: React.FC<SafeAreaProps> = ({ insets, children }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        paddingTop: `${insets.top}px`,
        paddingBottom: `${insets.bottom}px`,
        paddingLeft: `${insets.left}px`,
        paddingRight: `${insets.right}px`,
        boxSizing: 'border-box',
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  );
};
