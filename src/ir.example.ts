/**
 * Example IR: Simple Login Screen
 * 
 * This demonstrates a realistic app structure with:
 * - One page (Login Screen)
 * - Column layout container
 * - App title (Text)
 * - Username field placeholder (Container)
 * - Login button (Button)
 */

import {
  AppIR,
  NodeType,
  Alignment,
  ButtonVariant,
  FontWeight,
  ImageFit,
} from './ir.types';

/**
 * Complete app IR with a single login page
 */
export const exampleAppIR: AppIR = {
  // ============================================================================
  // APP METADATA
  // ============================================================================
  app: {
    name: 'My Flutter App',
    version: '1.0.0',
    packageId: 'com.example.myapp',
  },

  // ============================================================================
  // PAGES
  // ============================================================================
  pages: [
    {
      id: 'page-1',
      name: 'Login Screen',
      rootNodeId: 'node-container-1',
      metadata: {
        route: '/login',
        title: 'Login',
      },
    },
  ],

  // ============================================================================
  // NODES (Flat Dictionary)
  // ============================================================================
  nodes: {
    // --------------------------------------------------------------------------
    // ROOT CONTAINER
    // Vertical column layout that centers content
    // --------------------------------------------------------------------------
    'node-container-1': {
      id: 'node-container-1',
      type: NodeType.COLUMN,
      parentId: null, // Root node has no parent
      children: ['node-text-1', 'node-container-2', 'node-button-1'],
      
      // Style: White background with subtle shadow
      style: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        shadow: {
          color: '#00000015',
          offsetX: 0,
          offsetY: 4,
          blurRadius: 12,
        },
      },
      
      // Layout: Centered column with padding
      layout: {
        width: 'fill', // Take full screen width
        height: 'fill', // Take full screen height
        padding: 24, // Uniform padding on all sides
        mainAxisAlignment: Alignment.CENTER, // Center vertically
        crossAxisAlignment: Alignment.CENTER, // Center horizontally
        gap: 24, // Spacing between children
      },
      
      // Column has no specific props (direction is implicit: vertical)
      props: {},
    },

    // --------------------------------------------------------------------------
    // TITLE TEXT
    // Large heading at the top
    // --------------------------------------------------------------------------
    'node-text-1': {
      id: 'node-text-1',
      type: NodeType.TEXT,
      parentId: 'node-container-1',
      children: [], // Text nodes have no children
      
      // No additional styling needed
      style: {},
      
      // Layout: Auto-size to content
      layout: {
        width: 'auto',
        height: 'auto',
        margin: { bottom: 16 }, // Extra space below title
      },
      
      // Text-specific properties
      props: {
        text: 'Welcome again',
        fontSize: 32,
        fontWeight: FontWeight.BOLD,
        color: '#1F2937',
        textAlign: 'center',
      },
    },

    // --------------------------------------------------------------------------
    // USERNAME INPUT PLACEHOLDER
    // A container representing where an input field would go
    // (Actual input fields would require extending the node types)
    // --------------------------------------------------------------------------
    'node-container-2': {
      id: 'node-container-2',
      type: NodeType.CONTAINER,
      parentId: 'node-container-1',
      children: ['node-text-2'],
      
      // Style: Light gray background with border
      style: {
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      },
      
      // Layout: Full width input-like container
      layout: {
        width: 'fill',
        height: 56, // Fixed height for input
        padding: 16,
      },
      
      // Container has no specific props
      props: {},
    },

    // --------------------------------------------------------------------------
    // USERNAME PLACEHOLDER TEXT
    // Text inside the input container
    // --------------------------------------------------------------------------
    'node-text-2': {
      id: 'node-text-2',
      type: NodeType.TEXT,
      parentId: 'node-container-2',
      children: [],
      
      style: {},
      
      layout: {
        width: 'auto',
        height: 'auto',
      },
      
      props: {
        text: 'Username',
        fontSize: 16,
        fontWeight: FontWeight.NORMAL,
        color: '#9CA3AF', // Muted gray for placeholder
        textAlign: 'left',
      },
    },

    // --------------------------------------------------------------------------
    // LOGIN BUTTON
    // Primary action button
    // --------------------------------------------------------------------------
    'node-button-1': {
      id: 'node-button-1',
      type: NodeType.BUTTON,
      parentId: 'node-container-1',
      children: [], // Buttons have no children (label is in props)
      
      // Style: Primary brand color
      style: {
        borderRadius: 8,

      },
      
      // Layout: Full width button
      layout: {
        width: 'fill',
        height: 56,
      },
      
      // Button-specific properties
      props: {
        label: 'Login Again',
        variant: ButtonVariant.SECONDARY,
        onPress: 'action-login', // Event handler ID
      },
    },
  },
};

// ============================================================================
// EXAMPLE: COMPLEX LAYOUT WITH ROW AND STACK
// ============================================================================

/**
 * Additional example showing Row, Stack, and Image usage
 * This demonstrates a product card layout
 */
export const productCardExample: AppIR = {
  app: {
    name: 'Product Showcase',
    version: '1.0.0',
    packageId: 'com.example.products',
  },

  pages: [
    {
      id: 'page-1',
      name: 'Product Card',
      rootNodeId: 'node-card',
      metadata: {
        route: '/product',
      },
    },
  ],

  nodes: {
    // Card container
    'node-card': {
      id: 'node-card',
      type: NodeType.COLUMN,
      parentId: null,
      children: ['node-image-stack', 'node-info-row'],
      
      style: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadow: {
          color: '#00000010',
          offsetX: 0,
          offsetY: 2,
          blurRadius: 8,
        },
      },
      
      layout: {
        width: 300,
        height: 'auto',
        padding: 0,
      },
      
      props: {},
    },

    // Image with overlay stack
    'node-image-stack': {
      id: 'node-image-stack',
      type: NodeType.STACK,
      parentId: 'node-card',
      children: [ 'node-badge', 'node-image'],
      
      style: {},
      
      layout: {
        width: 'fill',
        height: 200,
      },
      
      props: {
        alignment: Alignment.CENTER,
      },
    },

    // Product image
    

    // "New" badge overlay
    'node-badge': {
      id: 'node-badge',
      type: NodeType.CONTAINER,
      parentId: 'node-image-stack',
      children: ['node-badge-text'],
      
      style: {
        backgroundColor: '#EF4444',
        borderRadius: 6,
      },
      
      layout: {
        width: 'auto',
        height: 'auto',
        padding: { top: 4, right: 8, bottom: 4, left: 8 },
        margin: 12,
      },
      
      props: {},
    },

    'node-badge-text': {
      id: 'node-badge-text',
      type: NodeType.TEXT,
      parentId: 'node-badge',
      children: [],
      
      style: {},
      
      layout: {
        width: 'auto',
        height: 'auto',
      },
      
      props: {
        text: 'NEW',
        fontSize: 12,
        fontWeight: FontWeight.BOLD,
        color: '#FFFFFF',
      },
    },

    // Info row (title + price)
    'node-info-row': {
      id: 'node-info-row',
      type: NodeType.ROW,
      parentId: 'node-card',
      children: ['node-title', 'node-price'],
      
      style: {},
      
      layout: {
        width: 'fill',
        height: 'auto',
        padding: 16,
        mainAxisAlignment: Alignment.SPACE_BETWEEN,
      },
      
      props: {},
    },

    'node-title': {
      id: 'node-title',
      type: NodeType.TEXT,
      parentId: 'node-info-row',
      children: [],
      
      style: {},
      
      layout: {
        width: 'auto',
        height: 'auto',
      },
      
      props: {
        text: 'Product Name',
        fontSize: 18,
        fontWeight: FontWeight.SEMIBOLD,
        color: '#1F2937',
      },
    },

    'node-price': {
      id: 'node-price',
      type: NodeType.TEXT,
      parentId: 'node-info-row',
      children: [],
      
      style: {},
      
      layout: {
        width: 'auto',
        height: 'auto',
      },
      
      props: {
        text: '$99.99',
        fontSize: 18,
        fontWeight: FontWeight.BOLD,
        color: '#3B82F6',
      },
    },

    'node-image': {
      id: 'node-image',
      type: NodeType.IMAGE,
      parentId: 'node-image-stack',
      children: [],
      
      style: {
        borderRadius: 12,
      },
      
      layout: {
        width: 'fill',
        height: 'fill',
      },
      
      props: {
        src: 'https://picsum.photos/300/300',
        fit: ImageFit.COVER,
        alt: 'Product Image',
      },
    },
  },
};
