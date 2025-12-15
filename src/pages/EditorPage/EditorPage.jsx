import React, { useState } from 'react';
import EditorLayout from '../../components/layout/EditorLayout/EditorLayout';
import CanvasArea from '../../components/canvas/CanvasArea/CanvasArea';
import './EditorPage.scss';

/**
 * EditorPage Component
 * Main page component that brings together the entire editor layout
 * Manages top-level state like project name
 */
const EditorPage = () => {
  const [projectName, setProjectName] = useState('My Awesome App');

  return (
    <div className="editor-page">
      <EditorLayout 
        projectName={projectName}
        onProjectNameChange={setProjectName}
      >
        <CanvasArea />
      </EditorLayout>
    </div>
  );
};

export default EditorPage;
