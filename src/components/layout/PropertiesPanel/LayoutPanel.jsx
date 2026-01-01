import React from 'react';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import Panel from '../../common/Panel/Panel';
import { updateNodeLayout, removeNodeLayoutProperty } from '../../../irMutations';
import './PropertiesPanel.scss';

/**
 * LayoutPanel Component
 * Binds layout properties from the selected node to form inputs
 * 
 * Props:
 * - nodeId: ID of the selected node
 * - appIR: The current app intermediate representation
 * - onUpdateAppIR: Handler for IR updates
 */
const LayoutPanel = ({ nodeId, appIR, onUpdateAppIR }) => {
  const node = appIR?.nodes[nodeId];
  const layout = node?.layout || {};

  // Handle size select changes (auto/fill)
  const handleSizeChange = (propertyName, value) => {
    if (value === '') {
      onUpdateAppIR(removeNodeLayoutProperty(appIR, nodeId, propertyName));
    } else {
      onUpdateAppIR(updateNodeLayout(appIR, nodeId, { [propertyName]: value }));
    }
  };

  // Handle spacing input changes
  const handleSpacingChange = (propertyName, value) => {
    if (value === '' || value === null) {
      onUpdateAppIR(removeNodeLayoutProperty(appIR, nodeId, propertyName));
    } else {
      onUpdateAppIR(updateNodeLayout(appIR, nodeId, { [propertyName]: parseInt(value) }));
    }
  };

  return (
    <>
      <SectionHeader title="Dimensions" />
      <Panel padding="md">
        <div className="property-group">
          {/* Width */}
          <div className="property-field">
            <label className="property-label">Width</label>
            <select
              className="property-input property-input--select"
              value={layout.width ?? ''}
              onChange={(e) => handleSizeChange('width', e.target.value)}
            >
              <option value="">Auto</option>
              <option value="auto">Auto</option>
              <option value="fill">Fill</option>
            </select>
          </div>

          {/* Height */}
          <div className="property-field">
            <label className="property-label">Height</label>
            <select
              className="property-input property-input--select"
              value={layout.height ?? ''}
              onChange={(e) => handleSizeChange('height', e.target.value)}
            >
              <option value="">Auto</option>
              <option value="auto">Auto</option>
              <option value="fill">Fill</option>
            </select>
          </div>

          {/* Padding */}
          <div className="property-field">
            <label className="property-label">Padding (px)</label>
            <input
              type="number"
              className="property-input property-input--number"
              placeholder="0"
              value={typeof layout.padding === 'number' ? layout.padding : ''}
              onChange={(e) => handleSpacingChange('padding', e.target.value)}
              min="0"
            />
          </div>

          {/* Margin */}
          <div className="property-field">
            <label className="property-label">Margin (px)</label>
            <input
              type="number"
              className="property-input property-input--number"
              placeholder="0"
              value={typeof layout.margin === 'number' ? layout.margin : ''}
              onChange={(e) => handleSpacingChange('margin', e.target.value)}
              min="0"
            />
          </div>

          {/* Gap */}
          <div className="property-field">
            <label className="property-label">Gap (px)</label>
            <input
              type="number"
              className="property-input property-input--number"
              placeholder="0"
              value={layout.gap ?? ''}
              onChange={(e) => handleSpacingChange('gap', e.target.value)}
              min="0"
            />
          </div>
        </div>
      </Panel>
    </>
  );
};

export default LayoutPanel;
