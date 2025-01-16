import React, { useState } from 'react';
import './ProgressSteps.css';

const ProgressSteps = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      number: 1,
      title: 'Asset selection',
    },
    {
      number: 2,
      title: 'Attribute selection',
    },
    {
      number: 3,
      title: 'Column ID selection',
    },
  ];

  const getStepStatus = (stepNumber) => {
    if (completedSteps.has(stepNumber)) return 'completed';
    if (currentStep === stepNumber) return 'current';
    if (stepNumber <= Math.max(...Array.from(completedSteps)) + 1) return 'available';
    return 'locked';
  };

  const handleStepClick = (stepNumber) => {
    if (stepNumber <= Math.max(...Array.from(completedSteps)) + 1) {
      setCurrentStep(stepNumber);
    }
  };

  return (
    <div className="progress-container">
      <div className="progress-bar-container">
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={step.number} className="step-item">
              <button
                onClick={() => handleStepClick(step.number)}
                disabled={getStepStatus(step.number) === 'locked'}
                className={`step-button ${getStepStatus(step.number)}`}
              >
                <div className="step-title">
                  {step.title}
                </div>

                {index < steps.length - 1 && <div className="white-arrow" />}
                {index < steps.length - 1 && (
                  <div className={`step-arrow ${getStepStatus(step.number)}`} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;