/**
 * ButtonNode - Pure visual representation of BUTTON node type
 * Renders button appearance without interaction logic
 */

import { Node, NodeType, ButtonVariant } from '../../../ir.types';

interface ButtonNodeProps {
  node: Node<NodeType.BUTTON>;
}

export const ButtonNode = ({ node }: ButtonNodeProps) => {
  const { props, style } = node;

  // Map button variant to visual style
  const getVariantStyles = () => {
    switch (props.variant) {
      case ButtonVariant.PRIMARY:
        return {
          backgroundColor: style?.backgroundColor || '#3B82F6',
          color: '#FFFFFF',
          border: 'none',
        };
      case ButtonVariant.SECONDARY:
        return {
          backgroundColor: style?.backgroundColor || 
          '#6B7280',
          color: '#FFFFFF',
          border: 'none',
        };
      case ButtonVariant.OUTLINED:
        return {
          backgroundColor: 'transparent',
          color: style?.backgroundColor || '#3B82F6',
          border: `2px solid ${style?.backgroundColor || '#3B82F6'}`,
        };
      case ButtonVariant.TEXT:
        return {
          backgroundColor: 'transparent',
          color: style?.backgroundColor || '#3B82F6',
          border: 'none',
        };
      default:
        return {
          backgroundColor: style?.backgroundColor,
          color: '#FFFFFF',
          border: 'none',
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <button
      type="button"
      style={{
        ...variantStyles,
        borderRadius: style?.borderRadius ? `${style.borderRadius}px` : undefined,
        opacity: style?.opacity,
        padding: '12px 24px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
      }}
    >
      {props.label}
    </button>
  );
};
