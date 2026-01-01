/**
 * IR Mutation Helpers
 * 
 * Pure, immutable functions for safely updating the AppIR.
 * Each function returns a NEW AppIR object without modifying the original.
 * 
 * CRITICAL: These are the ONLY functions that should mutate IR.
 * All other code should use these helpers.
 */

import { AppIR, Style, Layout } from './ir.types';

/**
 * Update a node's style properties immutably
 * @param appIR - The current AppIR object
 * @param nodeId - The ID of the node to update
 * @param partialStyle - Partial style object with properties to update/remove
 * @returns A new AppIR object with the updated style
 */
export function updateNodeStyle(
  appIR: AppIR,
  nodeId: string,
  partialStyle: Partial<Style> | null
): AppIR {
  const node = appIR.nodes[nodeId];
  
  if (!node) {
    console.warn(`updateNodeStyle: Node with id "${nodeId}" not found`);
    return appIR;
  }
  
  // Create new node with updated style
  const updatedNode = {
    ...node,
    style: partialStyle === null ? undefined : { ...node.style, ...partialStyle },
  };
  
  // Create new AppIR with updated node
  return {
    ...appIR,
    nodes: {
      ...appIR.nodes,
      [nodeId]: updatedNode,
    },
  };
}

/**
 * Update a node's layout properties immutably
 * @param appIR - The current AppIR object
 * @param nodeId - The ID of the node to update
 * @param partialLayout - Partial layout object with properties to update/remove
 * @returns A new AppIR object with the updated layout
 */
export function updateNodeLayout(
  appIR: AppIR,
  nodeId: string,
  partialLayout: Partial<Layout> | null
): AppIR {
  const node = appIR.nodes[nodeId];
  
  if (!node) {
    console.warn(`updateNodeLayout: Node with id "${nodeId}" not found`);
    return appIR;
  }
  
  // Create new node with updated layout
  const updatedNode = {
    ...node,
    layout: partialLayout === null ? undefined : { ...node.layout, ...partialLayout },
  };
  
  // Create new AppIR with updated node
  return {
    ...appIR,
    nodes: {
      ...appIR.nodes,
      [nodeId]: updatedNode,
    },
  };
}

/**
 * Remove a specific style property from a node
 * @param appIR - The current AppIR object
 * @param nodeId - The ID of the node to update
 * @param styleKey - The style property key to remove
 * @returns A new AppIR object with the property removed
 */
export function removeNodeStyleProperty(
  appIR: AppIR,
  nodeId: string,
  styleKey: keyof Style
): AppIR {
  const node = appIR.nodes[nodeId];
  
  if (!node || !node.style) {
    return appIR;
  }
  
  const { [styleKey]: _, ...remainingStyle } = node.style;
  
  const updatedNode = {
    ...node,
    style: Object.keys(remainingStyle).length > 0 ? remainingStyle : undefined,
  };
  
  return {
    ...appIR,
    nodes: {
      ...appIR.nodes,
      [nodeId]: updatedNode,
    },
  };
}

/**
 * Remove a specific layout property from a node
 * @param appIR - The current AppIR object
 * @param nodeId - The ID of the node to update
 * @param layoutKey - The layout property key to remove
 * @returns A new AppIR object with the property removed
 */
export function removeNodeLayoutProperty(
  appIR: AppIR,
  nodeId: string,
  layoutKey: keyof Layout
): AppIR {
  const node = appIR.nodes[nodeId];
  
  if (!node || !node.layout) {
    return appIR;
  }
  
  const { [layoutKey]: _, ...remainingLayout } = node.layout;
  
  const updatedNode = {
    ...node,
    layout: Object.keys(remainingLayout).length > 0 ? remainingLayout : undefined,
  };
  
  return {
    ...appIR,
    nodes: {
      ...appIR.nodes,
      [nodeId]: updatedNode,
    },
  };
}
