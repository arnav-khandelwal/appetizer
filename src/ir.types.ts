/**
 * Intermediate Representation (IR) for Visual Flutter App Builder
 * 
 * Design Philosophy:
 * - Declarative and JSON-serializable
 * - Optimized for tree traversal and Flutter code generation
 * - Explicit parent-child relationships
 * - Clean separation of concerns (style/layout/props)
 */

// ============================================================================
// NODE TYPES
// ============================================================================

/**
 * All supported visual component types
 * Maps 1:1 to Flutter widget categories
 */
export enum NodeType {
  TEXT = 'TEXT',
  BUTTON = 'BUTTON',
  IMAGE = 'IMAGE',
  CONTAINER = 'CONTAINER',
  ROW = 'ROW',
  COLUMN = 'COLUMN',
  STACK = 'STACK',
  LIST = 'LIST',
}

// ============================================================================
// STYLE SYSTEM
// ============================================================================

/**
 * Visual appearance properties
 * Maps to Flutter's decoration and visual properties
 */
export interface Style {
  /** Background color in hex format (e.g., "#FFFFFF") */
  backgroundColor?: string;
  
  /** Border radius in logical pixels */
  borderRadius?: number;
  
  /** Border width in logical pixels */
  borderWidth?: number;
  
  /** Border color in hex format */
  borderColor?: string;
  
  /** Shadow configuration */
  shadow?: Shadow;
  
  /** Opacity value (0.0 to 1.0) */
  opacity?: number;
}

/**
 * Shadow definition
 * Maps to Flutter's BoxShadow
 */
export interface Shadow {
  /** Shadow color in hex format */
  color: string;
  
  /** Horizontal offset in logical pixels */
  offsetX: number;
  
  /** Vertical offset in logical pixels */
  offsetY: number;
  
  /** Blur radius in logical pixels */
  blurRadius: number;
}

// ============================================================================
// LAYOUT SYSTEM
// ============================================================================

/**
 * Sizing value: fixed pixels, auto-size, or fill available space
 * Maps to Flutter's sizing constraints
 */
export type SizeValue = number | 'auto' | 'fill';

/**
 * Alignment options for layout containers
 * Maps to Flutter's MainAxisAlignment and CrossAxisAlignment
 */
export enum Alignment {
  START = 'start',
  CENTER = 'center',
  END = 'end',
  SPACE_BETWEEN = 'spaceBetween',
  SPACE_AROUND = 'spaceAround',
  SPACE_EVENLY = 'spaceEvenly',
}

/**
 * Spacing definition (can be uniform or per-side)
 * Maps to Flutter's EdgeInsets
 */
export type Spacing = number | {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

/**
 * Layout properties (spacing, sizing, alignment)
 * Separated from style to maintain clear concerns
 */
export interface Layout {
  /** Width constraint */
  width?: SizeValue;
  
  /** Height constraint */
  height?: SizeValue;
  
  /** Internal spacing (maps to Flutter Padding) */
  padding?: Spacing;
  
  /** External spacing (maps to Flutter Margin via Container) */
  margin?: Spacing;
  
  /** Main axis alignment for container layouts */
  mainAxisAlignment?: Alignment;
  
  /** Cross axis alignment for container layouts */
  crossAxisAlignment?: Alignment;
  
  /** Gap between children along the main axis (Row/Column/Stack) */
  gap?: number;
  
  /** Size constraints for responsive layouts (maps to Flutter BoxConstraints) */
  constraints?: {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
  };
}

// ============================================================================
// COMPONENT-SPECIFIC PROPS
// ============================================================================

/**
 * Font weight options
 * Maps to Flutter's FontWeight
 */
export enum FontWeight {
  NORMAL = 'normal',
  MEDIUM = 'medium',
  SEMIBOLD = 'semibold',
  BOLD = 'bold',
}

/**
 * Text-specific properties
 */
export interface TextProps {
  /** The text content to display */
  text: string;
  
  /** Font size in logical pixels */
  fontSize?: number;
  
  /** Font weight */
  fontWeight?: FontWeight;
  
  /** Text color in hex format */
  color?: string;
  
  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right';
}

/**
 * Button variants
 * Maps to Flutter's button types
 */
export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OUTLINED = 'outlined',
  TEXT = 'text',
}

/**
 * Button-specific properties
 */
export interface ButtonProps {
  /** Button label text */
  label: string;
  
  /** Visual variant */
  variant?: ButtonVariant;
  
  /** Action ID (for event handling) */
  onPress?: string;
}

/**
 * Image fit modes
 * Maps to Flutter's BoxFit
 */
export enum ImageFit {
  COVER = 'cover',
  CONTAIN = 'contain',
  FILL = 'fill',
  FIT_WIDTH = 'fitWidth',
  FIT_HEIGHT = 'fitHeight',
}

/**
 * Image-specific properties
 */
export interface ImageProps {
  /** Image source URL or asset path */
  src: string;
  
  /** How the image should be fitted */
  fit?: ImageFit;
  
  /** Alt text for accessibility */
  alt?: string;
}

/**
 * Container has no specific props
 * It's a pure layout wrapper
 */
export interface ContainerProps {}

/**
 * Row has no specific props beyond layout
 */
export interface RowProps {}

/**
 * Column has no specific props beyond layout
 */
export interface ColumnProps {}

/**
 * Stack-specific properties
 */
export interface StackProps {
  /** How children are aligned in the stack (maps to Flutter Alignment) */
  alignment?: Alignment;
}

/**
 * List scroll direction
 */
export enum ScrollDirection {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

/**
 * List-specific properties
 */
export interface ListProps {
  /** Scroll direction */
  scrollDirection?: ScrollDirection;
  
  /** IDs of repeated template (for data binding) */
  itemTemplateId?: string;
}

// ============================================================================
// NODE DEFINITION
// ============================================================================

/**
 * Base node structure (shared properties across all node types)
 * Every visual element in the tree is a Node
 */
export interface BaseNode {
  /** Unique identifier (UUID recommended) */
  id: string;
  
  /** Parent node ID (null for root nodes) */
  parentId: string | null;
  
  /** Ordered list of child node IDs */
  children: string[];
  
  /** Visual appearance properties */
  style?: Style;
  
  /** Layout and spacing properties */
  layout?: Layout;
}

/**
 * Type-safe props mapping
 * Maps NodeType to its corresponding props interface
 */
export type PropsForNodeType<T extends NodeType> =
  T extends NodeType.TEXT ? TextProps :
  T extends NodeType.BUTTON ? ButtonProps :
  T extends NodeType.IMAGE ? ImageProps :
  T extends NodeType.CONTAINER ? ContainerProps :
  T extends NodeType.ROW ? RowProps :
  T extends NodeType.COLUMN ? ColumnProps :
  T extends NodeType.STACK ? StackProps :
  T extends NodeType.LIST ? ListProps :
  never;

/**
 * Fully typed node with discriminated props
 * Generic type parameter ensures type and props are always consistent
 */
export type Node<T extends NodeType = NodeType> = BaseNode & {
  /** Node type discriminator */
  type: T;
  
  /** Component-specific properties (type-safe based on T) */
  props: PropsForNodeType<T>;
};

// ============================================================================
// PAGE & APP STRUCTURE
// ============================================================================

/**
 * Page definition
 * Represents a single screen in the app
 */
export interface Page {
  /** Unique page identifier */
  id: string;
  
  /** Human-readable page name */
  name: string;
  
  /** Root node ID for this page's tree */
  rootNodeId: string;
  
  /** Page-level metadata */
  metadata?: {
    /** Route path for navigation */
    route?: string;
    
    /** Page title (for app bar) */
    title?: string;
  };
}

/**
 * Root app structure
 * The single source of truth for the entire app
 */
export interface AppIR {
  /** App-level metadata */
  app: {
    /** App name */
    name: string;
    
    /** App version */
    version: string;
    
    /** Package identifier (e.g., com.example.app) */
    packageId: string;
  };
  
  /** All pages in the app */
  pages: Page[];
  
  /** Flat node dictionary for O(1) lookup */
  nodes: Record<string, Node>;
}
