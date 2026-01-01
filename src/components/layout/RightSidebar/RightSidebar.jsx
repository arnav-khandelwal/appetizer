import React, { useState } from 'react';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import Panel from '../../common/Panel/Panel';
import StylePanel from '../PropertiesPanel/StylePanel';
import LayoutPanel from '../PropertiesPanel/LayoutPanel';
import './RightSidebar.scss';

/**
 * RightSidebar Component
 * Properties panel for editing selected component properties
 * Contains tabs for Style, Layout, and Actions
 * 
 * Props:
 * - selectedNodeId: Currently selected node ID
 * - appIR: The current app intermediate representation
 * - onUpdateAppIR: Handler for IR updates
 * - className: Additional CSS classes
 */
const RightSidebar = ({ selectedNodeId, appIR, onUpdateAppIR, className = '', ...props }) => {
  const [activeTab, setActiveTab] = useState('style');

  const tabs = [
    { id: 'style', label: 'Style' },
    { id: 'layout', label: 'Layout' },
    { id: 'actions', label: 'Actions' }
  ];

  // Show "Select an element" message when no node is selected
  if (!selectedNodeId || !appIR?.nodes[selectedNodeId]) {
    return (
      <aside className={`right-sidebar ${className}`} {...props}>
        <div className="right-sidebar__header">
          <h2 className="right-sidebar__title">Properties</h2>
        </div>

        {/* Tabs */}
        <div className="right-sidebar__tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`right-sidebar__tab ${
                activeTab === tab.id ? 'right-sidebar__tab--active' : ''
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="right-sidebar__content">
          <div className="right-sidebar__empty">
            <p>Select an element to edit its properties</p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`right-sidebar ${className}`} {...props}>
      <div className="right-sidebar__header">
        <h2 className="right-sidebar__title">Properties</h2>
      </div>

      {/* Tabs */}
      <div className="right-sidebar__tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`right-sidebar__tab ${
              activeTab === tab.id ? 'right-sidebar__tab--active' : ''
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="right-sidebar__content">
        {activeTab === 'style' && (
          <div className="right-sidebar__panel">
            <StylePanel 
              nodeId={selectedNodeId}
              appIR={appIR}
              onUpdateAppIR={onUpdateAppIR}
            />
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="right-sidebar__panel">
            <LayoutPanel 
              nodeId={selectedNodeId}
              appIR={appIR}
              onUpdateAppIR={onUpdateAppIR}
            />
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="right-sidebar__panel">
            <SectionHeader title="Events" />
            <Panel padding="md">
              <div className="property-skeleton">
                <div className="property-skeleton__item" />
              </div>
            </Panel>
          </div>
        )}
      </div>
    </aside>
  );
};

export default RightSidebar;
