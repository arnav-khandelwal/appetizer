/**
 * CanvasArea - Entry point for IR-driven canvas rendering
 * 
 * Responsibilities:
 * 1. Accept AppIR and currentPageId
 * 2. Find the page and its root node
 * 3. Provide IR context for recursive rendering
 * 4. Start the recursive render tree
 */

import React, { createContext } from 'react';
import { AppIR } from '../../ir.types';
import { NodeRenderer } from './NodeRenderer';
import './CanvasArea.scss';

interface CanvasAreaProps {
  /** The complete app IR (single source of truth) */
  appIR: AppIR;
  
  /** Current page to render */
  currentPageId: string;
}

// Context to provide IR to all descendant components
export const IRContext = createContext<AppIR | null>(null);

export const CanvasArea = ({ appIR, currentPageId }: CanvasAreaProps) => {
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

  return (
    <IRContext.Provider value={appIR}>
      <div className="canvas-area">
        <div className="canvas-viewport">
          {/* Start recursive rendering from root */}
          <NodeRenderer nodeId={rootNodeId} />
        </div>
      </div>
    </IRContext.Provider>
  );
};

// Default export for compatibility
export default CanvasArea;
