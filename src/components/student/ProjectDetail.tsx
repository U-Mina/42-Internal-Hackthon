import React, { useState } from 'react';

interface Step {
  id: number;
  description: string;
  estimatedDuration: number;
  completed: boolean;
  comment?: string;
}

const ProjectDetail: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [newStepDescription, setNewStepDescription] = useState('');
  const [newStepDuration, setNewStepDuration] = useState('');

  const addStep = () => {
    if (newStepDescription && newStepDuration) {
      const newStep: Step = {
        id: steps.length + 1,
        description: newStepDescription,
        estimatedDuration: Number(newStepDuration),
        completed: false,
      };
      setSteps([...steps, newStep]);
      setNewStepDescription('');
      setNewStepDuration('');
    }
  };

  const markAsCompleted = (id: number) => {
    setSteps(steps.map(step =>
      step.id === id ? { ...step, completed: true } : step
    ));
  };

  const addComment = (id: number, comment: string) => {
    setSteps(steps.map(step =>
      step.id === id ? { ...step, comment } : step
    ));
  };

  return (
    <div>
      <h2>Project Detail</h2>
      <div>
        <h3>Add New Step</h3>
        <input
          type="text"
          value={newStepDescription}
          onChange={(e) => setNewStepDescription(e.target.value)}
          placeholder="Step Description"
        />
        <input
          type="number"
          value={newStepDuration}
          onChange={(e) => setNewStepDuration(e.target.value)}
          placeholder="Estimated Duration (hours)"
        />
        <button onClick={addStep}>Add Step</button>
      </div>
      <h3>Steps</h3>
      <ul>
        {steps.map(step => (
          <li key={step.id}>
            <span style={{ textDecoration: step.completed ? 'line-through' : 'none' }}>
              {step.description} - {step.estimatedDuration} hours
            </span>
            {!step.completed && (
              <button onClick={() => markAsCompleted(step.id)}>Mark as Completed</button>
            )}
            <input
              type="text"
              placeholder="Add comment"
              onBlur={(e) => addComment(step.id, e.target.value)}
            />
            {step.comment && <p>Comment: {step.comment}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetail;
