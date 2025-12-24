/**
 * LayoutNode - Pure visual representation of layout node types
 * Handles Container, Row, Column, Stack rendering
 */

import React from 'react';
import { Node, NodeType, Alignment } from '../../../ir.types';
import { NodeRenderer } from '../NodeRenderer';

interface LayoutNodeProps {
  node: Node<NodeType.CONTAINER | NodeType.ROW | NodeType.COLUMN | NodeType.STACK>;
}

export const LayoutNode = ({ node }: LayoutNodeProps) => {
  const { type, style, layout, children } = node;

  // Map SizeValue to CSS
  const mapSize = (value?: number | 'auto' | 'fill'): string | undefined => {
    if (value === 'fill') return '100%';
    if (value === 'auto') return 'auto';
    if (typeof value === 'number') return `${value}px`;
    return undefined;
  };

  // Map Spacing to CSS padding/margin
  const mapSpacing = (spacing?: number | { top?: number; right?: number; bottom?: number; left?: number }): string | undefined => {
    if (typeof spacing === 'number') return `${spacing}px`;
    if (spacing && typeof spacing === 'object') {
      const { top = 0, right = 0, bottom = 0, left = 0 } = spacing;
      return `${top}px ${right}px ${bottom}px ${left}px`;
    }
    return undefined;
  };

  // Map Alignment to CSS
  const mapAlignment = (alignment?: Alignment): string | undefined => {
    switch (alignment) {
      case Alignment.START:
        return 'flex-start';
      case Alignment.CENTER:
        return 'center';
      case Alignment.END:
        return 'flex-end';
      case Alignment.SPACE_BETWEEN:
        return 'space-between';
      case Alignment.SPACE_AROUND:
        return 'space-around';
      case Alignment.SPACE_EVENLY:
        return 'space-evenly';
      default:
        return undefined;
    }
  };

  // Map shadow to CSS box-shadow
  const mapShadow = (): string | undefined => {
    if (!style?.shadow) return undefined;
    const { offsetX, offsetY, blurRadius, color } = style.shadow;
    return `${offsetX}px ${offsetY}px ${blurRadius}px ${color}`;
  };

  // Determine flex direction and positioning based on node type
  const getLayoutStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      width: mapSize(layout?.width),
      height: mapSize(layout?.height),
      padding: mapSpacing(layout?.padding),
      margin: mapSpacing(layout?.margin),
      backgroundColor: style?.backgroundColor,
      borderRadius: style?.borderRadius ? `${style.borderRadius}px` : undefined,
      border: style?.borderWidth ? `${style.borderWidth}px solid ${style?.borderColor || '#000'}` : undefined,
      boxShadow: mapShadow(),
      opacity: style?.opacity,
      gap: layout?.gap ? `${layout.gap}px` : undefined,
    };

    switch (type) {
      case NodeType.ROW:
        return {
          ...baseStyles,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: mapAlignment(layout?.mainAxisAlignment),
          alignItems: mapAlignment(layout?.crossAxisAlignment),
        };

      case NodeType.COLUMN:
        return {
          ...baseStyles,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: mapAlignment(layout?.mainAxisAlignment),
          alignItems: mapAlignment(layout?.crossAxisAlignment),
        };

      case NodeType.STACK:
        return {
          ...baseStyles,
          position: 'relative',
          display: 'block',
        };

      case NodeType.CONTAINER:
      default:
        return {
          ...baseStyles,
          display: 'block',
        };
    }
  };

  const layoutStyles = getLayoutStyles();

  // For Stack, children need absolute positioning
  const isStack = type === NodeType.STACK;

  return (
    <div style={layoutStyles}>
      {children.map((childId, index) => (
        <div
          key={childId}
          style={
            isStack
              ? {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  // Stack children can be positioned based on alignment
                  // For now, they all start at top-left
                }
              : undefined
          }
        >
          <NodeRenderer nodeId={childId} />
        </div>
      ))}
    </div>
  );
};
