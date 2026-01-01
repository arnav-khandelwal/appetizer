/**
 * NodeRenderer - Recursive node renderer
 * 
 * Responsibilities:
 * 1. Fetch node from IR by ID
 * 2. Switch on node type
 * 3. Render appropriate node component
 * 4. Children are rendered recursively via LayoutNode
 */

import React, { useContext } from 'react';
import { NodeType } from '../../ir.types';
import { IRContext, SelectionContext } from './CanvasArea';
import { TextNode } from './nodes/TextNode';
import { ButtonNode } from './nodes/ButtonNode';
import { ImageNode } from './nodes/ImageNode';
import { LayoutNode } from './nodes/LayoutNode';
import './NodeRenderer.scss';

interface NodeRendererProps {
  nodeId: string;
}

export const NodeRenderer = ({ nodeId }: NodeRendererProps) => {
  // Access the IR from context
  const appIR = useContext(IRContext);
  
  // Access selection state from context
  const selectionState = useContext(SelectionContext);

  if (!appIR) {
    console.error('NodeRenderer: IRContext not provided');
    return null;
  }

  // Fetch node from flat dictionary
  const node = appIR.nodes[nodeId];

  if (!node) {
    console.warn(`NodeRenderer: Node with id "${nodeId}" not found in IR`);
    return null;
  }
  
  // Determine if this node is selected
  const isSelected = selectionState?.selectedNodeId === nodeId;

  // Apply common wrapper styles for width/height from layout
  const wrapperStyles: React.CSSProperties = {
    // Layout properties are handled by individual node components
    // This wrapper just ensures proper rendering context
    boxSizing: 'border-box',
  };
  
  // Handle node selection
  const handleNodeClick = (e: React.MouseEvent) => {
    // Stop propagation so canvas click doesn't clear selection
    e.stopPropagation();
    selectionState?.setSelectedNodeId(nodeId);
  };
  
  // Determine selection wrapper classes
  const wrapperClassName = isSelected ? 'node-wrapper node-selected' : 'node-wrapper';

  // Switch on node type and render appropriate component
  switch (node.type) {
    case NodeType.TEXT:
      return (
        <div className={wrapperClassName} style={wrapperStyles} onClick={handleNodeClick}>
          <TextNode node={node as any} />
        </div>
      );

    case NodeType.BUTTON:
      return (
        <div className={wrapperClassName} style={wrapperStyles} onClick={handleNodeClick}>
          <ButtonNode node={node as any} />
        </div>
      );

    case NodeType.IMAGE:
      return (
        <div className={wrapperClassName} style={wrapperStyles} onClick={handleNodeClick}>
          <ImageNode node={node as any} />
        </div>
      );

    case NodeType.CONTAINER:
    case NodeType.ROW:
    case NodeType.COLUMN:
    case NodeType.STACK:
      return (
        <div className={wrapperClassName} style={wrapperStyles} onClick={handleNodeClick}>
          <LayoutNode node={node as any} />
        </div>
      );

    case NodeType.LIST:
      // LIST rendering can be implemented later
      return (
        <div className={wrapperClassName} style={wrapperStyles} onClick={handleNodeClick}>
          <div style={{ padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
            List (not implemented yet)
          </div>
        </div>
      );

    default:
      console.warn(`NodeRenderer: Unknown node type "${(node as any).type}"`);
      return null;
  }
};
