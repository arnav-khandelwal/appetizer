/**
 * ImageNode - Pure visual representation of IMAGE node type
 * Renders image with fit and styling from IR
 */

import React from 'react';
import { Node, NodeType, ImageFit } from '../../../ir.types';

interface ImageNodeProps {
  node: Node<NodeType.IMAGE>;
}

export const ImageNode = ({ node }: ImageNodeProps) => {
  const { props, style } = node;

  // Map ImageFit to CSS object-fit
  const getObjectFit = (): React.CSSProperties['objectFit'] => {
    switch (props.fit) {
      case ImageFit.COVER:
        return 'cover';
      case ImageFit.CONTAIN:
        return 'contain';
      case ImageFit.FILL:
        return 'fill';
      case ImageFit.FIT_WIDTH:
        return 'scale-down';
      case ImageFit.FIT_HEIGHT:
        return 'scale-down';
      default:
        return 'cover';
    }
  };

  return (
    <img
      src={props.src}
      alt={props.alt || ''}
      style={{
        width: '100%',
        height: '100%',
        objectFit: getObjectFit(),
        borderRadius: style?.borderRadius ? `${style.borderRadius}px` : undefined,
        opacity: style?.opacity,
        display: 'block',
      }}
    />
  );
};
