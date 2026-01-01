import React from 'react';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import Panel from '../../common/Panel/Panel';
import { updateNodeStyle, removeNodeStyleProperty } from '../../../irMutations';
import './PropertiesPanel.scss';

/**
 * StylePanel Component
 * Binds style properties from the selected node to form inputs
 * 
 * Props:
 * - nodeId: ID of the selected node
 * - appIR: The current app intermediate representation
 * - onUpdateAppIR: Handler for IR updates
 */
const StylePanel = ({ nodeId, appIR, onUpdateAppIR }) => {
  const node = appIR?.nodes[nodeId];
  const style = node?.style || {};

  // Handle color input changes
  const handleColorChange = (propertyName, value) => {
    if (value === '') {
      // Remove property if empty
      onUpdateAppIR(removeNodeStyleProperty(appIR, nodeId, propertyName));
    } else {
      // Update property
      onUpdateAppIR(updateNodeStyle(appIR, nodeId, { [propertyName]: value }));
    }
  };

  // Handle number input changes
  const handleNumberChange = (propertyName, value) => {
    if (value === '' || value === null) {
      // Remove property if empty
      onUpdateAppIR(removeNodeStyleProperty(appIR, nodeId, propertyName));
    } else {
      // Update property with parsed number
      onUpdateAppIR(updateNodeStyle(appIR, nodeId, { [propertyName]: parseFloat(value) }));
    }
  };

  return (
    <>
      <SectionHeader title="Appearance" />
      <Panel padding="md">
        <div className="property-group">
          {/* Background Color */}
          <div className="property-field">
            <label className="property-label">Background Color</label>
            <input
              type="color"
              className="property-input property-input--color"
              value={style.backgroundColor || '#ffffff'}
              onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
            />
          </div>

          {/* Border Radius */}
          <div className="property-field">
            <label className="property-label">Border Radius (px)</label>
            <input
              type="number"
              className="property-input property-input--number"
              placeholder="0"
              value={style.borderRadius ?? ''}
              onChange={(e) => handleNumberChange('borderRadius', e.target.value)}
              min="0"
            />
          </div>

          {/* Border Width */}
          <div className="property-field">
            <label className="property-label">Border Width (px)</label>
            <input
              type="number"
              className="property-input property-input--number"
              placeholder="0"
              value={style.borderWidth ?? ''}
              onChange={(e) => handleNumberChange('borderWidth', e.target.value)}
              min="0"
            />
          </div>

          {/* Opacity */}
          <div className="property-field">
            <label className="property-label">Opacity</label>
            <div className="property-input-group">
              <input
                type="range"
                className="property-input property-input--range"
                min="0"
                max="1"
                step="0.1"
                value={style.opacity ?? 1}
                onChange={(e) => handleNumberChange('opacity', e.target.value)}
              />
              <span className="property-value-display">{((style.opacity ?? 1) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </Panel>
    </>
  );
};

export default StylePanel;
