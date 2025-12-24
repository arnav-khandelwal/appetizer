/**
 * TextNode - Pure visual representation of TEXT node type
 * Renders text content with styling from IR
 */

import { Node, NodeType } from '../../../ir.types';

interface TextNodeProps {
  node: Node<NodeType.TEXT>;
}

export const TextNode = ({ node }: TextNodeProps) => {
  const { props, style } = node;

  return (
    <div
      style={{
        color: props.color,
        fontSize: props.fontSize ? `${props.fontSize}px` : undefined,
        fontWeight: props.fontWeight,
        textAlign: props.textAlign,
        opacity: style?.opacity,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {props.text}
    </div>
  );
};
