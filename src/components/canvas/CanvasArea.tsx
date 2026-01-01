/**
 * CanvasArea - Entry point for IR-driven canvas rendering
 * 
 * Responsibilities:
 * 1. Accept AppIR and currentPageId
 * 2. Find the page and its root node
 * 3. Provide IR context for recursive rendering
 * 4. Wrap IR renderer in DeviceFrame simulation
 * 5. Start the recursive render tree
 */

import { createContext, useState } from 'react';
import { AppIR } from '../../ir.types';
import { NodeRenderer } from './NodeRenderer';
import { DeviceFrame } from './DeviceFrame/DeviceFrame';
import { DeviceSelector } from './DeviceSelector/DeviceSelector';
import { ZoomControls } from './ZoomControls/ZoomControls';
import { DEFAULT_DEVICE } from './DeviceFrame/devicePresets';
import './CanvasArea.scss';

interface CanvasAreaProps {
  /** The complete app IR (single source of truth) */
  appIR: AppIR;
  
  /** Current page to render */
  currentPageId: string;
  
  /** Currently selected node ID (from parent) */
  selectedNodeId?: string | null;
  
  /** Handler for node selection (from parent) */
  onSelectNode?: (nodeId: string | null) => void;
}

// Context to provide IR to all descendant components
export const IRContext = createContext<AppIR | null>(null);

// Context to provide selection state and handlers
export interface SelectionContext {
  selectedNodeId: string | null;
  setSelectedNodeId: (nodeId: string | null) => void;
}

export const SelectionContext = createContext<SelectionContext | null>(null);

export const CanvasArea = ({ appIR, currentPageId, selectedNodeId: parentSelectedNodeId, onSelectNode }: CanvasAreaProps) => {
  // Editor state: selected device (NOT part of IR)
  const [selectedDevice, setSelectedDevice] = useState(DEFAULT_DEVICE);
  
  // Editor state: canvas zoom (NOT part of IR)
  const [zoom, setZoom] = useState(0.8);
  
  // Use parent-controlled selection if provided, otherwise use local state
  const [localSelectedNodeId, setLocalSelectedNodeId] = useState<string | null>(null);
  const selectedNodeId = parentSelectedNodeId ?? localSelectedNodeId;
  const setSelectedNodeId = onSelectNode ?? setLocalSelectedNodeId;

  // Find the current page
  const currentPage = appIR.pages.find(page => page.id === currentPageId);

  if (!currentPage) {
    return (
      <div className="canvas-area">
        <div className="canvas-error">
          Page with id "{currentPageId}" not found
        </div>
      </div>
    );
  }

  // Get the root node for this page
  const rootNodeId = currentPage.rootNodeId;
  const rootNode = appIR.nodes[rootNodeId];

  if (!rootNode) {
    return (
      <div className="canvas-area">
        <div className="canvas-error">
          Root node with id "{rootNodeId}" not found
        </div>
      </div>
    );
  }

  const handleCanvasClick = () => {
    // Clear selection when clicking on empty canvas
    setSelectedNodeId(null);
  };

  return (
    <IRContext.Provider value={appIR}>
      <SelectionContext.Provider value={{ selectedNodeId, setSelectedNodeId }}>
        <div className="canvas-area">
          {/* Floating device selector (editor UI) */}
          <DeviceSelector 
            selectedDevice={selectedDevice}
            onDeviceChange={setSelectedDevice}
          />

          {/* Canvas viewport with zoom transform */}
          <div 
            className="canvas-viewport"
            onClick={handleCanvasClick}
          >
            <div 
              className="canvas-scale"
              style={{ 
                transform: `scale(${zoom})`,
                transformOrigin: 'center center'
              }}
            >
              <DeviceFrame device={selectedDevice}>
                {/* IR renderer starts here */}
                <NodeRenderer nodeId={rootNodeId} />
              </DeviceFrame>
            </div>
          </div>

          {/* Zoom controls (editor UI) */}
          <ZoomControls 
            zoom={zoom}
            onZoomChange={setZoom}
          />
        </div>
      </SelectionContext.Provider>
    </IRContext.Provider>
  );
};

// Default export for compatibility
export default CanvasArea;
