import React, { useState } from 'react';
import EditorLayout from '../../components/layout/EditorLayout/EditorLayout';
import CanvasArea from '../../components/canvas/CanvasArea';
import { exampleAppIR, productCardExample } from '../../ir.example';
import './EditorPage.scss';

/**
 * EditorPage Component
 * Main page component that brings together the entire editor layout
 * Manages top-level state like project name and app IR
 */
const EditorPage = () => {
  const [projectName, setProjectName] = useState('My Awesome App');
  const [appIR, setAppIR] = useState(exampleAppIR);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  return (
    <div className="editor-page">
      <EditorLayout 
        projectName={projectName}
        onProjectNameChange={setProjectName}
        appIR={appIR}
        onUpdateAppIR={setAppIR}
        selectedNodeId={selectedNodeId}
        onSelectNode={setSelectedNodeId}
      >
        <CanvasArea 
          appIR={appIR} 
          currentPageId="page-1"
          selectedNodeId={selectedNodeId}
          onSelectNode={setSelectedNodeId}
        />
      </EditorLayout>
    </div>
  );
};

export default EditorPage;
