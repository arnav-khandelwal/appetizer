/**
 * ZoomControls - Canvas zoom in/out controls
 * 
 * Provides zoom controls for the canvas preview.
 * This is EDITOR UI, not part of the app.
 * 
 * Zoom is a pure visual scale transform that does NOT affect:
 * - IR layout calculations
 * - Device frame dimensions
 * - Fill behavior
 */

import React from 'react';
import './ZoomControls.scss';

interface ZoomControlsProps {
  /** Current zoom level (1 = 100%) */
  zoom: number;
  
  /** Callback when zoom changes */
  onZoomChange: (zoom: number) => void;
  
  /** Minimum zoom level */
  minZoom?: number;
  
  /** Maximum zoom level */
  maxZoom?: number;
  
  /** Zoom step increment */
  zoomStep?: number;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoom,
  onZoomChange,
  minZoom = 0.5,
  maxZoom = 1.5,
  zoomStep = 0.1,
}) => {
  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + zoomStep, maxZoom);
    onZoomChange(Number(newZoom.toFixed(1)));
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - zoomStep, minZoom);
    onZoomChange(Number(newZoom.toFixed(1)));
  };

  const handleReset = () => {
    onZoomChange(0.8);
  };

  const zoomPercent = Math.round(zoom * 100);

  return (
    <div className="zoom-controls">
      <button
        className="zoom-controls__button"
        onClick={handleZoomOut}
        disabled={zoom <= minZoom}
        title="Zoom Out"
        aria-label="Zoom Out"
      >
        −
      </button>

      <button
        className="zoom-controls__display"
        onClick={handleReset}
        title="Reset Zoom"
        aria-label="Reset Zoom to 100%"
      >
        {zoomPercent}%
      </button>

      <button
        className="zoom-controls__button"
        onClick={handleZoomIn}
        disabled={zoom >= maxZoom}
        title="Zoom In"
        aria-label="Zoom In"
      >
        +
      </button>
    </div>
  );
};
